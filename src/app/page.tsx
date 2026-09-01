import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FeaturedCoursesSection } from "@/components/landing/FeaturedCoursesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatisticsSection } from "@/components/landing/StatisticsSection";
import { WhyBeeLearnSection } from "@/components/landing/WhyBeeLearnSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main id="main-content" className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <FeaturedCoursesSection />
        <HowItWorksSection />
        <StatisticsSection />
        <WhyBeeLearnSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}