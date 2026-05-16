import { Link } from 'react-router-dom';
import footerBg from '../assets/footer.webp';

export default function Footer() {
  return (
    <footer
      className="relative min-h-[220px] border-t border-black/30"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.62), rgba(0,0,0,0.76)), url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%',
      }}
    >
      <div className="px-8 py-8 md:px-12">
        <Link to="/" className="font-gochi text-4xl tracking-wide text-white">
          ALAMAKNA
        </Link>
      </div>
    </footer>
  );
}
