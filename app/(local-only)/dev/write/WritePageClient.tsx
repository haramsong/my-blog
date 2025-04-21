"use client";

import { useState } from "react";

interface Props {
  options: Record<string, string[]>;
}

export default function WritePageClient({ options }: Props) {
  const sectionKeys = Object.keys(options);
  const [section, setSection] = useState(sectionKeys[0] || "");
  const [category, setCategory] = useState(options[section]?.[0] || "");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("/images/file.svg");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/write-post", {
      method: "POST",
      body: JSON.stringify({
        section,
        category,
        slug,
        title,
        summary,
        thumbnail,
        tags: tags.split(",").map((tag) => tag.trim()),
        content,
      }),
    });

    if (res.ok) {
      alert("작성 완료!");
    } else {
      alert("작성 실패");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">글 작성</h1>

      <label>Section</label>
      <select
        value={section}
        onChange={(e) => {
          const newSection = e.target.value;
          setSection(newSection);
          setCategory(options[newSection]?.[0] || "");
        }}
        className="block border p-2 my-2"
      >
        {sectionKeys.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block border p-2 my-2"
      >
        {options[section]?.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        className="block border p-2 w-full my-2"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <input
        className="block border p-2 w-full my-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="block border p-2 w-full my-2"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        className="block border p-2 w-full my-2"
        placeholder="Thumbnail (/images/...)"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <input
        className="block border p-2 w-full my-2"
        placeholder="Tags (쉼표로 구분)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <textarea
        placeholder="내용"
        className="w-full h-60 mt-4 border p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        작성하기
      </button>
    </div>
  );
}
