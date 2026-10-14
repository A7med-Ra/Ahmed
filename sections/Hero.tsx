"use client";
import { asset } from "@/lib/asset";
import { Target, Sparkles, MessageSquareText } from "lucide-react";
import { useLang } from "@/hooks/useLang";
const ICONS = [Target, Sparkles, MessageSquareText];
const POS = ["top-[16%] -start-3 md:-start-12", "top-[46%] -end-3 md:-end-12", "bottom-[20%] -start-3 md:-start-8"];
export default function Hero() {
  const { t } = useLang();
  const h = t("hero.headline") as string, hl = t("hero.highlight") as string;
  const i = h.indexOf(hl);
  return (
    <section id="home" className="hero-bg overflow-x-clip">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:gap-14 md:py-24">
        <div>
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">{t("hero.eyebrow")}</span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.45] sm:text-4xl lg:text-5xl lg:leading-[1.4]">
            {i < 0 ? h : <>{h.slice(0, i)}<span className="text-accent">{hl}</span>{h.slice(i + hl.length)}</>}
          </h1>
          <div className="mt-6 max-w-lg space-y-3 text-base leading-8 text-muted md:text-lg">
            {(t("hero.sub") as string[]).map((l, k) => <p key={k}>{l}</p>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#process" className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition hover:brightness-110">{t("hero.cta1")}</a>
            <a href="#cases" className="rounded-full border border-white/15 px-6 py-3 hover:border-accent">{t("hero.cta2")}</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="hero-glow" aria-hidden />
          <div className="hero-rim relative">
            <div className="hero-img relative">
              <img src={asset("Ahmed/profile/ahmed ramadan pro.jpg")} alt={t("hero.name")} width={800} height={1000} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                <p className="font-semibold leading-tight">{t("hero.name")}</p>
                <p className="text-sm text-accent">{t("hero.role")}</p>
              </div>
            </div>
          </div>
          {(t("hero.chips") as string[]).map((c, k) => {
            const Icon = ICONS[k];
            return (
              <div key={k} style={{ animationDelay: `${k * 0.8}s` }}
                className={`hero-float absolute ${POS[k]} flex items-center gap-2 rounded-full border border-white/10 bg-bg/70 px-4 py-2 text-xs shadow-xl shadow-black/40 backdrop-blur-md sm:text-sm`}>
                <Icon size={16} className="text-accent" />{c}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
