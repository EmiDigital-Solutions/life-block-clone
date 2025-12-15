import { motion } from "framer-motion";
import illustrationOneClick from "@/assets/illustration-one-click.jpg";
import illustrationSmartMatch from "@/assets/illustration-smart-match.jpg";
import illustrationLiveTracking from "@/assets/illustration-live-tracking.jpg";
import illustrationRealtimeAlerts from "@/assets/illustration-realtime-alerts.jpg";

const steps = [
  {
    number: "01",
    title: "Place an Audit Request with 1 Click",
    description: "Easily schedule a supplier audit through YVOO's platform or integrate it with your ERP system. With just a click, you can request an audit, making the process hassle-free.",
    feature: "Quick integration with ERP systems",
    image: illustrationOneClick,
    badge: "1-Click",
  },
  {
    number: "02",
    title: "Smart Auditor Matching",
    description: "Our AI instantly matches your request with the best-qualified auditor from our global network based on location, expertise, and certifications.",
    feature: "AI-powered matching algorithm",
    image: illustrationSmartMatch,
    badge: "AI Match",
  },
  {
    number: "03",
    title: "Real-Time Audit Tracking",
    description: "Monitor your audit progress in real-time. Get live updates, photo documentation, and instant notifications throughout the entire process.",
    feature: "Live dashboard monitoring",
    image: illustrationLiveTracking,
    badge: "Live",
  },
  {
    number: "04",
    title: "Digital Report Delivery",
    description: "Receive your comprehensive audit report within 24 hours. All findings, photos, and corrective actions are digitally documented and ready to share.",
    feature: "Reports delivered within 24 hours",
    image: illustrationRealtimeAlerts,
    badge: "24h",
  },
];

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
                {/* Image Side */}
                <div className="relative bg-[#f0f0f0] p-8 lg:p-12 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                  {/* Large Step Number Background */}
                  <span className="absolute top-6 left-8 text-[120px] lg:text-[180px] font-black text-foreground/5 leading-none select-none">
                    {step.number}
                  </span>
                  
                  {/* Circular Image Container */}
                  <div className="relative z-10">
                    <div className="w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden shadow-2xl">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute bottom-4 right-0 lg:bottom-6 lg:right-[-20px]">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                        {step.badge}
                      </span>
                    </div>
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
