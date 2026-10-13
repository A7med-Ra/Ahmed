"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { get } from "@/lib/i18n";
import { Lang } from "@/types";
const Ctx = createContext<any>(null);
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);
  const t = (k: string): any => get(lang, k);
  return <Ctx.Provider value={{ lang, t, toggle: () => setLang(lang === "ar" ? "en" : "ar") }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx) as { lang: Lang; t: (k: string) => any; toggle: () => void };
