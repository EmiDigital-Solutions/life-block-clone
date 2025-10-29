import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Users, FileCheck, Clock } from "lucide-react";

const GroundIntelligence = () => {
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
              On-Site Supplier Qualification
            </h1>
            <p className="text-xl text-white/70 font-sans mb-8">
              Physical factory audits performed by certified professionals. Get real intelligence from the ground, not just paperwork.
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
              Request Audit
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">2,000+</div>
              <div className="text-lg text-white/80">Certified Auditors</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">48h</div>
              <div className="text-lg text-white/80">Audit Deployment</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">€700</div>
              <div className="text-lg text-white/80">Starting Price</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-lg text-white/80">Report Delivery</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-sans font-bold text-white mb-16 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Request Audit
              </h3>
              <p className="text-white/70">
                Submit supplier details and audit requirements through our platform
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Auditor Assignment
              </h3>
              <p className="text-white/70">
                We match you with a certified local auditor within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                On-Site Visit
              </h3>
              <p className="text-white/70">
                Physical inspection of facilities, processes, and documentation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-sans font-semibold text-white mb-3">
                Detailed Report
              </h3>
              <p className="text-white/70">
                Comprehensive audit report with photos and recommendations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-black rounded-lg"
            >
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Local Expertise
              </h3>
              <p className="text-white/70">
                Our auditors are located in 90+ countries with deep local market knowledge and language capabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-black rounded-lg"
            >
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Certified Professionals
              </h3>
              <p className="text-white/70">
                All auditors hold ISO, VDA, or IATF certifications with years of industry experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-black rounded-lg"
            >
              <FileCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Comprehensive Reports
              </h3>
              <p className="text-white/70">
                Detailed findings with photos, compliance scores, and actionable recommendations for improvement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-black rounded-lg"
            >
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                Fast Turnaround
              </h3>
              <p className="text-white/70">
                From request to final report in 3-5 days. 80% faster than traditional audit services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-sans font-bold text-white mb-6">
            Get Ground Truth, Not Just Documents
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Request a physical supplier audit today. Starting from €700.
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
            Request Audit Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroundIntelligence;
