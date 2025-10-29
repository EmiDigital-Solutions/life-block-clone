import { motion } from "framer-motion";

const HeroSection = () => {

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Pure Black Background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Content - Single Column Centered Layout */}
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
                <span>2,000+ Auditors · 90+ Countries · AI-Powered</span>
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
              className="text-lg text-white/70 font-sans font-medium max-w-3xl"
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
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                Experience a Connectimus Audit
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
