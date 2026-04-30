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
  const [selectedYear] = useState(2023);

  const heroImages = [
    { src: auditorFemaleAfrican, alt: 'Quality Inspector' },
    { src: auditorAsian, alt: 'Safety Manager' },
    { src: auditorFemaleEuropean, alt: 'Compliance Auditor' },
    { src: auditorFemaleMiddleEast, alt: 'Operations Director' },
    { src: auditorFemaleLatin, alt: 'Factory Inspector' },
    { src: auditorFemaleSouthAsian, alt: 'Procurement Manager' },
    { src: auditorMaleNorthAmerica, alt: 'Supply Chain Lead' },
    { src: auditorAfrican, alt: 'Vendor Relations' },
  ];

  const timelineData = [
    { year: 2023, title: "Foundation", desc: "YVOO Technologies founded in Zagreb with a vision to transform B2B procurement through AI and verified human expertise." },
    { year: 2024, title: "Platform Innovation", desc: "YVOO launched its supplier verification framework — connecting OEM procurement teams to verified heavy industry suppliers." },
    { year: 2025, title: "Atlas AI", desc: "Introduced Atlas AI for on-site supplier verification with VDA 6.3 / IATF 16949 standardisation." },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <PageSEO
        title="About YVOO — Verified Supplier Intelligence"
        description="YVOO Technologies, founded in Zagreb, combines AI with a network of certified industry-specialised auditors to deliver verified supplier intelligence."
        canonical="/about-us"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "YVOO Technologies Ltd.",
            "foundingDate": "2023",
            "url": "https://www.yvoo.io",
            "description": "AI-powered supplier audit and verification platform."
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
              Building the World's Largest<br />Auditor Marketplace
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              YVOO connects clients, suppliers and local experts through innovative technology and human expertise.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl">
              Our team provides ongoing expertise and guidance to ensure your procurement process remains thorough, compliant and effective.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="1200" from={3} to={6} />
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
                  Build trustworthy supplier relationships through verified intelligence — empowering procurement, suppliers and on-site experts in a culture of transparency and engineering rigor.
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
                  An AI-powered marketplace for certified industry auditors
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Globally, ISO / VDA / IATF certified auditors are fragmented and inconsistent. YVOO connects them. Atlas AI standardises their work.
                </p>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium">
                  Any company can verify any supplier — fast.
                </p>
                <div className="border-l-2 border-foreground/15 pl-8 md:pl-10 space-y-4 py-2">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    No employment overhead. No travel chaos. No geographic blind spots.
                  </p>
                  <p className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    Upload → Match → Verify → Decide
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
                  Four pillars that guide every decision — from product design to on-site verification.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                { title: "Engineering First", desc: "Built around real heavy industry workflows — VDA 6.3, IATF 16949, EN 15085 — not generic procurement templates." },
                { title: "Verified Intelligence", desc: "Every data point in a YVOO supplier twin carries provenance: source, timestamp and on-site evidence." },
                { title: "Industry Focus", desc: "Deep coverage of heavy steel, welding and precision machining capacity." },
                { title: "Human in the Loop", desc: "Atlas AI standardises the data; certified on-site auditors validate the truth." },
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
        <TechnicalAnnotation label="700" from={3} to={6} />
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
                <img src={sustainabilityImage} alt="Sustainable operations" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
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
                  Local Sourcing, Lower Footprint
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Verifying regional capacity reduces transport emissions and shortens the supply chain — replacing long-haul intercontinental sourcing with audited regional capability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ToleranceNotation nominal="99.7" tolerance="0.02" unit="%" label="Process Cpk" gridColumn={1} />
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
                  From a Zagreb idea to a verification platform for heavy industry.
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

      {/* LEADERSHIP */}
      <section data-nav-theme="dark" className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src={leadershipTeamImage} alt="YVOO Team" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
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
            <p className="text-xs font-medium text-background/50 tracking-[0.25em] uppercase">Founder</p>
            <div className="w-10 h-[2px] bg-primary" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-[1.1] tracking-tight">
              Engineering meets procurement
            </h2>
            <p className="text-lg md:text-xl text-background/70 leading-relaxed">
              YVOO is led by founders combining heavy industry engineering know-how with deep procurement and quality systems experience — driving a new standard for verified supplier intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <DimensionLine from="15.000" to="700" unit="€" gridFrom={0} gridTo={3} />
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
                <p className="text-xs font-medium text-muted-foreground tracking-[0.25em] uppercase">Founder &amp; CEO</p>
                <h3 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Ivo Brandić</h3>
                <div className="space-y-1 text-lg text-muted-foreground">
                  <p>Connectimus Project Ltd</p>
                  <p>Zagreb, Croatia</p>
                  <p>
                    <a href="mailto:ivo.brandic@connectimus.com" className="text-primary hover:underline">
                      ivo.brandic@connectimus.com
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
                Confidential. Prepared exclusively for the addressed recipient as a substitute for a traditional slide presentation. All data, supplier profiles, screenshots and images shown are illustrative examples for demonstration purposes only and do not represent actual business relationships. Content is provided for informational purposes only and does not constitute a binding offer.
              </p>
              <p className="text-sm text-background/40 tracking-wide">
                Confidential · 2026
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
