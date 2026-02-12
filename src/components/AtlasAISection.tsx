import { motion } from "framer-motion";
import { Mic, Brain, Camera, ArrowRight, X, Check } from "lucide-react";
import AtlasAIDemo from "./AtlasAIDemo";

const featureCards = [
  {
    icon: Mic,
    title: "Voice-Guided Auditing",
    description: "Hands-free voice input with real-time transcription. Auditors stay focused on the inspection while Atlas captures every detail.",
  },
  {
    icon: Brain,
    title: "AI Intelligence Engine",
    description: "Powered by 47+ similar audit patterns, Atlas delivers contextual guidance, risk correlations, and client-specific priorities in real time.",
  },
  {
    icon: Camera,
    title: "Smart Evidence Capture",
    description: "Photo recognition, text extraction, and automatic linking to standard requirements. Evidence is verified and catalogued instantly.",
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
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
            Atlas AI
          </span>
          <h2 className="text-4xl md:text-[56px] font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-6 max-w-3xl mx-auto">
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

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-muted p-8 border border-border"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 mb-5">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated Demo */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              See Atlas in action
            </h3>
            <p className="text-muted-foreground">
              Watch how Atlas guides an IATF 16949 audit in real time
            </p>
          </div>
          <div className="max-w-[1100px] mx-auto">
            <AtlasAIDemo />
          </div>
        </div>

        {/* Traditional vs Atlas AI Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
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
