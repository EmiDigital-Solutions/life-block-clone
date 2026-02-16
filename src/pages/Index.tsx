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
      <div className="relative">
        <Navigation />
        <HeroSection />

        {/* DIN annotation — grid 4→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1200" from={4} to={6} />
        </div>

        <EmailComparisonSection />

        {/* DIN annotation — grid 0→3 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="700" from={0} to={3} />
        </div>

        <CapabilityOverviewSection />
        <TestimonialSection />

        {/* DIN annotation — grid 2→5 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="Ø 800" from={2} to={5} />
        </div>

        <WhyYVOOSection />

        {/* DIN annotation — grid 3→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="950" from={3} to={6} />
        </div>

        <AtlasAISection />
        <AuditDifferenceSection />

        {/* DIN annotation — grid 0→2 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="460" from={0} to={2} />
        </div>

        <HowItWorksSection />

        {/* DIN annotation — grid 1→4 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1400" from={1} to={4} />
        </div>

        <TestimonialsCarouselSection />

        {/* DIN annotation — grid 4→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="580" from={4} to={6} />
        </div>

        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
