// lib/useTheme.ts
import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    const localTheme = localStorage.getItem("theme");

    if (
      localTheme === "dark" ||
      (!localTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      classList.add("dark");
      setIsDark(true);
    } else {
      classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const classList = document.documentElement.classList;
    if (classList.contains("dark")) {
      classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return { isDark, toggleTheme };
}
