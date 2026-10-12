const zones = ["A", "B-D", "C", "E", "F", "G", "H-I", "J"] as const;

const vehicles: Array<{
  label: string;
  people: number;
  luggage: number;
  prices: number[];
}> = [
  {
    label: "小巴 13人座",
    people: 13,
    luggage: 5,
    prices: [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
  },
  {
    label: "小巴 16人座",
    people: 16,
    luggage: 16,
    prices: [45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000],
  },
  {
    label: "小巴 21人座",
    people: 21,
    luggage: 16,
    prices: [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000],
  },
  {
    label: "大巴 45人座",
    people: 45,
    luggage: 40,
    prices: [65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000],
  },
];

const zoneNotes = [
  { zone: "A", area: "那霸市" },
  { zone: "B-D", area: "豐見城市・南風原町・宜野灣市・北谷町・西原町" },
  { zone: "C", area: "糸滿市・八重瀨・與那原町・南城市・中城村" },
  { zone: "E", area: "沖繩市・嘉手納町・讀谷村・うるま市・北中城村" },
  { zone: "F", area: "恩納村・宜野座村・金武町" },
  { zone: "G", area: "名護市" },
  { zone: "H-I", area: "本部町・今歸仁・大宜味村・東村" },
  { zone: "J", area: "國頭村" },
] as const;

function formatYen(value: number) {
  return value.toLocaleString("ja-JP");
}

export function AirportBusPriceTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line/80 bg-white">
      <div className="bg-jade px-4 py-3">
        <h3 className="text-base font-semibold text-white md:text-lg">
          ▶ 那霸機場巴士接送機價格表
        </h3>
      </div>

      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-medium text-ink">接送機區域對照</p>
        <ul className="mt-2 grid gap-1.5 text-xs leading-relaxed text-ink/75 sm:grid-cols-2 md:text-sm">
          {zoneNotes.map((item) => (
            <li key={item.zone}>
              <span className="font-semibold text-jade-deep">{item.zone}</span>
              <span className="mx-1 text-ink/30">·</span>
              {item.area}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#5b9bd5] text-left text-white">
              <th className="whitespace-nowrap px-3 py-2.5 font-medium">車型</th>
              <th className="whitespace-nowrap px-3 py-2.5 font-medium">人數</th>
              <th className="whitespace-nowrap px-3 py-2.5 font-medium">行李</th>
              {zones.map((zone) => (
                <th key={zone} className="whitespace-nowrap px-3 py-2.5 font-medium">
                  {zone}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={vehicle.label}
                className={index % 2 === 0 ? "bg-[#eaf3fb] text-ink" : "bg-white text-ink"}
              >
                <td className="whitespace-nowrap px-3 py-2 font-medium">{vehicle.label}</td>
                <td className="px-3 py-2">{vehicle.people}</td>
                <td className="px-3 py-2">{vehicle.luggage}</td>
                {vehicle.prices.map((price, priceIndex) => (
                  <td
                    key={`${vehicle.label}-${zones[priceIndex]}`}
                    className="whitespace-nowrap px-3 py-2 font-semibold"
                  >
                    {formatYen(price)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-ink/70 md:text-sm">
        ▶
        行李以28吋計算；人數減少1位約可多加1.5件行李。約定時間免費待機30分鐘。系統會根據淡旺季自行調節價格，最終價格按網站訂單為基準！
      </p>
    </div>
  );
}
