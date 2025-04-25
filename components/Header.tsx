"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import GNBModal from "@/components/GNBModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const pathname = usePathname();
  const isPostPage = /^\/posts\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    if (!isPostPage) return;

    const handleScrollBar = () => {
      const currentY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((currentY / docHeight) * 100, 100);
      const bar = document.getElementById("scroll-progress-bar");
      if (bar) {
        bar.style.transform = `scaleX(${scrollPercent / 100})`;
      }
    };

    window.addEventListener("scroll", handleScrollBar);
    return () => window.removeEventListener("scroll", handleScrollBar);
  }, [isPostPage]);

  useEffect(() => {
    const lastScrollY = { current: 0 };

    const handleHeaderVisibility = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleHeaderVisibility);
    return () => window.removeEventListener("scroll", handleHeaderVisibility);
  }, []);

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  return (
    <>
      {isPostPage && (
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999]">
          <div
            id="scroll-progress-bar"
            className="h-full bg-orange-500 origin-left transition-transform duration-100 ease-out"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      )}

      <header
        className={`p-2 text-xl font-bold sticky top-0 z-20 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-1">
          <button
            className="hover:scale-110 duration-150 cursor-pointer block md:hidden"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open GNB Modal"
          >
            <HiOutlineMenu size={24} />
          </button>

          <Link
            href="/"
            className="group text-xl font-bold text-center md:text-left md:flex-none transition duration-300"
          >
            {"Haram's Blog"}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange-500" />
          </Link>

          <ThemeToggleButton />
        </div>
      </header>

      {isModalOpen && <GNBModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
