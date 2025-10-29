import { motion } from "framer-motion";
import FlowingLines from "./FlowingLines";

const HeroSection = () => {

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-black to-black opacity-90"></div>

      {/* Content - Two Column Layout */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Tagline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans justify-center lg:justify-start">
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                  <span>2,000+ Auditors · 90+ Countries · AI-Powered</span>
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight"
              >
                On-Site Supplier Audits in Days, Not Weeks
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl font-sans font-medium text-cyan-400/90 tracking-wide"
              >
                70% Cost Reduction · 80% Time Savings · Global Coverage
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/70 font-sans font-medium"
              >
                Physical factory assessments (ISO, VDA, IATF) starting from €700. 
                AI-powered intelligence with certified auditors across 90+ countries.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                  Experience a YVOO Audit
                </button>
              </motion.div>
            </div>

            {/* Right Column - Flowing Lines Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 blur-3xl bg-cyan-400/20 scale-150 -z-10"></div>
              
              <FlowingLines />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
