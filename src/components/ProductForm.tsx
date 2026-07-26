"use client";

import { FormEvent, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import type { Product, ProductInput } from "@/lib/types";

const emptyForm: ProductInput = {
  category: "tourism",
  name: "",
  summary: "",
  description: "",
  price: 0,
  priceUnit: "起/天",
  showPrice: true,
  capacity: 4,
  vehicleType: "",
  imageUrl: "",
  detailImages: [],
  features: [],
  published: true,
};

const fieldClass =
  "w-full rounded-xl border border-line bg-mist px-4 py-3 outline-none ring-amber focus:ring-2";

type Props = {
  initial?: Product;
  mode: "create" | "edit";
};

async function uploadFile(file: File, kind: "cover" | "detail") {
  const body = new FormData();
  body.append("file", file);
  body.append("kind", kind);
  const res = await fetch("/api/upload", { method: "POST", body });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "圖片上傳失敗");
  }
  return (await res.json()) as {
    url: string;
    cropped: boolean;
    message?: string;
  };
}

export function ProductForm({ initial, mode }: Props) {
  const router = useRouter();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const detailInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<ProductInput>(
    initial
      ? {
          category: initial.category,
          name: initial.name,
          summary: initial.summary,
          description: initial.description,
          price: initial.price,
          priceUnit: initial.priceUnit,
          showPrice: initial.showPrice !== false,
          capacity: initial.capacity,
          vehicleType: initial.vehicleType,
          imageUrl: initial.imageUrl,
          detailImages: initial.detailImages ?? [],
          features: initial.features,
          published: initial.published,
        }
      : emptyForm,
  );
  const [featuresText, setFeaturesText] = useState(
    initial?.features.join("\n") ?? "",
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingDetails, setUploadingDetails] = useState(false);
  const [uploadHint, setUploadHint] = useState("");

  async function uploadCover(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    setUploadHint("");
    try {
      const result = await uploadFile(file, "cover");
      setForm((prev) => ({ ...prev, imageUrl: result.url }));
      setUploadHint(result.message || (result.cropped ? "封面圖已自動裁剪" : "封面圖已上傳"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "封面圖上傳失敗");
    } finally {
      setUploadingCover(false);
    }
  }

  async function uploadDetailImages(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadingDetails(true);
    setError("");
    setUploadHint("");
    try {
      const uploaded: string[] = [];
      let croppedCount = 0;
      for (const file of Array.from(files)) {
        const result = await uploadFile(file, "detail");
        uploaded.push(result.url);
        if (result.cropped) croppedCount += 1;
      }
      setForm((prev) => ({
        ...prev,
        detailImages: [...prev.detailImages, ...uploaded],
      }));
      setUploadHint(
        croppedCount > 0
          ? `已上傳 ${uploaded.length} 張詳情圖，其中 ${croppedCount} 張因超出尺寸已自動裁剪`
          : `已上傳 ${uploaded.length} 張詳情圖`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "詳情圖上傳失敗");
    } finally {
      setUploadingDetails(false);
    }
  }

  function removeDetailImage(url: string) {
    setForm((prev) => ({
      ...prev,
      detailImages: prev.detailImages.filter((item) => item !== url),
    }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.imageUrl.trim()) {
      setError("請先上傳封面圖");
      return;
    }

    setLoading(true);
    setError("");

    const payload: ProductInput = {
      ...form,
      features: featuresText
        .split(/[\n,，]/)
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const url =
      mode === "create" ? "/api/products" : `/api/products/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "儲存失敗");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const busy = loading || uploadingCover || uploadingDetails;

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="所屬板塊">
          <select
            required
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as ProductInput["category"],
              })
            }
            className={fieldClass}
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="產品名稱">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
            placeholder="例如：沖繩經典一日遊"
          />
        </Field>
        <Field label="車型">
          <input
            required
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
            className={fieldClass}
            placeholder="Alphard / HiAce / 無障礙福祉車"
          />
        </Field>
        <Field label="可乘人數">
          <input
            required
            type="number"
            min={1}
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
            className={fieldClass}
          />
        </Field>
        <Field label="價格（數字）">
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className={fieldClass}
          />
        </Field>
        <Field label="價格單位">
          <input
            required
            value={form.priceUnit}
            onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
            className={fieldClass}
            placeholder="起/天 或 起/趟"
          />
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-line bg-mist/70 px-4 py-3 text-sm">
        <input
          type="checkbox"
          className="mt-1"
          checked={form.showPrice}
          onChange={(e) => setForm({ ...form, showPrice: e.target.checked })}
        />
        <span>
          <span className="font-medium text-ink">前台顯示價格</span>
          <span className="mt-1 block text-ink/60">
            取消勾選後，前台將不同時顯示價格與價格單位。
          </span>
        </span>
      </label>

      <div className="rounded-2xl border border-dashed border-jade/40 bg-foam/40 p-4 md:p-5">
        <p className="text-sm font-medium text-ink">封面圖（本地上傳）</p>
        <p className="mt-2 text-xs leading-relaxed text-ink/60">
          建議尺寸：1600 × 1100 px（約 16:11），最小寬度 1200 px。
          <br />
          格式：JPG / PNG / WEBP / GIF；原圖不超過 8MB。
          <br />
          若超出建議尺寸，系統會自動居中裁剪並縮放至 1600 × 1100。
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              void uploadCover(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover}
            className="rounded-full bg-jade px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-jade-deep disabled:opacity-60"
          >
            {uploadingCover ? "上傳中..." : form.imageUrl ? "重新上傳封面圖" : "上傳封面圖"}
          </button>
          {form.imageUrl ? (
            <span className="text-xs text-jade-deep">已設定封面圖</span>
          ) : (
            <span className="text-xs text-red-500">尚未上傳封面圖</span>
          )}
        </div>
        {form.imageUrl ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.imageUrl}
              alt="封面預覽"
              className="aspect-[16/11] max-h-64 w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 md:p-5">
        <p className="text-sm font-medium text-ink">產品詳情圖（可多張上傳）</p>
        <p className="mt-2 text-xs leading-relaxed text-ink/60">
          建議尺寸：1200 × 900 px（約 4:3），最小寬度 1000 px。
          <br />
          格式：JPG / PNG / WEBP / GIF；原圖不超過 8MB，可一次選擇多張。
          <br />
          若超出建議尺寸，系統會自動居中裁剪並縮放至 1200 × 900。
        </p>
        <div className="mt-4">
          <input
            ref={detailInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => {
              void uploadDetailImages(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => detailInputRef.current?.click()}
            disabled={uploadingDetails}
            className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:brightness-110 disabled:opacity-60"
          >
            <span className="text-base leading-none">＋</span>
            {uploadingDetails ? "上傳中..." : "選擇並上傳詳情圖"}
          </button>
        </div>
        {form.detailImages.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {form.detailImages.map((url) => (
              <div key={url} className="relative overflow-hidden rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="詳情圖" className="aspect-[4/3] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeDetailImage(url)}
                  className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-1 text-xs text-white"
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-ink/45">尚未上傳詳情圖</p>
        )}
      </div>

      <Field label="一句話簡介">
        <input
          required
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          className={fieldClass}
        />
      </Field>

      <Field label="詳細說明">
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={fieldClass}
        />
      </Field>

      <Field label="賣點（每行一個，或用逗號分隔）">
        <textarea
          rows={4}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          className={fieldClass}
          placeholder={"專屬司機\n中文溝通\n行程可調"}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
        />
        發佈到前台
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {uploadHint ? <p className="text-sm text-jade-deep">{uploadHint}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-jade px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "儲存中..." : mode === "create" ? "創建產品" : "儲存修改"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-line px-5 py-2.5 text-sm"
        >
          取消
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-ink/70">{label}</span>
      {children}
    </label>
  );
}
