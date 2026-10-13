"use client";
import { asset } from "@/lib/asset";
import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { NAV } from "@/constants";
export default function Navbar() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-bg/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <a href="#home" className="flex items-center gap-2 text-lg font-semibold"><img src={asset("/logo-mark.png")} alt="" className="h-8 w-auto" /><span className="-ms-1.5 text-accent"></span></a>
        <ul className="nav-links gap-6 text-sm text-muted">
          {NAV.map(([k, h]) => <li key={k}><a className="hover:text-white" href={h}>{t(`nav.${k}`)}</a></li>)}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={toggle} aria-label="Language" className="flex items-center gap-1 text-sm text-muted hover:text-white"><Languages size={16} />{t("nav.lang")}</button>
          <a href="#contact" className="nav-cta rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg">{t("nav.cta")}</a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="menu-btn">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {open && (
        <ul className="nav-panel border-t border-white/5 bg-bg/95 px-5 py-3">
          {NAV.map(([k, h]) => <li key={k}><a onClick={() => setOpen(false)} className="block py-3 text-muted" href={h}>{t(`nav.${k}`)}</a></li>)}
          <li><a onClick={() => setOpen(false)} href="#contact" className="mt-2 block rounded-full bg-accent py-3 text-center font-medium text-bg">{t("nav.cta")}</a></li>
        </ul>
      )}
    </header>
  );
}
