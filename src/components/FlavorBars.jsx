export default function FlavorBars({ flavor }) {
  const bars = [
    { label: 'Acidity', value: flavor.acidity, tone: '#f0a12f' },
    { label: 'Body', value: flavor.body, tone: '#885600' },
    { label: 'Bitterness', value: flavor.bitterness, tone: '#603c01' },
  ];

  return (
    <div className="mx-auto flex min-h-[560px] w-full flex-col rounded-[8px] border border-white/14 bg-[#111111]/72 p-5 text-left shadow-2xl shadow-black/45 backdrop-blur-2xl md:p-7">
      <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
        <div>
          <h3 className="mt-2 font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:text-3xl">
            PROFIL RASA
          </h3>
        </div>
      </div>

      <div className="flex flex-1 items-center">
        <div className="flex w-full flex-col gap-[28px]">
          {bars.map((bar) => (
            <div
              key={bar.label}
              className="rounded-[8px] border border-white/10 bg-white/[0.06] p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center justify-between gap-6">
                <span className="font-gochi text-3xl leading-none text-white">
                  {bar.label}
                </span>

                <span className="rounded-full bg-[#f0a12f]/20 px-3 py-1 font-azeret text-xl font-bold leading-none text-[#f0a12f]">
                  {bar.value / 10}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${bar.value}%`,
                    background: `linear-gradient(90deg, ${bar.tone}, #ffffff)`,
                    boxShadow: `0 0 24px ${bar.tone}55`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}