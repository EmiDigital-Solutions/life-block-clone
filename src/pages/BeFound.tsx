import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, BarChart, Award, Zap } from "lucide-react";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-sans font-bold text-primary mb-6">
              Get Discovered by Global Buyers
            </h1>
            <p className="text-xl text-white/70 font-sans mb-8">
              List your company in our verified supplier network. Connect with procurement teams actively searching for your capabilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                List Your Company - Free
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/10">
                Premium Features
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-sans font-bold text-white mb-4 text-center">
            Why List with YVOO?
          </h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">
            Join 50,000+ verified suppliers reaching procurement teams from Fortune 500 companies
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">500K+</div>
              <div className="text-xl text-white/80 mb-2">Buyer Searches/Month</div>
              <p className="text-white/60">Active procurement professionals looking for suppliers</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">3x</div>
              <div className="text-xl text-white/80 mb-2">More Inquiries</div>
              <p className="text-white/60">Premium listings get 3x more buyer contacts</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">FREE</div>
              <div className="text-xl text-white/80 mb-2">Basic Listing</div>
              <p className="text-white/60">No upfront costs, upgrade only when you want more visibility</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-sans font-bold text-white mb-4">
                Targeted Visibility
              </h3>
              <p className="text-lg text-white/70 mb-6">
                Your profile appears when buyers search for your specific capabilities, certifications, and geographic location. No wasted exposure.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Industry-specific categorization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Certification badges (ISO, VDA, IATF)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Capability showcase with photos</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-8 rounded-lg"
            >
              <h4 className="text-xl font-sans font-semibold text-white mb-4">Free Features</h4>
              <ul className="space-y-3 text-white/70">
                <li>✓ Company profile with contact information</li>
                <li>✓ Capability and certification listing</li>
                <li>✓ Basic search visibility</li>
                <li>✓ Inquiry management dashboard</li>
              </ul>
              
              <div className="border-t border-white/10 my-6"></div>
              
              <h4 className="text-xl font-sans font-semibold text-primary mb-4">Premium Features</h4>
              <ul className="space-y-3 text-white/70">
                <li>✓ Priority search ranking</li>
                <li>✓ Verified badge and audit reports</li>
                <li>✓ Advanced analytics and insights</li>
                <li>✓ Direct RFQ notifications</li>
                <li>✓ Multi-language support</li>
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Performance Analytics
              </h3>
              <p className="text-white/70">
                Track profile views, search appearances, and inquiry rates. Understand which capabilities buyers are searching for.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Verified Status
              </h3>
              <p className="text-white/70">
                Get verified through our audit process. Verified suppliers receive 5x more inquiries than unverified listings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-sans font-bold text-white mb-16 text-center">
            Get Started in 3 Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Create Profile
              </h3>
              <p className="text-white/70">
                Fill in company details, capabilities, and certifications. Takes 10 minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Get Verified (Optional)
              </h3>
              <p className="text-white/70">
                Request an audit to become verified. Increases visibility by 5x.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Receive Inquiries
              </h3>
              <p className="text-white/70">
                Start receiving qualified buyer inquiries directly in your dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <Zap className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-sans font-bold text-white mb-6">
            Start Getting Found Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 50,000+ suppliers already connecting with global buyers. Free to start, upgrade anytime.
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
            Create Free Profile
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
