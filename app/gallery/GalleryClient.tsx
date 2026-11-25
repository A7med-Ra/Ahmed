"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLang } from "@/hooks/useLang";
import type { GalleryItem } from "@/data/gallery";
import { asset } from "@/lib/asset";

const copy = {
  ar: {
    title: "معرض التصاميم",
    subtitle: "مجموعة من التصاميم والحملات.",
    empty: "سيتم إضافة أحدث التصاميم قريباً",
    close: "إغلاق",
    previous: "التصميم السابق",
    next: "التصميم التالي",
  },
  en: {
    title: "Design Gallery",
    subtitle: "A selection of designs and campaigns.",
    empty: "No designs uploaded yet",
    close: "Close",
    previous: "Previous design",
    next: "Next design",
  },
};

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const { lang } = useLang();
  const text = copy[lang];
  const [selected, setSelected] = useState<string | null>(null);
  const index = items.findIndex(item => item.id === selected);
  const current = index >= 0 ? items[index] : null;

  const move = (direction: number) => {
    if (index >= 0 && items.length > 0) {
      setSelected(items[(index + direction + items.length) % items.length].id);
    }
  };

  useEffect(() => {
    if (!current) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(lang === "ar" ? -1 : 1);
      if (event.key === "ArrowLeft") move(lang === "ar" ? 1 : -1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [current, index, lang]);

  return <>
    <Navbar />
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-16 md:py-24">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-5xl">{text.title}</h1>
        <p className="mt-3 text-muted">{text.subtitle}</p>
      </header>
      {items.length === 0 ? (
        <p className="py-16 text-center text-muted">{text.empty}</p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            aria-label={item.title}
            className="block w-full overflow-hidden rounded-2xl text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <img src={asset(item.image)} alt={item.title} loading="lazy" decoding="async" className="block h-auto w-full rounded-2xl object-contain" />
          </button>)}
        </div>
      )}
    </main>
    {current && <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={() => setSelected(null)}
    >
      <button type="button" onClick={() => setSelected(null)} aria-label={text.close} className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X /></button>
      {items.length > 1 && <button type="button" onClick={event => { event.stopPropagation(); move(-1); }} aria-label={text.previous} className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:left-8"><ChevronLeft /></button>}
      <figure className="flex h-full max-h-[92vh] w-full max-w-6xl flex-col items-center justify-center" onClick={event => event.stopPropagation()}>
        <img src={asset(current.image)} alt={current.title} className="max-h-[82vh] max-w-full object-contain" />
        <figcaption className="mt-3 text-center text-white">{current.title}</figcaption>
      </figure>
      {items.length > 1 && <button type="button" onClick={event => { event.stopPropagation(); move(1); }} aria-label={text.next} className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 md:right-8"><ChevronRight /></button>}
    </div>}
  </>;
}
