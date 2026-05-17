import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'USER';

  const simulationHash = user ? '#simulation' : '#simulation-login';

  const navLinks = [
    { to: '/#home', hash: '#home', label: 'Home' },
    { to: '/#education', hash: '#education', label: 'Education' },
    { to: `/${simulationHash}`, hash: simulationHash, label: 'Simulation' },
  ];

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const sectionIds = ['home', 'education', simulationHash.slice(1)];

    const updateActiveSection = () => {
      const markerPosition = 90;
      const currentSection = sectionIds.find((id) => {
        const element = document.getElementById(id);

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top <= markerPosition && rect.bottom > markerPosition;
      });

      if (currentSection) {
        setActiveHash(`#${currentSection}`);
      }
    };

    const frameId = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location.hash, location.pathname, simulationHash]);

  const isActive = ({ to, hash }) =>
    hash ? location.pathname === '/' && activeHash === hash : location.pathname === to;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinkClass = (link) =>
    `relative font-akshar text-base leading-none transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:rounded-full after:bg-accent after:transition-all ${
      isActive(link) ? 'text-white after:w-full' : 'text-white/75 hover:text-white after:w-0 hover:after:w-full'
    }`;

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-navbar/75 shadow-lg shadow-black/20 backdrop-blur-md">
      <div
        className="mx-auto flex h-[57px] w-full max-w-[1280px] items-center justify-between px-6"
        style={{ paddingLeft: '100px', paddingRight: '10px' }}
      >
        <Link to="/#home" className="font-gochi text-[35px] leading-none tracking-wide text-white transition-colors hover:text-accent">
          ALAMAKNA
        </Link>

        <div className="hidden items-center gap-14 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={navLinkClass(link)}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="group relative flex h-10 min-w-[110px] max-w-[150px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/95 px-5 font-akshar text-lg font-bold leading-none text-black shadow-sm shadow-black/20 transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <span className="max-w-full truncate transition-all duration-200 group-hover:-translate-y-8 group-hover:opacity-0">
                {displayName}
              </span>
              <span className="absolute translate-y-8 transition-all duration-200 group-hover:translate-y-0">
                LOGOUT
              </span>
            </button>
          ) : (
            <Link to="/login" className="flex h-8 w-[78px] items-center justify-center rounded-full border border-white/15 bg-white/90 font-akshar text-sm font-bold leading-none text-black transition-colors hover:bg-accent hover:text-white">
              LOGIN
            </Link>
          )}
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="text-text-cream md:hidden" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-navbar/95 shadow-xl backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-akshar text-lg ${isActive(link) ? 'text-white' : 'text-text-cream/80'}`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left font-akshar text-lg text-white"
              >
                {displayName}
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="font-akshar text-lg text-white">
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
