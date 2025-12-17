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
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="font-semibold text-foreground">Conversations</span>{" "}
            <span className="font-normal text-muted-foreground">that keep</span>
            <br />
            <span className="font-normal text-muted-foreground">supply chains</span>{" "}
            <span className="font-semibold text-foreground">moving.</span>
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
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">Usual</p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 w-full relative bg-gray-200"
              >
                <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
                <p className="text-sm text-gray-700 leading-relaxed pl-6">
                  Hi Sarah,<br/><br/>
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
              <p className="text-3xl lg:text-4xl font-bold text-primary">With ScanPro</p>
            </div>
            
            <div className="space-y-3">
              {/* Message bubble */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="rounded-2xl rounded-tl-sm p-5 w-full relative bg-primary/10 border border-primary/20"
              >
                <div className="absolute left-5 top-7 w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <div className="absolute left-5 top-1/2 w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="absolute left-5 bottom-7 w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.6s" }}></div>
                <p className="text-sm text-gray-800 leading-relaxed pl-6">
                  Hey Sarah,<br/><br/>
                  No problem - I've got you covered!<br/><br/>
                  I've assigned one of our certified local auditors from the region. He's ISO/VDA qualified and has done similar audits for automotive suppliers, so quality standards are guaranteed.<br/><br/>
                  Date is agreed with your supplier for next week Tuesday. Cost is €700 total, and you'll receive the complete digital report within 24 hours after the audit is completed, including photos, scoring, and detailed findings.<br/><br/>
                  I'm sending you the tracking link where you can see the auditor's profile, certifications, and follow the entire audit process in real-time. All documentation will be centralized there as well.<br/><br/>
                  Let me know if you need anything else!<br/><br/>
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
