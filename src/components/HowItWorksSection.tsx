import { motion } from "framer-motion";
import { FileCheck, MousePointerClick, Users, ClipboardCheck } from "lucide-react";

const featureCards = [
  {
    id: "ai-framework",
    title: "AI-Generated Audit Framework & Auditor Guidance",
    description: "AI builds a customized audit framework and guidance, adapting to your specific aspect objective",
    icon: FileCheck,
  },
  {
    id: "one-click",
    title: "1-Click Audit Request",
    description: "Instant Audit Request tailored to your compliance needs",
    icon: MousePointerClick,
  },
  {
    id: "assignment",
    title: "Auditor Assignment",
    description: "Global network of auditors assigned based on location and expertise",
    icon: Users,
  }
];

// Central Hub Icon with glow effect
const CentralHub = () => (
  <motion.div
    className="absolute left-1/2 top-[280px] -translate-x-1/2 z-20"
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    {/* Outer glow */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(52, 224, 255, 0.4) 0%, rgba(52, 224, 255, 0.1) 50%, transparent 100%)',
        filter: 'blur(15px)',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Main circle */}
    <div 
      className="relative w-20 h-20 rounded-full flex items-center justify-center"
      style={{ 
        background: '#000',
        border: '2px solid #34E0FF',
        boxShadow: '0 0 20px rgba(52, 224, 255, 0.5)',
      }}
    >
      {/* Atom icon */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <motion.circle
          cx="18"
          cy="18"
          r="2.5"
          fill="#34E0FF"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="18"
          cy="18"
          rx="13"
          ry="7"
          stroke="#34E0FF"
          strokeWidth="1"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.ellipse
          cx="18"
          cy="18"
          rx="13"
          ry="7"
          stroke="#41FFB1"
          strokeWidth="1"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          transform="rotate(60 18 18)"
        />
        <motion.ellipse
          cx="18"
          cy="18"
          rx="13"
          ry="7"
          stroke="#34E0FF"
          strokeWidth="1"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          transform="rotate(-60 18 18)"
        />
      </svg>
    </div>
  </motion.div>
);

// Dotted connection line component
const DottedConnection = ({ 
  fromX, 
  fromY, 
  toX, 
  toY, 
  delay = 0 
}: { 
  fromX: string; 
  fromY: string; 
  toX: string; 
  toY: string; 
  delay?: number;
}) => (
  <motion.svg
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    <motion.line
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke="#34E0FF"
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.6"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay }}
    />
  </motion.svg>
);

