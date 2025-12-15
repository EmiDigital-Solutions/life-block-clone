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

// Metallic 3D Sphere Component
const MetallicSphere = ({ badge }: { badge: string }) => {
  return (
    <div className="relative w-[200px] h-[200px] lg:w-[280px] lg:h-[280px]">
      {/* Main sphere with metallic gradient */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 25% 25%, rgba(255,255,255,0.9) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 75% 70%, rgba(200,200,200,0.4) 0%, transparent 40%),
            linear-gradient(135deg, 
              #e8e8e8 0%, 
              #d0d0d0 15%,
              #b8b8b8 30%,
              #a0a0a0 45%,
              #888888 55%,
              #707070 70%,
              #585858 85%,
              #404040 100%
            )
          `,
          boxShadow: `
            inset -20px -20px 40px rgba(0,0,0,0.3),
            inset 10px 10px 30px rgba(255,255,255,0.4),
            0 30px 60px rgba(0,0,0,0.2)
          `,
        }}
      />
      
      {/* Abstract organic shapes on sphere */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          opacity: 0.6,
        }}
      >
        {/* Dark organic shape 1 */}
        <div 
          className="absolute"
          style={{
            width: '80%',
            height: '60%',
            top: '10%',
            left: '-10%',
            background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, transparent 100%)',
            borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
            transform: 'rotate(-20deg)',
            filter: 'blur(2px)',
          }}
        />
        
        {/* Dark organic shape 2 */}
        <div 
          className="absolute"
          style={{
            width: '50%',
            height: '70%',
            bottom: '5%',
            right: '-5%',
            background: 'linear-gradient(225deg, #2a2a2a 0%, #1a1a1a 50%, transparent 100%)',
            borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
            transform: 'rotate(30deg)',
            filter: 'blur(2px)',
          }}
        />
      </div>
      
      {/* Highlight reflection */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '40%',
          height: '25%',
          top: '12%',
          left: '15%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Badge positioned on sphere */}
      <div className="absolute bottom-6 right-0 lg:bottom-8 lg:right-[-10px]">
        <motion.span 
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
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
                    <MetallicSphere badge={step.badge} />
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
