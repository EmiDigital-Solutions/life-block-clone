import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PixelIcon } from "@/components/PixelIcon";
import { X, ChevronDown, ArrowLeft } from "lucide-react";

// Import hero images (black and white, minimalistic)
import featureAiPreferenceHero from "@/assets/feature-ai-preference-hero.jpg";
import featureRequirementCaptureHero from "@/assets/feature-requirement-capture-hero.jpg";
import featureMultiFactorHero from "@/assets/feature-multi-factor-hero.jpg";
import featureExplainableAiHero from "@/assets/feature-explainable-ai-hero.jpg";
import featureDeduplicationHero from "@/assets/feature-deduplication-hero.jpg";
import featureDynamicResultsHero from "@/assets/feature-dynamic-results-hero.jpg";
import featureRealtimeHero from "@/assets/feature-realtime-hero.jpg";
import featureTermDiscoveryHero from "@/assets/feature-term-discovery-hero.jpg";

// Import secondary images (black and white, minimalistic)
import featureAiPreferenceSecondary from "@/assets/feature-ai-preference-secondary.jpg";
import featureRequirementCaptureSecondary from "@/assets/feature-requirement-capture-secondary.jpg";
import featureMultiFactorSecondary from "@/assets/feature-multi-factor-secondary.jpg";
import featureExplainableSecondary from "@/assets/feature-explainable-secondary.jpg";
import featureDeduplicationSecondary from "@/assets/feature-deduplication-secondary.jpg";
import featureDynamicSecondary from "@/assets/feature-dynamic-secondary.jpg";
import featureRealtimeSecondary from "@/assets/feature-realtime-secondary.jpg";
import featureTermDiscoverySecondary from "@/assets/feature-term-discovery-secondary.jpg";

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

// Hero images - black and white minimalistic
const heroImageMap: Record<string, { src: string; alt: string }> = {
  "AI Preference Engine": {
    src: featureAiPreferenceHero,
    alt: "Professional analyzing data analytics dashboard.",
  },
  "Intelligent Requirement Capture": {
    src: featureRequirementCaptureHero,
    alt: "Hands reviewing technical documentation and blueprints.",
  },
  "Multi-Factor Matching": {
    src: featureMultiFactorHero,
    alt: "Abstract geometric shapes representing connections and matching.",
  },
  "Explainable AI": {
    src: featureExplainableAiHero,
    alt: "Magnifying glass over data visualization for transparency.",
  },
  "Smart Deduplication": {
    src: featureDeduplicationHero,
    alt: "Merging streams representing data consolidation.",
  },
  "Dynamic Results": {
    src: featureDynamicResultsHero,
    alt: "Precision target representing focused search results.",
  },
  "Real-Time Data Enrichment": {
    src: featureRealtimeHero,
    alt: "Flowing data streams representing real-time updates.",
  },
  "Alternative Term Discovery": {
    src: featureTermDiscoveryHero,
    alt: "Globe representing global term discovery.",
  },
};

// Secondary images - black and white minimalistic for circular display
const secondaryImageMap: Record<string, { src: string; alt: string }> = {
  "AI Preference Engine": {
    src: featureAiPreferenceSecondary,
    alt: "Dashboard interface showing personalized analytics.",
  },
  "Intelligent Requirement Capture": {
    src: featureRequirementCaptureSecondary,
    alt: "Document scanner processing technical requirements.",
  },
  "Multi-Factor Matching": {
    src: featureMultiFactorSecondary,
    alt: "Precision balance scale representing multi-criteria evaluation.",
  },
  "Explainable AI": {
    src: featureExplainableSecondary,
    alt: "Glass prism representing transparency in AI decisions.",
  },
  "Smart Deduplication": {
    src: featureDeduplicationSecondary,
    alt: "Puzzle pieces representing entity consolidation.",
  },
  "Dynamic Results": {
    src: featureDynamicSecondary,
    alt: "Chess piece representing strategic focus.",
  },
  "Real-Time Data Enrichment": {
    src: featureRealtimeSecondary,
    alt: "Water ripples representing real-time data flow.",
  },
  "Alternative Term Discovery": {
    src: featureTermDiscoverySecondary,
    alt: "Compass representing discovery and navigation.",
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
          <section className="relative min-h-[70vh] lg:min-h-[80vh] bg-gradient-to-br from-[#f5f5f5] via-white to-[#f5f5f5]">
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
                    className="h-full w-full object-cover grayscale"
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
              <div className="lg:ml-[45%] lg:pl-16 space-y-6">
                <DialogHeader className="space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-2">
                    <span className="text-sm font-semibold text-gray-900">{feature.number}</span>
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

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center animate-bounce">
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
                  <div className="border-l-4 border-gray-400 pl-6 py-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">Quality</h4>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {feature.detailedExplanation.forAuditors}
                    </p>
                  </div>
                </div>

                {/* Circular image with rings */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Outer ring */}
                    <div className="absolute -inset-8 rounded-full border-[20px] border-gray-100" />
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
          <section className="py-16 lg:py-24 bg-gray-50">
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
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
                    className="text-center p-6 rounded-3xl bg-gray-50"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
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
          <section className="py-16 lg:py-24 bg-gray-50">
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
          <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Ready to experience {feature.title}?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Start using YVOO SearchPro+ today and transform your supplier discovery process.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl"
              >
                Get Started
                <PixelIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;