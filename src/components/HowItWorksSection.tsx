import { motion } from "framer-motion";
import { FileText, MousePointerClick, Users, Building2 } from "lucide-react";

const workflowSteps = [
  {
    id: "ai-framework",
    title: "AI-Generated Audit Framework & Auditor Guidance",
    description: "AI builds a customized audit framework and guidance, adapting to your specific aspect objective",
    icon: FileText,
    position: { desktop: "top-0 left-0", mobile: "top-0" },
    color: "#A8C5B8"
  },
  {
    id: "one-click",
    title: "1-Click Audit Request",
    description: "Instant Audit Request tailored to your compliance needs",
    icon: MousePointerClick,
    position: { desktop: "top-0 left-1/2 -translate-x-1/2", mobile: "top-24" },
    color: "#A8BFC5"
  },
  {
    id: "assignment",
    title: "Auditor Assignment",
    description: "Global network of auditors assigned based on location and expertise",
    icon: Users,
    position: { desktop: "top-0 right-0", mobile: "top-48" },
    color: "#A8C5B8"
  },
  {
    id: "evaluation",
    title: "Supplier On-Site Evaluation",
    description: "Professional on-site inspection and assessment",
    icon: Building2,
    position: { desktop: "top-80 left-1/2 -translate-x-1/2", mobile: "top-72" },
    color: "#A8BFC5"
  }
];

const CentralHub = () => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    {/* Outer glow ring */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(168, 197, 184, 0.3) 0%, rgba(168, 191, 197, 0.2) 50%, transparent 100%)',
        filter: 'blur(20px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Middle ring */}
    <div className="relative w-24 h-24 rounded-full border-2 flex items-center justify-center"
         style={{ borderColor: '#A8C5B8', background: 'rgba(0, 0, 0, 0.8)' }}>
      {/* Inner glow */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 197, 184, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Atom icon */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="relative z-10">
        <motion.circle
          cx="20"
          cy="20"
          r="3"
          fill="#A8C5B8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="20"
          cy="20"
          rx="15"
          ry="8"
          stroke="#A8BFC5"
          strokeWidth="1.5"
          fill="none"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.ellipse
          cx="20"
          cy="20"
          rx="15"
          ry="8"
          stroke="#A8BFC5"
          strokeWidth="1.5"
          fill="none"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          transform="rotate(60 20 20)"
        />
        <motion.ellipse
          cx="20"
          cy="20"
          rx="15"
          ry="8"
          stroke="#A8BFC5"
          strokeWidth="1.5"
          fill="none"
          style={{ transformOrigin: 'center' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          transform="rotate(-60 20 20)"
        />
      </svg>
    </div>
  </motion.div>
);

const DottedLine = ({ fromStep, delay }: { fromStep: number; delay: number }) => {
  const lines = [
    { from: "top-0 left-[20%]", to: "top-1/2 left-1/2", length: "h-64" }, // AI to center
    { from: "top-0 left-1/2", to: "top-1/2 left-1/2", length: "h-48" }, // 1-Click to center
    { from: "top-0 right-[20%]", to: "top-1/2 left-1/2", length: "h-64" }, // Assignment to center
    { from: "top-80 left-1/2", to: "top-1/2 left-1/2", length: "h-32" }, // Evaluation to center
  ];

  return (
    <motion.div
      className="absolute hidden lg:block"
      style={{
        left: '50%',
        top: fromStep === 3 ? '65%' : '15%',
        height: fromStep === 3 ? '15%' : '35%',
        width: '2px',
        transformOrigin: 'top',
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <svg width="2" height="100%" className="w-full h-full">
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="100%"
          stroke="#A8C5B8"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      </svg>
      
      {/* Animated dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full left-1/2 -translate-x-1/2"
        style={{ backgroundColor: '#A8C5B8' }}
        animate={{
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
      />
    </motion.div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section
      data-nav-theme="light"
      className="relative bg-black py-24 sm:py-32 lg:py-40 px-6 sm:px-8 lg:px-16 overflow-hidden"
    >
      {/* CTA Button at top */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-10 py-4 text-black text-sm tracking-wider uppercase font-black rounded-full transition-all duration-300 shadow-lg"
          style={{ backgroundColor: '#A8C5B8' }}
        >
          Find Your Auditor Now
        </motion.button>
      </div>

      {/* Workflow Visualization */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="relative min-h-[800px] lg:min-h-[600px]">
          {/* Workflow Cards */}
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`absolute ${step.position.desktop} hidden lg:block w-80`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div 
                className="relative bg-black/50 backdrop-blur-sm border-2 rounded-2xl p-6 space-y-4 hover:bg-black/70 transition-all duration-300"
                style={{ borderColor: step.color }}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: `${step.color}20`,
                    border: `2px solid ${step.color}`
                  }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color, strokeWidth: 2.5 }} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-black leading-tight" style={{ color: step.color }}>
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connection Line to Hub */}
              {index < 3 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 origin-top"
                  style={{ 
                    height: index === 0 || index === 2 ? '180px' : '140px',
                    background: `linear-gradient(180deg, ${step.color} 0%, transparent 100%)`
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                >
                  <svg width="2" height="100%" className="w-full h-full">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100%"
                      stroke={step.color}
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      opacity="0.8"
                    />
                  </svg>
                  
                  {/* Animated pulse dot */}
                  <motion.div
                    className="absolute w-2 h-2 rounded-full left-1/2 -translate-x-1/2"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}` }}
                    animate={{
                      top: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                </motion.div>
              )}

              {/* Line from Evaluation (bottom) to Hub */}
              {index === 3 && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full w-0.5 origin-bottom"
                  style={{ 
                    height: '100px',
                    background: `linear-gradient(0deg, ${step.color} 0%, transparent 100%)`
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <svg width="2" height="100%" className="w-full h-full">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="100%"
                      stroke={step.color}
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      opacity="0.8"
                    />
                  </svg>
                  
                  {/* Animated pulse dot */}
                  <motion.div
                    className="absolute w-2 h-2 rounded-full left-1/2 -translate-x-1/2"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}` }}
                    animate={{
                      bottom: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden space-y-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={`mobile-${step.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div 
                  className="bg-black/50 backdrop-blur-sm border-2 rounded-2xl p-6 space-y-4"
                  style={{ borderColor: step.color }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                    style={{ 
                      backgroundColor: `${step.color}20`,
                      border: `2px solid ${step.color}`
                    }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color, strokeWidth: 2.5 }} />
                  </div>
                  
                  <h3 className="text-lg font-black leading-tight" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-white/80 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connecting line */}
                {index < workflowSteps.length - 1 && (
                  <motion.div
                    className="absolute left-8 top-full w-0.5 h-8 origin-top"
                    style={{ background: `linear-gradient(180deg, ${step.color} 0%, ${workflowSteps[index + 1].color} 100%)` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Central Hub - Desktop Only */}
          <div className="hidden lg:block">
            <CentralHub />
          </div>
        </div>
      </div>

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
        </motion.div>
      </div>

      {/* Decorative dot grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #A8C5B8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>
    </section>
  );
};
