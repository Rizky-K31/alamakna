import beansBg from '../assets/beans.webp';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.42)), url(${beansBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 px-6">
        <h1 className="font-gochi text-6xl text-white drop-shadow-lg md:text-8xl">
          ALAMAKNA
        </h1>
        <p className="-mt-2 font-azeret text-xs text-white md:text-sm">
          Temukan rasa kopimu di sini
        </p>
      </div>
    </section>
  );
}
