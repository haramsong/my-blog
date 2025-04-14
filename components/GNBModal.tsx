"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

import ProfileSection from "@/components/ProfileSection";
import { PostMeta } from "@/lib/posts";

interface GNBModalProps {
  isOpen: boolean;
  onClose: () => void;
  tree: Record<string, Record<string, PostMeta[]>>;
}

export default function GNBModal({ isOpen, onClose, tree }: GNBModalProps) {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[2]) setSelectedCategory(segments[2]);
  }, [pathname]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-gray-500/10 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 사이드 메뉴 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <button
            className="hover:scale-110 duration-150 cursor-pointer"
            onClick={onClose}
            aria-label="Open GNB Modal"
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>

        <ProfileSection />

        <div className="p-4">
          {Object.entries(tree).map(([section, categories]) => {
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
                      <Link
                        key={category}
                        href={`/posts/${section}/${category}`}
                        onClick={onClose}
                        className={`block text-sm font-semibold pl-1 rounded ${
                          selectedCategory?.toLowerCase() ===
                          category.toLowerCase()
                            ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                        <span className="text-xs text-gray-400">
                          ({posts.length})
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
