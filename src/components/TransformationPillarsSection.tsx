import { motion } from "framer-motion";

const pillars = [
  {
    number: "1",
    title: "One platform for every audit.",
    description: "Run complex VDA 6.3 process audits and quick supplier assessments in one place. No more scattered tools, emails, and Excel trackers."
  },
  {
    number: "2",
    title: "AI that ensures consistency.",
    description: "Our AI-powered workflows guide every auditor through standardized assessments. Same questions, same scoring, same report format—regardless of who conducts the audit."
  },
  {
    number: "3",
    title: "Reports your team can trust.",
    description: "Digital reports delivered within 24 hours with findings, photos, risk scores, and recommended actions—ready to import into your QMS."
  }
];

const TransformationPillarsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-headline text-foreground max-w-3xl">
            YVOO transforms your audit experience
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              {/* Number + Title */}
              <div>
                <span className="text-5xl md:text-6xl font-bold text-primary/20">
                  {pillar.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationPillarsSection;
