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
      className="relative h-[250vh]"
    >
      {/* Sticky container - stays pinned in viewport while outer section scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <motion.img 
          src={imageSrc}
          alt={imageAlt}
          className="object-cover"
          style={{ 
            width: imageWidth,
            maxHeight: '100vh'
          }}
        />
        
        {/* Dynamic dark overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Text Content Overlay - Fades in during final part of zoom */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12"
          style={{ opacity: textOpacity }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollPinnedZoom;
