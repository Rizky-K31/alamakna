import gunungMakale from '../assets/gunung_makale.webp';

export default function OriginSection() {
  return (
    <section
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.23), rgba(0,0,0,0.05)), url(${gunungMakale})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full px-10 md:px-24">
        <div className="max-w-lg">
          <h2 className="font-gochi text-5xl leading-tight text-white md:text-7xl">
            Gunung Makale
          </h2>
          <p className="mb-64 font-concert text-xl leading-tight text-white">
            Sulawesi Selatan,<br />Indonesia
          </p>
          <div className="inline-block bg-black/60 px-3 py-2">
            <p className="font-azeret text-xs font-bold leading-tight text-white">
              Dataran Tinggi Penghasil<br />
              Biji Kopi Di Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
