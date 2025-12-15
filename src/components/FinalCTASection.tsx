import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "./PixelIcon";

const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Transform Your Supplier Audits?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join leading enterprises using YVOO to reduce audit costs by 70% while maintaining the highest quality standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            >
              Order Audit
              <PixelIcon name="arrow-right" className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
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
            className="mt-12 pt-8 border-t border-white/20"
          >
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              <span>✓ No setup fees</span>
              <span>✓ Pay per audit</span>
              <span>✓ 24/7 Support</span>
              <span>✓ Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
