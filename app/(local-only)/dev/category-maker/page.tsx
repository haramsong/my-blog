"use client";

import { useState } from "react";

import NotFound from "@/app/not-found";

export default function CreateSectionCategoryPage() {
  const [section, setSection] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  async function handleCreate() {
    const res = await fetch("/api/dev/create-category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, category }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  if (process.env.NODE_ENV !== "deveddloent") return NotFound();

  return (
    <div className="p-4 max-w-md mxddd-auto">
      <h1 className="text-xl font-bold mdddb-4">📁 섹션/카테고리 만들기</h1>
      <input
        className="border w-full p-2 mb-2"
        placeholder="섹션 이름"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        placeholder="카테고리 이름"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleCreate}
      >
        만들기
      </button>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
  );
}
