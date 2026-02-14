import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Check, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsPotentialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const paymentComparison = [
    { traditional: "Submit invoice", yvoo: "Submit report" },
    { traditional: "Wait for approval", yvoo: "Instant validation" },
    { traditional: "Chase payment", yvoo: "Auto-release" },
    { traditional: "30–90 days typical", yvoo: "Same business day" },
  ];

  const exampleAudits = [
    { standard: "ISO 9001", location: "Munich", fee: "€850", distance: "12 km" },
    { standard: "VDA 6.3", location: "Stuttgart", fee: "€1,200", distance: "25 km" },
    { standard: "IATF 16949", location: "Ingolstadt", fee: "€1,450", distance: "8 km" },
    { standard: "AS9100", location: "Hamburg", fee: "€1,100", distance: "18 km" },
  ];

  return (
    <>
      {/* Payment Process Section */}
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
                Payment Process
              </span>
            </div>
            <h2 className="section-headline text-foreground">
              Simple. Transparent. Immediate.
            </h2>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-8 text-sm font-medium text-muted-foreground uppercase tracking-wider">Traditional</th>
                    <th className="text-left py-4 text-sm font-medium text-primary uppercase tracking-wider">With YVOO</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentComparison.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50">
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

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            No invoicing. No waiting. No uncertainty.
          </motion.p>
        </div>
      </section>

      {/* Real Opportunities Section */}
      <RealOpportunitiesSection audits={exampleAudits} />
    </>
  );
};

const RealOpportunitiesSection = ({ audits }: { audits: { standard: string; location: string; fee: string; distance: string }[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} data-nav-theme="light" className="py-24 md:py-32 bg-[#f5f5f5]">
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
              Opportunities
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            Real assignments. Real fees.
          </h2>
        </motion.div>

        {/* Audit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {audits.map((audit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 border border-border"
            >
              <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-3">{audit.standard}</p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>{audit.location}</span>
              </div>
              <p className="text-2xl font-semibold text-foreground mb-1">{audit.fee}</p>
              <p className="text-sm text-muted-foreground">{audit.distance} from you</p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground/60 mb-10"
        >
          Examples based on recent assignments
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button asChild size="lg" variant="outline">
            <a href="#">
              See available opportunities
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsPotentialSection;
