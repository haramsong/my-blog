import { writeFile, mkdir, readdir, stat } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const body = await request.json();
  const { section, category, slug, title, summary, thumbnail, tags, content } =
    body;

  const postDir = path.join(process.cwd(), "posts", section, category);
  const filePath = path.join(postDir, `${slug}.md`);

  // ✅ 전체 post 수 계산
  async function getPostCount(): Promise<number> {
    const baseDir = path.join(process.cwd(), "posts");

    async function walk(dir: string): Promise<number> {
      const files = await readdir(dir);
      let count = 0;

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = await stat(fullPath);
        if (stats.isDirectory()) {
          count += await walk(fullPath);
        } else if (file.endsWith(".md")) {
          count++;
        }
      }

      return count;
    }

    return walk(baseDir);
  }

  const postCount = await getPostCount();
  const newId = postCount + 1;

  const formattedDate = new Date().toISOString().split("T")[0]; // yyyy-MM-dd

  const frontmatter = `---
id: ${newId}
title: "${title}"
date: "${formattedDate}"
summary: "${summary}"
thumbnail: "${thumbnail}"
tags: [${tags.map((t: string) => `"${t}"`).join(", ")}]
---\n\n`;

  const fullContent = frontmatter + content;

  try {
    await mkdir(postDir, { recursive: true });
    await writeFile(filePath, fullContent, "utf8");

    return new Response("작성 성공", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("작성 실패", { status: 500 });
  }
}
