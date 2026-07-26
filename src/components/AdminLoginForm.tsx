"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("密碼錯誤，請重試");
      return;
    }
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-sm md:p-8"
    >
      <h1 className="font-display text-3xl">遇見沖繩包車 · 後台登入</h1>
      <p className="text-sm text-ink/65">輸入管理密碼後可創建、編輯與下架產品。</p>
      <label className="block text-sm">
        <span className="mb-2 block text-ink/70">密碼</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-line bg-mist px-4 py-3 outline-none ring-amber focus:ring-2"
          placeholder="預設 admin123"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-jade py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "登入中..." : "進入後台"}
      </button>
    </form>
  );
}
