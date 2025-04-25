"use client";

import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";

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
      />

      <aside
        className={`absolute top-0 left-0 h-full overflow-auto w-[250px] bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <button
            className="hover:scale-110 duration-150 cursor-pointer"
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            aria-label="Close GNB Modal"
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>

        <ProfileSection />

        <div className="p-4">
          <GNBDirectoryTree />
        </div>
      </aside>
    </div>
  );
}
