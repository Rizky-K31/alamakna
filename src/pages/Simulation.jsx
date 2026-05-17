import { useMemo, useState } from 'react';
import BlendSimulator from '../components/BlendSimulator';
import BrewTable from '../components/BrewTable';
import FlavorBars from '../components/FlavorBars';
import GrindSize from '../components/GrindSize';
import beansBg from '../assets/beans.webp';
import coarseImg from '../assets/coarse.webp';
import fineImg from '../assets/fine.webp';
import mediumImg from '../assets/medium.webp';
import { calculateFlavor, getTasteLabel, grindData } from '../utils/flavorCalculator';

const grindImages = {
  beans: beansBg,
  coarse: coarseImg,
  medium: mediumImg,
  fine: fineImg,
};

export default function Simulation() {
  const [arabicaPercent, setArabicaPercent] = useState(50);
  const [selectedGrind, setSelectedGrind] = useState('beans');

  const flavor = useMemo(() => calculateFlavor(arabicaPercent), [arabicaPercent]);
  const taste = useMemo(() => getTasteLabel(arabicaPercent), [arabicaPercent]);
  const grind = grindData.find((item) => item.id === selectedGrind);

  return (
    <main id="simulation" className="scroll-mt-[73px]">
      <section
        className="relative h-screen w-full overflow-hidden text-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.68)), url(${beansBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute left-1/2 top-24 w-[min(1092px,calc(100%-32px))] -translate-x-1/2">
          <div className="mb-10 text-center">
            <h1 className="font-gochi text-6xl leading-none text-white md:text-[96px]">
              BLEND
            </h1>

            <p className="-mt-1 font-azeret text-base text-white">
              Your Coffee
            </p>
          </div>

          <div className="grid w-full grid-cols-1 justify-items-center gap-7 lg:grid-cols-[522px_522px]">
            <BlendSimulator
              arabicaPercent={arabicaPercent}
              onPercentChange={setArabicaPercent}
              tasteLabel={taste.label}
              tasteDesc={taste.desc}
            />
            <FlavorBars flavor={flavor} />
          </div>
        </div>
      </section>

      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#17130f] px-5 py-20 text-center md:px-10"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(23,19,15,0.96), rgba(55,48,40,0.82)), url(${beansBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
          <div className="mb-8 flex w-full max-w-4xl flex-col items-center">
            <div className="flex flex-col items-center">
              <p className="font-azeret text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Adjust The
              </p>
              <h2 className="mt-2 font-gochi text-7xl leading-none text-white md:text-[112px]">
                GRIND SIZE
              </h2>
              <p className="mt-4 max-w-2xl font-akshar text-lg leading-relaxed text-text-cream/75">
                Pilih grind size kopi dan lihat brew methods yang paling cocok.
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-5xl justify-center gap-6 lg:grid-cols-[minmax(360px,470px)_minmax(440px,540px)]">
            <div className="overflow-hidden rounded-[8px] border border-white/10 bg-black/35 shadow-2xl shadow-black/30">
              <img
                src={grindImages[selectedGrind]}
                alt={`${grind?.labelId || 'Bubuk kopi'} grind`}
                className="h-[360px] w-full object-cover transition-transform duration-500 hover:scale-105 md:h-[482px]"
              />
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
              </div>
            </div>

            <div className="rounded-[8px] border border-white/10 bg-[#f2e7d2]/95 p-5 text-left shadow-2xl shadow-black/25 md:p-7">
              <GrindSize selectedGrind={selectedGrind} onGrindChange={setSelectedGrind} />

              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-azeret text-[10px] font-bold uppercase tracking-[0.24em] text-navbar/55">
                      Recommended
                    </p>
                    <h3 className="mt-1 font-gochi text-4xl leading-none text-navbar">
                      Brew Methods
                    </h3>
                  </div>
                </div>

                <BrewTable selectedGrind={selectedGrind} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
