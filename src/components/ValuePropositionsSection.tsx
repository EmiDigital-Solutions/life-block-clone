import { motion } from "framer-motion";

const propositions = [
  {
    lead: "72-hour mobilization",
    detail: "Any country, any industry",
  },
  {
    lead: "From €700 per audit",
    detail: "Not €15,000–25,000",
  },
  {
    lead: "New supplier base in weeks, not years",
    detail: "Enter new markets, overcome disruptions, qualify 100+ suppliers in parallel",
  },
  {
    lead: "Your standards, AI-enhanced",
    detail: "We audit using your templates, elevated with AI",
  },
  {
    lead: "Maximum objectivity",
    detail: "AI-guided execution eliminates bias and ensures quality",
  },
  {
    lead: "On-site verified intelligence",
    detail: "Real supplier data with predictive insights, not questionnaires or databases",
  },
  {
    lead: "Automated follow-up & close-out",
    detail: "Reminders, evidence re-verification, confirmation — no finding ever dies in a spreadsheet",
  },
];

const ValuePropositionsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.1] mb-16 md:mb-20 max-w-3xl"
        >
          What makes YVOO different
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-5 space-y-0">
            {propositions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="border-t border-background/15 py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 items-baseline"
              >
                <p className="text-lg md:text-xl lg:text-2xl font-semibold tracking-[-0.01em] leading-snug">
                  {item.lead}
                </p>
                <p className="text-background/60 text-sm md:text-base leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-background/15" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;
