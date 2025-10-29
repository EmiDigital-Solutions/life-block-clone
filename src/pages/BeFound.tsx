import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Users, Eye, BarChart3, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const projects = [
  {
    number: "01",
    title: "Free Supplier Profile",
    description: "Create or claim your supplier profile in minutes. Showcase your capabilities, certifications, and audit history. If your company is already listed on YVOO, take control for free and manage your content.",
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))",
    icon: Users,
  },
  {
    number: "02",
    title: "Maximum Visibility",
    description: "Your verified profile appears in search results when buyers look for suppliers in your industry and region. Premium placement ensures you stand out from the competition with 8x more visibility.",
    gradient: "linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))",
    icon: Eye,
  },
  {
    number: "03",
    title: "Detailed Analytics",
    description: "Track who views your profile, which products generate interest, and where your inquiries come from. Use data-driven insights to optimize your presence and convert views into business.",
    gradient: "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Quality Connections",
    description: "Connect with serious buyers actively searching for suppliers. Our platform attracts procurement professionals and decision-makers. Verified suppliers report 40% increase in qualified inquiries.",
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))",
    icon: TrendingUp,
  },
];

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
        {projects.map((project, index) => {
          // Determine nav theme based on project gradient
          let navTheme: 'dark' | 'green' | 'light' = 'dark';
          if (project.gradient.includes('rgb(34, 197, 94)')) {
            navTheme = 'green';
          } else if (project.gradient.includes('rgb(31, 41, 55)') || project.gradient.includes('rgb(37, 99, 235)')) {
            navTheme = 'dark';
          }

          return (
            <section
              key={index}
              data-nav-theme={navTheme}
              className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-8"
              style={{ background: project.gradient }}
            >
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left: Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-white space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-sm font-sans tracking-wide font-medium">
                        {project.number} Feature
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                      {project.title}
                    </h2>

                    <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                      {project.description}
                    </p>

                    <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide">
                      Learn more
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>

                  {/* Right: Icon Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex justify-center lg:justify-end"
                  >
                    <div 
                      className="relative w-full max-w-md"
                      style={{ perspective: "1500px" }}
                    >
                      {/* Atmospheric Glow */}
                      <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                      
                      {/* Icon Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        className="relative w-full aspect-square rounded-3xl overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <project.icon className="w-32 h-32 md:w-40 md:h-40 text-white/80" />
                        </div>
                        
                        {/* Edge Highlight */}
                        <div 
                          className="absolute inset-0 pointer-events-none rounded-3xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </motion.div>

      <Footer />
    </div>
  );
};

export default BeFound;
