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
      
      {/* Hero Section - Green gradient like BeFound */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
        id="hero"
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-start justify-center space-y-8 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-tight"
            >
              Transform supplier data into{" "}
              <span className="block mt-2">strategic advantage</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-3 text-white"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-lg font-medium">Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-lg font-medium">Predictive analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-lg font-medium">Risk scoring</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollToSection('cta')}
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 text-lg"
              >
                Schedule consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base text-white/90 font-sans max-w-xl leading-relaxed"
            >
              <strong>Ground Intelligence combines on-site audits, IoT sensors, and AI analytics</strong> to give you real-time visibility into supplier performance, capacity, and risk — before issues impact your operations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section
        data-nav-theme="light"
        className="relative py-20 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-600 text-sm font-medium"
            >
              Ground Intelligence — Real-time supplier visibility
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              See <span className="text-green-600">beyond the surface</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Traditional supplier monitoring relies on quarterly reports and annual audits — by the time you spot a problem, it's already affecting production.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Product Overview Section - Dark gradient like BeFound */}
      <section
        data-nav-theme="dark"
        className="relative py-24 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="how"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-green-400">How It</span> Works.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-lg text-white/90 mb-3 font-medium">{step.desc}</p>
                  <p className="text-white/70">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Light background */}
      <section 
        data-nav-theme="light" 
        className="relative py-24 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="capabilities"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-green-600">Capabilities</span>
            </h2>
          </motion.div>

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
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section - Dark gradient */}
      <section 
        data-nav-theme="dark" 
        className="relative py-24 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="results"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-green-400">Results</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl md:text-6xl font-bold text-green-400 mb-3">
                  {item.metric}
                </div>
                <p className="text-white/90 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - 3 Plans */}
      <section 
        data-nav-theme="light" 
        className="relative py-24 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        id="pricing"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-green-600">Pricing</span>
            </h2>
          </motion.div>

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
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl border ${
                  plan.highlighted 
                    ? 'bg-white border-green-500 shadow-lg transform scale-105 border-2' 
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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
        className="relative py-24 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="cta"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready for <span className="text-green-400">real-time supplier intelligence?</span>
            </h2>

            <p className="text-xl text-white/80">
              See how Ground Intelligence transforms supplier management.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-opacity-90 shadow-xl">
                Schedule consultation
              </button>
              <button className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
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