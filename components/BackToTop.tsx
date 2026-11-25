"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { asset } from "@/lib/asset";

export default function BackToTop() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!visible) return null;
  const target = document.getElementById("home") ? "#home" : asset("/#home");
  return <Link href={target} prefetch={true} aria-label={lang === "ar" ? "الرجوع للأعلى" : "Back to top"} className="back-to-top !bottom-6 !left-6 !right-auto"><ArrowUp size={19} /></Link>;
}
