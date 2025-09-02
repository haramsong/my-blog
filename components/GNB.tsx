"use client";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";
import { useGNBStore } from "@/store/gnbStore";

export default function GNB() {
  const { collapsed } = useGNBStore();

  return (
    <aside
      id="gnb-sidebar"
      aria-labelledby="gnb-heading"
      className="relative h-full pt-16 pb-25 border-r transition-all overflow-auto duration-300 z-auto"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
        width: collapsed ? "20px" : "250px",
        transition: "width 0.3s",
      }}
    >
      <h2 id="gnb-heading" className="sr-only">
        GNB 사이드바
      </h2>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          collapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-96"
        }`}
      >
        {!collapsed && <ProfileSection />}
      </div>

      <nav aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">
          카테고리
        </h2>
        <ul
          className={`p-4 transition-opacity duration-300 overflow-hidden ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          {!collapsed && <GNBDirectoryTree />}
        </ul>
      </nav>
    </aside>
  );
}
