import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import PlatformDemoAnimation from "./PlatformDemoAnimation";
import MobilePlatformDemo from "./MobilePlatformDemo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const S = 5; // square size as % of container
const STEP = S * 2; // checkerboard spacing

const Square = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute bg-primary" style={{ width: `${S}%`, height: `${S}%`, ...style }} />
);

// Bottom-right staircase dissolve
const bottomRightSquares: React.CSSProperties[] = [
  // Row outside bottom
  { bottom: `${-S}%`, right: `${0}%` },
  { bottom: `${-S}%`, right: `${STEP}%` },
  { bottom: `${-S}%`, right: `${STEP * 2}%` },
  // Row at bottom edge
  { bottom: `${0}%`, right: `${-S}%` },
  { bottom: `${0}%`, right: `${S}%` },
  { bottom: `${0}%`, right: `${S + STEP}%` },
  { bottom: `${0}%`, right: `${S + STEP * 2}%` },
  // Row 1
  { bottom: `${S}%`, right: `${0}%` },
  { bottom: `${S}%`, right: `${STEP}%` },
  { bottom: `${S}%`, right: `${STEP * 2}%` },
  // Row 2
  { bottom: `${STEP}%`, right: `${S}%` },
  { bottom: `${STEP}%`, right: `${S + STEP}%` },
  // Row 3
  { bottom: `${STEP + S}%`, right: `${0}%` },
  { bottom: `${STEP + S}%`, right: `${STEP}%` },
  // Row 4
  { bottom: `${STEP * 2}%`, right: `${S}%` },
];

// Top-left staircase dissolve (mirror)
const topLeftSquares: React.CSSProperties[] = [
  { top: `${-S}%`, left: `${0}%` },
  { top: `${-S}%`, left: `${STEP}%` },
  { top: `${-S}%`, left: `${STEP * 2}%` },
  { top: `${0}%`, left: `${-S}%` },
  { top: `${0}%`, left: `${S}%` },
  { top: `${0}%`, left: `${S + STEP}%` },
  { top: `${0}%`, left: `${S + STEP * 2}%` },
  { top: `${S}%`, left: `${0}%` },
  { top: `${S}%`, left: `${STEP}%` },
  { top: `${S}%`, left: `${STEP * 2}%` },
  { top: `${STEP}%`, left: `${S}%` },
  { top: `${STEP}%`, left: `${S + STEP}%` },
  { top: `${STEP + S}%`, left: `${0}%` },
  { top: `${STEP + S}%`, left: `${STEP}%` },
  { top: `${STEP * 2}%`, left: `${S}%` },
];

const TestimonialSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section id="platform-demo" className="relative overflow-visible bg-white pt-4 md:pt-6 pb-12 md:pb-16 lg:pb-20">
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
              <div className="relative overflow-visible py-8">
                {/* Blue square staircases */}
                {bottomRightSquares.map((style, i) => (
                  <Square key={`br-${i}`} style={style} />
                ))}
                {topLeftSquares.map((style, i) => (
                  <Square key={`tl-${i}`} style={style} />
                ))}
                <div 
                  className="relative z-10 mx-auto border border-border/20 cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="aspect-[16/9]">
                    <PlatformDemoAnimation />
                  </div>
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
