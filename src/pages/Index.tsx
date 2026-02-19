import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import WhyRCASection from "@/components/WhyYVOOSection";
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

import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="RCA — Supplier Audits in Days, Not Months"
        description="On-site factory assessments from €700. AI-powered supplier verification with certified auditors across 45+ countries. 60% cost reduction, 72h mobilization."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RCA",
            "url": "https://www.yvoo.io",
            "description": "AI-powered supplier audit and verification platform with certified auditors in 45+ countries.",
            "serviceType": "Supplier Audit & Verification"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RCA",
            "url": "https://www.yvoo.io",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.yvoo.io/search-suppliers?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      <PageGridOverlay />
      <div className="relative">
        <Navigation />
        <HeroSection />

        {/* DIN annotation — grid 4→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1200" from={4} to={6} />
        </div>

        {/* Pain Points — why traditional audits fail */}
        <PainPointsSection />

        {/* Section cut marker A—A */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        <EmailComparisonSection />

        {/* Dimension line: cost reduction */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="15.000" to="700" unit="€" gridFrom={0} gridTo={4} />
        </div>

        <CapabilityOverviewSection />

        {/* Tolerance notation for quality metric */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Audit Quality" gridColumn={4} />
        </div>

        {/* Platform Demo */}
        <TestimonialSection />

        {/* Section cut marker B—B */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="B" from={1} to={5} />
        </div>

        <WhyRCASection />

        {/* DIN annotation — grid 3→6 */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="950" from={3} to={6} />
        </div>

        <AtlasAISection />

        <AuditDifferenceSection />

        {/* Dimension line: time reduction */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="14" to="3" unit=" Tage" gridFrom={2} gridTo={6} />
        </div>

        <HowItWorksSection />

        <FAQSection />
      </div>
    </div>
  );
};

export default Index;
