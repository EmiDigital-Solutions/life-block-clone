import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X } from "lucide-react";

/**
 * "The broken compromise" — Auditors-page editorial vocabulary.
 * 12-col split header + 4 numbered feature columns with top border rule.
 */
const items = [
  {
    n: "01",
    title: "Delegation delay",
    body: "A single cross-border site visit can take weeks to coordinate across calendars, visas, travel budgets and local access.",
  },
  {
    n: "02",
    title: "Limited ground truth",
    body: "Desktop checks and partner self-declarations do not show real capacity, welding quality, machine condition or project readiness.",
  },
  {
    n: "03",
    title: "High mission cost",
    body: "Flights, hotels and senior-engineer time make frequent partner verification too expensive for many CEIP buyer opportunities.",
  },
];

export default function BrokenCompromiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — 12-col split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">The status quo</span>
            </div>
            <h2 className="section-headline text-foreground">
              Croatian supplier audits are stuck
              <br />
              in a broken compromise
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground max-w-xl">
              Speed, local evidence and technical depth — CEIP buyers should not have to trade one against the others.
            </p>
          </motion.div>
        </div>

        {/* Feature columns — Auditors "Technology" pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-16 gap-y-12">
          {items.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="border-t-2 border-foreground/10 pt-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl md:text-7xl font-extralight text-primary opacity-60 leading-none">
                  {it.n}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-8 mb-3">
                {it.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
