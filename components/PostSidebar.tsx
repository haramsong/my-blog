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
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map((item) =>
        document.getElementById(item.id)
      );

      const scrollTop = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollTop) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, pathname]);

  if (!toc || toc.length === 0) return null;

  return (
    <aside className="fixed hidden lg:block top-16 right-0 w-[250px] max-h-[calc(100vh-4rem)] z-40 overflow-y-auto p-4 scrollbar-hide">
      <h2 className="font-semibold mb-2 !text-black dark:!text-white">
        Table of Contents
      </h2>
      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 8}px` }}
            className={`hover:underline cursor-pointer ${
              activeId === item.id ? "text-orange-500 font-semibold" : ""
            }`}
            onClick={() => handleScrollTo(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
