"use client";

import Link from "next/link";

export default function DevLinkFloatingButton() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <Link
      href="/dev"
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
    >
      DEV
    </Link>
  );
}
