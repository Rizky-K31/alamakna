import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const displayName = user?.user_metadata?.username
    || user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'USER';

  const simulationHash = user ? '#simulation' : '#simulation-login';
  const navLinks = [
    { to: '/#home', hash: '#home', label: 'Home' },
    { to: '/#education', hash: '#education', label: 'Education' },
    { to: `/${simulationHash}`, hash: simulationHash, label: 'Simulation' },
  ];

  const isActive = (link) =>
    link.hash
      ? location.pathname === '/' && location.hash === link.hash
      : location.pathname === link.to;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-navbar shadow-lg shadow-black/20">
      <div
        className="mx-auto flex h-[57px] w-full max-w-[1280px] items-center justify-between px-6"
        style={{ paddingLeft: '100px', paddingRight: '10px' }}
      >
        <Link
          to="/#home"
          className="font-gochi text-[35px] leading-none text-white transition-colors hover:text-accent"
        >
          ALAMAKNA
        </Link>

        <div className="hidden items-center gap-14 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-akshar text-base leading-none transition-colors ${
                isActive(link)
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="flex h-7 max-w-[140px] items-center justify-center truncate rounded-[5px] bg-white px-3 font-akshar text-base font-bold leading-none text-black transition-colors hover:bg-accent"
            >
              {displayName}
            </button>
          ) : (
            <Link
              to="/login"
              className="flex h-7 w-[72px] items-center justify-center rounded-[5px] bg-white font-akshar text-base font-bold leading-none text-black transition-colors hover:bg-accent"
            >
              LOGIN
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-text-cream md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-navbar md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-akshar text-lg ${
                  isActive(link) ? 'text-white' : 'text-text-cream/80'
                }`}
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
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-akshar text-lg text-white"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
