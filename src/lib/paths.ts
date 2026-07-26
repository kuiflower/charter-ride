import path from "path";

export function getDataDir() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "charter-ride-data");
  }
  return path.join(process.cwd(), "data");
}

export function getUploadDir() {
  if (process.env.VERCEL) {
    return path.join("/tmp", "charter-ride-uploads");
  }
  return path.join(process.cwd(), "public", "uploads");
}

export function getBundledDataFile(filename: string) {
  return path.join(process.cwd(), "data", filename);
}

export function toPublicUploadUrl(filename: string) {
  if (process.env.VERCEL) {
    return `/api/media/${filename}`;
  }
  return `/uploads/${filename}`;
}
