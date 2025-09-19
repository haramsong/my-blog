"use client";

import { useEffect, useState } from "react";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";
import OutlineMenuIcon from "@/public/icons/outline-menu.svg";

interface GNBModalProps {
  onClose: () => void;
}

export default function GNBModal({ onClose }: GNBModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        aria-hidden="true"
      />

      <aside
        id="gnb-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gnb-heading"
        className={`absolute top-0 left-0 h-full overflow-auto w-[250px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="gnb-heading" className="sr-only">
          GNB 메뉴
        </h2>
        <div className="px-6 py-5">
          <button
            className="hover:scale-110 duration-150 cursor-pointer"
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            aria-label="GNB 메뉴 닫기"
          >
            <OutlineMenuIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <ProfileSection />

        <nav aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">
            카테고리
          </h2>
          <ul className="p-4">
            <GNBDirectoryTree />
          </ul>
        </nav>
      </aside>
    </div>
  );
}
