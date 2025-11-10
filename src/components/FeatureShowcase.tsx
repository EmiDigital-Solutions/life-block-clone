import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import dashboardImage from "@/assets/scanpro-ai-dashboard.jpg";

const FeatureShowcase = () => {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden" style={{ backgroundColor: "#2A2D35" }}>
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
              ScanPro+: AI‑guided on‑site audits
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Certified local experts conduct standardized audits using AI-powered templates and 1–5 scoring methodology.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FFEB3B] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Evidence‑linked findings</span> — Photos, documents, and video documentation
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FFEB3B] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Compliance support</span> — ISO 9001, IATF 16949, AS9100, ISO 14001, GMP compliance
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#FFEB3B] flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Benchmarkable data</span> — Compare performance across plants and suppliers
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 font-semibold"
                style={{ 
                  backgroundColor: "#FFEB3B", 
                  color: "#000",
                  borderRadius: "9999px"
                }}
              >
                Request a demo
              </Button>
            </div>

            <p className="text-sm text-gray-400 italic">
              Take the right risks. Eliminate the wrong ones.
            </p>
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
              {/* Laptop Frame Effect */}
              <div 
                className="relative rounded-xl overflow-hidden shadow-2xl"
                style={{
                  transform: "perspective(1200px) rotateY(-15deg) rotateX(5deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Screen Border */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl">
                  <div className="bg-black rounded-lg overflow-hidden">
                    <img 
                      src={dashboardImage} 
                      alt="ScanPro+ AI Dashboard showing audit analytics and compliance metrics"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 -z-10 blur-3xl opacity-30"
                style={{
                  background: "radial-gradient(circle at center, #FFEB3B 0%, transparent 70%)"
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
          background: "radial-gradient(circle at 20% 50%, #14B8A6 0%, transparent 50%)"
        }}
      />
    </section>
  );
};

export default FeatureShowcase;
