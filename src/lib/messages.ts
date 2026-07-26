import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { getProduct } from "./products";
import type { InquiryMessage, InquiryMessageInput, MessageType } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "messages.json");

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<InquiryMessage[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as InquiryMessage[];
}

async function writeAll(messages: InquiryMessage[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), "utf8");
}

export async function listMessages(options?: { type?: MessageType }) {
  const messages = await readAll();
  const filtered = options?.type
    ? messages.filter((item) => item.type === options.type)
    : messages;
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function createMessage(input: InquiryMessageInput) {
  let productName: string | null = null;
  let productId: string | null = input.productId ?? null;

  if (input.type === "product") {
    if (!productId) {
      throw new Error("缺少產品資訊");
    }
    const product = await getProduct(productId);
    if (!product) {
      throw new Error("產品不存在");
    }
    productName = product.name;
  } else {
    productId = null;
  }

  const messages = await readAll();
  const message: InquiryMessage = {
    id: randomUUID(),
    type: input.type,
    productId,
    productName,
    passportName: input.passportName.trim(),
    email: input.email.trim(),
    messagingId: input.messagingId.trim(),
    partySize: input.partySize,
    arrivalDate: input.arrivalDate,
    question: input.question.trim(),
    createdAt: new Date().toISOString(),
  };
  messages.unshift(message);
  await writeAll(messages);
  return message;
}

export async function deleteMessage(id: string) {
  const messages = await readAll();
  const next = messages.filter((item) => item.id !== id);
  if (next.length === messages.length) return false;
  await writeAll(next);
  return true;
}
