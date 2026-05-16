import { useState } from 'react';
import arabikaImg from '../assets/Arabika.webp';
import beansBg from '../assets/footer.webp';
import robustaImg from '../assets/Robusta.webp';
import { coffeeData } from '../data/coffeeData';

const beanDetails = {
  arabika: {
    origin:
      'Asal mula dari kopi Arabika yaitu Ethiopia, yang sering dianggap sebagai tempat asal kopi, di mana tanaman kopi ini masih tumbuh secara alami. Dari Ethiopia, Arabika diperkirakan telah berpindah ke Yaman, di mana kopi ini pertama kali dibudidayakan untuk keperluan pertanian. Saat ini, kopi Arabika ditanam di area yang mendukung pertumbuhan kopi di berbagai belahan dunia, umumnya di daerah tropis dan wilayah dataran tinggi.',
    specs: [
      { label: 'Profil Rasa', value: 'Lebih halus, kompleks, manis, dan asam' },
      { label: 'Rasa', value: 'Fruity, floral, berry, nutty, chocolate' },
      { label: 'Kafein', value: 'Rendah (+- 0,9-1,2%)' },
      { label: 'Tingkat Keasaman', value: 'Tinggi' },
      { label: 'Harga', value: '+- Rp.60.000/100 gram' },
      { label: 'Jenis', value: 'Gayo, Toraja, Kintamani, Jawa, dan Wamena, Mandailing, dan Flores' },
    ],
  },
  robusta: {
    origin:
      'Asal dari kopi Robusta berasal dari kawasan Afrika Tengah dan Barat, yang dianggap sebagai lokasi awal di mana tanaman kopi ini tumbuh secara alami di hutan hujan tropis. Dari benua Afrika, Robusta mulai menyebar dengan pesat ke seluruh dunia pada akhir abad ke-19 sebagai pilihan tanaman yang lebih tahan terhadap penyakit. Saat ini, kopi Robusta dibudidayakan di wilayah yang mendukung pertumbuhan kopi di berbagai belahan dunia, biasanya di kawasan dataran rendah dengan iklim yang lebih hangat dan lembap.',
    specs: [
      { label: 'Profil Rasa', value: 'Kuat, bold, dan pahit' },
      { label: 'Rasa', value: 'Woody, earthy, harsh, nutty' },
      { label: 'Kafein', value: 'Tinggi (+- 1,6-2,4%)' },
      { label: 'Tingkat Keasaman', value: 'Rendah' },
      { label: 'Harga', value: '+- Rp.40.000/100 gram' },
      { label: 'Jenis', value: 'Lampung, Temanggung, Dampit, Pupuan, Flores, dan Toraja' },
    ],
  },
};

export default function CoffeeBeans() {
  const [activeTab, setActiveTab] = useState('arabika');
  const data = coffeeData[activeTab];
  const detail = beanDetails[activeTab];
  const beanImage = activeTab === 'arabika' ? arabikaImg : robustaImg;

  return (
    <section id="education" className="scroll-mt-14">
      <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
        <div
          className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-8 py-20 text-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.66), rgba(0,0,0,0.86)), url(${beansBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="absolute left-1/2 top-20 w-full -translate-x-1/2 px-6 font-gochi text-5xl text-white md:text-7xl">
            Coffee Beans
          </h2>

          <div className="mt-20 flex min-h-[360px] w-full max-w-[420px] items-center justify-center rounded-[42px] bg-[#39393980] px-8 py-6 shadow-[10px_10px_4px_rgba(0,0,0,0.25)] backdrop-blur-[1px] md:max-w-[500px]">
            <img
              src={beanImage}
              alt={`${data.name} coffee bean`}
              className="h-[330px] w-full object-contain md:h-[390px]"
            />
          </div>

          <h3 className="mt-9 font-concert text-7xl uppercase leading-none tracking-wider text-white md:text-8xl">
            {data.name}
          </h3>
        </div>

        <div className="flex h-screen items-center justify-center bg-section-bg px-8 py-20 md:px-14 xl:px-24">
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

            <p className="mb-5 font-azeret text-sm uppercase leading-relaxed tracking-[0.18em] text-white md:text-base">
              {detail.origin}
            </p>

            <div className="bg-[#efe6d6]/80 px-6 py-5">
              <table className="w-full table-fixed border-collapse">
                <tbody>
                  {detail.specs.map((spec, index) => (
                    <tr key={spec.label} className={index !== detail.specs.length - 1 ? 'border-b border-black/70' : ''}>
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
