import { allBrewMethods } from '../utils/flavorCalculator';
import aeropressImage from '../assets/aeropress.webp';
import chemexImage from '../assets/chemex.webp';
import coldBrewImage from '../assets/cold_brew.webp';
import cuppingImage from '../assets/cupping.webp';
import espressoImage from '../assets/espresso.webp';
import frenchPressImage from '../assets/french_press.webp';
import kalitaWaveImage from '../assets/kalita_wave.webp';
import mokaPotImage from '../assets/moka_pot.webp';
import rokPressoImage from '../assets/rok_presso.webp';
import syphonImage from '../assets/syphon.webp';
import turkishImage from '../assets/turkish.webp';
import v60Image from '../assets/v60.webp';
import v60SwitchImage from '../assets/v60_switch.webp';
import vietnamDripImage from '../assets/vietnam_drip.webp';
import tubrukImage from '../assets/tubruk.webp';

const brewImages = {
  Aeropress: aeropressImage,
  'aeropress.webp': aeropressImage,
  Chemex: chemexImage,
  'chemex.webp': chemexImage,
  'Cold Brew': coldBrewImage,
  'cold_brew.webp': coldBrewImage,
  Cupping: cuppingImage,
  'cupping.webp': cuppingImage,
  Espresso: espressoImage,
  'espresso.webp': espressoImage,
  'French Press': frenchPressImage,
  'french_press.webp': frenchPressImage,
  'Kalita Wave': kalitaWaveImage,
  'kalita_wave.webp': kalitaWaveImage,
  'Moka Pot': mokaPotImage,
  'moka_pot.webp': mokaPotImage,
  'ROK Presso': rokPressoImage,
  'rok_presso.webp': rokPressoImage,
  Syphon: syphonImage,
  'syphon.webp': syphonImage,
  Tubruk: tubrukImage,
  'tubruk.webp': tubrukImage,
  Turkish: turkishImage,
  'turkish.webp': turkishImage,
  V60: v60Image,
  'v60.webp': v60Image,
  'V60 Switch': v60SwitchImage,
  'v60_switch.webp': v60SwitchImage,
  'Vietnam Drip': vietnamDripImage,
  'vietnam_drip.webp': vietnamDripImage,
};

export default function BrewTable({ brewMethods = allBrewMethods, selectedGrind }) {
  const visibleMethods = brewMethods.filter((method) => method.id !== 'simpan-biji' && method.name !== 'Simpan Biji');

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {visibleMethods.map((method) => {
        const isMatch = method.grindIds?.includes(selectedGrind) || method.grind === selectedGrind;
        const brewImage = brewImages[method.imageKey] || brewImages[method.name];

        return (
          <div
            key={method.name}
            className={`group relative flex min-h-[66px] items-center justify-center rounded-[8px] border px-3 text-center transition-all duration-300 ${
              isMatch
                ? 'border-navbar bg-navbar text-white shadow-lg shadow-navbar/15'
                : 'border-navbar/15 bg-white/35 text-navbar hover:-translate-y-1 hover:border-accent/60 hover:bg-white/70'
            }`}
            tabIndex={isMatch && brewImage ? 0 : undefined}
          >
            <span className="font-gochi text-xl leading-none text-current md:text-2xl">
              {method.name}
            </span>

            {isMatch && brewImage && (
              <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-30 w-36 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 md:w-44">
                <div className="overflow-hidden rounded-lg border border-white/60 bg-[#f5efe6] p-2 shadow-2xl shadow-black/30">
                  <img
                    src={brewImage}
                    alt={`${method.name} brew method`}
                    className="h-28 w-full object-contain md:h-32"
                  />
                </div>
                <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/60 bg-[#f5efe6]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