// World map dot pattern
const WorldMapDots = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none opacity-30"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.3 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5 }}
  >
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 50%, #34E0FF 0.5px, transparent 0.5px),
          radial-gradient(circle at 70% 50%, #34E0FF 0.5px, transparent 0.5px),
          radial-gradient(circle at 50% 40%, #34E0FF 0.5px, transparent 0.5px)
        `,
        backgroundSize: '20px 20px, 20px 20px, 20px 20px',
        backgroundPosition: '0 0, 10px 10px, 5px 5px',
        maskImage: 'radial-gradient(ellipse 800px 400px at center, black 40%, transparent 70%)',
      }}
    />
  </motion.div>
);

export const HowItWorksSection = () => {
  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-32 py-32 lg:py-40">
        
        {/* Top CTA Button */}
        <motion.div 
          className="flex justify-center mb-32"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-3 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300"
            style={{ 
              background: 'transparent',
              border: '1.5px solid #34E0FF',
              color: '#34E0FF',
            }}
            whileHover={{ 
              background: '#34E0FF',
              color: '#000',
              boxShadow: '0 0 20px rgba(52, 224, 255, 0.5)',
            }}
          >
            Find Your Auditor Now
          </motion.button>
        </motion.div>

        {/* Three Feature Cards + Central Hub */}
        <div className="relative mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-24">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <motion.div
                  className="p-8 rounded-2xl h-full"
                  style={{
                    background: '#000',
                    border: '1px solid #34E0FF',
                  }}
                  whileHover={{
                    boxShadow: '0 0 30px rgba(52, 224, 255, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                    style={{
                      border: '1px solid #34E0FF',
                      background: 'rgba(52, 224, 255, 0.05)',
                    }}
                  >
                    <card.icon 
                      className="w-8 h-8" 
                      style={{ color: '#34E0FF', strokeWidth: 1.5 }} 
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg font-semibold mb-4 leading-tight"
                    style={{ color: '#34E0FF' }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#FAFAFA', opacity: 0.8 }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines - Desktop only */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-[400px]">
            {/* Left card to center */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.line
                x1="16.66%"
                y1="220"
                x2="50%"
                y2="280"
                stroke="#34E0FF"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              {/* Animated dot */}
              <motion.circle
                r="2"
                fill="#34E0FF"
                animate={{
                  cx: ['16.66%', '50%'],
                  cy: [220, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            </svg>

            {/* Center card to center */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.line
                x1="50%"
                y1="220"
                x2="50%"
                y2="280"
                stroke="#34E0FF"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />
              {/* Animated dot */}
              <motion.circle
                r="2"
                fill="#34E0FF"
                animate={{
                  cx: '50%',
                  cy: [220, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </svg>

            {/* Right card to center */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.line
                x1="83.33%"
                y1="220"
                x2="50%"
                y2="280"
                stroke="#34E0FF"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.7 }}
              />
              {/* Animated dot */}
              <motion.circle
                r="2"
                fill="#34E0FF"
                animate={{
                  cx: ['83.33%', '50%'],
                  cy: [220, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
            </svg>
          </div>

          {/* Central Hub - Desktop only */}
          <div className="hidden lg:block">
            <CentralHub />
          </div>
        </div>

        {/* Supplier On-Site Evaluation Section */}
        <motion.div
          className="relative mb-40 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Dotted line from hub to evaluation */}
          <div className="hidden lg:block absolute top-[-120px] left-1/2 -translate-x-1/2 w-px h-24">
            <svg width="2" height="100%" className="w-full h-full">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#34E0FF"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </svg>
            <motion.div
              className="absolute w-2 h-2 rounded-full left-1/2 -translate-x-1/2"
              style={{ background: '#34E0FF' }}
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Simple icon illustration */}
            <div 
              className="w-20 h-20 rounded-lg flex items-center justify-center"
              style={{
                border: '1px solid #41FFB1',
                background: 'rgba(65, 255, 177, 0.05)',
              }}
            >
              <ClipboardCheck 
                className="w-10 h-10" 
                style={{ color: '#41FFB1', strokeWidth: 1.5 }} 
              />
            </div>
            
            <div>
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{ color: '#FAFAFA' }}
              >
                Supplier On-Site Evaluation
              </h3>
              <p 
                className="text-sm"
                style={{ color: '#FAFAFA', opacity: 0.7 }}
              >
                Professional on-site inspection and assessment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Global Network Map Section */}
        <motion.div
          className="relative mb-40 min-h-[500px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <WorldMapDots />
          
          {/* Floating auditor cards */}
          {[
            { x: '15%', y: '30%', delay: 0.2 },
            { x: '75%', y: '25%', delay: 0.4 },
            { x: '25%', y: '65%', delay: 0.6 },
            { x: '80%', y: '70%', delay: 0.8 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: pos.x, top: pos.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: pos.delay }}
            >
              <motion.div
                className="px-4 py-2 rounded-lg backdrop-blur-sm"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid #34E0FF',
                  boxShadow: '0 0 15px rgba(52, 224, 255, 0.2)',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#41FFB1' }}
                  />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: '#FAFAFA' }}
                  >
                    Auditor #{i + 1}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Device Mockup Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
            style={{
              background: '#000',
              border: '2px solid #34E0FF',
              boxShadow: '0 0 40px rgba(52, 224, 255, 0.3)',
            }}
          >
            {/* Mockup header */}
            <div 
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(52, 224, 255, 0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
              </div>
              <span 
                className="text-xs font-medium tracking-wide"
                style={{ color: '#34E0FF' }}
              >
                AUDIT REPORT
              </span>
              <button
                className="px-4 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: '#34E0FF',
                  color: '#000',
                }}
              >
                BOOK DEMO
              </button>
            </div>

            {/* Mockup content */}
            <div className="p-8 space-y-6">
              {/* Report sections */}
              <div className="grid grid-cols-2 gap-6">
                <div 
                  className="p-6 rounded-xl"
                  style={{ background: 'rgba(52, 224, 255, 0.05)' }}
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full"
                    style={{ border: '2px solid #41FFB1' }}
                  />
                  <div className="space-y-2">
                    <div className="h-2 rounded" style={{ background: 'rgba(52, 224, 255, 0.3)', width: '80%' }} />
                    <div className="h-2 rounded" style={{ background: 'rgba(52, 224, 255, 0.2)', width: '60%' }} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div 
                    className="h-16 rounded-lg"
                    style={{ background: 'rgba(65, 255, 177, 0.1)', border: '1px solid rgba(65, 255, 177, 0.3)' }}
                  />
                  <div 
                    className="h-16 rounded-lg"
                    style={{ background: 'rgba(52, 224, 255, 0.1)', border: '1px solid rgba(52, 224, 255, 0.3)' }}
                  />
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="grid grid-cols-4 gap-4 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 rounded-lg"
                    style={{ background: '#34E0FF' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification cards */}
          {[
            { text: 'Your supplier audit is scheduled', x: '-120px', y: '100px', delay: 1 },
            { text: 'The audit report is released', x: '-120px', y: '220px', delay: 1.5 },
          ].map((notif, i) => (
            <motion.div
              key={i}
              className="hidden xl:block absolute left-0 px-4 py-3 rounded-lg backdrop-blur-sm"
              style={{
                top: notif.y,
                transform: `translateX(${notif.x})`,
                background: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid #41FFB1',
                boxShadow: '0 0 20px rgba(65, 255, 177, 0.2)',
                minWidth: '240px',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: notif.delay }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: '#41FFB1' }}
                />
                <span 
                  className="text-xs"
                  style={{ color: '#FAFAFA' }}
                >
                  {notif.text}
                </span>
              </div>
              <div 
                className="mt-2 text-[10px]"
                style={{ color: '#FAFAFA', opacity: 0.5 }}
              >
                Today, 09:15
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Network Stats */}
        <motion.div
          className="mt-32 text-center space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
            style={{ color: '#FAFAFA' }}
          >
            Tap into Our Global Network of<br />
            <span style={{ color: '#34E0FF' }}>Certified Auditors – On-Demand & AI-Powered</span>
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
            <div className="space-y-3">
              <p 
                className="text-sm tracking-widest uppercase font-medium"
                style={{ color: '#34E0FF' }}
              >
                Certified Auditors
              </p>
              <p 
                className="text-6xl sm:text-7xl lg:text-8xl font-bold"
                style={{ color: '#FAFAFA' }}
              >
                2,000+
              </p>
            </div>
            
            <div className="space-y-3">
              <p 
                className="text-sm tracking-widest uppercase font-medium"
                style={{ color: '#41FFB1' }}
              >
                Coverage
              </p>
              <p 
                className="text-6xl sm:text-7xl lg:text-8xl font-bold"
                style={{ color: '#FAFAFA' }}
              >
                90+ Countries
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
