import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InfiniteScrollingGallery from "@/components/InfiniteScrollingGallery";
import { ArrowRight, CheckCircle2, Shield, Zap, BarChart3, Award, TrendingDown, Clock, Target } from "lucide-react";

const ScanProPlus = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Green gradient */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-20 sm:py-24 lg:py-32"
        style={{ background: "linear-gradient(135deg, rgb(15, 135, 117), rgb(20, 184, 166), rgb(45, 212, 191))" }}
        id="hero"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-start justify-center space-y-6 md:space-y-8 text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-[68px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                AI-powered supplier audits in days, not weeks
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col space-y-4 text-white mb-12"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">Fixed price from €700</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">3 days instead of 3 weeks</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg font-normal leading-[1.6]">70% cost reduction</span>
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
                  Schedule demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-white/90 max-w-[600px] leading-[1.5] opacity-90"
              >
                <strong>ScanPro+ combines AI, computer vision, and a global auditor network</strong> to deliver standardized, comprehensive supplier audits at a fraction of traditional costs — with actionable business intelligence instead of just checklists.
              </motion.p>
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
              ScanPro+ — AI-Powered Supplier Audits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900"
            >
              <span className="text-[#14B8A6]">Always ground truth</span> — Reliable data for informed decisions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            >
              Traditional supplier audits cost €15,000-25,000 and take weeks. You get inconsistent assessments, delayed insights, and incomplete documentation — all while your team wastes time on coordination.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Product Overview Section - Dark gradient */}
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
                title: "Book Auditor",
                desc: "AI matches you with certified auditor in 90+ countries",
                detail: "Same-day or next-day availability. Fixed transparent pricing from €700. Smart matching based on industry expertise and location.",
              },
              {
                number: 2,
                title: "AI-Guided Audit",
                desc: "Standardized execution with computer vision and real-time updates",
                detail: "AI-powered equipment recognition. Live progress tracking. Automatic photo categorization. Consistent evaluation framework across all audits.",
              },
              {
                number: 3,
                title: "Instant Intelligence",
                desc: "Receive comprehensive report in 24h with actionable insights",
                detail: "Real-time findings during audit. Final report with benchmarking, risk scoring, and corrective action plans. Full audit trail and compliance documentation.",
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-4">
              <span className="text-[#14B8A6]">9 AI Features</span> for Strategic Assessment
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              From flexible templates to predictive risk scoring — everything you need for modern quality management
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
              <span className="text-[#14B8A6]">Measurable</span> Impact.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto">
              ROI calculation for 20 supplier audits per year
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: <TrendingDown className="w-8 h-8" />,
                value: "70%",
                label: "Cost Reduction",
                desc: "€400,000 → €14,000 annually",
                color: "text-green-400",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                value: "80%",
                label: "Time Savings",
                desc: "280 work days saved per year",
                color: "text-blue-400",
              },
              {
                icon: <Target className="w-8 h-8" />,
                value: "100%",
                label: "Consistency",
                desc: "AI-standardized evaluations",
                color: "text-purple-400",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                value: "24h",
                label: "Final Report",
                desc: "Same-day audits available",
                color: "text-amber-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className={`flex justify-center mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#14B8A6]" />
                Quality Improvement
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Uniform methodology for all assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>AI-powered critical risk detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Continuous improvement tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Data-driven supplier decisions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-[#14B8A6]" />
                Efficiency Gains
              </h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>50% faster audit execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Automatic real-time report generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Integrated corrective action tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-0.5" />
                  <span>Shorter time-to-market for suppliers</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases - Light gradient */}
      <section
        data-nav-theme="light"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-4">
              Industry-Specific <span className="text-[#14B8A6]">Use Cases</span>
            </h2>
          </motion.div>

          <div className="grid gap-8">
            {[
              {
                icon: "🚗",
                title: "Automotive: PPAP Validation & Tool Audits",
                challenge: "Qualify new Tier-2 supplier for precision parts",
                solution: "Complete First Article Inspection • IATF 16949 development • VDA 6.3 process assessment • ERP integration",
                result: "Qualification in 3 days instead of 3 weeks"
              },
              {
                icon: "✈️",
                title: "Aerospace: AS9100 Compliance & Process Validation",
                challenge: "Validate welding process for critical aircraft components",
                solution: "Welding qualification • Material tracking • AS9100 reporting • Critical parameter monitoring",
                result: "Complete documentation with full traceability"
              },
              {
                icon: "💊",
                title: "Pharma: GMP Audits & Clean Room Assessments",
                challenge: "GMP audit of API manufacturer before contract",
                solution: "Sterilization validation • Clean Room classification • FDA-compliant documentation • Change Control",
                result: "Complete compliance documentation in 24h"
              },
              {
                icon: "🏭",
                title: "Chemical: REACH Compliance & Process Safety",
                challenge: "Safety assessment of chemical plant",
                solution: "Plant safety inspection • REACH compliance check • Risk assessment • COMAH/Seveso documentation",
                result: "Comprehensive risk analysis with action plans"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Challenge</span>
                        <p className="text-gray-700 mt-1">{useCase.challenge}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">ScanPro+ Solution</span>
                        <p className="text-gray-700 mt-1">{useCase.solution}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <span className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wide">Result</span>
                        <p className="text-gray-900 font-semibold mt-1">{useCase.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Standards - Dark */}
      <section
        data-nav-theme="dark"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-white mb-6">
              🏆 <span className="text-[#14B8A6]">Compliance</span> & Standards
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Meets highest international quality and safety standards. Your audits are legally secure and comply with all industry-specific requirements.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['ISO 9001', 'IATF 16949', 'AS9100', 'ISO 14001', 'GMP', 'API Q1', 'SQF', 'VDA 6.3', 'TS16949', 'GDPR', 'SOC2', 'FDA'].map((standard, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold text-white border border-white/20 hover:bg-white/20 transition-all"
              >
                {standard}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Light gradient */}
      <section
        data-nav-theme="light"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="pricing"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-4">
              <span className="text-[#14B8A6]">Transparent</span> Pricing.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Fixed prices, no hidden costs. Pay only for what you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Essential",
                price: "€700",
                desc: "Basic supplier audit",
                features: [
                  "1-day on-site audit",
                  "Standard template",
                  "Basic report",
                  "Photo documentation",
                  "Digital delivery"
                ]
              },
              {
                name: "Professional",
                price: "€1,500",
                desc: "Comprehensive assessment",
                features: [
                  "2-3 day audit",
                  "Custom templates",
                  "AI equipment recognition",
                  "Risk scoring",
                  "Benchmarking",
                  "24h report delivery"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "Full integration",
                features: [
                  "Multi-site audits",
                  "ERP integration",
                  "Dedicated support",
                  "Template marketplace",
                  "API access",
                  "Volume discounts"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 ${
                  plan.highlighted 
                    ? 'bg-[#14B8A6] text-white shadow-2xl scale-105' 
                    : 'bg-white text-gray-900 shadow-lg'
                } border-2 ${plan.highlighted ? 'border-[#14B8A6]' : 'border-gray-200'}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-3">{plan.price}</div>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-[#14B8A6]'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-[#14B8A6] hover:bg-gray-100'
                    : 'bg-[#14B8A6] text-white hover:bg-[#0F8775]'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        data-nav-theme="dark"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(15, 135, 117), rgb(20, 184, 166), rgb(45, 212, 191))" }}
        id="cta"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Ready for the Future of Supplier Auditing?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Join leading companies from Automotive, Aerospace, and Pharma who already trust YVOO ScanPro+
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="mailto:ibrandic@yvoo.io"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all group"
              >
                Schedule Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:ibrandic@yvoo.io"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white hover:bg-white/20 transition-all"
              >
                Start Pilot Audit
              </a>
            </div>

            <div className="pt-12 mt-12 border-t border-white/30">
              <p className="text-white/90 mb-2"><strong>Ivo Brandic</strong>, CEO YVOO Technologies Ltd.</p>
              <p className="text-white/80">
                📧 <a href="mailto:ibrandic@yvoo.io" className="hover:underline">ibrandic@yvoo.io</a> • 
                📱 +49 (0)152 03095799
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScanProPlus;
