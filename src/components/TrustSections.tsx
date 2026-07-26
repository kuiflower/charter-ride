const aboutPoints = [
  {
    title: "八年實戰經驗",
    text: "2017 年起步，我們累積了服務數萬名自由行旅客與企業團體的實戰經驗。",
  },
  {
    title: "專屬包車部門",
    text: "【遇見沖繩】是為了提升旅運品質而成立的直營包車部門，旗下配備多款高階商務車型（如埃爾法、海獅等），所有車輛均符合安全規範。",
  },
  {
    title: "正規運營資質",
    text: "拒絕黑車營運！我們堅持使用合法執照，並投保完善的旅客保險，讓您的權益得到最大化保障。",
  },
  {
    title: "客製化規劃",
    text: "結合在地資源，我們提供從私人行程定製、高爾夫之旅、海外婚禮協助到專業潛水指導的多元化服務。",
  },
];

const guarantees = [
  {
    title: "100% 合法綠牌營運",
    text: "拒絕非法白牌車！我們全線車隊均為日本政府核發之「綠牌營業車」，符合道路運輸法規，並投保高額乘客險，讓安全不只是口號。",
  },
  {
    title: "直營車隊",
    text: "我們是沖繩在地合法註冊旅行社（而非轉單仲介）。全部車輛均為直營與簽約司機車輛，從派車、行程規劃到售後服務，全程由「遇見沖繩」團隊親自負責，價格透明、溝通零時差。",
  },
  {
    title: "八年深耕，在地導航",
    text: "自 2017 年扎根沖繩，我們不只帶您看風景，更帶您深度體驗。團隊包含專業潛水教練與資深包車司機，精準掌握最新路況與秘境景點。",
  },
  {
    title: "五星級車況管理",
    text: "我們對車輛有著近乎苛求的堅持。車隊主打適合大家的各種車型，並定期進行專業級鍍膜與深度內裝清潔，確保每位貴賓享有尊榮潔淨的乘坐空間。",
  },
];

const compareRows = [
  {
    label: "車輛牌照",
    ours: "100% 合法綠色營業車牌",
    theirs: "私人白牌／無營業資格風險",
  },
  {
    label: "乘客保障",
    ours: "投保高額營業用乘客險，安全有保障",
    theirs: "保障不足或無營業用乘客險",
  },
  {
    label: "專業資質",
    ours: "具備日本政府核發旅行行業執照",
    theirs: "無正規旅行行業執照",
  },
  {
    label: "車輛品質",
    ours: "直營車隊，堅持高標保養與內裝清潔",
    theirs: "車輛來源不明，保養難以把關",
  },
  {
    label: "收費誠信",
    ours: "價格透明，合約保障無隱藏收費",
    theirs: "報價不透明，易有隱藏費用",
  },
];

