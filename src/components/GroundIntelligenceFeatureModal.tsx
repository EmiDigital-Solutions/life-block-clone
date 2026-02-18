import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, Check, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface GroundIntelligenceFeature {
  number: string;
  title: string;
  description: string;
  detail: {
    overview: string;
    forProcurement: string;
    forQuality: string;
    forManagement: string;
    example: string;
  };
  capabilities: string[];
  stats: { category: string; stat: string; description: string }[];
}

export const groundIntelligenceFeatures: GroundIntelligenceFeature[] = [
  {
    number: "01",
    title: "On-Demand Supplier Audits",
    description: "Request an independent on-site evaluation of any supplier, anywhere in the world — within days, not months.",
    detail: {
      overview: "Traditional audits take weeks to organize, cost thousands in travel, and still rely on the same auditor who may lack local expertise. With on-demand audits, you define the scope, we match a local expert, and you get results in days.",
      forProcurement: "Qualify new suppliers before placing your first order. No more flying your team across the globe for a factory visit — get a professional, independent evaluation delivered to your desk.",
      forQuality: "Verify that quality systems, measurement equipment, and process controls are actually in place — not just documented. Every finding is backed by photographic evidence and standardized scoring.",
      forManagement: "Reduce supplier qualification timelines from months to days. Cut audit travel budgets by up to 80% while increasing coverage across your supply base.",
      example: "A German automotive tier-1 needed to qualify 12 new machining suppliers in China within 6 weeks. Instead of sending their own team, they requested on-demand audits through YVOO. All 12 suppliers were evaluated on-site by local experts, with full reports delivered in an average of 5 business days per supplier.",
    },
    capabilities: [
      "Custom audit scope definition",
      "Local expert matching within 48 hours",
      "Standardized scoring methodology",
      "Geo-tagged photographic evidence",
      "Structured report delivery in 3–5 days",
      "Multi-language audit communication",
    ],
    stats: [
      { category: "Speed", stat: "3–5", description: "business days from request to completed report" },
      { category: "Coverage", stat: "47", description: "countries with available local auditors" },
      { category: "Cost saving", stat: "80%", description: "less than traditional audit travel costs" },
    ],
  },
  {
    number: "02",
    title: "Topic-Specific Deep Dives",
    description: "Don't audit everything — focus on exactly what matters. Request evaluations on specific topics like capacity, HSE, or process capability.",
    detail: {
      overview: "Full audits are expensive and often cover topics you don't care about. Topic-specific deep dives let you focus evaluation resources on the areas that actually impact your supply chain decisions — whether that's capacity verification, HSE compliance, or process capability.",
      forProcurement: "Before awarding a new project, verify that the supplier actually has the capacity and equipment they claim. Get a focused assessment instead of a generic audit report.",
      forQuality: "Request deep dives into specific quality processes — incoming inspection, SPC implementation, calibration management — with evidence that goes beyond what a standard audit checklist covers.",
      forManagement: "Allocate audit budgets more efficiently. Instead of one expensive full audit, run three targeted evaluations on the topics that drive your risk profile.",
      example: "A medical device manufacturer needed to verify cleanroom classifications at a packaging supplier in Malaysia. A standard audit would have taken 3 weeks to organize. A topic-specific deep dive on cleanroom operations was completed in 4 days, with detailed photographic documentation of HEPA filters, pressure differentials, and gowning procedures.",
    },
    capabilities: [
      "20+ predefined evaluation topics",
      "Custom topic definition",
      "Focused evidence collection",
      "Benchmarking against industry standards",
      "Topic-specific scoring criteria",
      "Actionable improvement recommendations",
    ],
    stats: [
      { category: "Focus", stat: "20+", description: "predefined evaluation topics available" },
      { category: "Efficiency", stat: "60%", description: "lower cost than full-scope audits" },
      { category: "Depth", stat: "3×", description: "more detail on the topics that matter to you" },
    ],
  },
  {
    number: "03",
    title: "Photographic Evidence Collection",
    description: "Every evaluation includes geo-tagged, timestamped photos — proving what the auditor actually saw, not what the supplier told them.",
    detail: {
      overview: "Words in an audit report can be interpreted. Photos cannot. Every on-site evaluation includes comprehensive photographic documentation — equipment, processes, working conditions, certifications — all geo-tagged and timestamped to prove authenticity.",
      forProcurement: "See the actual factory floor before signing a contract. Photos of equipment, production lines, and finished products give you confidence that the supplier can deliver what they promise.",
      forQuality: "Review photographic evidence of measurement equipment, calibration stickers, process controls, and product quality — the same things you would check if you visited the factory yourself.",
      forManagement: "Build a visual library of your supply base. Compare factory conditions across suppliers, track improvements over time, and share evidence with stakeholders who can't travel to every site.",
      example: "An aerospace OEM discovered through evidence photos that a supplier's 'new CNC machining center' was actually a 15-year-old machine with a repainted exterior. The geo-tagged photos clearly showed the original serial plate and wear patterns. This saved the buyer from a potentially costly qualification mistake.",
    },
    capabilities: [
      "Geo-tagged GPS coordinates on every photo",
      "Timestamped to prove recency",
      "Categorized by evaluation topic",
      "Equipment serial number documentation",
      "Before/after comparison capability",
      "Secure cloud storage and sharing",
    ],
    stats: [
      { category: "Evidence", stat: "50+", description: "photos collected per standard evaluation" },
      { category: "Verification", stat: "100%", description: "of photos include GPS and timestamp data" },
      { category: "Trust", stat: "Zero", description: "reliance on supplier self-reported claims" },
    ],
  },
  {
    number: "04",
    title: "Standardized Supplier Scoring",
    description: "Every supplier is scored on the same methodology — making comparison objective, repeatable, and fair.",
    detail: {
      overview: "When every auditor uses their own template and every company has a different scoring system, comparing suppliers becomes impossible. Our standardized methodology ensures every evaluation produces comparable, objective scores — regardless of which auditor or which country.",
      forProcurement: "Compare suppliers side-by-side with confidence. The same criteria, the same scoring scale, the same evidence requirements — whether you're evaluating a factory in Germany or Vietnam.",
      forQuality: "Benchmark supplier capabilities against industry standards and your own requirements. Identify gaps objectively and track improvements with consistent metrics over time.",
      forManagement: "Make data-driven sourcing decisions based on verified, comparable scores. Present supplier evaluations to the board with confidence in the methodology behind the numbers.",
      example: "A chemical company needed to compare 8 potential suppliers across 4 countries for a new raw material. Using standardized scoring, they created an objective ranking that showed clear capability differences — something that was impossible with their previous mix of supplier questionnaires and sporadic site visits.",
    },
    capabilities: [
      "Industry-aligned scoring categories",
      "Weighted criteria customization",
      "Cross-supplier comparison dashboards",
      "Historical score tracking",
      "Gap analysis and improvement plans",
      "Exportable benchmark reports",
    ],
    stats: [
      { category: "Objectivity", stat: "100%", description: "standardized across all evaluations" },
      { category: "Comparability", stat: "1:1", description: "direct supplier-to-supplier benchmarking" },
      { category: "Decision speed", stat: "4×", description: "faster supplier selection with clear data" },
    ],
  },
  {
    number: "05",
    title: "Expert Auditor Matching",
    description: "AI matches your request with a certified local auditor who has relevant industry experience — no generalists, no travel delays.",
    detail: {
      overview: "The quality of an audit depends entirely on the auditor. Our AI matching engine considers industry experience, technical specialization, language skills, certifications, and proximity to find the best expert for your specific evaluation — within 48 hours.",
      forProcurement: "Stop worrying about whether the auditor understands your industry. Our matching ensures you get someone who knows the difference between a 5-axis CNC center and a 3-axis machine, or between ISO 13485 and ISO 9001.",
      forQuality: "Get evaluations from auditors who speak the technical language of your industry. An aerospace auditor evaluates aerospace suppliers. A pharma auditor evaluates pharma suppliers. No compromises.",
      forManagement: "Eliminate the logistics of finding, vetting, and scheduling auditors. Our network of 850+ experts across 47 countries means the right person is always nearby.",
      example: "A valve manufacturer needed an auditor who understood cryogenic testing procedures for LNG applications. Within 36 hours, we matched them with a certified auditor in South Korea who had 12 years of experience specifically in cryogenic valve manufacturing and testing.",
    },
    capabilities: [
      "AI-powered auditor-to-request matching",
      "Industry specialization filtering",
      "Certification and accreditation verification",
      "Language and cultural competence",
      "Geographic proximity optimization",
      "Auditor performance ratings and history",
    ],
    stats: [
      { category: "Network", stat: "850+", description: "certified auditors across 47 countries" },
      { category: "Matching", stat: "48h", description: "average time to match and confirm an expert" },
      { category: "Specialization", stat: "30+", description: "industry verticals covered by our network" },
    ],
  },
  {
    number: "06",
    title: "Trend Intelligence & Early Warnings",
    description: "Track supplier performance over time. Spot declining quality or growing risk before it impacts your production.",
    detail: {
      overview: "A single audit gives you a snapshot. Trend intelligence gives you the trajectory. By tracking supplier scores, evidence patterns, and evaluation results over time, you see whether a supplier is improving, stable, or declining — and you can act before problems reach your production line.",
      forProcurement: "Identify suppliers that are trending downward before they become a sourcing risk. Use historical performance data to negotiate better terms with improving suppliers.",
      forQuality: "Monitor quality system maturity over multiple evaluations. See whether corrective actions from previous audits are actually implemented and sustained.",
      forManagement: "Build a supplier risk dashboard based on verified trend data — not outdated questionnaires. Report to stakeholders with confidence in the direction of your supply base.",
      example: "A consumer electronics company tracked a key connector supplier over 18 months. Trend data showed a gradual decline in incoming inspection scores and increasing NCR rates. They initiated a supplier development program 6 months before the issue would have affected their production line — saving an estimated €1.2M in potential recalls.",
    },
    capabilities: [
      "Multi-period score comparison",
      "Automated trend detection algorithms",
      "Early warning notifications",
      "Corrective action tracking",
      "Supplier development roadmaps",
      "Portfolio-level risk dashboards",
    ],
    stats: [
      { category: "Foresight", stat: "6mo", description: "average early warning lead time before issues impact production" },
      { category: "Tracking", stat: "18mo", description: "of historical trend data per supplier" },
      { category: "Prevention", stat: "3×", description: "more issues caught proactively vs. reactively" },
    ],
  },
  {
    number: "07",
    title: "Supplier Comparison & Benchmarking",
    description: "Compare multiple suppliers side-by-side with verified, standardized data — not marketing claims.",
    detail: {
      overview: "Choosing between suppliers shouldn't rely on gut feeling or who has the better website. Our benchmarking tools let you compare verified evaluation data across your shortlisted suppliers — same criteria, same evidence standard, same scoring methodology.",
      forProcurement: "Present objective supplier comparisons to your sourcing committee. Every data point is backed by on-site evidence, not supplier-provided marketing materials.",
      forQuality: "Compare quality system maturity, equipment condition, process capability, and compliance status across potential and existing suppliers in a single view.",
      forManagement: "Make strategic sourcing decisions with confidence. Benchmarking data helps you identify best-in-class suppliers and set realistic improvement targets for underperformers.",
      example: "A precision machining buyer compared 5 shortlisted suppliers using standardized evaluation data. The benchmark clearly showed that the cheapest quote came from a supplier with significantly lower process capability scores — a risk that would have been invisible without verified on-site data.",
    },
    capabilities: [
      "Side-by-side comparison dashboards",
      "Category-level score breakdown",
      "Industry benchmark percentiles",
      "Strength and weakness mapping",
      "Risk-adjusted supplier ranking",
      "Exportable comparison reports for stakeholders",
    ],
    stats: [
      { category: "Clarity", stat: "100%", description: "data-driven supplier selection decisions" },
      { category: "Risk reduction", stat: "70%", description: "fewer quality issues with benchmarked suppliers" },
      { category: "Confidence", stat: "5×", description: "more stakeholder buy-in with verified comparisons" },
    ],
  },
  {
    number: "08",
    title: "Compliance & Certification Verification",
    description: "Verify that certifications are current, valid, and match the actual scope — not just a logo on a website.",
    detail: {
      overview: "A certification logo on a supplier's website means nothing. Certificates expire, scopes change, and some suppliers display certifications they don't actually hold. Our auditors physically verify certificates on-site — checking validity dates, accreditation bodies, and whether the scope matches what the supplier claims.",
      forProcurement: "Never get caught by an expired or misrepresented certification again. Verified certification data gives you confidence that your supplier actually meets the standards you require.",
      forQuality: "Go beyond certificate validity. Our auditors verify that the management system behind the certification is actually implemented — not just documented for the certification body.",
      forManagement: "Maintain an always-current view of certification status across your supply base. Automated alerts notify you when certificates are approaching expiry.",
      example: "An automotive buyer discovered through on-site verification that a supplier's IATF 16949 certificate had been suspended 3 months earlier — information that wasn't reflected on any public database or the supplier's own website. This prevented a potentially costly qualification of a non-compliant supplier.",
    },
    capabilities: [
      "On-site certificate validation",
      "Scope and accreditation body verification",
      "Expiry date tracking and alerts",
      "Management system implementation checks",
      "Regulatory compliance mapping",
      "Certificate authenticity documentation",
    ],
    stats: [
      { category: "Detection", stat: "23%", description: "of suppliers have certificate discrepancies" },
      { category: "Coverage", stat: "ISO+", description: "all major industry standards verified" },
      { category: "Alerting", stat: "90d", description: "advance warning before certificate expiry" },
    ],
  },
  {
    number: "09",
    title: "Custom Evaluation Frameworks",
    description: "Build your own evaluation criteria. Define what matters to your company and get results in your format.",
    detail: {
      overview: "Every company has unique requirements. Our platform lets you define custom evaluation frameworks that reflect your specific quality standards, risk criteria, and business priorities. Your auditors evaluate against your criteria — not a generic checklist.",
      forProcurement: "Align supplier evaluations with your company's specific requirements. Whether you need to verify sustainability practices, cybersecurity measures, or specialized manufacturing processes — your criteria, our execution.",
      forQuality: "Create evaluation templates that match your internal quality standards. Map results directly to your supplier development programs and corrective action workflows.",
      forManagement: "Ensure that every supplier evaluation across your organization uses consistent criteria. Standardize how your teams assess suppliers while maintaining flexibility for division-specific requirements.",
      example: "A pharmaceutical company created a custom evaluation framework covering 8 specific GMP requirements that were critical to their product. Standard audit templates didn't cover these topics in sufficient depth. With custom frameworks, every supplier evaluation now directly addresses their specific compliance needs.",
    },
    capabilities: [
      "Drag-and-drop framework builder",
      "Weighted scoring configuration",
      "Industry template library",
      "Custom evidence requirements",
      "Integration with internal quality systems",
      "Framework versioning and audit trails",
    ],
    stats: [
      { category: "Flexibility", stat: "∞", description: "unlimited custom criteria and categories" },
      { category: "Relevance", stat: "100%", description: "evaluation aligned to your specific needs" },
      { category: "Consistency", stat: "1", description: "unified framework across all evaluations" },
    ],
  },
];

