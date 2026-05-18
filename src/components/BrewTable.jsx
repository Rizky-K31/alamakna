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
  Chemex: chemexImage,
  'Cold Brew': coldBrewImage,
  Cupping: cuppingImage,
  Espresso: espressoImage,
  'French Press': frenchPressImage,
  'Kalita Wave': kalitaWaveImage,
  'Moka Pot': mokaPotImage,
  'ROK Presso': rokPressoImage,
  Syphon: syphonImage,
  Tubruk: tubrukImage,
  Turkish: turkishImage,
  V60: v60Image,
  'V60 Switch': v60SwitchImage,
  'Vietnam Drip': vietnamDripImage,
};

export default function BrewTable({ selectedGrind }) {
  return (
    <div className="grid grid-cols-3 border border-navbar">
      {allBrewMethods.map((method, index) => {
        const isMatch = method.grind === selectedGrind;
        const isLastColumn = (index + 1) % 3 === 0;
        const isLastRow = index >= allBrewMethods.length - 3;
        const brewImage = brewImages[method.name];

        return (
          <div
            key={method.name}
            className={`group relative flex min-h-[64px] items-center justify-center border-navbar px-3 text-center transition-colors ${
              isLastColumn ? '' : 'border-r'
            } ${isLastRow ? '' : 'border-b'} ${
              isMatch ? 'bg-accent/80 text-dark' : 'bg-transparent text-navbar'
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
