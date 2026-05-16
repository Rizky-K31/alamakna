export default function BlendSimulator({ arabicaPercent, onPercentChange, tasteLabel, tasteDesc }) {
  const robusta = 100 - arabicaPercent;
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="min-h-[560px] rounded-[28px] bg-card px-8 py-14 text-left shadow-2xl md:px-10 lg:px-12">
      <h3 className="mb-14 text-center font-azeret text-2xl font-black uppercase tracking-widest text-white md:text-4xl">
        Blend Ratio
      </h3>

      <div className="mb-10">
        <div className="mb-9 flex items-center justify-between">
          <span className="font-gochi text-2xl text-white md:text-4xl">Arabika</span>
          <span className="font-azeret text-4xl font-black text-accent md:text-6xl">{arabicaPercent}%</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={arabicaPercent}
            onChange={(e) => onPercentChange(Number(e.target.value))}
            className="coffee-range relative z-20 h-4 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, #f0a12f ${arabicaPercent}%, #71340e ${arabicaPercent}%)`,
            }}
          />
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between">
            {ticks.map((tick) => (
              <span
                key={tick}
                className={`h-5 w-5 rounded-full ${
                  tick === arabicaPercent
                    ? 'bg-accent ring-4 ring-black'
                    : 'bg-white/85'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="font-gochi text-2xl text-white md:text-4xl">Robusta</span>
          <span className="font-azeret text-4xl font-black text-accent md:text-6xl">{robusta}%</span>
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-white/10 px-5 py-5 backdrop-blur-sm">
        <h4 className="mb-4 font-azeret text-2xl font-black text-white md:text-4xl">
          {tasteLabel}
        </h4>
        <p className="font-azeret text-lg leading-relaxed text-white/85 md:text-2xl">
          {tasteDesc}
        </p>
      </div>
    </div>
  );
}
