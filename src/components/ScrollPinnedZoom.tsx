import { useEffect, useRef, useState } from "react";
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

  // Scale from 0.3 (30%) to 1 (100%) - smooth throughout entire scroll
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  
  // Opacity for the overlay - fades as zoom progresses
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);
  
  // Text fades in gradually as zoom completes
  const textOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full -mt-1"
      style={{ height: '200vh' }} // Double viewport height for smooth scroll-through
    >
      {/* Sticky container - this stays fixed in viewport while section scrolls */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Zooming Image Layer - scales smoothly based on scroll */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black"
          style={{ scale }}
        >
          <img 
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          
          {/* Dynamic dark overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>
        
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
