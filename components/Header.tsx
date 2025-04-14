// components/Header.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";

import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Header() {
  useEffect(() => {
    console.log("Header mounted!");

    const handleScroll = () => {
      console.log("scrolling..."); // 여기 안 찍히는 게 문제야

      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      console.log("scrollPercent:", scrollPercent); // 이거 확인

      const bar = document.getElementById("scroll-progress-bar");
      if (bar) {
        bar.style.transform = `scaleX(${scrollPercent / 100})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999]">
        <div
          id="scroll-progress-bar"
          className="h-full bg-orange-500 origin-left transition-transform duration-100 ease-out"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }} // 여기도 명확하게 지정
        />
      </div>
      <header
        className="p-2 text-xl font-bold sticky top-0 z-10"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex justify-between items-center px-4 py-1">
          <Link href={`/`} className={`text-xl font-bold cursor-pointer`}>
            Haram's Blog
          </Link>
          <ThemeToggleButton />
        </div>
      </header>
    </>
  );
}
