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
        {/* Hero Section - Image Grid Style */}
        <section
          data-nav-theme="black"
          className="relative min-h-screen flex flex-col overflow-hidden bg-[#f8f8f8]"
        >
          {/* Main Content */}
          <div className="flex-1 flex items-center relative z-10">
            <div className="container mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-16">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Left Column - Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-xl"
                >
                  {/* Tagline Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      2,000+ Auditors · 90+ Countries
                    </span>
                  </motion.div>

                  {/* Main Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
                  >
                    <span className="text-foreground">Join the Elite</span>
                    <br />
                    <span className="text-primary">Auditor Network</span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg text-muted-foreground mb-8"
                  >
                    Partner with YVOO to serve companies with the highest quality standards. €2,500+ average assignment value.
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap items-center gap-4 mb-8"
                  >
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-base text-white bg-foreground hover:bg-foreground/90">
                      Apply as Partner
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <a 
                      href="#how-it-works"
                      className="inline-flex items-center gap-2 px-4 py-4 font-medium text-foreground hover:text-foreground/70 transition-colors"
                    >
                      How it works
                      <span className="text-lg">→</span>
                    </a>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <p className="text-sm text-muted-foreground mb-3">
                      Partner benefits:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Premium Clients", "Flexible Schedule", "AI Tools", "Fast Payment"].map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground border border-gray-200"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Image Grid */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="grid grid-cols-4 gap-3">
                    {heroImages.slice(0, 12).map((image, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.05 }}
                        className={`relative overflow-hidden rounded-2xl ${
                          idx === 0 || idx === 5 ? 'col-span-2 row-span-2' : ''
                        }`}
                        style={{ 
                          aspectRatio: idx === 0 || idx === 5 ? '1' : '1',
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Floating Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">€4,500+</p>
                        <p className="text-sm text-muted-foreground">Top earners monthly</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scrolling Industry Band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="bg-white py-8 overflow-hidden mt-auto relative z-10"
          >
            <div className="container mx-auto px-6 mb-4">
              <p className="text-sm text-muted-foreground font-medium">
                Trusted by global industry leaders
              </p>
            </div>
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
                    duration: 35,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-16 items-center">
                    {["Automotive", "Aerospace", "Engineering", "Manufacturing", "Industrial", "Technology", "Energy", "Pharma"].map((industry, idx) => (
                      <span
                        key={idx}
                        className="text-xl font-semibold text-gray-300 tracking-wide hover:text-gray-500 transition-colors"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Scroll-Zoom Section */}
        <ScrollZoomSection />

        {/* Value Proposition Section */}
        <ValuePropositionSection />

        {/* How It Works Timeline */}
        <TimelineSection />

        {/* Qualifications Section */}
        <QualificationsSection />

        {/* Do vs Don't Toggle Section */}
        <DoVsDontSection />

        {/* Technology Features - New Design */}
        <TechnologyFeaturesSection />

        {/* Success Stories */}
        <SuccessStoriesSection />

        {/* Final CTA Section - Homepage Style */}
        <section 
          data-nav-theme="light"
          className="py-24 md:py-32 bg-background"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="section-headline text-foreground mb-6">
                Ready to Build Your Professional Practice?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
                Join an elite network of certified auditors serving companies with the highest quality standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-4 text-base font-semibold inline-flex items-center gap-2"
                >
                  Apply for Partnership
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-16 pt-8 border-t border-border"
              >
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                  <span>Premium Compensation</span>
                  <span>Strategic Partnerships</span>
                  <span>Professional Development</span>
                </div>
              </motion.div>
            </motion.div>
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

// VALUE PROPOSITION SECTION
const ValuePropositionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      icon: Building2,
      title: "Enterprise Partnerships",
      description: "Work with companies that demand the highest quality standards and value audit expertise and professional excellence",
    },
    {
      icon: DollarSign,
      title: "Premium Compensation",
      description: "€2,500+ per assignment with transparent pricing—earn what your professional expertise deserves",
    },
    {
      icon: Target,
      title: "Strategic Assignments",
      description: "Meaningful audit engagements that match your specialization and contribute to your professional growth",
    },
    {
      icon: Calendar,
      title: "Balanced Workload",
      description: "Sustainable scheduling that respects audit quality standards and your work-life balance",
    },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            Professional Partnership Platform
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TIMELINE SECTION - Sophisticated Editorial Design
const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Apply",
      subtitle: "Begin your journey",
      description: "Submit credentials and certifications. Our team reviews within 48 hours with personalized feedback.",
    },
    {
      number: "02",
      title: "Profile",
      subtitle: "Showcase expertise",
      description: "Build a comprehensive profile highlighting your specializations, achievements, and industry focus.",
    },
    {
      number: "03",
      title: "Match",
      subtitle: "Intelligent pairing",
      description: "Our AI algorithm connects you with enterprise clients perfectly aligned to your qualifications.",
    },
    {
      number: "04",
      title: "Execute",
      subtitle: "Deliver excellence",
      description: "Conduct audits with enterprise-grade digital tools, real-time support, and quality protocols.",
    },
    {
      number: "05",
      title: "Earn",
      subtitle: "Premium rewards",
      description: "Receive competitive compensation with transparent terms and 14-day payment processing.",
    },
  ];

  return (
    <section ref={ref} className="py-32 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header - Asymmetric */}
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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95] tracking-tight">
              Partnership
              <br />
              <span className="font-medium">Journey</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              A refined pathway from application to your first premium engagement—designed for professionals who value excellence.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-8 text-foreground font-medium group"
            >
              Begin Application
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Steps - Horizontal Accordion */}
        <div className="relative">
          {/* Top border */}
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
                    <span className={`text-7xl md:text-8xl font-extralight transition-colors duration-300 text-primary ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-40'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-12 md:mt-20">
                    <span className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-muted-foreground'
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

// QUALIFICATIONS SECTION
const QualificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const qualifications = [
    {
      icon: Award,
      title: "Professional Certification",
      description: "CPA, CIA, or equivalent international audit certification",
    },
    {
      icon: Briefcase,
      title: "Proven Experience",
      description: "5+ years in professional auditing with enterprise clients",
    },
    {
      icon: CheckCircle,
      title: "Excellent Record",
      description: "Clean professional standing with verified references",
    },
    {
      icon: ShieldCheck,
      title: "Insurance Coverage",
      description: "Professional liability insurance with adequate coverage",
    },
    {
      icon: Search,
      title: "Background Verification",
      description: "Comprehensive screening and credential verification",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Active CPE credits and professional development",
    },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            Professional Standards
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {qualifications.map((qual, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <qual.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                {qual.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">{qual.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TECHNOLOGY FEATURES SECTION WITH HORIZONTAL SCROLL
const TechnologyFeaturesSection = () => {
  const isMobile = useIsMobile();

  const features = [
    { 
      icon: Smartphone, 
      title: "Mobile Platform", 
      description: "Manage audits on the go with our comprehensive mobile application. Access all features, documents, and client communication from anywhere.",
      gradient: "from-[#B2CDBC] to-[#A0B9A9]",
      image: auditorFemaleAfrican,
      tags: ["iOS", "Android"]
    },
    { 
      icon: Zap, 
      title: "AI Matching", 
      description: "Smart client connections powered by advanced algorithms that match your expertise with the perfect audit opportunities.",
      gradient: "from-blue-500 to-blue-700",
      image: auditorAsian,
      tags: ["AI Powered", "Smart Match"]
    },
    { 
      icon: Laptop, 
      title: "Digital Tools", 
      description: "Enterprise-grade software suite designed specifically for modern auditors. Streamline your workflow with powerful features.",
      gradient: "from-purple-500 to-purple-700",
      image: auditorFemaleEuropean,
      tags: ["Cloud Based", "Secure"]
    },
    { 
      icon: CreditCard, 
      title: "Secure Payments", 
      description: "Automated processing with bank-level security. Get paid quickly and reliably for every completed assignment.",
      gradient: "from-[#B2CDBC] to-[#A0B9A9]",
      image: auditorFemaleMiddleEast,
      tags: ["Fast", "Secure"]
    },
    { 
      icon: Calendar, 
      title: "Smart Scheduling", 
      description: "Calendar integration that syncs seamlessly with your existing tools. Never miss an appointment or deadline.",
      gradient: "from-teal-500 to-teal-700",
      image: auditorFemaleLatin,
      tags: ["Sync", "Automated"]
    },
    { 
      icon: BarChart3, 
      title: "Analytics Dashboard", 
      description: "Track performance metrics, earnings, and client feedback in real-time. Make data-driven decisions for your practice.",
      gradient: "from-orange-500 to-orange-700",
      image: auditorFemaleSouthAsian,
      tags: ["Real-time", "Insights"]
    },
    { 
      icon: Lock, 
      title: "Data Security", 
      description: "Bank-level encryption protects all your sensitive audit data and client information. Compliance guaranteed.",
      gradient: "from-slate-600 to-slate-800",
      image: auditorFemaleAfrican,
      tags: ["Encrypted", "Compliant"]
    },
    { 
      icon: MessageCircle, 
      title: "Direct Communication", 
      description: "Client messaging system built for professionals. Secure, organized, and efficient communication channels.",
      gradient: "from-blue-600 to-blue-800",
      image: auditorMaleNorthAmerica,
      tags: ["Chat", "Secure"]
    },
  ];

  // Mobile carousel
  if (isMobile) {
    return (
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-headline text-foreground mb-4">
              Enterprise Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional tools that enhance your audit efficiency
            </p>
          </motion.div>

          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-5" style={{ width: 'max-content' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-[320px] h-[400px] rounded-3xl overflow-hidden shadow-lg flex-shrink-0"
                >
                  <div className="absolute inset-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <div className="flex gap-2">
                      {feature.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version
  return <DesktopTechnologySection features={features} />;
};

// Desktop Technology Section with Large Image Cards
const DesktopTechnologySection = ({ features }: { features: any[] }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const cardWidth = 640;
  const gap = 24;
  const numCards = features.length;
  const totalCardsWidth = (cardWidth * numCards) + (gap * (numCards - 1));
  const scrollDistance = -(totalCardsWidth - cardWidth - 50);
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollDistance]
  );

  return (
    <section 
      ref={sectionRef}
      data-nav-theme="light"
      className="relative h-[150vh] bg-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-8">
        
        {/* Header */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 mb-8 flex-shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-4"
          >
            Enterprise Technology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-6 max-w-2xl"
          >
            Professional tools that enhance your audit efficiency. Our comprehensive platform provides everything you need to succeed.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-colors"
          >
            Explore Features
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Large Image Cards Container */}
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full flex items-center">
            <motion.div 
              style={{ x }}
              className="flex gap-6 pl-6 md:pl-12 lg:pl-20 pr-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="relative w-[600px] lg:w-[640px] h-[700px] lg:h-[750px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex gap-2 mb-4">
                      {feature.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed max-w-md">{feature.description}</p>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div 
          className="container mx-auto px-6 md:px-12 lg:px-20 mt-6 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Scroll to explore</span>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
          
          <div className="max-w-md">
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <motion.div 
                style={{ 
                  scaleX: scrollYProgress,
                  transformOrigin: 'left'
                }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// DO/DON'T TOGGLE SECTION
const DoVsDontSection = () => {
  const [isDoState, setIsDoState] = useState(false); // Start with "don't partner" state
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const doContent = [
    {
      icon: TrendingUp,
      title: "Premium Compensation",
      description: "€2,500+ per assignment with transparent pricing that reflects your professional expertise and certification level"
    },
    {
      icon: Target,
      title: "Strategic Matching",
      description: "AI-powered system connects you with premium clients that perfectly match your specialization and experience"
    },
    {
      icon: Shield,
      title: "Quality Standards",
      description: "Realistic timelines and workload that respect audit quality and professional standards without time pressure"
    },
    {
      icon: Building2,
      title: "Elite Client Network",
      description: "Work with global leaders who value professional excellence and maintain the highest quality standards"
    },
    {
      icon: BookOpen,
      title: "Professional Growth",
      description: "Continuous development opportunities, industry recognition, and mentorship from experienced auditors"
    },
    {
      icon: Zap,
      title: "Modern Platform",
      description: "Enterprise-grade digital tools handling scheduling, documentation, payments, and client communication seamlessly"
    },
  ];

  const dontContent = [
    {
      icon: DollarSign,
      title: "Race-to-Bottom Pricing",
      description: "Traditional platforms and firms take significant cuts, leaving you with low fees that don't reflect your expertise"
    },
    {
      icon: Calendar,
      title: "Inconsistent Workload",
      description: "Unpredictable client flow and income instability make it difficult to build a sustainable audit practice"
    },
    {
      icon: X,
      title: "Time Pressure",
      description: "Unrealistic deadlines and high-volume expectations compromise audit quality and professional standards"
    },
    {
      icon: Users,
      title: "Limited Opportunities",
      description: "Geographic constraints and lack of client diversity restrict your professional growth and earning potential"
    },
    {
      icon: Search,
      title: "No Career Support",
      description: "Isolation from professional community with no mentorship, training, or development resources available"
    },
    {
      icon: Lock,
      title: "Outdated Systems",
      description: "Manual processes, paperwork burden, and legacy software create inefficiency and administrative headaches"
    },
  ];

  const currentContent = isDoState ? doContent : dontContent;

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Main Headline with Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <h2 className="section-headline text-foreground">
              When auditors
            </h2>
            
            <motion.span
              key={isDoState ? 'do' : 'dont'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`section-headline ${
                isDoState ? 'text-primary' : 'text-destructive'
              }`}
            >
              {isDoState ? 'partner' : "don't partner"}
            </motion.span>

            {/* Toggle Switch */}
            <button
              onClick={() => setIsDoState(!isDoState)}
              className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                isDoState ? 'bg-primary' : 'bg-muted-foreground'
              }`}
              aria-label="Toggle between partner and don't partner"
            >
              <motion.div
                className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-lg"
                animate={{ x: isDoState ? 40 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <h2 className="section-headline text-foreground">
              with us.
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Partner with us
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Animated Grid */}
        <motion.div layout className="relative">
          <motion.div
            key={isDoState ? 'do' : 'dont'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {currentContent.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${isDoState ? 'do' : 'dont'}-${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isDoState 
                      ? 'bg-primary/10' 
                      : 'bg-destructive/10'
                  }`}>
                    <Icon className={`w-7 h-7 ${isDoState ? 'text-primary' : 'text-destructive'}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

// SUCCESS STORIES SECTION
const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const testimonials = [
    {
      name: "Dr. Michael Wagner",
      role: "Lead Auditor, ISO & VDA",
      years: "8 years experience",
      stats: { revenue: "€320K+ Earned", audits: "85 Assignments", rating: "5.0★" },
      quote: "YVOO transformed my practice. Working with premium clients has elevated my professional standing while providing exceptional compensation and meaningful work.",
      image: auditorEuropean,
    },
    {
      name: "Sarah Chen, CPA",
      role: "Quality Systems Auditor",
      years: "12 years experience",
      stats: { revenue: "€450K+ Earned", audits: "127 Assignments", rating: "4.9★" },
      quote: "The caliber of clients and the professional respect shown is unmatched. I finally have the sustainable practice I always wanted with work-life balance.",
      image: auditorAsian,
    },
    {
      name: "James Okonkwo, CIA",
      role: "Industrial Audit Specialist",
      years: "10 years experience",
      stats: { revenue: "€385K+ Earned", audits: "98 Assignments", rating: "5.0★" },
      quote: "From application to first assignment with a premium enterprise client took just one week. The professional development support is exceptional.",
      image: auditorAfrican,
    },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            Partner Success Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{testimonial.stats.revenue.split(' ')[0]}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.stats.revenue.split(' ')[1]}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{testimonial.stats.audits.split(' ')[0]}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.stats.audits.split(' ')[1]}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">
                    {testimonial.stats.rating}
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>
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

// SCROLL-ZOOM SECTION
const ScrollZoomSection = () => {
  const sectionRef = useRef(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Image scale transforms based on scroll - stronger animations
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.4, 1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.7]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5], [2, 0]);
  
  // Content animations - more dramatic movement
  const contentY = useTransform(scrollYProgress, [0.2, 0.5], [80, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading Text */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-headline text-foreground mb-4">
            Join Elite Auditors
          </h2>
          <h3 className="section-headline text-primary mb-6">
            Shape Industry Standards
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partner with YVOO to serve companies with the highest quality standards worldwide. Build your professional practice with meaningful assignments, premium compensation, and recognition from global industry leaders.
          </p>
        </div>

        {/* Rounded Image Container with Overlay */}
        <motion.div 
          style={{ opacity: imageOpacity }}
          className="relative w-full max-w-6xl mx-auto rounded-[60px] md:rounded-[80px] overflow-hidden shadow-2xl"
        >
          <motion.img
            style={{ scale: imageScale, rotate: imageRotate }}
            src={auditorFactoryTeam}
            alt="Professional auditors working together in industrial setting"
            className="w-full h-[460px] md:h-[610px] lg:h-[710px] xl:h-[760px] object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          
          {/* Content Overlay */}
          <motion.div 
            style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12"
          >
            {/* Navigation Dots */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white" />
                <div className="w-3 h-3 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Headline */}
            <h4 className="section-headline text-white max-w-4xl mb-6">
              Audit Excellence Starts Here
            </h4>
            
            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl mb-8">
              Access premium audit assignments from global leaders who maintain the highest quality standards. Build your reputation with quality-focused engagements and professional development support.
            </p>
            
            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#14B8A6] text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 hover:bg-[#0F8775] transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Apply as Partner Auditor
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Auditors;