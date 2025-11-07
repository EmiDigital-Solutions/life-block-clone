import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, MessageCircle, Package, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import aiBadgeIllustration from "@/assets/ai-badge-illustration.png";

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
      
      {/* SECTION 1: HERO SECTION - Cognigy Style */}
      <section 
        data-nav-theme="light"
        className="py-24 md:py-28 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-6 md:px-20 max-w-[1400px]">
          <div className="grid md:grid-cols-[45%_55%] gap-12 md:gap-16 items-center min-h-[600px]">
            
            {/* Left - Image with Decorative Elements */}
            <motion.div 
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                
                {/* Gradient Glows - Behind */}
                <div 
                  className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full pointer-events-none -z-10"
                  style={{
                    background: "radial-gradient(circle, #4ECDC4 0%, transparent 70%)",
                    filter: "blur(120px)",
                    opacity: 0.4,
                    transform: "translate(-40%, 40%)",
                  }}
                />
                <div 
                  className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full pointer-events-none -z-10"
                  style={{
                    background: "radial-gradient(circle, #4A90E2 0%, transparent 70%)",
                    filter: "blur(100px)",
                    opacity: 0.35,
                    transform: "translate(40%, -40%)",
                  }}
                />
                
                {/* Main Rounded Square Frame */}
                <div 
                  className="relative w-full h-full overflow-hidden z-10"
                  style={{
                    borderRadius: "80px",
                    border: "16px solid white",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
                  }}
                >
                  <img 
                    src="/src/assets/about-hero-meeting.jpg" 
                    alt="YVOO team"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Badges with Glassmorphism */}
                <motion.div 
                  className="absolute -top-5 -left-5 flex items-center gap-2.5 px-5 py-3 z-20"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ 
                    y: -4, 
                    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: "#4A90E2" }} />
                  <span className="font-semibold text-sm" style={{ color: "#1E2A3A" }}>AI-Powered</span>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-8 -right-8 flex items-center justify-center z-20 overflow-hidden"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    boxShadow: "0 12px 40px rgba(74,144,226,0.4)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 16px 48px rgba(74,144,226,0.5)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <img 
                    src={aiBadgeIllustration} 
                    alt="AI" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-8 -left-8 flex items-center justify-center z-20"
                  style={{
                    width: "56px",
                    height: "56px",
                    background: "white",
                    borderRadius: "50%",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <Target className="w-5 h-5" style={{ color: "#2D9B5F" }} />
                </motion.div>
                
              </div>
            </motion.div>
            
            {/* Right - Text Content */}
            <motion.div
              className="md:pl-16"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p 
                className="text-xs font-semibold uppercase mb-8"
                style={{
                  color: "#9CA3AF",
                  letterSpacing: "0.15em",
                }}
              >
                ABOUT US
              </p>
              
              <h1 className="mb-8" style={{ lineHeight: 1.1 }}>
                <span 
                  className="block font-bold"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    color: "#1E2A3A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pioneering AI-Powered
                </span>
                <span 
                  className="block font-bold"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    color: "#2D9B5F",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Procurement Intelligence
                </span>
                <span 
                  className="block font-bold"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    color: "#1E2A3A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  for Global Industry Leaders
                </span>
              </h1>
              
              <p 
                className="max-w-[580px]"
                style={{
                  fontSize: "18px",
                  lineHeight: 1.65,
                  color: "#6B7280",
                  fontWeight: 400,
                }}
              >
                Since 2019, YVOO has been on a mission to transform global procurement. 
                Our AI-powered platform connects businesses with verified suppliers worldwide, 
                delivering audits in days (not weeks) at 70% lower costs. Trusted by Mercedes, 
                BMW, Bosch, and 50+ industry leaders.
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
          <div className="max-w-4xl">
            {/* Left: Text */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                Technology and <span className="text-blue-600">Innovation</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                [Please provide the text content you'd like to add here]
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION & VALUES */}
      <section 
        data-nav-theme="dark"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(59, 130, 246))" }}
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
                <h3 className="text-2xl font-bold text-blue-600">Innovation</h3>
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
                <h3 className="text-2xl font-bold text-green-600">Customer-Oriented Approach</h3>
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
                <h3 className="text-2xl font-bold text-green-600">Ethical AI</h3>
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Lightbulb className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Users className="w-12 h-12 text-green-600" strokeWidth={1.5} />
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-green-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Shield className="w-12 h-12 text-green-600" strokeWidth={1.5} />
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
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <img 
                  src="/src/assets/about-sustainability.jpg" 
                  alt="Sustainable office building with green technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg"
                >
                  <Package className="w-8 h-8 text-green-400" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="text-sm font-semibold text-green-600 uppercase tracking-wider">
                Carbon Reduction Commitment
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Committed to Reducing Our Carbon Footprint and Building a Sustainable Future
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
        id="timeline-section"
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
            Our History
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
                        ? 'bg-green-600 ring-4 ring-green-200' 
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
                  <div className="md:col-span-3 relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video">
                    <img 
                      src="/src/assets/about-timeline-2019.jpg" 
                      alt={`Company milestone in ${selectedTimeline.year}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                      <span className="text-6xl font-bold text-white/30">{selectedTimeline.year}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">{selectedTimeline.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedTimeline.desc}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP TEAM */}
      <section 
        id="leadership-section"
        data-nav-theme="light"
        className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white"
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
                <img 
                  src="/src/assets/about-leadership-team.jpg" 
                  alt="YVOO leadership team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <p className="text-center mt-4 text-gray-500 text-sm">
                YVOO Leadership Team
              </p>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                YVOO <span className="text-blue-600">Leadership</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Our leadership team brings together entrepreneurial expertise and industry-specific knowledge—a 
                combination that drives YVOO's success and innovation in AI-powered procurement solutions.
              </p>
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LOCATIONS */}
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
                      : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
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
              <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 h-full flex flex-col justify-center space-y-8 shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {locations[selectedLocation as keyof typeof locations].name}
                </h3>
                <div className="space-y-4 text-lg md:text-xl">
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Address:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].address}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Phone:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].phone}
                  </p>
                  <p className="text-gray-600">
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
        style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
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
              <Button className="bg-white hover:bg-white/90 text-green-700 px-12 py-7 text-xl font-semibold rounded-full shadow-2xl">
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