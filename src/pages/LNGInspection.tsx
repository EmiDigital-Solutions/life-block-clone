import { motion } from "framer-motion";
import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import { Button } from "@/components/ui/button";
import LNGInspectionDemo from "@/components/LNGInspectionDemo";
import LNGAtlasDemo from "@/components/LNGAtlasDemo";
import AtlasAuditInterface from "@/components/AtlasAuditInterface";
import LNGInspectionDashboard from "@/components/LNGInspectionDashboard";
import LNGSupplierClaimsDashboard from "@/components/LNGSupplierClaimsDashboard";
import LNGFullLifecycleDemo from "@/components/LNGFullLifecycleDemo";
import LNGSupplierPortal from "@/components/LNGSupplierPortal";
import LNGITLandscape from "@/components/LNGITLandscape";
import FragmentationTrapSection from "@/components/FragmentationTrapSection";
import ScrollPinnedZoom from "@/components/ScrollPinnedZoom";
import { useLanguage } from "@/contexts/LanguageContext";

import lngPlantHero from "@/assets/lng-plant-hero.jpg";
import lngWeldInspection from "@/assets/lng-weld-inspection.jpg";
import lngControlRoom from "@/assets/lng-control-room.jpg";
import lngRotatingEquipment from "@/assets/lng-rotating-equipment.jpg";
import lngStorageTanks from "@/assets/lng-storage-tanks.jpg";
import lngDimensionalControl from "@/assets/lng-dimensional-control.jpg";

