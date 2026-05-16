export default function FlavorBars({ flavor }) {
  const bars = [
    { label: 'Acidity', value: flavor.acidity },
    { label: 'Body', value: flavor.body },
    { label: 'Bitterness', value: flavor.bitterness },
  ];

  return (
    <div className="mx-auto min-h-[507px] w-[522px] max-w-full rounded-[10px] bg-card px-12 py-14 text-left shadow-2xl">
      <h3 className="mb-20 text-center font-azeret text-2xl font-extrabold uppercase tracking-normal text-white">
        Profil Rasa
      </h3>

      <div className="space-y-11">
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
