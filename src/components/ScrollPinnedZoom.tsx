import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollPinnedZoomProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

const ScrollPinnedZoom = ({ imageSrc, imageAlt, children }: ScrollPinnedZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Width zooms from 30% to 100% based on scroll progress
  const imageWidth = useTransform(scrollYProgress, [0, 1], ["30%", "100%"]);
  
  // Opacity for the overlay - fades as zoom progresses
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);
  
  // Text fades in gradually as zoom completes
  const textOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full -mt-1"
      style={{ height: '100vh' }} // Minimal scroll space for quick zoom transition
    >
      {/* Sticky container - this stays fixed in viewport while section scrolls */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Zooming Image Layer - width expands smoothly based on scroll */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img 
            src={imageSrc}
            alt={imageAlt}
            className="h-auto object-cover"
            style={{ 
              width: imageWidth,
              willChange: "width"
            }}
          />
          
          {/* Dynamic dark overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
            style={{ opacity: overlayOpacity }}
          />
        </div>
        
        {/* Text Content Overlay - Fades in during final part of zoom */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12"
          style={{ opacity: textOpacity }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollPinnedZoom;
