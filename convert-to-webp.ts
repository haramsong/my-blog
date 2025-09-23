import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = path.join(process.cwd(), "public/images");

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath));
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      results.push(filePath);
    }
  });

  return results;
}

async function convertToWebp() {
  const files = getAllFiles(INPUT_DIR);

  for (const file of files) {
    const outFile = file.replace(/\.(png|jpe?g)$/i, ".webp");
    if (!fs.existsSync(outFile)) {
      await sharp(file).webp({ quality: 80 }).toFile(outFile);
      console.log(`✅ Created WebP: ${outFile}`);
    }
  }
}

convertToWebp().catch((err) => {
  console.error(err);
  process.exit(1);
});
