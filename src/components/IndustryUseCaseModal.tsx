import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PixelIcon } from "@/components/PixelIcon";
import { X, ChevronDown, ArrowLeft } from "lucide-react";

// Import images
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";

export interface IndustryUseCase {
  image: string;
  title: string;
  useCase: string;
  solutions: string[];
  result?: string;
  // Extended details for modal
  description?: string;
  whyItMatters?: string;
  keyBenefits?: { iconName: string; title: string; description: string }[];
  metrics?: { value: string; label: string }[];
}

interface IndustryUseCaseModalProps {
  useCase: IndustryUseCase | null;
  onClose: () => void;
}

// Extended data for each industry
const industryExtendedData: Record<string, {
  description: string;
  whyItMatters: string;
  keyBenefits: { iconName: string; title: string; description: string }[];
  metrics: { value: string; label: string }[];
  secondaryImage: string;
}> = {
  "Automotive: PPAP Validation & Tool Audits": {
    description: "Our automotive audit services cover the complete supplier qualification process, from Production Part Approval Process (PPAP) validation to comprehensive tool audits. We ensure your Tier-2 suppliers meet the rigorous quality standards required by the automotive industry.",
    whyItMatters: "In the automotive industry, a single defective component can trigger costly recalls affecting thousands of vehicles. Our PPAP validation services help you identify and qualify reliable suppliers before production begins, significantly reducing supply chain risks and ensuring compliance with OEM requirements.",
    keyBenefits: [
      { iconName: "clock", title: "Rapid Qualification", description: "Complete supplier qualification in days instead of weeks with our streamlined digital process." },
      { iconName: "document", title: "Complete Documentation", description: "Automatic PPAP documentation generation including all 18 elements required by AIAG standards." },
      { iconName: "sync", title: "ERP Integration", description: "Seamless integration with your existing ERP systems for automatic release processes." }
    ],
    metrics: [
      { value: "3 days", label: "Average qualification time" },
      { value: "100%", label: "PPAP documentation coverage" },
      { value: "85%", label: "Cost reduction vs traditional audits" }
    ],
    secondaryImage: scanProDashboard
  },
  "Aerospace: AS9100 Compliance & Critical Process Validation": {
    description: "Our aerospace audit services specialize in AS9100 compliance verification and critical process validation. We provide thorough assessment of welding, heat treatment, and special processes at suppliers handling aircraft-critical components.",
    whyItMatters: "Aerospace manufacturing demands zero tolerance for defects. A single failure in a critical component can have catastrophic consequences. Our AS9100 audits ensure your suppliers maintain the highest quality standards and process controls required for aviation safety.",
    keyBenefits: [
      { iconName: "shield-check", title: "AS9100 Expertise", description: "Auditors certified in AS9100/EN9100 standards with aerospace industry experience." },
      { iconName: "document", title: "Process Qualification", description: "Complete special process qualification with NADCAP-aligned documentation." },
      { iconName: "analytics", title: "Material Traceability", description: "Full material tracking and certificate verification for complete supply chain visibility." }
    ],
    metrics: [
      { value: "100%", label: "Critical process coverage" },
      { value: "24h", label: "Report delivery" },
      { value: "50+", label: "AS9100 certified auditors" }
    ],
    secondaryImage: liveTracking
  },
  "Pharma: GMP Audits & Clean Room Assessments": {
    description: "Our pharmaceutical audit services cover Good Manufacturing Practice (GMP) compliance, clean room assessments, and API manufacturer qualifications. We ensure your pharmaceutical suppliers meet FDA, EMA, and other regulatory requirements.",
    whyItMatters: "Patient safety is paramount in pharmaceutical manufacturing. Non-compliance with GMP standards can result in product recalls, regulatory actions, and most importantly, patient harm. Our GMP audits provide the assurance you need before engaging new suppliers.",
    keyBenefits: [
      { iconName: "shield-check", title: "Regulatory Expertise", description: "Auditors experienced with FDA 21 CFR Part 211, EU GMP Annex requirements." },
      { iconName: "chart-bar", title: "Clean Room Classification", description: "Automatic clean room assessment and classification according to ISO 14644." },
      { iconName: "document", title: "Change Control", description: "Comprehensive deviation management and change control process evaluation." }
    ],
    metrics: [
      { value: "99.5%", label: "Regulatory compliance rate" },
      { value: "48h", label: "FDA-compliant report delivery" },
      { value: "30+", label: "Countries with GMP auditors" }
    ],
    secondaryImage: riskScoring
  },
  "Chemical & Process Industry: REACH Compliance & Process Safety": {
    description: "Our chemical industry audit services cover REACH compliance verification, plant safety inspections, and environmental audits. We assess chemical manufacturers against COMAH/Seveso requirements and international safety standards.",
    whyItMatters: "Chemical plant incidents can have devastating environmental and human consequences. Proper safety assessments and REACH compliance audits are essential for responsible supplier selection and regulatory compliance across your chemical supply chain.",
    keyBenefits: [
      { iconName: "shield-check", title: "Safety Assessment", description: "Comprehensive plant safety inspection with automatic risk scoring and prioritization." },
      { iconName: "leaf", title: "Environmental Audits", description: "REACH compliance verification and environmental impact assessment." },
      { iconName: "clock", title: "Action Tracking", description: "Automated corrective action tracking with deadline monitoring and escalation." }
    ],
    metrics: [
      { value: "95%", label: "Risk detection rate" },
      { value: "100%", label: "REACH compliance coverage" },
      { value: "72h", label: "Complete assessment delivery" }
    ],
    secondaryImage: oneClickDispatch
  }
};

