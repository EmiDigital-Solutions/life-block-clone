import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Target, Award, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";

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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Dark background */}
      <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" id="hero">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              
              {/* Eyebrow */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                  <span>Real-time supplier intelligence · AI-powered · Risk mitigation</span>
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                </div>
              </motion.div>

              {/* H1 with gradient */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight max-w-4xl"
              >
                Transform supplier data into <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">strategic advantage</span>
              </motion.h1>

              {/* Lede */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-white/70 font-sans font-medium max-w-3xl"
              >
                Ground Intelligence combines on-site audits, IoT sensors, and AI analytics to give you real-time visibility into supplier performance, capacity, and risk — before issues impact your operations.
              </motion.p>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {["Real-time monitoring", "Predictive analytics", "Risk scoring"].map((badge, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-sans backdrop-blur-sm">
                    • {badge}
                  </span>
                ))}
              </motion.div>

              {/* Hero Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/20 max-w-2xl"
              >
                <h3 className="text-2xl font-sans font-semibold text-white mb-6">What Ground Intelligence provides</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  {[
                    "Live supplier metrics",
                    "Capacity forecasting",
                    "Risk alerts",
                    "Compliance tracking",
                    "Performance benchmarking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/80 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Light with pill */}
      <section 
        data-nav-theme="light" 
        className="py-24 px-6 md:px-12 lg:px-24 bg-white" 
        id="pain"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-sans font-medium mb-6">
              Ground Intelligence — Real-time supplier visibility
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-900 mb-6 tracking-tight">
              See beyond the surface
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 font-sans max-w-3xl mx-auto">
              Traditional supplier monitoring relies on quarterly reports and annual audits — by the time you spot a problem, it's already affecting production. Ground Intelligence provides continuous visibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section 
        data-nav-theme="light" 
        className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50" 
        id="how"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-sans font-semibold text-gray-900 mb-4 tracking-tight"
            >
              How It Works
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Deploy & Connect", 
                description: "Install IoT sensors and integrate with existing systems" 
              },
              { 
                step: "2", 
                title: "Monitor & Analyze", 
                description: "AI processes real-time data streams for patterns and anomalies" 
              },
              { 
                step: "3", 
                title: "Act & Optimize", 
                description: "Receive alerts, insights, and recommendations instantly" 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h4 className="text-xl font-sans font-semibold text-gray-900 mb-3 mt-2">{item.title}</h4>
                <p className="text-gray-600 font-sans">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities - 9 Cards in Light Band */}
      <section 
        data-nav-theme="light" 
        className="py-24 px-6 md:px-12 lg:px-24 bg-white" 
        id="capabilities"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-sans font-semibold text-gray-900 mb-4 tracking-tight"
            >
              Capabilities
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { title: "Real-Time Monitoring", description: "Live dashboards of supplier operations and capacity" },
              { title: "Predictive Analytics", description: "Forecast delays, quality issues, and capacity constraints" },
              { title: "Risk Scoring", description: "Dynamic supplier risk assessment based on multiple data streams" },
              { title: "Compliance Tracking", description: "Continuous verification of standards and certifications" },
              { title: "Performance Benchmarking", description: "Compare suppliers across your network" },
              { title: "Alert System", description: "Instant notifications for critical events or deviations" },
              { title: "Capacity Intelligence", description: "Real-time visibility into production schedules and availability" },
              { title: "Quality Signals", description: "Early detection of quality drift through process data" },
              { title: "Integration Hub", description: "Connect with ERP, MES, QMS, and procurement systems" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-cyan-400 hover:shadow-md transition-all"
              >
                <h4 className="text-lg font-sans font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 font-sans text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results - 3 Metrics */}
      <section 
        data-nav-theme="light" 
        className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50" 
        id="results"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-sans font-semibold text-gray-900 mb-4 tracking-tight"
            >
              Results
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { metric: "−85%", label: "Lead time for issue detection" },
              { metric: "92%", label: "Accuracy in delay prediction" },
              { metric: "3.2x", label: "Faster response to supplier risks" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-white border border-gray-200 shadow-sm"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                  {item.metric}
                </div>
                <p className="text-gray-600 font-sans font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - 3 Plans */}
      <section 
        data-nav-theme="light" 
        className="py-24 px-6 md:px-12 lg:px-24 bg-white" 
        id="pricing"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-sans font-semibold text-gray-900 mb-4 tracking-tight"
            >
              Pricing
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl border-2 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-400 shadow-lg scale-105' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-sans font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 font-sans mb-6">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 font-sans">
                      <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
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
      <section data-nav-theme="dark" className="py-24 px-6 md:px-12 lg:px-24 bg-black" id="cta">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
              Ready for real-time supplier intelligence?
            </h2>

            <p className="text-xl text-white/70 font-sans font-medium">
              See how Ground Intelligence transforms supplier management.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                Schedule consultation
              </button>
              <button className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-white/20 transition-all duration-300">
                View demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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