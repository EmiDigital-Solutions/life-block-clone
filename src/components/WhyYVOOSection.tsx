import { motion } from "framer-motion";

const stats = [
  { category: "Move faster", value: "72%", description: "Faster audit lead times compared to traditional methods" },
  { category: "Save costs", value: "60%", description: "Lower audit costs with local auditors" },
  { category: "Global reach", value: "400K+", description: "Access to certified auditors globally" },
  { category: "Get results", value: "24h", description: "Digital reports delivered within hours" }
];

const WhyYVOOSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Headline + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <h2 className="section-headline text-foreground mb-6">
            How you audit shapes how suppliers see you
          </h2>
          <p className="text-lg text-muted-foreground">
            85% of auditors still show up with a clipboard and fly across the world. YVOO uses Atlas AI and connects you with local certified auditors.
          </p>
        </motion.div>

        {/* KPI Grid 2x2 — shifted one grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-16">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-5 grid md:grid-cols-2 gap-x-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="pb-12"
              >
                <p className="text-sm text-foreground/50 font-medium tracking-wide mb-2">
                  {stat.category}
                </p>
                <div className="border-t border-foreground/20 pt-4">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="text-foreground/60 leading-relaxed text-sm">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Authority Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-l-4 border-foreground pl-8 py-6 max-w-3xl"
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-4">
            "Companies with mature supplier quality management have 30% fewer quality incidents and 20% lower warranty costs than their less mature peers."
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            — McKinsey & Company, Supply Chain Report (2024)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyYVOOSection;
