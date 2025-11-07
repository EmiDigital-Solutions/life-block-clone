import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, MessageCircle, Package, Zap, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import heroPersonImage from "@/assets/about-hero-person.png";
import sustainabilityImage from "@/assets/about-sustainability.jpg";
import timelineImage from "@/assets/about-timeline-2019.jpg";
import leadershipTeamImage from "@/assets/about-leadership-team.jpg";

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
        className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            
            {/* Left - Image Card */}
            <motion.div 
              className="relative flex justify-center items-center order-1 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] h-[390px] sm:h-[460px] md:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.5),
                    0 0 30px rgba(59, 130, 246, 0.2)
                  `,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Circular Image */}
                <div className="absolute inset-0 flex items-center justify-center pt-9 sm:pt-11 md:pt-14">
                  <div className="relative w-[185px] h-[185px] sm:w-[215px] sm:h-[215px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden border-2 border-white/10">
                    <img 
                      src={heroPersonImage} 
                      alt="YVOO Professional"
                      className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                      style={{
                        transform: "scale(1.13)",
                        objectPosition: "58% 55%",
                      }}
                    />
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-7 sm:bottom-9 md:bottom-14 left-0 right-0 flex justify-center px-8 sm:px-10">
                  <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-8 sm:px-10 py-3.5 sm:py-4 w-full">
                    <p className="text-white font-sans font-bold text-lg sm:text-2xl md:text-3xl text-center">
                      Europe
                    </p>
                    <p className="text-white/80 font-sans text-base sm:text-xl md:text-2xl text-center">
                      Central Europe
                    </p>
                  </div>
                </div>

                {/* Light gradient overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Right - Text Content with staggered animation */}
            <motion.div
              className="md:pl-8 lg:pl-16 flex flex-col space-y-4 sm:space-y-6 order-2 md:order-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ color: "#1E2A3A" }}
              >
                Scaling On-Site Audits
              </motion.h1>
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
                  src={sustainabilityImage} 
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
                      src={timelineImage} 
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
                  src={leadershipTeamImage} 
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