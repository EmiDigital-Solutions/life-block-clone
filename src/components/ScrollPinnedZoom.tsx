import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollPinnedZoomProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

const ScrollPinnedZoom = ({ imageSrc, imageAlt, children }: ScrollPinnedZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale from 0.3 (30%) to 1 (100%)
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  
  // Opacity for the overlay - starts high, fades out
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Pin when section reaches top of viewport
      // Unpin when animation is complete (section has scrolled through)
      const shouldPin = rect.top <= 0 && rect.bottom > windowHeight;
      setIsPinned(shouldPin);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full"
      style={{ height: '300vh' }} // Extra height for scroll-jacking effect
    >
      {/* Sticky container that stays in viewport */}
      <div className={`sticky top-0 left-0 w-full h-screen overflow-hidden ${isPinned ? 'pointer-events-none' : ''}`}>
        
        {/* Zooming Image Layer */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
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
        
        {/* Text Content Overlay - Fades in as zoom completes */}
        <motion.div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.5, 1], [0, 1])
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollPinnedZoom;
