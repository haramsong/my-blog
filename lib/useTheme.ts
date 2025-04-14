import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  const updateDom = (dark: boolean) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", dark ? "dark" : "light");
    html.classList.toggle("dark", dark);
  };

  const toggleTheme = () => {
    const next = !isDark;
    localStorage.setItem("theme", next ? "dark" : "light");
    updateDom(next);
    setIsDark(next);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark = stored === "dark" || (!stored && prefersDark);
    updateDom(shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  return { isDark, toggleTheme };
}
