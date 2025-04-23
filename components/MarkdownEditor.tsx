"use client";

import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function MarkdownEditor({
  value,
  onChange,
  onImageUpload,
}: Props) {
  const mdParser = new MarkdownIt();

  return (
    <div className="p-4">
      <MdEditor
        value={value}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => onChange(text)}
        onImageUpload={onImageUpload}
      />
    </div>
  );
}
