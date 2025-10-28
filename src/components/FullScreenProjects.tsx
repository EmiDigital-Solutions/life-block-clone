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
    title: "Making of Swedish Barn House",
    description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish...",
    image: project1,
    gradient: "linear-gradient(135deg, rgb(139, 69, 255) 0%, rgb(88, 86, 214) 50%, rgb(69, 104, 255) 100%)",
  },
  {
    number: "02",
    title: "Architectural Design Studio Zero",
    description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish...",
    image: project2,
    gradient: "linear-gradient(135deg, rgb(236, 72, 153) 0%, rgb(239, 68, 68) 50%, rgb(220, 38, 38) 100%)",
  },
  {
    number: "03",
    title: "Pink scandinavian design office",
    description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish...",
    image: project3,
    gradient: "linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(236, 72, 153) 50%, rgb(219, 39, 119) 100%)",
  },
  {
    number: "04",
    title: "Whisky cellar work office brown",
    description: "We aimed at making both exterior and interiors for this project, and the first thing I did we visiting Swedish...",
    image: project4,
    gradient: "linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(6, 182, 212) 50%, rgb(20, 184, 166) 100%)",
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
      projects[0].gradient,
      projects[1].gradient,
      projects[2].gradient,
      projects[3].gradient,
      projects[3].gradient,
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
                    {project.number} Project
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                  {project.title}
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl">
                  {project.description}
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300">
                  Our work
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
                {/* Outer card with gradient background */}
                <div
                  className="relative p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)`,
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Inner image card */}
                  <div className="relative rounded-[1.5rem] overflow-hidden shadow-xl w-[280px] h-[360px] md:w-[340px] md:h-[440px] border-2 border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                    />
                    {/* Dramatic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-overlay" />
                  </div>
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
