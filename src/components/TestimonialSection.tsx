import { motion } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const capabilities = [
  {
    title: "Search Suppliers",
    description: "AI-powered discovery to find and qualify the right suppliers in minutes, not months.",
    link: "/search-suppliers"
  },
  {
    title: "ScanPro+",
    description: "On-site audits with certified local auditors. No flights, no delays, consistent quality.",
    link: "/scanpro-plus"
  },
  {
    title: "Ground Intelligence",
    description: "Real-time supplier monitoring, risk scoring, and corrective action tracking.",
    link: "/ground-intelligence"
  }
];

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Headline - Archlet Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="section-headline text-foreground max-w-3xl">
              One platform for every audit need
            </h2>
          </motion.div>

          {/* 3 Capability Cards - Archlet Style with border-left accent */}
          <div className="grid md:grid-cols-3 gap-0 border-t border-foreground/10 mb-16 md:mb-20">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0"
              >
                <Link
                  to={cap.link}
                  className="group block h-full p-8 md:p-10 hover:bg-secondary/20 transition-colors"
                >
                  {/* Title with left accent bar on hover */}
                  <div className="relative">
                    <div className="absolute -left-8 md:-left-10 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {cap.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {cap.description}
                  </p>
                  
                  {/* Link */}
                  <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* AI Demo Section - Archlet "Meet Spark" Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <h2 className="section-headline text-foreground max-w-3xl">
              Your audit intelligence, amplified by AIVOO
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              From supplier discovery to final report—AIVOO understands context, surfaces insights, and eliminates the friction that slows procurement teams down.
            </p>
          </motion.div>

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
