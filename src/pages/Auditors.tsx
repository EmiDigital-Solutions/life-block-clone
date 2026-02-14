import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  X,
  ArrowRight,
  Check,
  ChevronDown,
  ArrowUp,
  Plus,
  Minus
} from "lucide-react";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
// Import diverse professional faces for hero grid
import auditorBlonde1 from "@/assets/auditor-blonde-1.jpg";
import auditorBlonde2 from "@/assets/auditor-blonde-2.jpg";
import auditorBlonde3 from "@/assets/auditor-blonde-3.jpg";
import auditorBlonde4 from "@/assets/auditor-blonde-4.jpg";
import auditorBlonde5 from "@/assets/auditor-blonde-5.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementMaleOceania from "@/assets/procurement-male-oceania.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import auditorTimelineHero from "@/assets/auditor-timeline-hero.png";
import evidenceInspector from "@/assets/evidence-inspector.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import auditorGen1 from "@/assets/auditor-gen-1.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
// Keep existing imports for other sections
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import digitalCollaboration from "@/assets/digital-collaboration.jpg";
import auditorFactoryTeam from "@/assets/auditor-factory-team.png";
import auditorSelectiveGreen1 from "@/assets/auditor-selective-green-1.jpg";
import AtlasAIDemoAnimation from "@/components/AtlasAIDemoAnimation";
import EarningsPotentialSection from "@/components/auditors/EarningsPotentialSection";


const Auditors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use the same images as the "Experts worldwide" carousel
  const heroImages = [
    { src: auditorEuropean, alt: 'VDA 6.3 Lead Auditor - Germany', role: 'VDA 6.3 Lead Auditor', location: 'Germany' },
    { src: auditorAsian, alt: 'ISO 9001 Specialist - Japan', role: 'ISO 9001 Specialist', location: 'Japan' },
    { src: auditorMaleNorthAmerica, alt: 'ABS & DNV-GL Auditor - USA', role: 'ABS & DNV-GL Auditor', location: 'USA' },
    { src: auditorMiddleEast, alt: 'API & ISO 29001 Auditor - UAE', role: 'API & ISO 29001 Auditor', location: 'UAE' },
    { src: auditorLatin, alt: 'IATF 16949 Specialist - Mexico', role: 'IATF 16949 Specialist', location: 'Mexico' },
    { src: auditorSouthAsian, alt: 'AS9100 Lead Auditor - India', role: 'AS9100 Lead Auditor', location: 'India' },
    { src: auditorAfrican, alt: 'Mining & Energy Auditor - South Africa', role: 'Mining & Energy Auditor', location: 'South Africa' },
    { src: auditorFemaleEuropean, alt: 'Pharmaceutical GMP Auditor - Switzerland', role: 'Pharmaceutical GMP Auditor', location: 'Switzerland' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      <PageGridOverlay />
      <div className="relative">
      <Navigation />
      
      <div ref={containerRef}>
        {/* Hero Section - Full Screen Image Carousel Background */}
        <section
          data-nav-theme="white"
          className="relative min-h-screen flex flex-col overflow-hidden"
        >
          <HeroSquaresAnimation className="top-24 right-8 md:top-28 md:right-20 lg:top-32 lg:right-24" />
          {/* Full-screen Image Carousel Background */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 1.1
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
          </div>

          {/* Carousel auto-advance */}
          {(() => {
            // Auto-advance carousel every 4 seconds
            useEffect(() => {
              const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % heroImages.length);
              }, 4000);
              return () => clearInterval(interval);
            }, [heroImages.length]);
            return null;
          })()}

          {/* Main Content - Archlet Style: Centered vertically, left-aligned */}
          <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
            <div className="px-8 w-full max-w-[1400px] mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20"
              >
                {/* Eyebrow Text - Archlet Style */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-sm text-white/50 font-mono tracking-wide mb-6"
                >
                  By Invitation Only
                </motion.p>

                {/* Main Headline - Archlet Style, 2 rows only */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-5xl"
                >
                  Audit on your terms.<br />
                  Get paid same day.
                </motion.h1>

                {/* Subtitle + CTA Container - Right aligned below headline like Archlet */}
                <div className="mt-12 lg:mt-16 lg:ml-[50%] max-w-xl">
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-white/70 text-lg lg:text-xl mb-8"
                  >
                    Our clients demand the highest standards. So do we.
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Button asChild size="lg">
                      <a href="#">
                        Apply for Partnership
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                </div>

              </motion.div>
            </div>
          </div>

          {/* Scrolling Client Band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="bg-black/40 backdrop-blur-sm py-8 overflow-hidden mt-auto relative z-10 border-t border-white/10"
          >
            <div className="relative flex">
              <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 60,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-16 items-center">
                    {["Built for automotive OEMs", "Aerospace suppliers", "Precision engineering", "Medical devices", "Chemical & pharma", "Energy & utilities"].map((company, idx) => (
                      <span
                        key={idx}
                        className="text-xl font-semibold text-white/40 tracking-wide hover:text-white/60 transition-colors"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 2. CREDIBILITY - "Auditing, reinvented" */}
        <ValuePropositionSection />

        {/* 3. THE DIFFERENCE - "Same audit. Less friction" */}
        <DayInLifeSection />

        {/* 4. TECHNOLOGY - "Your AI co-pilot" */}
        <TechnologyFeaturesSection />

        {/* 5. PROCESS - "From application to first audit" */}
        <TimelineSection />

        {/* 6. PAYMENT PROCESS + REAL OPPORTUNITIES */}
        <EarningsPotentialSection />

        {/* 7. SUCCESS STORIES / TESTIMONIALS */}
        <SuccessStoriesSection />

        {/* 8. REQUIREMENTS - "We're selective" (moved near CTA as final filter) */}
        <QualificationsSection />

        {/* Final CTA Section - Premium B2B Style */}
        <section 
          data-nav-theme="light"
          className="py-16 md:py-24 bg-white"
        >
          <div className="mx-auto max-w-[1400px] px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8"
              >
                Ready?
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-headline text-foreground mb-6"
              >
                See how it works.
                <br />
                No commitment.
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
              >
                15-minute intro call. View real opportunities. Decide if it fits.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild size="lg">
                  <a href="#">
                    Schedule intro call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-lg hover:bg-primary/90 transition-all z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </div>
      </div>
    </div>
  );
};

