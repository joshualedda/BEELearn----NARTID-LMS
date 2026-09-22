import { LandingTemplate } from "@/templates/LandingTemplate";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FeaturedCoursesSection } from "@/components/landing/FeaturedCoursesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatisticsSection } from "@/components/landing/StatisticsSection";
import { WhyBeeLearnSection } from "@/components/landing/WhyBeeLearnSection";
import { CTASection } from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <LandingTemplate>
      <HeroSection />
      <FeaturesSection />
      <FeaturedCoursesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <WhyBeeLearnSection />
      <CTASection />
    </LandingTemplate>
  );
}