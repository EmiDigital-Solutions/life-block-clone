import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Beyond Discovery Headline - Psychological anchor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-4">
              The complete supplier platform
            </p>
            <h2 className="section-headline text-foreground max-w-3xl mx-auto">
              Beyond discovery
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
              Others stop at search results. We deliver verified partnerships through audits, intelligence, and development.
            </p>
          </motion.div>

          {/* Platform Demo - Centered above content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 md:mb-20 lg:mb-24"
          >
            <div 
              className="max-w-5xl mx-auto overflow-hidden shadow-2xl border border-border/20 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setIsModalOpen(true)}
            >
              <PlatformDemoAnimation />
            </div>
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-12"
          >
            Built for mighty B2B Supply Chains
          </motion.h2>

          {/* Testimonial - BeFound 3-Column Style */}
          <div className="grid lg:grid-cols-3 gap-0 items-stretch mb-24">
            {/* Stat Card - Primary Color Background */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 flex flex-col justify-between aspect-square"
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              
              {/* Stat */}
              <div>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-[-0.02em]">
                  60%
                </p>
                <p className="text-xl text-white/90 font-medium mt-2">
                  lower audit costs
                </p>
              </div>
            </motion.div>
            
            {/* Portrait Photo - Square Grayscale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square bg-muted overflow-hidden"
            >
              <img 
                src={christophPortrait} 
                alt="Christoph Seeholzer"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
            
            {/* Quote Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 flex flex-col justify-center space-y-6 bg-white"
            >
              {/* Company Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-foreground flex items-center justify-center">
                  <span className="text-background text-xs font-bold">L</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">LINDE</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-tight">
                "It's a game changer"
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Christoph Seeholzer,</p>
                <p className="text-sm text-primary">Director, Linde</p>
              </div>
            </motion.div>
          </div>

          {/* Benefits KPI Grid - BeFound Style with Animated Figures */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground max-w-2xl mb-16"
          >
            Measurable ROI from day one
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-x-12">
            {/* KPI 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Cost reduction</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  <AnimatedCounter value={60} suffix="%" />
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Lower audit spend compared to internal teams
                </p>
              </div>
            </motion.div>

            {/* KPI 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Time savings</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  <AnimatedCounter value={70} suffix="%" />
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Less coordination time for your quality team
                </p>
              </div>
            </motion.div>

            {/* KPI 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Speed to on-site</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  <AnimatedCounter value={48} suffix="h" />
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  From request to auditor on-site worldwide
                </p>
              </div>
            </motion.div>

            {/* KPI 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Travel expenses</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  €0
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Team travel costs eliminated completely
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Book a demo
            </a>
          </motion.div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 border-none bg-transparent">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full h-full overflow-hidden bg-white">
            <PlatformDemoAnimation />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialSection;
