"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import FolderIcon from "@/public/icons/folder.svg";
import FolderOpenIcon from "@/public/icons/folder-open.svg";

import { usePostContext } from "@/context/PostContext";
import { removeKebab } from "@/lib/stringUtils";
import TriangleRightIcon from "@/public/icons/triangle-right.svg";

export default function GNBDirectoryTree() {
  const pathname = usePathname();
  const { tree } = usePostContext();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "posts" && segments[2]) {
      setSelectedCategory(decodeURIComponent(segments[2]));
    } else {
      setSelectedCategory(null);
    }
  }, [pathname]);

  return (
    <>
      {Object.entries(tree).map(([section, categories]) => {
        const sectionCount = Object.values(categories).reduce(
          (sum, count) => sum + count,
          0
        );
        const isOpen = openSections[section];
        const sectionId = `${section}-section-heading`;
        const listId = `${section}-section-list`;

        return (
          <li key={section} className="mb-4">
            <h3 id={sectionId} className="sr-only">
              {`${removeKebab(section)} 섹션`}
            </h3>
            <button
              onClick={() => toggleSection(section)}
              aria-expanded={isOpen}
              aria-controls={listId}
              className="text-m font-bold w-full text-left cursor-pointer flex items-center group/folder"
            >
              <span className="sr-only">
                {isOpen
                  ? `${removeKebab(section)} 섹션 접기`
                  : `${removeKebab(section)} 섹션 펼치기`}
              </span>
              <TriangleRightIcon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
              <span className="mr-1.5 flex items-center">
                {isOpen ? (
                  <FolderOpenIcon
                    className="w-5.5 h-5.5 text-orange-700 dark:text-orange-500 group-hover/folder:scale-110 transition-transform duration-300"
                    strokeWidth={2}
                  />
                ) : (
                  <FolderIcon
                    className="w-5.5 h-5.5 text-yellow-700 dark:text-yellow-500 group-hover/folder:scale-110 transition-transform duration-300"
                    strokeWidth={2}
                  />
                )}
              </span>
              <span className="mr-1.5">{removeKebab(section)}</span>
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                ({sectionCount})
              </span>
            </button>

            <ul
              id={listId}
              aria-labelledby={sectionId}
              className={`mt-1 pl-2 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                openSections[section] ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {Object.entries(categories).map(
                ([category, count], index, arr) => {
                  const isLast = index === arr.length - 1;
                  return (
                    <li
                      key={category}
                      className={`font-semibold pl-1 rounded cursor-pointer`}
                    >
                      <Link
                        href={`/posts/${section}/${category}`}
                        aria-label={`${removeKebab(
                          section
                        )} 섹션의 ${removeKebab(category)} 카테고리 보기`}
                        className={`flex text-sm items-center font-semibold mb-1 pl-3 rounded transition-colors duration-300 cursor-pointer
                          ${
                            selectedCategory?.toLowerCase() ===
                            category.toLowerCase()
                              ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200 hover:dark:bg-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        {`${isLast ? "└── " : "├── "} ${removeKebab(
                          category
                        )} `}
                        <span className="text-xs ml-1.5 font-normal text-gray-600 dark:text-gray-400">
                          {`(${count})`}
                        </span>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </li>
        );
      })}
    </>
  );
}
