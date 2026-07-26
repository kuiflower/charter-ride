import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getUploadDir } from "@/lib/paths";

type Params = { params: Promise<{ filename: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { filename } = await params;
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return NextResponse.json({ error: "無效檔名" }, { status: 400 });
  }

  const filePath = path.join(getUploadDir(), filename);
  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "檔案不存在" }, { status: 404 });
  }
}
