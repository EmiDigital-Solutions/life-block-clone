import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * 3-step onboarding — investor-deck p.13.
 * Replaces the dense final-CTA block.
 *
 * Tone refined for senior Quality / Procurement readership:
 * — headline respects buyer expertise (no "change the way you audit")
 * — trust strip uses procurement-grade signals (residency, eIDAS, NDA)
 * — three role-targeted CTAs (Procurement · QE · Director)
 */
const steps = [
  {
    n: "01",
    title: "Demo",
    body: "30 minutes with the AKCP team. We map your corridor opportunity and show ScanPro+ on a live bilateral example.",
  },
  {
    n: "02",
    title: "Member QuickScan pilot",
    body: "We dispatch one vetted engineer, auditor or inspector to a real partner site. You see the report, the data and the expert workflow before rollout.",
  },
  {
    n: "03",
    title: "Corridor rollout and partner development",
    body: "Scale across Austrian and Kazakh opportunities. Feed findings into CAPA, supplier development and member decision workflows.",
  },
];

export default function OnboardingStepsSection() {
  return (
    <section data-nav-theme="light" className="py-16 md:py-24 bg-background" id="cta">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — 12-col split (Auditors vocabulary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">Get started</span>
            </div>
            <h2 className="section-headline text-foreground">
              Same AKCP standard.
              <br />
              Three-day report.
              <br />
              Local expert dispatch
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end">
            <p className="text-lg text-muted-foreground">
              Three steps. Member-first. You see a real corridor verification result before scaling.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Step {s.n}
                </span>
                {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-primary" />}
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-[-0.01em] mb-4">
                {s.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Final action CTAs removed — presentation, not website */}
        <div className="border-t border-foreground pt-10 md:pt-12">
          {/* Procurement-grade trust strip */}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">
            AKCP member access · NDA before dispatch · Conflict-of-interest declared per assignment ·
            GPS/time-stamped evidence · Reports signed by vetted experts
          </p>
        </div>
      </div>
    </section>
  );
}
