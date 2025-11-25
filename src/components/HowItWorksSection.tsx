import { motion } from "framer-motion";

const features = [
  {
    title: "Cost-Efficient and Scalable",
    description: "Save up to 70% on audit costs while accelerating timelines by 80%, scaling easily to your needs.",
    type: "cost"
  },
  {
    title: "Instant Global Audit",
    description: "YVOO provides 1-click access to certified auditors, ensuring you can book audits anytime, anywhere.",
    type: "global"
  },
  {
    title: "AI-Driven Compliance",
    description: "AI-Generated Audit framework & guidance adhering to ISO 9001, IATF 16949, and regional standards, ensuring comprehensive regulatory compliance across all locations.",
    type: "ai"
  }
];

const workflow = [
  {
    step: "1",
    title: "1-Click Audit Request",
    description: "Initiate audit request tailored to your supplier's needs"
  },
  {
    step: "2",
    title: "Auditor Assignment",
    description: "Global network of auditors assigned based on location and expertise"
  },
  {
    step: "3",
    title: "Supplier On-Site Evaluation",
    description: "Professional on-site inspection and assessment"
  },
  {
    step: "4",
    title: "Digital Report",
    description: "Comprehensive scored reports delivered within 24-48 hours"
  }
];

const GeometricIcon = ({ type }: { type: string }) => {
  if (type === "cost") {
    return (
      <svg width="130" height="128" viewBox="0 0 130 128" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="8" fill="#A8C5B8" opacity="0.3" />
        <circle cx="75" cy="35" r="6" fill="#A8BFC5" opacity="0.4" />
        <rect x="45" y="10" width="50" height="50" fill="#A8BFC5" opacity="0.2" />
        <path d="M15 95 L35 75 L50 85 L65 70" stroke="#A8BFC5" strokeWidth="3" fill="none" />
        <circle cx="15" cy="95" r="5" fill="#A8C5B8" />
        <circle cx="50" cy="85" r="5" fill="#A8BFC5" />
        <rect x="85" y="90" width="25" height="30" fill="black" stroke="#A8BFC5" strokeWidth="2" />
      </svg>
    );
  }
  
  if (type === "global") {
    return (
      <svg width="117" height="128" viewBox="0 0 117 128" fill="none" className="w-full h-full">
        <rect x="10" y="15" width="40" height="45" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="50" cy="40" r="25" fill="#A8BFC5" opacity="0.3" />
        <circle cx="85" cy="40" r="12" fill="#A8C5B8" opacity="0.4" />
        <path d="M75 25 L85 20 L90 30" fill="#A8BFC5" />
        <path d="M80 45 L85 55 L92 50" fill="#A8C5B8" />
        <circle cx="25" cy="95" r="8" fill="#A8C5B8" />
        <rect x="65" y="85" width="30" height="25" fill="black" stroke="#A8BFC5" strokeWidth="2" />
        <circle cx="70" cy="10" r="4" fill="#A8BFC5" />
      </svg>
    );
  }
  
  if (type === "ai") {
    return (
      <svg width="158" height="122" viewBox="0 0 158 122" fill="none" className="w-full h-full">
        <path d="M70 40 L90 60 L70 80 L50 60 Z" fill="white" opacity="0.8" />
        <path d="M30 35 L50 35 L40 50 Z" fill="white" opacity="0.6" />
        <rect x="115" y="75" width="25" height="25" fill="#A8BFC5" opacity="0.4" />
        <rect x="15" y="75" width="25" height="25" fill="#A8C5B8" opacity="0.4" />
        <path d="M50 30 L80 40 L70 55" fill="#A8BFC5" opacity="0.5" />
        <circle cx="20" cy="15" r="8" fill="#A8BFC5" opacity="0.3" />
        <circle cx="110" cy="25" r="6" fill="#A8BFC5" opacity="0.4" />
        <path d="M130 50 L145 65 L150 55 L155 70" stroke="#A8C5B8" strokeWidth="2" fill="none" />
      </svg>
    );
  }
  
  return null;
};

export const HowItWorksSection = () => {
  return (
    <section
      data-nav-theme="light"
      className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto mb-20 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase font-black drop-shadow-md" style={{ color: '#A8C5B8' }}>
            About Us
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight px-4">
            We're Redefining Supplier Audits Globally
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black leading-relaxed text-white max-w-5xl mx-auto px-4">
            YVOO introduces a groundbreaking approach to audits, seamlessly connecting businesses with certified auditors for faster, smarter results.
          </p>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#A8C5B8' }} />
              
              {/* Geometric Icon */}
              <motion.div 
                className="w-32 h-32 mb-8 ml-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <GeometricIcon type={feature.type} />
              </motion.div>

              <div className="pl-8 space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {feature.title}
                </h3>
                
                <p className={`text-base sm:text-lg leading-relaxed ${index === 2 ? 'font-black drop-shadow-md' : 'font-light text-white'}`}
                   style={index === 2 ? { color: '#A8C5B8' } : {}}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Value Proposition Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-32 text-center"
      >
        <p className="text-2xl sm:text-3xl lg:text-4xl font-black drop-shadow-lg" style={{ color: '#A8C5B8' }}>
          YVOO ScanPro+ eliminates traditional audit roadblocks, improvement in all metrics
        </p>
      </motion.div>

      {/* Network Stats */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Tap into Our Global Network of<br />
            <span className="font-black drop-shadow-md" style={{ color: '#A8C5B8' }}>Certified Auditors – On-Demand & AI-Powered</span>
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm tracking-wider uppercase font-black drop-shadow-sm" style={{ color: '#A8C5B8' }}>
                Certified Auditors
              </p>
              <p className="text-6xl sm:text-7xl lg:text-8xl font-black text-white">
                2.000+
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs sm:text-sm tracking-wider uppercase font-black drop-shadow-sm" style={{ color: '#A8C5B8' }}>
                Coverage
              </p>
              <p className="text-6xl sm:text-7xl lg:text-8xl font-black text-white">
                90+ Countries
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 text-black text-sm tracking-wider uppercase font-black rounded-full transition-all duration-300 shadow-lg drop-shadow-md"
            style={{ backgroundColor: '#A8C5B8' }}
          >
            Find Your Auditor Now
          </motion.button>
        </motion.div>
      </div>

      {/* Workflow Visualization */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="relative">
          {/* Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-black/30 backdrop-blur-sm border-2 rounded-2xl p-6 space-y-4 h-full transition-all duration-300 hover:bg-black/50"
                     style={{ borderColor: '#A8C5B8' }}>
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-black font-black text-xl"
                       style={{ backgroundColor: '#A8C5B8' }}>
                    {item.step}
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl font-black text-white leading-tight">
                    {item.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Animated Connecting Arrow (desktop only) */}
                {index < workflow.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 -translate-y-1/2"
                    style={{ backgroundColor: '#A8C5B8' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                      style={{
                        borderLeft: '6px solid #A8C5B8',
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent'
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-96 h-1 opacity-30"
           style={{ background: 'linear-gradient(90deg, transparent, #A8C5B8, transparent)', transform: 'rotate(-15deg)' }} />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #A8C5B8 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>
    </section>
  );
};
