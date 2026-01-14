import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PixelIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ArrowLeft } from "lucide-react";

// Import images - Hero images (people/team focus)
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import aiCopilotAnalysis from "@/assets/ai-copilot-analysis.jpg";
import smartMatchSuppliers from "@/assets/smart-match-suppliers.jpg";
import supplierSearchInterface from "@/assets/supplier-search-interface.jpg";
import riskScoringAi from "@/assets/risk-scoring-ai.jpg";
import liveTrackingDashboard from "@/assets/live-tracking-dashboard.jpg";
import auditorFactoryTeam from "@/assets/auditor-factory-team.jpg";
import supplierNetworking from "@/assets/supplier-networking.jpg";

// Import images - Secondary images (object/process focus)
import scanproDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import erpIntegration from "@/assets/erp-integration-sync.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import tripleSourceVerified from "@/assets/triple-source-verified.jpg";
import realtimeAlerts from "@/assets/realtime-alerts.jpg";

interface FeatureDetail {
  overview: string;
  forEngineers: string;
  forBuyers: string;
  forAuditors: string;
  example: string;
}

interface Feature {
  number: string;
  title: string;
  description: string;
  detailedExplanation: FeatureDetail;
}

interface FeatureModalProps {
  feature: Feature | null;
  onClose: () => void;
}

// Hero images - people/team focused for hero section
const heroImageMap: Record<string, { src: string; alt: string }> = {
  "AI Preference Engine": {
    src: aiCopilotAnalysis,
    alt: "AI system analyzing supplier preferences and recommendations.",
  },
  "Intelligent Requirement Capture": {
    src: digitalWorkflowTeam,
    alt: "Team working with intelligent document processing system.",
  },
  "Multi-Factor Matching": {
    src: smartMatchSuppliers,
    alt: "Multi-factor supplier matching analysis dashboard.",
  },
  "Explainable AI": {
    src: supplierSearchInterface,
    alt: "Transparent AI recommendation interface with explanations.",
  },
  "Smart Deduplication": {
    src: auditorFactoryTeam,
    alt: "Team consolidating supplier data across systems.",
  },
  "Dynamic Results": {
    src: riskScoringAi,
    alt: "Dynamic search results with quality-focused matching.",
  },
  "Real-Time Data Enrichment": {
    src: liveTrackingDashboard,
    alt: "Real-time supplier data enrichment dashboard.",
  },
  "Alternative Term Discovery": {
    src: supplierNetworking,
    alt: "Global supplier discovery across languages and regions.",
  },
};

// Secondary images - object/process focused for circular section
const secondaryImageMap: Record<string, { src: string; alt: string }> = {
  "AI Preference Engine": {
    src: scanproDashboard,
    alt: "AI preference engine dashboard showing personalized results.",
  },
  "Intelligent Requirement Capture": {
    src: oneClickDispatch,
    alt: "Document processing and requirement extraction interface.",
  },
  "Multi-Factor Matching": {
    src: tripleSourceVerified,
    alt: "Multi-criteria matching visualization.",
  },
  "Explainable AI": {
    src: riskScoringAi,
    alt: "AI explanation and reasoning breakdown.",
  },
  "Smart Deduplication": {
    src: erpIntegration,
    alt: "Entity resolution and deduplication system.",
  },
  "Dynamic Results": {
    src: scanproDashboard,
    alt: "Dynamic search results optimization.",
  },
  "Real-Time Data Enrichment": {
    src: realtimeAlerts,
    alt: "Real-time data updates and enrichment.",
  },
  "Alternative Term Discovery": {
    src: tripleSourceVerified,
    alt: "Multi-language term discovery system.",
  },
};

// Generate services based on feature
const getServicesForFeature = (title: string): string[] => {
  const servicesMap: Record<string, string[]> = {
    "AI Preference Engine": [
      "Industry-specific preference learning",
      "Certification priority configuration",
      "Geographic preference settings",
      "Volume requirement optimization",
      "Custom scoring weight adjustment",
      "Historical search pattern analysis",
    ],
    "Intelligent Requirement Capture": [
      "Natural language processing",
      "CAD/PDF document parsing",
      "Technical specification extraction",
      "Material standard conversion",
      "Tolerance and GD&T recognition",
      "Compliance requirement flagging",
    ],
    "Multi-Factor Matching": [
      "20+ criteria simultaneous evaluation",
      "Technical capability assessment",
      "Certification verification",
      "Geographic proximity scoring",
      "Production capacity analysis",
      "Industry experience weighting",
    ],
    "Explainable AI": [
      "Match percentage breakdown",
      "Requirement gap identification",
      "Trade-off analysis reports",
      "Certification status transparency",
      "Score justification details",
      "Decision audit trails",
    ],
    "Smart Deduplication": [
      "Cross-database entity resolution",
      "Name variation recognition",
      "Subsidiary relationship mapping",
      "Historical interaction consolidation",
      "Multi-source data merging",
      "Acquisition tracking alerts",
    ],
    "Dynamic Results": [
      "Quality-first result filtering",
      "Strict criteria matching",
      "No-filler result guarantee",
      "Specialized supplier discovery",
      "Accurate match counts",
      "Requirement precision scoring",
    ],
    "Real-Time Data Enrichment": [
      "Continuous profile updates",
      "Audit-verified capability data",
      "Ground truth integration",
      "Facility observation records",
      "Equipment verification logs",
      "Certification currency tracking",
    ],
    "Alternative Term Discovery": [
      "Multi-language synonym expansion",
      "Regional terminology mapping",
      "Industry-specific term matching",
      "Certification name variations",
      "Process equivalent discovery",
      "Global supplier coverage",
    ],
  };
  return servicesMap[title] || [];
};

