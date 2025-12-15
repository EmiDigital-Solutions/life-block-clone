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
          {/* Mixed weight heading like offmenu */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight">
            <span className="font-bold text-foreground">Ready to</span>{" "}
            <span className="font-light text-muted-foreground">transform your</span>
            <br />
            <span className="font-light text-muted-foreground">supplier audits?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Join leading enterprises using YVOO to reduce audit costs by 70% while maintaining the highest quality standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium"
            >
              Order Audit
              <PixelIcon name="arrow-right" className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-border text-foreground hover:bg-muted rounded-full px-8 py-6 text-base font-medium"
            >
              Book a Demo
            </Button>
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
              <span>24/7 Support</span>
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
