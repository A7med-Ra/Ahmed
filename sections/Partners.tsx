"use client";
import { asset } from "@/lib/asset";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import { partners } from "@/data/partners";
import Reveal from "@/components/Reveal";
function Tile({ name, logo }: { name: string; logo: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  // الصورة ممكن تفشل قبل ما React يركّب onError، فبنفحصها بعد التحميل
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setFailed(true); }, []);
  return (
    <div className="partner-tile">
      {failed ? <span>{name}</span> : <img ref={ref} src={asset(logo)} alt={name} onError={() => setFailed(true)} draggable={false} />}
    </div>
  );
}
export default function Partners() {
  const { t } = useLang();
  const half = [...partners, ...partners]; // نص المسار، والنص التاني نسخة منه عشان اللفة تكون متصلة
  return (
    <section id="partners" className="py-24">
      <Reveal className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-bold md:text-4xl">{t("partners.title")}</h2>
        <p className="mt-3 text-lg text-muted">{t("partners.subtitle")}</p>
      </Reveal>
      <div className="marquee mt-12">
        <div className="marquee-track">
          {half.map((p, i) => <Tile key={`a${i}`} {...p} />)}
          <div className="contents" aria-hidden>{half.map((p, i) => <Tile key={`b${i}`} {...p} />)}</div>
        </div>
      </div>
    </section>
  );
}
