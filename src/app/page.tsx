import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import StripeHero from '@/components/landing/StripeHero';
// import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <StripeHero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
