import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, Check, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Import images - Hero images (people/team focus)
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import aiCopilotAnalysis from "@/assets/ai-copilot-analysis.jpg";
import smartMatchSuppliers from "@/assets/smart-match-suppliers.jpg";
import supplierSearchInterface from "@/assets/supplier-search-interface.jpg";
import riskScoringAi from "@/assets/risk-scoring-ai.jpg";
import liveTrackingDashboard from "@/assets/live-tracking-dashboard.jpg";
import auditorFactoryTeam from "@/assets/auditor-factory-team.jpg";
import supplierNetworking from "@/assets/supplier-networking.jpg";

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

// Generate stats/results for feature
const getStatsForFeature = (title: string) => {
  const statsMap: Record<string, { category: string; stat: string; description: string }[]> = {
    "AI Preference Engine": [
      { category: "Time saved", stat: "70%", description: "reduction in manual filter configuration" },
      { category: "Accuracy", stat: "95%", description: "match rate for preferred certifications" },
      { category: "Efficiency", stat: "3x", description: "faster qualified supplier identification" },
    ],
    "Intelligent Requirement Capture": [
      { category: "Processing", stat: "90%", description: "automated spec extraction accuracy" },
      { category: "Time saved", stat: "4hrs", description: "saved per RFQ preparation" },
      { category: "Coverage", stat: "50+", description: "document formats supported" },
    ],
    "Multi-Factor Matching": [
      { category: "Criteria", stat: "20+", description: "simultaneous evaluation factors" },
      { category: "Precision", stat: "98%", description: "requirement matching accuracy" },
      { category: "Speed", stat: "10x", description: "faster than manual screening" },
    ],
    "Explainable AI": [
      { category: "Transparency", stat: "100%", description: "of recommendations explained" },
      { category: "Confidence", stat: "85%", description: "increase in decision confidence" },
      { category: "Audit", stat: "Full", description: "decision trail documentation" },
    ],
    "Smart Deduplication": [
      { category: "Accuracy", stat: "99%", description: "entity resolution precision" },
      { category: "Reduction", stat: "40%", description: "fewer duplicate supplier records" },
      { category: "Consolidation", stat: "5x", description: "faster data merging" },
    ],
    "Dynamic Results": [
      { category: "Quality", stat: "Zero", description: "filler results in searches" },
      { category: "Precision", stat: "100%", description: "requirement match guarantee" },
      { category: "Screening", stat: "80%", description: "less qualification effort" },
    ],
    "Real-Time Data Enrichment": [
      { category: "Freshness", stat: "24hr", description: "maximum data staleness" },
      { category: "Verification", stat: "85%", description: "profiles with verified data" },
      { category: "Updates", stat: "Daily", description: "certification status checks" },
    ],
    "Alternative Term Discovery": [
      { category: "Coverage", stat: "300%", description: "more suppliers discovered" },
      { category: "Languages", stat: "40+", description: "regional terms supported" },
      { category: "Synonyms", stat: "1000+", description: "manufacturing term mappings" },
    ],
  };
  return statsMap[title] || [];
};

export const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
  if (!feature) return null;

  const heroImage = heroImageMap[feature.title];
  const services = getServicesForFeature(feature.title);
  const stats = getStatsForFeature(feature.title);

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Secondary Navigation - CustomerStory Style */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-foreground/20 text-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SearchPro+
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto pt-14">
          {/* Hero Section - Full-screen image with dark overlay */}
          <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end">
            {/* Background Image */}
            <div className="absolute inset-0">
              {heroImage && (
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-16 pt-40">
              {/* Feature Number Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-xs font-medium text-white uppercase tracking-wider mb-4">
                  Feature {feature.number}
                </span>
              </motion.div>

              {/* Category */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/60 font-bold text-xl tracking-wider mb-4"
              >
                SearchPro+ AI
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.1] max-w-4xl"
              >
                {feature.title}
              </motion.h1>
            </div>
          </section>

          {/* Quote/Overview Section */}
          <section className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed mb-8">
                  "{feature.detailedExplanation.overview}"
                </blockquote>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Role-Specific Benefits - Challenge/Solution Style */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Engineers & Procurement */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Engineers */}
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground text-xs font-medium uppercase tracking-wider">
                      For Engineers
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detailedExplanation.forEngineers}
                    </p>
                  </div>

                  {/* Procurement */}
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                      For Procurement
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detailedExplanation.forBuyers}
                    </p>
                  </div>
                </motion.div>

                {/* Quality/Auditors */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Quality */}
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-secondary/15 text-secondary text-xs font-medium uppercase tracking-wider">
                      For Quality Teams
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detailedExplanation.forAuditors}
                    </p>
                  </div>

                  {/* Example */}
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Real-World Example
                    </span>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.detailedExplanation.example}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Results Section - BeFound Stats Style */}
          <section className="py-32 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
              {/* Section headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-bold text-foreground tracking-[-0.02em] max-w-2xl mb-16"
              >
                Measurable Impact
              </motion.h2>
              
              {/* Stats Grid - 3 columns matching BeFound style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
                {stats.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="pb-12"
                  >
                    <p className="text-sm text-foreground/50 font-mono tracking-wide uppercase mb-2">
                      {result.category}
                    </p>
                    <div className="border-t border-foreground/20 pt-4">
                      <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                        {result.stat}
                      </p>
                      <p className="text-foreground/60 text-sm">
                        {result.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Capabilities Section */}
          <section className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
              >
                Included Capabilities
              </motion.h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white"
                  >
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-primary">
            <div className="container mx-auto max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-[-0.02em]"
              >
                Ready to transform your supplier discovery?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
              >
                Experience {feature.title} with YVOO SearchPro+ and find qualified suppliers faster.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
