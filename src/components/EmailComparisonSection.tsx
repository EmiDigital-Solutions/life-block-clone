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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Conversations that keep supply chains moving.
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
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Usual</p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
                style={{ backgroundColor: '#7B91E8' }}
              >
                <p className="text-sm text-white leading-relaxed">
                  Sarah,<br/><br/>
                  Let me check if I have anyone available in that region.<br/><br/>
                  I'll get back to you by end of the week.<br/><br/>
                  Best,<br/>
                  Michael
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* With ScanPro */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <p className="text-3xl lg:text-4xl font-bold text-gray-900">With ScanPro</p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubble */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-5 max-w-[95%]"
                style={{ backgroundColor: '#7B91E8' }}
              >
                <p className="text-sm text-white leading-relaxed">
                  Hey Sarah,<br/><br/>
                  No problem - I've got you covered!<br/><br/>
                  I've assigned one of our certified local auditors from the region. He's ISO/VDA qualified and has done similar audits for automotive suppliers, so quality standards are guaranteed.<br/><br/>
                  The audit is scheduled for next week - I've already coordinated with your supplier and everything is set up. Cost is €700 total, and you'll receive the complete digital report within 24 hours after the audit is completed, including photos, scoring, and detailed findings.<br/><br/>
                  I'm sending you the tracking link where you can see the auditor's profile, certifications, and follow the entire audit process in real-time. All documentation will be centralized there as well.<br/><br/>
                  Does next week Tuesday or Wednesday work better for your supplier's schedule? Happy to adjust if needed.<br/><br/>
                  Best,<br/>
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
