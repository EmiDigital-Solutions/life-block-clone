import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, TrendingUp, BarChart3, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HowItWorksSection } from "@/components/HowItWorksSection";

const BeFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setIsFanned(true), isMobile ? 2000 : 1500);
      setTimeout(() => setIsFanned(false), isMobile ? 12000 : 9000);
    };

    cycle();
    const interval = setInterval(cycle, isMobile ? 16000 : 12000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const getCardStyle = (index: number, totalCards: number) => {
    const centerIndex = (totalCards - 1) / 2;
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      if (isMobile) {
        return {
          x: offset * 110,
          y: Math.abs(offset) * -20,
          rotateY: offset * -8,
          rotateZ: offset * 6,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      } else {
        return {
          x: offset * 85,
          y: Math.abs(offset) * -45,
          rotateY: offset * -8,
          rotateZ: offset * 8,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      return {
        x: isMobile ? 0 : 180,
        y: isMobile ? 0 : 80,
        rotateY: 0,
        rotateZ: isMobile ? 0 : -25,
        scale: 0.98,
        opacity: adjustedIndex === 0 ? 1 : 0,
        zIndex: totalCards - adjustedIndex,
      };
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <motion.div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section
          data-nav-theme="dark"
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-20 sm:py-24 lg:py-32"
          style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-start justify-center space-y-6 sm:space-y-8 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-7xl 3xl:text-8xl font-sans font-bold text-white leading-tight"
              >
                Become visible,{" "}
                <span className="block mt-2">to over 7 million+</span>
                <span className="block mt-2">B2B decision-makers.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-2 sm:gap-3 text-white mx-auto sm:mx-0"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" />
                  <span className="text-base sm:text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl font-medium">Free of Charge</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" />
                  <span className="text-base sm:text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl font-medium">Paid Advertisement</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 sm:px-8 xl:px-8 2xl:px-12 py-3 sm:py-4 xl:py-3.5 2xl:py-6 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 text-base sm:text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl min-h-[48px]">
                  Claim your company
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm sm:text-base xl:text-base 2xl:text-xl 3xl:text-2xl text-white/90 font-sans max-w-xl leading-relaxed mx-auto sm:mx-0"
              >
                <strong>Create or Claim your free profile just in minutes.</strong> If your company is already represented by Connectimus: take over the account free of charge and control the content individually.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section
          data-nav-theme="light"
          className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-24"
          style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
        >
          <div className="container mx-auto">
            <div className="text-center space-y-8 sm:space-y-12">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 text-xs sm:text-sm font-medium"
              >
                Reach thousands of market leaders via Connectimus.io
              </motion.p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
                {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
                  <motion.div 
                    key={name} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center h-16 sm:h-20 bg-white/50 rounded-lg hover:bg-white transition-all px-3 sm:px-4"
                  >
                    <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-700">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Value Section with Stats Cards */}
        <section
          data-nav-theme="light"
          className="relative py-24 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-900 mb-4">
                <span className="text-green-600">Our Value</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-10">
                  <div className="space-y-3">
                    <div className="text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-green-600">7M+</div>
                    <div className="text-2xl xl:text-2xl 2xl:text-4xl 3xl:text-5xl font-semibold text-gray-900">Users per year</div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Worldwide Audience
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        B2B driven
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        All industries
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-green-600">12M+</div>
                    <div className="text-2xl xl:text-2xl 2xl:text-4xl 3xl:text-5xl font-semibold text-gray-900">Suppliers are viewed per month</div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Manage Supplier Profile Content
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Enrich Supplier Data
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Organic Analytics
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-green-600">5x</div>
                    <div className="text-2xl xl:text-2xl 2xl:text-4xl 3xl:text-5xl font-semibold text-gray-900">More Visibility for Connectimus Ad Customers</div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Precise Targeting
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Advanced Analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        Buyer Intent Data
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                <div 
                  className="relative w-full max-w-2xl"
                  style={{ perspective: "1500px" }}
                >
                  <div className="absolute inset-0 blur-3xl bg-green-400/20 scale-150 -z-10"></div>
                  
                  <div className="relative h-[400px] flex items-center justify-center">
                    {[
                      { number: "7M+", title: "Users per year", items: ["Worldwide Audience", "B2B driven", "All industries"], gradient: "from-blue-600 via-blue-700 to-blue-800" },
                      { number: "12M+", title: "Suppliers viewed/month", items: ["Profile Content", "Data Enrichment", "Analytics"], gradient: "from-green-600 via-green-700 to-green-800" },
                      { number: "5x", title: "Premium Visibility", items: ["Precise Targeting", "Advanced Analytics", "Intent Data"], gradient: "from-gray-800 via-gray-900 to-black" },
                    ].map((stat, index) => {
                      const style = getCardStyle(index, 3);
                      
                      return (
                        <motion.div
                          key={stat.number}
                          className="absolute cursor-pointer"
                          onClick={handleCardClick}
                          initial={false}
                          whileHover={{ scale: isFanned ? 1.05 : 1 }}
                          animate={{
                            x: style.x,
                            y: style.y,
                            rotateY: style.rotateY,
                            rotateZ: style.rotateZ,
                            scale: style.scale,
                            opacity: style.opacity,
                            zIndex: style.zIndex,
                          }}
                          transition={{
                            duration: isMobile ? 2.5 : 1.8,
                            delay: isFanned ? index * (isMobile ? 0.25 : 0.12) : (3 - index) * 0.08,
                            ease: [0.33, 1, 0.68, 1],
                            type: "tween",
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            willChange: "transform, opacity",
                          }}
                        >
                          <div
                            className={`relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${stat.gradient}`}
                            style={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                              <div className="text-5xl font-bold text-white mb-3">{stat.number}</div>
                              <div className="text-lg font-semibold text-white mb-4">{stat.title}</div>
                              <div className="space-y-2">
                                {stat.items.map((item, i) => (
                                  <div key={i} className="text-sm text-white/90 flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div 
                              className="absolute inset-0 pointer-events-none rounded-3xl"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Overview Section */}
        <section
          data-nav-theme="dark"
          className="relative py-24 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mb-4">
                <span className="text-green-400">Product</span> Overview.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  number: 1,
                  title: "Create / Claim your company profile",
                  desc: "Take control of your supplier profile on Connectimus",
                  detail: "With your free supplier profile you can control how buyers see your profile on Connectimus. Enrich your data, add relevant information and improve your overall presence.",
                },
                {
                  number: 2,
                  title: "Analytics",
                  desc: "Monitor your performance",
                  detail: "Gain access to key metrics such as impressions, clicks and CTR and get a comprehensive overview of user reach and engagement with your profile.",
                },
                {
                  number: 3,
                  title: "Connectimus Ads",
                  desc: "Targeted advertising campaigns with Connectimus Ads",
                  detail: "Use Connectimus Ads to boost visibility and generate leads. Secure a top ranking position on Connectimus. Define relevant search queries and target groups.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-green-300 font-medium mb-3">{step.desc}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.detail}</p>
                    <button className="mt-6 text-green-400 hover:text-green-300 font-medium inline-flex items-center gap-2 group">
                      Claim your company
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Global Leads Section with Cards */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24"
          style={{ background: "linear-gradient(135deg, rgb(29, 78, 216), rgb(37, 99, 235), rgb(59, 130, 246))" }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-white space-y-6"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-tight">
                  <span className="text-white">Global Leads on Autopilot</span> with Connectimus Ads
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ranking</h3>
                    <p className="text-white/90">Secure a top ranking position at Connectimus Search for more leads and greater visibility.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Performance Reporting</h3>
                    <p className="text-white/90">Get advanced insights into the performance of your ad campaigns.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Buyer Intent Data</h3>
                    <p className="text-white/90">Our platform delivers intent-driven insights so you can focus on the prospects that matter most - those actively exploring solutions like yours.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-lg font-medium mb-4">Want more B2B leads? Learn how to generate them on autopilot with Connectimus!</p>
                  <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300">
                    Compare Plans
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                <div 
                  className="relative w-full max-w-2xl"
                  style={{ perspective: "1500px" }}
                >
                  <div className="absolute inset-0 blur-3xl bg-blue-400/20 scale-150 -z-10"></div>
                  
                  <div className="relative h-[400px] flex items-center justify-center">
                    {[
                      { icon: TrendingUp, label: "Ranking", desc: "Top positions", gradient: "from-blue-600 via-blue-700 to-blue-800" },
                      { icon: BarChart3, label: "Performance", desc: "Advanced insights", gradient: "from-green-600 via-green-700 to-green-800" },
                      { icon: Users, label: "Intent Data", desc: "Buyer focus", gradient: "from-gray-800 via-gray-900 to-black" },
                    ].map((feature, index) => {
                      const style = getCardStyle(index, 3);
                      const IconComponent = feature.icon;
                      
                      return (
                        <motion.div
                          key={feature.label}
                          className="absolute cursor-pointer"
                          onClick={handleCardClick}
                          initial={false}
                          whileHover={{ scale: isFanned ? 1.05 : 1 }}
                          animate={{
                            x: style.x,
                            y: style.y,
                            rotateY: style.rotateY,
                            rotateZ: style.rotateZ,
                            scale: style.scale,
                            opacity: style.opacity,
                            zIndex: style.zIndex,
                          }}
                          transition={{
                            duration: isMobile ? 2.5 : 1.8,
                            delay: isFanned ? index * (isMobile ? 0.25 : 0.12) : (3 - index) * 0.08,
                            ease: [0.33, 1, 0.68, 1],
                            type: "tween",
                          }}
                          style={{
                            transformStyle: "preserve-3d",
                            willChange: "transform, opacity",
                          }}
                        >
                          <div
                            className={`relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${feature.gradient}`}
                            style={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                              <IconComponent className="w-20 h-20 text-white mb-4" />
                              <div className="text-2xl font-bold text-white mb-2">{feature.label}</div>
                              <div className="text-sm text-white/80">{feature.desc}</div>
                            </div>

                            <div 
                              className="absolute inset-0 pointer-events-none rounded-3xl"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          data-nav-theme="light"
          className="relative py-24 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(255, 255, 255))" }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {[
                {
                  quote: "With Connectimus, we can reach exactly those who want to optimize their processes with real-time data in a completely new and simple way.",
                  name: "Nina Berger",
                  role: "Business Development Manager",
                  company: "Peakboard",
                },
                {
                  quote: "As a start-up for intelligent process automation, digital and uncomplicated solutions are close to our hearts. The first match was made just two weeks after registering on the Connectimus platform. Connectimus connects companies simply, digitally and transparently!",
                  name: "Florian Poniewaß",
                  role: "Key Account Manager",
                  company: "Alphabots GmbH",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500"></div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-green-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          data-nav-theme="dark"
          className="relative py-24 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55))" }}
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            >
              <span className="text-white">We answer</span> <span className="text-green-400">your questions.</span>
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  question: "How can I take over an existing supplier profile?",
                  answer: 'Click on "Register Company" and search for your company. If we have a pre-built version of your supplier profile, you can claim that company immediately. Otherwise, create a new one by entering your web domain.',
                },
                {
                  question: "How many people can manage the account?",
                  answer: "That's up to you. As soon as you have taken over or opened the profile, you can send links to employees who can manage the channel with you and enter all relevant information.",
                },
                {
                  question: "Is the profile takeover free of charge?",
                  answer: "Yes. It also doesn't matter whether you create a new profile or take one over from Connectimus. Adding content such as contact details or product information is also free of charge. You can use all the free features as soon as you register.",
                },
                {
                  question: "How can I increase my visibility?",
                  answer: "You can buy Connectimus ads to rank higher for specific keywords. Find out more on our platform (only available to registered users).",
                },
                {
                  question: "Is my data treated confidentially?",
                  answer: "Data protection is important to us. Therefore, all data will be handled in compliance with the GDPR.",
                },
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all"
                >
                  <summary className="cursor-pointer p-6 flex justify-between items-center text-white font-semibold text-lg">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          data-nav-theme="green"
          className="relative py-24 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(21, 128, 61), rgb(34, 197, 94), rgb(16, 185, 129))" }}
        >
          <div className="container mx-auto text-center">
            <div className="text-white space-y-10 max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold"
              >
                Find worldwide companies for free.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 font-medium"
              >
                Ask our AI to find the right companies
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">
                  Start Searching
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center text-sm"
              >
                <span className="text-white/80">Popular:</span>
                {["Quantum Chips", "Quantum Simulations", "Precision Farming", "3D Bin Picking"].map((tag) => (
                  <button key={tag} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all">
                    {tag}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default BeFound;