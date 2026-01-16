import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ArrowLeft, ArrowRight, Check } from "lucide-react";

// Import images - Hero images (people/team focus)
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import aboutSustainability from "@/assets/about-sustainability.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
// Import images - Secondary images (objects/process focus)
import aiCopilot from "@/assets/ai-copilot-analysis.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import auditorFactoryTeam from "@/assets/auditor-factory-team.jpg";
import supplierNetworking from "@/assets/supplier-networking.jpg";
import erpIntegration from "@/assets/erp-integration-sync.jpg";

interface ComplianceStandard {
  name: string;
  iconName: string;
  description: string;
  details: string;
  whyItMatters: string;
  services: string[];
  benefits: { iconName: string; title: string; description: string }[];
}

interface ComplianceModalProps {
  standard: ComplianceStandard | null;
  onClose: () => void;
}

// Hero images - people/team focused for hero section
const heroImageMap: Record<string, { src: string; alt: string }> = {
  "ISO 9001": {
    src: digitalWorkflowTeam,
    alt: "Quality management team collaborating on ISO 9001 compliance processes.",
  },
  "IATF 16949": {
    src: auditorFactoryTeam,
    alt: "Automotive quality team conducting IATF 16949 supplier audit.",
  },
  "AS9100": {
    src: industryAerospace,
    alt: "Aerospace engineers in quality audit discussion.",
  },
  "ISO 14001": {
    src: aboutSustainability,
    alt: "Environmental management team at sustainable manufacturing site.",
  },
  "GMP": {
    src: industryMedical,
    alt: "Pharmaceutical professionals during GMP compliance inspection.",
  },
  "API Q1": {
    src: industryCryogenicValve,
    alt: "Industrial engineers at valve manufacturing facility.",
  },
  "SQF": {
    src: supplierNetworking,
    alt: "Food safety professionals collaborating on SQF procedures.",
  },
  "VDA 6.3": {
    src: industryAutomotive,
    alt: "Automotive engineers during VDA 6.3 process audit.",
  },
  "TS16949": {
    src: auditorFactoryTeam,
    alt: "Quality team at automotive supplier facility.",
  },
  "GDPR": {
    src: digitalWorkflowTeam,
    alt: "Compliance team reviewing data protection controls.",
  },
  "SOC 2": {
    src: aiCopilot,
    alt: "Security analysts monitoring SOC 2 compliance systems.",
  },
  "FDA": {
    src: industryMedical,
    alt: "Medical device team preparing for FDA compliance inspection.",
  },
};

// Secondary images - object/process focused for circular section
const secondaryImageMap: Record<string, { src: string; alt: string }> = {
  "ISO 9001": {
    src: scanProDashboard,
    alt: "ISO 9001 audit results dashboard showing quality metrics.",
  },
  "IATF 16949": {
    src: riskScoring,
    alt: "IATF 16949 risk scoring and compliance dashboard.",
  },
  "AS9100": {
    src: liveTracking,
    alt: "AS9100 audit tracking and monitoring system.",
  },
  "ISO 14001": {
    src: erpIntegration,
    alt: "Environmental management system integration dashboard.",
  },
  "GMP": {
    src: aiAudit,
    alt: "GMP compliance inspection and documentation system.",
  },
  "API Q1": {
    src: oneClickDispatch,
    alt: "API Q1 audit dispatch and scheduling interface.",
  },
  "SQF": {
    src: liveTracking,
    alt: "SQF audit tracking and food safety monitoring.",
  },
  "VDA 6.3": {
    src: scanProDashboard,
    alt: "VDA 6.3 process audit results and scoring.",
  },
  "TS16949": {
    src: riskScoring,
    alt: "Automotive quality specification compliance metrics.",
  },
  "GDPR": {
    src: riskScoring,
    alt: "GDPR data protection compliance monitoring dashboard.",
  },
  "SOC 2": {
    src: scanProDashboard,
    alt: "SOC 2 security control performance dashboard.",
  },
  "FDA": {
    src: aiAudit,
    alt: "FDA compliance inspection documentation system.",
  },
};

export const ComplianceModal = ({ standard, onClose }: ComplianceModalProps) => {
  if (!standard) return null;

  const heroImage = heroImageMap[standard.name];
  const secondaryImage = secondaryImageMap[standard.name];

  return (
    <Dialog open={!!standard} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Navigation bar with back button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to ScanPro+</span>
              <span className="sm:hidden">Back</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto pt-16">
          {/* Hero Section - Apotech style */}
          <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
            {/* Left side image - clipped circle */}
            <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'ellipse(100% 100% at 0% 50%)',
                }}
              >
                {heroImage && (
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
              <div className="lg:ml-[45%] lg:pl-16 space-y-6">
                <DialogHeader className="space-y-4 text-left">
                  <DialogTitle className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {standard.name} Audit Services
                  </DialogTitle>
                  <DialogDescription className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                    {standard.details}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-base text-gray-500 max-w-xl">
                  Our team can provide ongoing expertise and guidance to ensure your {standard.name} audit process remains thorough, compliant and effective.
                </p>

                <Button size="lg">
                  Get In Touch
                </Button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center animate-bounce">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </section>

          {/* Second Section - Text + Circular Image */}
          <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text content */}
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Why it matters for procurement and supply chain
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {standard.whyItMatters}
                  </p>
                  <Button>
                    Get In Touch
                  </Button>
                </div>

                {/* Circular image with rings - Different image from hero */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="absolute -inset-8 rounded-full border-[20px] border-[#e8f4f8]" />
                    {/* Image circle */}
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                      {secondaryImage && (
                        <img
                          src={secondaryImage.src}
                          alt={secondaryImage.alt}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                Verification services covered by YVOO ScanPro+
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {standard.services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-700">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
                Three key benefits with YVOO ScanPro+
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {standard.benefits.map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="text-center p-6 rounded-lg bg-gradient-to-br from-[#f8fafb] to-white"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to streamline your {standard.name} audits?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss how YVOO ScanPro+ can help with your supplier verification needs.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceModal;
