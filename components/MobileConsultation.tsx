"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/constants";
import { useLang } from "@/hooks/useLang";

export default function MobileConsultation() {
  const { t } = useLang();
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mobile-consultation">
      <MessageCircle size={17} />{t("nav.consultation")}
    </a>
  );
}
