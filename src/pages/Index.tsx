import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AtlasAISection from "@/components/AtlasAISection";
import LNGITLandscape from "@/components/LNGITLandscape";
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
        title="CEIP — Croatian Enterprise Intelligence Platform"
        description="AI-powered platform connecting 162,000+ Croatian manufacturers with international buyers. Structured supplier profiles, AI matchmaking, 48-hour on-site audits. Government-backed export initiative."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CEIP",
            "url": "https://www.ceip.hr",
            "description": "Croatian Enterprise Intelligence Platform — AI-powered supplier discovery, qualification, and verification for Croatian industry.",
            "serviceType": "Enterprise Intelligence Platform"
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

        {/* IT System Architecture */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-primary/70 mb-3 block">System Architecture</span>
              <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                CEIP IT Platform Architecture
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Croatian Government Project — Ministry of Economy & Sustainability. Global 24/7 AI platform for partner discovery, audit ordering, reports & inspections.
              </p>
            </div>
            <LNGITLandscape />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
