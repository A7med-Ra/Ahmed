"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/constants";
import { useLang } from "@/hooks/useLang";

export default function MobileConsultation() {
  const { t } = useLang();
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mobile-consultation fixed bottom-6 left-6 z-40 hidden min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-onaccent shadow-lg shadow-black/25 sm:flex">
      <MessageCircle size={17} />{t("nav.consultation")}
    </a>
  );
}
