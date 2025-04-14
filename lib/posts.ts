import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

export interface PostMeta {
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  slug: string[];
  category: string;
  section: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const slugger = new GithubSlugger();

const postsDir = path.join(process.cwd(), "posts");

function extractText(node: any): string {
  if (node.type === "text") return node.value;
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join("");
  }

  return "";
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
}

export function getPostMeta(): PostMeta[] {
  return getAllMarkdownFiles(postsDir).map((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    const relativePath = path.relative(postsDir, filePath);
    const slug = relativePath.replace(/\.md$/, "").split(path.sep);
    const [section, category] = slug;

    return {
      ...(data as Omit<PostMeta, "slug" | "section" | "category">),
      slug,
      section,
      category,
    };
  });
}

export async function getPost(slug: string) {
  return getPostBySlugArray(slug.split("/"));
}

export async function getPostList(section: string, category: string) {
  const allPosts = getPostMeta();

  return allPosts.filter(
    (post) => post.slug[0] === section && post.slug[1] === category
  );
}

export function getPostMetaTree() {
  const files = getAllMarkdownFiles(postsDir);
  const posts: PostMeta[] = files.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    const relativePath = path.relative(postsDir, filePath);
    const slug = relativePath.replace(/\.md$/, "").split(path.sep);
    const [section, category] = slug;

    return {
      ...(data as Omit<PostMeta, "slug" | "section" | "category">),
      slug,
      section,
      category,
    };
  });

  const tree = posts.reduce((acc, post) => {
    if (!acc[post.section]) acc[post.section] = {};
    if (!acc[post.section][post.category])
      acc[post.section][post.category] = [];
    acc[post.section][post.category].push(post);

    return acc;
  }, {} as Record<string, Record<string, PostMeta[]>>);

  return tree;
}

function getAllMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  });

  return results;
}

export function getAllSlugs(): string[] {
  const files = getAllMarkdownFiles(postsDir);
  return files.map((filePath) => path.basename(filePath, ".md"));
}

export function getTagsWithCount(): Record<string, number> {
  const files = getAllMarkdownFiles(postsDir);
  const tagCounts: Record<string, number> = {};

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const tags: string[] = data.tags || [];

    tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return tagCounts;
}

export function getAllSlugArrays(): string[][] {
  const files = getAllMarkdownFiles(postsDir);
  return files.map((filePath) => {
    const relativePath = path.relative(postsDir, filePath);
    const noExt = relativePath.replace(/\.md$/, "");
    return noExt.split(path.sep);
  });
}

export async function getPostBySlugArray(slugArr: string[]) {
  slugger.reset();

  const decodedSlugArr = slugArr.map((s) => decodeURIComponent(s));
  const fullPath = path.join(postsDir, ...decodedSlugArr) + ".md";

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const toc: TocItem[] = [];

  const processedContent = await remark()
    .use(remarkParse)
    .use(() => (tree) => {
      visit(tree, "heading", (node: any) => {
        if (node.depth > 3) return;

        const text = toString(node);
        const id = slugger.slug(text);

        node.data ||= {};
        node.data.hProperties = { id };
        node.data.id = id;

        toc.push({
          id,
          text,
          level: node.depth,
        });
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const contentHtml = processedContent.toString();
  const [section = "", category = "", slug = ""] = decodedSlugArr;

  return {
    slug: decodedSlugArr.join("/"),
    title: data.title ?? slug,
    date: data.date ?? "",
    contentHtml,
    summary: data.summary ?? "",
    thumbnail: data.thumbnail ?? "",
    tags: data.tags ?? [],
    section,
    category,
    toc,
  };
}
