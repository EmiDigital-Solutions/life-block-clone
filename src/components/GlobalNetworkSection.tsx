import { motion } from "framer-motion";

const certifications = ["ISO Lead Auditor", "VDA 6.3", "IATF 16949", "AS9100", "ISO 13485"];

const GlobalNetworkSection = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        
        <div className="py-16 md:py-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 bg-primary" />
            <span className="font-mono text-sm tracking-wide lowercase text-muted-foreground">
              Global Coverage
            </span>
          </motion.div>

          {/* Large headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground tracking-tight leading-[0.95] max-w-4xl mb-16 md:mb-24"
          >
            Your auditor
            <br />
            is already there
          </motion.h2>

          {/* Bottom text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-foreground/10 pt-8"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Supplier in Shanghai? Auditor in Shanghai. Supplier in São Paulo? Auditor in São Paulo. No flights. No hotels. No waiting.
            </p>
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">
                All auditors are certified by authorized certification bodies worldwide
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                {certifications.map((cert, i) => (
                  <span key={cert} className="flex items-center gap-4">
                    {i > 0 && <span className="text-muted-foreground/20">·</span>}
                    <span className="text-sm">{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default GlobalNetworkSection;
