import { motion } from "framer-motion";
import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import { Button } from "@/components/ui/button";
import LNGInspectionDemo from "@/components/LNGInspectionDemo";
import LNGAtlasDemo from "@/components/LNGAtlasDemo";
import ScrollPinnedZoom from "@/components/ScrollPinnedZoom";

import lngPlantHero from "@/assets/lng-plant-hero.jpg";
import lngWeldInspection from "@/assets/lng-weld-inspection.jpg";
import lngControlRoom from "@/assets/lng-control-room.jpg";
import lngRotatingEquipment from "@/assets/lng-rotating-equipment.jpg";
import lngStorageTanks from "@/assets/lng-storage-tanks.jpg";
import lngDimensionalControl from "@/assets/lng-dimensional-control.jpg";

const marqueeItems = [
  { label: "LNG Liquefaction", standard: "API 620" },
  { label: "Gas Processing", standard: "ASME B31.3" },
  { label: "Cryogenic Systems", standard: "EN 13445" },
  { label: "Pressure Vessels", standard: "ASME Sec VIII" },
  { label: "Rotating Equipment", standard: "API 617/618" },
  { label: "Storage Tanks", standard: "API 650" },
  { label: "Piping Systems", standard: "ASME B31.3" },
  { label: "Fire & Gas", standard: "IEC 61511" },
  { label: "Electrical", standard: "IECEx/ATEX" },
  { label: "Coatings", standard: "NACE/ISO 12944" },
];

