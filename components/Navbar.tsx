"use client";
import { asset } from "@/lib/asset";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const NAV = [
  ["home", "#home", "#home"],
  ["about", "#why", "#about"],
  ["projects", "#cases", "#projects"],
  ["process", "#process", "#process"],
  ["contact", "#contact", "#contact"],
] as const;

export default function Navbar() {
  const { t, toggle, lang } = useLang();
  const pathname = usePathname();
  const isInternalPage = pathname.includes("/projects/") || pathname === "/start";
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  useEffect(() => {
    const observedSections = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    const observeSections = () => NAV.forEach(([, hash]) => {
      const section = document.querySelector<HTMLElement>(hash);
      if (section && !observedSections.has(section)) { observer.observe(section); observedSections.add(section); }
    });
    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, []);

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const nextLight = !light;
    const applyTheme = () => {
      document.documentElement.classList.toggle("light", nextLight);
      document.documentElement.classList.toggle("dark", !nextLight);
      document.documentElement.style.colorScheme = nextLight ? "light" : "dark";
      try { localStorage.setItem("theme", nextLight ? "light" : "dark"); } catch {}
      setLight(nextLight);
    };
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transitionDocument = document as Document & { startViewTransition?: (callback: () => void) => { finished: Promise<void> } };
    if (!transitionDocument.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { applyTheme(); return; }
    document.documentElement.style.setProperty("--theme-origin-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-origin-y", `${y}px`);
    document.documentElement.style.setProperty("--theme-radius", `${radius}px`);
    const transition = transitionDocument.startViewTransition(applyTheme);
    const clear = () => {
      document.documentElement.style.removeProperty("--theme-origin-x");
      document.documentElement.style.removeProperty("--theme-origin-y");
      document.documentElement.style.removeProperty("--theme-radius");
    };
    void transition.finished.then(clear, clear);
  }

  const themeLabel = light ? (lang === "ar" ? "التبديل إلى الوضع الليلي" : "Switch to dark mode") : (lang === "ar" ? "التبديل إلى الوضع النهاري" : "Switch to light mode");
  const navLink = ([key, activeHash, rootHash]: typeof NAV[number], mobile = false) => {
    const className = mobile
      ? `block rounded-xl px-4 py-3 text-base transition-colors hover:bg-accent/10 hover:text-accent ${activeHref === activeHash ? "bg-accent/10 text-accent" : "text-muted"}`
      : `transition-colors hover:text-white ${activeHref === activeHash ? "text-accent" : ""}`;
    const ariaCurrent = !isInternalPage && activeHref === activeHash ? "location" as const : undefined;
    return <Link href={`/${rootHash}`} prefetch aria-current={ariaCurrent} className={className} onClick={mobile ? () => setOpen(false) : undefined}>{t(`nav.${key}`)}</Link>;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-bg/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link href="/" prefetch aria-label={lang === "ar" ? "الرئيسية" : "Home"} className="flex items-center gap-2 text-lg font-semibold"><img src={asset("/logo-mark.png")} alt="" width={32} height={32} className="h-8 w-auto" /><span className="-ms-1.5 text-accent" /></Link>
        <ul className="nav-links gap-6 text-sm text-muted">
          {NAV.map(item => <li key={item[0]}>{navLink(item)}</li>)}
          <li><Link href="/gallery/" className="transition-colors hover:text-white">{lang === "ar" ? "معرض التصاميم" : "Gallery"}</Link></li>
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label={themeLabel} className="flex items-center justify-center text-muted hover:text-white"><span className="sr-only">{themeLabel}</span>{light ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button onClick={toggle} aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"} className="flex items-center gap-1 text-sm text-muted hover:text-white"><Languages size={16} />{t("nav.lang")}</button>
          <Link href="/start" prefetch className="nav-cta cursor-pointer rounded-full bg-accent px-4 py-2 text-sm font-medium text-onaccent transition hover:brightness-110">{t("nav.cta")}</Link>
          <button onClick={() => setOpen(!open)} aria-label={open ? (lang === "ar" ? "إغلاق القائمة" : "Close menu") : (lang === "ar" ? "فتح القائمة" : "Open menu")} aria-expanded={open} aria-controls="mobile-navigation" className="menu-btn relative z-[60] rounded-lg p-2 text-muted transition hover:bg-accent/10 hover:text-accent">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
      <button type="button" tabIndex={open ? 0 : -1} aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"} onClick={() => setOpen(false)} className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} />
      <aside id="mobile-navigation" aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main navigation"} aria-hidden={!open} inert={!open} className={`fixed inset-y-0 right-0 z-50 flex w-[min(21rem,88vw)] flex-col border-s border-white/10 bg-bg p-6 pt-24 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <ul className="space-y-1">
          {NAV.map(item => <li key={item[0]}>{navLink(item, true)}</li>)}
          <li><Link href="/gallery/" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base text-muted transition-colors hover:bg-accent/10 hover:text-accent">{lang === "ar" ? "معرض التصاميم" : "Gallery"}</Link></li>
          <li><Link href="/start" prefetch onClick={() => setOpen(false)} className="mt-5 block w-full rounded-full bg-accent py-3 text-center font-medium text-onaccent transition hover:brightness-110">{t("nav.cta")}</Link></li>
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
          <button onClick={toggleTheme} aria-label={themeLabel} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent/10 hover:text-accent">{light ? <Moon size={18} /> : <Sun size={18} />}{themeLabel}</button>
          <button onClick={toggle} aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent/10 hover:text-accent"><Languages size={16} />{t("nav.lang")}</button>
        </div>
      </aside>
    </header>
  );
}