export const IndustryUseCaseModal = ({ useCase, onClose }: IndustryUseCaseModalProps) => {
  if (!useCase) return null;

  const extendedData = industryExtendedData[useCase.title];
  const description = extendedData?.description || useCase.useCase;
  const whyItMatters = extendedData?.whyItMatters || "";
  const keyBenefits = extendedData?.keyBenefits || [];
  const metrics = extendedData?.metrics || [];
  const secondaryImage = extendedData?.secondaryImage || useCase.image;

  return (
    <Dialog open={!!useCase} onOpenChange={(open) => !open && onClose()}>
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
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto pt-16">
          {/* Hero Section */}
          <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
            {/* Left side image - clipped circle */}
            <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'ellipse(100% 100% at 0% 50%)',
                }}
              >
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
              <div className="lg:ml-[45%] lg:pl-16 space-y-6">
                <DialogHeader className="space-y-4 text-left">
                  <DialogTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {useCase.title}
                  </DialogTitle>
                  <DialogDescription className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                    {description}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-base text-gray-500 max-w-xl">
                  {useCase.useCase}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                >
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center animate-bounce">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          {metrics.length > 0 && (
            <section className="py-12 bg-foreground">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-3 gap-8">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{metric.value}</p>
                      <p className="text-sm text-white/70">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Why It Matters Section */}
          {whyItMatters && (
            <section className="py-20 lg:py-28 bg-white">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Text content */}
                  <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Why it matters for your supply chain
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {whyItMatters}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90"
                    >
                      Get In Touch
                    </button>
                  </div>

                  {/* Circular image with rings */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <div className="absolute -inset-8 rounded-full border-[20px] border-[#e8f4f8]" />
                      <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                        <img
                          src={secondaryImage}
                          alt={`${useCase.title} dashboard`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Solutions Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                What YVOO ScanPro+ delivers
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {useCase.solutions.map((solution, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <PixelIcon name="checkbox-on" className="w-4 h-4" />
                    </div>
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          {keyBenefits.length > 0 && (
            <section className="py-16 lg:py-24 bg-white">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
                  Key benefits with YVOO ScanPro+
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {keyBenefits.map((benefit, idx) => (
                    <div 
                      key={idx}
                      className="text-center p-6 rounded-3xl bg-gradient-to-br from-[#f8fafb] to-white"
                    >
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <PixelIcon name={benefit.iconName} className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Result Section */}
          {useCase.result && (
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Real Results</h3>
                  <p className="text-lg text-primary font-medium">{useCase.result}</p>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 lg:py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to transform your supplier audits?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get in touch with our team to discuss how YVOO ScanPro+ can help with your industry-specific audit needs.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-lg transition-all hover:bg-gray-50"
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

export default IndustryUseCaseModal;
