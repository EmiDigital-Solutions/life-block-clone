import { motion } from "framer-motion";

const EmailComparisonSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Usual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-block px-5 py-2 bg-gray-100 rounded-full">
              <span className="text-sm font-semibold text-gray-900">Usual</span>
            </div>
            
            <div className="space-y-3">
              {/* Message bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  Hey Sarah,<br/><br/>
                  Thanks for the audit request for the supplier in Vietnam.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[90%]"
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  Let me check my team's availability... Unfortunately, I don't have local auditors in that region. My closest resource is in Thailand but he's on another project for the next 3 weeks.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[90%]"
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  I could send someone from our office, but you're looking at around €12,000-15,000 for travel, accommodation, and audit fees. Plus I'd need 2-3 weeks lead time to arrange everything and coordinate with the supplier.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  Alternatively, I could outsource to a local Vietnamese agency, but I've never worked with them before and can't guarantee they follow our quality standards.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[75%]"
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  What would work better for your timeline and budget?<br/><br/>
                  Best,<br/>
                  Michael
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* With ScanPro+ */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-block px-5 py-2 rounded-full" style={{ background: "linear-gradient(135deg, #A8C5B8 0%, #A8B8CA 100%)" }}>
              <span className="text-sm font-semibold text-white">With ScanPro+</span>
            </div>
            
            <div className="space-y-3">
              {/* Message bubbles */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
                style={{ background: "linear-gradient(135deg, rgba(168, 197, 184, 0.15) 0%, rgba(168, 184, 202, 0.15) 100%)" }}
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  Hey Sarah,<br/><br/>
                  Thanks for the audit request for the supplier in Vietnam.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
                style={{ background: "linear-gradient(135deg, rgba(168, 197, 184, 0.15) 0%, rgba(168, 184, 202, 0.15) 100%)" }}
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  No problem - I just assigned one of our certified local auditors in Ho Chi Minh City through ScanPro+.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[90%]"
                style={{ background: "linear-gradient(135deg, rgba(168, 197, 184, 0.15) 0%, rgba(168, 184, 202, 0.15) 100%)" }}
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  He can do the audit next week. Cost is €700, and you'll receive the digital report within 24 hours after completion.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[85%]"
                style={{ background: "linear-gradient(135deg, rgba(168, 197, 184, 0.15) 0%, rgba(168, 184, 202, 0.15) 100%)" }}
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  I'll send you the ScanPro+ link where you can see his qualifications and track the entire process.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="rounded-2xl rounded-tl-sm p-4 max-w-[75%]"
                style={{ background: "linear-gradient(135deg, rgba(168, 197, 184, 0.15) 0%, rgba(168, 184, 202, 0.15) 100%)" }}
              >
                <p className="text-sm text-gray-900 leading-relaxed">
                  Does next week work for your supplier?<br/><br/>
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
