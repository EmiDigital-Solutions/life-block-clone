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
              Superintelligence: for future‑ready supply chains
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Efficient, future-ready supply chains are key to your business' long-term success.
            </p>

            <p className="text-base text-gray-300 leading-relaxed">
              That's why Prewave not only provides concrete ROI today: it scales long into the future. Our platform uses AI and predictive analytics to provide real-time insights on supplier risk, helping you create cost-effective supply chains that turn exposure into opportunity.
            </p>

            <p className="text-sm text-gray-400 italic">
              Take the right risks. Eliminate the wrong ones.
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
                className="absolute inset-0 -z-10 blur-3xl opacity-20"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--accent)) 0%, transparent 70%)"
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
