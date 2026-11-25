"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationFeedback() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
    };
    const finish = () => {
      pending.current = false;
      setProgress(100);
      clearTimer();
      timer.current = setTimeout(() => setProgress(0), 240);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      pending.current = true;
      clearTimer();
      setProgress(18);
      requestAnimationFrame(() => setProgress(value => pending.current ? Math.max(value, 72) : value));
      timer.current = setTimeout(finish, 1800);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (pending.current) {
      pending.current = false;
      setProgress(100);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setProgress(0), 240);
    }
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`navigation-progress${progress > 0 ? " is-active" : ""}`}
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
