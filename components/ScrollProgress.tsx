"use client";

import { PointerEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import { scrollPageTo } from "@/lib/lenisControl";

export default function ScrollProgress() {
  const { lang } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [geometry, setGeometry] = useState({ scrollY: 0, maxScroll: 0, thumbHeight: 0, thumbTop: 0 });
  const [visible, setVisible] = useState(true);
  const [coarsePointer, setCoarsePointer] = useState(false);

  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current);
    if (!hovering.current && !coarsePointer) hideTimer.current = setTimeout(() => setVisible(false), 2000);
  }, [coarsePointer]);
  const reveal = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const updatePointer = () => setCoarsePointer(pointerQuery.matches);
    updatePointer();
    pointerQuery.addEventListener("change", updatePointer);
    let frame = 0;
    const update = (show = true) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const trackHeight = trackRef.current?.clientHeight || Math.max(window.innerHeight - 16, 1);
        const scrollHeight = document.documentElement.scrollHeight;
        const maxScroll = Math.max(scrollHeight - window.innerHeight, 0);
        const thumbHeight = Math.min(trackHeight, Math.max(28, trackHeight * window.innerHeight / Math.max(scrollHeight, 1)));
        const available = Math.max(trackHeight - thumbHeight, 0);
        const scrollY = Math.min(Math.max(window.scrollY, 0), maxScroll);
        setGeometry({ scrollY, maxScroll, thumbHeight, thumbTop: maxScroll ? available * scrollY / maxScroll : 0 });
        if (show) reveal();
      });
    };
    const onScroll = () => update();
    const onResize = () => update(false);
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "mouse" && event.clientX >= window.innerWidth - 24) reveal();
    };
    const resizeObserver = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(() => update(false));
    resizeObserver?.observe(document.body);
    update(false);
    scheduleHide();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hideTimer.current);
      pointerQuery.removeEventListener("change", updatePointer);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reveal]);

  function dragStart(event: PointerEvent<HTMLDivElement>) {
    if (coarsePointer || event.button !== 0) return;
    event.preventDefault();
    dragging.current = true;
    hovering.current = true;
    clearTimeout(hideTimer.current);
    const trackTop = trackRef.current?.getBoundingClientRect().top || 0;
    dragOffset.current = event.clientY - trackTop - geometry.thumbTop;
    event.currentTarget.setPointerCapture(event.pointerId);
    setVisible(true);
  }

  function dragMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const available = rect.height - geometry.thumbHeight;
    if (available <= 0) return;
    const thumbTop = Math.min(Math.max(event.clientY - rect.top - dragOffset.current, 0), available);
    scrollPageTo(thumbTop / available * geometry.maxScroll, true);
  }

  function dragEnd(event: PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    hovering.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    scheduleHide();
  }

  function trackClick(event: PointerEvent<HTMLDivElement>) {
    if (coarsePointer || event.target !== event.currentTarget || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const available = rect.height - geometry.thumbHeight;
    if (available <= 0) return;
    const thumbTop = Math.min(Math.max(event.clientY - rect.top - geometry.thumbHeight / 2, 0), available);
    scrollPageTo(thumbTop / available * geometry.maxScroll);
  }

  function keyScroll(event: KeyboardEvent<HTMLDivElement>) {
    const page = window.innerHeight * 0.9;
    const step = 60;
    const targets: Record<string, number> = {
      ArrowDown: geometry.scrollY + step,
      ArrowUp: geometry.scrollY - step,
      PageDown: geometry.scrollY + page,
      PageUp: geometry.scrollY - page,
      Home: 0,
      End: geometry.maxScroll,
    };
    if (event.key in targets) {
      event.preventDefault();
      scrollPageTo(targets[event.key]);
    }
  }

  return (
    <div
      ref={trackRef}
      className={`scrollbar-track${visible ? " is-visible" : ""}${coarsePointer ? " is-readonly" : ""}`}
      role="scrollbar"
      aria-controls="page-content"
      aria-label={lang === "ar" ? "موضع التمرير" : "Scroll position"}
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={Math.round(geometry.maxScroll)}
      aria-valuenow={Math.round(geometry.scrollY)}
      tabIndex={coarsePointer ? -1 : 0}
      onKeyDown={keyScroll}
      onFocus={() => { hovering.current = true; setVisible(true); clearTimeout(hideTimer.current); }}
      onBlur={() => { hovering.current = false; scheduleHide(); }}
      onPointerDown={trackClick}
      onPointerEnter={() => { hovering.current = true; setVisible(true); clearTimeout(hideTimer.current); }}
      onPointerLeave={() => { hovering.current = false; scheduleHide(); }}
    >
      <div
        className="scrollbar-thumb"
        style={{ height: `${geometry.thumbHeight}px`, transform: `translateY(${geometry.thumbTop}px)` }}
        onPointerDown={dragStart}
        onPointerMove={dragMove}
        onPointerUp={dragEnd}
        onPointerCancel={dragEnd}
      />
    </div>
  );
}
