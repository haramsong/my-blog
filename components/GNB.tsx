"use client";

import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface GNBProps {
  tree: Record<string, Record<string, PostMeta[]>>;
}

export default function GNB({ tree }: GNBProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedCollapsed = localStorage.getItem("gnb-collapsed");
    if (storedCollapsed === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("gnb-collapsed", collapsed.toString());
  }, [collapsed]);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[2]) setSelectedCategory(segments[2]);
  }, [pathname]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className="relative h-full border-r transition-all duration-300 z-20"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
        width: collapsed ? "20px" : "250px",
        transition: "width 0.3s",
      }}
    >
      {/* 토글 버튼 */}
      <div className="absolute top-3 -right-3.5 z-30">
        <div className="group relative">
          <button
            onClick={toggleCollapse}
            className="w-8 h-8 rounded-full
             bg-gray-200 text-gray-800
             dark:bg-gray-700 dark:text-white
             group-hover:opacity-100 opacity-0 transition-opacity duration-300
             shadow-md border border-gray-300 dark:border-gray-600"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`p-4 transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {!collapsed &&
          Object.entries(tree).map(([section, categories]) => {
            const sectionCount = Object.values(categories).reduce(
              (sum, posts) => sum + posts.length,
              0
            );

            return (
              <div key={section} className="mb-4">
                <button
                  onClick={() => toggleSection(section)}
                  className="text-m font-bold w-full text-left cursor-pointer"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}{" "}
                  <span className="text-xs text-gray-400">
                    ({sectionCount})
                  </span>
                </button>

                {openSections[section] && (
                  <div className="mt-2 pl-2 space-y-2">
                    {Object.entries(categories).map(([category, posts]) => (
                      <div key={category}>
                        <div
                          className={`font-semibold mb-1 pl-1 rounded cursor-pointer`}
                        >
                          <Link
                            href={`/posts/${section}/${category}`}
                            className={`block text-sm font-semibold mb-1 pl-1 rounded cursor-pointer
                          ${
                            selectedCategory?.toLowerCase() ===
                            category.toLowerCase()
                              ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200"
                          }`}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}{" "}
                            <span className="text-xs text-gray-400">
                              ({posts.length})
                            </span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </aside>
  );
}
