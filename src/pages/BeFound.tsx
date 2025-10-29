import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Check, ChevronDown, TrendingUp, BarChart3, Users, Target, LineChart, UserCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BeFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-32"
          style={{ background: "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241), rgb(139, 92, 246))" }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-start justify-center space-y-8 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-tight"
              >
                Become visible,{" "}
                <span className="block mt-2">to over 7 million+</span>
                <span className="block mt-2">B2B decision-makers.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-3 text-white"
              >
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span className="text-lg font-medium">Free of Charge</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <span className="text-lg font-medium">Paid Advertisement</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-semibold hover:bg-opacity-90 transition-all duration-300 text-lg">
                  Claim your company
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base text-white/90 font-sans max-w-xl leading-relaxed"
              >
                <strong>Create or Claim your free profile just in minutes.</strong> If your company is already represented by YVOO: take over the account free of charge and control the content individually.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section
          data-nav-theme="light"
          className="relative py-20 px-6 md:px-12 lg:px-24"
          style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
        >
          <div className="container mx-auto">
            <div className="text-center space-y-12">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 text-sm font-medium"
              >
                Reach thousands of market leaders via YVOO.io
              </motion.p>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
                {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
                  <motion.div 
                    key={name} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center h-20 bg-white/50 rounded-lg hover:bg-white transition-all px-4"
                  >
                    <span className="text-lg md:text-xl font-bold text-gray-700">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Our Value with Cards */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16"
          style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
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
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm font-sans tracking-wide font-medium">01 Feature</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                  Our Value
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                  Connect with 7M+ users per year, get 12M+ monthly supplier views, and achieve 5x more visibility with our premium placement options.
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
                  <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                  
                  <div className="relative h-[400px] flex items-center justify-center">
                    {[
                      { number: "7M+", title: "Users per year", items: ["Worldwide Audience", "B2B driven", "All industries"], gradient: "from-blue-600 via-blue-700 to-blue-800" },
                      { number: "12M+", title: "Suppliers viewed/month", items: ["Manage Supplier Profile Content", "Enrich Supplier Data", "Organic Analytics"], gradient: "from-green-600 via-green-700 to-green-800" },
                      { number: "5x", title: "More Visibilty for ensun Ad Customers", items: ["Precise Targeting", "Advanced Analytics", "Buyer Intent Data"], gradient: "from-gray-800 via-gray-900 to-black" },
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
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(236, 72, 153, 0.2)",
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

        {/* Product Overview Section with Cards */}
        <section
          data-nav-theme="dark"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16"
          style={{ background: "linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))" }}
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
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm font-sans tracking-wide font-medium">02 Feature</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                  <span className="text-cyan-400">Product</span> Overview
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                  Get started in three simple steps: create your profile, get verified with analytics, and start connecting with global buyers through YVOO Ads.
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
                  <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                  
                  <div className="relative h-[400px] flex items-center justify-center">
                    {[
                      { number: 1, title: "Create Profile", desc: "Take control of your supplier profile on ensun", active: false, gradient: "from-blue-600 via-blue-700 to-blue-800" },
                      { number: 2, title: "Analytics", desc: "Monitor your performance", active: true, gradient: "from-green-600 via-green-700 to-green-800" },
                      { number: 3, title: "ensun Ads", desc: "Targeted advertising campaigns with ensun Ads", active: false, gradient: "from-gray-800 via-gray-900 to-black" },
                    ].map((step, index) => {
                      const style = getCardStyle(index, 3);
                      
                      return (
                        <motion.div
                          key={step.number}
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
                            className={`relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${step.gradient}`}
                            style={{
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(236, 72, 153, 0.2)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-4 ${
                                step.active 
                                  ? 'bg-cyan-400/30 text-cyan-400 border-2 border-cyan-400' 
                                  : 'bg-white/20 text-white'
                              }`}>
                                {step.number}
                              </div>
                              <div className="text-xl font-semibold text-white mb-2">{step.title}</div>
                              <div className="text-sm text-white/80">{step.desc}</div>
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

        {/* Features Section with Cards */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-16"
          style={{ background: "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))" }}
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
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm font-sans tracking-wide font-medium">03 Feature</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                  Global Leads on Autopilot
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                  Get top ranking positions, performance reporting insights, and buyer intent data to focus on prospects actively exploring solutions like yours.
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
                  <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                  
                  <div className="relative h-[400px] flex items-center justify-center">
                    {[
                      { icon: TrendingUp, label: "Ranking", gradient: "from-blue-600 via-blue-700 to-blue-800" },
                      { icon: BarChart3, label: "Performance Reporting", gradient: "from-green-600 via-green-700 to-green-800" },
                      { icon: Users, label: "Buyer Intent Data", gradient: "from-gray-800 via-gray-900 to-black" },
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
                              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(236, 72, 153, 0.2)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                              <IconComponent className="w-20 h-20 text-white mb-4" />
                              <div className="text-xl font-semibold text-white">{feature.label}</div>
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

        {/* CTA Section */}
        <section
          data-nav-theme="green"
          className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 lg:px-24 py-16"
          style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
        >
          <div className="container mx-auto text-center">
            <div className="text-white space-y-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold"
              >
                Want more B2B leads?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl mx-auto font-sans"
              >
                Learn how to generate them on autopilot with ensun!
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide hover:scale-105">
                  Compare Plans
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
