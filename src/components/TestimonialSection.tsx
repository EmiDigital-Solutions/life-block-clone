import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
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
       <div className="mx-auto max-w-[1400px] px-8">
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
              <Button asChild size="lg">
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
