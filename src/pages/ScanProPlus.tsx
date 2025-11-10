import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, AlertTriangle, Target, Zap, Camera, BarChart3, Shield, TrendingUp, Globe, Link as LinkIcon } from "lucide-react";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import aiCopilot from "@/assets/ai-copilot-analysis.jpg";
import aiInspector from "@/assets/ai-inspector-tech.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Flexible Template Creation",
      desc: "Create custom audit structures for specific industries, standards, or customer requirements.",
      example: "Example for Automotive: ISO 9001 template for automotive suppliers with TS16949-specific additions and industry-specific KPIs.",
      image: scanProDashboard
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Equipment Recognition",
      desc: "Point the camera at machines and get instant identification and analysis.",
      example: "Example: 'CNC Milling Machine DMG Mori' → AI automatically identifies all technical details.",
      image: aiInspector
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Dynamic Rating Systems",
      desc: "Configurable evaluation criteria with industry-specific weighting.",
      example: "Pharma Example: CleanRoom standards weighted at 40%. Automotive Example: Quality systems rated at 35%.",
      image: riskScoring
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Intelligent Evidence Management",
      desc: "Automatic categorization and analysis of audit evidence.",
      example: "Automatic photo categorization for quality control, workplace safety, environmental standards.",
      image: aiCopilot
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Progress Tracking",
      desc: "Live updates with milestone notifications during the audit.",
      example: "Example: 'Production area completed (75% of total points achieved), next step: Quality lab'",
      image: liveTracking
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
      title: "Compliance & Certifications",
      desc: "GDPR-compliant, SOC2-certified with complete audit trail.",
      example: "Supported standards: ISO 9001, IATF 16949, AS9100, ISO 14001, GMP, API Q1, SQF",
      image: aiAudit
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Risk Management",
      desc: "Early detection of critical compliance violations during the audit.",
      example: "CRITICAL Example: 'Missing calibration on 3 measuring devices detected – production release stopped'",
      image: riskScoring
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Predictive Risk Scoring",
      desc: "Risk prediction based on historical audit data.",
      example: "Example: 'Supplier shows 15% higher quality risk due to outdated testing equipment and missing maintenance protocol'",
      image: aiCopilot
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#10B981]" />,
      title: "Comparative Benchmarking",
      desc: "Comparative analysis against industry peers.",
      example: "Example: 'Your supplier achieves 87% of industry benchmarks in quality systems, but is 12% below average in environmental standards'",
      image: scanProDashboard
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Blue gradient matching GroundIntelligence */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-20 sm:py-24 lg:py-32"
        style={{ background: "linear-gradient(135deg, rgb(37, 99, 235), rgb(59, 130, 246), rgb(96, 165, 250))" }}
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
              YVOO ScanPro+
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col space-y-4 text-white mb-12"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-lg font-normal leading-[1.6]">70% time savings</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-lg font-normal leading-[1.6]">Fixed price from €700</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-lg font-normal leading-[1.6]">Real-time intelligence</span>
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
                Get started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-white/90 max-w-[600px] leading-[1.5] opacity-90"
            >
              <strong>On-site supplier audits in 3 days instead of 3 weeks</strong>, starting at <strong>€700 fixed price</strong> instead of €15,000-25,000, with <strong>actionable business intelligence</strong> instead of just checklists – powered by AI and our global auditor network.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Value Section - Light gradient */}
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
              ScanPro+ — AI-powered supplier audits
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900"
            >
              <span className="text-blue-600">Always ground truth</span> – Reliable data
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            >
              Reliable, precise data for informed business decisions in automotive, aerospace, pharma, and manufacturing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Challenge & Solution - Dark gradient */}
      <section
        data-nav-theme="dark"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="challenge"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-8 sm:mb-12"
          >
            The <span className="text-blue-400">Challenge</span> You Know
          </motion.h2>

          {/* Pain Point */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm rounded-xl p-6 sm:p-8 mb-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <h3 className="text-2xl font-bold text-white">
                Traditional Supplier Audits are Inefficient and Expensive
              </h3>
            </div>
            <p className="text-white/90 mb-4 text-lg">
              You know the problem: A standard supplier audit through TÜV or other traditional providers costs between <strong>€15,000 and €25,000</strong> per audit. Coordination takes weeks. Between request and audit appointment, 2-3 weeks often pass, the audit itself takes several days, and then you wait additional days for the report.
            </p>
            <p className="text-white/90 font-semibold mb-3 text-lg">The real problems for you as decision-maker:</p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Inconsistent assessments – each auditor has their own style</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Delayed insights – when the report arrives, the production situation has already changed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Incomplete documentation – missing photos, gaps in evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>High internal coordination costs – your employees constantly need to follow up</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>No comparability – how does your Supplier A compare to Supplier B?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>Difficult remote assessment – a real challenge in times of global supply chains</span>
              </li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#10B981]/10 border border-[#10B981]/20 backdrop-blur-sm rounded-xl p-6 sm:p-8"
          >
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
              <h3 className="text-2xl font-bold text-white">
                The YVOO ScanPro+ Solution: Modern AI Platform Meets Global Expert Network
              </h3>
            </div>
            <p className="text-white/90 mb-4 text-lg">
              We've reimagined supplier auditing – <strong>specifically for demanding quality managers</strong> in the automotive, aerospace, pharma, and manufacturing industries. Our platform combines:
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span><strong>Standardization through AI</strong> – every audit follows your specifications exactly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span><strong>Speed</strong> – 70% time savings compared to traditional methods</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span><strong>Cost transparency</strong> – Fixed prices from €700, no hidden costs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span><strong>Real-time Intelligence</strong> – Live updates during the audit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span><strong>Full Compliance</strong> – GDPR-compliant, SOC2-certified</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Features Carousel - Light gradient */}
      <section 
        data-nav-theme="light" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="features"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              <span className="text-blue-600">9 Innovative</span> AI Features
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Strategic supplier assessment powered by artificial intelligence
            </p>
          </motion.div>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-700 mb-3 flex-1">{feature.desc}</p>
                        <p className="text-sm text-gray-600 italic border-t border-gray-100 pt-3">{feature.example}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* Comparison Table - Dark gradient */}
      <section
        data-nav-theme="dark"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-8 sm:mb-12 text-center"
          >
            Direct <span className="text-blue-400">Comparison</span>
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Criteria</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Traditional Providers</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">YVOO ScanPro+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { label: "Cost per Audit", traditional: "€15,000 - €25,000", yvoo: "From €700 (Fixed Price)" },
                  { label: "Time until Audit", traditional: "2-3 weeks lead time", yvoo: "Same-Day / Next-Day possible" },
                  { label: "Audit Duration", traditional: "3-5 days on-site", yvoo: "1-3 days (structured)" },
                  { label: "Time to Report", traditional: "5-10 days after audit", yvoo: "Real-time + Final Report in 24h" },
                  { label: "Consistency", traditional: "Depends on auditor", yvoo: "AI-supported, 100% standardized" },
                  { label: "Equipment Recognition", traditional: "Manual recording, often incomplete", yvoo: "AI Computer Vision – automatic" },
                  { label: "Traceability", traditional: "Static PDF reports", yvoo: "Digital platform with audit trail" },
                  { label: "Benchmarking", traditional: "Manual, labor-intensive", yvoo: "Automatic against industry standards" },
                  { label: "Price Transparency", traditional: "Quote on request", yvoo: "Fixed prices, no hidden costs" },
                  { label: "Global Availability", traditional: "Slow coordination", yvoo: "On-Demand in 47 countries" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{row.label}</td>
                    <td className="px-6 py-4 text-red-400">{row.traditional}</td>
                    <td className="px-6 py-4 text-[#10B981] font-semibold">{row.yvoo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Calculator - Light gradient */}
      <section
        data-nav-theme="light"
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              <span className="text-blue-600">ROI</span> Calculation
            </motion.h2>
            <p className="text-xl text-gray-700 mb-8">
              Assuming your company conducts <strong>20 supplier audits per year</strong>:
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-6 border-b-2 border-gray-200">
                <div className="text-xl font-semibold text-gray-900">Traditional Audit Costs (20 × €20,000)</div>
                <div className="text-3xl font-bold text-gray-900">€400,000</div>
              </div>
              
              <div className="flex justify-between items-center py-6 border-b-2 border-gray-200">
                <div className="text-xl font-semibold text-gray-900">YVOO ScanPro+ Costs (20 × €700)</div>
                <div className="text-3xl font-bold text-gray-900">€14,000</div>
              </div>
              
              <div className="bg-[#10B981]/10 border-2 border-[#10B981]/30 rounded-xl p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-2xl font-bold text-gray-900">💰 Your Annual Cost Savings</div>
                  <div className="text-5xl font-bold text-[#10B981]">€386,000</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-6">
                <div className="text-xl font-semibold text-gray-900">Time Savings (70% of 2 weeks per audit)</div>
                <div className="text-3xl font-bold text-blue-600">280 Work Days</div>
              </div>
            </div>

            <p className="text-gray-600 mt-8">
              <strong>Additional Savings:</strong> No travel costs for internal auditors, 
              reduced rework through standardized reports, faster supplier releases 
              enable shorter time-to-market.
            </p>
          </div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-4">
              Business <span className="text-blue-400">Impact</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
            {[
              { metric: "60%", label: "Cost Reduction", color: "text-[#10B981]" },
              { metric: "70%", label: "Time Savings", color: "text-blue-400" },
              { metric: "100%", label: "Consistency", color: "text-blue-400" },
              { metric: "24h", label: "Availability", color: "text-[#10B981]" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${item.color} mb-2 sm:mb-3`}>
                  {item.metric}
                </div>
                <p className="text-sm sm:text-base text-white/90 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Quality Improvement
              </h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Uniform methodology for all supplier assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>AI-supported detection of critical risks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Continuous improvement tracking over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Data-based supplier decisions</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#10B981]" />
                Efficiency Gains
              </h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>50% faster audit execution through template-based workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>Automatic report generation in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>Integrated tracking of corrective actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>Shorter time-to-market through faster supplier releases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases - Light gradient */}
      <section 
        data-nav-theme="light" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center"
          >
            Industry-Specific <span className="text-blue-600">Use Cases</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center"
          >
            Tailored solutions for automotive, aerospace, pharma, and chemical industries
          </motion.p>

          <div className="space-y-8">
            {[
              {
                icon: "🚗",
                title: "Automotive: PPAP Validation & Tool Audits",
                useCase: "Qualify a new Tier-2 supplier for precision parts in days, not weeks.",
                solutions: [
                  "Complete First Article Inspection with automatic document creation",
                  "Supplier development according to IATF 16949",
                  "Automatic release process with ERP integration",
                  "VDA 6.3 compliant process assessment"
                ],
                result: "Result: Qualification in 3 days instead of 3 weeks, complete PPAP documentation digitally available."
              },
              {
                icon: "✈️",
                title: "Aerospace: AS9100 Compliance & Critical Process Validation",
                useCase: "Validate welding processes at suppliers of critical aircraft components.",
                solutions: [
                  "Welding process qualification with complete documentation",
                  "Material tracking and certificate tracking",
                  "AS9100-compliant reporting",
                  "Critical process parameter monitoring"
                ]
              },
              {
                icon: "💊",
                title: "Pharma: GMP Audits & Clean Room Assessments",
                useCase: "GMP audit of an API manufacturer before contract signing.",
                solutions: [
                  "Sterilization process validation with FDA-compliant documentation",
                  "Clean Room assessment with automatic classification",
                  "Change Control and deviation management",
                  "Validation processes fully documented"
                ]
              },
              {
                icon: "🏭",
                title: "Chemical & Process Industry: REACH Compliance & Process Safety",
                useCase: "Safety assessment of chemical plants with comprehensive risk evaluation.",
                solutions: [
                  "Plant safety inspection with automatic risk assessment",
                  "Environmental audits and REACH compliance check",
                  "Action tracking with deadline monitoring",
                  "Process safety according to COMAH/Seveso"
                ]
              }
            ].map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                  <span>{industry.icon}</span>
                  <span>{industry.title}</span>
                </h3>
                <p className="text-lg font-semibold text-gray-900 mb-4">{industry.useCase}</p>
                <p className="text-lg font-semibold text-gray-900 mb-3">ScanPro+ Solution:</p>
                <ul className="space-y-2 mb-4">
                  {industry.solutions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {industry.result && (
                  <p className="text-gray-700 font-semibold bg-[#10B981]/10 p-4 rounded-lg border border-[#10B981]/20">{industry.result}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards - Dark gradient */}
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
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-10 h-10 text-blue-400" />
              Compliance & Supported Standards
            </h2>
            <p className="text-xl text-white/90 mb-8">
              YVOO ScanPro+ meets the highest international quality and safety standards. 
              Your audits are legally secure and comply with all industry-specific requirements.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['ISO 9001', 'IATF 16949', 'AS9100', 'ISO 14001', 'GMP', 'API Q1', 'SQF', 'VDA 6.3', 'TS16949', 'GDPR-compliant', 'SOC2-certified', 'FDA-compliant'].map((standard, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-center font-semibold text-white border border-white/20 hover:bg-white/20 transition-all">
                  {standard}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Network - Light gradient with image */}
      <section 
        data-nav-theme="light" 
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            Global <span className="text-blue-600">Network</span> & Integration
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <LinkIcon className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">ERP Connectors</h3>
              </div>
              <p className="text-gray-700 mb-4">Seamless integration into your existing enterprise systems:</p>
              <ul className="space-y-2">
                {['SAP (Supplier Evaluation & Release)', 'Oracle', 'Microsoft Dynamics', 'Infor', 'Epicor'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-[#10B981]" />
                <h3 className="text-2xl font-bold text-gray-900">Global Auditor Network</h3>
              </div>
              <p className="text-gray-700 mb-4">Direct access to our worldwide network of certified auditors:</p>
              <ul className="space-y-2">
                {['On-Demand Availability – Same-Day audits', 'Smart Matching – Optimal auditor selection', 'Transparent Prices – Fixed pricing', 'Real-time Tracking – GPS and status updates', 'Rating System – Quality assured'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-4">🌍 Available in 47 Countries</h3>
            <p className="text-lg text-white/90">
              Need an audit in Shanghai? Book directly a local, ISO-certified auditor with experience in your industry – available within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA - Dark gradient */}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white">
              Ready for <span className="text-blue-400">the Future of Supplier Auditing?</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/80">
              Join leading companies from Automotive, Aerospace, and Pharma who already trust YVOO ScanPro+.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                  Schedule a Demo (30 minutes)
                </h4>
                <p className="text-white/80">Experience in a personal demo how YVOO ScanPro+ revolutionizes your supplier audits.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                  Start Pilot Audit (2 weeks)
                </h4>
                <p className="text-white/80">Test the platform with a real supplier audit – without risk, with measurable results.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                  Plan Integration
                </h4>
                <p className="text-white/80">Seamless integration into your existing Quality Management Systems and ERP landscape.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <a
                href="mailto:ibrandic@yvoo.io"
                className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-opacity-90 shadow-xl min-h-[48px] inline-flex items-center justify-center gap-2"
              >
                🗓️ Schedule Demo
              </a>
              <a
                href="mailto:ibrandic@yvoo.io"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 min-h-[48px]"
              >
                🚀 Start Pilot Audit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-white">Contact</h3>
              <p className="text-lg text-white/90">
                <strong>Ivo Brandic</strong>, CEO YVOO Technologies Ltd.<br />
                📧 <a href="mailto:ibrandic@yvoo.io" className="hover:underline text-blue-300">ibrandic@yvoo.io</a><br />
                📱 +49 (0)152 03095799<br />
                💬 WhatsApp | Google Meet
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
