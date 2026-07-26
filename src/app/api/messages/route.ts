import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createMessage, listMessages } from "@/lib/messages";
import { normalizeMessageInput } from "@/lib/message-input";
import type { MessageType } from "@/lib/types";

export async function GET(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const messages = await listMessages(
    type === "general" || type === "product"
      ? { type: type as MessageType }
      : undefined,
  );
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const input = normalizeMessageInput(body);
  if (!input) {
    return NextResponse.json({ error: "請填寫完整的留言資訊" }, { status: 400 });
  }

  try {
    const message = await createMessage(input);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    const text = error instanceof Error ? error.message : "提交失敗";
    return NextResponse.json({ error: text }, { status: 400 });
  }
}
