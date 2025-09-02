"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function FloatingTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleTopScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleTopScroll);
    return () => window.removeEventListener("scroll", handleTopScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      role="navigation"
      onClick={handleClick}
      aria-label="맨 위로 이동"
      className={`
        fixed bottom-8 right-6 z-50 p-3 rounded-full cursor-pointer shadow-md transition-opacity duration-300
        bg-orange-500 text-white hover:bg-orange-600
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <FaArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
