import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import GroundIntelligenceFeatureModal, { groundIntelligenceFeatures, type GroundIntelligenceFeature } from "@/components/GroundIntelligenceFeatureModal";
import AtlasAISection from "@/components/AtlasAISection";
import CheckpointModal, { checkpointData, type CheckpointData } from "@/components/CheckpointModal";
import PageSEO from "@/components/PageSEO";
import { useInView } from "framer-motion";
import PageGridOverlay from "@/components/PageGridOverlay";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import Navigation from "@/components/Navigation";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import checkpointMachinePark from "@/assets/checkpoint-machine-park.jpg";
import checkpointMeasurement from "@/assets/checkpoint-measurement-systems.jpg";
import checkpointProcess from "@/assets/checkpoint-process-capability.jpg";
import checkpointCapacity from "@/assets/checkpoint-capacity-assessment.jpg";
import checkpointMaterial from "@/assets/checkpoint-material-stock.jpg";
import checkpointHse from "@/assets/checkpoint-hse-inspection.jpg";
import checkpointEquipment from "@/assets/checkpoint-equipment-intelligence.jpg";
import checkpointExpert from "@/assets/checkpoint-expert-onsite.jpg";

const GroundIntelligence = () => {
  const [selectedFeature, setSelectedFeature] = useState<GroundIntelligenceFeature | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointData | null>(null);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="Ground Intelligence — EPC Construction Integrity Verification | RCA"
        description="On-site fabrication integrity verification for LNG & Gas Processing Plants. Weld inspection, NDE compliance, dimensional control, pressure testing — assessed by certified inspectors per ASME, API, and EN codes."
        canonical="/ground-intelligence"
      />
      <PageGridOverlay />
      <div className="relative">
        <Navigation />

        {/* ═══════════════════════════════════════════════════
            HERO
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
                   Construction Integrity Verification
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
                >
                   Verify what's really<br />
                   being fabricated.
                </motion.h1>

                {/* Value Props — aligned to 4th grid line */}
                <div className="mt-8 md:mt-12 lg:mt-16 ml-[50%] relative">
                  <span className="absolute -left-14 -top-6 font-mono text-[9px] tracking-[0.2em] text-foreground/[0.12] select-none" aria-hidden="true">
                    ASME B31.3
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
                          { bold: "On-site weld inspection", rest: "RT, UT, MT, PT per ASME V & API 577" },
                          { bold: "Dimensional verification", rest: "laser tracker, CMM vs. engineering drawings" },
                          { bold: "Pressure & leak testing witness", rest: "hydrostatic, pneumatic, helium leak per ASME PCC-2" },
                          { bold: "Material traceability audit", rest: "MTR verification, EN 10204 3.2 compliance" },
                          { bold: "ITP hold-point enforcement", rest: "witness mandatory stages, sign-off or reject" },
                          { bold: "Protected evidence chain", rest: "timestamped, GPS-tagged, digitally signed" },
                        ].map((item, i) => (
                          <p key={i} className="text-sm md:text-base text-foreground/60">
                            <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Band */}
          <div className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].flatMap((_, rep) => [
                { label: "Weld NDE", detail: "RT / UT / MT / PT" },
                { label: "Dimensional", detail: "Laser tracker & CMM" },
                { label: "Pressure Test", detail: "Hydrostatic witness" },
                { label: "Material", detail: "MTR & PMI verification" },
                { label: "ITP Hold Points", detail: "Mandatory witness" },
                { label: "Coating", detail: "DFT & adhesion testing" },
                { label: "Cryogenic", detail: "LN₂ test field audit" },
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

        {/* Section cut marker A—A */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        {/* ═══════════════════════════════════════════════════
            THREE PILLARS — Inspect · Verify · Enforce
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
                Three dimensions of construction integrity.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-foreground/10">
              {[
                {
                  phase: "Inspect",
                  title: "On-Site Fabrication Control",
                  description: "Deploy certified inspectors to fabrication shops worldwide to witness critical manufacturing stages — weld procedures, NDE execution, pressure testing, and dimensional verification per ASME, API, and EN codes",
                },
                {
                  phase: "Verify",
                  title: "Code Compliance Verification",
                  description: "Validate that every weld map, MTR, NDE report, and test certificate matches engineering specifications and applicable construction codes. Compare as-built vs. as-designed with measurable evidence",
                },
                {
                  phase: "Enforce",
                  title: "ITP & Claims Enforcement",
                  description: "Enforce Inspection & Test Plan hold points with mandatory witness sign-off. Protected evidence chain supports FIDIC-based claims, liquidated damages, and variation management",
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
          <DimensionLine from="Desktop" to="On-Site" unit="" gridFrom={0} gridTo={4} />
        </div>

        {/* ═══════════════════════════════════════════════════
            ON-SITE CHECKPOINTS
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
                Every intelligence report is built from physical evidence — collected by certified inspectors inside the fabrication facility.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {(() => {
                const images = [checkpointMachinePark, checkpointMeasurement, checkpointProcess, checkpointCapacity, checkpointMaterial, checkpointHse, checkpointEquipment, checkpointExpert];
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
            ATLAS AI — Inspection Autopilot
        ═══════════════════════════════════════════════════ */}
        <AtlasAISection />

        {/* ═══════════════════════════════════════════════════
            WHAT YOU GET — KPIs & Quote
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
                Stop relying on supplier MDR submissions and desktop document reviews. Get verified, on-site construction intelligence.
              </p>
            </motion.div>

            {/* 2x2 KPI grid */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-20">
              <div className="hidden lg:block lg:col-span-1" />
              <div className="lg:col-span-5 grid md:grid-cols-2 gap-x-12">
                {[
                  { category: "Defect detection", value: "3×", suffix: "earlier", description: "Catch weld defects, dimensional deviations, and material non-conformances at fabrication — not at site delivery" },
                  { category: "ITP compliance", value: "100%", suffix: "witnessed", description: "Every hold point and witness point verified by certified inspector with protected evidence chain" },
                  { category: "Claims enforcement", value: "72h", suffix: "evidence", description: "FIDIC-ready evidence packages with timestamped photos, measurements, and digital signatures within 72 hours" },
                  { category: "Code compliance", value: "ASME", suffix: "API · EN", description: "Full traceability against applicable construction codes — ASME B31.3, API 6D, EN 13480, PED 2014/68/EU" },
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
                  "The difference between document review and construction intelligence is simple: we don't review MDR packages remotely — we send a certified inspector to the fabrication shop. Every measurement, every NDE result, every test witness comes from someone who was physically present."
                </p>
                <p className="text-sm font-medium text-foreground/50 tracking-wide">
                  — RCA Engineering Team
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
            HOW IT WORKS — Inspection Flow
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
                  From ITP to<br />verified evidence
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Define the ITP, we deploy the inspector — verified construction intelligence delivered within the fabrication cycle.
                </p>
              </motion.div>
            </div>

            {/* Steps - Horizontal Accordion */}
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-border" />
              
              <div className="flex flex-col md:flex-row">
                {[
                  { number: "01", title: "Define", subtitle: "Set ITP scope", description: "Upload engineering specifications, P&IDs, and ITP. Define hold points, witness points, and review points per applicable construction codes." },
                  { number: "02", title: "Deploy", subtitle: "Inspector assigned", description: "Atlas AI matches a certified inspector with relevant code qualifications (ASME, API, CSWIP, FROSIO) located near the fabrication shop." },
                  { number: "03", title: "Inspect", subtitle: "On-site verification", description: "The inspector witnesses critical fabrication stages — weld procedures, NDE execution, pressure testing, dimensional checks — collecting timestamped evidence." },
                  { number: "04", title: "Report", subtitle: "Evidence package", description: "Protected evidence chain with measurements, NDE results, test certificates, and inspector sign-off. Ready for FIDIC claims or project close-out documentation." },
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
                      <div className="flex items-start justify-between mb-auto">
                        <span className={`text-6xl md:text-7xl font-extralight transition-all duration-300 ${
                          hoveredStepIndex === index ? 'text-foreground' : 'text-foreground/40'
                        }`}>
                          {step.number}
                        </span>
                      </div>
                      
                      <div className="mt-12 md:mt-20">
                        <span className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                          hoveredStepIndex === index ? 'text-foreground' : 'text-muted-foreground/60'
                        }`}>
                          {step.subtitle}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-2 mb-4">
                          {step.title}
                        </h3>
                        
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
          <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Inspection Accuracy" gridColumn={4} />
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
                Construction intelligence features
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Every feature is designed to give you verified, code-compliant construction data — from weld inspection to ITP enforcement and FIDIC claims support.
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
