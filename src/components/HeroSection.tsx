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
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";

const fallbackAuditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe", gradient: "from-blue-600 via-blue-700 to-blue-800" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific", gradient: "from-[#14B8A6] via-[#12A594] to-[#0F8775]" },
  { image: auditorFemaleAfrican, location: "Africa", region: "Sub-Saharan", gradient: "from-gray-800 via-gray-900 to-black" },
  { image: auditorLatin, location: "Americas", region: "North & South", gradient: "from-blue-600 via-blue-700 to-blue-800" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region", gradient: "from-[#14B8A6] via-[#12A594] to-[#0F8775]" },
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
    <section data-nav-theme="dark" className="relative min-h-screen flex flex-col overflow-hidden bg-hero-background pb-24 sm:pb-28 lg:pb-0">
      <div className="absolute inset-0 bg-hero-background"></div>

      <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-6 xl:gap-20 2xl:gap-28 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-6 md:space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
                  <div className="h-px w-12 bg-cyan-400/40"></div>
                  <span>{heroContent.tagline}</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                {heroContent.heading}
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl font-medium text-cyan-400/90 leading-[1.4] mb-8"
              >
                {heroContent.subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg font-normal text-white/70 leading-[1.6] max-w-[600px] mb-12"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex"
              >
                <button className="bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                  {heroContent.ctaText}
                </button>
              </motion.div>
            </div>

            {/* Right Column: Animated Auditor Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-center order-first lg:order-last"
            >
              <div 
                className="relative w-full"
                style={{ perspective: "2000px" }}
              >
                <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                
                <div className="relative h-[375px] sm:h-[438px] lg:h-[210px] xl:h-[530px] 2xl:h-[630px] 3xl:h-[740px] flex items-center justify-center">
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
                          className={`relative w-[220px] h-[280px] sm:w-[260px] sm:h-[320px] lg:w-[105px] lg:h-[135px] xl:w-[300px] xl:h-[390px] 2xl:w-[360px] 2xl:h-[460px] 3xl:w-[400px] 3xl:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                          style={{
                            boxShadow: `
                              0 25px 50px -12px rgba(0, 0, 0, 0.5),
                              0 0 30px rgba(236, 72, 153, 0.2)
                            `,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          <div className="absolute inset-0 flex items-center justify-center pt-6 sm:pt-8 lg:pt-3 xl:pt-9 2xl:pt-11 3xl:pt-14">
                            <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[90px] lg:h-[90px] xl:w-[185px] xl:h-[185px] 2xl:w-[215px] 2xl:h-[215px] 3xl:w-[240px] 3xl:h-[240px] rounded-full overflow-hidden border-2 border-white/10">
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

                          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-2 xl:bottom-7 2xl:bottom-9 3xl:bottom-14 left-0 right-0 flex justify-center px-4 sm:px-6 lg:px-2">
                            <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 lg:px-2 xl:px-8 2xl:px-10 py-2 sm:py-3 lg:py-1 xl:py-3.5 2xl:py-4 w-full">
                              <p className="text-white font-sans font-bold text-sm sm:text-base lg:text-[9px] xl:text-lg 2xl:text-2xl 3xl:text-3xl text-center">
                                {auditor.location}
                              </p>
                              <p className="text-white/80 font-sans text-xs sm:text-sm lg:text-[8px] xl:text-base 2xl:text-xl 3xl:text-2xl text-center">
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
      </div>

      {/* Animated Company Names Band - White Background */}
      <div className="relative bottom-0 left-0 right-0 py-4 sm:py-5 lg:py-6 overflow-hidden bg-white border-t border-gray-200 z-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3">
              <span className="text-xs sm:text-sm font-semibold text-gray-600">Trusted by Global Industry Leaders</span>
            </div>
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
                className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={`band1-${index}`} className="flex items-center gap-8 sm:gap-12">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BMW</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">MERCEDES-BENZ</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">LINDE</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BOSCH</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">SIEMENS</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">VOLKSWAGEN</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">AUDI</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">CONTINENTAL</span>
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
                className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
                aria-hidden="true"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={`band2-${index}`} className="flex items-center gap-8 sm:gap-12">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BMW</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">MERCEDES-BENZ</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">LINDE</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BOSCH</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">SIEMENS</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">VOLKSWAGEN</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">AUDI</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">CONTINENTAL</span>
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