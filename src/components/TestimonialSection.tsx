import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";
import MobilePlatformDemo from "./MobilePlatformDemo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section id="platform-demo" className="relative overflow-hidden bg-white pt-4 md:pt-6 pb-12 md:pb-16 lg:pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Platform Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isMobile ? (
              <div className="max-w-sm mx-auto">
                <MobilePlatformDemo />
              </div>
            ) : (
              <div 
                className="mx-auto overflow-hidden border border-border/20 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
                onClick={() => setIsModalOpen(true)}
              >
                <div className="aspect-[16/9]">
                  <PlatformDemoAnimation />
                </div>
              </div>
            )}

            {/* Below video text */}
            <h3 className="text-xl font-medium text-foreground text-center mt-8 mb-4">
              From Search to Intelligence. All in One Platform.
            </h3>
            <p className="text-base text-muted-foreground text-center mb-8">
              AI-powered supplier discovery, on-demand audits, real-time intelligence
            </p>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-10 py-5 text-lg rounded-lg"
              >
                <a
                  href="https://calendly.com/yvoo/demo-yvoo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Experience the Platform
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="mt-12 md:mt-16" />

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
              <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                ScanPro+
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
                "It's a game changer"
              </p>
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
