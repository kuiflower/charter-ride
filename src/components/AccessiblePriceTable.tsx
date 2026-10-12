const rows: Array<{
  price: number;
  people: number;
  model: string;
  luggage: number;
}> = [
  { price: 40000, people: 4, model: "4人座福祉車／6小時（可載兩台輪椅）", luggage: 2 },
  { price: 44000, people: 4, model: "4人座福祉車／8小時（可載兩台輪椅）", luggage: 2 },
  { price: 48000, people: 4, model: "4人座福祉車／10小時（可載兩台輪椅）", luggage: 2 },
  { price: 44000, people: 8, model: "8人座福祉車／6小時（可載兩台輪椅）", luggage: 5 },
  { price: 50000, people: 8, model: "8人座福祉車／8小時（可載兩台輪椅）", luggage: 5 },
  { price: 56000, people: 8, model: "8人座福祉車／10小時（可載兩台輪椅）", luggage: 5 },
];

function formatYen(value: number) {
  return value.toLocaleString("ja-JP");
}

export function AccessiblePriceTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line/80 bg-white">
      <div className="bg-jade px-4 py-3">
        <h3 className="text-base font-semibold text-white md:text-lg">
          ▶ 無障礙福祉包車價格表
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
        ▶
        司機持有專業介護證照；福祉車行李空間有限，建議提前與客服確認。系統會根據淡旺季自行調節價格，最終價格按網站訂單為基準！
      </p>
    </div>
  );
}
