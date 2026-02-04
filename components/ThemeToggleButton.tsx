"use client";

import SunIcon from "@/public/icons/sun.svg";
import MoonIcon from "@/public/icons/moon.svg";

import { useTheme } from "@/lib/useTheme";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  return (
    <button
      id="theme-toggle-button"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={toggleTheme}
      className="cursor-pointer rounded"
    >
      {isDark ? (
        <SunIcon
          aria-hidden="true"
          className="w-6 h-6 text-yellow-500 hover:scale-110 hover:fill-yellow-500 hover:animate-spin transition-all duration-300 hover:[animation-duration:3s]"
        />
      ) : (
        <MoonIcon
          aria-hidden="true"
          className="w-6 h-6 text-gray-800 hover:fill-gray-800 hover:scale-110 hover:[transform:rotate(-8deg)] hover:transition-transform transition-all duration-300"
        />
      )}
    </button>
  );
}
