import { motion } from "framer-motion";
import Earth3D from "@/components/Earth3D";
import { PixelIcon } from "@/components/PixelIcon";

const GlobalNetworkSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header - simple, no box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Global Coverage</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-center"
        >
          <span className="font-semibold text-foreground">Global On-Demand</span>{" "}
          <span className="font-normal text-muted-foreground">Auditor Network</span>
        </motion.h2>

        {/* Globe - Full filled, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="w-full max-w-xl">
            <Earth3D height="450px" showPins={true} />
          </div>
        </motion.div>

        {/* Content below globe - no box, just text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center mb-10"
        >
          6,400+ certified auditors in 120+ countries. On-site within 48 hours. €700 flat rate.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-10"
        >
          {[
            { value: "6,400+", label: "Certified Auditors" },
            { value: "120+", label: "Countries" },
            { value: "50+", label: "Standards" },
            { value: "24h", label: "Response" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-foreground mb-3">
            Our auditor network includes professionals certified by:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
            <span className="text-sm">TÜV SÜD</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-sm">Bureau Veritas</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-sm">SGS</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="text-sm">DNV</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-3">
            <span>Find Auditors</span>
            <PixelIcon name="arrow-right" className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;