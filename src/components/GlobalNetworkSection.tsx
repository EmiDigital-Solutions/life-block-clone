import { motion } from "framer-motion";
import worldMapMinimal from "@/assets/world-map-minimal.png";

const regions = [
  { name: "Europe", auditors: "2,400+", x: "52%", y: "30%" },
  { name: "Asia Pacific", auditors: "1,800+", x: "78%", y: "48%" },
  { name: "Americas", auditors: "1,200+", x: "25%", y: "42%" },
  { name: "Middle East", auditors: "600+", x: "60%", y: "44%" },
  { name: "Africa", auditors: "400+", x: "53%", y: "60%" },
];

const stats = [
  { value: "2,000+", label: "Local Auditors" },
  { value: "90+", label: "Countries" },
  { value: "48h", label: "On-site" },
  { value: "€0", label: "Travel Costs" },
];

const GlobalNetworkSection = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Main area with map as full-width background */}
        <div className="relative py-16 md:py-24">
          
          {/* Full-width map background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <img
              src={worldMapMinimal}
              alt=""
              aria-hidden="true"
              className="w-full max-w-none object-contain"
              style={{ opacity: 0.08 }}
            />
          </div>

          {/* Region markers on map */}
          <div className="absolute inset-0 pointer-events-none">
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="absolute group cursor-pointer pointer-events-auto"
                style={{ left: region.x, top: region.y, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  className="absolute bg-primary"
                  animate={{
                    scale: [1, 2.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ width: '20px', height: '20px', left: '-10px', top: '-10px' }}
                />
                <div className="relative w-3 h-3 bg-primary z-10" />
                
                <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                  <div className="bg-foreground text-background px-3 py-2">
                    <p className="text-xs font-semibold">{region.name}</p>
                    <p className="text-xs text-primary font-bold">{region.auditors}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text content – left aligned, overlaying the map */}
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 bg-primary"></div>
              <span className="font-mono text-sm tracking-wide lowercase text-muted-foreground">Global Coverage</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight max-w-xl mb-6"
            >
              Your auditor is already there
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
            >
              Supplier in Shanghai? Auditor in Shanghai. Supplier in São Paulo? Auditor in São Paulo. No flights. No hotels. No waiting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm font-semibold text-foreground mb-3">
                All auditors are certified by authorized certification bodies worldwide
              </p>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                {["ISO Lead Auditor", "VDA 6.3", "IATF 16949", "AS9100", "ISO 13485"].map((cert, i) => (
                  <span key={cert} className="flex items-center gap-3">
                    {i > 0 && <span className="text-muted-foreground/30">•</span>}
                    <span className="text-sm">{cert}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Band – dark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="px-8 py-8 md:py-10 text-center border-r border-background/10 last:border-r-0"
              >
                <p className="text-3xl md:text-4xl font-semibold text-background">{stat.value}</p>
                <p className="text-xs font-mono tracking-wide lowercase text-background/60 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GlobalNetworkSection;
