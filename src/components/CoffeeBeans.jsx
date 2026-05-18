import { useState } from 'react';
import arabikaImg from '../assets/Arabika.webp';
import beansBg from '../assets/footer.webp';
import robustaImg from '../assets/Robusta.webp';
import { coffeeData } from '../data/coffeeData';

export default function CoffeeBeans() {
  const [activeTab, setActiveTab] = useState('arabika');
  const data = coffeeData[activeTab];
  const beanImage = activeTab === 'arabika' ? arabikaImg : robustaImg;

  return (
    <section id="education" className="scroll-mt-14">
      <div className="grid w-full grid-cols-1 lg:min-h-screen lg:grid-cols-2">
        <div
          className="relative flex min-h-[680px] flex-col items-center justify-center overflow-hidden px-5 py-16 text-center sm:px-8 lg:min-h-screen lg:py-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.66), rgba(0,0,0,0.86)), url(${beansBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="absolute left-1/2 top-10 w-full -translate-x-1/2 px-6 font-gochi text-5xl text-white sm:top-14 md:text-7xl lg:top-20">
            Coffee Beans
          </h2>

          <div className="mt-20 flex min-h-[260px] w-full max-w-[320px] items-center justify-center rounded-[32px] bg-[#39393980] px-6 py-5 shadow-[10px_10px_4px_rgba(0,0,0,0.25)] backdrop-blur-[1px] sm:min-h-[320px] sm:max-w-[420px] md:max-w-[500px] lg:min-h-[360px] lg:rounded-[42px] lg:px-8 lg:py-6">
            <img
              src={beanImage}
              alt={`${data.name} coffee bean`}
              className="h-[250px] w-full object-contain sm:h-[310px] md:h-[360px] lg:h-[390px]"
            />
          </div>

          <h3 className="mt-8 max-w-full break-words font-concert text-6xl uppercase leading-none tracking-wider text-white sm:text-7xl md:text-8xl">
            {data.name}
          </h3>
        </div>

        <div className="flex min-h-[680px] items-center justify-center bg-section-bg px-5 py-16 sm:px-8 md:px-14 lg:min-h-screen lg:py-20 xl:px-24">
          <div className="w-full max-w-[620px]">
            <div className="mb-6 grid grid-cols-2 border border-black">
              {['arabika', 'robusta'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`h-14 border-r border-black font-gochi text-2xl text-black transition-colors last:border-r-0 md:text-3xl ${
                    activeTab === tab ? 'bg-accent' : 'bg-transparent hover:bg-black/5'
                  }`}
                >
                  {tab === 'arabika' ? 'Arabika' : 'Robusta'}
                </button>
              ))}
            </div>

            <p className="mb-5 text-justify font-azeret text-sm leading-relaxed tracking-wide text-white md:text-base">
              {data.deskripsi}
            </p>

            <div className="bg-[#efe6d6]/80 px-6 py-5">
              <table className="w-full table-fixed border-collapse">
                <tbody>
                  {data.specs.map((spec, index) => (
                    <tr key={spec.label} className={index !== data.specs.length - 1 ? 'border-b border-black/70' : ''}>
                      <td className="w-[26%] border-r border-black/70 py-3 pr-5 align-top font-azeret text-sm text-black md:text-base">
                        {spec.label}
                      </td>
                      <td className="py-3 pl-6 align-top font-azeret text-sm leading-snug text-black md:text-base">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
