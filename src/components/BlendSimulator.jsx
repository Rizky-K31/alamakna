export default function BlendSimulator({ arabicaPercent, onPercentChange, tasteLabel, tasteDesc }) {
  const robusta = 100 - arabicaPercent;

  return (
    <div className="mx-auto flex min-h-[520px] w-full flex-col rounded-[8px] border border-white/10 bg-black/85 p-8 text-left shadow-2xl shadow-black/40 backdrop-blur-sm md:p-10">
      <div className="mb-10 flex items-start justify-between gap-5">
        <div>
          <h3 className="mt-2 font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:text-3xl">
            Blend Ratio
          </h3>
        </div>
      </div>

      <div>
        <div className="mb-7 grid grid-cols-2 gap-4">
          <div className="rounded-[8px] border border-white/10 bg-white/10 px-5 py-5">
            <span className="block font-gochi text-3xl leading-none text-white">Arabika</span>
            <span className="mt-2 block font-azeret text-3xl font-bold leading-none text-[#f0a12f]">
              {arabicaPercent}%
            </span>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/10 px-5 py-5">
            <span className="block font-gochi text-3xl leading-none text-white">Robusta</span>
            <span className="mt-2 block font-azeret text-3xl font-bold leading-none text-[#f0a12f]">
              {robusta}%
            </span>
          </div>
        </div>

        <div className="mt-10 px-1">
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={arabicaPercent}
            onChange={(e) => onPercentChange(Number(e.target.value))}
            className="coffee-range h-3 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, #f0a12f ${arabicaPercent}%, #71340e ${arabicaPercent}%)`,
            }}
          />
        </div>
      </div>

      <div className="mt-20 rounded-[8px] border border-white/10 bg-[#1e1e1e] px-8 py-6 md:mt-24">
        <p className="mb-2 font-azeret text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
          Taste Result
        </p>
        <h4 className="mb-4 font-azeret text-2xl font-extrabold text-white md:text-3xl">
          {tasteLabel}
        </h4>
        <p className="font-azeret text-base font-extralight leading-relaxed text-white/90">
          {tasteDesc}
        </p>
      </div>
    </div>
  );
}
