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
    <main id="simulation" className="scroll-mt-14">
      <section
        className="relative flex min-h-screen flex-col overflow-hidden px-4 pb-24 pt-28 text-center md:px-10 lg:px-20"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.68)), url(${beansBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mb-14 text-center">
          <h1 className="font-gochi text-6xl leading-none text-white md:text-8xl">
            BLEND
          </h1>

          <p className="-mt-1 font-azeret text-lg text-white md:text-2xl">
            Your Coffee
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-2">
          <BlendSimulator
            arabicaPercent={arabicaPercent}
            onPercentChange={setArabicaPercent}
            tasteLabel={taste.label}
            tasteDesc={taste.desc}
          />
          <FlavorBars flavor={flavor} />
        </div>
      </section>

      <section className="bg-[#bdb39f] px-8 py-24 md:px-24">
        <div className="mx-auto max-w-[740px]">
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
