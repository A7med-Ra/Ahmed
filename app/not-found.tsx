"use client";

import { useLang } from "@/hooks/useLang";
import { asset } from "@/lib/asset";
import Link from "next/link";

export default function NotFound() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  return (
    <main id="page-content" className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <p className="text-7xl font-bold text-accent">404</p>
      <h1 className="text-2xl font-semibold">{isArabic ? "الصفحة غير موجودة" : "Page not found"}</h1>
      <Link href={asset("/#home")} prefetch={true} className="rounded-full bg-accent px-6 py-3 font-medium text-onaccent">{isArabic ? "العودة للرئيسية" : "Back to home"}</Link>
    </main>
  );
}
