import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = path.join(process.cwd(), "public/images");

// 목록용 작은 썸네일 최대 가로 폭 (retina 대응)
const SMALL_THUMBNAIL_WIDTH = 400;

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

// 썸네일 원본(thumbnail-*.png|jpg)인지 판별. 이미 생성된 -sm 파일은 제외.
function isThumbnailSource(filePath: string): boolean {
  const base = path.basename(filePath);
  return /^thumbnail-/i.test(base) && !/-sm\.(png|jpe?g)$/i.test(base);
}

async function convertToWebp() {
  const files = getAllFiles(INPUT_DIR);

  for (const file of files) {
    // 1) 원본 -> webp 변환 (기존 동작 유지)
    const outFile = file.replace(/\.(png|jpe?g)$/i, ".webp");
    if (!fs.existsSync(outFile)) {
      await sharp(file).webp({ quality: 80 }).toFile(outFile);
      console.log(`✅ Created WebP: ${outFile}`);
    }

    // 2) 썸네일 원본 -> 목록용 작은 webp 생성
    if (isThumbnailSource(file)) {
      const smallFile = file.replace(/\.(png|jpe?g)$/i, "-sm.webp");
      if (!fs.existsSync(smallFile)) {
        await sharp(file)
          .resize({ width: SMALL_THUMBNAIL_WIDTH, withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(smallFile);
        console.log(`✅ Created small thumbnail: ${smallFile}`);
      }
    }
  }
}

convertToWebp().catch((err) => {
  console.error(err);
  process.exit(1);
});
