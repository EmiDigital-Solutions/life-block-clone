import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
  BarChart,
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

const Auditors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const auditorProfiles = [
    { image: auditorEuropean, name: "Senior Auditor", specialty: "ISO 9001 & VDA", gradient: "from-green-600 via-green-700 to-green-800" },
    { image: auditorAsian, name: "Lead Auditor", specialty: "IATF 16949", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: auditorAfrican, name: "Principal Auditor", specialty: "Quality Systems", gradient: "from-gray-800 via-gray-900 to-black" },
  ];

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
    setActiveIndex((prev) => (prev + 1) % 3);
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
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-20"
          style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Content */}
              <div className="flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold text-white leading-tight"
                >
                  Join the Elite Auditor Network
                  <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl">for Global Industry Leaders</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-white/90 font-sans"
                >
                  Partner with Connectimus to serve BMW, Mercedes-Benz, Linde, and other Fortune 500 companies. Build your professional practice with meaningful assignments, premium compensation, and industry recognition.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col gap-3 text-white"
                >
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span className="text-lg font-medium">Premium Enterprise Clients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span className="text-lg font-medium">€2,500+ Average Assignment Value</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5" />
                    <span className="text-lg font-medium">Professional Development Support</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex justify-center lg:justify-start"
                >
                  <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 text-lg min-h-[48px]">
                    Apply as Partner Auditor
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid grid-cols-3 gap-6 pt-4"
                >
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-white/80">Partner Auditors</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-white">90+</div>
                    <div className="text-sm text-white/80">Countries</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-white">4.9★</div>
                    <div className="text-sm text-white/80">Client Rating</div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Animated Auditor Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center lg:justify-end order-first lg:order-last"
              >
                <div 
                  className="relative w-full max-w-2xl"
                  style={{ perspective: "1500px" }}
                >
                  <div className="absolute inset-0 blur-3xl bg-white/10 scale-150 -z-10"></div>
                  
                  <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center">
                    {auditorProfiles.map((auditor, index) => {
                      const style = getCardStyle(index, 3);
                      
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
                            delay: isFanned ? index * (isMobile ? 0.25 : 0.12) : (3 - index) * 0.08,
                            ease: [0.33, 1, 0.68, 1],
                            type: "tween",
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            willChange: "transform, opacity",
                          }}
                        >
                          <div
                            className={`relative w-44 h-56 sm:w-52 sm:h-64 lg:w-56 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                            style={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex items-center justify-center pt-4 sm:pt-6">
                              <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-white/10">
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

                            <div className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-0 right-0 flex justify-center px-3 sm:px-4">
                              <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 w-full">
                                <p className="text-white font-sans font-bold text-xs sm:text-sm text-center">
                                  {auditor.name}
                                </p>
                                <p className="text-white/80 font-sans text-[10px] sm:text-xs text-center">
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
        </section>

        {/* Client Logo Section */}
        <section
          data-nav-theme="light"
          className="relative py-16 px-6 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
        >
          <div className="container mx-auto">
            <div className="text-center space-y-8">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 text-sm font-medium"
              >
                Trusted by Global Industry Leaders
              </motion.p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
                {["BMW", "MERCEDES-BENZ", "LINDE", "BOSCH", "SIEMENS"].map((name, index) => (
                  <motion.div 
                    key={name} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center h-20 bg-white/50 rounded-lg hover:bg-white transition-all px-4"
                  >
                    <span className="text-base lg:text-lg font-bold text-gray-700">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <ValuePropositionSection />

        {/* How It Works Timeline */}
        <TimelineSection />

        {/* Qualifications Section */}
        <QualificationsSection />

        {/* Technology Features */}
        <TechnologyFeaturesSection />

        {/* Problems We Solve */}
        <ProblemsSection />

        {/* Success Stories */}
        <SuccessStoriesSection />

        {/* Final CTA Section */}
        <section 
          data-nav-theme="dark"
          className="py-20 px-4"
          style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Build Your Professional Practice?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-10"
            >
              Join an elite network of certified auditors serving Fortune 500 companies with professional excellence and sustainable growth
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="px-12 py-4 text-lg bg-white text-gray-900 rounded-full font-semibold hover:bg-opacity-90 transition-all">
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
            className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all z-50"
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
      description: "Work with Fortune 500 companies and industry leaders who value audit quality and professional expertise",
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
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Professional Partnership</span> Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connectimus connects certified auditors with quality-focused enterprises. 
            We prioritize professional standards, strategic partnerships, and career development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
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
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Partnership Journey</span>
          </h2>
          <p className="text-xl text-gray-600">
            Five steps to join the elite auditor network
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2 }}
            className="absolute left-8 top-0 w-1 bg-green-300 hidden md:block"
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
                className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10"
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
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Professional Standards</span>
          </h2>
          <p className="text-xl text-gray-600">
            Excellence requirements that ensure client trust and audit quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
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

// TECHNOLOGY FEATURES SECTION
const TechnologyFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    { icon: Smartphone, title: "Mobile Platform", desc: "Manage audits on the go", gradient: "from-green-500 to-green-700" },
    { icon: Zap, title: "AI Matching", desc: "Smart client connections", gradient: "from-blue-500 to-blue-700" },
    { icon: Laptop, title: "Digital Tools", desc: "Enterprise-grade software", gradient: "from-purple-500 to-purple-700" },
    { icon: CreditCard, title: "Secure Payments", desc: "Automated processing", gradient: "from-green-600 to-green-800" },
    { icon: Calendar, title: "Smart Scheduling", desc: "Calendar integration", gradient: "from-teal-500 to-teal-700" },
    { icon: BarChart, title: "Analytics Dashboard", desc: "Track performance metrics", gradient: "from-amber-500 to-amber-700" },
    { icon: Lock, title: "Data Security", desc: "Bank-level encryption", gradient: "from-gray-600 to-gray-800" },
    { icon: MessageCircle, title: "Direct Communication", desc: "Client messaging system", gradient: "from-blue-600 to-blue-800" },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Enterprise Technology</span>
          </h2>
          <p className="text-xl text-gray-600">
            Professional tools that enhance your audit efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: Math.random() * 0.5,
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 text-white shadow-lg`}
            >
              <feature.icon className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/90 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PROBLEMS SECTION
const ProblemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const comparisons = [
    { problem: "Low audit fees and race-to-bottom pricing", solution: "Premium compensation reflecting your expertise (€2,500+ per assignment)" },
    { problem: "Inconsistent workload and income instability", solution: "Steady flow of enterprise clients through strategic matching" },
    { problem: "Time pressure compromising audit quality", solution: "Realistic timelines that maintain professional standards" },
    { problem: "Administrative burden and outdated systems", solution: "Modern platform handling logistics, payments, and documentation" },
    { problem: "Limited career growth and recognition", solution: "Professional development opportunities and industry visibility" },
    { problem: "Isolation from professional community", solution: "Network with elite auditors serving Fortune 500 companies" },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Professional Challenges</span> We Address
          </h2>
          <p className="text-xl text-gray-600">
            Moving beyond traditional audit industry problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Challenges</h3>
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item.problem}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Solutions</h3>
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{item.solution}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
      quote: "Connectimus transformed my practice. Working with BMW and Mercedes-Benz has elevated my professional standing while providing premium compensation and meaningful work.",
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
      quote: "From application to first assignment with a Fortune 500 company took just one week. The professional development support is exceptional.",
      image: auditorAfrican,
    },
  ];

  return (
    <section 
      ref={ref} 
      data-nav-theme="light"
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Partner Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real auditors, exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600">
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
                  <div className="text-xl font-bold text-green-600">{testimonial.stats.revenue.split(' ')[0]}</div>
                  <div className="text-xs text-gray-500">{testimonial.stats.revenue.split(' ')[1]}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{testimonial.stats.audits.split(' ')[0]}</div>
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
      a: "Unlike gig platforms that prioritize volume and speed, Connectimus focuses on quality partnerships with Fortune 500 clients. We provide sustainable workloads, premium compensation, professional development opportunities, and long-term client relationships—not one-off assignments with time pressure."
    },
    {
      q: "What types of clients will I work with?",
      a: "Our partner auditors work with global industry leaders including BMW, Mercedes-Benz, Linde, Bosch, and Siemens. These enterprise clients value audit quality, professional standards, and long-term partnerships. All assignments are with established companies requiring certified professional auditors."
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
      className="py-24 px-6 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-green-600">Frequently Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
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

export default Auditors;