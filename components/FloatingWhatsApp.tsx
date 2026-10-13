"use client";
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/constants";
export default function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/30 transition hover:scale-105">
      <MessageCircle />
    </a>
  );
}
