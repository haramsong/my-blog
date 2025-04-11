// components/Header.tsx
"use client";

import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function Header() {
  return (
    <header
      className="p-2 text-xl font-bold sticky top-0 z-10"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex justify-between items-center px-4 py-1">
        <h1 className="text-xl font-bold">My Blog</h1>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
