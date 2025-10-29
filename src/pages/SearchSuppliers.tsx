import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Globe, Shield, TrendingUp } from "lucide-react";

const SearchSuppliers = () => {
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
              Find Verified Suppliers Worldwide
            </h1>
            <p className="text-xl text-white/70 font-sans mb-8">
              Access our global database of pre-audited suppliers. Search by industry, location, certification, or capability.
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
              Search Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-xl text-white/80">Verified Suppliers</div>
              <p className="text-white/60 mt-2">Pre-audited and certified across all industries</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">90+</div>
              <div className="text-xl text-white/80">Countries</div>
              <p className="text-white/60 mt-2">Global coverage with local expertise</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary mb-2">24h</div>
              <div className="text-xl text-white/80">Response Time</div>
              <p className="text-white/60 mt-2">Fast matching with suitable suppliers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-sans font-bold text-white mb-16 text-center">
            Smart Search Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <Search className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Advanced Filtering
              </h3>
              <p className="text-white/70">
                Search by industry, certifications, capabilities, production capacity, and quality standards. Find exactly what you need.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Geographic Coverage
              </h3>
              <p className="text-white/70">
                Access suppliers across 90+ countries. Filter by region, logistics proximity, or specific manufacturing hubs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Verified Compliance
              </h3>
              <p className="text-white/70">
                All suppliers are pre-verified with ISO, VDA, IATF certifications. View audit reports and compliance status instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gray-900 rounded-lg"
            >
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Performance Insights
              </h3>
              <p className="text-white/70">
                Access quality scores, delivery performance, and historical audit data to make informed decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-sans font-bold text-white mb-6">
            Start Searching Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get instant access to verified suppliers worldwide. No commitment required.
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
            Search Suppliers Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchSuppliers;
