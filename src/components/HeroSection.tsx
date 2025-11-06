import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useContentByType, getMediaPublicUrl } from "@/hooks/useContentQuery";
import { supabase } from "@/integrations/supabase/client";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";

const fallbackAuditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe", gradient: "from-blue-600 via-blue-700 to-blue-800" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific", gradient: "from-green-600 via-green-700 to-green-800" },
  { image: auditorAfrican, location: "Africa", region: "Sub-Saharan", gradient: "from-gray-800 via-gray-900 to-black" },
  { image: auditorLatin, location: "Americas", region: "North & South", gradient: "from-blue-600 via-blue-700 to-blue-800" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region", gradient: "from-green-600 via-green-700 to-green-800" },
  { image: auditorSouthAsian, location: "South Asia", region: "Indian Subcontinent", gradient: "from-gray-800 via-gray-900 to-black" },
];

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [auditors, setAuditors] = useState(fallbackAuditors);
  const [heroContent, setHeroContent] = useState({
    tagline: "2,000+ Auditors · 90+ Countries · AI-Powered",
    heading: "On-Site Supplier Audits in Days, Not Weeks",
    subtitle: "70% Cost Reduction · 80% Time Savings · Global Coverage",
    description: "Physical factory assessments (ISO, VDA, IATF) starting from €700. AI-powered intelligence with certified auditors across 90+ countries.",
    ctaText: "Experience a Connectimus Audit"
  });

  // Fetch hero content from CMS
  const { data: heroData } = useContentByType("hero_content");
  const { data: auditorCards } = useContentByType("auditor_card");

  // Process hero content
  useEffect(() => {
    if (heroData && heroData.length > 0) {
      const mainHero = heroData[0];
      setHeroContent({
        tagline: mainHero.body?.tagline || heroContent.tagline,
        heading: mainHero.title || heroContent.heading,
        subtitle: mainHero.body?.subtitle || heroContent.subtitle,
        description: mainHero.body?.content || heroContent.description,
        ctaText: mainHero.body?.ctaText || heroContent.ctaText
      });
    }
  }, [heroData]);

  // Process auditor cards
  useEffect(() => {
    const processAuditorCards = async () => {
      if (!auditorCards || auditorCards.length === 0) {
        setAuditors(fallbackAuditors);
        return;
      }

      const processedAuditors = await Promise.all(
        auditorCards.map(async (card, index) => {
          let imageUrl = fallbackAuditors[index]?.image;
          
          if (card.body?.imageId) {
            try {
              const { data: media } = await supabase
                .from("media")
                .select("storage_path")
                .eq("id", card.body.imageId)
                .single();

              if (media) {
                imageUrl = getMediaPublicUrl(media.storage_path);
              }
            } catch (error) {
              console.error("Error fetching auditor image:", error);
            }
          }

          return {
            image: imageUrl,
            location: card.title || fallbackAuditors[index]?.location || "Location",
            region: card.body?.content || fallbackAuditors[index]?.region || "Region",
            gradient: fallbackAuditors[index % fallbackAuditors.length].gradient
          };
        })
      );

      setAuditors(processedAuditors.length > 0 ? processedAuditors : fallbackAuditors);
    };

    processAuditorCards();
  }, [auditorCards]);

  const visibleAuditors = isMobile ? auditors.slice(0, 3) : auditors;

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setIsFanned(true), isMobile ? 2000 : 1500);
      setTimeout(() => setIsFanned(false), isMobile ? 12000 : 9000);
    };

    cycle();
    const interval = setInterval(cycle, isMobile ? 16000 : 12000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % visibleAuditors.length);
  };

  const getCardStyle = (index: number, totalCards: number) => {
    const centerIndex = (totalCards - 1) / 2;
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      if (isMobile) {
        return {
          x: offset * 110,
          y: Math.abs(offset) * -20,
          rotateY: offset * -8,
          rotateZ: offset * 6,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      } else {
        return {
          x: offset * 85,
          y: Math.abs(offset) * -45,
          rotateY: offset * -8,
          rotateZ: offset * 8,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      return {
        x: isMobile ? 0 : 180,
        y: isMobile ? 0 : 80,
        rotateY: 0,
        rotateZ: isMobile ? 0 : -25,
        scale: 0.98,
        opacity: adjustedIndex === 0 ? 1 : 0,
        zIndex: totalCards - adjustedIndex,
      };
    }
  };

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-6 sm:space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2 sm:gap-4 text-white/60 text-xs sm:text-sm font-sans justify-center lg:justify-start">
                  <div className="hidden sm:block h-px w-12 lg:w-16 bg-cyan-400/40"></div>
                  <span className="text-center lg:text-left">{heroContent.tagline}</span>
                  <div className="hidden sm:block lg:hidden h-px w-12 bg-cyan-400/40"></div>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-sans font-semibold text-white leading-tight tracking-tight"
              >
                {heroContent.heading}
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-xl font-sans font-medium text-cyan-400/90 tracking-wide"
              >
                {heroContent.subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-sm sm:text-base lg:text-lg text-white/70 font-sans font-medium"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-center lg:justify-start"
              >
                <button className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-sans font-medium text-base sm:text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl min-h-[48px]">
                  {heroContent.ctaText}
                </button>
              </motion.div>
            </div>

            {/* Right Column: Animated Auditor Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end order-first lg:order-last"
            >
              <div 
                className="relative w-full max-w-2xl"
                style={{ perspective: "1500px" }}
              >
                <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                
                <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center">
                  {visibleAuditors.map((auditor, auditorIndex) => {
                    const style = getCardStyle(auditorIndex, visibleAuditors.length);
                    
                    return (
                      <motion.div
                        key={auditor.location}
                        className="absolute cursor-pointer"
                        onClick={handleCardClick}
                        initial={false}
                        whileHover={{ scale: isFanned ? 1.05 : 1 }}
                        animate={{
                          x: style.x,
                          y: style.y,
                          rotateY: style.rotateY,
                          rotateZ: style.rotateZ,
                          scale: style.scale,
                          opacity: style.opacity,
                          zIndex: style.zIndex,
                        }}
                        transition={{
                          duration: isMobile ? 2.5 : 1.8,
                          delay: isFanned ? auditorIndex * (isMobile ? 0.25 : 0.12) : (visibleAuditors.length - auditorIndex) * 0.08,
                          ease: [0.33, 1, 0.68, 1],
                          type: "tween",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          willChange: "transform, opacity",
                        }}
                      >
                        <div
                          className={`relative w-44 h-56 sm:w-52 sm:h-64 lg:w-56 lg:h-72 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                          style={{
                            boxShadow: `
                              0 25px 50px -12px rgba(0, 0, 0, 0.5),
                              0 0 30px rgba(236, 72, 153, 0.2)
                            `,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          <div className="absolute inset-0 flex items-center justify-center pt-4 sm:pt-6">
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-white/10">
                              <img
                                src={auditor.image}
                                alt={`Professional auditor from ${auditor.location}`}
                                className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                              />
                              <div 
                                className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                                style={{
                                  background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                                }}
                              />
                            </div>
                          </div>

                          <div className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-0 right-0 flex justify-center px-3 sm:px-4">
                            <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 w-full">
                              <p className="text-white font-sans font-bold text-xs sm:text-sm text-center">
                                {auditor.location}
                              </p>
                              <p className="text-white/80 font-sans text-[10px] sm:text-xs text-center">
                                {auditor.region}
                              </p>
                            </div>
                          </div>

                          <div 
                            className="absolute inset-0 pointer-events-none rounded-3xl"
                            style={{
                              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Animated Company Names Band - Inside Hero */}
        <div className="absolute bottom-0 left-0 right-0 py-6 overflow-hidden border-t border-cyan-400/20">
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex items-center gap-12 pr-12"
            >
              {[...Array(3)].map((_, index) => (
                <div key={`band1-${index}`} className="flex items-center gap-12">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs font-medium">Trusted by</span>
                  </div>
                  <span className="text-lg font-bold text-white/90">BMW</span>
                  <span className="text-lg font-bold text-white/90">MERCEDES-BENZ</span>
                  <span className="text-lg font-bold text-white/90">LINDE</span>
                  <span className="text-lg font-bold text-white/90">BOSCH</span>
                  <span className="text-lg font-bold text-white/90">SIEMENS</span>
                  <span className="text-lg font-bold text-white/90">VOLKSWAGEN</span>
                  <span className="text-lg font-bold text-white/90">AUDI</span>
                  <span className="text-lg font-bold text-white/90">CONTINENTAL</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              className="flex items-center gap-12 pr-12"
              aria-hidden="true"
            >
              {[...Array(3)].map((_, index) => (
                <div key={`band2-${index}`} className="flex items-center gap-12">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-xs font-medium">Trusted by</span>
                  </div>
                  <span className="text-lg font-bold text-white/90">BMW</span>
                  <span className="text-lg font-bold text-white/90">MERCEDES-BENZ</span>
                  <span className="text-lg font-bold text-white/90">LINDE</span>
                  <span className="text-lg font-bold text-white/90">BOSCH</span>
                  <span className="text-lg font-bold text-white/90">SIEMENS</span>
                  <span className="text-lg font-bold text-white/90">VOLKSWAGEN</span>
                  <span className="text-lg font-bold text-white/90">AUDI</span>
                  <span className="text-lg font-bold text-white/90">CONTINENTAL</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;