interface GroundIntelligenceFeatureModalProps {
  feature: GroundIntelligenceFeature | null;
  onClose: () => void;
}

const GroundIntelligenceFeatureModal = ({ feature, onClose }: GroundIntelligenceFeatureModalProps) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Top Nav */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-foreground/20 text-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Supplier Intelligence
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
          {/* Hero */}
          <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end bg-foreground">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/95 to-foreground/80" />
            <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-16 pt-40">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-xs font-medium text-white uppercase tracking-wider mb-4"
              >
                Feature {feature.number}
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/60 font-bold text-xl tracking-wider mb-4"
              >
                Supplier Intelligence
              </motion.p>
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

          {/* Quote/Overview */}
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
                  "{feature.detail.overview}"
                </blockquote>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Role-Specific Benefits */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                      For Procurement
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forProcurement}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground text-xs font-medium uppercase tracking-wider">
                      For Quality Teams
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forQuality}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-accent/15 text-accent text-xs font-medium uppercase tracking-wider">
                      For Management
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forManagement}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Real-World Example
                    </span>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.detail.example}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-32 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-bold text-foreground tracking-[-0.02em] max-w-2xl mb-16"
              >
                Measurable Impact
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
                {feature.stats.map((result, idx) => (
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

          {/* Capabilities */}
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
                {feature.capabilities.map((cap, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white"
                  >
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{cap}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-6 bg-foreground">
            <div className="container mx-auto max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
              >
                See {feature.title} in action
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/70 text-lg mb-8 max-w-2xl mx-auto"
              >
                Request a demo and discover how verified supplier intelligence transforms your sourcing decisions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                  asChild
                >
                  <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer">
                    Request a Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroundIntelligenceFeatureModal;
