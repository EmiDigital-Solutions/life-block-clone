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
      
      {/* Hero Section - Matching main page design */}
      <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" id="hero">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              
              {/* Tagline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                  <span>On-site supplier evaluations · Global · Standardized</span>
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight max-w-4xl"
              >
                Less Risk, Faster Decisions: Objective Supplier Audits Guided by AI
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl font-sans font-medium text-cyan-400/90 tracking-wide"
              >
                25+ Countries · 120+ Audits · 4.8/5 Rating
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/70 font-sans font-medium max-w-3xl"
              >
                Book, verify, decide: Local experts run audits using a unified framework. 
                You get clear scores, photos & evidence — comparable across countries and plants.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl"
                >
                  Grab a 15-min demo
                </button>
                <button 
                  onClick={() => scrollToSection('how')}
                  className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-white/20 transition-all duration-300"
                >
                  See how it works
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section - Green gradient background */}
      <section 
        data-nav-theme="green" 
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24" 
        style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))' }}
        id="pain"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-white space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm font-sans tracking-wide font-medium">
                  01 Challenge
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                The Reality in Procurement
              </h2>

              <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                Subjective audits, scattered evidence, little comparability — and decisions that stall.
              </p>

              <button 
                onClick={() => scrollToSection('solution')}
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide"
              >
                See the solution
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Right: Pain Points Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="grid gap-6"
            >
              {[
                { icon: Clock, title: "Slow & costly", description: "Audits take weeks; travel and coordination burn budgets." },
                { icon: Target, title: "Subjective", description: "Every auditor rates differently — results don't scale." },
                { icon: Award, title: "Blind spots", description: "Missing evidence, weak traceability during escalations." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-sans font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-white/80 font-sans">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section - Dark gradient background */}
      <section 
        data-nav-theme="dark" 
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24" 
        style={{ background: 'linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))' }}
        id="solution"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-white space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span className="text-sm font-sans tracking-wide font-medium text-cyan-400">
                  02 Solution
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                Standardized Quality — Everywhere
              </h2>

              <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                Network of certified experts + AI guidance for objective, verifiable results. 
                One report, clear scores, solid evidence.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="font-sans">Unified checklists and weightings (1–5 score)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="font-sans">Photo/video evidence & documents linked in-line</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="font-sans">Regional risks & compliance hints integrated</span>
                </li>
              </ul>

              <button 
                onClick={() => scrollToSection('how')}
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide"
              >
                Learn more
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-cyan-400/5 border border-cyan-400/20 shadow-lg"
            >
              <p className="text-xs text-cyan-400 uppercase tracking-wider mb-4 font-sans">
                ScanPro+ – AI-guided on-site audits
              </p>
              <h4 className="text-xl font-sans font-semibold text-white mb-4">Understand in 3 lines</h4>
              <p className="text-white/80 leading-relaxed font-sans">
                <strong className="text-white">What?</strong> Standardized audits.<br />
                <strong className="text-white">How?</strong> Local experts + AI guidance.<br />
                <strong className="text-white">Outcome?</strong> Faster, safer decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works - Blue gradient background */}
      <section 
        data-nav-theme="dark" 
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24" 
        style={{ background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))' }}
        id="how"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm font-sans tracking-wide font-medium text-white">
                  03 Process
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white mb-4 tracking-tight">
                How it Works
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans font-medium">
                A clear flow reduces cognitive load and builds trust.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Request", description: "Define site & scope. We match the right auditor." },
              { step: "2", title: "On-site audit", description: "Guided checklist, evidence photos, objective scores — same standard worldwide." },
              { step: "3", title: "Report & decision", description: "Comparable results, highlighted risks, clear next steps." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h4 className="text-xl font-sans font-semibold text-white mb-3 mt-2">{item.title}</h4>
                <p className="text-white/80 font-sans">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => scrollToSection('cases')}
              className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide"
            >
              See results
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Case Studies - Green gradient background */}
      <section 
        data-nav-theme="green" 
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24" 
        style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))' }}
        id="cases"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-sm font-sans tracking-wide font-medium text-white">
                  04 Results
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white mb-4 tracking-tight">
                Results from the Field
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans font-medium">
                Concrete numbers lower perceived risk.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { metric: "-72%", label: "Audit cycle time", description: "From 21 days to 6 days in a global sourcing program.", icon: TrendingDown },
              { metric: "+38%", label: "Supplier hit rate", description: "Better selection driven by objective scores & evidence.", icon: TrendingUp },
              { metric: "99%", label: "Report acceptance", description: "Audits recognized as evidence in escalations.", icon: CheckCircle2 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-5xl font-bold text-white">
                    {item.metric}
                  </div>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-white/70 uppercase tracking-wider mb-2 font-sans">
                  {item.label}
                </div>
                <p className="text-white/90 font-sans">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Black background */}
      <section 
        data-nav-theme="dark" 
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24 bg-black" 
        id="cta"
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="flex items-center gap-4 text-white/60 text-sm font-sans justify-center">
              <div className="h-px w-16 bg-cyan-400/40"></div>
              <span>Ready to Start?</span>
              <div className="h-px w-16 bg-cyan-400/40"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight">
              Ready for Evidence-Driven Supplier Decisions?
            </h2>

            <p className="text-xl text-white/70 font-sans font-medium">
              Short demo. Clear answers. Zero risk.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                Book demo
              </button>
              <button 
                onClick={() => scrollToSection('cases')}
                className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-white/20 transition-all duration-300"
              >
                See sample report
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