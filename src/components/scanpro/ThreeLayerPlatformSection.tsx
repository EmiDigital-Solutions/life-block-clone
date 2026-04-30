import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * "How a ScanPro+ audit runs" — distinct vocabulary:
 * 12-col split header + stacked editorial rows (number · title · lead · body)
 * with thin rule separators. Different from BrokenCompromise's 3-column grid.
 */
const phases = [
  {
    n: "01",
    title: "Prepare",
      subtitle: "Atlas prepares the corridor scope",
    description:
      "AKCP member requirements, sector standards and the partner profile are loaded into one scope. Atlas generates the question set, photo plan and on-site checklist before dispatch.",
  },
  {
    n: "02",
      title: "Dispatch",
      subtitle: "Engineer, auditor or inspector on site",
    description:
      "A vetted local expert performs the visit using the Atlas tablet workflow. Every question, photo, measurement and finding is captured in real time and signed by the assigned expert.",
  },
  {
    n: "03",
    title: "Close out",
      subtitle: "Member-ready report and tracked CAPA",
    description:
      "A signed AKCP-format report is delivered within 3 days. Findings become a corrective action or partner-development plan with owners, due dates and supporting evidence.",
  },
];

export default function ThreeLayerPlatformSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-muted overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — 12-col split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">How an AKCP ScanPro+ mission runs</span>
            </div>
            <h2 className="section-headline text-foreground">
              One request. Three phases.
              <br />
              AI-structured, human-signed
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground">
              From member request to expert dispatch, signed evidence and tracked corrective actions — without sending your full team across the corridor.
            </p>
          </motion.div>
        </div>

        {/* Stacked editorial rows */}
        <div className="border-t border-foreground/15">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.n}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-10 md:py-14 border-b border-foreground/15"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                  Phase {phase.n}
                </span>
                <span className="text-7xl md:text-8xl font-extralight text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-500 leading-none tabular-nums">
                  {phase.n}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4 flex flex-col justify-end">
                <h3 className="text-3xl md:text-5xl font-light text-foreground tracking-[-0.02em] leading-[1.05]">
                  {phase.title}
                </h3>
              </div>

              {/* Subtitle lead */}
              <div className="lg:col-span-3 flex flex-col justify-end">
                <p className="text-base md:text-lg font-medium text-foreground/80 leading-snug">
                  {phase.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="lg:col-span-3 flex flex-col justify-end">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
