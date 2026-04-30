import PageSEO from "@/components/PageSEO";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import { useState } from "react";
import { motion } from "framer-motion";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import sustainabilityImage from "@/assets/about-sustainability.jpg";
import leadershipTeamImage from "@/assets/about-leadership-team.jpg";

import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";

const AboutUs = () => {
  const [selectedYear] = useState(2024);

  // Croatian audit & inspection workforce — lead auditors, NDT inspectors, welding specialists
  const heroImages = [
    { src: auditorFemaleEuropean, alt: 'Lead Auditor — VDA 6.3, Zagreb' },
    { src: auditorAsian, alt: 'NDT Level III Inspector — Slavonski Brod' },
    { src: auditorFemaleAfrican, alt: 'Welding Engineer EN ISO 3834-2 — Split' },
    { src: auditorFemaleMiddleEast, alt: 'Quality Engineer IATF 16949 — Sveta Nedelja' },
    { src: auditorFemaleLatin, alt: 'EN 1090-2 Coordinator — Osijek' },
    { src: auditorFemaleSouthAsian, alt: 'CMM Metrology Specialist — Rijeka' },
    { src: auditorMaleNorthAmerica, alt: 'Lead Auditor — Heavy Steel Fabrication' },
    { src: auditorAfrican, alt: 'HSE Inspector — Pula Shipyards' },
  ];

  const timelineData = [
    { year: 2023, title: "Founded in Zagreb", desc: "CEIP — the Croatian Enterprise Intelligence Platform — established as a government-backed export initiative in partnership with FINA, HGK (Croatian Chamber of Economy) and HBOR." },
    { year: 2024, title: "162,000+ Croatian companies onboarded", desc: "Full integration with the FINA 2024 enterprise register: 492 large, 2,157 medium, 17,228 small and 142,258 micro-enterprises across heavy steel, shipbuilding, energy, automotive and EV." },
    { year: 2025, title: "Atlas AI on-site verification launched", desc: "Standardised supplier audits to VDA 6.3, IATF 16949, EN 1090-2 and EN ISO 3834-2 — combining AI with a network of certified Croatian lead auditors and NDT Level III inspectors." },
    { year: 2026, title: "First international buyer programmes", desc: "Verified Croatian suppliers selected for tier-1 sourcing by BMW, Linde Engineering, Siemens Energy and Rimac Group — with €127M of new export contracts attributed to CEIP-verified profiles." },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <PageSEO
        title="About CEIP — Verifying 162,000+ Croatian Suppliers for Global Buyers"
        description="CEIP (Croatian Enterprise Intelligence Platform) is a government-backed export initiative connecting verified Croatian manufacturers — Đuro Đaković, Končar, Brodosplit, Rimac and 162,000+ FINA-registered companies — with international OEM buyers."
        canonical="/about-us"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "CEIP — Croatian Enterprise Intelligence Platform",
            "foundingDate": "2023",
            "foundingLocation": "Zagreb, Croatia",
            "url": "https://ceip.hr",
            "description": "Government-backed platform verifying Croatian manufacturers for international OEM buyers using AI and certified on-site auditors."
          }
        }}
      />
      <PageGridOverlay />
      <div className="relative">
      <Navigation />

      {/* HERO */}
      <section data-nav-theme="light" className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <HeroSquaresAnimation className="top-24 right-8 md:top-28 md:right-20 lg:top-32 lg:right-24" />

        {/* Mobile/Tablet Image - Top */}
        <motion.div
          className="lg:hidden w-full h-48 sm:h-64 md:h-80 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-4 gap-0.5 h-full w-full">
            {heroImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover brightness-95" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop image */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden z-[5]">
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: 'ellipse(100% 100% at 0% 50%)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-4 gap-0.5 h-full w-full">
              {heroImages.slice(0, 8).map((image, index) => (
                <div key={index} className="relative overflow-hidden">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover brightness-95" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 py-12 sm:py-16 lg:py-24 lg:min-h-[80vh] flex items-center pointer-events-none">
          <motion.div
            className="lg:ml-[45%] lg:pl-16 space-y-4 sm:space-y-6 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-primary/80">
              Croatian Enterprise Intelligence Platform
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
              Putting Croatian<br />industry on the<br />global map
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              CEIP is the government-backed platform that connects 162,000+ FINA-registered Croatian companies with international OEM buyers — verified by AI and certified on-site auditors.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl">
              From Đuro Đaković's heavy-steel halls in Slavonski Brod to Rimac's EV powertrain lines in Sveta Nedelja, every supplier in our index is audited to VDA 6.3, EN 1090-2 and ISO 3834-2 standards.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="162.135" from={3} to={6} />
      </div>

      {/* MISSION & VISION */}
      <section data-nav-theme="light" className="py-32 md:py-40 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            className="mb-32 md:mb-40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Mission</p>
                <div className="w-10 h-[2px] bg-primary" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.35] font-light">
                  Boost Croatian exports by giving every domestic manufacturer — micro to large — a verified, internationally credible profile that procurement teams in Munich, Stuttgart and Linz can act on without flying down to inspect.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="w-full h-px bg-border mb-32 md:mb-40" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Vision</p>
                <div className="w-10 h-[2px] bg-primary" />
              </div>
              <div className="lg:col-span-8 space-y-10">
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] text-foreground font-semibold leading-[1.2] tracking-tight">
                  Croatia as the EU's most transparent supplier base
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Croatian manufacturers compete on quality, not on marketing budgets. CEIP gives every FINA-registered company the same level of verified visibility — so a 30-person CNC shop in Varaždin can be sourced as confidently as Končar.
                </p>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  Any global buyer can verify any Croatian supplier — in 72 hours.
                </p>
                <div className="border-l-2 border-foreground/15 pl-8 md:pl-10 space-y-4 py-2">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    No sourcing trips. No language barriers. No blind spots between Zagreb and Dubrovnik.
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    FINA data → AI match → On-site audit → Buyer decision
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionCutMarker section="A" from={0} to={6} />
      </div>

      {/* CORE PRINCIPLES */}
      <section data-nav-theme="light" className="py-32 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">What drives us</p>
                <h2 className="section-headline text-foreground">Core Principles</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Four pillars that guide every audit, every supplier profile and every export deal we help close.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                { title: "Croatian-first, global-grade", desc: "Built around the workflows of Croatian heavy industry — Đuro Đaković, Brodosplit, Končar, Rimac, AD Plastik, Dalekovod — but audited to the standards BMW, Linde and Siemens Energy require." },
                { title: "Verified, not declared", desc: "Every CEIP supplier profile carries FINA financial provenance, certificate cross-checks (HRN EN 1090-2, ISO 3834-2, IATF 16949) and on-site evidence with timestamp and geotag." },
                { title: "Public-private partnership", desc: "CEIP is co-funded with HGK and HBOR. Suppliers pay nothing to be listed — financing is recovered from buyer subscriptions and verification fees." },
                { title: "Atlas AI + Croatian auditors", desc: "AI standardises the audit data; certified Croatian lead auditors (registered with HGK) and HDTZ NDT Level III inspectors validate the truth on-site." },
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-10 md:p-12 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-xs font-medium text-muted-foreground tracking-[0.2em]">0{index + 1}</span>
                  <h3 className="text-xl font-semibold text-foreground">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="162.135 companies · FINA 2024" from={3} to={6} />
      </div>

      {/* SUSTAINABILITY */}
      <section data-nav-theme="light" className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-muted">
                <img src={sustainabilityImage} alt="Sustainable European sourcing — replacing intercontinental supply chains with verified Croatian manufacturers" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4) 0%, transparent 60%)', mixBlendMode: 'multiply' }} />
                <div className="absolute top-[5%] right-[4%] w-[10%] aspect-square bg-primary" />
                <div className="absolute top-[5%] right-[16%] w-[10%] aspect-square bg-primary" />
                <div className="absolute top-[17%] right-[4%] w-[10%] aspect-square bg-primary" />
                <div className="absolute bottom-[5%] right-0 w-[50%] h-[10%] bg-primary" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-20 space-y-6">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase">Sustainability</p>
                <div className="w-10 h-[2px] bg-primary" />
                <h2 className="section-headline text-foreground">
                  Nearshoring to Croatia, lower CO₂
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Replacing a steel fabrication contract from Asia with one from Slavonski Brod cuts transport emissions by an average of 78% and shortens lead times from 14 to 3 weeks. CEIP makes that switch verifiable and bankable for German and Austrian OEM buyers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Audit data integrity" gridColumn={1} />
      </div>

      {/* TIMELINE */}
      <section data-nav-theme="light" className="py-32 bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Timeline</p>
                <h2 className="section-headline text-foreground">Our Journey</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  From a Zagreb policy paper to the verification layer for the entire Croatian export economy.
                </p>
              </div>
            </div>

            <div className="space-y-0">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="grid lg:grid-cols-12 gap-8 lg:gap-16 border-t border-border py-12 md:py-16 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="lg:col-span-4">
                    <span className="text-5xl md:text-6xl font-bold text-foreground/10 tracking-tight">{item.year}</span>
                  </div>
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP / GOVERNANCE */}
      <section data-nav-theme="dark" className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src={leadershipTeamImage} alt="CEIP governance and steering board" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 py-20">
          <motion.div
            className="max-w-2xl space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-medium text-background/50 tracking-[0.25em] uppercase">Governance</p>
            <div className="w-10 h-[2px] bg-primary" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.1] tracking-tight">
              Engineers, exporters and economists — in one room
            </h2>
            <p className="text-lg md:text-xl text-background/70 leading-relaxed">
              CEIP is steered by a board combining Croatian heavy-industry engineering leaders, FINA data scientists, HBOR export-finance specialists and former OEM procurement directors from BMW, Linde and Siemens — driving a single standard for verified Croatian supplier intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <DimensionLine from="€127M" to="2026" unit="" gridFrom={0} gridTo={3} />
      </div>

      {/* CONTACT */}
      <section data-nav-theme="light" className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            <div className="lg:col-span-4">
              <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase mb-6">Contact</p>
              <div className="w-10 h-[2px] bg-primary mb-6" />
              <h2 className="section-headline text-foreground">Get in touch</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="border border-border bg-muted/30 p-10 md:p-12 space-y-4">
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase">Programme Director</p>
                <h3 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Ivo Brandić</h3>
                <div className="space-y-1 text-lg text-muted-foreground">
                  <p>CEIP — Croatian Enterprise Intelligence Platform</p>
                  <p>Ulica grada Vukovara 78, 10000 Zagreb, Croatia</p>
                  <p>
                    <a href="mailto:ivo.brandic@ceip.hr" className="text-primary hover:underline">
                      ivo.brandic@ceip.hr
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DEMO DISCLAIMER */}
      <section id="disclaimer" data-nav-theme="dark" className="py-20 bg-foreground scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium text-background/50 tracking-[0.25em] uppercase mb-6">Disclaimer</p>
              <div className="w-10 h-[2px] bg-primary" />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <p className="text-base md:text-lg text-background/70 leading-relaxed">
                Confidential demonstration material prepared for CEIP stakeholders. Supplier names (Đuro Đaković, Končar, Brodosplit, Rimac, AD Plastik, Dalekovod) are used illustratively to show the platform's intended scope; sample profiles, NCRs, claim values and audit findings shown are synthetic and do not represent actual business relationships or quality positions. Public FINA enterprise statistics (492 large, 2,157 medium, 17,228 small, 142,258 micro) are reproduced from FINA Annual Report 2024.
              </p>
              <p className="text-sm text-background/40 tracking-wide">
                CEIP · Confidential · 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
};

export default AboutUs;
