"use client";

import Link from "next/link";

import NotFound from "@/app/not-found";

export default function DevPage() {
  if (process.env.NODE_ENV !== "development") return NotFound();

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-5xl font-bold mb-10">개발 페이지</h1>
      <ul className="list-disc pl-5 space-y-4">
        <li className="text-2xl dark:hover:bg-gray-700 hover:bg-gray-300 p-2 border-2 list-none font-bold">
          <Link className="flex" href="/dev/category-maker">
            카테고리 만들기
          </Link>
        </li>
        <li className="text-2xl dark:hover:bg-gray-700 hover:bg-gray-300 p-2 border-2 list-none font-bold">
          <Link className="flex" href="/dev/write">
            글쓰기
          </Link>
        </li>
      </ul>
    </div>
  );
}
