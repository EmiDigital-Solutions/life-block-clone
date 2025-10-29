import { motion } from "framer-motion";

const HeroSection = () => {

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-black to-black opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              {/* Tagline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
                  <div className="h-px w-16 bg-cyan-400/40"></div>
                  <span>2,000+ Auditors · 90+ Countries · AI-Powered</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight"
              >
                On-Site Supplier Audits in Days, Not Weeks
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl font-sans text-cyan-400/90"
              >
                70% Cost Reduction · 80% Time Savings · Global Coverage
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-white/70 font-sans"
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
                <button className="bg-cyan-400 hover:bg-cyan-500 text-black px-8 py-4 rounded-full font-sans font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                  Request 30-Minute Demo
                </button>
              </motion.div>
            </div>

            {/* Right Side - Spline Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full h-[400px] md:h-[600px] lg:h-[700px] relative"
            >
              <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
              <iframe 
                src='https://my.spline.design/reactiveorb-hpzUrs2oUoCafTMt0LiZLgzl/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="rounded-lg"
                title="Interactive 3D Sphere Animation"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 text-background"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
