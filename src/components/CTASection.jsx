import { Link } from 'react-router-dom';
import beansBg from '../assets/beans.webp';

export default function CTASection() {
  return (
    <section
      id="simulation-login"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${beansBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-8 md:grid-cols-[380px_1fr] md:gap-14">
        <Link
          to="/login"
          state={{ redirectTo: '/#simulation' }}
          className="mx-auto flex h-[148px] w-full max-w-[330px] items-center justify-center rounded-[44px] bg-white font-akshar text-6xl font-bold leading-none text-black shadow-[10px_10px_0px_#000] transition-all hover:scale-105 hover:bg-accent md:h-[180px] md:max-w-[380px] md:rounded-[50px] md:text-8xl"
        >
          LOGIN
        </Link>

        <div className="flex flex-col items-center justify-center md:items-start">
          <p className="font-azeret text-base leading-none text-white md:text-xl">
            To
          </p>
          <h2 className="font-gochi text-7xl leading-[0.9] text-white md:text-[140px]">
            BLEND
          </h2>
          <p className="font-azeret text-sm leading-none text-white md:text-xl">
            Your Coffee & Adjust The
          </p>
          <h2 className="font-gochi text-7xl leading-[0.9] text-white md:text-[140px]">
            GRIND SIZE
          </h2>
        </div>
      </div>
    </section>
  );
}
