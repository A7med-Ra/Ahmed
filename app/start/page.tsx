"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpLeft, CheckCircle2, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import { useLang } from "@/hooks/useLang";
import { WHATSAPP } from "@/constants";

export default function StartPage() {
  const { lang, t } = useLang();
  const [service, setService] = useState("social");
  const [brand, setBrand] = useState("");
  const [waUrl, setWaUrl] = useState<string | null>(null);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      t("request.whatsapp.greeting"),
      "",
      `${t("request.whatsapp.service")}: ${t(`request.whatsapp.services.${service}`)}`,
      `${t("request.whatsapp.brand")}: ${brand.trim()}`,
    ].join("\n");
    const url = `${WHATSAPP}?text=${encodeURIComponent(message)}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-bg px-4 py-3 text-white outline-none transition placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4.5rem)] bg-bg px-5 py-12 sm:py-16">
        <section className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div dir={lang === "ar" ? "rtl" : "ltr"}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
              <MessageCircle size={16} />{t("request.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">{t("request.startHeading")}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t("request.valueBody")}</p>
            <ul className="mt-8 space-y-4">
              {(t("request.benefits") as string[]).map(item => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <CheckCircle2 size={20} className="mt-1 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/#cases" prefetch={true} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3">
              {t("request.viewWork")} <ArrowUpLeft size={16} className={lang === "en" ? "rotate-90" : ""} />
            </Link>
          </div>

          <div dir={lang === "ar" ? "rtl" : "ltr"} className="rounded-3xl border border-white/10 bg-card p-6 shadow-xl shadow-black/10 sm:p-9">
            <h2 className="text-2xl font-bold text-white">{t("request.title")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t("request.subtitle")}</p>
            <form onSubmit={submitRequest} className="mt-7 space-y-5">
              <label className="block text-sm font-semibold text-white">
                {t("request.service")}
                <select value={service} onChange={event => setService(event.target.value)} className={inputClass}>
                  <option className="bg-bg text-white" value="social">{t("request.services.social")}</option>
                  <option className="bg-bg text-white" value="website">{t("request.services.website")}</option>
                  <option className="bg-bg text-white" value="identity">{t("request.services.identity")}</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-white">
                {t("request.brand")}
                <input required value={brand} onChange={event => setBrand(event.target.value)} placeholder={t("request.brandHint")} className={inputClass} />
              </label>
              <button type="submit" className="group flex w-full items-center justify-between rounded-xl bg-accent px-5 py-4 font-semibold text-onaccent transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                <span>{t("request.submit")}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-black/10 transition group-hover:bg-black/15"><ArrowUpLeft size={18} /></span>
              </button>
              {waUrl && (
                <p role="status" className="text-sm text-muted">
                  {t("request.fallback")} <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">{t("contact.openWa")}</a>
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
