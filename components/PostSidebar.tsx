"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function PostSidebar({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start", // 보장
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map((item) =>
        document.getElementById(item.id)
      );

      const scrollTop = window.scrollY + 100; // 헤더 여백 고려

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollTop) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 초기 체크

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, pathname]);

  if (!toc || toc.length === 0) return null;

  return (
    <aside className="fixed top-16 right-0 w-[250px] max-h-[calc(100vh-4rem)] z-40 overflow-y-auto p-4">
      <h2 className="font-semibold mb-2 text-black dark:text-white">
        Table of Contents
      </h2>
      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`ml-${
              (item.level - 1) * 2
            } hover:underline cursor-pointer`}
            onClick={() => handleScrollTo(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
