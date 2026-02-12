import { motion } from "framer-motion";
import { ArrowRight, X, Check, Brain } from "lucide-react";
import checklistMockup from "@/assets/atlas-checklist-mockup.jpg";
import guidanceMockup from "@/assets/atlas-ai-guidance-mockup.jpg";
import evidenceMockup from "@/assets/atlas-evidence-mockup.jpg";
import intelligenceMockup from "@/assets/atlas-intelligence-mockup.jpg";

const featureBlocks = [
  {
    title: "AI-powered audit checklist",
    description: "Standards auto-loaded with real-time progress tracking. Atlas knows your IATF 16949, ISO 9001, or any framework — and guides auditors through each clause with priority indicators and completion status.",
    bullets: [
      "Auto-loaded standards frameworks",
      "Live progress tracking at 45%+ completion",
      "Priority flags for high-risk clauses",
    ],
    image: checklistMockup,
    alt: "Atlas AI audit checklist interface showing IATF 16949 standard with progress tracking",
  },
  {
    title: "Real-time AI guidance",
    description: "Atlas analyzes 47+ similar audits to deliver contextual findings, risk correlations, and client-specific intelligence — while the auditor is still on-site.",
    bullets: [
      "Voice-guided hands-free auditing",
      "Pattern detection from similar audits",
      "Client-specific priority alerts (BMW, Siemens)",
    ],
    image: guidanceMockup,
    alt: "Atlas AI Copilot panel showing real-time AI findings and risk correlations",
  },
  {
    title: "Smart evidence capture",
    description: "Photo recognition and text extraction with automatic linking to standard requirements. Evidence is verified, catalogued, and tagged to findings instantly.",
    bullets: [
      "Auto-tagging photos to requirements",
      "OCR text extraction from documents",
      "Instant evidence verification",
    ],
    image: evidenceMockup,
    alt: "Atlas AI evidence capture interface with photo thumbnails and auto-tagging",
  },
  {
    title: "Intelligence insights dashboard",
    description: "Real-time risk scoring, pattern detection, and maturity-level assessment. Atlas surfaces correlations between findings and predicts audit outcomes before the report is written.",
    bullets: [
      "78% calibration correlation detected",
      "Live findings summary (Major/Minor NC)",
      "Predictive outcome: Approved with conditions",
    ],
    image: intelligenceMockup,
    alt: "Atlas AI intelligence insights dashboard with risk scoring and findings summary",
  },
];

const traditionalItems = [
  { label: "Manual checklist management", detail: "Paper-based or basic digital forms" },
  { label: "No real-time guidance", detail: "Auditors rely on experience alone" },
  { label: "Post-audit evidence linking", detail: "Hours spent organizing photos & docs" },
  { label: "Generic audit frameworks", detail: "One-size-fits-all approach" },
  { label: "Delayed reporting", detail: "Days to compile findings" },
];

const atlasItems = [
  { label: "AI-driven checklist with progress", detail: "Standards auto-loaded, progress tracked live" },
  { label: "Real-time AI guidance", detail: "Context from 47+ similar audits" },
  { label: "Instant evidence linking", detail: "Photos auto-tagged to requirements" },
  { label: "Client-specific intelligence", detail: "BMW, Siemens priorities surfaced" },
  { label: "Live reporting dashboard", detail: "Findings generated during audit" },
];

const AtlasAISection = () => {
  return (
    <section className="w-full bg-background">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-[120px]">
        {/* Hero */}
        <div className="text-center mb-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            Atlas AI
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold text-foreground tracking-[-0.03em] leading-[0.95] mb-6 max-w-3xl mx-auto">
            Meet Atlas, the AI Copilot for smarter auditing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Voice-guided auditing with real-time AI intelligence. Every auditor performs like your best auditor.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Request a Demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Feature Sections - Archlet style alternating */}
        <div className="space-y-24 md:space-y-32 mb-24">
          {featureBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col gap-10 md:gap-16 items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text */}
              <div className="flex-1 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-4">
                  {block.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {block.description}
                </p>
                <ul className="space-y-3">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      <span className="text-foreground/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <img
                  src={block.image}
                  alt={block.alt}
                  className="w-full h-auto border border-border"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Traditional vs Atlas AI Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-[-0.02em] mb-3">
              Why auditors choose Atlas
            </h3>
            <p className="text-muted-foreground">
              Traditional methods vs. AI-powered auditing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
            {/* Traditional */}
            <div className="border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-destructive/10">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">Traditional Providers</h4>
                  <p className="text-xs text-muted-foreground">Manual, slow, inconsistent</p>
                </div>
              </div>
              <div className="space-y-4">
                {traditionalItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">€15,000+</span>
                  <span className="text-xs text-muted-foreground">per audit</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">3+ weeks turnaround</div>
              </div>
            </div>

            {/* Atlas AI */}
            <div className="border-2 border-primary p-8 relative">
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider">
                Recommended
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-foreground">With Atlas AI</h4>
                  <p className="text-xs text-muted-foreground">AI-powered, fast, consistent</p>
                </div>
              </div>
              <div className="space-y-4">
                {atlasItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">€700</span>
                  <span className="text-xs text-muted-foreground">per audit</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">3 days turnaround</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AtlasAISection;
