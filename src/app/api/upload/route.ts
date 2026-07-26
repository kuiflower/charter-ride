import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const TARGETS = {
  cover: { width: 1600, height: 1100 },
  detail: { width: 1200, height: 900 },
} as const;

type UploadKind = keyof typeof TARGETS;

function resolveKind(value: FormDataEntryValue | null): UploadKind {
  return value === "detail" ? "detail" : "cover";
}

async function processImage(buffer: Buffer, kind: UploadKind) {
  const target = TARGETS[kind];
  const image = sharp(buffer, { animated: false }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const exceeds = width > target.width || height > target.height;
  if (!exceeds) {
    // 未超出建議尺寸：保留原圖，統一轉成高品質 JPEG 方便前台載入
    const output = await image.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
    return {
      buffer: output,
      cropped: false,
      width,
      height,
      outputWidth: (await sharp(output).metadata()).width ?? width,
      outputHeight: (await sharp(output).metadata()).height ?? height,
    };
  }

  // 超出尺寸：依目標比例居中裁剪，並縮放到建議尺寸
  const output = await image
    .resize(target.width, target.height, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: false,
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();

  return {
    buffer: output,
    cropped: true,
    width,
    height,
    outputWidth: target.width,
    outputHeight: target.height,
  };
}

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = resolveKind(formData.get("kind"));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "請選擇圖片檔案" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "僅支援 JPG / PNG / WEBP / GIF" }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "原圖不可超過 8MB" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const input = Buffer.from(await file.arrayBuffer());
  let processed;
  try {
    processed = await processImage(input, kind);
  } catch {
    return NextResponse.json({ error: "圖片處理失敗，請換一張再試" }, { status: 400 });
  }

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.jpg`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), processed.buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    cropped: processed.cropped,
    originalSize: { width: processed.width, height: processed.height },
    outputSize: {
      width: processed.outputWidth,
      height: processed.outputHeight,
    },
    message: processed.cropped
      ? `已自動裁剪為 ${processed.outputWidth}×${processed.outputHeight}`
      : "未超出建議尺寸，已優化儲存",
  });
}
