"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setActiveLenis } from "@/lib/lenisControl";

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;

    const syncPreference = () => {
      lenis?.destroy();
      setActiveLenis(undefined);
      lenis = undefined;
      if (!reducedMotion.matches) {
        lenis = new Lenis({ autoRaf: true, anchors: true });
        setActiveLenis(lenis);
      }
    };

    syncPreference();
    reducedMotion.addEventListener("change", syncPreference);
    return () => {
      reducedMotion.removeEventListener("change", syncPreference);
      lenis?.destroy();
      setActiveLenis(undefined);
    };
  }, []);

  return null;
}
