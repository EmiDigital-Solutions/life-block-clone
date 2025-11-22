import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Users,
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
  ArrowUp
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorFemaleOceania from "@/assets/auditor-female-oceania.jpg";
import auditorBlonde7 from "@/assets/auditor-blonde-7.jpg";
import digitalCollaboration from "@/assets/digital-collaboration.jpg";
import auditorFactoryTeam from "@/assets/auditor-factory-team.png";

const Auditors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const allAuditorProfiles = [
    { image: auditorEuropean, name: "Senior Auditor", specialty: "ISO 9001 & VDA", location: "Europe", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: auditorAsian, name: "Lead Auditor", specialty: "IATF 16949", location: "East Asia", gradient: "from-[#A8C5B8] via-[#96B5AD] to-[#96B5AD]" },
    { image: auditorFemaleAfrican, name: "Principal Auditor", specialty: "Quality Systems", location: "Africa", gradient: "from-gray-800 via-gray-900 to-black" },
    { image: auditorFemaleLatin, name: "Compliance Auditor", specialty: "ISO Standards", location: "Latin America", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: auditorFemaleMiddleEast, name: "Process Auditor", specialty: "ISO 9001", location: "Middle East", gradient: "from-[#A8C5B8] via-[#96B5AD] to-[#96B5AD]" },
    { image: auditorMaleNorthAmerica, name: "Technical Auditor", specialty: "VDA 6.3", location: "North America", gradient: "from-gray-800 via-gray-900 to-black" },
  ];

  const auditorProfiles = isMobile ? allAuditorProfiles.slice(0, 3) : allAuditorProfiles;

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setIsFanned(true), isMobile ? 2000 : 1500);
      setTimeout(() => setIsFanned(false), isMobile ? 12000 : 9000);
    };

    cycle();
    const interval = setInterval(cycle, isMobile ? 16000 : 12000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % auditorProfiles.length);
  };

  const getCardStyle = (index: number, totalCards: number) => {
    const centerIndex = (totalCards - 1) / 2;
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      if (isMobile) {
        return {
          x: offset * 110,
          y: Math.abs(offset) * -20,
          rotateY: offset * -8,
          rotateZ: offset * 6,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      } else {
        return {
          x: offset * 85,
          y: Math.abs(offset) * -45,
          rotateY: offset * -8,
          rotateZ: offset * 8,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      return {
        x: isMobile ? 0 : 180,
        y: isMobile ? 0 : 80,
        rotateY: 0,
        rotateZ: isMobile ? 0 : -25,
        scale: 0.98,
        opacity: adjustedIndex === 0 ? 1 : 0,
        zIndex: totalCards - adjustedIndex,
      };
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div ref={containerRef}>
        {/* Hero Section */}
        <section
          data-nav-theme="dark"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 py-20 pb-32 sm:pb-36 lg:pb-20"
          style={{ background: "linear-gradient(135deg, rgb(150, 181, 173), rgb(168, 197, 184), rgb(186, 213, 195))" }}
        >
          <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-6 xl:gap-20 2xl:gap-28 items-center">
              
              {/* Left Column: Text Content */}
              <div className="flex flex-col space-y-6 md:space-y-8 text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
                >
                  Join the Elite Auditor Network
                  <span className="block mt-2 text-3xl md:text-4xl lg:text-6xl">for Global Industry Leaders</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg font-normal text-white/90 leading-[1.6] max-w-[600px] mb-8"
                >
                  Partner with Connectimus to serve companies with the highest quality standards and premium requirements. Build your professional practice with meaningful assignments, premium compensation, and industry recognition.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col space-y-4 text-white mb-12"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg font-normal leading-[1.6]">Premium Enterprise Clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg font-normal leading-[1.6]">€2,500+ Average Assignment Value</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg font-normal leading-[1.6]">Professional Development Support</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex relative z-10"
                >
                  <button className="group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all duration-300">
                    Apply as Partner Auditor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

              </div>

              {/* Right Column: Animated Auditor Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center lg:justify-center order-first lg:order-last"
              >
                <div 
                  className="relative w-full max-w-2xl"
                  style={{ perspective: "1500px" }}
                >
                  <div className="absolute inset-0 blur-3xl bg-white/10 scale-150 -z-10"></div>
                  
                  <div className="relative h-[375px] sm:h-[438px] lg:h-[280px] xl:h-[530px] 2xl:h-[630px] 3xl:h-[740px] flex items-center justify-center">
                    {auditorProfiles.map((auditor, index) => {
                      const style = getCardStyle(index, auditorProfiles.length);
                      
                      return (
                        <motion.div
                          key={auditor.name}
                          className="absolute cursor-pointer"
                          onClick={handleCardClick}
                          initial={false}
                          whileHover={{ scale: isFanned ? 1.05 : 1 }}
                          animate={{
                            x: style.x,
                            y: style.y,
                            rotateY: style.rotateY,
                            rotateZ: style.rotateZ,
                            scale: style.scale,
                            opacity: style.opacity,
                            zIndex: style.zIndex,
                          }}
                          transition={{
                            duration: isMobile ? 2.5 : 1.8,
                            delay: isFanned ? index * (isMobile ? 0.25 : 0.12) : (auditorProfiles.length - index) * 0.08,
                            ease: [0.33, 1, 0.68, 1],
                            type: "tween",
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            willChange: "transform, opacity",
                          }}
                        >
                          <div
                            className={`relative w-[220px] h-[280px] sm:w-[260px] sm:h-[320px] lg:w-[105px] lg:h-[135px] xl:w-[300px] xl:h-[390px] 2xl:w-[360px] 2xl:h-[460px] 3xl:w-[400px] 3xl:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                            style={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex items-center justify-center pt-4 sm:pt-6 lg:pt-3 xl:pt-9 2xl:pt-11 3xl:pt-12">
                              <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[90px] lg:h-[90px] xl:w-[185px] xl:h-[185px] 2xl:w-[215px] 2xl:h-[215px] 3xl:w-[240px] 3xl:h-[240px] rounded-full overflow-hidden border-2 border-white/10">
                                <img
                                  src={auditor.image}
                                  alt={auditor.name}
                                  className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                                />
                                <div 
                                  className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                                  style={{
                                    background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="absolute bottom-3 sm:bottom-4 lg:bottom-2 xl:bottom-7 2xl:bottom-9 3xl:bottom-12 left-0 right-0 flex justify-center px-3 sm:px-4 lg:px-2">
                              <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 lg:px-2 xl:px-7 2xl:px-9 py-1.5 sm:py-2 lg:py-1 xl:py-3 2xl:py-4 w-full">
                                <p className="text-white font-sans font-bold text-xs sm:text-sm lg:text-[9px] xl:text-base 2xl:text-xl 3xl:text-3xl text-center">
                                  {auditor.name}
                                </p>
                                <p className="text-white/80 font-sans text-[10px] sm:text-xs lg:text-[7px] xl:text-sm 2xl:text-lg 3xl:text-2xl text-center">
                                  {auditor.specialty}
                                </p>
                              </div>
                            </div>

                            <div 
                              className="absolute inset-0 pointer-events-none rounded-3xl"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Animated Company Names Band - White Background */}
          <div className="absolute bottom-0 left-0 right-0 py-4 sm:py-5 lg:py-6 overflow-hidden bg-white border-t border-gray-200 z-0">
            <div className="container mx-auto px-4">
              <div className="text-center mb-4">
                <span className="text-sm font-semibold text-gray-600">Trusted by Global Industry Leaders</span>
              </div>
              <div className="flex whitespace-nowrap">
                <motion.div
                  animate={{ x: [0, -1920] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    },
                  }}
                  className="flex items-center gap-12 pr-12"
                >
                  {[...Array(3)].map((_, index) => (
                    <div key={`auditor-band1-${index}`} className="flex items-center gap-12">
                      <span className="text-lg font-bold text-gray-800">AUTOMOTIVE</span>
                      <span className="text-lg font-bold text-gray-800">AEROSPACE</span>
                      <span className="text-lg font-bold text-gray-800">ENGINEERING</span>
                      <span className="text-lg font-bold text-gray-800">MANUFACTURING</span>
                      <span className="text-lg font-bold text-gray-800">INDUSTRIAL</span>
                      <span className="text-lg font-bold text-gray-800">TECHNOLOGY</span>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  animate={{ x: [0, -1920] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    },
                  }}
                  className="flex items-center gap-12 pr-12"
                  aria-hidden="true"
                >
                  {[...Array(3)].map((_, index) => (
                    <div key={`auditor-band2-${index}`} className="flex items-center gap-12">
                      <span className="text-lg font-bold text-gray-800">AUTOMOTIVE</span>
                      <span className="text-lg font-bold text-gray-800">AEROSPACE</span>
                      <span className="text-lg font-bold text-gray-800">ENGINEERING</span>
                      <span className="text-lg font-bold text-gray-800">MANUFACTURING</span>
                      <span className="text-lg font-bold text-gray-800">INDUSTRIAL</span>
                      <span className="text-lg font-bold text-gray-800">TECHNOLOGY</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
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

        {/* Do vs Don't Toggle Section */}
        <DoVsDontSection />

        {/* Technology Features - New Design */}
        <TechnologyFeaturesSection />

        {/* Success Stories */}
        <SuccessStoriesSection />

        {/* Final CTA Section */}
        <section 
          data-nav-theme="dark"
          className="py-16 md:py-20 px-4 md:px-6 lg:px-8"
          style={{ background: "linear-gradient(135deg, rgb(150, 181, 173), rgb(168, 197, 184), rgb(186, 213, 195))" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-6"
            >
              Ready to Build Your Professional Practice?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/90 mb-8 lg:mb-10"
            >
              Join an elite network of certified auditors serving companies with the highest quality standards, professional excellence and sustainable growth
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="px-8 md:px-10 lg:px-12 py-3 md:py-4 text-base md:text-lg bg-white text-gray-900 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Apply for Partnership
              </button>
            </motion.div>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Premium Compensation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Strategic Partnerships</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Professional Development</span>
              </div>
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
            className="fixed bottom-8 right-8 bg-[#A8C5B8] text-white p-4 rounded-full shadow-lg hover:bg-[#96B5AD] transition-all z-50"
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
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-[#A8C5B8]">Professional Partnership</span> Platform
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Connectimus connects certified auditors with quality-focused enterprises. 
            We prioritize professional standards, strategic partnerships, and career development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8C5B8] to-[#96B5AD] flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TIMELINE SECTION
const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const steps = [
    {
      number: "01",
      title: "Application & Verification",
      description: "Submit your credentials, certifications, and professional background for review",
    },
    {
      number: "02",
      title: "Profile Excellence",
      description: "Build a comprehensive profile showcasing your expertise, specializations, and achievements",
    },
    {
      number: "03",
      title: "Smart Matching",
      description: "AI-powered system matches your expertise with premium enterprise client requirements",
    },
    {
      number: "04",
      title: "Professional Auditing",
      description: "Conduct audits with enterprise-grade tools, support, and quality assurance",
    },
    {
      number: "05",
      title: "Secure Payment",
      description: "Receive premium compensation directly with transparent terms and timely processing",
    },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#A8C5B8]">Partnership Journey</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600">
            Five steps to join the elite auditor network
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2 }}
            className="absolute left-8 top-0 w-1 bg-[#A8C5B8]/30 hidden md:block"
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-6 mb-12 relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: index * 0.2,
                }}
                className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#A8C5B8] to-[#96B5AD] flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10"
              >
                {step.number}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
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
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#A8C5B8]">Professional Standards</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600">
            Excellence requirements that ensure client trust and audit quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 lg:gap-6">
          {qualifications.map((qual, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8C5B8] to-[#96B5AD] flex items-center justify-center mb-4">
                <qual.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {qual.title}
              </h3>
              <p className="text-gray-600 text-sm">{qual.description}</p>
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
      gradient: "from-[#A8C5B8] to-[#96B5AD]",
      image: auditorBlonde7,
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
      gradient: "from-[#A8C5B8] to-[#96B5AD]",
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

  // Mobile carousel - render differently
  if (isMobile) {
    return (
      <section 
        data-nav-theme="light"
        className="py-20 md:py-24 px-6"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#A8C5B8] mb-4">
              Enterprise Technology
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Professional tools that enhance your audit efficiency
            </p>
          </motion.div>

          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-5 md:gap-6" style={{ width: 'max-content' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-[300px] md:w-[320px] h-[340px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg flex-shrink-0"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={feature.image}
                      alt="Auditor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version without scroll-jacking
  return <DesktopTechnologySection features={features} />;
};

// Desktop Technology Section with Scroll Effect
const DesktopTechnologySection = ({ features }: { features: any[] }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Calculate exact scroll distance so last card reaches left edge
  const cardWidth = 340;
  const gap = 20;
  const numCards = features.length;
  
  // Total width of all cards
  const totalCardsWidth = (cardWidth * numCards) + (gap * (numCards - 1));
  
  // Distance needed to move last card to left edge
  const scrollDistance = -(totalCardsWidth - cardWidth - 50);
  
  // Transform vertical scroll to horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollDistance]
  );

  return (
    <section 
      ref={sectionRef}
      data-nav-theme="light"
      className="relative h-[120vh]"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-8">
        
        {/* Header - Fixed position, always visible */}
        <div className="text-center mb-8 px-4 flex-shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#A8C5B8] mb-3"
          >
            Enterprise Technology
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto mb-4"
          >
            Professional tools that enhance your audit efficiency. Our comprehensive platform provides everything you need to succeed.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#A8C5B8] text-white px-6 lg:px-7 xl:px-8 py-3 lg:py-3.5 xl:py-4 rounded-full font-semibold hover:bg-[#96B5AD] transition-colors shadow-lg hover:shadow-xl"
          >
            Explore Features
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Cards Container - Horizontal scroll area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Background indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A8C5B8]/20 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-600/20 z-10" />
          
          {/* Scrolling cards */}
          <div className="h-full flex items-center">
            <motion.div 
              style={{ x }}
              className="flex gap-5 lg:gap-5 xl:gap-6 pl-8 pr-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-200px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="relative w-[320px] lg:w-[330px] xl:w-[340px] h-[400px] lg:h-[410px] xl:h-[420px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group cursor-pointer"
                >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.image}
                    alt="Auditor"
                    className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div 
          className="text-center mt-6 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Scroll to explore</span>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto mt-4">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                style={{ 
                  scaleX: scrollYProgress,
                  transformOrigin: 'left'
                }}
                className="h-full bg-[#A8C5B8]"
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
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-2 mb-6"
        >
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${isDoState ? 'bg-gray-300' : 'bg-blue-600'}`} />
            <div className={`w-3 h-3 rounded-full ${isDoState ? 'bg-[#A8C5B8]' : 'bg-gray-300'}`} />
          </div>
          <span className="text-sm font-semibold text-gray-600">What Is The Difference?</span>
        </motion.div>

        {/* Main Headline with Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
              When auditors
            </h2>
            
            <motion.span
              key={isDoState ? 'do' : 'dont'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${
                isDoState ? 'text-[#A8C5B8]' : 'text-red-600'
              }`}
            >
              {isDoState ? 'partner' : "don't partner"}
            </motion.span>

            {/* Toggle Switch */}
            <button
              onClick={() => setIsDoState(!isDoState)}
              className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                isDoState ? 'bg-[#A8C5B8]' : 'bg-gray-400'
              }`}
              aria-label="Toggle between partner and don't partner"
            >
              <motion.div
                className="absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-lg"
                animate={{ x: isDoState ? 40 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
              with us.
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white pl-8 pr-3 py-3 rounded-full font-semibold text-lg flex items-center gap-4 hover:bg-blue-700 transition-all shadow-lg group"
          >
            <span>Partner with us</span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-16 max-w-3xl lg:ml-auto"
        >
          {isDoState 
            ? "Experience premium compensation, strategic partnerships, and professional growth when joining our elite auditor network."
            : "Avoid the traditional challenges that limit your practice: low fees, inconsistent work, and lack of professional development."}
        </motion.p>

        {/* Animated Grid */}
        <motion.div layout className="relative">
          <motion.div
            key={isDoState ? 'do' : 'dont'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 lg:gap-6"
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
                  whileHover={{ 
                    y: -8, 
                    boxShadow: isDoState 
                      ? '0 12px 24px rgba(34, 197, 94, 0.2)' 
                      : '0 12px 24px rgba(239, 68, 68, 0.2)'
                  }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 transition-all"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.05 + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      isDoState 
                        ? 'bg-gradient-to-br from-[#A8C5B8] to-[#96B5AD]' 
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
      quote: "Connectimus transformed my practice. Working with premium clients has elevated my professional standing while providing exceptional compensation and meaningful work.",
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
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#A8C5B8]">Partner Success Stories</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600">
            Real auditors, exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#A8C5B8] to-[#96B5AD]">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.years}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#A8C5B8]">{testimonial.stats.revenue.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">{testimonial.stats.revenue.split(' ')[1]}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-[#A8C5B8]">{testimonial.stats.audits.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">{testimonial.stats.audits.split(' ')[1]}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-amber-500 flex items-center justify-center gap-1">
                    {testimonial.stats.rating}
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
              </div>

              <p className="text-gray-600 italic leading-relaxed">
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
      a: "Partner auditors earn €2,500+ per assignment on average, with premium rates for specialized audits. Compensation is transparent, competitive, and reflects your professional expertise and certification level. Payments are processed securely within 14 days of completed audit submission."
    },
    {
      q: "How does Connectimus differ from gig economy platforms?",
      a: "Unlike gig platforms that prioritize volume and speed, Connectimus focuses on quality partnerships with premium enterprise clients who demand the highest standards. We provide sustainable workloads, premium compensation, professional development opportunities, and long-term client relationships—not one-off assignments with time pressure."
    },
    {
      q: "What types of clients will I work with?",
      a: "Our partner auditors work with global industry leaders across automotive, aerospace, engineering, and manufacturing sectors. These enterprise clients maintain the highest quality standards, value professional excellence, and seek long-term partnerships. All assignments are with established companies requiring certified professional auditors."
    },
    {
      q: "What professional development support is provided?",
      a: "Connectimus invests in partner development through CPE credit programs, specialized training workshops, industry certifications, and mentorship opportunities. We support your career growth with access to advanced audit methodologies, emerging standards, and networking with elite auditors."
    },
    {
      q: "How many assignments can I expect per month?",
      a: "Assignment frequency depends on your availability, specialization, and client demand. Most active partners complete 3-5 enterprise audits monthly, allowing for thorough work while maintaining quality standards. You have full control over accepting assignments that match your schedule and expertise."
    },
    {
      q: "What is the application and verification process?",
      a: "The partnership application involves credential verification, background screening, and professional reference checks. Most qualified candidates complete the process within 7-10 business days. We maintain high standards to ensure client trust and protect the integrity of our auditor network."
    }
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-20 md:py-24 px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#A8C5B8]">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-xl text-gray-600">
            Everything you need to know about partner auditor program
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === index ? "auto" : 0,
                  opacity: openFaq === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Join Elite Auditors
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#A8C5B8] mb-6">
            Shape Industry Standards
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partner with Connectimus to serve companies with the highest quality standards worldwide. Build your professional practice with meaningful assignments, premium compensation, and recognition from global industry leaders.
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
            <h4 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white max-w-4xl leading-tight mb-6">
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