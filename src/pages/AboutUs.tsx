import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState("zagreb");

  const locations = {
    zagreb: {
      name: "Zagreb (Headquarters)",
      address: "Ulica grada Vukovara 271, 10000 Zagreb, Croatia",
      phone: "+385 1 234 5678",
      email: "info@yvoo.com"
    },
    frankfurt: {
      name: "Frankfurt Office",
      address: "Bockenheimer Landstraße 2-4, 60306 Frankfurt, Germany",
      phone: "+49 69 1234 5678",
      email: "frankfurt@yvoo.com"
    },
    munich: {
      name: "Munich Office",
      address: "Leopoldstraße 244, 80807 Munich, Germany",
      phone: "+49 89 1234 5678",
      email: "munich@yvoo.com"
    },
    stuttgart: {
      name: "Stuttgart Office",
      address: "Königstraße 10, 70173 Stuttgart, Germany",
      phone: "+49 711 1234 5678",
      email: "stuttgart@yvoo.com"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SECTION 1: HERO SECTION */}
      <section 
        data-nav-theme="dark"
        className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm aspect-[4/3] flex items-center justify-center border border-white/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 p-8">
                    <Zap className="w-32 h-32 mx-auto text-white animate-pulse-soft drop-shadow-lg" />
                    <p className="text-2xl font-bold text-white drop-shadow-md">AI-Powered Procurement</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white leading-[1.1] tracking-[-0.02em]">
                AI-Powered Solutions for Global Procurement Excellence
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90">
                Transforming B2B Supplier Discovery, Auditing, and Management
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                YVOO leads the AI revolution in procurement and supplier intelligence. With our award-winning technology, 
                businesses get instant supplier discovery, on-site auditing in days (not weeks), and global supplier 
                visibility—all powered by AI.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNOLOGY & INNOVATION */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Circular Diagram */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Center AI Logo */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-xl">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-center mt-3 font-bold text-gray-900">AI Core</p>
                </motion.div>
                
                {/* Orbiting Products */}
                <motion.div 
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Target className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">SearchPro+</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Shield className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">ScanPro+</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                >
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <TrendingUp className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">SalesPro+</span>
                  </div>
                </motion.div>
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="85%" y1="50%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="85%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900">
                Technology and <span className="text-green-600">Innovation</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                With cutting-edge AI, YVOO's platforms deliver next-generation procurement intelligence. 
                <strong className="text-gray-900"> SearchPro+</strong> discovers suppliers globally in seconds, 
                <strong className="text-gray-900"> ScanPro+</strong> conducts on-site audits with certified auditors in 90+ countries, and 
                <strong className="text-gray-900"> SalesPro+</strong> gives suppliers visibility to 7 million+ B2B decision-makers. 
                Our AI learns from every interaction and becomes a true partner in your supply chain team.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION & VALUES */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900">
              Our Mission and <span className="text-green-600">Values</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Exceptional supplier relationships with every interaction. Our values guide everything we do. 
              We empower customers, partners, and employees, fostering continuous growth in a culture of 
              mutual respect and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: OUR PRINCIPLES */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white"
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 text-center mb-20"
          >
            Our <span className="text-green-600">Principles</span>
          </motion.h2>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              {/* Innovation */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center space-y-5"
              >
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Lightbulb className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Innovation</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Innovation is at the heart of YVOO. That's why we're the global leader in 
                  AI-powered procurement solutions.
                </p>
              </motion.div>
              
              {/* Customer-Oriented */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center space-y-5"
              >
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Users className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Customer-Oriented Approach</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We leverage AI's potential for outstanding customer experiences in procurement.
                </p>
              </motion.div>
              
              {/* Global & Personalized */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center space-y-5"
              >
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Globe className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Global & Personalized</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Technology for maximum flexibility and unique experiences for customers and partners worldwide.
                </p>
              </motion.div>
              
              {/* Ethical AI */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center space-y-5"
              >
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Shield className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Ethical AI</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We build trust through integrity, transparency, and responsibility. Learn more in our Trust Center.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUSTAINABILITY COMMITMENT */}
      <section 
        data-nav-theme="dark"
        className="relative py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(5, 150, 105), rgb(16, 185, 129))" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 text-white"
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
              Carbon Reduction <span className="text-green-200">Commitment</span>
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed">
              YVOO is committed to reducing our CO₂ footprint and making a sustainable contribution to the future. 
              We pledge to minimize greenhouse gas emissions by increasing energy efficiency and using renewable 
              energy sources whenever possible. We also reduce waste and promote environmentally friendly practices 
              in all our operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: COMPANY HISTORY TIMELINE */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 text-center mb-20"
          >
            Company <span className="text-green-600">History</span>
          </motion.h2>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { year: "2019", title: "Company Founded", desc: "YVOO Technologies Ltd. founded in Zagreb, Croatia by Ivo and team.", color: "from-green-600 to-green-700" },
                { year: "2020", title: "Product Launch", desc: "SearchPro+ launched - AI supplier discovery platform", color: "from-green-500 to-green-600" },
                { year: "2021", title: "Expansion", desc: "ScanPro+ auditing platform goes live with global auditor network", color: "from-teal-500 to-teal-600" },
                { year: "2022", title: "Growth", desc: "Expanded to major automotive and manufacturing clients", color: "from-green-600 to-green-700" },
                { year: "2023", title: "Innovation", desc: "SalesPro+ supplier visibility platform launched", color: "from-green-500 to-green-600" },
                { year: "2024", title: "Scale", desc: "Serving enterprise clients across Europe, achieving 70% cost reduction", color: "from-green-600 to-green-700" }
              ].map((item, index) => (
                <motion.div 
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center space-y-3 relative"
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg relative z-10 hover:scale-110 transition-transform`}>
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP TEAM */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(240, 253, 244))" }}
      >
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8 mb-20"
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900">
              YVOO <span className="text-green-600">Leadership</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Our leadership team brings a broad range of entrepreneurial skills and industry-specific 
              expertise – a combination that shapes YVOO's success.
            </p>
          </motion.div>
          
          {/* Leadership Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Leadership Member {item}</h3>
                  <p className="text-gray-600">Position Title</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Learn More About Our Team
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: LOCATIONS */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 text-center mb-20"
          >
            Our <span className="text-green-600">Locations</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Location List */}
            <div className="lg:col-span-2 space-y-3">
              {Object.entries(locations).map(([key, location]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLocation(key)}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                    selectedLocation === key
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-900 hover:bg-gray-50 shadow'
                  }`}
                >
                  <span className="font-semibold">{location.name}</span>
                </button>
              ))}
            </div>
            
            {/* Selected Location Details */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-10 h-full flex flex-col justify-center space-y-8 border border-green-200 shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {locations[selectedLocation as keyof typeof locations].name}
                </h3>
                <div className="space-y-4 text-lg md:text-xl">
                  <p className="text-gray-700">
                    <strong className="text-green-600">Address:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].address}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-green-600">Phone:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].phone}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-green-600">Email:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].email}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA FOOTER SECTION */}
      <section 
        data-nav-theme="dark"
        className="py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
      >
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-48 h-48 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
            >
              <Zap className="w-24 h-24 text-white drop-shadow-lg" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight">
              Experience YVOO in <span className="text-green-200">Action</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Discover how AI-powered platforms revolutionize your procurement and supplier management.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white hover:bg-gray-100 text-green-700 px-12 py-7 text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300">
                REQUEST DEMO
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;