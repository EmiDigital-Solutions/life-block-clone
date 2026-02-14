import { motion } from "framer-motion";

const stats = [
  { category: "Time to verified", value: "3 days", description: "Not 10 weeks. Upload today, verified report by Thursday. While the context is still fresh." },
  { category: "Coordination required", value: "Zero", description: "No emails. No calendar Tetris. No travel booking. No budget battles. Upload → Done." },
  { category: "All-in cost", value: "€700", description: "Not €13,000. No flights, no hotels, no day rates, no surprise expenses." },
  { category: "AI-assured quality", value: "99%", description: "Atlas AI standardizes every audit. Your best auditor's thoroughness — every single time." }
];

const StatsWithQuoteSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-headline text-foreground max-w-2xl mb-16"
        >
          The numbers speak for themselves
        </motion.h2>

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
                <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">
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
          className="border-l-4 border-primary pl-8 py-6 max-w-3xl"
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

export default StatsWithQuoteSection;
