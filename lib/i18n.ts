import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import xar from "@/locales/extra.ar.json";
import xen from "@/locales/extra.en.json";
import { Lang } from "@/types";
export const dict: Record<Lang, any> = { ar: { ...ar, ...xar }, en: { ...en, ...xen } };
const dig = (l: Lang, key: string) => key.split(".").reduce((o: any, k) => o?.[k], dict[l]);
export const get = (lang: Lang, key: string): any => dig(lang, key) ?? dig("ar", key) ?? key;
