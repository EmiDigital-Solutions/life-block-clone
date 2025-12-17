import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "./PixelIcon";

const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Mixed weight heading - competitive urgency */}
          <h2 className="section-headline text-foreground mb-6">
            Leading OEMs already made the switch
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Companies like Bosch, Continental, and ZF trust YVOO to audit faster, cheaper, and smarter. See how we can transform your supplier quality operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium inline-flex items-center gap-2"
            >
              Book a Demo
              <PixelIcon name="arrow-right" className="w-4 h-4" />
            </a>
            <a
              href="/scanpro-plus"
              className="border border-border text-foreground hover:bg-muted rounded-full px-8 py-6 text-base font-medium inline-flex items-center justify-center"
            >
              Explore ScanPro+
            </a>
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
    </section>
  );
};

export default FinalCTASection;
