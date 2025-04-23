import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  const pathParam = data.get("path") as string;
  const dirPath = path.join(process.cwd(), "public", path.dirname(pathParam));
  const filePath = path.join(process.cwd(), "public", pathParam);

  await mkdir(dirPath, { recursive: true });
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: pathParam });
}
