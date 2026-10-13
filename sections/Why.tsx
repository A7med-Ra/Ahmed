"use client";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";
export default function Why() {
  const { t } = useLang();
  return (
    <section id="why" className="mx-auto max-w-3xl px-5 py-24">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">{t("why.title")}</h2>
        <div className="mt-8 space-y-6 text-lg text-muted">{(t("why.points") as string[]).map((p, i) => <p key={i}>{p}</p>)}</div>
      </Reveal>
    </section>
  );
}
