import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteMessage } from "@/lib/messages";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "留言不存在" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
