export default function BlendSimulator({ arabicaPercent, onPercentChange, tasteLabel, tasteDesc }) {
  const robusta = 100 - arabicaPercent;

  return (
    <div className="mx-auto flex min-h-[560px] w-full flex-col rounded-[8px] border border-white/14 bg-[#111111]/80 p-5 text-left shadow-2xl shadow-black/45 backdrop-blur-2xl md:p-7">
      <div className="flex flex-col gap-10">
        <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <h3 className="mt-2 font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:text-3xl">
              Blend Ratio
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.08] p-5">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f0a12f]/20 blur-2xl" />
            <span className="relative block font-gochi text-3xl leading-none text-white">
              Arabika
            </span>
            <span className="relative mt-4 block font-azeret text-4xl font-bold leading-none text-[#f0a12f] md:text-5xl">
              {arabicaPercent}%
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.08] p-5">
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#885600]/18 blur-2xl" />
            <span className="relative block font-gochi text-3xl leading-none text-white">
              Robusta
            </span>
            <span className="relative mt-4 block font-azeret text-4xl font-bold leading-none text-[#885600] md:text-5xl">
              {robusta}%
            </span>
          </div>
        </div>

        <div className="rounded-[8px] border border-white/12 bg-black/35 px-5 py-6">
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={arabicaPercent}
            onChange={(e) => onPercentChange(Number(e.target.value))}
            className="coffee-range h-3 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, #f0a12f 0%, #f0a12f ${arabicaPercent}%, #885600 ${arabicaPercent}%, #885600 100%)`,
            }}
            aria-label="Persentase Arabika"
            aria-valuetext={`${arabicaPercent}% Arabika, ${robusta}% Robusta`}
          />
        </div>

        <div className="rounded-[8px] border border-white/12 bg-white/[0.08] p-6 shadow-inner shadow-white/5 md:p-7">
          <p className="mb-3 font-azeret text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
            Taste Result
          </p>

          <div className="flex flex-col gap-5">
            <h4 className="font-azeret text-2xl font-extrabold text-white md:text-3xl">
              {tasteLabel}
            </h4>

            <p className="font-azeret text-sm font-extralight leading-relaxed text-white/86 md:text-base">
              {tasteDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
