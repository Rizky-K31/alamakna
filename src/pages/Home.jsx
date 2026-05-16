import HeroSection from '../components/HeroSection';
import CoffeeBeans from '../components/CoffeeBeans';
import OriginSection from '../components/OriginSection';
import CTASection from '../components/CTASection';
import { useAuth } from '../context/useAuth';
import Simulation from './Simulation';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <HeroSection />
      <CoffeeBeans />
      <OriginSection />
      {user ? <Simulation /> : <CTASection />}
    </div>
  );
}
