import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsPotentialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const comparisonRows = [
    { label: "Payment", traditional: "60–90 days", yvoo: "14 days guaranteed" },
    { label: "Rate", traditional: "Hourly (€50–80)", yvoo: "Per audit (€700 flat)" },
    { label: "Tools", traditional: "Manual checklists", yvoo: "Atlas AI" },
    { label: "Travel", traditional: "Required", yvoo: "Work locally" },
  ];

  return (
    <section ref={ref} data-nav-theme="light" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Earnings
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            Your Earning Potential
          </h2>
        </motion.div>

        {/* Earnings Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { value: "€700–€2,500", label: "Per audit" },
            { value: "4–6 audits", label: "Per month average" },
            { value: "€2,800–€15,000", label: "Monthly income potential" },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#f5f5f5] p-8">
              <p className="text-3xl md:text-4xl font-semibold text-foreground mb-2">{item.value}</p>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-8 text-sm font-medium text-muted-foreground uppercase tracking-wider"></th>
                  <th className="text-left py-4 pr-8 text-sm font-medium text-muted-foreground uppercase tracking-wider">Traditional Firms</th>
                  <th className="text-left py-4 text-sm font-medium text-primary uppercase tracking-wider">YVOO</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-5 pr-8 font-medium text-foreground">{row.label}</td>
                    <td className="py-5 pr-8 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive flex-shrink-0" />
                        {row.traditional}
                      </span>
                    </td>
                    <td className="py-5 text-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {row.yvoo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Timeline to First Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0a0a0a] p-8 md:p-12 rounded-lg mb-12"
        >
          <p className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase mb-6">
            Timeline to first payment
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
            {[
              { day: "Monday", action: "Apply" },
              { day: "Wednesday", action: "Approved" },
              { day: "Friday", action: "First audit" },
              { day: "+14 days", action: "Paid" },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 md:flex-1">
                <div>
                  <p className="text-white font-medium">{step.day}</p>
                  <p className="text-white/50 text-sm">{step.action}</p>
                </div>
                {idx < 3 && (
                  <ArrowRight className="w-5 h-5 text-primary hidden md:block ml-auto mr-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Credibility Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground text-lg">
            Join <span className="text-foreground font-semibold">2,000+ certified auditors</span> · <span className="text-foreground font-semibold">47 countries</span> · <span className="text-foreground font-semibold">20+ standards</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <a href="#">
              Check if you qualify
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsPotentialSection;
