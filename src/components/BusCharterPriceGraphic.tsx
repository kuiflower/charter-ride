const rows = [
  { vehicle: "小巴 13人座", hours: "6 / 8 / 10小時", price: "¥70,000起" },
  { vehicle: "小巴 16人座", hours: "6 / 8 / 10小時", price: "¥90,000起" },
  { vehicle: "小巴 21人座", hours: "6 / 8 / 10小時", price: "¥95,000起" },
  { vehicle: "中巴 27人座", hours: "6 / 8 / 10小時", price: "¥110,000起" },
  { vehicle: "大巴 49人座", hours: "6 / 8 / 10小時", price: "¥115,000起" },
] as const;

export function BusCharterPriceGraphic() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#c5d8eb] bg-gradient-to-b from-[#dff0fb] via-[#eaf5fc] to-[#f3f9fd] px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-xl text-center">
        <h3 className="font-display text-2xl font-bold tracking-wide text-[#1b3a6b] md:text-3xl">
          巴士包車參考價
        </h3>
        <div className="relative mx-auto mt-3 h-px w-40 bg-[#1b3a6b]/80">
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#1b3a6b]" />
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(27,58,107,0.12)]">
        <div className="bg-[#1b3a6b] px-4 py-3 text-center text-base font-semibold text-white md:text-lg">
          小巴／中巴／大巴
        </div>
        <table className="w-full border-collapse text-sm md:text-base">
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.vehicle}
                className={index < rows.length - 1 ? "border-b border-[#d8dee8]" : undefined}
              >
                <td className="px-3 py-3.5 text-left font-medium text-[#243247] md:px-5">
                  {row.vehicle}
                </td>
                <td className="border-l border-[#d8dee8] px-3 py-3.5 text-center text-[#4a5568] md:px-5">
                  {row.hours}
                </td>
                <td className="border-l border-[#d8dee8] px-3 py-3.5 text-right font-semibold text-[#1b3a6b] md:px-5">
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-5 max-w-xl rounded-2xl bg-white px-4 py-3 text-center text-xs leading-relaxed text-[#1b3a6b] shadow-[0_8px_20px_rgba(27,58,107,0.08)] md:px-5 md:text-sm">
        小巴 +10,000JPY 可選中文司機；亦可加購中文導遊／隨車工作人員。
      </div>

      <p className="mt-5 text-center text-xs text-[#1b3a6b]/75 md:text-sm">
        實際價格依時段與淡旺季調整；最終以網站訂單為準
      </p>
    </div>
  );
}
