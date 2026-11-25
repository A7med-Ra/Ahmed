"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CircleHelp,
  Copy,
  Eye,
  Heart,
  Lightbulb,
  MessageCircle,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import { useLang } from "@/hooks/useLang";
import { projects } from "@/data/projects";
import { asset } from "@/lib/asset";
import { scrollPageTo } from "@/lib/lenisControl";
import { WHATSAPP } from "@/constants";

const STRATEGY_KEYS = ["emotion", "image", "power", "trust", "objection", "curiosity", "human"];
const STRATEGY_ICONS: Record<string, LucideIcon> = {
  emotion: Heart,
  image: Eye,
  power: Zap,
  trust: ShieldCheck,
  objection: MessageCircle,
  curiosity: CircleHelp,
  human: Users,
};

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const projectIndex = projects.findIndex(project => project.id === projectId);
  const project = projects[projectIndex];
  const previous = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const next = projectIndex >= 0 ? projects[projectIndex + 1] : undefined;
  const k = (key: string) => t(`cases.items.${projectId}.${key}`);
  const postImage = k("postImage");
  const backIcon = lang === "ar" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />;
  const categoryKey = project?.category === "clean services" ? "cleanServices" : project?.category;
  const metadata = [
    { label: t("cases.detailLayout.client"), value: k("name") },
    { label: t("cases.detailLayout.industry"), value: k("industry") },
    { label: t("cases.detailLayout.projectType"), value: categoryKey ? t(`cases.detailLayout.categories.${categoryKey}`) : "" },
    { label: t("cases.detailLayout.projectSummary"), value: k("summary") },
  ];

  useEffect(() => { scrollPageTo(0, true); }, [projectId]);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    const sections = ["overview", "strategy", "application", "results"];
    const update = () => {
      const current = sections.filter(id => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= window.innerHeight * 0.45;
      }).pop();
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(k("caption"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function rememberReturnPosition() {
    try { sessionStorage.setItem("projectReturnId", projectId); } catch {}
  }

  const progressLinks = [
    ["overview", "نظرة عامة"], ["strategy", "الاستراتيجية"],
    ["application", "التطبيق"], ["results", "النتائج"],
  ] as const;
  const whatsappMessage = `مرحبًا، اطلعت على مشروع «${k("name")}» وأرغب في مناقشة مشروع مشابه.`;
  const whatsappHref = `${WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!project) return null;

  return (
    <>
      <Navbar />
      <main id="page-content" dir={lang === "ar" ? "rtl" : "ltr"} className="overflow-hidden">
        <Reveal>
          <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8 lg:pt-12">
            <Link href="/#projects" prefetch={true} onClick={rememberReturnPosition} className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-accent">
              {backIcon}{t("cases.backToProjects")}
            </Link>

            <header className="mx-auto max-w-5xl pb-10 pt-12 text-center md:pb-12 md:pt-16">
              <span className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                <Sparkles size={15} aria-hidden="true" />{k("industry")}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">{k("name")}</h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-2xl">{k("summary")}</p>
            </header>

            <div className="relative mx-auto max-w-5xl">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.2),transparent_68%)] blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-3">
                <button type="button" onClick={() => setLightbox({ src: asset(project.image), alt: k("name") })} aria-label={lang === "ar" ? "تكبير صورة المشروع" : "View project image full screen"} className="block w-full cursor-zoom-in rounded-[1.25rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                <img
                  src={asset(project.image)}
                  alt={k("name")}
                  width={1920}
                  height={1080}
                  fetchPriority="high"
                  className="aspect-[16/10] w-full rounded-[1.25rem] object-contain"
                />
                </button>
              </div>
            </div>

            <dl className="mx-auto mt-6 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-card/80 backdrop-blur-md lg:grid-cols-4">
              {metadata.map((item, index) => (
                <div key={item.label} className={`min-w-0 px-4 py-5 sm:px-6 ${index > 0 ? "border-s border-white/10" : ""} ${index > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}>
                  <dt className="text-xs font-medium text-muted sm:text-sm">{item.label}</dt>
                  <dd className="mt-2 line-clamp-2 text-sm font-semibold leading-relaxed text-white sm:text-base">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section id="overview" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28" aria-label={t("cases.modal.overview")}>
            <div className="grid items-stretch gap-6 md:grid-cols-2">
              <FeatureCard icon={Lightbulb} index="01" title={t("cases.modal.overview")}>
                <p className="text-base leading-[1.9] text-muted md:text-lg">{k("overview")}</p>
              </FeatureCard>
              <FeatureCard icon={Eye} index="02" title={t("cases.detailLayout.challenge")}>
                <p className="text-base leading-[1.9] text-muted md:text-lg">{k("cards.pain")}</p>
              </FeatureCard>
            </div>
          </section>

          <section id="strategy" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28" aria-labelledby="solution-title">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-sm font-semibold tracking-widest text-accent">03 / {t("cases.detailLayout.solution")}</p>
                <h2 id="solution-title" className="mt-3 text-3xl font-extrabold md:text-4xl">{t("cases.detailLayout.solution")}</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">{t("cases.modal.why")}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
              {STRATEGY_KEYS.map((key, index) => {
                const Icon = STRATEGY_ICONS[key];
                const span = index < 2 || index > 4 ? "md:col-span-3" : "md:col-span-2";
                return (
                  <article key={key} className={`group relative isolate min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg sm:p-8 ${span}`}>
                    <div aria-hidden="true" className="pointer-events-none absolute -end-10 -top-12 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition group-hover:bg-accent/20" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-3 font-mono text-sm font-bold text-accent shadow-[0_0_24px_rgba(255,107,0,0.12)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent transition group-hover:border-accent/30 group-hover:bg-accent/10">
                        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-bold leading-snug">{t(`cases.labels.${key}`)}</h3>
                    <p className="mt-3 text-sm leading-[1.9] text-muted md:text-base">{k(`cards.${key}`)}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="application" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28" aria-label={t("cases.modal.postExample")}>
            <div className="mb-10">
              <p className="text-sm font-semibold tracking-widest text-accent">04 / {t("cases.modal.postExample")}</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{t("cases.modal.postExample")}</h2>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                {postImage && !postImage.includes("cases.items") && (
                  <article className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-black/20">
                    <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
                      <div aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-amber-300 text-sm font-extrabold text-[#0B1120]">
                        {k("name").trim().charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{k("name")}</p>
                        <p className="text-xs text-muted">{k("industry")}</p>
                      </div>
                    </header>
                    <div className="bg-[#0B1120]/40 p-3 sm:p-5">
                      <button type="button" onClick={() => setLightbox({ src: asset(postImage), alt: t("cases.modal.postExample") })} aria-label={lang === "ar" ? "تكبير صورة المنشور" : "View campaign image full screen"} className="mx-auto block w-full cursor-zoom-in rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                        <img src={asset(postImage)} alt={t("cases.modal.postExample")} width={1200} height={1200} loading="lazy" decoding="async" className="mx-auto max-h-[900px] w-full rounded-xl object-contain" />
                      </button>
                    </div>
                    <footer className="flex flex-wrap items-center gap-5 border-t border-white/10 px-5 py-4 text-muted sm:px-6">
                      <button type="button" aria-pressed={liked} onClick={() => setLiked(value => !value)} aria-label={liked ? (lang === "ar" ? "إلغاء الإعجاب" : "Unlike post") : (lang === "ar" ? "أعجبني" : "Like post")} className={`transition ${liked ? "text-rose-500" : "hover:text-rose-400"}`}><Heart size={20} fill={liked ? "currentColor" : "none"} /></button>
                      <MessageCircle size={20} />
                      <Send size={19} />
                      <Bookmark size={19} className="ms-auto" />
                    </footer>
                    <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{k("caption")}</p>
                  </article>
                )}
              </div>

              <div className="lg:col-span-5">
                <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-card p-6 sm:p-8">
                  <div aria-hidden="true" className="pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
                  <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent"><Quote size={19} /></span>
                      <h3 className="text-lg font-bold leading-snug">{t("cases.modal.caption")}</h3>
                    </div>
                    <button type="button" onClick={copyCaption} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-accent">
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? t("cases.modal.copied") : t("cases.modal.copy")}
                    </button>
                  </div>
                  {t("cases.modal.captionNote") && <p className="relative mt-4 text-sm leading-relaxed text-muted">{t("cases.modal.captionNote")}</p>}
                  <blockquote className="relative mt-6 whitespace-pre-line border-s-2 border-accent ps-5 text-base leading-[2] text-white/90 sm:ps-6">
                    {k("caption")}
                  </blockquote>
                  <div className="relative mt-7 flex flex-wrap gap-2" aria-label={t("cases.detailLayout.triggers")}>
                    {STRATEGY_KEYS.map(key => (
                      <span key={key} className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">{t(`cases.labels.${key}`)}</span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="results" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28" aria-labelledby="impact-title">
            <div className="relative isolate overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-7 shadow-[0_20px_80px_rgba(255,107,0,0.08)] md:p-10 lg:p-14">
              <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <p className="text-sm font-semibold tracking-widest text-accent">05 / {t("cases.detailLayout.impact")}</p>
                  <h2 id="impact-title" className="mt-3 text-3xl font-extrabold md:text-4xl">{t("cases.detailLayout.impact")}</h2>
                  <h3 className="mt-8 text-sm font-semibold text-muted">{t("cases.modal.reaction")}</h3>
                  <p className="mt-3 leading-[1.9] text-muted">{k("reaction")}</p>
                </div>
                <div className="flex flex-col justify-center border-s border-white/10 ps-6 lg:col-span-7 lg:col-start-6 lg:ps-10">
                  <Quote size={34} className="mb-5 text-accent/80" aria-hidden="true" />
                  <p className="text-2xl font-bold leading-[1.7] text-white md:text-3xl">{k("lesson")}</p>
                  <p className="mt-5 text-sm font-semibold text-accent">{t("cases.modal.lesson")}</p>
                </div>
              </div>
            </div>
          </section>

          <nav aria-label={t("nav.projects")} className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 pb-10 text-sm lg:px-8">
            {previous ? <Link href={`/projects/${previous.id}/`} prefetch={true} className="text-muted transition hover:text-accent">{lang === "ar" ? "→" : "←"} {t("cases.previous")}: {t(`cases.items.${previous.id}.name`)}</Link> : <span />}
            {next ? <Link href={`/projects/${next.id}/`} prefetch={true} className="ms-auto text-muted transition hover:text-accent">{t("cases.next")}: {t(`cases.items.${next.id}.name`)} {lang === "ar" ? "←" : "→"}</Link> : null}
          </nav>

          <section className="mx-auto mb-16 max-w-6xl px-6" aria-labelledby="project-cta-title">
            <div className="relative isolate overflow-hidden rounded-3xl bg-accent px-7 py-12 text-onaccent shadow-2xl shadow-accent/20 md:px-12 md:py-16">
              <div aria-hidden="true" className="pointer-events-none absolute -end-16 -top-32 -z-10 h-96 w-96 rounded-full bg-white/20 blur-[100px]" />
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">{k("name")}</p>
                  <h2 id="project-cta-title" className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">{t("cases.detailLayout.ctaTitle")}</h2>
                </div>
                <Link href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0B1120] px-8 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                  {t("nav.cta")}
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
        <nav aria-label={lang === "ar" ? "التنقل بين أقسام المشروع" : "Project sections"} className="fixed bottom-5 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#0B1120]/90 p-1.5 text-xs text-white shadow-xl backdrop-blur-xl" dir="rtl">
          {progressLinks.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={`shrink-0 rounded-full px-3 py-2 transition ${activeSection === id ? "bg-accent text-white" : "text-white/70 hover:text-white"}`}>{label}</a>)}
        </nav>
      </main>
      {lightbox && <div role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8">
        <button type="button" onClick={() => setLightbox(null)} aria-label={lang === "ar" ? "إغلاق" : "Close"} className="absolute end-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"><X size={22} /></button>
        <img src={lightbox.src} alt={lightbox.alt} onClick={event => event.stopPropagation()} className="max-h-full max-w-full object-contain" />
      </div>}
    </>
  );
}

function FeatureCard({ icon: Icon, index, title, children }: { icon: LucideIcon; index: string; title: string; children: React.ReactNode }) {
  return (
    <article className="relative isolate h-full overflow-hidden rounded-2xl border border-white/10 bg-card/90 p-7 shadow-xl shadow-black/10 backdrop-blur-sm transition duration-300 hover:border-accent/30 md:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -end-12 -top-12 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute end-6 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent">
        <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold tracking-widest text-accent">{index}</p>
      <h2 className="mt-8 text-2xl font-bold leading-snug">{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}
