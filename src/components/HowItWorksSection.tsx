import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Submit",
    subtitle: "Request audit",
    description: "Select suppliers, choose audit standards, set your timeline, upload documents—then confirm and order. Done.",
  },
  {
    number: "02",
    title: "Match",
    subtitle: "Local auditor assigned",
    description: "Our AI matches a certified auditor near your supplier—no travel costs, no waiting.",
  },
  {
    number: "03",
    title: "Track",
    subtitle: "Watch it happen",
    description: "Real-time updates during the audit. Chat directly with the auditor. Know exactly what's happening.",
  },
  {
    number: "04",
    title: "Receive",
    subtitle: "Report delivered",
    description: "Complete digital report in 24h—findings, photos, scores, action items. Ready for your QMS.",
  },
  {
    number: "05",
    title: "Follow up",
    subtitle: "Track improvements",
    description: "Track corrective actions, schedule follow-up audits, and monitor supplier improvements over time.",
  },
];

const stats = [
  { value: "60%", label: "Lower audit costs" },
  { value: "48h", label: "Auditor on-site" },
  { value: "24h", label: "Report delivery" },
  { value: "€0", label: "Travel costs" },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
       <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                The Process
              </span>
            </div>
            <h2 className="section-headline text-foreground">
              From request
              <br />
              to report.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              A streamlined process designed for procurement teams who value their time.
            </p>
          </motion.div>
        </div>

        {/* Steps - Horizontal Accordion */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-border" />
          
          <div className="flex flex-col md:flex-row">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative border-b md:border-b-0 md:border-r border-border last:border-r-0 cursor-pointer transition-all duration-500 ease-out ${
                  hoveredIndex === index 
                    ? 'md:flex-[2.5]' 
                    : hoveredIndex !== null 
                      ? 'md:flex-[0.8]' 
                      : 'md:flex-1'
                }`}
              >
                <div className="py-10 md:py-16 px-6 md:px-8 h-full flex flex-col">
                  {/* Number */}
                  <div className="flex items-start justify-between mb-auto">
                    <span className={`text-6xl md:text-7xl font-extralight transition-all duration-300 ${
                      hoveredIndex === index ? 'text-foreground' : 'text-foreground/40'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-12 md:mt-20">
                    <span className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-primary' : 'text-muted-foreground/60'
                    }`}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-2 mb-4">
                      {step.title}
                    </h3>
                    
                    {/* Description - Only visible on hover */}
                    <motion.p
                      initial={false}
                      animate={{ 
                        opacity: hoveredIndex === index ? 1 : 0,
                        height: hoveredIndex === index ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                  
                  {/* Hover indicator line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-500 ${
                    hoveredIndex === index ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
    
    {/* Stats Section with Video Background - Separate Section */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-lg p-12 lg:p-16 overflow-hidden"
        >
          {/* Video Background - Full Card */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/auditors-hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-foreground/50 z-[1]" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-12 border-t border-white/10 text-center"
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl text-white mb-8">
                <span className="font-semibold">Your competitors already switched</span>{" "}
                <br className="hidden md:block" />
                <span className="font-normal text-white/80">When will you?</span>
              </h3>
              <Button asChild size="lg">
                <a 
                  href="https://calendly.com/yvoo/demo-yvoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default HowItWorksSection;
