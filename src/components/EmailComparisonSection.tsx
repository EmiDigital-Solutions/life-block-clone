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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conversations that keep supply chains moving
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Usual - Email Interface */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-muted-foreground">Usual</span>
            </div>
            
            {/* Email Client Window */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Email App Header */}
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-sm text-muted-foreground font-medium">Inbox</span>
              </div>
              
              {/* Email Content */}
              <div className="bg-background">
                {/* Email Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">M</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Michael Weber</p>
                        <p className="text-xs text-muted-foreground">michael.weber@auditfirm.com</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Fri, 3 days later</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>To:</span>
                    <span>sarah.mueller@company.com</span>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-2">Re: Urgent Audit Request - Vietnam Supplier</p>
                </div>

                {/* Email Body */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="px-4 sm:px-6 py-4 min-h-[220px]"
                >
                  <div className="text-sm text-foreground leading-relaxed space-y-4">
                    <p>Dear Sarah,</p>
                    <p>
                      Thank you for reaching out. I have checked our availability and unfortunately, 
                      we do not currently have any qualified auditors in the Vietnam region.
                    </p>
                    <p>
                      We could potentially send someone from our Singapore office, but this would 
                      require additional travel arrangements and costs. The earliest available 
                      slot would be in approximately 2-3 weeks.
                    </p>
                    <p>
                      Please let me know if you would like to proceed with this option, 
                      and I will send you a formal quotation.
                    </p>
                    <p className="pt-2">
                      Best regards,<br />
                      Michael Weber<br />
                      <span className="text-muted-foreground">Senior Audit Manager</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* With YVOO - Modern Chat */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-foreground">With YVOO</span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">8 min response</span>
            </div>
            
            {/* Chat Window */}
            <div className="bg-card rounded-2xl border border-primary/20 shadow-lg overflow-hidden">
              {/* Chat App Header */}
              <div className="bg-primary/5 px-4 py-3 border-b border-primary/10 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground font-medium">YVOO Platform</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              </div>
              
              {/* Messages Container */}
              <div className="p-4 sm:p-6 space-y-4 min-h-[320px] bg-background">
                {/* Sarah's Message */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-accent-foreground">S</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">Sarah</span>
                      <span className="text-xs text-muted-foreground">10:23 AM</span>
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        Need an urgent audit at our new supplier in Vietnam. Can you help?
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Michael's Response */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-primary">M</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-semibold text-foreground">Michael</span>
                      <span className="text-xs text-muted-foreground">10:31 AM</span>
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 space-y-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        Done! Here are the details:
                      </p>
                      <div className="space-y-2 text-sm text-foreground">
                        <div className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Local auditor assigned (ISO/VDA certified)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Audit confirmed for next Tuesday</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Total cost: €700</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>Digital report within 24h</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed pt-1">
                        Tracking link sent to your inbox 📩
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Delivered Status */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex justify-end"
                >
                  <span className="text-xs text-primary font-medium">✓✓ Delivered</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
