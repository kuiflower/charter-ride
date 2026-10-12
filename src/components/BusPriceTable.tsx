const rows: Array<{
  price: number;
  people: number;
  model: string;
  luggage: number;
}> = [
  { price: 70000, people: 13, model: "小巴 13人座／6小時", luggage: 8 },
  { price: 80000, people: 13, model: "小巴 13人座／8小時", luggage: 8 },
  { price: 90000, people: 13, model: "小巴 13人座／10小時", luggage: 8 },
  { price: 90000, people: 16, model: "小巴 16人座／6小時", luggage: 12 },
  { price: 100000, people: 16, model: "小巴 16人座／8小時", luggage: 12 },
  { price: 110000, people: 16, model: "小巴 16人座／10小時", luggage: 12 },
  { price: 95000, people: 21, model: "小巴 21人座／6小時", luggage: 15 },
  { price: 105000, people: 21, model: "小巴 21人座／8小時", luggage: 15 },
  { price: 115000, people: 21, model: "小巴 21人座／10小時", luggage: 15 },
  { price: 110000, people: 27, model: "中巴 27人座／6小時", luggage: 20 },
  { price: 130000, people: 27, model: "中巴 27人座／8小時", luggage: 20 },
  { price: 150000, people: 27, model: "中巴 27人座／10小時", luggage: 20 },
  { price: 115000, people: 49, model: "大巴 49人座／6小時", luggage: 40 },
  { price: 135000, people: 49, model: "大巴 49人座／8小時", luggage: 40 },
  { price: 155000, people: 49, model: "大巴 49人座／10小時", luggage: 40 },
];

function formatYen(value: number) {
  return value.toLocaleString("ja-JP");
}

export function BusPriceTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line/80 bg-white">
      <div className="bg-jade px-4 py-3">
        <h3 className="text-base font-semibold text-white md:text-lg">
          ▶ 沖繩巴士包車價格表
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#5b9bd5] text-left text-white">
              <th className="px-3 py-2.5 font-medium">價格（JPY）</th>
              <th className="px-3 py-2.5 font-medium">人數</th>
              <th className="px-3 py-2.5 font-medium">車型及時間</th>
              <th className="px-3 py-2.5 font-medium">行李</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.model}-${index}`}
                className={`${index % 2 === 0 ? "bg-[#eaf3fb]" : "bg-white"} text-ink`}
              >
                <td className="whitespace-nowrap px-3 py-2 font-semibold">
                  {formatYen(row.price)}
                </td>
                <td className="px-3 py-2">{row.people}</td>
                <td className="px-3 py-2">{row.model}</td>
                <td className="px-3 py-2">{row.luggage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-ink/70 md:text-sm">
        ▶ 小巴+10000JPY可選中文司機；亦可加購中文導遊／隨車工作人員。系統會根據淡旺季自行調節價格，最終價格按網站訂單為基準！
      </p>
    </div>
  );
}
