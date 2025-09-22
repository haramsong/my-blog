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
    <aside className="fixed hidden lg:block top-18 right-0 w-[var(--sidebar-width)] max-h-[calc(100vh-4rem)] z-40 overflow-y-auto p-4 scrollbar-hide">
      <h2 className="font-semibold mb-2 !text-black dark:!text-white">목차</h2>
      <ul
        className="text-sm space-y-1 pl-1.5 border-l text-gray-700 dark:text-gray-300"
        style={{
          borderColor: "var(--border)",
        }}
      >
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 8}px` }}>
            <button
              onClick={() => handleScrollTo(item.id)}
              aria-current={activeId === item.id ? "true" : undefined}
              className={`group cursor-pointer transition duration-300 text-left ${
                activeId === item.id ? "text-orange-500 font-semibold" : ""
              }`}
            >
              {item.text}
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[0.05rem] bg-orange-500" />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
