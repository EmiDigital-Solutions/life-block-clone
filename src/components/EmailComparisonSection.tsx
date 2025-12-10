import { motion } from "framer-motion";
import { Check } from "lucide-react";

const EmailComparisonSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conversations that keep supply chains moving
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Usual - Email Interface */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Usual</span>
            </div>
            
            <div className="bg-muted/30 rounded-xl p-6 sm:p-8 min-h-[400px]">
              {/* Email Header */}
              <div className="border-b border-border pb-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">MW</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Michael Weber</p>
                    <p className="text-xs text-muted-foreground">audit-services@partner.com</p>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days later</span>
                </div>
                <p className="text-sm text-foreground font-medium">Re: Audit Request – Vietnam</p>
              </div>

              {/* Email Body */}
              <div className="text-sm text-foreground/80 leading-relaxed space-y-4">
                <p>Dear Sarah,</p>
                <p>
                  Thank you for your request. Unfortunately, we don't have qualified auditors in Vietnam at this time.
                </p>
                <p>
                  We could send someone from Singapore, but this would add travel costs and extend the timeline to 2–3 weeks.
                </p>
                <p>
                  Let me know if you'd like a formal quotation.
                </p>
                <div className="pt-4 text-muted-foreground">
                  <p>Best regards,</p>
                  <p>Michael Weber</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* With YVOO - Order Confirmation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground tracking-wide uppercase">With YVOO</span>
              <span className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">Instant</span>
            </div>
            
            <div className="bg-muted/30 rounded-xl p-6 sm:p-8 min-h-[400px]">
              {/* Order Confirmation Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-secondary" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Audit Confirmed</p>
                  <p className="text-xs text-muted-foreground">Order #YV-2024-1847</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Supplier</span>
                  <span className="text-sm text-foreground font-medium">TechParts Vietnam Co.</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Audit Date</span>
                  <span className="text-sm text-foreground font-medium">Next Tuesday</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Auditor</span>
                  <span className="text-sm text-foreground font-medium">Local, ISO/VDA certified</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Report Delivery</span>
                  <span className="text-sm text-foreground font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-muted-foreground">Total Cost</span>
                  <span className="text-sm text-foreground font-medium">€700</span>
                </div>
              </div>

              {/* Tracking Link */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Track progress in real-time via your dashboard
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
