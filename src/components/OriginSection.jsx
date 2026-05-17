import { useEffect, useState } from 'react';
import gunungBatur from '../assets/gunung_batur.webp';
import gunungMakale from '../assets/gunung_makale.webp';
import gunungRinjani from '../assets/gunung_rinjani.webp';

const origins = [
  {
    id: 'makale',
    name: 'Gunung Makale',
    location: ['Sulawesi Selatan,', 'Indonesia'],
    image: gunungMakale,
  },
  {
    id: 'batur',
    name: 'Gunung Batur',
    location: ['Bali,', 'Indonesia'],
    image: gunungBatur,
  },
  {
    id: 'rinjani',
    name: 'Gunung Rinjani',
    location: ['Nusa Tenggara Barat,', 'Indonesia'],
    image: gunungRinjani,
  },
];

export default function OriginSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOrigin = origins[activeIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % origins.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {origins.map((origin, index) => (
        <img
          key={origin.id}
          src={origin.image}
          alt={`${origin.name} coffee origin`}
          width="1280"
          height="779"
          className={`absolute inset-0 block h-full w-full object-cover transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-70' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-black/5" />

      <div className="relative z-10 h-screen w-full">
        <div className="absolute left-8 top-28 md:left-[90px] md:top-[96px]">
          <h2 className="font-gochi text-[65px] leading-none text-white md:text-[72px] lg:text-[82px]">
            {activeOrigin.name}
          </h2>
          <p className="mt-4 font-concert text-[28px] leading-tight text-white md:text-[34px]">
            {activeOrigin.location[0]}<br />
            {activeOrigin.location[1]}
          </p>
        </div>

        <div className="absolute bottom-20 left-8 border-4 border-white/20 bg-black/25 px-3 py-2 md:left-[90px]">
          <p className="font-azeret text-[20px] font-bold leading-tight text-white md:text-[20px]">
            Dataran Tinggi Penghasil<br />
            Biji Kopi Di Indonesia
          </p>
        </div>

        <div className="absolute bottom-20 right-8 flex gap-2 md:right-[90px]">
          {origins.map((origin, index) => (
            <button
              key={origin.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/45'
              }`}
              aria-label={`Tampilkan ${origin.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
