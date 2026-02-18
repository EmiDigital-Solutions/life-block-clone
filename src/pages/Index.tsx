import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyYVOOSection from "@/components/WhyYVOOSection";
import AtlasAISection from "@/components/AtlasAISection";
import AuditDifferenceSection from "@/components/AuditDifferenceSection";
import CapabilityOverviewSection from "@/components/CapabilityOverviewSection";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import ToleranceNotation from "@/components/ToleranceNotation";
import SectionCutMarker from "@/components/SectionCutMarker";

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

        {/* Section cut marker A—A */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        <CapabilityOverviewSection />

        {/* Dimension line: cost reduction */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="15.000" to="700" unit="€" gridFrom={0} gridTo={4} />
        </div>

        <TestimonialSection />

        {/* Tolerance notation for quality metric */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Audit Quality" gridColumn={4} />
        </div>

        <WhyYVOOSection />

        {/* DIN annotation — grid 3→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="950" from={3} to={6} />
        </div>

        <AtlasAISection />

        {/* Section cut marker B—B */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="B" from={1} to={5} />
        </div>

        <AuditDifferenceSection />

        {/* Dimension line: time reduction */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="14" to="3" unit=" Tage" gridFrom={2} gridTo={6} />
        </div>

        <HowItWorksSection />

        {/* Section cut marker C—C */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="C" from={0} to={3} />
        </div>

        <TestimonialsCarouselSection />

        {/* Tolerance notation for delivery performance */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="48" tolerance="4" unit="h" label="Deployment" gridColumn={5} />
        </div>

        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
