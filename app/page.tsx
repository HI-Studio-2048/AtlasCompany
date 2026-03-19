import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import JurisdictionsSection from '@/components/JurisdictionsSection'
import PricingSection from '@/components/PricingSection'
import Footer from '@/components/Footer'
import CtaBanner from '@/components/CtaBanner'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JurisdictionsSection />
      <PricingSection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
