"use client";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";
function Grid({ id, title, items }: { id?: string; title: string; items: string[] }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="mb-10 text-3xl font-bold md:text-4xl">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((x, i) => <Reveal key={i} className="rounded-2xl bg-card p-7 text-lg">{x}</Reveal>)}
      </div>
    </section>
  );
}
export function Outcomes() { const { t } = useLang(); return <Grid id="outcomes" title={t("outcomes.title")} items={t("outcomes.items")} />; }
export function Principles() { const { t } = useLang(); return <Grid title={t("principles.title")} items={t("principles.items")} />; }
