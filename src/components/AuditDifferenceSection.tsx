import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import auditorTimelineHero from "@/assets/auditor-timeline-hero.png";

const timeline = [
  {
    day: "Day 1",
    title: "Your audit is scoped by intelligence, not guesswork",
    oldWay: "Call agencies. Wait for quotes. Hope the auditor understands your industry. No context, no preparation — just a generic checklist.",
    newWay: "Atlas AI builds a tailored audit framework from your supplier's profile, industry risks, and applicable standards. Your auditor arrives with deep context — knowing exactly what to verify, what to challenge, and where risks hide.",
    highlight: "AI-prepared, industry-specific scope",
  },
  {
    day: "Day 2",
    title: "Auditor + Atlas AI: precision on the shop floor",
    oldWay: "One person with a clipboard and subjective judgment. Photos lost on a phone. Findings written from memory hours later. No standardization, no traceability.",
    newWay: "Your auditor works hand-in-hand with Atlas AI — equipment is auto-recognized, evidence photos are linked to findings in real time, maturity scores are benchmarked against industry data. Every observation is structured, traceable, and verified on the spot. Human expertise amplified by machine precision.",
    highlight: "Expert judgment + AI verification, together",
  },
  {
    day: "Day 3",
    title: "Verified intelligence, not a PDF. Plus CAPA tracking built in.",
    oldWay: "Wait 6–10 weeks for a subjective PDF. No risk scores, no benchmarks, no corrective action plan. Import manually into your QMS. Then start guessing what to do next.",
    newWay: "Within 24 hours: a complete audit intelligence package — risk-scored findings, photo-verified evidence, supplier maturity benchmarks, and a structured CAPA plan with assigned actions, deadlines, and automatic follow-up tracking. Your team sees verified data, makes confident decisions, and tracks corrective actions to closure — all in one place.",
    highlight: "From audit to action — in 24 hours",
  },
];

// Parallax Image Component
const QualityParallaxImage = ({ isInView }: { isInView: boolean }) => {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="hidden lg:block sticky top-32"
    >
      <div className="relative">
        <motion.div className="relative overflow-hidden" style={{ y, scale }}>
          <img
            src={auditorTimelineHero}
            alt="Quality assurance professional with AI technology"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20"
          style={{ y: decorY1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10"
          style={{ y: decorY2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const AuditDifferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-primary" />
            <span className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              The Difference
            </span>
          </div>
          <h2 className="section-headline text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight max-w-4xl">
            Auditors with Clipboard vs.<br />
            <span className="font-medium">Auditors + YVOO Atlas AI</span>
          </h2>
        </motion.div>

        {/* Timeline with Image */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-20 items-start">
          {/* Timeline - Left Side */}
          <div className="relative">
            {/* Animated Vertical line */}
            <div className="absolute left-[28px] md:left-[44px] top-4 bottom-4 w-[2px] hidden sm:block overflow-hidden">
              <div className="absolute inset-0 bg-border/30" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/20 origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
              <motion.div
                className="absolute w-full h-8 bg-gradient-to-b from-white via-primary/60 to-transparent"
                initial={{ top: "-32px" }}
                animate={isInView ? { top: "100%" } : {}}
                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="space-y-16 md:space-y-20">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.25, duration: 0.7, ease: "easeOut" }}
                  className="flex gap-8 md:gap-12 group"
                >
                  {/* Day badge */}
                  <div className="flex-shrink-0 w-[56px] md:w-[88px] relative">
                    <motion.div
                      className="hidden sm:flex absolute left-0 top-0 w-[56px] md:w-[88px] h-[56px] md:h-[88px] rounded-lg border border-border bg-background items-center justify-center shadow-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.25, duration: 0.4, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.25, duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-lg"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.65 + index * 0.25, duration: 0.3 }}
                      />
                      <span className="text-sm md:text-base font-semibold text-foreground tracking-wide">
                        {item.day}
                      </span>
                    </motion.div>
                    <motion.span
                      className="sm:hidden text-lg font-semibold text-primary"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.25 }}
                    >
                      {item.day}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 md:pt-4">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.25, duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </motion.div>

                    {/* Old vs New */}
                    <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.25, duration: 0.5 }}
                      >
                        <motion.div
                          className="flex-shrink-0 w-6 h-6 rounded bg-muted flex items-center justify-center mt-0.5"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 0.65 + index * 0.25, type: "spring", stiffness: 300 }}
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.div>
                        <p className="text-muted-foreground text-base leading-relaxed">{item.oldWay}</p>
                      </motion.div>
                      <motion.div
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.7 + index * 0.25, duration: 0.5 }}
                      >
                        <motion.div
                          className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 flex items-center justify-center mt-0.5"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 0.75 + index * 0.25, type: "spring", stiffness: 300 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </motion.div>
                        <p className="text-foreground text-base leading-relaxed font-medium">{item.newWay}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image - Right Side with Parallax */}
          <QualityParallaxImage isInView={isInView} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <Button asChild size="lg">
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the difference live
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditDifferenceSection;