export function TrustSections() {
  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden border-y border-line bg-[linear-gradient(160deg,#f3f6f4_0%,#e7efea_48%,#f7f3ea_100%)]"
      >
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-jade/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-amber/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-jade-deep">About</p>
              <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
                深耕在地，
                <br className="hidden sm:block" />
                專業領航
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
              「遇見沖繩包車」是一家總部位於沖繩、具備日本政府核發之正規旅遊資質的專業旅行服務機構。
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-4 border-y border-line py-8">
            <div>
              <p className="font-display text-5xl text-jade-deep md:text-6xl">2017</p>
              <p className="mt-1 text-sm text-ink/60">扎根沖繩起步</p>
            </div>
            <div className="hidden h-16 w-px bg-line sm:block" />
            <div>
              <p className="font-display text-5xl text-jade-deep md:text-6xl">8+</p>
              <p className="mt-1 text-sm text-ink/60">年在地實戰經驗</p>
            </div>
            <div className="hidden h-16 w-px bg-line sm:block" />
            <div>
              <p className="font-display text-5xl text-jade-deep md:text-6xl">綠牌</p>
              <p className="mt-1 text-sm text-ink/60">合法營業車輛</p>
            </div>
          </div>

          <ol className="mt-10 grid gap-0 md:grid-cols-2">
            {aboutPoints.map((point, index) => (
              <li
                key={point.title}
                className="border-b border-line py-6 md:border-r md:odd:pr-8 md:even:border-r-0 md:even:pl-8 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl text-sand">0{index + 1}</span>
                  <h3 className="font-display text-2xl text-ink">{point.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 md:pl-12">{point.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl border-l-2 border-amber pl-5 text-sm leading-relaxed text-ink/75 md:text-base">
            我們堅持「服務至上、安全第一」，致力於成為沖繩在地旅遊的專業標竿。
          </p>
        </div>
      </section>

      <section id="trust" className="relative overflow-hidden bg-ink text-foam">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,162,39,0.18),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(45,138,106,0.22),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-amber">Trust</p>
            <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">
              安心旅遊的守護者，
              <br className="hidden sm:block" />
              您在沖繩的最強後盾
            </h2>
          </div>

          <div className="mt-12 space-y-0">
            {guarantees.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-3 border-t border-white/12 py-7 md:grid-cols-[180px_1fr] md:gap-10 md:py-8"
              >
                <p className="font-display text-4xl text-amber/80 md:text-5xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-2xl text-white md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foam/70 md:text-base">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="mt-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-jade-deep">Compare</p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-5xl">用車對比指南</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/65 md:text-base">
            一眼看懂正規綠牌包車與非法白牌的差異，讓您在沖繩出行更安心。
          </p>
        </div>

        <div className="mt-8 hidden overflow-hidden rounded-[1.25rem] border border-[#dce3df] md:mt-10 md:block">
          <div className="grid grid-cols-[0.7fr_1.15fr_1.15fr]">
            <div className="bg-[#eef2f0] px-5 py-5 text-sm font-medium text-[#6b7872]">
              對比項目
            </div>
            <div className="bg-jade px-5 py-5 text-sm font-semibold tracking-wide text-white">
              遇見沖繩 · 正規綠牌
            </div>
            <div className="bg-ink px-5 py-5 text-sm font-medium text-foam/75">
              非法白牌 · 風險對照
            </div>
          </div>
          {compareRows.map((row, index) => (
            <div
              key={row.label}
              className={`grid grid-cols-[0.7fr_1.15fr_1.15fr] ${
                index < compareRows.length - 1 ? "border-b border-[#e6ebe8]" : ""
              }`}
            >
              <div className="bg-white px-5 py-5 text-sm font-semibold text-ink/75">
                {row.label}
              </div>
              <div className="bg-[#e8f3ee] px-5 py-5 text-sm font-medium leading-relaxed text-jade-deep">
                <span className="mr-2 inline-block text-jade">✓</span>
                {row.ours}
              </div>
              <div className="bg-white px-5 py-5 text-sm leading-relaxed text-[#9aa3a0]">
                <span className="mr-2 inline-block text-[#c5cbc8]">✕</span>
                {row.theirs}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 md:hidden">
          {compareRows.map((row) => (
            <article
              key={row.label}
              className="overflow-hidden rounded-[14px] border border-[#dce3df] bg-white shadow-[0_1px_2px_rgba(15,41,34,0.04)]"
            >
              <div className="border-b border-[#e6ebe8] bg-[#eef2f0] px-4 py-3">
                <p className="text-center text-[15px] font-medium tracking-wide text-[#6b7872]">
                  {row.label}
                </p>
              </div>

              <div className="border-b border-[#e6ebe8] bg-[#e8f3ee] px-4 py-4">
                <p className="text-[15px] font-semibold text-jade-deep">遇見沖繩</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-jade-deep">{row.ours}</p>
              </div>

              <div className="bg-white px-4 py-4">
                <p className="text-[15px] font-medium text-[#8a9490]">非法白牌</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#9aa3a0]">{row.theirs}</p>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="relative mt-12 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f2922_0%,#1a3d34_55%,#1f6b52_100%)] px-6 py-10 text-foam md:px-12 md:py-14">
          <p className="pointer-events-none absolute right-6 top-4 font-display text-7xl text-white/10 md:right-10 md:text-9xl">
            ”
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-amber">Promise</p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl">一份來自沖繩的承諾</h3>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foam/80 md:text-lg">
            自 2017 年扎根沖繩以來，我們接待過數千組來自台灣、香港的家庭。我深知對於跨國旅行的旅客來說，「信任」比什麼都重要。我們不只是提供包車，更是提供一份「人在異國、隨時有後援」的安心感。遇見沖繩，讓我們帶您看見最真實、最純粹的海島風景。
          </p>
        </blockquote>
      </section>
    </>
  );
}
