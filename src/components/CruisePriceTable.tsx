const rows: Array<{
  price: number;
  people: number;
  model: string;
  luggage: number;
  tone?: "default" | "green" | "blue" | "red";
}> = [
  { price: 31000, people: 4, model: "4人座／6小時（TOYOTA 或同級車）", luggage: 2 },
  { price: 32000, people: 4, model: "4人座／7小時（TOYOTA 或同級車）", luggage: 2 },
  { price: 33000, people: 4, model: "4人座／8小時（TOYOTA 或同級車）", luggage: 2 },
  { price: 34000, people: 4, model: "4人座／9小時（TOYOTA 或同級車）", luggage: 2 },
  { price: 35000, people: 4, model: "4人座／10小時（TOYOTA 或同級車）", luggage: 2 },
  { price: 36000, people: 6, model: "6人座／6小時（ALPHARD 或同級車）", luggage: 4 },
  { price: 38000, people: 6, model: "6人座／7小時（ALPHARD 或同級車）", luggage: 4 },
  { price: 40000, people: 6, model: "6人座／8小時（ALPHARD 或同級車）", luggage: 4 },
  { price: 42000, people: 6, model: "6人座／9小時（ALPHARD 或同級車）", luggage: 4 },
  { price: 44000, people: 6, model: "6人座／10小時（ALPHARD 或同級車）", luggage: 4 },
  { price: 38000, people: 9, model: "9人座／6小時（HIACE 或同級車）", luggage: 9 },
  { price: 40000, people: 9, model: "9人座／7小時（HIACE 或同級車）", luggage: 9 },
  { price: 42000, people: 9, model: "9人座／8小時（HIACE 或同級車）", luggage: 9 },
  { price: 45000, people: 9, model: "9人座／9小時（HIACE 或同級車）", luggage: 9 },
  { price: 48000, people: 9, model: "9人座／10小時（HIACE 或同級車）", luggage: 9 },
  { price: 44000, people: 8, model: "＊8人座福祉車／6小時（HIACE）", luggage: 5, tone: "green" },
  { price: 47000, people: 8, model: "＊8人座福祉車／7小時（HIACE）", luggage: 5, tone: "green" },
  { price: 50000, people: 8, model: "＊8人座福祉車／8小時（HIACE）", luggage: 5, tone: "green" },
  { price: 53000, people: 8, model: "＊8人座福祉車／9小時（HIACE）", luggage: 5, tone: "green" },
  { price: 56000, people: 8, model: "＊8人座福祉車／10小時（HIACE）", luggage: 5, tone: "green" },
  { price: 70000, people: 13, model: "小巴 13人座／6小時", luggage: 3, tone: "blue" },
  { price: 80000, people: 13, model: "小巴 13人座／8小時", luggage: 3, tone: "blue" },
  { price: 90000, people: 13, model: "小巴 13人座／10小時", luggage: 3, tone: "blue" },
  { price: 90000, people: 16, model: "小巴 16人座／6小時", luggage: 10, tone: "blue" },
  { price: 100000, people: 16, model: "小巴 16人座／8小時", luggage: 10, tone: "blue" },
  { price: 110000, people: 16, model: "小巴 16人座／10小時", luggage: 10, tone: "blue" },
  { price: 95000, people: 21, model: "小巴 21人座／6小時", luggage: 15, tone: "blue" },
  { price: 105000, people: 21, model: "小巴 21人座／8小時", luggage: 15, tone: "blue" },
  { price: 115000, people: 21, model: "小巴 21人座／10小時", luggage: 15, tone: "blue" },
  { price: 115000, people: 49, model: "大巴 49人座／6小時", luggage: 40, tone: "blue" },
  { price: 135000, people: 49, model: "大巴 49人座／8小時", luggage: 40, tone: "blue" },
  { price: 155000, people: 49, model: "大巴 49人座／10小時", luggage: 40, tone: "blue" },
  { price: 42000, people: 4, model: "中文司機 4人座／8小時", luggage: 2, tone: "red" },
  { price: 45000, people: 4, model: "中文司機 4人座／10小時", luggage: 2, tone: "red" },
  { price: 47000, people: 6, model: "中文司機 6人座／8小時", luggage: 4, tone: "red" },
  { price: 50000, people: 6, model: "中文司機 6人座／10小時", luggage: 4, tone: "red" },
  { price: 50000, people: 9, model: "中文司機 9人座／8小時", luggage: 9, tone: "red" },
  { price: 55000, people: 9, model: "中文司機 9人座／10小時", luggage: 9, tone: "red" },
];

const toneClass = {
  default: "text-ink",
  green: "text-emerald-700",
  blue: "text-blue-700",
  red: "text-rose-700",
} as const;

function formatYen(value: number) {
  return value.toLocaleString("ja-JP");
}

export function CruisePriceTable() {
  return (
    <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_30px_rgba(15,33,51,0.06)]">
      <div className="bg-jade px-4 py-3">
        <h3 className="text-base font-semibold text-white md:text-lg">
          ▶ 郵輪自由行包車價格表
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
                className={`${index % 2 === 0 ? "bg-[#eaf3fb]" : "bg-white"} ${toneClass[row.tone ?? "default"]}`}
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
        ▶ 系統會根據淡旺季自行調節價格，最終價格按網站訂單為基準！
      </p>
    </div>
  );
}
