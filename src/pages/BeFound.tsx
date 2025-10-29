import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Users, Eye, BarChart3, TrendingUp, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BeFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <motion.div
        ref={containerRef}
        className="relative"
      >
        {/* Hero Section */}
        <section
          data-nav-theme="dark"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(0, 0, 0), rgb(17, 24, 39), rgb(0, 0, 0))" }}
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight max-w-4xl"
              >
                Reach Your Target Clients, Showcase Verified Excellence
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl font-sans font-medium text-cyan-400/90 tracking-wide"
              >
                Free Profile · Premium Visibility · Global Reach
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-white/70 font-sans font-medium max-w-3xl"
              >
                Create or claim your supplier profile in minutes. If your company is already listed on YVOO, take control of your profile for free and manage your content.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                  Claim Your Profile
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section
          data-nav-theme="light"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246), rgb(249, 250, 251))" }}
        >
          <div className="container mx-auto">
            <div className="text-center space-y-12">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-base font-sans"
              >
                Trusted by industry leaders worldwide
              </motion.p>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
                {["REWE", "KNORR", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
                  <motion.div 
                    key={name} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center h-24 bg-white rounded-xl shadow-md hover:shadow-lg transition-all px-6"
                  >
                    <span className="text-2xl md:text-3xl font-bold text-gray-800">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Our Value */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
        >
          <div className="container mx-auto">
            <div className="text-white space-y-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-sans font-semibold"
              >
                Our Value
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    number: "7M+",
                    title: "Users per year",
                    items: ["Worldwide Audience", "B2B driven", "All industries"]
                  },
                  {
                    number: "12M+",
                    title: "Suppliers viewed per month",
                    items: ["Manage Supplier Profile Content", "Enrich Supplier Data", "Organic Analytics"]
                  },
                  {
                    number: "5x",
                    title: "More Visibility for Premium",
                    items: ["Precise Targeting", "Advanced Analytics", "Buyer Intent Data"]
                  }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                  >
                    <div className="text-6xl font-bold text-white mb-4">
                      {stat.number}
                    </div>
                    <div className="text-2xl font-semibold mb-6 text-white">{stat.title}</div>
                    <ul className="space-y-3 text-white/90">
                      {stat.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-5 h-5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Overview Section */}
        <section
          data-nav-theme="dark"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))" }}
        >
          <div className="container mx-auto">
            <div className="text-white space-y-12">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-sans font-semibold mb-4"
                >
                  <span className="text-cyan-400">Product</span> <span className="text-white">Overview.</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/70 font-sans"
                >
                  Get started in three simple steps and begin connecting with global buyers
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    number: 1,
                    title: "Create / Claim your company profile",
                    description: "Sign up and create your supplier profile with your company details, capabilities, certifications, and audit history. Make your profile stand out to potential buyers.",
                    active: false
                  },
                  {
                    number: 2,
                    title: "Analytics",
                    description: "Schedule an on-site audit with our verified auditors. Once completed, your profile receives the YVOO verified badge, significantly increasing buyer trust and visibility.",
                    active: true
                  },
                  {
                    number: 3,
                    title: "YVOO Ads",
                    description: "Start receiving inquiries from global buyers searching for verified suppliers. Track your profile performance, manage leads, and grow your business opportunities.",
                    active: false
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-4"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${
                      step.active 
                        ? 'bg-cyan-400/20 text-cyan-400 border-b-4 border-cyan-400' 
                        : 'bg-white/10 text-white'
                    }`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="text-white/70">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Global Leads */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))" }}
        >
          <div className="container mx-auto">
            <div className="text-white space-y-12">
              <div className="text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-sans font-semibold mb-4"
                >
                  Global Leads on Autopilot
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-semibold text-white"
                >
                  with YVOO Ads
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    icon: TrendingUp,
                    label: "Ranking",
                    title: "Secure a top ranking position at YVOO Search for more leads and greater visibility.",
                  },
                  {
                    icon: BarChart3,
                    label: "Performance Reporting",
                    title: "Get advanced insights into the performance of your ad campaigns.",
                  },
                  {
                    icon: Users,
                    label: "Buyer Intent Data",
                    title: "Our platform delivers intent-driven insights so you can focus on the prospects that matter most - those actively exploring solutions like yours.",
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-white">
                        {feature.label}
                      </p>
                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center"
                    >
                      <feature.icon className="w-20 h-20 text-white" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          data-nav-theme="green"
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
          style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
        >
          <div className="container mx-auto text-center">
            <div className="text-white space-y-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-sans font-semibold"
              >
                Ready to Get <span className="text-cyan-400">Discovered?</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl mx-auto"
              >
                Join thousands of verified suppliers connecting with global buyers on YVOO
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition-all">
                  Create Free Profile
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </button>
                <button className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition-all">
                  View Pricing
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
