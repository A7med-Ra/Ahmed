"use client";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";
export default function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="mx-auto max-w-3xl px-5 py-24">
      <h2 className="mb-12 text-3xl font-bold md:text-4xl">{t("process.title")}</h2>
      <ol className="border-s border-white/10">
        {(t("process.steps") as { t: string; d: string }[]).map((s, i) => (
          <Reveal key={i} className="relative pb-10 ps-8">
            <span className="absolute -start-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
            <h3 className="text-xl font-semibold">{s.t}</h3>
            <p className="mt-1 text-muted">{s.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
