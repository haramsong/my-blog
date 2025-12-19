"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const el = document.documentElement;
        const scrollTop = window.scrollY;
        const max = el.scrollHeight - el.clientHeight;

        const progress = max > 0 ? scrollTop / max : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-orange-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
