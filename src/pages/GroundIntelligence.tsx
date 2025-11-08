import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InfiniteScrollingGallery from "@/components/InfiniteScrollingGallery";
import SphereImageGrid, { ImageData } from "@/components/SphereImageGrid";
import { ArrowRight, Clock, Target, Award, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";

// Import auditor images from homepage
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorFemaleOceania from "@/assets/auditor-female-oceania.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";

const GroundIntelligence = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Sphere images data - Using auditor images from homepage
  const sphereImages: ImageData[] = [
    { id: '1', src: auditorEuropean, alt: 'European Auditor', title: 'Europe' },
    { id: '2', src: auditorAsian, alt: 'Asian Auditor', title: 'East Asia' },
    { id: '3', src: auditorFemaleAfrican, alt: 'African Auditor', title: 'Africa' },
    { id: '4', src: auditorLatin, alt: 'Latin American Auditor', title: 'Americas' },
    { id: '5', src: auditorMiddleEast, alt: 'Middle East Auditor', title: 'Middle East' },
    { id: '6', src: auditorSouthAsian, alt: 'South Asian Auditor', title: 'South Asia' },
    { id: '7', src: auditorFemaleEuropean, alt: 'European Female Auditor', title: 'Europe' },
    { id: '8', src: auditorFemaleAsian, alt: 'Asian Female Auditor', title: 'East Asia' },
    { id: '9', src: auditorAfrican, alt: 'African Male Auditor', title: 'Africa' },
    { id: '10', src: auditorFemaleLatin, alt: 'Latin American Female Auditor', title: 'Americas' },
    { id: '11', src: auditorFemaleMiddleEast, alt: 'Middle East Female Auditor', title: 'Middle East' },
    { id: '12', src: auditorFemaleSouthAsian, alt: 'South Asian Female Auditor', title: 'South Asia' },
    { id: '13', src: auditorFemaleOceania, alt: 'Oceania Female Auditor', title: 'Oceania' },
    { id: '14', src: auditorMaleNorthAmerica, alt: 'North American Male Auditor', title: 'North America' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Green gradient like BeFound */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-20 sm:py-24 lg:py-32"
        style={{ background: "linear-gradient(135deg, rgb(15, 135, 117), rgb(20, 184, 166), rgb(45, 212, 191))" }}
        id="hero"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col items-start justify-center space-y-6 md:space-y-8 text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-[68px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                Transform supplier data into strategic advantage
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col space-y-4 text-white mb-12"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">Real-time monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">Predictive analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">Risk scoring</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full sm:w-auto mb-10"
              >
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all duration-300"
                >
                  Schedule consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-white/90 max-w-[600px] leading-[1.5] opacity-90"
              >
                <strong>Ground Intelligence combines on-site audits, IoT sensors, and AI analytics</strong> to give you real-time visibility into supplier performance, capacity, and risk — before issues impact your operations.
              </motion.p>
            </div>

            {/* Right Column - 3D Sphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center"
            >
              <SphereImageGrid
                images={sphereImages}
                containerSize={550}
                sphereRadius={220}
                autoRotate={true}
                autoRotateSpeed={0.2}
                dragSensitivity={0.6}
                baseImageScale={0.22}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section
        data-nav-theme="light"
        className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 text-xs sm:text-sm font-medium"
            >
              Ground Intelligence — Real-time supplier visibility
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900"
            >
              See <span className="text-[#14B8A6]">beyond the surface</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            >
              Traditional supplier monitoring relies on quarterly reports and annual audits — by the time you spot a problem, it's already affecting production.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Product Overview Section - Dark gradient like BeFound */}
      <section
        data-nav-theme="dark"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="how"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mb-4">
              <span className="text-[#14B8A6]">How It</span> Works.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                number: 1,
                title: "Deploy & Connect",
                desc: "Install IoT sensors and integrate with existing systems",
                detail: "Set up real-time monitoring infrastructure across your supplier network. Connect with ERP, MES, QMS systems for comprehensive data collection.",
              },
              {
                number: 2,
                title: "Monitor & Analyze",
                desc: "AI processes real-time data streams for patterns and anomalies",
                detail: "Advanced AI algorithms continuously analyze supplier data, detecting early warning signs and predicting potential issues before they impact production.",
              },
              {
                number: 3,
                title: "Act & Optimize",
                desc: "Receive alerts, insights, and recommendations instantly",
                detail: "Get actionable intelligence delivered in real-time. Make data-driven decisions with confidence using predictive analytics and risk scoring.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 h-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#14B8A6] flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                      {step.number}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg text-white/90 mb-2 sm:mb-3 font-medium">{step.desc}</p>
                  <p className="text-sm sm:text-base text-white/70">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Infinite Scrolling Gallery */}
      <section 
        data-nav-theme="light" 
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="capabilities"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 px-4 sm:px-6 lg:px-12 xl:px-24"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-3 sm:mb-4">
              Capabilities that modernize supplier audits
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Nine AI-driven features for consistent, actionable outcomes.
            </p>
          </motion.div>

          <InfiniteScrollingGallery />
        </div>
      </section>

      {/* Results Section - Dark gradient */}
      <section 
        data-nav-theme="dark" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="results"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mb-4">
              <span className="text-[#14B8A6]">Results</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { metric: "−85%", label: "Lead time for issue detection" },
              { metric: "92%", label: "Accuracy in delay prediction" },
              { metric: "3.2x", label: "Faster response to supplier risks" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl 2xl:text-8xl font-bold text-[#14B8A6] mb-2 sm:mb-3">
                  {item.metric}
                </div>
                <p className="text-sm sm:text-base xl:text-base 2xl:text-xl 3xl:text-2xl text-white/90 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - 3 Plans */}
      <section 
        data-nav-theme="light" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="pricing"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-4">
              <span className="text-[#14B8A6]">Pricing</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: "Pilot", 
                description: "Single-supplier deployment",
                features: ["Monitor one critical supplier", "6-month engagement", "Training included"]
              },
              { 
                name: "Network", 
                description: "Multi-supplier program",
                features: ["Up to 10 suppliers", "Comparative analytics", "Dedicated analyst"],
                highlighted: true
              },
              { 
                name: "Enterprise", 
                description: "Organization-wide intelligence",
                features: ["Unlimited suppliers", "Custom integrations", "Strategic advisory"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl border ${
                  plan.highlighted 
                    ? 'bg-white border-[#14B8A6] shadow-lg sm:transform sm:scale-105 border-2' 
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{plan.description}</p>
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        data-nav-theme="dark" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="cta"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-white">
              Ready for <span className="text-[#14B8A6]">real-time supplier intelligence?</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-3xl 3xl:text-4xl text-white/80">
              See how Ground Intelligence transforms supplier management.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-opacity-90 shadow-xl min-h-[48px]">
                Schedule consultation
              </button>
              <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 min-h-[48px]">
                View demo
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroundIntelligence;