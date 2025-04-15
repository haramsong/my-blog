"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";
import { PostMeta } from "@/lib/posts";

interface GNBProps {
  tree: Record<string, Record<string, PostMeta[]>>;
}

export default function GNB({ tree }: GNBProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const storedCollapsed = localStorage.getItem("gnb-collapsed");
    if (storedCollapsed === "true") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("gnb-collapsed", collapsed.toString());
  }, [collapsed]);

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
            aria-label="Toggle GNB"
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
        className={`transition-all duration-300 overflow-hidden ${
          collapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-96"
        }`}
      >
        <ProfileSection />
      </div>

      <div
        className={`p-4 transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {!collapsed && <GNBDirectoryTree tree={tree} />}
      </div>
    </aside>
  );
}
