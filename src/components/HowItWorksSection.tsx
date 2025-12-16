import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Place an Audit Request with 1 Click",
    description: "Easily schedule a supplier audit through YVOO's platform or integrate it with your ERP system. With just a click, you can request an audit, making the process hassle-free.",
    feature: "Quick integration with ERP systems",
    badge: "1-Click",
  },
  {
    number: "02",
    title: "Smart Auditor Matching",
    description: "Our AI instantly matches your request with the best-qualified auditor from our global network based on location, expertise, and certifications.",
    feature: "AI-powered matching algorithm",
    badge: "AI Match",
  },
  {
    number: "03",
    title: "Real-Time Audit Tracking",
    description: "Monitor your audit progress in real-time. Get live updates, photo documentation, and instant notifications throughout the entire process.",
    feature: "Live dashboard monitoring",
    badge: "Live",
  },
  {
    number: "04",
    title: "Digital Report Delivery",
    description: "Receive your comprehensive audit report within 24 hours. All findings, photos, and corrective actions are digitally documented and ready to share.",
    feature: "Reports delivered within 24 hours",
    badge: "24h",
  },
];

// Dotted Globe Component
const DottedGlobe = ({ badge }: { badge: string }) => {
  return (
    <div className="relative w-[280px] h-[280px] lg:w-[340px] lg:h-[340px]">
      {/* Black globe with dotted pattern */}
      <div 
        className="absolute inset-0 rounded-full bg-foreground"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05) 0%, transparent 40%)
          `,
          boxShadow: `
            inset -15px -15px 30px rgba(0,0,0,0.4),
            0 20px 40px rgba(0,0,0,0.15)
          `,
        }}
      />
      
      {/* Dotted world map pattern */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        style={{ opacity: 0.9 }}
      >
        {/* Generate dots for globe pattern */}
        {Array.from({ length: 20 }).map((_, row) => 
          Array.from({ length: 30 }).map((_, col) => {
            const x = 10 + col * 6;
            const y = 10 + row * 9;
            const cx = 100;
            const cy = 100;
            const dx = x - cx;
            const dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 85) return null;
            
            // Create landmass-like patterns
            const noise = Math.sin(x * 0.15) * Math.cos(y * 0.12) + Math.sin(x * 0.08 + y * 0.1);
            const isLand = noise > -0.3 && Math.random() > 0.3;
            
            if (!isLand) return null;
            
            const opacity = 1 - (dist / 100) * 0.3;
            const size = 1.5 + (1 - dist / 100) * 0.8;
            
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r={size}
                fill="white"
                opacity={opacity}
              />
            );
          })
        )}
      </svg>
      
      {/* Highlight reflection */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '30%',
          height: '20%',
          top: '15%',
          left: '20%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(10px)',
        }}
      />
      
      {/* Badge positioned on sphere */}
      <div className="absolute top-1/2 right-[-20px] lg:right-[-30px] -translate-y-1/2">
        <motion.span 
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground/60"></span>
          {badge}
        </motion.span>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#f8f9fa]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            How does YVOO Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Four simple steps to transform your supplier audit process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Sphere Side */}
                <div className="relative bg-[#f0f0f0] p-8 lg:p-12 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                  {/* Large Step Number Background */}
                  <span className="absolute top-6 left-8 text-[120px] lg:text-[180px] font-black text-foreground/5 leading-none select-none">
                    {step.number}
                  </span>
                  
                  {/* Metallic Sphere */}
                  <div className="relative z-10">
                    <DottedGlobe badge={step.badge} />
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Step Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1.5 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                      Step {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Feature Highlight */}
                  <p className="text-sm text-muted-foreground">
                    {step.feature}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
