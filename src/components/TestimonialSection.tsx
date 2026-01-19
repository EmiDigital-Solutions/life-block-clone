import { motion } from "framer-motion";
import { useState } from "react";
import { X, Search, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const capabilities = [
  {
    icon: Search,
    title: "Search Suppliers",
    pain: "Stop screening 200+ suppliers to find one qualified option",
    link: "/search-suppliers"
  },
  {
    icon: ClipboardCheck,
    title: "ScanPro+",
    pain: "Stop flying engineers to one-day factory visits",
    link: "/scanpro-plus"
  },
  {
    icon: BarChart3,
    title: "Ground Intelligence",
    pain: "Stop chasing audit reports in email threads",
    link: "/ground-intelligence"
  }
];

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Beyond Discovery Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
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

          {/* 3 Capability Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 md:mb-20">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={cap.link}
                  className="group block h-full p-8 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
                    <cap.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {cap.title}
                  </h3>
                  
                  {/* Pain-solving subtitle */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {cap.pain}
                  </p>
                  
                  {/* Link */}
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Platform Demo */}
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

          {/* Headline and Testimonial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Headline with highlighted word */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.1] text-foreground">
                <span className="block">Built for</span>
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">high‑performance</span>
                  <span 
                    className="absolute inset-0 -inset-x-2 -inset-y-1 -skew-x-3 rounded-lg bg-accent"
                    style={{ zIndex: 0 }}
                  />
                </span>
                <span className="block whitespace-nowrap">B2B Supply Chains.</span>
              </h2>
            </motion.div>

            {/* Right: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pt-4"
            >
              {/* Brand logo placeholder */}
              <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                ScanPro+
              </p>
              
              {/* Quote */}
              <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
                "It's a game changer"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={christophPortrait} 
                  alt="Christoph Seeholzer" 
                  className="w-12 h-12 rounded-lg object-cover border-2 border-border"
                />
                <p className="text-base text-muted-foreground">
                  Christoph Seeholzer, Director Linde
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 border-none bg-transparent">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full h-full rounded-lg overflow-hidden bg-white">
            <PlatformDemoAnimation />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TestimonialSection;
