"use client";

import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

interface Props {
  options: Record<string, string[]>;
}

export default function WritePageClient({ options }: Props) {
  const mdParser = new MarkdownIt();

  const sectionKeys = Object.keys(options);
  const [section, setSection] = useState(sectionKeys[0] || "");
  const [category, setCategory] = useState(options[section]?.[0] || "");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("/images/file.svg");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const slugRef = useRef(slug);

  const handleEditorImageUpload = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      handleImageUpload(file)
        .then(resolve)
        .catch((err) => {
          console.error(err);

          setContent((prev) => prev.replace(/!\[Uploading.*?\]\(\)/g, ""));

          reject(err);
        });
    });
  };

  const handleImageUpload = async (
    file: File,
    isThumbnail: boolean = false
  ): Promise<string> => {
    console.log(slug);
    if (!slugRef.current) {
      alert("Slug를 먼저 입력해주세요.");
      throw new Error("No slug");
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadPath = `/images/${section}/${category}/${slugRef.current}/${
      isThumbnail ? "thumbnail" : uuidv4()
    }-${file.name}`;
    formData.append("path", uploadPath);

    const res = await fetch("/api/dev/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("업로드 실패");

    return uploadPath;
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/dev/write-post", {
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

  useEffect(() => {
    slugRef.current = slug;
  }, [slug]);

  if (process.env.NODE_ENV !== "development") return null;

  const labelClass = "inline-block w-24 font-bold";
  const inputClass = "border p-2 flex-1";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">글 작성</h1>

      {/* Section */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Section</label>
        <select
          value={section}
          onChange={(e) => {
            const newSection = e.target.value;
            setSection(newSection);
            setCategory(options[newSection]?.[0] || "");
          }}
          className={`${inputClass} cursor-pointer`}
        >
          {sectionKeys.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          {options[section]?.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Slug */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Slug</label>
        <input
          className={inputClass}
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      {/* Title */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Title</label>
        <input
          className={inputClass}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Summary</label>
        <input
          className={inputClass}
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      {/* Thumbnail */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Thumbnail</label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const thumbnailFile = e.target.files?.[0];
            if (!thumbnailFile) return;

            try {
              const path = await handleImageUpload(thumbnailFile, true);
              setThumbnail(path);
            } catch (err: unknown) {
              if (err instanceof Error && err.message === "No slug") {
                e.target.value = "";
                return;
              }

              console.error(err);
              alert("썸네일 업로드에 실패했어요.");
            }
          }}
        />
        <div className="flex flex-grow justify-between items-center">
          <button
            type="button"
            className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300 shadow-md active:shadow-inner transition-shadow"
            onClick={() => fileInputRef.current?.click()}
          >
            파일 선택
          </button>

          <span className="ml-4 text-sm text-gray-600 truncate">
            {thumbnail !== "/images/file.svg" ? (
              <a
                href={thumbnail}
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer hover:text-blue-500"
              >
                {thumbnail}
              </a>
            ) : (
              "선택된 파일 없음"
            )}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center my-2">
        <label className={labelClass}>Tags</label>
        <input
          className={inputClass}
          placeholder="Tags (쉼표로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="my-4">
        <label className="block font-bold mb-1">Content</label>
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setContent(text)}
          onImageUpload={handleEditorImageUpload}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 cursor-pointer shadow-md active:shadow-inner transition-shadow text-white p-2 rounded"
      >
        작성하기
      </button>
    </div>
  );
}
