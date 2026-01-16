import { motion } from "framer-motion";
import dottedWorldMap from "@/assets/dotted-world-map.png";
import { ArrowRight } from "lucide-react";

const regions = [
  { name: "Europe", auditors: "2,400+", x: "48%", y: "28%" },
  { name: "Asia Pacific", auditors: "1,800+", x: "75%", y: "45%" },
  { name: "Americas", auditors: "1,200+", x: "22%", y: "40%" },
  { name: "Middle East", auditors: "600+", x: "58%", y: "42%" },
  { name: "Africa", auditors: "400+", x: "52%", y: "58%" },
];

const GlobalNetworkSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-[#ebebeb] p-8 md:p-12 lg:p-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Global Coverage</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-headline text-foreground"
              >
                Your auditor is already there
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                Supplier in Shanghai? Auditor in Shanghai. Supplier in São Paulo? Auditor in São Paulo. No flights. No hotels. No waiting.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="text-left"
              >
                <p className="text-sm font-semibold text-foreground mb-3">
                  Our auditor network includes professionals certified by:
                </p>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span className="text-sm">TÜV SÜD</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-sm">Bureau Veritas</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-sm">SGS</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-sm">DNV</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="https://calendly.com/yvoo/demo-yvoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-foreground text-foreground px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-foreground hover:text-background flex items-center gap-3 group"
                >
                  <span>See Coverage Map</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-foreground/10"
              >
                {[
                  { value: "2,000+", label: "Local Auditors" },
                  { value: "90+", label: "Countries" },
                  { value: "48h", label: "On-site" },
                  { value: "€0", label: "Travel Costs" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <img
                  src={dottedWorldMap}
                  alt="Global auditor network coverage"
                  className="w-full h-full object-contain p-8"
                  style={{ opacity: 0.6 }}
                />

                {/* Region markers */}
                {regions.map((region, index) => (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="absolute group cursor-pointer"
                    style={{ left: region.x, top: region.y, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute rounded-full bg-primary"
                      animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ width: '24px', height: '24px', left: '-12px', top: '-12px' }}
                    />
                    
                    {/* Marker dot */}
                    <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg z-10" />
                    
                    {/* Label on hover */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <div className="bg-foreground text-background px-3 py-2 rounded-lg shadow-xl">
                        <p className="text-xs font-semibold">{region.name}</p>
                        <p className="text-xs font-bold text-primary">{region.auditors}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;