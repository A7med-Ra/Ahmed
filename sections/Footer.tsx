"use client";
import { asset } from "@/lib/asset";
import { useLang } from "@/hooks/useLang";
import Reveal from "@/components/Reveal";
import Link from "next/link";
export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 px-5 py-12 text-center text-muted">
      <Reveal>
        <Link href="/" aria-label="AhmedR" className="mx-auto flex w-fit items-center gap-3 text-2xl font-bold text-foreground">
          <img src={asset("/logo-mark.png")} alt="" className="h-12 w-12 object-contain" />
          <span>Ahmed<span className="text-accent">R</span></span>
        </Link>
        <p className="mt-2">{t("footer.line")}</p>
        <p className="mt-6 text-sm">{t("footer.made")} Ahmed Ramadan · Social Media Management</p>
      </Reveal>
    </footer>
  );
}
