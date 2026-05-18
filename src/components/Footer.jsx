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
      <div className="mx-auto flex min-h-[170px] w-full max-w-[1280px] flex-col gap-8 px-6 py-7 md:flex-row md:items-start md:px-[90px] md:py-8">
        <div className="max-w-md">
          <Link to="/#home" className="font-gochi text-4xl leading-none tracking-wide text-white transition-colors hover:text-accent md:text-5xl">
            ALAMAKNA
          </Link>
          <p className="mt-3 font-akshar text-base leading-snug text-white/50">
            Ruang eksplorasi kopi Nusantara untuk mengenal origin, karakter biji, dan racikan blend yang paling cocok dengan seleramu.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:ml-auto md:flex-row md:gap-28 lg:gap-36">
          <div>
            <h3 className="font-azeret text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Explore
            </h3>
            <nav className="mt-3 flex flex-col gap-1.5">
              {[
                ['Home', '/#home'],
                ['Education', '/#education'],
                ['Peta Kopi', '/#peta-kopi'],
                ['Simulation', simulationTarget],
              ].map(([label, to]) => (
                <Link key={label} to={to} className="font-akshar text-base text-white/50 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-azeret text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Origins
            </h3>
            <div className="mt-3 space-y-1.5 font-akshar text-base leading-snug text-white/50">
              <p>Gunung Makale, Sulawesi Selatan</p>
              <p>Gunung Batur, Bali</p>
              <p>Gunung Rinjani, Nusa Tenggara Barat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-6 py-3 font-azeret text-[11px] uppercase tracking-[0.16em] text-white/54 md:flex-row md:items-center md:justify-between md:px-[90px]">
          <p>&copy; 2026 ALAMAKNA</p>
          <p>Coffee origin and blend simulator</p>
        </div>
      </div>
    </footer>
  );
}