// VALUE PROPOSITION SECTION - The Future of Auditing
const ValuePropositionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const oldWay = [
    "Constant travel, hotels, jet lag",
    "Manual reports, endless paperwork",
    "Chase invoices for months",
    "Inconsistent one-off assignments",
  ];

  const newWay = [
    "Work locally—assignments near you",
    "Atlas AI handles documentation",
    "Payment released upon report submission",
    "You choose your schedule and workload",
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-16 md:py-24 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Your Future
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            Auditing, reinvented.
          </h2>
        </motion.div>

        {/* Old vs New Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-[#ebebeb] p-10 hover:bg-[#e3e3e3] transition-colors duration-300"
          >
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              Traditional Auditing
            </p>
            <div className="space-y-5">
              {oldWay.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#0a0a0a] p-10"
          >
            <p className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase mb-8">
              With YVOO
            </p>
            <div className="space-y-5">
              {newWay.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// TIMELINE SECTION - Sophisticated Editorial Design with Hover Accordion
const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Apply",
      subtitle: "Submit credentials",
      description: "Online application with credentials and certifications. Review within 48 hours.",
    },
    {
      number: "02",
      title: "Verify",
      subtitle: "Background check",
      description: "Technical interview and comprehensive credential verification.",
    },
    {
      number: "03",
      title: "Match",
      subtitle: "Client alignment",
      description: "AI connects you with enterprise clients matched to your expertise.",
    },
    {
      number: "04",
      title: "Audit",
      subtitle: "Deliver excellence",
      description: "Conduct audits with enterprise-grade tools and real-time support.",
    },
    {
      number: "05",
      title: "Earn",
      subtitle: "Fast payment",
      description: "Payment released upon report submission. Transparent terms, no hidden fees.",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-16 md:py-24 bg-muted overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                The Process
              </span>
            </div>
            <h2 className="section-headline text-foreground">
              From application
              <br />
              to first audit.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              A streamlined process designed for professionals who value their time.
            </p>
          </motion.div>
        </div>

        {/* Steps - Horizontal Accordion */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-border" />
          
          <div className="flex flex-col md:flex-row">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative border-b md:border-b-0 md:border-r border-border last:border-r-0 cursor-pointer transition-all duration-500 ease-out ${
                  hoveredIndex === index 
                    ? 'md:flex-[2.5]' 
                    : hoveredIndex !== null 
                      ? 'md:flex-[0.8]' 
                      : 'md:flex-1'
                }`}
              >
                <div className="py-10 md:py-16 px-6 md:px-8 h-full flex flex-col">
                  {/* Number */}
                  <div className="flex items-start justify-between mb-auto">
                    <span className={`text-6xl md:text-7xl font-extralight transition-all duration-300 text-primary ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-60'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-12 md:mt-20">
                    <span className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-muted-foreground/60'
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
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                  
                  {/* Hover indicator line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${
                    hoveredIndex === index ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// QUALIFICATIONS SECTION - Premium B2B Style
const QualificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const requirements = [
    "Recognized certification (CPA, CIA, VDA, ISO Lead Auditor)",
    "5+ years auditing experience with enterprise clients",
    "Clean professional record with verified references",
    "Professional liability insurance",
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-10 md:py-14 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left - Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground/30" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Requirements
              </span>
            </div>
            <h2 className="section-headline text-foreground mb-8">
              We're selective.
              <br />
              So are you.
            </h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Our 15% acceptance rate ensures every partner meets the standards our clients expect.
            </p>
          </motion.div>
          
          {/* Right - Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:pt-8"
          >
            <div className="space-y-6">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-4 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{req}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <a
                href="#"
                className="inline-flex items-center gap-3 text-foreground font-medium group"
              >
                Check if you qualify
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// TECHNOLOGY/PLATFORM SECTION - Premium Minimalist
const TechnologyFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    { title: "Equipment Recognition", desc: "Camera scans machines. AI identifies manufacturer, model, condition." },
    { title: "Smart Templates", desc: "Upload specs. AI generates your audit framework automatically." },
    { title: "Live Documentation", desc: "Photos auto-categorize. Findings auto-format. Reports write themselves." },
    { title: "Immediate Payment", desc: "Payment released upon report submission. No invoicing required." },
  ];

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Technology
            </span>
          </div>
          <h2 className="section-headline text-foreground mb-6">
            Your AI co-pilot.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Point your phone at a machine—AI identifies it. Take a photo—AI categorizes it. Finish the audit—AI writes the report. You focus on what matters: your expertise.
          </p>
        </motion.div>

        {/* Features - Clean horizontal layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="border-t-2 border-foreground/10 pt-6"
            >
              <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Atlas AI Demo Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16"
        >
          <div className="rounded-2xl overflow-hidden border border-border/20 aspect-[16/10] w-full shadow-2xl bg-white p-4 md:p-6">
            <AtlasAIDemoAnimation />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Auditor Parallax Image Component
const AuditorParallaxImage = ({ isInView }: { isInView: boolean }) => {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const decorY1 = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 40 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="hidden lg:block sticky top-32 translate-x-12"
    >
      <div className="relative">
        {/* Main image container with parallax */}
        <motion.div 
          className="relative overflow-hidden"
          style={{ y, scale }}
        >
          <img 
            src={auditorTimelineHero}
            alt="Professional Quality Auditor"
            className="w-full h-auto object-cover"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>
        
        {/* Decorative elements with opposite parallax */}
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

// WORKFLOW SECTION - What YVOO Does Better
const DayInLifeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const timeline = [
    {
      day: "Day 1",
      title: "You get the assignment",
      oldWay: "Email from a broker. Unclear scope. You call back, negotiate rate, book your own flight to a city 800 km away.",
      newWay: "Assignment appears in your app—scope, checklist, supplier docs, all ready. The factory is 40 minutes from home. Even if it's an industry you've rarely audited, the platform briefs you on context and critical process steps.",
      highlight: "More assignments, less guesswork",
    },
    {
      day: "Day 2",
      title: "You prepare the audit",
      oldWay: "Download a generic VDA 6.3 template. Google the supplier. Email them for missing documents. Wait. Follow up. Wait again.",
      newWay: "Client-specific checklist pre-loaded. Supplier certifications and previous findings already flagged. Risk areas highlighted so you walk in knowing exactly where to focus.",
      highlight: "Preparation in hours, not days",
    },
    {
      day: "Day 3",
      title: "You're on the shop floor",
      oldWay: "Paper checklist on a clipboard. Take photos with your phone and rename them later. Scribble notes between stations. Hope you don't forget anything.",
      newWay: "Digital checklist guides you question by question. Snap a photo—it's auto-linked to the finding. Unsure about a scoring? The system suggests a maturity level with reasoning. Flag a critical deviation—the client sees it in real time.",
      highlight: "Nothing gets missed",
    },
    {
      day: "Day 4",
      title: "You submit the report",
      oldWay: "Back at your hotel. Open Word. Copy findings from notes. Format tables. Attach 47 photos manually. Two full evenings of admin work.",
      newWay: "Report is 80% done before you leave the factory. Evidence organized, scores calculated, corrective actions drafted. You add your expert judgment and submit—professional-grade output, every time.",
      highlight: "Consistent quality, zero formatting",
    },
    {
      day: "Day 5",
      title: "You get paid",
      oldWay: "Write an invoice. Send it. Wait 60 days. Send a reminder. Wait 30 more days. Finally: payment received.",
      newWay: "Report approved → payment released same business day. No invoice. No chasing. The client already has your findings in their dashboard with risk scores and action tracking.",
      highlight: "Same-day payment. Lasting impact.",
    },
  ];

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-muted overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight">
            Same audit.<br />
            <span className="font-medium">Less friction.</span>
          </h2>
        </motion.div>

        {/* Timeline with Auditor Image */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-20 items-start">
          {/* Timeline - Left Side */}
          <div className="relative">
            {/* Animated Vertical line with flowing effect */}
            <div className="absolute left-[28px] md:left-[44px] top-4 bottom-4 w-[2px] hidden sm:block overflow-hidden">
              {/* Background line */}
              <div className="absolute inset-0 bg-border/30" />
              {/* Animated fill */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/20 origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
              {/* Flowing particle effect */}
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
                  {/* Square Day badge */}
                  <div className="flex-shrink-0 w-[56px] md:w-[88px] relative">
                    <motion.div 
                      className="hidden sm:flex absolute left-0 top-0 w-[56px] md:w-[88px] h-[56px] md:h-[88px] rounded-lg border border-border bg-background items-center justify-center shadow-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.25, duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Corner accent */}
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
                      <span className="text-sm md:text-base font-semibold text-foreground tracking-wide">{item.day}</span>
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
                      <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">{item.title}</h3>
                    </motion.div>
                    
                    {/* Old vs New with staggered animation */}
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

          {/* Auditor Image - Right Side with Parallax */}
          <AuditorParallaxImage isInView={isInView} />
        </div>

        {/* Independent CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <Button size="lg">
            Start your new way to audit now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

// SUCCESS STORIES SECTION - Premium B2B Style
const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const testimonials = [
    {
      name: "Dr. Michael Wagner",
      credential: "VDA 6.3 Lead Auditor",
      company: "Previously: TÜV SÜD",
      quote: "The quality of clients is what sets YVOO apart. I work exclusively with manufacturers who understand the value of rigorous auditing.",
    },
    {
      name: "Sarah Chen",
      credential: "CPA, ISO Lead Auditor",
      company: "Previously: Bureau Veritas",
      quote: "For the first time in my career, I have full control over my schedule while working with clients who respect professional standards.",
    },
    {
      name: "James Okonkwo",
      credential: "CIA, IATF Specialist",
      company: "Previously: SGS",
      quote: "The vetting process is thorough—and that's exactly why the client relationships are exceptional.",
    },
  ];

  const communityItems = [
    { number: "01", title: "Exclusive training", desc: "Continuous professional development and certification support." },
    { number: "02", title: "Global peer network", desc: "Connect with auditors across industries and share best practices." },
    { number: "03", title: "Standards updates first", desc: "Early access to regulatory changes and evolving industry requirements." },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-16 md:py-24 bg-muted"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              From Our Partners
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            In their words.
          </h2>
        </motion.div>

        {/* Testimonials — Large quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-muted p-8 flex flex-col justify-between group hover:bg-muted/70 transition-colors duration-300"
            >
              <div>
                <span className="text-5xl font-serif text-primary/30 leading-none block mb-4">"</span>
                <p className="text-foreground leading-relaxed mb-8">
                  {testimonial.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-border/50">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.credential}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Culture Statement — Full-width dark block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-foreground p-10 md:p-14 mb-12"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-background/30 uppercase mb-6">
              Our culture
            </p>
            <h3 className="section-headline-sm text-background mb-6">
              Integrity. Precision. Growth.
            </h3>
            <p className="text-xl md:text-2xl font-light text-background/80 leading-snug max-w-2xl mb-4">
              We seek auditors who are <span className="text-primary font-medium">curious</span>, <span className="text-primary font-medium">precise</span>, and <span className="text-primary font-medium">ethical</span>.
            </p>
            <p className="text-background/50 max-w-xl">
              Join professionals who care about quality, not just paychecks. Every partner shapes the standard we set.
            </p>
          </div>
        </motion.div>

        {/* Community Benefits — Numbered cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
            More than a platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + idx * 0.1 }}
                className="border-t-2 border-primary/20 pt-6 group hover:border-primary transition-colors duration-300"
              >
                <span className="text-3xl font-extralight text-primary/40 group-hover:text-primary transition-colors duration-300">{item.number}</span>
                <h3 className="text-lg font-medium text-foreground mt-3 mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ SECTION
const FAQSection = ({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (index: number | null) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const faqs = [
    {
      q: "How does payment work?",
      a: "Once your audit report is submitted and validated, payment is auto-released the same business day via direct bank transfer. There is no invoicing required on your end—the platform handles everything. You see the fee upfront before accepting any assignment."
    },
    {
      q: "How does YVOO differ from traditional audit firms?",
      a: "You work as an independent professional, not an employee. You see each assignment's fee and location upfront and choose what fits your schedule. Atlas AI handles documentation, so you spend more time auditing and less on admin. There are no exclusivity requirements—you decide your workload."
    },
    {
      q: "What types of clients are on the platform?",
      a: "Our client base includes automotive OEMs, aerospace manufacturers, medical device companies, and precision engineering firms. All clients are pre-vetted enterprises with established quality management systems seeking certified auditors for specific standards."
    },
    {
      q: "How are assignments matched to me?",
      a: "Our matching system considers your certifications, industry specialization, and location to surface relevant opportunities near you. You review each assignment's details—standard, location, fee—and accept or decline with no obligation."
    },
    {
      q: "What professional development support is provided?",
      a: "Partners have access to CPE credits, quarterly webinars on emerging standards (IATF updates, VDA revisions), and our auditor knowledge base. We invest in keeping our network current with evolving industry requirements."
    },
    {
      q: "What is the application and verification process?",
      a: "Step 1: Submit credentials and certifications online (10 minutes). Step 2: Background verification and reference checks (5–7 days). Step 3: Technical interview with our audit director (30 minutes). Step 4: Onboarding and platform training (2 hours). Total timeline: 7–10 business days."
    }
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-16 md:py-24 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <h2 className="section-headline text-foreground">
            Questions auditors ask
          </h2>
        </motion.div>

        {/* FAQ List — shifted one grid column right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.05 }}
                className="border-t border-border"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <span className="text-lg md:text-xl text-foreground font-medium leading-snug">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 bg-muted flex items-center justify-center transition-colors duration-200 group-hover:bg-muted/80">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    )}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed pb-6 pr-16">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// AUDITOR CAROUSEL SECTION - Premium People Gallery
const ScrollZoomSection = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const auditors = [
    { src: auditorEuropean, role: "VDA 6.3 Lead Auditor", location: "Germany", industry: "Automotive" },
    { src: auditorAsian, role: "ISO 9001 Specialist", location: "Japan", industry: "Electronics" },
    { src: auditorMaleNorthAmerica, role: "ABS & DNV-GL Auditor", location: "USA", industry: "Shipbuilding" },
    { src: auditorMiddleEast, role: "API & ISO 29001 Auditor", location: "UAE", industry: "Oil & Gas" },
    { src: auditorLatin, role: "IATF 16949 Specialist", location: "Mexico", industry: "Automotive" },
    { src: auditorSouthAsian, role: "AS9100 Lead Auditor", location: "India", industry: "Aerospace" },
    { src: auditorAfrican, role: "Mining & Energy Auditor", location: "South Africa", industry: "Mining" },
    { src: auditorFemaleEuropean, role: "Pharmaceutical GMP Auditor", location: "Switzerland", industry: "Pharma" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % auditors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [auditors.length]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Our Network
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            Experts worldwide.
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden">
            {auditors.map((auditor, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  scale: currentIndex === index ? 1 : 1.05,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={auditor.src}
                  alt={`${auditor.role} - ${auditor.location}`}
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </motion.div>
            ))}

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-white/60 text-sm tracking-wider uppercase mb-3">
                  {auditors[currentIndex].location} · {auditors[currentIndex].industry}
                </p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white">
                  {auditors[currentIndex].role}
                </h3>
              </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 right-8 md:right-12 lg:right-16 flex gap-2">
              {auditors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-lg transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-8 bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-foreground/10">
            {[
              { value: "2,000+", label: "Certified Auditors" },
              { value: "94", label: "Countries" },
              { value: "15%", label: "Acceptance Rate" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-medium text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auditors;