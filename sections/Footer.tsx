"use client";
import { asset } from "@/lib/asset";
import { useLang } from "@/hooks/useLang";
export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 px-5 py-12 text-center text-muted">
      <img src={asset("/logo.png")} alt="AhmedR" className="mx-auto h-24 w-auto" />
      <p className="mt-2">{t("footer.line")}</p>
      <p className="mt-6 text-sm">{t("footer.made")} Ahmed Ramadan · Social Media Management</p>
    </footer>
  );
}
