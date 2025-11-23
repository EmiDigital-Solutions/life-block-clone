import { motion } from "framer-motion";

const EmailComparisonSection = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Without ScanPro+ */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-sm font-medium text-gray-900">Without ScanPro+</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">Hey Sarah,</p>
                <p className="text-sm text-gray-700">
                  Thanks for the audit request for the supplier in Vietnam.
                </p>
              </div>
              
              <p className="text-sm text-gray-700">
                Let me check my team's availability... Unfortunately, I don't have local auditors in that region. My closest resource is in Thailand but he's on another project for the next 3 weeks.
              </p>
              
              <p className="text-sm text-gray-700">
                I could send someone from our office, but you're looking at around €12,000-15,000 for travel, accommodation, and audit fees. Plus I'd need 2-3 weeks lead time to arrange everything and coordinate with the supplier.
              </p>
              
              <p className="text-sm text-gray-700">
                Alternatively, I could outsource to a local Vietnamese agency, but I've never worked with them before and can't guarantee they follow our quality standards.
              </p>
              
              <p className="text-sm text-gray-700">
                What would work better for your timeline and budget?
              </p>
              
              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-900">Best,</p>
                <p className="text-sm font-semibold text-gray-900">Michael</p>
              </div>
            </div>
          </div>

          {/* With ScanPro+ */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full" style={{ background: "linear-gradient(135deg, #A8C5B8 0%, #A8B8CA 100%)" }}>
              <span className="text-sm font-medium text-white">With ScanPro+</span>
            </div>
            <div className="rounded-2xl shadow-lg border-2 p-6 md:p-8 space-y-4" style={{ 
              background: "linear-gradient(135deg, rgba(168, 197, 184, 0.05) 0%, rgba(168, 184, 202, 0.05) 100%)",
              borderColor: "#A8C5B8"
            }}>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">Hey Sarah,</p>
                <p className="text-sm text-gray-700">
                  Thanks for the audit request for the supplier in Vietnam.
                </p>
              </div>
              
              <p className="text-sm text-gray-700">
                No problem - I just assigned one of our certified local auditors in Ho Chi Minh City through ScanPro+.
              </p>
              
              <p className="text-sm text-gray-700">
                He can do the audit next week. Cost is €700, and you'll receive the digital report within 24 hours after completion.
              </p>
              
              <p className="text-sm text-gray-700">
                I'll send you the ScanPro+ link where you can see his qualifications and track the entire process.
              </p>
              
              <p className="text-sm text-gray-700">
                Does next week work for your supplier?
              </p>
              
              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-900">Best,</p>
                <p className="text-sm font-semibold text-gray-900">Michael</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
