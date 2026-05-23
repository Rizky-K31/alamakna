import { useEffect, useMemo, useState } from 'react';
import indonesiaMapSvg from '../assets/maps/indonesia-map.svg?raw';
import { coffeeMapRegions } from '../data/flavorMapData';
import { fetchCoffeeMapRegions } from '../lib/contentApi';

export default function CoffeeMap() {
  const [regions, setRegions] = useState(coffeeMapRegions);
  const mapMarkup = useMemo(
    () => indonesiaMapSvg.replace(/<\?xml[\s\S]*?\?>\s*/, '').replace(/<!--[\s\S]*?-->\s*/, ''),
    [],
  );

  useEffect(() => {
    let isMounted = true;

    fetchCoffeeMapRegions()
      .then((nextRegions) => {
        if (isMounted && nextRegions.length) {
          setRegions(nextRegions);
        }
      })
      .catch((error) => {
        console.error('Gagal memuat data peta kopi:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="peta-kopi" className="scroll-mt-14 bg-[#D8C9AF]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pb-20 sm:px-8 md:px-12 lg:px-20">
        <h2
          style={{ marginTop: '90px' }}
          className="text-center font-gochi text-[50px] font-bold leading-tight text-[#373028] sm:text-[56px] md:text-[66px]"
        >
          PETA KOPI INDONESIA
        </h2>
        <div className="mt-12 flex flex-1 items-center justify-center md:mt-14">
          <div className="relative mx-auto aspect-[1676/707] w-full max-w-[1180px]">
            <div
              className="flavor-map-svg pointer-events-none absolute inset-0"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: mapMarkup }}
            />

            {regions.map((region) => (
              <button
                key={region.id}
                type="button"
                className="group absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_10px_22px_rgba(69,52,38,0.24)] transition-transform hover:z-50 hover:scale-125 focus:z-50 focus:scale-125 focus:outline-none focus:ring-4 focus:ring-[#b35d50]/25 md:h-6 md:w-6"
                style={{ left: region.x, top: region.y, backgroundColor: region.color }}
                aria-label={region.name}
              >
                <span className="pointer-events-none absolute left-1/2 top-0 z-[60] w-max max-w-[210px] -translate-x-1/2 -translate-y-[calc(100%+18px)] rounded-md bg-[#211E17] px-4 py-2 text-center font-akshar text-sm leading-tight text-white opacity-0 shadow-[0_14px_32px_rgba(69,52,38,0.2)] transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                  <strong className="block font-azeret text-xs uppercase leading-none">
                    {region.name}
                  </strong>
                  <span className="mt-1 block text-white/80">
                    {region.notes.join(', ')}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
