import { useEffect, useState } from 'react';
import arabikaImg from '../assets/Arabika.webp';
import beansBg from '../assets/footer.webp';
import robustaImg from '../assets/Robusta.webp';
import { coffeeData } from '../data/coffeeData';
import { fetchCoffeeTypes } from '../lib/contentApi';

const beanImages = {
  arabika: arabikaImg,
  robusta: robustaImg,
  'Arabika.webp': arabikaImg,
  'Robusta.webp': robustaImg,
};

export default function Education() {
  const [activeTab, setActiveTab] = useState('arabika');
  const [coffeeTypes, setCoffeeTypes] = useState(coffeeData);
  const data = coffeeTypes[activeTab] || coffeeData.arabika;
  const tabs = Object.keys(coffeeTypes);
  const beanImage = beanImages[data.imageKey] || beanImages[activeTab] || arabikaImg;

  const specs = [
    { label: 'Profil', value: data.profil },
    { label: 'Rasa', value: data.rasa },
    { label: 'Kafein', value: data.kafein },
    { label: 'Tinggi', value: data.tinggi },
    { label: 'Harga', value: data.harga },
    { label: 'Jenis', value: data.asal.join(', ') },
  ];

  useEffect(() => {
    let isMounted = true;

    fetchCoffeeTypes()
      .then((nextCoffeeTypes) => {
        if (!isMounted || !Object.keys(nextCoffeeTypes).length) {
          return;
        }

        setCoffeeTypes(nextCoffeeTypes);
        setActiveTab((currentTab) => (
          nextCoffeeTypes[currentTab] ? currentTab : Object.keys(nextCoffeeTypes)[0]
        ));
      })
      .catch((error) => {
        console.error('Gagal memuat data edukasi kopi:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.74), rgba(0,0,0,0.84)), url(${beansBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="absolute left-10 top-16 font-gochi text-4xl text-white md:left-24 md:text-5xl">
            Coffee Beans
          </h2>
          <div className="rounded-[28px] bg-white/10 p-4 backdrop-blur-sm">
            <img
              src={beanImage}
              alt={`${data.name} coffee bean`}
              className="h-56 w-56 rounded-[28px] object-contain shadow-2xl"
            />
          </div>
          <h3 className="mt-8 font-concert text-6xl uppercase tracking-wider text-white">
            {data.name}
          </h3>
        </div>

        <div className="flex min-h-[520px] flex-col justify-center bg-section-bg px-8 py-12 md:px-20">
          <div className="mb-6 grid grid-cols-2 border border-navbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 font-azeret text-xs font-bold capitalize transition-colors ${
                  activeTab === tab ? 'bg-accent text-dark' : 'bg-transparent text-navbar hover:bg-navbar/10'
                }`}
              >
                {coffeeTypes[tab]?.name || tab}
              </button>
            ))}
          </div>

          <p className="mb-5 font-azeret text-[11px] uppercase leading-relaxed text-navbar/75">
            {data.deskripsi}
          </p>

          <table className="w-full">
            <tbody>
              {specs.map((spec, i) => (
                <tr key={spec.label} className={i !== specs.length - 1 ? 'border-b border-navbar/40' : ''}>
                  <td className="w-24 py-2 pr-4 align-top font-azeret text-[11px] font-bold text-navbar">
                    {spec.label}
                  </td>
                  <td className="py-2 font-azeret text-[11px] text-navbar">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
