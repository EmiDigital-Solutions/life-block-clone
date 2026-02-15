import { motion } from "framer-motion";
import { Search, ShieldCheck, Cpu, Zap } from "lucide-react";

const stats = [
  { category: "Move faster", value: "72%", description: "Faster audit lead times compared to traditional methods" },
  { category: "Save costs", value: "60%", description: "Lower audit costs with local auditors" },
  { category: "Global reach", value: "400K+", description: "Auditor marketplace (AI-powered)" },
  { category: "Get results", value: "24h", description: "Digital reports delivered within hours" }
];

const agentSteps = [
  {
    icon: Search,
    label: "Search & Match",
    detail: "AI scans location, expertise, availability",
    status: "Complete",
    time: "0.8s",
  },
  {
    icon: ShieldCheck,
    label: "Verify & Onboard",
    detail: "Credentials checked, instant onboarding",
    status: "Complete",
    time: "1.2s",
  },
  {
    icon: Cpu,
    label: "Connect Atlas AI",
    detail: "Guided audit execution framework",
    status: "Complete",
    time: "0.3s",
  },
  {
    icon: Zap,
    label: "Audit Starts",
    detail: "On-site within 48 hours",
    status: "Ready",
    time: "48h",
  },
];

const WhyYVOOSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Headline + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="section-headline text-foreground mb-6">
            How you audit shapes how suppliers see you
          </h2>
          <p className="text-lg text-muted-foreground">
            85% of auditors still show up with a clipboard and fly across the world. YVOO uses Atlas AI and connects you with local certified auditors.
          </p>
        </motion.div>

        {/* KPI Grid 2x2 — shifted one grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-20">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-5 grid md:grid-cols-2 gap-x-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="pb-12"
              >
                <p className="text-sm text-foreground/50 font-medium tracking-wide mb-2">
                  {stat.category}
                </p>
                <div className="border-t border-foreground/20 pt-4">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="text-foreground/60 leading-relaxed text-sm">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Auditor Agent — Product Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-6 gap-0"
        >
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-5">
            {/* Dashboard Container */}
            <div className="bg-foreground text-background">
              {/* Dashboard Header */}
              <div className="px-6 md:px-10 pt-8 pb-6 border-b border-background/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-accent animate-pulse" />
                      <p className="text-xs font-medium tracking-widest uppercase text-background/50">
                        AI Auditor Agent — Live
                      </p>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-background tracking-tight">
                      How we access 400,000+ auditors
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl md:text-4xl font-bold text-primary tracking-tight">400K+</p>
                    <p className="text-xs text-background/40 mt-1">Verified network</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="px-6 md:px-10 py-8">
                <p className="text-sm text-background/60 leading-relaxed max-w-xl mb-8">
                  Our AI Auditor Agent continuously searches global databases — LinkedIn, ISO registries, certification bodies — and maintains a verified network of 400,000+ certified auditors.
                </p>

                {/* Agent Pipeline Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                  {agentSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="border border-background/10 px-5 py-6 relative group"
                    >
                      {/* Step Number */}
                      <p className="text-[10px] font-mono text-background/30 mb-4">
                        {String(i + 1).padStart(2, "0")}
                      </p>

                      {/* Icon */}
                      <step.icon className="w-5 h-5 text-primary mb-4" strokeWidth={1.5} />

                      {/* Label */}
                      <p className="text-sm font-medium text-background mb-1">
                        {step.label}
                      </p>
                      <p className="text-xs text-background/40 leading-relaxed mb-4">
                        {step.detail}
                      </p>

                      {/* Status */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono tracking-wide ${
                          step.status === "Complete" ? "text-accent" : "text-primary"
                        }`}>
                          {step.status}
                        </span>
                        <span className="text-[10px] font-mono text-background/30">
                          {step.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-sm font-medium text-background/80">
                    Zero employment overhead. Infinite scale.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    See how AI matching works
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyYVOOSection;
