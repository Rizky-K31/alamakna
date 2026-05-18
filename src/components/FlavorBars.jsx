export default function FlavorBars({ flavor }) {
  const bars = [
    { label: 'Acidity', value: flavor.acidity },
    { label: 'Body', value: flavor.body },
    { label: 'Bitterness', value: flavor.bitterness },
  ];

  return (
    <div className="mx-auto min-h-[360px] w-full max-w-[500px] rounded-[10px] bg-card px-6 py-9 text-left shadow-2xl sm:px-8 md:min-h-[507px] md:px-10 md:py-12">
      <h3 className="mb-12 text-center font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:mb-20">
        Profil Rasa
      </h3>

      <div className="space-y-8 md:space-y-11">
        {bars.map((bar) => (
          <div key={bar.label}>
            <span className="mb-3 block font-gochi text-2xl text-white">
              {bar.label}
            </span>
            <div className="h-3 overflow-hidden rounded-[10px] bg-[#5c2e0e]">
              <div
                className="h-full rounded-[10px] bg-[#f0a12f] transition-all duration-500"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
