import { useMemo, useState } from 'react';
import BlendSimulator from '../components/BlendSimulator';
import BrewTable from '../components/BrewTable';
import FlavorBars from '../components/FlavorBars';
import GrindSize from '../components/GrindSize';
import beansBg from '../assets/beans.webp';
import { calculateFlavor, getTasteLabel, grindData } from '../utils/flavorCalculator';

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

      <section className="flex h-screen w-full items-center justify-center bg-[#bdb39f] px-8 py-16 md:px-24">
        <div className="mx-auto w-full max-w-[740px]">
          <div className="mb-6 text-center">
            <p className="font-azeret text-[10px] text-white">Adjust The</p>
            <h2 className="font-gochi text-6xl leading-none text-white md:text-7xl">
              GRIND SIZE
            </h2>
          </div>
          <GrindSize selectedGrind={selectedGrind} onGrindChange={setSelectedGrind} />

          <div className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-[250px_1fr]">
            <img
              src={beansBg}
              alt={`${grind?.labelId || 'Bubuk kopi'} grind`}
              className="h-60 w-full object-cover"
            />
            <BrewTable selectedGrind={selectedGrind} />
          </div>
        </div>
      </section>
    </main>
  );
}
