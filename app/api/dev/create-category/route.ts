import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { section, category } = await req.json();

  if (!section || !category) {
    return NextResponse.json(
      { message: "필수 정보가 없습니다." },
      { status: 400 }
    );
  }

  const basePath = path.join(process.cwd(), "posts", section, category);

  try {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
      return NextResponse.json({
        message: `생성 완료: ${section}/${category}`,
      });
    } else {
      return NextResponse.json({ message: "이미 존재하는 디렉토리입니다." });
    }
  } catch (error) {
    console.error("디렉토리 생성 중 오류 발생:", error);
    return NextResponse.json(
      { message: "디렉토리 생성 중 오류 발생" },
      { status: 500 }
    );
  }
}
