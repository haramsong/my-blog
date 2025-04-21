"use client";

import Link from "next/link";

export default function DevPage() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">개발 페이지</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link href="/dev/category-maker">카테고리 만들기</Link>
        </li>
        <li>
          <Link href="/dev/write">글쓰기</Link>
        </li>
      </ul>
    </div>
  );
}
