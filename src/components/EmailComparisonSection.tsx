import { motion } from "framer-motion";

const nightmareSteps = [
  { week: "Week 1–2", title: "Budget approval battles", description: "Three rounds of sign-offs. Finance wants quotes. Procurement wants justification. Nothing moves." },
  { week: "Week 3–4", title: "Find an available auditor", description: "Your quality engineer is booked. External firms need 4-week lead time. The supplier is getting impatient." },
  { week: "Week 5", title: "Coordinate with the supplier", description: "Back-and-forth emails. Time zones. Production schedules. Someone's on vacation." },
  { week: "Week 6", title: "Book flights and hotels", description: "Travel policy reviews. Expense pre-approvals. Airport transfers. All for one factory visit." },
  { week: "Week 7–8", title: "Travel, conduct the audit", description: "Your engineer is away from their real work. Jet-lagged. One auditor with a clipboard." },
  { week: "Week 9–10", title: "Wait for the report", description: "By now everyone forgot the details. The report arrives — inconsistent, incomplete, too late to act on." },
];

const EmailComparisonSection = () => {
  return (
    <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-headline text-foreground max-w-3xl mb-6">
            You know the drill
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            10 weeks. 50+ emails. €13,000 all-in. And that's if nothing goes wrong.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nightmareSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-muted p-8 md:p-10"
            >
              <p className="text-xs font-mono tracking-widest text-destructive/70 uppercase mb-3">
                {step.week}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-muted-foreground text-base text-center"
        >
          This is what "we've always done it this way" actually costs.
        </motion.p>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
