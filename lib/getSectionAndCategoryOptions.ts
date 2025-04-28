import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "posts");

export function getSectionAndCategoryOptions() {
  const sections = fs.readdirSync(postsDir).filter((file) => {
    const fullPath = path.join(postsDir, file);
    return fs.statSync(fullPath).isDirectory();
  });

  const result: { section: string; categories: string[] }[] = [];

  sections.forEach((section) => {
    const sectionPath = path.join(postsDir, section);
    const categories = fs.readdirSync(sectionPath).filter((file) => {
      const fullPath = path.join(sectionPath, file);
      return fs.statSync(fullPath).isDirectory();
    });

    result.push({ section, categories });
  });

  return result;
}
