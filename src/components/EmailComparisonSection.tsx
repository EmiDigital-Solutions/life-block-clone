import { motion } from "framer-motion";

const EmailComparisonSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-headline text-foreground">
            Conversations that keep<br />
            <span className="inline-block px-4 py-1 bg-[#0A7FA5] skew-x-[-12deg] mt-2"><span className="inline-block skew-x-[12deg] text-white font-medium">supply chains</span></span> moving
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Usual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="mb-6">
              <p className="text-2xl lg:text-3xl font-medium text-foreground">Traditional approach</p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl p-6 w-full bg-gray-100"
              >
                <p className="text-sm text-gray-700 leading-relaxed">
                  Hi Sarah,<br/><br/>
                  Let me check if I have anyone available in that region. Our auditors are booked for the next 3 weeks, and flying someone from Germany will cost around €12,000 with travel.<br/><br/>
                  I'll get back to you by end of the week with options.<br/><br/>
                  Best,<br/>
                  Michael
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* With YVOO */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="mb-6">
              <p className="text-2xl lg:text-3xl font-medium text-foreground">
                With <span className="inline-block px-3 py-0.5 bg-[#0A7FA5] skew-x-[-12deg]"><span className="inline-block skew-x-[12deg] text-white">YVOO</span></span>
              </p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubble */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="rounded-2xl p-6 w-full bg-[#0A7FA5]"
              >
                <p className="text-sm text-white leading-relaxed">
                  Hey Sarah,<br/><br/>
                  Done! I've assigned Nguyen Tran—a VDA 6.3 certified auditor based in Ho Chi Minh City. He's audited 50+ automotive suppliers in the region.<br/><br/>
                  Audit confirmed for next Tuesday. Total cost: €700. You'll have the digital report with photos, scores, and findings within 24h after completion.<br/><br/>
                  Track everything live here: [link]<br/><br/>
                  Michael
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
