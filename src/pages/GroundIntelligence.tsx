import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight, Check } from "lucide-react";
import PageGridOverlay from "@/components/PageGridOverlay";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import evidenceAssembly from "@/assets/evidence-assembly-station.jpg";
import evidenceCmm from "@/assets/evidence-cmm-measurement.jpg";
import evidenceCnc from "@/assets/evidence-cnc-machine.jpg";
import evidenceControlPlan from "@/assets/evidence-control-plan.jpg";
import evidenceInspector from "@/assets/evidence-inspector.jpg";
import evidenceCapacity from "@/assets/evidence-capacity-assessment.jpg";
import evidenceIncomingWarehouse from "@/assets/evidence-incoming-warehouse.jpg";
import evidenceHse from "@/assets/evidence-hse-inspection.jpg";
import cncMachine from "@/assets/cnc-machine-dmg-nlx.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";

const GroundIntelligence = () => {
  const [activeFaqCategory, setActiveFaqCategory] = useState("general");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFaqCategoryChange = (categoryId: string) => {
    setActiveFaqCategory(categoryId);
    setOpenFaqIndex(0);
  };

  const differentiators = [
    { desk: "Supplier self-assessment", ground: "Independent on-site verification" },
    { desk: "News-feed risk alerts", ground: "Expert evaluation of specific topics" },
    { desk: "Outdated database info", ground: "Fresh data from recent auditor visits" },
    { desk: "Generic compliance badges", ground: "Standardized scores with evidence photos" },
    { desk: "One-size-fits-all reports", ground: "Custom topic deep-dives on your request" },
  ];

  const faqCategories = [
    {
      id: "general",
      label: "General",
      faqs: [
        {
          question: "How is this different from Prewave or other data providers?",
          answer: "Unlike data-scraping platforms that monitor news feeds and public records, our intelligence is based on physical verification. We send expert auditors on-site to evaluate specific topics you define. The result is verified data — not assumptions based on web scraping."
        },
        {
          question: "What topics can I request for verification?",
          answer: "Anything that matters for your sourcing decision: capacity verification, process capability (Cpk), quality management systems, machine park evaluation, working conditions, environmental compliance, logistics capabilities, and more. You define the scope."
        },
        {
          question: "How quickly can an auditor visit a supplier?",
          answer: "Typically within 3–5 business days. We have 850+ qualified auditors in 47 countries, so there's almost always a local expert available near your supplier."
        },
      ],
    },
    {
      id: "methodology",
      label: "Methodology",
      faqs: [
        {
          question: "How are the standardized scores calculated?",
          answer: "Scores are based on a proprietary evaluation framework applied consistently by all auditors. Each topic has defined criteria, evidence requirements, and scoring rubrics. This ensures comparability across suppliers, industries, and geographies."
        },
        {
          question: "What evidence do I receive with each report?",
          answer: "Every report includes standardized scores, written assessments, geo-tagged evidence photos, and auditor commentary. For process capability topics, you receive actual measurement data and Cpk values."
        },
        {
          question: "Can I track supplier development over time?",
          answer: "Yes. Each audit adds to a supplier's historical profile. You can visualize trends per topic, compare improvement trajectories across suppliers, and identify patterns that predict future performance."
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      faqs: [
        {
          question: "How much does a verification visit cost?",
          answer: "A standard single-topic verification starts at €700. Multi-topic deep-dives and comprehensive audits are priced based on scope and location. All pricing is transparent — no hidden fees."
        },
        {
          question: "Is there a subscription model?",
          answer: "Yes. For organizations that need regular supplier monitoring, we offer subscription plans with scheduled verification visits, continuous benchmark updates, and predictive analytics. Contact us for a tailored plan."
        },
      ],
    },
  ];

  const activeFaqs = faqCategories.find((cat) => cat.id === activeFaqCategory)?.faqs || [];

  return (
    <div className="min-h-screen relative">
      <PageGridOverlay />
      <div className="relative">
        <Navigation />

        {/* ═══════════════════════════════════════════════════
            HERO — Homepage-style asymmetric layout
        ═══════════════════════════════════════════════════ */}
        <section
          data-nav-theme="light"
          className="relative min-h-[100dvh] flex flex-col bg-white"
        >
          <HeroSquaresAnimation className="top-[100px] right-8 md:top-[91px] md:right-20 lg:top-[103px] lg:right-24" />

          <div className="flex-1 flex items-center relative z-10 pt-[106px] md:pt-[154px] lg:pt-[186px] min-h-0">
            <div className="px-8 w-full max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-sm md:text-base text-foreground/50 font-mono tracking-[0.25em] uppercase mb-4 md:mb-6"
                >
                   Supplier Intelligence
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
                >
                   Data from the<br />
                   factory floor.
                </motion.h1>

                {/* Value Props — aligned to 4th grid line */}
                <div className="mt-8 md:mt-12 lg:mt-16 ml-[50%] relative">
                  <span className="absolute -left-14 -top-6 font-mono text-[9px] tracking-[0.2em] text-foreground/[0.12] select-none" aria-hidden="true">
                    DIN EN ISO
                  </span>

                  {/* Surface roughness symbol */}
                  <div className="absolute -right-4 md:right-0 -top-8 text-foreground/[0.12]" aria-hidden="true">
                    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                      <path d="M0 24 L6 24 L10 8 L14 24 L18 24" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="0.5" />
                      <text x="20" y="18" fill="currentColor" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">Ra 1.6</text>
                    </svg>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-5 mb-6 md:mb-8"
                  >
                    <div className="relative">
                      {/* Vertical DIN dimension line */}
                      <div className="absolute -left-5 top-0 bottom-0 flex flex-col items-center text-foreground/[0.12]" aria-hidden="true">
                        <div className="w-2.5 h-px bg-current" />
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                          <path d="M0 5 L3.5 0 L7 5" stroke="currentColor" strokeWidth="0.7" fill="none" />
                        </svg>
                        <div className="flex-1 w-px bg-current" />
                        <span className="font-mono text-[7px] tracking-[0.15em] select-none whitespace-nowrap py-0.5 -rotate-90 origin-center">
                          180
                        </span>
                        <div className="flex-1 w-px bg-current" />
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                          <path d="M0 0 L3.5 5 L7 0" stroke="currentColor" strokeWidth="0.7" fill="none" />
                        </svg>
                        <div className="w-2.5 h-px bg-current" />
                      </div>

                      <div className="space-y-2">
                        {[
                          { bold: "On-demand expert visits", rest: "any topic, anytime, anywhere" },
                          { bold: "Verified data, not scraped feeds", rest: "on-site evidence, photos, measurements" },
                          { bold: "Benchmark across suppliers", rest: "standardized scores from real audits" },
                          { bold: "Track performance over time", rest: "audit history, trends, early warnings" },
                          { bold: "Topic-specific deep-dives", rest: "capacity, process capability, quality systems" },
                          { bold: "850+ auditors, 47 countries", rest: "local experts, on-site within days" },
                        ].map((item, i) => (
                          <p key={i} className="text-sm md:text-base text-foreground/60">
                            <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base whitespace-nowrap flex items-baseline mt-2">
                      <span><span className="font-semibold text-primary">Starting at €700</span> per verification · <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-primary hover:text-primary/80">Book a Demo →</a></span>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button size="lg" className="w-full sm:w-auto text-lg" asChild>
                      <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer">
                        Request a Demo →
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Band */}
          <div className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].flatMap((_, rep) => [
                { label: "Verify", detail: "On-demand evaluation" },
                { label: "Benchmark", detail: "Standardized scores" },
                { label: "Predict", detail: "Trend analysis" },
                { label: "Evidence", detail: "Photos & measurements" },
                { label: "Compare", detail: "Side-by-side matrix" },
                { label: "Track", detail: "Supplier development" },
                { label: "Evaluate", detail: "Topic deep-dives" },
              ].map((item, i) => (
                <span
                  key={`${rep}-${i}`}
                  className="mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase font-bold text-foreground/80"
                >
                  {item.label}
                  <span className="ml-1.5 font-normal text-foreground/40 normal-case tracking-normal text-[0.85em]">({item.detail})</span>
                  <span className="ml-6 md:ml-10 text-foreground/20">·</span>
                </span>
              )))}
            </div>
          </div>
        </section>

        {/* DIN annotation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1200" from={4} to={6} />
        </div>

        {/* ═══════════════════════════════════════════════════
            COMPARISON — Desk Research vs. On-Site Reality
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-px bg-foreground/30" />
                  <span className="section-eyebrow">The difference</span>
                </div>
                <h2 className="section-headline text-foreground font-semibold">
                  Desk research vs.<br />on-site reality
                </h2>
              </motion.div>

              <div className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Data providers scrape the web. We send qualified experts to the factory floor.
                </p>
              </div>
            </div>

            <div className="bg-background border border-border overflow-hidden">
              <div className="grid grid-cols-2 border-b border-border">
                <div className="px-6 lg:px-8 py-4 bg-muted/50">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Typical data providers</span>
                </div>
                <div className="px-6 lg:px-8 py-4 bg-primary/5">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">YVOO Supplier Intelligence</span>
                </div>
              </div>
              {differentiators.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-2 border-b border-border last:border-0"
                >
                  <div className="px-6 lg:px-8 py-5 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm lg:text-base">{d.desk}</span>
                  </div>
                  <div className="px-6 lg:px-8 py-5 flex items-center gap-3 bg-primary/[0.03]">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-foreground text-sm lg:text-base font-medium">{d.ground}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section cut marker A—A */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        {/* ═══════════════════════════════════════════════════
            THREE PILLARS — Verify · Benchmark · Predict
        ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white pt-20 md:pt-28 lg:pt-32 pb-6 md:pb-8">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <h2 className="section-headline text-foreground max-w-4xl">
                The three dimensions of supplier intelligence.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-foreground/10">
              {[
                {
                  phase: "Verify",
                  title: "On-Demand Evaluation",
                  description: "Send qualified auditors to any supplier, anytime — to evaluate the specific topics you care about. No generic checklists. Real answers to your real questions",
                },
                {
                  phase: "Benchmark",
                  title: "Standardized Comparison",
                  description: "Compare suppliers objectively using standardized scores from real audit data. Not self-reported surveys — verified measurements from on-site visits",
                },
                {
                  phase: "Predict",
                  title: "Trend Analysis",
                  description: "Track how suppliers develop over time. Identify improvement trajectories or early warning signals based on historical audit results, not scraped news feeds",
                },
              ].map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="lg:col-span-2 border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0"
                >
                  <div className="group block h-full p-8 md:p-10">
                    <div className="relative">
                      <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50 mb-3 block">
                        {cap.phase}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dimension line */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="Desk" to="Ground" unit="" gridFrom={0} gridTo={4} />
        </div>

        {/* ═══════════════════════════════════════════════════
            ON-SITE CHECKPOINTS — What auditors actually verify
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-foreground/30" />
                <span className="section-eyebrow">What we verify on-site</span>
              </div>
              <h2 className="section-headline text-foreground max-w-4xl mb-4">
                Real checkpoints, not spreadsheet assumptions.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Every intelligence report is built from physical evidence — collected by certified auditors inside the supplier's facility.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {[
                { src: evidenceCnc, alt: "CNC machine capability verification", label: "Machine park evaluation", detail: "Capacity, age, maintenance logs" },
                { src: evidenceCmm, alt: "CMM coordinate measurement during audit", label: "Measurement systems", detail: "CMM, gauges, calibration records" },
                { src: evidenceAssembly, alt: "Assembly station process verification", label: "Process capability", detail: "Cpk values, SPC, process flow" },
                { src: evidenceCapacity, alt: "Real capacity assessment on factory floor", label: "Capacity assessment", detail: "Throughput, shift models, bottleneck analysis" },
                { src: evidenceIncomingWarehouse, alt: "Material stock inspection in warehouse", label: "Material stock inspection", detail: "Goods receipt checks, storage conditions, traceability" },
                { src: evidenceHse, alt: "HSE inspection on production site", label: "HSE inspection", detail: "Safety protocols, environmental compliance, PPE" },
                { src: cncMachine, alt: "Advanced CNC turning center evaluation", label: "Equipment intelligence", detail: "OEM specs, utilization rate, condition" },
                { src: auditorEuropean, alt: "Auditor on factory floor during evaluation", label: "Expert on-site", detail: "Certified auditor, geo-tagged evidence" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-square overflow-hidden group"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 md:p-4">
                    <span className="text-white text-xs md:text-sm font-semibold tracking-wide block">
                      {item.label}
                    </span>
                    <span className="text-white/60 text-[10px] md:text-xs mt-0.5 block">
                      {item.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            WHAT WE COMBINE — Evidence + Audit Data + Evaluation
        ═══════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mb-16"
            >
              <h2 className="section-headline text-foreground mb-6">
                Intelligence that comes from the factory floor
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine three data sources no other platform has: structured audit data, physical evidence from on-site visits, and expert evaluations on the topics you define.
              </p>
            </motion.div>

            {/* 2x2 KPI grid — shifted one grid right (homepage pattern) */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-20">
              <div className="hidden lg:block lg:col-span-1" />
              <div className="lg:col-span-5 grid md:grid-cols-2 gap-x-12">
                {[
                  { category: "Audit data", value: "97.8%", description: "Standardized scores, checklists, and compliance assessments from certified auditors" },
                  { category: "Physical evidence", value: "50+", description: "Geo-tagged photos, equipment measurements, process documentation per visit" },
                  { category: "Expert evaluation", value: "3 days", description: "On-demand topic-specific deep-dives by matched industry specialists" },
                  { category: "Trend intelligence", value: "18mo", description: "Historical performance tracking, supplier development trajectories, early warnings" },
                ].map((stat, index) => (
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

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-6 gap-0"
            >
              <div className="hidden lg:block lg:col-span-1" />
              <div className="lg:col-span-5 border-l-2 border-accent pl-8 md:pl-12">
                <p className="text-lg md:text-xl lg:text-2xl font-light text-foreground/80 leading-relaxed tracking-tight mb-6">
                  "The difference between data intelligence and supplier intelligence is simple: we don't scrape the internet — we send someone to the factory. Every score, every photo, every assessment comes from a qualified auditor who was physically on-site."
                </p>
                <p className="text-sm font-medium text-foreground/50 tracking-wide">
                  — YVOO Founders
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DIN annotation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="950" from={3} to={6} />
        </div>

        {/* Section cut marker B—B */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="B" from={1} to={5} />
        </div>

        {/* ═══════════════════════════════════════════════════
            HOW IT WORKS — Topic Verification Flow
        ═══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-foreground/30" />
                <span className="section-eyebrow">How it works</span>
              </div>
              <h2 className="section-headline text-foreground max-w-4xl">
                From question to verified answer in days.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-foreground/10">
              {[
                { step: "01", title: "Define your topic", description: "Tell us what you need verified — capacity, process capability, quality systems, working conditions. You set the scope." },
                { step: "02", title: "We match an expert", description: "AI matches a certified auditor with relevant industry experience, located near your supplier. Ready in days, not weeks." },
                { step: "03", title: "On-site evaluation", description: "The auditor visits the factory, collects evidence, runs standardized assessments, and documents everything with photos and measurements." },
                { step: "04", title: "Intelligence delivered", description: "You receive standardized scores, evidence photos, expert commentary, and benchmark data — all in a structured, comparable format." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b lg:border-b-0 lg:border-r border-foreground/10 last:border-r-0 p-8 md:p-10"
                >
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50 mb-3 block">
                    {item.step}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tolerance notation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Verification Accuracy" gridColumn={4} />
        </div>

        {/* ═══════════════════════════════════════════════════
            RESULTS — Stats
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="section-headline text-foreground">
                Verified results
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-foreground/10">
              {[
                { metric: "850+", label: "Expert auditors worldwide" },
                { metric: "47", label: "Countries covered" },
                { metric: "3 days", label: "Avg. time to on-site visit" },
                { metric: "€700", label: "Starting price per verification" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 p-8 md:p-10"
                >
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                    {item.metric}
                  </div>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dimension line */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="14" to="3" unit=" Tage" gridFrom={2} gridTo={6} />
        </div>

        {/* Section cut marker C—C */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="C" from={0} to={3} />
        </div>

        {/* ═══════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="section-headline text-foreground">
                Questions & answers
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFaqCategoryChange(category.id)}
                  className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    activeFaqCategory === category.id
                      ? "bg-foreground text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
              <div className="hidden lg:block lg:col-span-1" />
              <motion.div
                key={activeFaqCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-5"
              >
                {activeFaqs.map((faq, index) => (
                  <div key={index} className="border-t border-border">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                    >
                      <span className="text-lg md:text-xl text-foreground font-medium leading-snug">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 w-10 h-10 bg-muted flex items-center justify-center transition-colors duration-200 group-hover:bg-muted/80">
                        {openFaqIndex === index ? (
                          <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                        ) : (
                          <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                        )}
                      </div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaqIndex === index ? "auto" : 0,
                        opacity: openFaqIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6 pr-16">
                        {faq.answer}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="relative py-20 lg:py-28 bg-white border-t border-border">
          <div className="mx-auto max-w-[1400px] px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-foreground">
                Stop guessing. Start verifying.
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Verified supplier data from real on-site evaluations — not scraped feeds, not self-assessments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default GroundIntelligence;
