import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import AtlasAISection from "@/components/AtlasAISection";
import AuditDifferenceSection from "@/components/AuditDifferenceSection";
import CapabilityOverviewSection from "@/components/CapabilityOverviewSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";

import TestimonialSection from "@/components/TestimonialSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

import TestimonialsCarouselSection from "@/components/TestimonialsCarouselSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <PageGridOverlay />
      {/* Content — no z-index wrapper so lines show through */}
      <div className="relative">
        <Navigation />
        <HeroSection />
        <EmailComparisonSection />

        {/* Technical annotation — transition into capabilities */}
        <div className="mx-auto max-w-[1400px] px-8">
          <TechnicalAnnotation label="SEC 1200" variant="right" />
        </div>

        <CapabilityOverviewSection />
        <TestimonialSection />
        <WhyYVOOSection />

        {/* Technical annotation — transition into Atlas AI */}
        <div className="mx-auto max-w-[1400px] px-8 py-1">
          <TechnicalAnnotation label="Ø 800" variant="center" />
        </div>

        <AtlasAISection />
        <AuditDifferenceSection />
        
        <HowItWorksSection />

        {/* Technical annotation — before testimonials */}
        <div className="mx-auto max-w-[1400px] px-8">
          <TechnicalAnnotation label="DIM 1400" variant="left" />
        </div>

        <TestimonialsCarouselSection />
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
