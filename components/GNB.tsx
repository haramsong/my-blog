"use client";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";
import { PostMeta } from "@/lib/posts";
import { useGNBStore } from "@/store/gnbStore";

interface GNBProps {
  tree: Record<string, Record<string, PostMeta[]>>;
}

export default function GNB({ tree }: GNBProps) {
  const { collapsed } = useGNBStore();

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
        {!collapsed && <GNBDirectoryTree tree={tree} />}
      </div>
    </aside>
  );
}
