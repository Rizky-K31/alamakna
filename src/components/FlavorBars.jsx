export default function FlavorBars({ flavor }) {
  const bars = [
    { label: 'Acidity', value: flavor.acidity },
    { label: 'Body', value: flavor.body },
    { label: 'Bitterness', value: flavor.bitterness },
  ];

  return (
    <div className="min-h-[560px] rounded-[28px] bg-card px-8 py-14 text-left shadow-2xl md:px-10">
      <h3 className="mb-20 text-center font-azeret text-2xl font-black uppercase tracking-widest text-white md:text-4xl">
        Profil Rasa
      </h3>

      <div className="space-y-12">
        {bars.map((bar) => (
          <div key={bar.label}>
            <span className="mb-3 block font-gochi text-2xl text-white md:text-4xl">
              {bar.label}
            </span>
            <div className="h-4 overflow-hidden rounded-full bg-[#71340e]">
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
