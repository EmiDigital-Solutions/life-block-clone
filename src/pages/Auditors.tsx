import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Users,
  User,
  DollarSign,
  Shield,
  Award,
  Briefcase,
  CheckCircle,
  ShieldCheck,
  Search,
  BookOpen,
  Smartphone,
  Zap,
  Laptop,
  CreditCard,
  BarChart3,
  Lock,
  MessageCircle,
  X,
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  TrendingUp,
  Building2,
  Target,
  ArrowUp,
  FileText,
  ClipboardCheck,
  Coins,
  Plus,
  Minus
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

const Auditors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroImages = [
    { src: auditorBlonde1, alt: 'Quality Inspector' },
    { src: auditorBlonde2, alt: 'Safety Manager' },
    { src: auditorBlonde3, alt: 'Compliance Auditor' },
    { src: auditorBlonde4, alt: 'Operations Director' },
    { src: auditorBlonde5, alt: 'Factory Inspector' },
    { src: procurementFemaleBlonde, alt: 'Procurement Manager' },
    { src: procurementMaleOceania, alt: 'Supply Chain Lead' },
    { src: procurementFemaleEuropean, alt: 'Vendor Relations' },
    { src: auditorEuropean, alt: 'Senior Auditor' },
    { src: procurementMaleAsian, alt: 'Sourcing Director' },
    { src: auditorFemaleEuropean, alt: 'Quality Lead' },
    { src: procurementFemaleAsian, alt: 'Procurement Specialist' },
    { src: procurementMaleLatin, alt: 'Operations Manager' },
    { src: auditorGen1, alt: 'Site Inspector' },
    { src: auditorGen2, alt: 'Factory Manager' },
    { src: auditorGen3, alt: 'Quality Director' },
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
    <div className="min-h-screen">
      <Navigation />
      
      <div ref={containerRef}>
        {/* Hero Section - Premium B2B Style */}
        <section
          data-nav-theme="white"
          className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
        >
          {/* Main Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-20 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              
              {/* Eyebrow - Exclusivity signal */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-white/40 text-sm tracking-[0.3em] uppercase mb-12"
              >
                By Invitation Only
              </motion.p>

              {/* Main Heading - Aspirational, confident */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light tracking-tight leading-[1.1] mb-8 text-white"
              >
                We partner with
                <br />
                <span className="font-medium">exceptional auditors.</span>
              </motion.h1>

              {/* Subtitle - Selective, not desperate */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/40 mb-16 max-w-xl mx-auto"
              >
                Our clients demand the highest standards.
                <br />
                So do we.
              </motion.p>

              {/* CTA - Simple, confident */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-medium transition-all duration-300 text-base bg-white text-[#0a0a0a] hover:bg-white/90">
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Client Logos - Show caliber */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-32 pt-12 border-t border-white/10"
            >
              <p className="text-center text-white/30 text-sm tracking-wider uppercase mb-10">
                Our partners audit for
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
                {["Siemens", "BMW", "Airbus", "Bosch", "Mercedes-Benz", "BASF"].map((client, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
                    className="text-2xl lg:text-3xl font-light text-white/20 hover:text-white/40 transition-colors"
                  >
                    {client}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Minimal stats - understated confidence */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-20 flex justify-center gap-16 lg:gap-24"
            >
              {[
                { value: "2,000+", label: "Partners" },
                { value: "94", label: "Countries" },
                { value: "12K+", label: "Audits Completed" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl lg:text-3xl font-light text-white/80">{stat.value}</p>
                  <p className="text-xs text-white/30 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Scroll-Zoom Section */}
        <ScrollZoomSection />

        {/* Value Proposition Section */}
        <ValuePropositionSection />

        {/* How It Works Timeline */}
        <TimelineSection />

        {/* Qualifications Section */}
        <QualificationsSection />


        {/* Technology Features - New Design */}
        <TechnologyFeaturesSection />

        {/* Day in the Life */}
        <DayInLifeSection />

        {/* Success Stories */}
        <SuccessStoriesSection />

        {/* Final CTA Section - Premium B2B Style */}
        <section 
          data-nav-theme="white"
          className="py-32 md:py-40 bg-[#0a0a0a]"
        >
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-white/40 text-sm tracking-[0.3em] uppercase mb-8"
              >
                Ready?
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-headline text-white mb-8"
              >
                Let's discuss
                <br />
                your partnership.
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg mb-12"
              >
                15-minute conversation. No commitment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-medium transition-all duration-300 text-base bg-white text-[#0a0a0a] hover:bg-white/90"
                >
                  Apply for Partnership
                  <ArrowRight className="w-5 h-5" />
                </a>
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
            className="fixed bottom-8 right-8 bg-[#B2CDBC] text-white p-4 rounded-full shadow-lg hover:bg-[#B2CDBC]/90 transition-all z-50"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
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
    "Work locally, audit globally",
    "AI writes reports as you work",
    "Payment in 14 days, guaranteed",
    "Premium clients, steady pipeline",
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-32 md:py-40 bg-white"
    >
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
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
            className="bg-[#f5f5f5] rounded-[32px] p-10"
          >
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-8">
              Traditional Auditing
            </p>
            <div className="space-y-5">
              {oldWay.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
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
            className="bg-[#0a0a0a] rounded-[32px] p-10"
          >
            <p className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase mb-8">
              With YVOO
            </p>
            <div className="space-y-5">
              {newWay.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border"
        >
          {[
            { title: "Premium clients", desc: "Fortune 500 manufacturers, automotive OEMs, aerospace suppliers." },
            { title: "AI co-pilot", desc: "Computer vision, smart templates, real-time guidance at your fingertips." },
            { title: "Focus on expertise", desc: "You audit. AI handles documentation. 70% less admin work." },
          ].map((item, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
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
      description: "Compensation within 14 days. Transparent terms, no hidden fees.",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-32 md:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28">
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
                      hoveredIndex === index ? 'opacity-100' : 'opacity-30'
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
      data-nav-theme="white"
      className="py-32 md:py-40 bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left - Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-white/30" />
              <span className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                Requirements
              </span>
            </div>
            <h2 className="section-headline text-white mb-8">
              We're selective.
              <br />
              So are you.
            </h2>
            <p className="text-white/50 text-lg max-w-md">
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
                <div key={idx} className="flex items-start gap-4 text-white/70">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{req}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <a
                href="#"
                className="inline-flex items-center gap-3 text-white font-medium group"
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
    { title: "Instant Payments", desc: "14-day processing. Transparent rates. No invoice chasing." },
  ];

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-32 md:py-40 bg-[#f5f5f5]"
    >
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-20"
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

      </div>
    </section>
  );
};

// WORKFLOW SECTION - What YVOO Does Better
const DayInLifeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const timeline = [
    {
      day: "Day 1",
      title: "Assignment matched to you",
      oldWay: "Cold calls, negotiate rates, plan travel",
      newWay: "AI matches your expertise + location. Accept with one tap. Fixed rate, no negotiation.",
      highlight: "Zero acquisition effort",
    },
    {
      day: "Day 2",
      title: "Preparation from home",
      oldWay: "Build checklists manually, request documents, chase suppliers",
      newWay: "AI generates audit template from client specs. Documents pre-loaded. Supplier confirmed.",
      highlight: "2 hours vs 2 days",
    },
    {
      day: "Day 3-4",
      title: "On-site audit",
      oldWay: "Paper checklists, manual photos, handwritten notes, remember everything",
      newWay: "Scan equipment → AI identifies. Take photo → auto-categorized. Finding → instant alert to client.",
      highlight: "AI documents as you work",
    },
    {
      day: "Day 5",
      title: "Report delivery",
      oldWay: "2-3 days writing reports, formatting, compiling evidence",
      newWay: "AI drafted 80% from your inputs. Add expertise. Submit. Done.",
      highlight: "Hours, not days",
    },
    {
      day: "Day 6-8",
      title: "Payment received",
      oldWay: "Send invoice, wait 60-90 days, chase payment",
      newWay: "Automatic processing. Bank transfer confirmed. No invoicing.",
      highlight: "3 days max",
    },
  ];

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-32 md:py-48 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-24 md:mb-32"
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

        {/* Timeline */}
        <div className="relative max-w-5xl">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-[44px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />
          
          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.6 }}
                className="flex gap-8 md:gap-12 group"
              >
                {/* Day badge */}
                <div className="flex-shrink-0 w-[56px] md:w-[88px] relative">
                  <div className="hidden sm:flex absolute left-0 top-0 w-[56px] md:w-[88px] h-[56px] md:h-[88px] rounded-full border-2 border-primary/20 items-center justify-center bg-white group-hover:border-primary/40 transition-colors duration-300">
                    <span className="text-sm md:text-base font-semibold text-primary tracking-wide">{item.day}</span>
                  </div>
                  <span className="sm:hidden text-lg font-semibold text-primary">{item.day}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">{item.title}</h3>
                  </div>
                  
                  {/* Old vs New */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-base leading-relaxed">{item.oldWay}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <p className="text-foreground text-base leading-relaxed font-medium">{item.newWay}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-32 md:py-40 bg-white"
    >
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 md:mb-20"
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="border-t border-border pt-8"
            >
              <p className="text-lg text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.credential}</p>
                <p className="text-sm text-muted-foreground/60">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
      q: "What is the compensation structure for partner auditors?",
      a: "Partner auditors earn €2,500–€4,500 per assignment depending on audit type and complexity. Standard ISO audits start at €2,500, while specialized audits (VDA 6.3, IATF 16949, AS9100) command €3,500–€4,500. Payments are processed within 14 days via direct bank transfer. No platform fees or commission deductions—you keep 100% of your quoted rate."
    },
    {
      q: "How does YVOO differ from gig economy platforms?",
      a: "YVOO partners with Fortune 500 manufacturers and Tier-1 suppliers who require certified professionals—not freelancers racing against the clock. Key differences: premium compensation (3–5× typical gig rates), sustainable workload (3–5 audits/month vs. daily grind), long-term client relationships, and professional development investment. We reject 70% of client requests that do not meet our quality standards."
    },
    {
      q: "What types of clients will I work with?",
      a: "Our client portfolio includes automotive OEMs (BMW, Mercedes, Volkswagen Group), aerospace manufacturers (Airbus suppliers, Safran), medical device companies, and precision engineering firms. All clients are pre-vetted enterprises with established quality management systems. You will never be assigned to startups, small workshops, or companies seeking cut-rate audits."
    },
    {
      q: "What professional development support is provided?",
      a: "We invest €2,000+ annually per partner in professional development: CPE credits for maintaining certifications, quarterly webinars on emerging standards (IATF updates, VDA revisions), access to our auditor knowledge base with 500+ case studies, and annual partner summit with industry experts. Top performers receive sponsored certifications and conference attendance."
    },
    {
      q: "How many assignments can I expect per month?",
      a: "Active partners typically complete 3–5 enterprise audits monthly, representing €10,000–€18,000 in earnings. You set your own availability—accept assignments that fit your schedule, decline without penalty. Our AI matching system prioritizes auditors based on specialization, location, and client preferences, ensuring consistent high-quality opportunities."
    },
    {
      q: "What is the application and verification process?",
      a: "Step 1: Submit credentials and certifications online (10 minutes). Step 2: Background verification and reference checks (5–7 days). Step 3: Technical interview with our audit director (30 minutes). Step 4: Onboarding and platform training (2 hours). Total timeline: 7–10 business days. Acceptance rate: approximately 15% of applicants meet our standards."
    }
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <h2 className="section-headline text-foreground">
            Questions auditors ask
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              className="border-t border-[#d5d5d5]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg md:text-xl text-foreground font-medium leading-snug">
                  {faq.q}
                </span>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d5d5d5] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#c5c5c5]">
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
                <p className="text-[#888888] text-base md:text-lg leading-relaxed pb-6 pr-16">
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
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
    <section ref={sectionRef} className="py-32 md:py-40 bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 md:mb-20"
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
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-[32px] md:rounded-[48px] overflow-hidden">
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
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