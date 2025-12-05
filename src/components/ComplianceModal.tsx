import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PixelIcon } from "@/components/PixelIcon";
import { X, ChevronDown } from "lucide-react";

// Import images
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import aboutSustainability from "@/assets/about-sustainability.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";

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

const imageConfigMap: Record<string, { src: string; alt: string }> = {
  "ISO 9001": {
    src: scanProDashboard,
    alt: "Quality managers reviewing ISO 9001 supplier audit results in the YVOO ScanPro+ dashboard.",
  },
  "IATF 16949": {
    src: industryAutomotive,
    alt: "Automotive production team during an IATF 16949 supplier audit.",
  },
  "AS9100": {
    src: industryAerospace,
    alt: "Aerospace manufacturing team in a quality audit discussion.",
  },
  "ISO 14001": {
    src: aboutSustainability,
    alt: "Sustainable manufacturing site focused on environmental management.",
  },
  "GMP": {
    src: aiAudit,
    alt: "Pharmaceutical production line being inspected under GMP requirements.",
  },
  "API Q1": {
    src: industryCryogenicValve,
    alt: "Industrial valve manufacturing facility during an API Q1 quality check.",
  },
  "SQF": {
    src: digitalWorkflowTeam,
    alt: "Food industry quality team collaborating on Safe Quality Food procedures.",
  },
  "VDA 6.3": {
    src: industryAutomotive,
    alt: "Engineers reviewing process performance during a VDA 6.3 audit.",
  },
  "TS16949": {
    src: industryAutomotive,
    alt: "Automotive supplier plant during a technical specification quality review.",
  },
  "GDPR": {
    src: scanProDashboard,
    alt: "Compliance specialists reviewing GDPR data protection controls in a dashboard.",
  },
  "SOC 2": {
    src: riskScoring,
    alt: "Security analysts monitoring SOC 2 control performance on a risk dashboard.",
  },
  "FDA": {
    src: industryMedical,
    alt: "Medical device production team preparing for an FDA compliance inspection.",
  },
};

export const ComplianceModal = ({ standard, onClose }: ComplianceModalProps) => {
  if (!standard) return null;

  const imageConfig = imageConfigMap[standard.name];

  return (
    <Dialog open={!!standard} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="h-full overflow-y-auto">
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
                {imageConfig && (
                  <img
                    src={imageConfig.src}
                    alt={imageConfig.alt}
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

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A7FA5] px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#0A7FA5]/90 hover:shadow-xl"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-full bg-[#0A7FA5] flex items-center justify-center animate-bounce">
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
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A7FA5] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0A7FA5]/90"
                  >
                    Get In Touch
                  </button>
                </div>

                {/* Circular image with rings - Apotech style */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="absolute -inset-8 rounded-full border-[20px] border-[#e8f4f8]" />
                    {/* Image circle */}
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                      {imageConfig && (
                        <img
                          src={imageConfig.src}
                          alt={imageConfig.alt}
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
          <section className="py-16 lg:py-24 bg-[#f8fafb]">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                Verification services covered by YVOO ScanPro+
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {standard.services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6EA996]/20 flex items-center justify-center">
                      <PixelIcon name="checkbox-on" className="w-4 h-4" />
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
                    className="text-center p-6 rounded-3xl bg-gradient-to-br from-[#f8fafb] to-white"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#0A7FA5]/10 flex items-center justify-center">
                      <PixelIcon name={benefit.iconName} className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-20 bg-[#0A7FA5]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to streamline your {standard.name} audits?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss how YVOO ScanPro+ can help with your supplier verification needs.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-[#0A7FA5] shadow-lg transition-all hover:bg-gray-50"
              >
                Get In Touch
                <PixelIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceModal;
