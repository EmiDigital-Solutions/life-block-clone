import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Plus, Minus, ArrowRight, Check, X } from "lucide-react";
import GroundIntelligenceFeatureModal, { groundIntelligenceFeatures, type GroundIntelligenceFeature } from "@/components/GroundIntelligenceFeatureModal";
import CheckpointModal, { checkpointData, type CheckpointData } from "@/components/CheckpointModal";
import { useInView } from "framer-motion";
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
  const [selectedFeature, setSelectedFeature] = useState<GroundIntelligenceFeature | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointData | null>(null);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.1 });

  // JSON-LD structured data for SEO
  useEffect(() => {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "YVOO Ground Intelligence — On-Site Supplier Verification",
      "description": "Independent on-site supplier evaluation covering machine park, measurement systems, process capability, capacity, material traceability, HSE compliance, and equipment intelligence. Conducted by 850+ certified industry-specialized auditors in 45+ countries.",
      "provider": {
        "@type": "Organization",
        "name": "YVOO",
        "url": "https://www.yvoo.io"
      },
      "serviceType": "Supplier Audit & Verification",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "On-Site Checkpoints",
        "itemListElement": checkpointData.map((cp, idx) => ({
          "@type": "Offer",
          "position": idx + 1,
          "itemOffered": {
            "@type": "Service",
            "name": cp.modal.headline,
            "description": cp.modal.overview
          }
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": checkpointData.map(cp => ({
        "@type": "Question",
        "name": `What does ${cp.modal.headline} verify at a supplier?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${cp.modal.overview} ${cp.modal.whyItMatters}`
        }
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ground-intelligence-jsonld";
    script.textContent = JSON.stringify([serviceSchema, faqSchema]);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("ground-intelligence-jsonld");
      if (el) el.remove();
    };
  }, []);

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
                   See what's really happening<br />
                   at your supplier.
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
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="section-eyebrow">The difference</span>
              </div>
              <h2 className="section-headline text-foreground">
                Desk research vs.<br />on-site reality
              </h2>
            </motion.div>

            {/* Old vs New Comparison */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Old Way - Desk Research */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-[#ebebeb] p-10 md:p-14 hover:bg-[#e3e3e3] transition-colors duration-300"
              >
                <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-10">
                  Typical data providers
                </p>
                <div className="space-y-6">
                  {differentiators.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 text-destructive" />
                      </div>
                      <span className="text-foreground/60 text-base md:text-lg leading-relaxed">{d.desk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* New Way - YVOO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-[#0a0a0a] p-10 md:p-14"
              >
                <p className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase mb-10">
                  YVOO Supplier Intelligence
                </p>
                <div className="space-y-6">
                  {differentiators.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-white text-base md:text-lg leading-relaxed">{d.ground}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
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
        <section className="py-16 md:py-24 bg-muted">
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
              {(() => {
                const images = [evidenceCnc, evidenceCmm, evidenceAssembly, evidenceCapacity, evidenceIncomingWarehouse, evidenceHse, cncMachine, auditorEuropean];
                return checkpointData.map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedCheckpoint(item)}
                    className="relative aspect-square overflow-hidden group cursor-pointer text-left"
                  >
                    <img
                      src={images[i]}
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
                  </motion.button>
                ));
              })()}
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
                What you get — and what changes
              </h2>
              <p className="text-lg text-muted-foreground">
                Stop relying on supplier self-assessments and desktop research. Get verified, on-site intelligence that directly impacts your decisions.
              </p>
            </motion.div>

            {/* 2x2 KPI grid — shifted one grid right (homepage pattern) */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-20">
              <div className="hidden lg:block lg:col-span-1" />
              <div className="lg:col-span-5 grid md:grid-cols-2 gap-x-12">
                {[
                  { category: "Supplier qualification", value: "60%", suffix: "faster", description: "Qualify new suppliers in days instead of weeks — with verified data, not guesswork" },
                  { category: "Risk reduction", value: "3×", suffix: "earlier", description: "Spot quality issues, capacity gaps, and compliance risks before they become costly problems" },
                  { category: "Audit cost", value: "€40k", suffix: "saved/yr", description: "Replace expensive one-off audit trips with on-demand local experts at a fraction of the cost" },
                  { category: "Decision confidence", value: "100%", suffix: "verified", description: "Every score, photo, and assessment comes from a certified auditor who was physically on-site" },
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
                      <div className="flex items-baseline gap-3 mb-4">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.02em]">
                          {stat.value}
                        </p>
                        <span className="text-lg md:text-xl text-accent font-medium">
                          {stat.suffix}
                        </span>
                      </div>
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
        <section ref={howItWorksRef} className="py-24 lg:py-32 bg-white overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-8">
            
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-20 md:mb-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="lg:col-span-3"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-foreground" />
                  <span className="section-eyebrow">How it works</span>
                </div>
                <h2 className="section-headline text-foreground">
                  From question to<br />verified answer
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Define your topic, we handle the rest — verified intelligence delivered in days, not weeks.
                </p>
              </motion.div>
            </div>

            {/* Steps - Horizontal Accordion */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-border" />
              
              <div className="flex flex-col md:flex-row">
                {[
                  { number: "01", title: "Define", subtitle: "Set your topic", description: "Tell us what you need verified — capacity, process capability, quality systems, working conditions. You define the scope." },
                  { number: "02", title: "Match", subtitle: "Local expert assigned", description: "AI matches a certified auditor with relevant industry experience, located near your supplier. Ready in days, not weeks." },
                  { number: "03", title: "Evaluate", subtitle: "On-site verification", description: "The auditor visits the factory, collects evidence, runs standardized assessments, and documents everything with photos and measurements." },
                  { number: "04", title: "Deliver", subtitle: "Intelligence report", description: "You receive standardized scores, evidence photos, expert commentary, and benchmark data — all in a structured, comparable format." },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={howItWorksInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredStepIndex(index)}
                    onMouseLeave={() => setHoveredStepIndex(null)}
                    className={`group relative border-b md:border-b-0 md:border-r border-border last:border-r-0 cursor-pointer transition-all duration-500 ease-out ${
                      hoveredStepIndex === index 
                        ? 'md:flex-[2.5]' 
                        : hoveredStepIndex !== null 
                          ? 'md:flex-[0.8]' 
                          : 'md:flex-1'
                    }`}
                  >
                    <div className="py-10 md:py-16 px-6 md:px-8 h-full flex flex-col">
                      {/* Number */}
                      <div className="flex items-start justify-between mb-auto">
                        <span className={`text-6xl md:text-7xl font-extralight transition-all duration-300 ${
                          hoveredStepIndex === index ? 'text-foreground' : 'text-foreground/40'
                        }`}>
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="mt-12 md:mt-20">
                        <span className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                          hoveredStepIndex === index ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}>
                          {step.subtitle}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-2 mb-4">
                          {step.title}
                        </h3>
                        
                        {/* Description - Only visible on hover */}
                        <motion.p
                          initial={false}
                          animate={{ 
                            opacity: hoveredStepIndex === index ? 1 : 0,
                            height: hoveredStepIndex === index ? 'auto' : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-lg text-muted-foreground leading-relaxed overflow-hidden"
                        >
                          {step.description}
                        </motion.p>
                      </div>
                      
                      {/* Hover indicator line */}
                      <div className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-500 ${
                        hoveredStepIndex === index ? 'w-full' : 'w-0'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Tolerance notation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Verification Accuracy" gridColumn={4} />
        </div>


        {/* ═══════════════════════════════════════════════════
            FEATURES — Clickable grid with modals
        ═══════════════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-white border-t border-foreground/10">
          <div className="mx-auto max-w-[1400px] px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 mb-16"
            >
              <h2 className="section-headline text-foreground">
                Supplier Intelligence features
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Every feature is designed to give you verified, actionable supplier data — from on-demand audits to trend tracking and custom evaluation frameworks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
            >
              {groundIntelligenceFeatures.map((feature, index) => (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => setSelectedFeature(feature)}
                  className="text-left py-8 pr-8 border-t border-foreground/10 group hover:bg-muted/30 transition-colors cursor-pointer pl-4"
                >
                  <span className="text-xs font-mono text-foreground/40 tracking-wider mb-2 block">
                    {feature.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

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
        <section data-nav-theme="light" className="relative py-20 lg:py-28 bg-muted">
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

      {/* Feature Modal */}
      <GroundIntelligenceFeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
      <CheckpointModal
        checkpoint={selectedCheckpoint}
        onClose={() => setSelectedCheckpoint(null)}
      />
    </div>
  );
};

export default GroundIntelligence;
