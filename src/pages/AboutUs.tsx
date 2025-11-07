import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, Zap, Search, MessageSquare, Package } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState("zagreb");
  const [selectedYear, setSelectedYear] = useState(2019);

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

  const timelineData = [
    { 
      year: 2019, 
      title: "Company Founded", 
      desc: "YVOO Technologies Ltd. founded in Zagreb, Croatia by Ivo and team. Mission: Create the ultimate AI-powered B2B procurement platform.",
      image: "office"
    },
    { 
      year: 2020, 
      title: "Product Launch", 
      desc: "SearchPro+ launched - AI supplier discovery platform with instant global supplier matching.",
      image: "launch"
    },
    { 
      year: 2021, 
      title: "Expansion", 
      desc: "ScanPro+ auditing platform goes live with global auditor network in 90+ countries.",
      image: "expansion"
    },
    { 
      year: 2022, 
      title: "Growth", 
      desc: "Expanded to major automotive and manufacturing clients including Mercedes, BMW, Bosch.",
      image: "growth"
    },
    { 
      year: 2023, 
      title: "Innovation", 
      desc: "SalesPro+ supplier visibility platform launched, reaching 7M+ B2B decision-makers.",
      image: "innovation"
    },
    { 
      year: 2024, 
      title: "Scale", 
      desc: "Serving enterprise clients across Europe, achieving 70% cost reduction and 80% time savings.",
      image: "scale"
    }
  ];

  const selectedTimeline = timelineData.find(item => item.year === selectedYear);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SECTION 1: HERO SECTION */}
      <section 
        data-nav-theme="light"
        className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-12 bg-white"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image with floating elements */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              {/* Floating gradient blobs */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 blur-2xl"
              />
              <motion.div 
                animate={{ 
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-50 blur-2xl"
              />
              
              {/* Main image card */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
                <div className="relative text-center space-y-6 p-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-32 h-32 mx-auto text-blue-600" strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-2xl font-bold text-gray-900">AI-Powered Procurement</p>
                </div>
                
                {/* Floating badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white rounded-2xl p-3 shadow-lg"
                >
                  <MessageSquare className="w-6 h-6 text-cyan-500" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-8 left-8 bg-white rounded-2xl p-3 shadow-lg"
                >
                  <Target className="w-6 h-6 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                AI-Powered Solutions for{" "}
                <span className="text-cyan-600">Global Procurement</span> Excellence
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
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
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white"
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
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Circular path visual */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="70" 
                    fill="none" 
                    stroke="url(#gradient1)" 
                    strokeWidth="3"
                    strokeDasharray="8 8"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center AI Logo */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                
                {/* Orbiting Products */}
                <motion.div 
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:scale-110 transition-transform">
                    <div className="flex flex-col items-center gap-1">
                      <Search className="w-8 h-8 text-purple-600" />
                      <span className="text-xs font-bold text-gray-900">SearchPro+</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:scale-110 transition-transform">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="w-8 h-8 text-cyan-600" />
                      <span className="text-xs font-bold text-gray-900">ScanPro+</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:scale-110 transition-transform">
                    <div className="flex flex-col items-center gap-1">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                      <span className="text-xs font-bold text-gray-900">SalesPro+</span>
                    </div>
                  </div>
                </motion.div>
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
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                Technology and <span className="text-blue-600">Innovation</span>
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
        data-nav-theme="dark"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246), rgb(139, 92, 246))" }}
      >
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 text-white"
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
              Our Mission and Values
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90">
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
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 text-center mb-20"
          >
            Our <span className="text-blue-600">Principles</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-purple-600">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Innovation is at the heart of YVOO. That's why we're the global leader in 
                  AI-powered procurement solutions.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-cyan-600">Customer-Oriented Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  We leverage AI's potential for outstanding customer experiences in procurement.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-blue-600">Global & Personalized</h3>
                <p className="text-gray-600 leading-relaxed">
                  Technology for maximum flexibility and unique experiences for customers and partners worldwide.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-purple-600">Ethical AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  We build trust through integrity, transparency, and responsibility. Learn more in our Trust Center.
                </p>
              </motion.div>
            </div>
            
            {/* Right: Connected circular badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <line x1="100" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="300" y1="100" x2="300" y2="300" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="300" y1="300" x2="100" y2="300" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="100" y1="300" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                </svg>
                
                {/* Center text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-gray-900">YVOO</span>
                </div>
                
                {/* Circular badges */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 left-0"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Lightbulb className="w-12 h-12 text-purple-600" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-0 right-0"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Users className="w-12 h-12 text-cyan-600" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Globe className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-0 right-0"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Shield className="w-12 h-12 text-purple-600" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUSTAINABILITY COMMITMENT */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center p-12">
                  <div className="text-center space-y-4">
                    <Package className="w-24 h-24 mx-auto text-white" />
                    <p className="text-white font-bold text-xl">Sustainability Focus</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Carbon Reduction Commitment
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                NiCE Cognigy engagiert sich für die Reduzierung unseres CO2-Fußabdrucks und einen nachhaltigen Beitrag für die Zukunft.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We pledge to minimize greenhouse gas emissions by increasing energy efficiency and using renewable 
                energy sources whenever possible. We also reduce waste and promote environmentally friendly practices 
                in all our operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPANY HISTORY TIMELINE */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-gray-50"
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-blue-600 text-center mb-20"
          >
            Unsere Geschichte
          </motion.h2>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Timeline dots */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
              {timelineData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full transition-all ${
                      selectedYear === item.year 
                        ? 'bg-green-500 ring-4 ring-green-200' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                  <span className={`text-sm font-semibold ${
                    selectedYear === item.year ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Timeline content */}
            {selectedTimeline && (
              <motion.div 
                key={selectedYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-12">
                      <div className="text-center">
                        <span className="text-6xl font-bold text-gray-300">{selectedTimeline.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{selectedTimeline.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedTimeline.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP TEAM */}
      <section 
        data-nav-theme="dark"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(20, 184, 166), rgb(59, 130, 246), rgb(139, 92, 246))" }}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Team photo */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-12">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-white/80 text-sm">
                Cognigy Co-Founders Benjamin Mayr, Philipp Heltewig & Sascha Poggemann
              </p>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6 text-white"
            >
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
                Cognigy Leadership
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Unser Leadership-Team bringt eine breite Palette an unternehmerischen Fähigkeiten und 
                branchenspezifischem Know-how mit – eine Kombination, die den Erfolg von Cognigy prägt.
              </p>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 rounded-xl px-8 py-6 text-lg"
              >
                Mehr erfahren
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LOCATIONS */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white"
      >
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 text-center mb-20"
          >
            Our <span className="text-blue-600">Locations</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Location List */}
            <div className="lg:col-span-2 space-y-3">
              {Object.entries(locations).map(([key, location]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLocation(key)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                    selectedLocation === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
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
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[2.5rem] p-10 h-full flex flex-col justify-center space-y-8 shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {locations[selectedLocation as keyof typeof locations].name}
                </h3>
                <div className="space-y-4 text-lg md:text-xl">
                  <p className="text-gray-700">
                    <strong className="text-blue-600">Address:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].address}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-blue-600">Phone:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].phone}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-blue-600">Email:</strong><br />
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
        style={{ background: "linear-gradient(135deg, rgb(139, 92, 246), rgb(59, 130, 246), rgb(20, 184, 166))" }}
      >
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-10 text-white"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl"
            >
              <Zap className="w-16 h-16 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Experience YVOO in Action
            </h2>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Discover how AI-powered platforms revolutionize your procurement and supplier management.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-white hover:bg-gray-100 text-purple-700 px-12 py-7 text-xl font-semibold rounded-full shadow-2xl">
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