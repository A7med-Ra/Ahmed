"use client";
import { asset } from "@/lib/asset";
import { useEffect, useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { projects } from "@/data/projects";
import { FILTERS } from "@/constants";
const KEYS = ["pain","emotion","image","power","trust","objection","curiosity","human"];
export default function CaseStudies() {
  const { t } = useLang();
  const [f, setF] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const list = projects.filter(p => f === "all" || p.category === f);
  const k = (id: string, x: string) => t(`cases.items.${id}.${x}`);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  const copy = async (txt: string) => { try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} };
  const postImg = open ? k(open, "postImage") : "";
  return (
    <section id="cases" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="text-3xl font-bold md:text-4xl">{t("cases.title")}</h2>
      <p className="mt-3 text-lg text-muted">{t("cases.subtitle")}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map(x => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full border px-4 py-1.5 text-sm transition ${f === x ? "border-accent text-accent" : "border-white/10 text-muted hover:border-white/30"}`}>
            {t(`cases.filters.${x}`)}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <article key={p.id} className="group overflow-hidden rounded-2xl bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
            <img src={asset(p.image)} alt={k(p.id, "name")} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
            <div className="p-6">
              <p className="text-xs text-accent">{k(p.id, "industry")}</p>
              <h3 className="mt-1 text-xl font-semibold">{k(p.id, "name")}</h3>
              <p className="mt-2 text-muted">{k(p.id, "summary")}</p>
              <button onClick={() => setOpen(p.id)} className="mt-5 text-sm font-medium text-accent">{t("cases.read")} →</button>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className="col-span-full text-muted">{t("cases.empty")}</p>}
      </div>
      {open && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4" onClick={() => setOpen(null)}>
          <div onClick={e => e.stopPropagation()} className="mx-auto my-6 max-w-3xl rounded-3xl bg-card p-5 sm:p-8 md:p-10">
            <button onClick={() => setOpen(null)} aria-label="Close" className="float-end text-muted hover:text-white"><X /></button>
            <h3 className="text-2xl font-bold">{k(open, "name")}</h3>
            <h4 className="mt-8 text-sm text-accent">{t("cases.modal.overview")}</h4>
            <p className="mt-2 text-muted">{k(open, "overview")}</p>
            {postImg && !postImg.includes("cases.items") && (
              <>
                <h4 className="mt-8 text-sm text-accent">{t("cases.modal.postExample")}</h4>
                <div className="mt-3 flex justify-center overflow-hidden rounded-2xl bg-bg/50">
                  <img src={asset(postImg)} alt={t("cases.modal.postExample")} className="max-h-[450px] w-full object-contain" />
                </div>
              </>
            )}
            <div className="mt-8 flex items-center justify-between gap-3">
              <h4 className="text-sm text-accent">{t("cases.modal.caption")}</h4>
              <button onClick={() => copy(k(open, "caption"))} className="flex items-center gap-1 text-xs text-muted hover:text-white">
                {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? t("cases.modal.copied") : t("cases.modal.copy")}
              </button>
            </div>
            {t("cases.modal.captionNote") && <p className="mt-1 text-xs text-muted">{t("cases.modal.captionNote")}</p>}
            <blockquote className="mt-2 whitespace-pre-line rounded-2xl border-s-2 border-accent bg-bg p-5 leading-loose sm:p-6">{k(open, "caption")}</blockquote>
            <h4 className="mt-8 text-sm text-accent">{t("cases.modal.why")}</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {KEYS.map(c => (
                <div key={c} className="rounded-xl bg-bg p-4"><b className="text-sm">{t(`cases.labels.${c}`)}</b><p className="mt-1 text-sm text-muted">{k(open, `cards.${c}`)}</p></div>
              ))}
            </div>
            <h4 className="mt-8 text-sm text-accent">{t("cases.modal.reaction")}</h4>
            <p className="mt-2 text-muted">{k(open, "reaction")}</p>
            <h4 className="mt-8 text-sm text-accent">{t("cases.modal.lesson")}</h4>
            <p className="mt-2 text-lg font-medium">{k(open, "lesson")}</p>
          </div>
        </div>
      )}
    </section>
  );
}
