import type Lenis from "lenis";

let activeLenis: Lenis | undefined;

export function setActiveLenis(instance: Lenis | undefined) {
  activeLenis = instance;
}

export function scrollPageTo(position: number, immediate = false) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (activeLenis) {
    activeLenis.scrollTo(position, { immediate: immediate || reduceMotion });
    return;
  }
  window.scrollTo({ top: position, behavior: immediate || reduceMotion ? "instant" : "smooth" });
}
