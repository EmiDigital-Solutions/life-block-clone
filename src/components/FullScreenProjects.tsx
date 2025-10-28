import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  {
    number: "01",
    title: "Global On-Demand Auditor Network",
    description: "Access 2,000+ certified auditors across 90+ countries. Same-day and next-day audits available with transparent fixed pricing from €700. Smart algorithms automatically match the optimal local auditor.",
    image: project1,
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))", // Green gradient
  },
  {
    number: "02",
    title: "ScanPro+ AI Intelligence Platform",
    description: "AI co-pilot ensures consistent audit quality regardless of location. Predictive risk scoring, real-time compliance alerts, and computer vision for automated equipment verification.",
    image: project2,
    gradient: "linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))", // Black gradient
  },
  {
    number: "03",
    title: "Supplier Discovery & Intelligence",
    description: "SearchPro+ AI converts procurement requirements into qualified supplier lists in minutes. Triple-source architecture with explainable AI recommendations for complete transparency.",
    image: project3,
    gradient: "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))", // Blue gradient
  },
  {
    number: "04",
    title: "Seamless Digital Workflow",
    description: "One-click audit requests with auto-dispatch to certified auditors. Real-time monitoring, instant comprehensive reports, and direct ERP integration for complete process automation.",
    image: project4,
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))", // Green gradient
  },
];

const FullScreenProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Color interpolation for smooth transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgb(22, 163, 74)",
      "rgb(17, 24, 39)",
      "rgb(29, 78, 216)",
      "rgb(22, 163, 74)",
      "rgb(22, 163, 74)",
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative"
    >
      {projects.map((project, index) => (
        <section
          key={index}
          className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20"
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
                  <span className="text-sm font-sans tracking-wide">
                    {project.number} Feature
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                  {project.title}
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl">
                  {project.description}
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Right: Image Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                {/* Outer card with vibrant gradient background */}
                <div
                  className="relative p-8 md:p-12 rounded-3xl"
                  style={{
                    background: project.gradient,
                    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1) inset",
                  }}
                >
                  {/* Gradient Overlay for depth */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 via-transparent to-white/5"></div>
                  
                  {/* Inner image card */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl w-[280px] h-[360px] md:w-[340px] md:h-[440px] border-2 border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Edge Highlight */}
                  <div className="absolute inset-0 rounded-3xl border border-white/20"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </motion.div>
  );
};

export default FullScreenProjects;