const LNGInspection = () => {
  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="LNG & GPP Field Inspection — AI-Driven EPC Quality | YVOO"
        description="AI-powered field inspection platform for LNG plants and gas processing facilities. ASME, API, EN compliant. Reduce project overruns by 15-20% through intelligent quality management."
        canonical="/lng-inspection"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "YVOO LNG & GPP Field Inspection Platform",
            "description": "AI-driven inspection for large-scale LNG facilities and gas processing plants covering engineering, procurement, construction, and commissioning phases.",
            "provider": { "@type": "Organization", "name": "YVOO", "url": "https://www.yvoo.io" },
            "serviceType": "EPC Quality Inspection & Verification"
          }
        ]}
      />
      <PageGridOverlay />
      <div className="relative">
        <Navigation />

        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="relative min-h-[100dvh] flex flex-col bg-white">
          <HeroSquaresAnimation className="top-[100px] right-8 md:top-[91px] md:right-20 lg:top-[103px] lg:right-24" />

          <div className="flex-1 flex items-center relative z-10 pt-[106px] md:pt-[154px] lg:pt-[186px] min-h-0">
            <div className="px-8 w-full max-w-[1400px] mx-auto">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-sm md:text-base text-foreground/50 font-mono tracking-[0.25em] uppercase mb-4 md:mb-6"
                >
                  EPC Large-Scale Plants · LNG · GPP
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
                >
                  AI-driven field<br />
                  inspection for LNG<br />
                  mega-projects
                </motion.h1>

                {/* Value Props — aligned to 4th grid line */}
                <div className="mt-8 md:mt-12 lg:mt-16 ml-[50%] relative">
                  <span className="absolute -left-14 -top-6 font-mono text-[9px] tracking-[0.2em] text-foreground/[0.12] select-none" aria-hidden="true">
                    ASME · API
                  </span>

                  <div className="absolute -right-4 md:right-0 -top-8 text-foreground/[0.12]" aria-hidden="true">
                    <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                      <path d="M0 24 L6 24 L10 8 L14 24 L18 24" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="0.5" />
                      <text x="20" y="18" fill="currentColor" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">−196°C</text>
                    </svg>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-5 mb-6 md:mb-8"
                  >
                    <div className="relative">
                      <div className="absolute -left-5 top-0 bottom-0 flex flex-col items-center text-foreground/[0.12]" aria-hidden="true">
                        <div className="w-2.5 h-px bg-current" />
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                          <path d="M0 5 L3.5 0 L7 5" stroke="currentColor" strokeWidth="0.7" fill="none" />
                        </svg>
                        <div className="flex-1 w-px bg-current" />
                        <span className="font-mono text-[7px] tracking-[0.15em] select-none whitespace-nowrap py-0.5 -rotate-90 origin-center">
                          EPC
                        </span>
                        <div className="flex-1 w-px bg-current" />
                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                          <path d="M0 0 L3.5 5 L7 0" stroke="currentColor" strokeWidth="0.7" fill="none" />
                        </svg>
                        <div className="w-2.5 h-px bg-current" />
                      </div>

                      <div className="space-y-2">
                        {[
                          { bold: "Full EPC lifecycle coverage", rest: "engineering → procurement → construction → commissioning" },
                          { bold: "ASME, API, EN code compliance", rest: "pressure vessels, piping, rotating equipment, storage tanks" },
                          { bold: "Computer vision NDT analysis", rest: "RT film interpretation, UT scan validation, weld quality AI" },
                          { bold: "Risk-based inspection intensity", rest: "dynamic RBI engine calibrated to equipment criticality" },
                          { bold: "Multi-party delay attribution", rest: "evidence-based timeline, automated responsibility analysis" },
                          { bold: "Predictive schedule analytics", rest: "Monte Carlo simulation, $500K–$2M/day delay cost avoidance" },
                        ].map((item, i) => (
                          <p key={i} className="text-sm md:text-base text-foreground/60">
                            <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base whitespace-nowrap flex items-baseline mt-2">
                      <span>
                        <span className="font-semibold text-primary">Save $750M–$1B on a $5B plant</span> · <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-primary hover:text-primary/80">Book a Demo →</a>
                      </span>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button size="lg" className="w-full sm:w-auto text-lg" onClick={() => {
                      document.getElementById('lng-platform-demo')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      See Platform Demo →
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg" asChild>
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
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase font-bold text-foreground/80">
                  {item.label}
                  <span className="ml-1.5 font-normal text-foreground/40 normal-case tracking-normal text-[0.85em]">({item.standard})</span>
                  <span className="ml-6 md:ml-10 text-foreground/20">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* DIN annotation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
          <TechnicalAnnotation label="1400" from={4} to={6} />
        </div>

        {/* ═══════════════════════════════════════════════════
            SCROLL PINNED ZOOM — LNG Plant
        ═══════════════════════════════════════════════════ */}
        <ScrollPinnedZoom imageSrc={lngPlantHero} imageAlt="LNG liquefaction plant at dusk">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-[0.95] max-w-4xl">
            $5B+ mega-projects<br />demand mega-precision
          </h2>
          <p className="text-base md:text-xl text-white/70 mt-6 max-w-xl">
            Every weld, every vessel, every cryogenic system — verified by AI-enhanced field inspection across all EPC phases.
          </p>
        </ScrollPinnedZoom>

        {/* Section cut marker */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="A" from={0} to={6} />
        </div>

        {/* ═══════════════════════════════════════════════════
            CAPABILITIES — 6 Pillars
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">Inspection capabilities</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                Six pillars of<br />intelligent inspection
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
              {[
                { img: lngWeldInspection, title: "Welding & NDT", desc: "AI-powered RT film interpretation, UT scan validation, weld map generation. ASME Section VIII & B31.3 compliance verified automatically.", codes: "ASME IX · AWS D1.1 · API 1104" },
                { img: lngDimensionalControl, title: "Dimensional Control", desc: "3D laser scanning vs. design model. Equipment setting verification, flange alignment, piping isometric validation to ±3mm tolerance.", codes: "ISO 10360 · ASME Y14.5" },
                { img: lngRotatingEquipment, title: "Rotating Equipment", desc: "Vibration signature analysis, laser alignment verification, oil cleanliness per ISO 4406, seal system inspection per API Plans.", codes: "API 617/618 · ISO 10816" },
                { img: lngStorageTanks, title: "Static Equipment", desc: "Pressure vessel inspection, storage tank integrity, corrosion monitoring, coating/insulation verification for cryogenic systems.", codes: "API 620/650 · ASME Sec VIII" },
                { img: lngControlRoom, title: "E&I & Commissioning", desc: "Loop checks, interlock testing, cause-and-effect validation, functional safety verification for SIS systems per IEC 61511.", codes: "IEC 61511 · IECEx · ATEX" },
                { img: lngPlantHero, title: "HSE & Compliance", desc: "HAZOP follow-up, fire & gas system verification, environmental compliance monitoring, permit tracking across jurisdictions.", codes: "NFPA 59A · ISO 45001 · API RP 750" },
              ].map((cap, i) => (
                <motion.div key={cap.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white p-0 group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={cap.img} alt={cap.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-foreground mb-2">{cap.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-3">{cap.desc}</p>
                    <span className="text-[10px] font-mono text-foreground/30 tracking-wider">{cap.codes}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dimension line */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <DimensionLine from="$2M" to="$500K" unit="/day" gridFrom={0} gridTo={4} />
        </div>

        {/* ═══════════════════════════════════════════════════
            INTERACTIVE DEMO
        ═══════════════════════════════════════════════════ */}
        <LNGInspectionDemo />

        {/* Section cut marker */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <SectionCutMarker section="B" from={1} to={5} />
        </div>

        {/* ═══════════════════════════════════════════════════
            ATLAS AI — NCR INVESTIGATION DEMO
        ═══════════════════════════════════════════════════ */}
        <section id="lng-atlas-demo" data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">Atlas AI · Inspector Autopilot</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                AI guides your inspector<br />through every hold point
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
                Watch Atlas AI execute a complete ITP for a Deethanizer Condenser — dimensional checks, weld inspection, NDT, coating, hydrostatic test. From first measurement to claim recovery.
              </p>
            </motion.div>

            {/* Demo */}
            <div className="aspect-[16/10] w-full">
              <LNGAtlasDemo />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CAPITAL HEMORRHAGE — THE LEAK
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="dark" className="py-24 md:py-32 bg-foreground text-background">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-background" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-background/50">The Leak</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-background">
                Capital hemorrhage<br />stops here
              </h2>
              <p className="text-base md:text-lg text-background/40 mt-6 max-w-xl">
                Every EPC project bleeds money through three invisible pipes. YVOO plugs all three.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-px">
              {[
                {
                  title: "Uncontested Supplier Claims",
                  subtitle: "Paying for errors we cannot disprove",
                  problem: "Without evidence-based inspection data, fabricator defects become your cost. No documentation = no recovery.",
                  solution: "AI generates qualified claim letters with root cause analysis, cost quantification, and legal basis — in minutes.",
                  stat: "€76K–€118K",
                  statLabel: "recovered per NCR",
                  color: "bg-[#AE3D3D]",
                },
                {
                  title: "Uncollected Penalties",
                  subtitle: "Inability to attribute delays",
                  problem: "Multi-party EPC projects make delay attribution nearly impossible manually. Contractors dispute responsibility.",
                  solution: "AI reconstructs evidence-based timelines with automated responsibility attribution across all parties.",
                  stat: "$500K–$2M",
                  statLabel: "per day delay cost protected",
                  color: "bg-[#F5A623]",
                },
                {
                  title: "Late Detection Costs",
                  subtitle: "The 10× multiplier rule",
                  problem: "Defects found during commissioning cost 10× more than during fabrication. Late detection = exponential cost.",
                  solution: "Computer vision + predictive analytics catch defects during manufacturing, before they reach site.",
                  stat: "95%+",
                  statLabel: "defect detection at source",
                  color: "bg-[#6EA996]",
                },
              ].map((leak, i) => (
                <motion.div key={leak.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 border border-background/10">
                  <div className={`w-3 h-3 ${leak.color} mb-6`} />
                  <h3 className="text-xl font-bold text-background mb-1">{leak.title}</h3>
                  <p className="text-sm text-background/40 mb-6 italic">{leak.subtitle}</p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-[10px] font-bold text-[#AE3D3D] uppercase tracking-wider">Problem</span>
                      <p className="text-sm text-background/50 mt-1">{leak.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#6EA996] uppercase tracking-wider">YVOO Solution</span>
                      <p className="text-sm text-background/50 mt-1">{leak.solution}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-background/10">
                    <div className="text-3xl font-bold text-accent">{leak.stat}</div>
                    <div className="text-xs text-background/40 mt-1">{leak.statLabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TARGET CLIENTS
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">Who benefits</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                Built for the world's<br />largest EPC projects
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
              {[
                {
                  title: "Owners & Operators",
                  companies: "Shell · TotalEnergies · Saudi Aramco · Qatargas · Cheniere",
                  benefits: [
                    "Remote oversight with limited site presence",
                    "Evidence-based delay attribution for claims",
                    "Real-time project health dashboards",
                    "Predictive schedule risk analysis",
                  ],
                },
                {
                  title: "EPC Contractors",
                  companies: "TechnipFMC · Saipem · Chiyoda · Samsung Engineering · Linde",
                  benefits: [
                    "Reduce NCR rates by 40% with AI prevention",
                    "Automated CAPA generation and tracking",
                    "Multi-discipline coordination intelligence",
                    "Contract position protection with evidence",
                  ],
                },
                {
                  title: "Third-Party Inspectors",
                  companies: "ABS · Bureau Veritas · DNV · Lloyd's Register · TÜV",
                  benefits: [
                    "50% faster inspection with AI assistance",
                    "Computer vision pre-screening of welds",
                    "Standardized reporting across projects",
                    "Digital evidence with blockchain integrity",
                  ],
                },
              ].map((client, i) => (
                <motion.div key={client.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 md:p-12">
                  <h3 className="text-xl font-bold text-foreground mb-2">{client.title}</h3>
                  <p className="text-xs text-foreground/40 font-mono mb-6">{client.companies}</p>
                  <div className="space-y-3">
                    {client.benefits.map((b, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-accent mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/70">{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tolerance notation */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <ToleranceNotation nominal="15" tolerance="5" unit="%" label="Overrun Prevented" gridColumn={4} />
        </div>

        {/* ═══════════════════════════════════════════════════
            ROI / VALUE PROPOSITION
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="dark" className="py-24 md:py-32 bg-foreground text-background">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-background" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-background/50">Value proposition</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-background">
                The numbers speak<br />for themselves
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
              {[
                { value: "15–20%", label: "Project overrun reduction" },
                { value: "$750M", label: "Saved on a $5B LNG plant" },
                { value: "50%", label: "Faster inspection cycles" },
                { value: "95%+", label: "Defect detection accuracy" },
              ].map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 border border-background/10">
                  <div className="text-3xl md:text-5xl font-bold text-accent mb-3">{stat.value}</div>
                  <div className="text-sm text-background/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-col sm:flex-row gap-4 items-start">
              <Button size="lg" className="text-lg" asChild>
                <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer">
                  Schedule a Demo →
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg border-background/30 text-background hover:bg-background/10">
                Download Whitepaper →
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LNGInspection;
