import { motion } from "framer-motion";

const benefits = [
  {
    title: "Audit any supplier, anywhere",
    description: "Need an auditor in Shenzhen tomorrow? Done. No flights, no hotels, no delays."
  },
  {
    title: "Same quality, every audit",
    description: "AI guides every auditor through your exact requirements—consistent results your QM team can trust."
  },
  {
    title: "See supplier risk in real-time",
    description: "Live dashboards show exactly where problems are—before they become supply chain crises."
  },
  {
    title: "End the email chaos",
    description: "All findings, photos, and action items in one platform. Stop digging through inboxes."
  },
  {
    title: "Your standards, our platform",
    description: "Use VDA 6.3, IATF 16949, or your own checklists. YVOO adapts to how you work."
  },
  {
    title: "Findings → Actions → Closed",
    description: "Link every finding to a corrective action—and track it until it's resolved."
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            What changes for your team
          </h2>
        </motion.div>

        {/* Benefits Grid - offmenu style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#ebebeb] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsBenefitsSection;
