import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AtlasAISection from "@/components/AtlasAISection";
import AuditDifferenceSection from "@/components/AuditDifferenceSection";
import CapabilityOverviewSection from "@/components/CapabilityOverviewSection";
import LNGSearchDemo from "@/components/LNGSearchDemo";
import EmailComparisonSection from "@/components/EmailComparisonSection";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import ToleranceNotation from "@/components/ToleranceNotation";
import SectionCutMarker from "@/components/SectionCutMarker";

import TestimonialSection from "@/components/TestimonialSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

import SupplierDatabaseDemo from "@/components/SupplierDatabaseDemo";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="Hilti — From Tool Sourcing to Verified Quality"
        description="Find, qualify, inspect, and improve power tool suppliers on one platform. AI-powered search, on-site inspections in 72h, automated CAPA tracking. Full lifecycle coverage."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hilti",
            "url": "https://www.hilti.com",
            "description": "AI-powered tool supplier lifecycle platform — from search to inspection to CAPA close-out.",
            "serviceType": "Power Tool Supplier Quality Management"
          }
        ]}
      />
      <PageGridOverlay />
      <div className="relative">
        <Navigation />
        <HeroSection />

        {/* DIN annotation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1200" from={4} to={6} />
        </div>

        {/* Pain Points — why the full lifecycle is broken */}
        <PainPointsSection />

        {/* Old way vs RCA comparison */}
        <EmailComparisonSection />

        {/* Section cut marker A—A */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        {/* Three capabilities: Search → Verify → Improve */}
        <CapabilityOverviewSection />

        {/* Dimension line: cost reduction */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="15.000" to="700" unit="€" gridFrom={0} gridTo={4} />
        </div>

        {/* Section cut marker B—B */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="B" from={1} to={5} />
        </div>

        {/* Platform Demo */}
        <TestimonialSection />

        {/* SearchPro+ Demo — LNG supplier search */}
        <LNGSearchDemo />

        {/* Tolerance notation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Audit Quality" gridColumn={4} />
        </div>

        {/* Atlas AI */}
        <AtlasAISection />

        {/* How an Atlas audit works */}
        <AuditDifferenceSection />

        {/* DIN annotation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="950" from={3} to={6} />
        </div>

        {/* Full Lifecycle: Search → Qualify → Audit → Report → CAPA */}
        <HowItWorksSection />

        {/* Dimension line: time */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="14" to="3" unit=" Tage" gridFrom={2} gridTo={6} />
        </div>

        {/* RCA Full Supplier Database */}
        <SupplierDatabaseDemo />
      </div>
    </div>
  );
};

export default Index;
