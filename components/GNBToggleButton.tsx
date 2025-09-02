"use client";

import { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useGNBStore } from "@/store/gnbStore";

export default function GNBToggleButton() {
  const { collapsed, setCollapsed } = useGNBStore();

  useEffect(() => {
    localStorage.setItem("gnb-collapsed", collapsed.toString());

    if (collapsed) {
      document.body.classList.add("gnb-collapsed");
    } else {
      document.body.classList.remove("gnb-collapsed");
    }
  }, [collapsed]);

  return (
    <div className="absolute top-3 -right-3.5 z-30">
      <div className="relative">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-8 h-8 rounded-full
             bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white
             ${collapsed ? "opacity-100" : "opacity-0 group-hover:opacity-100"} 
             hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-white dark:hover:text-gray-800 transition-opacity duration-300 cursor-pointer
             shadow-md border border-gray-300 dark:border-gray-600`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={collapsed ? "GNB 펼치기" : "GNB 접기"}
          aria-expanded={!collapsed}
          aria-controls="gnb-sidebar"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
