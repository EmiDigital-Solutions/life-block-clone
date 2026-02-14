import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";

const FinalCTASection = () => {
  const [showROIModal, setShowROIModal] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
           <h2 className="section-headline text-foreground mb-4">
             Your competitors switched last quarter.
           </h2>

           <p className="text-xl md:text-2xl text-muted-foreground mb-10">
             €15,000 → €700 per audit <span className="mx-2 text-muted-foreground/40">|</span> 10 weeks → 3 days <span className="mx-2 text-muted-foreground/40">|</span> Only 12 enterprise slots left this quarter
           </p>

          <Button
            size="lg"
            onClick={() => {
              const demoSection = document.getElementById('platform-demo');
              if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See How YVOO Works
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-base underline underline-offset-4 transition-colors"
            >
              Book Expert Call
            </a>
            <span className="text-muted-foreground/30 hidden sm:inline">|</span>
            <button
              onClick={() => setShowROIModal(true)}
              className="text-muted-foreground hover:text-foreground text-base underline underline-offset-4 transition-colors"
            >
              Calculate Your ROI
            </button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <span>No setup fees</span>
              <span>Pay per audit</span>
              <span>Dedicated account manager</span>
              <span>Enterprise SLA available</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ROI Calculator Modal */}
      <Dialog open={showROIModal} onOpenChange={setShowROIModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Calculate Your ROI</DialogTitle>
          </DialogHeader>
          <ROICalculator />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FinalCTASection;
