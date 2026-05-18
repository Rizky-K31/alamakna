export default function BlendSimulator({ arabicaPercent, onPercentChange, tasteLabel, tasteDesc }) {
  const robusta = 100 - arabicaPercent;

  return (
    <div className="mx-auto min-h-[430px] w-full max-w-[500px] rounded-[10px] bg-card px-6 py-9 text-left shadow-2xl sm:px-8 md:min-h-[507px] md:px-10 md:py-12">
      <h3 className="mb-9 text-center font-azeret text-2xl font-extrabold uppercase tracking-normal text-white md:mb-12">
        Blend Ratio
      </h3>

      <div className="mb-10">
        <div className="mb-7 flex items-center justify-between">
          <span className="font-gochi text-2xl text-white">Arabika</span>
          <span className="font-azeret text-[32px] font-semibold leading-none text-[#f0a12f]">{arabicaPercent}%</span>
        </div>

        <div className="relative">
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

        <div className="mt-8 flex items-center justify-between">
          <span className="font-gochi text-2xl text-white">Robusta</span>
          <span className="font-azeret text-[32px] font-semibold leading-none text-[#f0a12f]">{robusta}%</span>
        </div>
      </div>

      <div className="mt-10 rounded-[10px] bg-[#1e1e1e] px-5 py-5 md:mt-12">
        <h4 className="mb-5 font-azeret text-xl font-extrabold text-white md:text-2xl">
          {tasteLabel}
        </h4>
        <p className="break-words font-azeret text-base font-extralight leading-normal text-white md:text-lg">
          {tasteDesc}
        </p>
      </div>
    </div>
  );
}
