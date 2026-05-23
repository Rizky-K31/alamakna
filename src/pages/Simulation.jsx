import { useEffect, useMemo, useState } from 'react';
import BlendSimulator from '../components/BlendSimulator';
import BrewTable from '../components/BrewTable';
import FlavorBars from '../components/FlavorBars';
import GrindSize from '../components/GrindSize';
import beansBg from '../assets/beans.webp';
import coarseImg from '../assets/coarse.webp';
import fineImg from '../assets/fine.webp';
import mediumImg from '../assets/medium.webp';
import { getLocalSimulationData, fetchSimulationData } from '../lib/contentApi';
import { calculateFlavor, getTasteLabel } from '../utils/flavorCalculator';

const grindImages = {
  beans: beansBg,
  'beans.webp': beansBg,
  coarse: coarseImg,
  'coarse.webp': coarseImg,
  medium: mediumImg,
  'medium.webp': mediumImg,
  fine: fineImg,
  'fine.webp': fineImg,
};

export default function Simulation() {
  const [arabicaPercent, setArabicaPercent] = useState(50);
  const [selectedGrind, setSelectedGrind] = useState('beans');
  const [simulationData, setSimulationData] = useState(getLocalSimulationData);

  const { allBrewMethods, blendData, grindData } = simulationData;
  const flavor = useMemo(() => calculateFlavor(arabicaPercent, blendData), [arabicaPercent, blendData]);
  const taste = useMemo(() => getTasteLabel(arabicaPercent, blendData), [arabicaPercent, blendData]);
  const grind = grindData.find((item) => item.id === selectedGrind) || grindData[0];
  const grindImage = grindImages[grind?.imageKey] || grindImages[selectedGrind] || beansBg;

  useEffect(() => {
    let isMounted = true;

    fetchSimulationData()
      .then((nextSimulationData) => {
        if (!isMounted) {
          return;
        }

        setSimulationData(nextSimulationData);
        setSelectedGrind((currentGrind) => (
          nextSimulationData.grindData.some((item) => item.id === currentGrind)
            ? currentGrind
            : nextSimulationData.grindData[0]?.id || 'beans'
        ));
      })
      .catch((error) => {
        console.error('Gagal memuat data simulasi:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main id="simulation" className="scroll-mt-[50px]">
      <section
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6 md:px-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)),
            radial-gradient(circle at 78% 24%, rgba(240,161,47,0.18), transparent 40%),
            url(${beansBg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#17130f] to-transparent" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="text-left">
            <h1 className="mt-6 max-w-[720px] font-gochi text-[74px] leading-[0.82] text-white drop-shadow-2xl sm:text-[104px] md:text-[132px] lg:text-[150px]">
              BLEND
            </h1>

            <p className="mt-5 max-w-xl font-akshar text-xl leading-relaxed text-white/76 md:text-2xl">
              Racik persentase Arabika dan Robusta, lalu lihat karakter rasa yang muncul.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 justify-center gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
        className="relative flex min-h-screen w-full items-start justify-center overflow-x-hidden bg-[#17130f] px-4 py-16 text-center sm:px-6 md:px-10 lg:items-center lg:py-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)),
            radial-gradient(circle at 78% 24%, rgba(240,161,47,0.18), transparent 40%),
            url(${beansBg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      > 
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:38px_38px] opacity-25" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
          <div className="mb-9 flex w-full max-w-5xl flex-col items-center">
            <div className="flex flex-col items-center text-center">
              <p className="rounded-full px-4 py-2 font-azeret text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                Adjust The
              </p>
              <h2 className="mt-4 font-gochi text-[66px] leading-[0.85] text-white md:text-[112px]">
                GRIND SIZE
              </h2>
              <p className="mt-4 max-w-2xl font-akshar text-lg leading-relaxed text-text-cream/75">
                Pilih grind size kopi dan lihat brew methods yang paling cocok.
              </p>
            </div>
          </div>

          <div className="grid w-full justify-center gap-5 lg:grid-cols-[minmax(320px,0.9fr)_minmax(480px,1.1fr)]">
            <div className="group overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.08] shadow-2xl shadow-black/35 backdrop-blur-xl">
              <img
                src={grindImage}
                alt={`${grind?.labelId || 'Bubuk kopi'} grind`}
                className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[420px] xl:h-[500px]"
              />
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 text-left">
                <div>
                  <p className="font-gochi text-4xl leading-none text-white">{grind?.labelId}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[8px] border border-white/14 bg-[#f2e7d2]/92 p-5 text-left shadow-2xl shadow-black/25 backdrop-blur-xl md:p-7">
              <GrindSize grindData={grindData} selectedGrind={selectedGrind} onGrindChange={setSelectedGrind} />

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

                <BrewTable brewMethods={allBrewMethods} selectedGrind={selectedGrind} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
