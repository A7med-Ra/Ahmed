"use client";
import { asset } from "@/lib/asset";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import { scrollPageTo } from "@/lib/lenisControl";

export default function CaseStudies() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [f, setF] = useState("all");
  const filterKeys = ["all", "jewelry", "services", "software", "marketing"] as const;
  const list = projects.filter(p => {
    if (f === "all") return true;
    if (f === "services") return p.category === "clean services";
    return p.category === f;
  });
  const k = (id: string, key: string) => t(`cases.items.${id}.${key}`);

  useEffect(() => {
    let projectId: string | null = null;
    try {
      projectId = sessionStorage.getItem("projectReturnId");
      if (projectId) sessionStorage.removeItem("projectReturnId");
    } catch {}
    if (!projectId) return;
    const frame = requestAnimationFrame(() => {
      const card = document.getElementById(`project-${projectId}`);
      if (!card) return;
      const margin = Number.parseFloat(getComputedStyle(card).scrollMarginTop) || 0;
      scrollPageTo(card.getBoundingClientRect().top + window.scrollY - margin);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="cases" className="mx-auto max-w-6xl px-5 py-24">
      <span id="projects" className="scroll-anchor" aria-hidden="true" />
      <Reveal>
        <h2 className="text-3xl font-bold text-white md:text-4xl">{t("cases.title")}</h2>
        <p className="mt-3 text-lg text-muted">{t("cases.subtitle")}</p>
        <div className="mt-8 inline-flex max-w-full flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-card/90 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl">
          {filterKeys.map(x => (
            <button key={x} type="button" aria-pressed={f === x} onClick={() => setF(x)} className={`project-filter relative isolate rounded-xl px-4 py-2 text-sm transition-colors duration-300 ${f === x ? "text-onaccent" : "text-muted hover:text-white"}`}>
              {f === x && <motion.span layoutId="cases-filter-active" transition={{ type: "spring", stiffness: 420, damping: 34 }} className="absolute inset-0 -z-10 rounded-xl border border-accent bg-accent shadow-[0_0_24px_rgb(var(--color-accent)/0.1)]" />}
              {t(`cases.filters.${x}`)}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, index) => (
            <motion.article
              id={`project-${p.id}`}
              key={p.id}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
              className={`scroll-mt-[4.5rem] h-full ${list.length === 5 && index === 3 ? "lg:col-start-3" : ""} ${list.length === 5 && index === 4 ? "lg:col-start-7" : ""} lg:col-span-4`}
            >
              <Link
                href={`/projects/${p.id}/`}
                prefetch={true}
                onPointerMove={event => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
                }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-card text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_20px_50px_rgb(var(--color-accent)/0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 mix-blend-screen opacity-0 transition-opacity duration-300 group-hover:opacity-70" style={{ background: "radial-gradient(440px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgb(var(--color-accent) / 0.13), transparent 48%)" }} />
                <div className="relative w-full p-3 pb-0">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-100 dark:border-white/10 dark:bg-[#0B1120]">
                  <img
                    src={asset(p.image)}
                    alt={k(p.id, "name")}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full border border-accent/35 bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-accent backdrop-blur-md">
                    {k(p.id, "industry")}
                  </span>
                </div>
                </div>

                <div className="relative flex flex-1 flex-col justify-between p-7 pt-4">
                  <div>
                    <h3 className="mb-2.5 text-xl font-bold text-white transition-colors group-hover:text-accent md:text-2xl">
                      {k(p.id, "name")}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted">
                      {k(p.id, "summary")}
                    </p>
                  </div>

                  <div className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-card/80 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-onaccent">
                    <span>{t("cases.read")}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-onaccent/10">
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
        {list.length === 0 && <p className="col-span-full text-muted">{t("cases.empty")}</p>}
      </div>
      <div className="mt-10 text-center">
        <Link href="/gallery/" className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-semibold text-accent transition hover:bg-accent hover:text-onaccent">
          {lang === "ar" ? "شاهد جميع التصاميم ←" : "View all designs →"}
        </Link>
      </div>
    </section>
  );
}
