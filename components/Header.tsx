"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import GNBModal from "@/components/GNBModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isPostPage = /^\/posts\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
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
      {isPostPage && (
        // 스크롤 진행바
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999]">
          <div
            id="scroll-progress-bar"
            className="h-full bg-orange-500 origin-left transition-transform duration-100 ease-out"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      )}

      {/* 헤더 영역 */}
      <header
        className="p-2 text-xl font-bold sticky top-0 z-20"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-1">
          {/* 햄버거 메뉴: md 이하에서만 보임 */}
          <button
            className="hover:scale-110 duration-150 cursor-pointer block md:hidden"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open GNB Modal"
          >
            <HiOutlineMenu size={24} />
          </button>

          {/* 블로그 타이틀 */}
          <Link
            href="/"
            className="text-xl font-bold text-center md:text-left md:flex-none"
          >
            {"Haram's Blog"}
          </Link>

          {/* 테마 토글 버튼 */}
          <ThemeToggleButton />
        </div>
      </header>

      {/* GNB 모달: md 이하에서만 띄움 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-start md:hidden">
          <div
            className={`w-[250px] bg-white dark:bg-gray-800 h-full shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
              isModalOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <GNBModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

          {/* 바깥 영역 클릭 시 닫기 */}
          <div className="flex-1" onClick={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}
