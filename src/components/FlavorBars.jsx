export default function FlavorBars({ flavor }) {
  const bars = [
    { label: 'Acidity', value: flavor.acidity },
    { label: 'Body', value: flavor.body },
    { label: 'Bitterness', value: flavor.bitterness },
  ];

  return (
    <div className="mx-auto min-h-[520px] w-full rounded-[8px] border border-white/10 bg-black/85 p-6 text-left shadow-2xl shadow-black/40 backdrop-blur-sm md:p-8">
      <div className="mb-12 flex items-start justify-between gap-5">
        <div>
          <h3 className="mt-2 font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:text-3xl">
            Profil Rasa
          </h3>
        </div>
      </div>

      <div className="space-y-10">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-3 flex items-end justify-between gap-4">
              <span className="font-gochi text-3xl leading-none text-white">
                {bar.label}
              </span>
              <span className="font-azeret text-xl font-bold leading-none text-[#f0a12f]">
                {bar.value / 10}
              </span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-[#5c2e0e]">
              <div
                className="h-full rounded-full bg-[#f0a12f] transition-all duration-500"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
