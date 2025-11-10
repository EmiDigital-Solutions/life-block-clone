import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import dashboardImage from "@/assets/dashboard-hands-tablet.jpg";

const FeatureShowcase = () => {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-navy-deep">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1400px] mx-auto">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8 z-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              AI-guided on-site audits by certified local experts
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                Standardized templates and 1–5 scoring ensure consistent, reliable quality assessments across all your suppliers and manufacturing sites.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-base text-gray-300">
                    <span className="font-semibold text-white">Evidence-linked findings:</span> Photos, documents, and video documentation
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-base text-gray-300">
                    <span className="font-semibold text-white">Compliance support:</span> ISO 9001, IATF 16949, AS9100, ISO 14001, GMP, and more
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-base text-gray-300">
                    <span className="font-semibold text-white">Benchmarkable data:</span> Compare performance across plants and suppliers
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 italic">
              Professional audits. Real insights. Measurable improvement.
            </p>

            <div className="pt-4">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
              >
                Request a demo
              </Button>
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative">
              <img 
                src={dashboardImage} 
                alt="YVOO supplier intelligence dashboard with risk analytics and compliance metrics"
                className="w-full h-auto drop-shadow-2xl"
              />

              {/* Glow Effect Behind */}
              <div 
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--accent)) 0%, transparent 60%)"
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%)"
        }}
      />
    </section>
  );
};

export default FeatureShowcase;
