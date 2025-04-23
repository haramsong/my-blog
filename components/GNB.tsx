"use client";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";
import { useGNBStore } from "@/store/gnbStore";

export default function GNB() {
  const { collapsed } = useGNBStore();

  return (
    <aside
      className="relative h-full pt-16 border-r transition-all duration-300 z-auto"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
        width: collapsed ? "20px" : "250px",
        transition: "width 0.3s",
      }}
    >
      <div
        className={`transition-all duration-300 overflow-hidden ${
          collapsed ? "opacity-0 max-h-0" : "opacity-100 max-h-96"
        }`}
      >
        {!collapsed && <ProfileSection />}
      </div>

      <div
        className={`p-4 transition-opacity duration-300 overflow-hidden ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        {!collapsed && <GNBDirectoryTree />}
      </div>
    </aside>
  );
}