const LNGInspection = () => {
  const { t } = useLanguage();
  const lng = t.lngInspectionPage;
  const capImages = [lngWeldInspection, lngDimensionalControl, lngRotatingEquipment, lngStorageTanks, lngControlRoom, lngPlantHero];

  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="LNG & GPP Field Inspection — AI-Driven EPC Quality | RCA"
        description="AI-powered field inspection platform for LNG plants and gas processing facilities. ASME, API, EN compliant. Reduce project overruns by 15-20% through intelligent quality management."
        canonical="/lng-inspection"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "RCA LNG & GPP Field Inspection Platform",
            "description": "AI-driven inspection for large-scale LNG facilities and gas processing plants covering engineering, procurement, construction, and commissioning phases.",
            "provider": { "@type": "Organization", "name": "RCA" },
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
                  {lng.heroEyebrow}
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
                >
                   {lng.heroHeadline1}<br />
                   {lng.heroHeadline2}<br />
                   {lng.heroHeadline3}
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
                        {lng.valueProps.map((item, i) => (
                          <p key={i} className="text-sm md:text-base text-foreground/60">
                            <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base whitespace-nowrap flex items-baseline mt-2">
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
                      {lng.seePlatformDemo}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Band */}
          <div className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...t.marquee, ...t.marquee].map((item, i) => (
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
            IMMUTABLE CHAIN OF EVIDENCE
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-[hsl(220,10%,96%)]">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-4xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/40">{lng.evidenceEyebrow}</span>
              </div>
              <h2 className="section-headline text-foreground">
                {lng.evidenceHeadline}
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-2xl leading-relaxed">
                {lng.evidenceSubtitle}
              </p>
            </motion.div>

            {/* Diagram */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative w-full">

              {/* Desktop layout */}
              <div className="hidden lg:flex items-stretch gap-0 relative min-h-[360px]">

                {/* Project Budget block */}
                <div className="w-[120px] flex-shrink-0 flex items-center justify-center bg-foreground/20 border border-foreground/10 self-center h-[200px]">
                  <span className="text-sm font-bold text-foreground/60 text-center leading-tight whitespace-pre-line">{lng.projectBudget}</span>
                </div>

                {/* Flow area */}
                <div className="flex-1 relative">
                  {/* Value arrow (top) — navy */}
                  <div className="absolute top-0 left-0 right-[30%] h-[80px]">
                    <svg className="w-full h-full" viewBox="0 0 800 80" preserveAspectRatio="none" fill="none">
                      <path d="M0,60 L0,20 C200,18 500,15 700,12 L700,0 L800,40 L700,80 L700,68 C500,65 200,62 0,60 Z" fill="hsl(220,50%,20%)" />
                    </svg>
                    <span className="absolute right-[calc(30%+16px)] top-1/2 -translate-y-1/2 text-[11px] font-bold text-white/80 tracking-wider uppercase">{lng.value}</span>
                  </div>

                  {/* Financial Leakage stream (bottom) — orange */}
                  <div className="absolute top-[70px] left-0 right-[10%] h-[110px]">
                    <svg className="w-full h-full" viewBox="0 0 900 110" preserveAspectRatio="none" fill="none">
                      <path d="M0,10 C200,10 300,10 900,30 L900,80 C300,100 200,100 0,100 Z" fill="hsl(24,90%,55%)" fillOpacity="0.85" />
                    </svg>
                    <span className="absolute left-[40%] top-1/2 -translate-y-1/2 text-sm font-bold text-white tracking-wide">{lng.financialLeakage}</span>
                  </div>

                  {/* Three rivers */}
                  <div className="absolute bottom-0 left-[15%] right-[25%] flex justify-between">
                    {lng.rivers.map((r, i) => (
                      <motion.div key={r.river} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                        className="text-center w-[30%]">
                        {/* Arrow down */}
                        <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 40 40" fill="none">
                          <path d="M20,0 L20,25 M10,18 L20,30 L30,18" stroke="hsl(24,90%,55%)" strokeWidth="3" fill="none" />
                        </svg>
                        <div className="text-xs font-bold text-foreground uppercase tracking-wider">{r.river}:</div>
                        <div className="text-xs font-bold text-foreground mt-0.5 whitespace-pre-line leading-tight">{r.title}</div>
                        <div className="text-[10px] text-foreground/40 mt-1">Loss: {r.loss}</div>
                        <div className="text-[10px] text-foreground/40">{r.cause}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>


              </div>

              {/* Mobile layout */}
              <div className="lg:hidden space-y-8">
                {/* Project Budget + arrows */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-foreground/20 border border-foreground/10">
                    <span className="text-xs font-bold text-foreground/60 text-center leading-tight whitespace-pre-line">{lng.projectBudget}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-8 bg-[hsl(220,50%,20%)] flex items-center justify-end pr-3 rounded-r">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{lng.value} →</span>
                    </div>
                    <div className="h-8 bg-[hsl(24,90%,55%)]/85 flex items-center justify-center rounded-r">
                      <span className="text-[10px] font-bold text-white">{lng.financialLeakage} →</span>
                    </div>
                  </div>
                </div>

                {/* Three rivers */}
                <div className="grid grid-cols-3 gap-3">
                  {lng.riversMobile.map((r) => (
                    <div key={r.river} className="text-center">
                      <svg className="w-6 h-6 mx-auto mb-1" viewBox="0 0 24 24" fill="none">
                        <path d="M12,2 L12,16 M6,12 L12,20 L18,12" stroke="hsl(24,90%,55%)" strokeWidth="2" />
                      </svg>
                      <div className="text-[10px] font-bold text-foreground">{r.river}</div>
                      <div className="text-[10px] text-foreground/60 mt-0.5 leading-tight">{r.title}</div>
                      <div className="text-[9px] text-foreground/30 mt-1">{r.loss}</div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FRAGMENTATION TRAP — CURRENT PAIN
        ═══════════════════════════════════════════════════ */}
        <FragmentationTrapSection />

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
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.capabilitiesEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.capabilitiesHeadline1}<br />{lng.capabilitiesHeadline2}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
              {lng.capabilities.map((cap, i) => (
                <motion.div key={cap.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white p-0 group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={capImages[i]} alt={cap.title}
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
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.atlasEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.atlasHeadline1}<br />{lng.atlasHeadline2}
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
                {lng.atlasSubtitle}
              </p>
            </motion.div>

            {/* Demo */}
            <div className="aspect-[16/10] w-full">
              <LNGAtlasDemo />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            ATLAS AUDIT INTERFACE — LIVE DEMO
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="dark" className="py-24 md:py-32 bg-[hsl(210,20%,8%)]">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-white/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/40">Live Platform Preview</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-white">
                Atlas AI Audit<br />Interface
              </h2>
              <p className="text-base md:text-lg text-white/40 mt-6 max-w-xl">
                AI-guided scoring, real-time evidence verification, and copilot intelligence — all in one screen.
              </p>
            </motion.div>

            <AtlasAuditInterface />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            INSPECTION DASHBOARD — ALL CASES
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.dashboardEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.dashboardHeadline1}<br />{lng.dashboardHeadline2}
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
                {lng.dashboardSubtitle}
              </p>
            </motion.div>

            <LNGInspectionDashboard />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FULL LIFECYCLE DEMO
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.lifecycleEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.lifecycleHeadline1}<br />{lng.lifecycleHeadline2}
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
                {lng.lifecycleSubtitle}
              </p>
            </motion.div>

            <LNGFullLifecycleDemo />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SUPPLIER & CONTRACTOR CLAIMS DASHBOARD
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-background">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground/20" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-muted-foreground">{lng.claimsEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.claimsHeadline1}<br />{lng.claimsHeadline2}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-xl">
                {lng.claimsSubtitle}
              </p>
            </motion.div>

            <LNGSupplierClaimsDashboard />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SUPPLIER PORTAL VIEW
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="light" className="py-24 md:py-32 bg-[hsl(220,10%,96%)]">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.portalEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.portalHeadline1}<br />{lng.portalHeadline2}
              </h2>
              <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-xl">
                {lng.portalSubtitle}
              </p>
            </motion.div>

            <LNGSupplierPortal />
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════
            IT LANDSCAPE ARCHITECTURE
        ═══════════════════════════════════════════════════ */}
        <section data-nav-theme="dark" className="py-24 md:py-32 bg-foreground">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-white/30" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/40">{lng.itEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-white">
                {lng.itHeadline}
              </h2>
              <p className="text-base md:text-lg text-white/40 mt-6 max-w-xl">
                {lng.itSubtitle}
              </p>
            </motion.div>

            <LNGITLandscape />
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
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/50">{lng.usersEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
                {lng.usersHeadline}
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-px bg-foreground/10">
              {lng.users.map((client, i) => (
                <motion.div key={client.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 md:p-12">
                  <h3 className="text-xl font-bold text-foreground mb-6">{client.title}</h3>
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
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-background/50">{lng.roiEyebrow}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-background">
                {lng.roiHeadline}
              </h2>
            </motion.div>

            <div className="grid grid-cols-3 gap-px">
              {lng.roiStats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 border border-background/10">
                  <div className="text-3xl md:text-5xl font-bold text-accent mb-3">{stat.value}</div>
                  <div className="text-sm text-background/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default LNGInspection;
