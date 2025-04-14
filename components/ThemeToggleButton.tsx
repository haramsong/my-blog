"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useTheme } from "@/lib/useTheme";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="ml-4 cursor-pointer p-2 rounded">
      {isDark ? (
        <SunIcon className="w-6 h-6 text-yellow-500 hover:scale-110 hover:fill-yellow-500 hover:animate-spin transition-all duration-300 hover:[animation-duration:3s]" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-800 hover:fill-gray-800 hover:scale-110 hover:[transform:rotate(-8deg)] hover:transition-transform transition-all duration-300" />
      )}
    </button>
  );
}
