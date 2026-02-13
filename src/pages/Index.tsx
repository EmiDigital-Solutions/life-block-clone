import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import AtlasAISection from "@/components/AtlasAISection";
import CapabilityOverviewSection from "@/components/CapabilityOverviewSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import TestimonialSection from "@/components/TestimonialSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import StatsWithQuoteSection from "@/components/StatsWithQuoteSection";
import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* 6-column background grid lines — Archlet style, behind all content */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="mx-auto max-w-[1400px] h-full px-8">
          <div className="relative h-full">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-foreground/[0.07]"
                style={{ left: `${(i / 6) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* All content sits above grid lines */}
      <div className="relative z-[1]">
        <Navigation />
        <HeroSection />
        <CapabilityOverviewSection />
        <TestimonialSection />
        <WhyYVOOSection />
        <AtlasAISection />
        <EmailComparisonSection />
        <GlobalNetworkSection />
        <HowItWorksSection />
        <StatsWithQuoteSection />
        <TestimonialsCarouselSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
