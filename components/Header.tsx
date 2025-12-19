"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ScrollProgressBar from "@/components/ScrollProgressBar";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import GNBModal from "@/components/GNBModal";
import OutlineMenuIcon from "@/public/icons/outline-menu.svg";
import { removeKebab } from "@/lib/stringUtils";
import { useHeaderStore } from "@/store/headerStore";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showTitle, setShowTitle] = useState(false);

  const pathname = usePathname();
  const isPostPage = /^\/posts\/[^/]+\/[^/]+\/[^/]+\/?$/.test(pathname);

  const { title, section, category, type } = useHeaderStore();

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
    const handleTitleVisibility = () => {
      const currentY = window.scrollY;
      setShowTitle(currentY > 200);
    };

    window.addEventListener("scroll", handleTitleVisibility);
    return () => {
      setShowTitle(false);
      window.removeEventListener("scroll", handleTitleVisibility);
    };
  }, []);

  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  return (
    <>
      {isPostPage && <ScrollProgressBar />}

      <header
        aria-label="블로그 헤더"
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
            aria-label="GNB 메뉴 열기"
            aria-haspopup="dialog"
            aria-controls="gnb-modal"
          >
            <OutlineMenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>

          <Link
            href="/"
            aria-label="홈으로 이동"
            className="group text-xl font-bold text-center md:text-left md:flex-none transition duration-300"
          >
            {"Haram's TECH BLOG"}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange-500" />
          </Link>

          <div
            className={`hidden md:block transition-opacity duration-300 ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="px-6 max-w-[60vw] truncate whitespace-nowrap text-ellipsis text-base font-semibold">
              {type === "detail" && (
                <>
                  <Link
                    href={`/posts/${section ? `${section}` : ""}/${
                      category ? `${category}` : ""
                    }`}
                    className="hover:underline hover:text-orange-500 transition"
                    aria-label={`${category} 카테고리로 이동`}
                  >
                    [{removeKebab(category ? `${category}` : "")}]
                  </Link>{" "}
                  {title}
                </>
              )}
              {type === "category" && <>{title}</>}
              {type === "tag" && <>#{title}</>}
              {type === "default" && <>{title}</>}
            </h2>
          </div>
          <ThemeToggleButton />
        </div>
      </header>

      {isModalOpen && <GNBModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
