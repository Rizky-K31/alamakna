import { Link } from 'react-router-dom';
import footerBg from '../assets/footer.webp';
import { useAuth } from '../context/useAuth';

export default function Footer() {
  const { user } = useAuth();
  const simulationTarget = user ? '/#simulation' : '/#simulation-login';

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 bg-navbar"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(20,16,12,0.90), rgba(20,16,12,0.76)), url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%',
      }}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-[90px] md:py-16">
        <div>
          <Link to="/#home" className="font-gochi text-5xl leading-none tracking-wide text-white transition-colors hover:text-accent md:text-6xl">
            ALAMAKNA
          </Link>
          <p className="mt-5 max-w-md font-akshar text-lg leading-relaxed text-white/72">
            Ruang eksplorasi kopi Nusantara untuk mengenal origin, karakter biji, dan racikan blend yang paling cocok dengan seleramu.
          </p>
        </div>

        <div>
          <h3 className="font-azeret text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Explore
          </h3>
          <nav className="mt-5 flex flex-col gap-3">
            {[
              ['Home', '/#home'],
              ['Education', '/#education'],
              ['Simulation', simulationTarget],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="font-akshar text-lg text-white/76 transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="font-azeret text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Origins
          </h3>
          <div className="mt-5 space-y-3 font-akshar text-lg leading-snug text-white/76">
            <p>Gunung Makale, Sulawesi Selatan</p>
            <p>Gunung Batur, Bali</p>
            <p>Gunung Rinjani, Nusa Tenggara Barat</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-6 py-5 font-azeret text-[11px] uppercase tracking-[0.16em] text-white/54 md:flex-row md:items-center md:justify-between md:px-[90px]">
          <p>© 2026 ALAMAKNA</p>
          <p>Coffee origin and blend simulator</p>
        </div>
      </div>
    </footer>
  );
}
