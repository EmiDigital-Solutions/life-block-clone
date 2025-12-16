import { motion } from "framer-motion";

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Conversations that keep supply chains moving
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* Usual */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50"></div>
              <p className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Usual</p>
            </div>
            
            <div className="bg-muted rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">M</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground">Michael</span>
                    <span className="text-xs text-muted-foreground">2 days later</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hi Sarah,<br/><br/>
                    Let me check if I have anyone available in that region.<br/><br/>
                    I'll get back to you by end of the week.<br/><br/>
                    Best,<br/>
                    Michael
                  </p>
                </div>
              </div>
            </div>

            {/* Result indicator */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div>
              <span className="text-sm text-muted-foreground">Waiting for response...</span>
            </div>
          </motion.div>

          {/* With ScanPro */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p className="text-lg font-semibold text-primary uppercase tracking-wider">With YVOO</p>
            </div>
            
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary">M</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-foreground">Michael</span>
                    <span className="text-xs text-primary font-medium">2 hours later</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Hey Sarah,<br/><br/>
                    No problem - I've got you covered!<br/><br/>
                    ✓ Certified local auditor assigned from the region<br/>
                    ✓ ISO/VDA qualified with automotive experience<br/>
                    ✓ Audit scheduled for next week Tuesday<br/>
                    ✓ Cost: €700 total<br/>
                    ✓ Digital report within 24 hours<br/><br/>
                    Sending you the tracking link now.<br/><br/>
                    Best,<br/>
                    Michael
                  </p>
                </div>
              </div>
            </div>

            {/* Result indicator */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
              <span className="text-sm text-secondary font-medium">Audit confirmed & scheduled</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
