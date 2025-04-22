"use client";

import { HiOutlineMenu } from "react-icons/hi";

import ProfileSection from "@/components/ProfileSection";
import GNBDirectoryTree from "@/components/GNBDirectoryTree";

interface GNBModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GNBModal({ isOpen, onClose }: GNBModalProps) {
  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-gray-500/10 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 사이드 메뉴 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <button
            className="hover:scale-110 duration-150 cursor-pointer"
            onClick={onClose}
            aria-label="Open GNB Modal"
          >
            <HiOutlineMenu size={24} />
          </button>
        </div>

        <ProfileSection />

        <div className="p-4">
          <GNBDirectoryTree />
        </div>
      </aside>
    </>
  );
}
