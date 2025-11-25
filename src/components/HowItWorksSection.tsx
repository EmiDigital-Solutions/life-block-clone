import { motion, useInView } from "framer-motion";
import { FileCheck, MousePointerClick, Users, ClipboardCheck, Check } from "lucide-react";
import { useRef, useState } from "react";
import { PixelIcon } from "./PixelIcon";

const featureCards = [
  {
    id: "ai-framework",
    title: "AI-Generated Audit Framework",
    description: "AI builds customized frameworks adapting to your specific objectives",
    icon: FileCheck,
  },
  {
    id: "one-click",
    title: "1-Click Audit Request",
    description: "Instant audit requests tailored to your compliance needs",
    icon: MousePointerClick,
  },
  {
    id: "assignment",
    title: "Auditor Assignment",
    description: "Global network assigned based on location and expertise",
    icon: Users,
  }
];

// Central Hub Icon with elegant pulse
const CentralHub = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute left-1/2 top-[280px] -translate-x-1/2 z-20"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Subtle outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)',
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
        animate={{
          scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
          opacity: isHovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main circle */}
      <motion.div 
        className="relative w-24 h-24 rounded-full flex items-center justify-center bg-white border-2 border-primary shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Network icon */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <motion.circle
            cx="24"
            cy="24"
            r="3"
            className="fill-primary"
            animate={{ scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Orbital rings */}
          {[0, 60, 120].map((rotation, i) => (
            <motion.ellipse
              key={i}
              cx="24"
              cy="24"
              rx="16"
              ry="8"
              className="stroke-primary"
              strokeWidth="1.5"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              transform={`rotate(${rotation} 24 24)`}
            />
          ))}
          {/* Connection nodes */}
          {[0, 120, 240].map((angle, i) => {
            const x = 24 + 16 * Math.cos((angle * Math.PI) / 180);
            const y = 24 + 16 * Math.sin((angle * Math.PI) / 180);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                className="fill-secondary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
};


// World map dot pattern with muted colors
const WorldMapDots = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none opacity-20"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.2 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5 }}
  >
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 50%, hsl(var(--primary)) 1px, transparent 1px),
          radial-gradient(circle at 70% 50%, hsl(var(--secondary)) 1px, transparent 1px),
          radial-gradient(circle at 50% 40%, hsl(var(--primary)) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px, 24px 24px, 24px 24px',
        backgroundPosition: '0 0, 12px 12px, 6px 6px',
        maskImage: 'radial-gradient(ellipse 900px 450px at center, black 40%, transparent 75%)',
      }}
    />
  </motion.div>
);

export const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-white via-muted/20 to-white"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-32 py-24 lg:py-32 relative">
        
        {/* Section Title */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How <span className="text-primary">YVOO</span> Works
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From audit request to certified report in 3 simple steps
          </motion.p>
        </motion.div>

        {/* Three Feature Cards + Central Hub */}
        <div className="relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 mb-24">
            {featureCards.map((card, index) => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: false, amount: 0.5 });
              
              return (
                <motion.div
                  key={card.id}
                  ref={cardRef}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  {/* Step number */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  >
                    {index + 1}
                  </motion.div>

                  <motion.div
                    className="p-8 rounded-3xl h-full bg-white border-2 border-transparent relative overflow-hidden"
                    animate={{
                      borderColor: cardInView ? 'hsl(var(--primary))' : 'transparent',
                      boxShadow: cardInView 
                        ? '0 10px 40px hsl(var(--primary) / 0.15)' 
                        : '0 4px 20px hsl(0 0% 0% / 0.05)',
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 50px hsl(var(--primary) / 0.25)',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
                      }}
                    />

                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 border border-primary/20 relative z-10"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <card.icon 
                        className="w-8 h-8 text-primary" 
                        strokeWidth={1.5} 
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-4 leading-tight text-foreground relative z-10">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground relative z-10">
                      {card.description}
                    </p>

                    {/* Arrow indicator */}
                    {index < 2 && (
                      <motion.div 
                        className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                      >
                        <PixelIcon name="arrow-right" className="w-6 h-6" color="hsl(var(--primary))" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Connection Lines - Desktop only */}
          <div className="hidden lg:block absolute top-0 left-0 w-full h-[400px] pointer-events-none">
            {/* Left card to center */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <motion.line
                x1="16.66%"
                y1="200"
                x2="50%"
                y2="280"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
              <motion.circle
                r="3"
                className="fill-primary"
                animate={{
                  cx: ['16.66%', '50%'],
                  cy: [200, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </svg>

            {/* Center card to center */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <motion.line
                x1="50%"
                y1="200"
                x2="50%"
                y2="280"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.75 }}
              />
              <motion.circle
                r="3"
                className="fill-primary"
                animate={{
                  cx: '50%',
                  cy: [200, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.3,
                }}
              />
            </svg>

            {/* Right card to center */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <motion.line
                x1="83.33%"
                y1="200"
                x2="50%"
                y2="280"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />
              <motion.circle
                r="3"
                className="fill-primary"
                animate={{
                  cx: ['83.33%', '50%'],
                  cy: [200, 280],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.6,
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
          className="relative mb-32 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Dotted line from hub to evaluation */}
          <div className="hidden lg:block absolute top-[-100px] left-1/2 -translate-x-1/2 w-px h-20">
            <svg width="2" height="100%" className="w-full h-full">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </svg>
            <motion.div
              className="absolute w-3 h-3 rounded-full left-1/2 -translate-x-1/2 bg-primary"
              animate={{
                top: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          <motion.div 
            className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-3xl border-2 border-secondary/30 shadow-xl max-w-2xl"
            whileHover={{ 
              boxShadow: '0 20px 60px hsl(var(--secondary) / 0.2)',
              borderColor: 'hsl(var(--secondary))',
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon illustration */}
            <motion.div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center bg-secondary/10 border-2 border-secondary/30"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ClipboardCheck 
                className="w-12 h-12 text-secondary" 
                strokeWidth={1.5} 
              />
            </motion.div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                On-Site Evaluation
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Certified auditors conduct thorough supplier assessments with digital reporting
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Global Network Map Section */}
        <motion.div
          className="relative mb-32 min-h-[600px] bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-3xl p-12 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Global Auditor Network
          </motion.h3>

          <WorldMapDots />
          
          {/* Floating auditor cards */}
          {[
            { x: '12%', y: '25%', delay: 0.2, region: 'Europe' },
            { x: '78%', y: '20%', delay: 0.4, region: 'Asia' },
            { x: '20%', y: '60%', delay: 0.6, region: 'Americas' },
            { x: '75%', y: '65%', delay: 0.8, region: 'Africa' },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute hidden md:block"
              style={{ left: pos.x, top: pos.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: pos.delay }}
            >
              <motion.div
                className="group px-5 py-3 rounded-2xl backdrop-blur-md bg-white/90 border-2 border-primary/20 shadow-lg cursor-pointer"
                animate={{
                  y: [0, -12, 0],
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: 'hsl(var(--primary))',
                  boxShadow: '0 10px 30px hsl(var(--primary) / 0.3)',
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  },
                  scale: { duration: 0.3 },
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div>
                    <span className="text-sm font-bold text-foreground block">
                      {pos.region}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Certified Auditor
                    </span>
                  </div>
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
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white shadow-2xl border-2 border-muted">
            {/* Mockup header */}
            <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-muted">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-bold tracking-wide text-primary">
                DIGITAL AUDIT REPORT
              </span>
              <motion.button
                className="px-6 py-2 rounded-full text-sm font-bold bg-white text-foreground border-2 border-primary"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                }}
                transition={{ duration: 0.3 }}
              >
                View Demo
              </motion.button>
            </div>

            {/* Mockup content */}
            <div className="p-10 space-y-8 bg-gradient-to-br from-white to-muted/20">
              {/* Report sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  className="p-8 rounded-2xl bg-white border-2 border-primary/20 shadow-lg"
                  whileHover={{ 
                    boxShadow: '0 10px 40px hsl(var(--primary) / 0.2)',
                    borderColor: 'hsl(var(--primary))',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Check className="w-20 h-20 text-primary" strokeWidth={3} />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded-full bg-primary/30 w-4/5" />
                    <div className="h-3 rounded-full bg-primary/20 w-3/5" />
                    <div className="h-3 rounded-full bg-primary/10 w-2/5" />
                  </div>
                </motion.div>
                
                <div className="space-y-5">
                  <motion.div 
                    className="h-20 rounded-2xl bg-gradient-to-r from-secondary/20 to-secondary/10 border-2 border-secondary/30 flex items-center px-6"
                    whileHover={{ 
                      boxShadow: '0 5px 20px hsl(var(--secondary) / 0.2)',
                      borderColor: 'hsl(var(--secondary))',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-secondary" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2 rounded bg-secondary/40 w-3/4" />
                        <div className="h-2 rounded bg-secondary/20 w-1/2" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="h-20 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center px-6"
                    whileHover={{ 
                      boxShadow: '0 5px 20px hsl(var(--primary) / 0.2)',
                      borderColor: 'hsl(var(--primary))',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2 rounded bg-primary/40 w-3/4" />
                        <div className="h-2 rounded bg-primary/20 w-1/2" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="h-20 rounded-2xl bg-gradient-to-r from-secondary/20 to-secondary/10 border-2 border-secondary/30 flex items-center px-6"
                    whileHover={{ 
                      boxShadow: '0 5px 20px hsl(var(--secondary) / 0.2)',
                      borderColor: 'hsl(var(--secondary))',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-secondary" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2 rounded bg-secondary/40 w-3/4" />
                        <div className="h-2 rounded bg-secondary/20 w-1/2" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom action buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {['Download', 'Share', 'Print', 'Export'].map((label, i) => (
                  <motion.button
                    key={i}
                    className="h-14 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 5px 20px hsl(var(--primary) / 0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification cards */}
          {[
            { text: 'Audit scheduled successfully', icon: Check, x: '-140px', y: '120px', delay: 1 },
            { text: 'Report generated & ready', icon: Check, x: '-140px', y: '240px', delay: 1.5 },
          ].map((notif, i) => (
            <motion.div
              key={i}
              className="hidden xl:block absolute left-0 px-5 py-4 rounded-2xl backdrop-blur-lg bg-white/95 border-2 border-primary/30 shadow-xl"
              style={{
                top: notif.y,
                transform: `translateX(${notif.x})`,
                minWidth: '260px',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: notif.delay }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 40px hsl(var(--primary) / 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <notif.icon className="w-5 h-5 text-primary" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold text-foreground">
                  {notif.text}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground ml-11">
                Just now
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Network Stats & CTA */}
        <motion.div
          className="mt-32 text-center space-y-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Connect with Our Global Network of{' '}
            <span className="text-primary">Certified Auditors</span>
          </motion.h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-20">
            <motion.div 
              className="space-y-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm tracking-widest uppercase font-bold text-primary">
                Certified Auditors
              </p>
              <motion.p 
                className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                2,000+
              </motion.p>
            </motion.div>
            
            <div className="hidden sm:block w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
            
            <motion.div 
              className="space-y-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm tracking-widest uppercase font-bold text-secondary">
                Global Coverage
              </p>
              <motion.p 
                className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                90+
              </motion.p>
              <p className="text-lg font-semibold text-muted-foreground">Countries</p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div 
            className="pt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="px-10 py-4 rounded-full text-base font-bold bg-white text-foreground border-2 border-primary shadow-lg group inline-flex items-center gap-3"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: '0 10px 40px hsl(var(--primary) / 0.4)',
              }}
              transition={{ duration: 0.3 }}
            >
              Find Your Auditor Now
              <PixelIcon 
                name="arrow-right" 
                className="w-5 h-5" 
                color="currentColor" 
              />
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
