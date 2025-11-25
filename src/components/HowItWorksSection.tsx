import { motion } from "framer-motion";
import { Search, CheckCircle, ClipboardCheck, FileText } from "lucide-react";

const features = [
  {
    title: "Cost-Efficient and Scalable",
    description: "Save up to 70% on audit costs while accelerating timelines by 80%, scaling easily to your needs.",
    icon: "cost"
  },
  {
    title: "Instant Global Audit",
    description: "YVOO provides 1-click access to certified auditors, ensuring you can book audits anytime, anywhere.",
    icon: "global"
  },
  {
    title: "AI-Driven Compliance",
    description: "AI-Generated Audit framework & guidance adhering to ISO 9001, IATF 16949, and regional standards, ensuring comprehensive regulatory compliance across all locations.",
    icon: "ai"
  }
];

const workflow = [
  {
    step: "1",
    title: "1-Click Audit Request",
    description: "Initiate audit request tailored to your supplier's needs",
    icon: Search
  },
  {
    step: "2",
    title: "Auditor Assignment",
    description: "Global network of auditors assigned based on location and expertise",
    icon: CheckCircle
  },
  {
    step: "3",
    title: "Supplier On-Site Evaluation",
    description: "Professional on-site inspection and assessment",
    icon: ClipboardCheck
  },
  {
    step: "4",
    title: "Digital Report",
    description: "Comprehensive scored reports delivered within 24-48 hours",
    icon: FileText
  }
];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Vertical Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#A8C5B8' }} />
              
              <div className="pl-8 space-y-6">
                {/* Icon Placeholder - Modern minimal icon */}
                <div className="w-20 h-20 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Abstract geometric icon representation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 opacity-30" style={{ borderColor: '#A8C5B8' }} />
                      <div className="absolute w-10 h-10 rounded-full" style={{ backgroundColor: '#A8C5B8', opacity: 0.2 }} />
                      <div className="absolute w-4 h-4 rounded-full" style={{ backgroundColor: '#A8C5B8' }} />
                    </div>
                  </div>
                </div>

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
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 space-y-4 h-full"
                       style={{ borderColor: '#A8C5B8', borderWidth: '2px' }}>
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                         style={{ backgroundColor: '#A8C5B8', opacity: 0.15 }}>
                      <Icon className="w-8 h-8 font-black drop-shadow-md" style={{ color: '#A8C5B8' }} strokeWidth={2.5} />
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

                  {/* Connecting Line (desktop only) */}
                  {index < workflow.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 -translate-y-1/2"
                         style={{ backgroundColor: '#A8C5B8', opacity: 0.3 }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                           style={{ backgroundColor: '#A8C5B8' }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Central Hub Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full items-center justify-center pointer-events-none"
            style={{ backgroundColor: '#A8C5B8', opacity: 0.1 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: '#A8C5B8', opacity: 0.2 }}>
              <div className="w-8 h-8 rounded-full"
                   style={{ backgroundColor: '#A8C5B8' }} />
            </div>
          </motion.div>
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
