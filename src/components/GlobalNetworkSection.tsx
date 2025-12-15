import { motion } from "framer-motion";
import dottedWorldMap from "@/assets/dotted-world-map.png";

const regions = [
  { name: "Europe", auditors: "2,400+", x: "48%", y: "28%" },
  { name: "Asia Pacific", auditors: "1,800+", x: "75%", y: "45%" },
  { name: "Americas", auditors: "1,200+", x: "22%", y: "40%" },
  { name: "Middle East", auditors: "600+", x: "58%", y: "42%" },
  { name: "Africa", auditors: "400+", x: "52%", y: "58%" },
];

const GlobalNetworkSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Global Auditor Network
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            6,400+ certified auditors in 120+ countries, ready to audit your suppliers
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* World Map */}
          <div className="relative aspect-[2/1] rounded-3xl overflow-hidden bg-muted/20">
            <img
              src={dottedWorldMap}
              alt="Global auditor network coverage"
              className="w-full h-full object-contain opacity-60"
            />

            {/* Region markers */}
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="absolute"
                style={{ left: region.x, top: region.y, transform: 'translate(-50%, -50%)' }}
              >
                {/* Pulse effect */}
                <div className="absolute inset-0 animate-ping bg-primary/30 rounded-full w-4 h-4" />
                
                {/* Marker dot */}
                <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg" />
                
                {/* Label */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-border">
                    <p className="text-xs font-semibold text-foreground">{region.name}</p>
                    <p className="text-xs text-primary font-bold">{region.auditors}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "6,400+", label: "Certified Auditors" },
              { value: "120+", label: "Countries Covered" },
              { value: "50+", label: "Audit Standards" },
              { value: "24h", label: "Average Response" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
