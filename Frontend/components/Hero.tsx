import { HeroImage } from '@/components/HeroImage';
import { HeroContent } from '@/components/HeroContent';

export default function Hero() {
  return (
    <div className="flex py-16 px-8 rounded-lg shadow-lg">
      <HeroImage />
      <HeroContent />
    </div>
  );
}
