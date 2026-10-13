"use client";
import { asset } from "@/lib/asset";
import { useLang } from "@/hooks/useLang";
import { testimonials } from "@/data/testimonials";
import Reveal from "@/components/Reveal";
export default function Testimonials() {
  const { t } = useLang();
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="mb-10 text-3xl font-bold md:text-4xl">{t("testimonials.title")}</h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((x, i) => (
          <Reveal key={i} className="rounded-2xl bg-card p-6">
            {x.image && <img src={asset(x.image)} alt={x.name} loading="lazy" className="mb-4 w-full rounded-xl" />}
            <p className="leading-8">“{x.text}”</p>
            <p className="mt-4 font-semibold">{x.name}</p><p className="text-sm text-accent">{x.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