// Generate benefits based on feature
const getBenefitsForFeature = (title: string) => {
  const benefitsMap: Record<string, { iconName: string; title: string; description: string }[]> = {
    "AI Preference Engine": [
      { iconName: "target", title: "Personalized Results", description: "Search results tailored to your organization's specific needs and preferences." },
      { iconName: "clock", title: "Time Savings", description: "Eliminate manual filter configuration with intelligent preference learning." },
      { iconName: "certificate", title: "Compliance First", description: "Automatically prioritize suppliers with required certifications." },
    ],
    "Intelligent Requirement Capture": [
      { iconName: "document", title: "Document Intelligence", description: "Extract specifications from any document format automatically." },
      { iconName: "lightning", title: "Instant Structuring", description: "Convert unstructured requirements into searchable criteria." },
      { iconName: "code", title: "Technical Precision", description: "Accurate extraction of tolerances, materials, and standards." },
    ],
    "Multi-Factor Matching": [
      { iconName: "scale", title: "Comprehensive Scoring", description: "Evaluate suppliers across 20+ criteria simultaneously." },
      { iconName: "filter", title: "Precise Filtering", description: "Only see suppliers that meet ALL your requirements." },
      { iconName: "chart-line", title: "Weighted Analysis", description: "Adjust importance of different criteria for your needs." },
    ],
    "Explainable AI": [
      { iconName: "eye", title: "Full Transparency", description: "See exactly why each supplier was recommended." },
      { iconName: "list", title: "Gap Analysis", description: "Understand which requirements aren't fully met." },
      { iconName: "check-circle", title: "Confident Decisions", description: "Make informed choices with clear justifications." },
    ],
    "Smart Deduplication": [
      { iconName: "users", title: "Unified Profiles", description: "Single view of suppliers across all name variations." },
      { iconName: "history", title: "Complete History", description: "Consolidated interaction data and contract terms." },
      { iconName: "link", title: "Relationship Mapping", description: "Understand subsidiary and ownership structures." },
    ],
    "Dynamic Results": [
      { iconName: "target", title: "Quality Over Quantity", description: "Only genuinely matching suppliers, no filler results." },
      { iconName: "clock", title: "Reduced Screening", description: "Pre-qualified lists ready for immediate evaluation." },
      { iconName: "award", title: "True Matches", description: "Every result meets your exact specifications." },
    ],
    "Real-Time Data Enrichment": [
      { iconName: "refresh", title: "Current Information", description: "Always up-to-date supplier capabilities and certifications." },
      { iconName: "certificate", title: "Verified Data", description: "Ground truth from actual site visits and audits." },
      { iconName: "shield", title: "Reduced Risk", description: "Confidence in supplier claims through verification." },
    ],
    "Alternative Term Discovery": [
      { iconName: "globe", title: "Global Coverage", description: "Find suppliers regardless of regional terminology." },
      { iconName: "language", title: "Multi-Language", description: "Automatic translation and term expansion." },
      { iconName: "search", title: "Complete Results", description: "No qualified suppliers missed due to naming differences." },
    ],
  };
  return benefitsMap[title] || [];
};

export const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
  if (!feature) return null;

  const heroImage = heroImageMap[feature.title];
  const secondaryImage = secondaryImageMap[feature.title];
  const services = getServicesForFeature(feature.title);
  const benefits = getBenefitsForFeature(feature.title);

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Navigation bar with back button */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to SearchPro+</span>
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-2">
                    <span className="text-sm font-semibold text-primary">{feature.number}</span>
                  </div>
                  <DialogTitle className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {feature.title}
                  </DialogTitle>
                  <DialogDescription className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                    {feature.detailedExplanation.overview}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-base text-gray-500 max-w-xl">
                  Streamline your supplier discovery process with intelligent {feature.title.toLowerCase()} technology that adapts to your needs.
                </p>

                <Button size="lg">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center animate-bounce">
                <ChevronDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </section>

          {/* Role-Specific Benefits Section */}
          <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text content */}
                <div className="space-y-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    How it helps your team
                  </h2>
                  
                  {/* For Engineers */}
                  <div className="border-l-4 border-gray-900 pl-6 py-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">Engineers</h4>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {feature.detailedExplanation.forEngineers}
                    </p>
                  </div>

                  {/* For Procurement */}
                  <div className="border-l-4 border-primary pl-6 py-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-2">Procurement</h4>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {feature.detailedExplanation.forBuyers}
                    </p>
                  </div>

                  {/* For Quality */}
                  <div className="border-l-4 border-accent pl-6 py-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-accent mb-2">Quality</h4>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {feature.detailedExplanation.forAuditors}
                    </p>
                  </div>
                </div>

                {/* Circular image with rings */}
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
                Capabilities included
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
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
                Key benefits
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, idx) => (
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

          {/* Example Section */}
          <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                Real-world application
              </h2>
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {feature.detailedExplanation.example}
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 lg:py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to experience {feature.title}?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Start using YVOO SearchPro+ today and transform your supplier discovery process.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
                Get Started
                <PixelIcon name="arrow-right" className="w-4 h-4" />
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;