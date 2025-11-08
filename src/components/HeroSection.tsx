import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useContentByType, getMediaPublicUrl } from "@/hooks/useContentQuery";
import { supabase } from "@/integrations/supabase/client";
import SphereImageGrid, { ImageData } from "@/components/SphereImageGrid";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorFemaleOceania from "@/assets/auditor-female-oceania.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorGen1 from "@/assets/auditor-gen-1.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
import auditorGen4 from "@/assets/auditor-gen-4.jpg";
import auditorGen5 from "@/assets/auditor-gen-5.jpg";
import auditorGen6 from "@/assets/auditor-gen-6.jpg";
import auditorGen13 from "@/assets/auditor-gen-13.jpg";
import auditorGen15 from "@/assets/auditor-gen-15.jpg";
import auditorGen17 from "@/assets/auditor-gen-17.jpg";
import auditorGen18 from "@/assets/auditor-gen-18.jpg";
import auditorGen21 from "@/assets/auditor-gen-21.jpg";
import auditorGen23 from "@/assets/auditor-gen-23.jpg";
import auditorGen24 from "@/assets/auditor-gen-24.jpg";
import auditorBlonde1 from "@/assets/auditor-blonde-1.jpg";
import auditorBlonde2 from "@/assets/auditor-blonde-2.jpg";
import auditorBlonde3 from "@/assets/auditor-blonde-3.jpg";
import auditorBlonde4 from "@/assets/auditor-blonde-4.jpg";
import auditorBlonde5 from "@/assets/auditor-blonde-5.jpg";
import auditorBlonde6 from "@/assets/auditor-blonde-6.jpg";
import auditorBlonde7 from "@/assets/auditor-blonde-7.jpg";
import auditorBlonde8 from "@/assets/auditor-blonde-8.jpg";

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

  // Sphere images array
  const sphereImages: ImageData[] = [{
    id: '1', src: auditorBlonde1, alt: 'European Female Auditor', title: 'Europe'
  }, {
    id: '2', src: auditorBlonde2, alt: 'Scandinavian Inspector', title: 'Northern Europe'
  }, {
    id: '3', src: auditorBlonde3, alt: 'German Quality Manager', title: 'Europe'
  }, {
    id: '4', src: auditorBlonde4, alt: 'Dutch Auditor', title: 'Netherlands'
  }, {
    id: '5', src: auditorBlonde5, alt: 'Swedish Safety Inspector', title: 'Sweden'
  }, {
    id: '6', src: auditorBlonde6, alt: 'British Compliance Auditor', title: 'UK'
  }, {
    id: '7', src: auditorBlonde7, alt: 'Australian Operations Manager', title: 'Australia'
  }, {
    id: '8', src: auditorBlonde8, alt: 'Norwegian Site Manager', title: 'Norway'
  }, {
    id: '9', src: auditorEuropean, alt: 'European Auditor', title: 'Europe'
  }, {
    id: '10', src: auditorAsian, alt: 'Asian Auditor', title: 'East Asia'
  }, {
    id: '11', src: auditorFemaleEuropean, alt: 'European Female Auditor', title: 'Europe'
  }, {
    id: '12', src: auditorFemaleAsian, alt: 'Asian Female Auditor', title: 'East Asia'
  }, {
    id: '13', src: auditorLatin, alt: 'Latin American Auditor', title: 'Americas'
  }, {
    id: '14', src: auditorAfrican, alt: 'African Auditor', title: 'Africa'
  }, {
    id: '15', src: auditorMiddleEast, alt: 'Middle Eastern Auditor', title: 'Middle East'
  }, {
    id: '16', src: auditorSouthAsian, alt: 'South Asian Auditor', title: 'South Asia'
  }, {
    id: '17', src: auditorFemaleAfrican, alt: 'African Female Auditor', title: 'Africa'
  }, {
    id: '18', src: auditorFemaleLatin, alt: 'Latin American Female Auditor', title: 'Americas'
  }, {
    id: '19', src: auditorFemaleMiddleEast, alt: 'Middle Eastern Female Auditor', title: 'Middle East'
  }, {
    id: '20', src: auditorFemaleSouthAsian, alt: 'South Asian Female Auditor', title: 'South Asia'
  }, {
    id: '21', src: auditorFemaleOceania, alt: 'Oceanian Female Auditor', title: 'Oceania'
  }, {
    id: '22', src: auditorMaleNorthAmerica, alt: 'North American Auditor', title: 'North America'
  }, {
    id: '23', src: auditorGen1, alt: 'Quality Inspector', title: 'Global'
  }, {
    id: '24', src: auditorGen2, alt: 'Safety Auditor', title: 'Global'
  }, {
    id: '25', src: auditorGen3, alt: 'Compliance Officer', title: 'Global'
  }, {
    id: '26', src: auditorGen4, alt: 'Factory Inspector', title: 'Global'
  }, {
    id: '27', src: auditorGen5, alt: 'Operations Auditor', title: 'Global'
  }, {
    id: '28', src: auditorGen6, alt: 'Quality Manager', title: 'Global'
  }, {
    id: '29', src: auditorGen13, alt: 'Site Auditor', title: 'Global'
  }, {
    id: '30', src: auditorGen15, alt: 'Process Inspector', title: 'Global'
  }, {
    id: '31', src: auditorGen17, alt: 'Technical Auditor', title: 'Global'
  }, {
    id: '32', src: auditorGen18, alt: 'Manufacturing Inspector', title: 'Global'
  }, {
    id: '33', src: auditorGen21, alt: 'Supply Chain Auditor', title: 'Global'
  }, {
    id: '34', src: auditorGen23, alt: 'Facility Inspector', title: 'Global'
  }, {
    id: '35', src: auditorGen24, alt: 'Verification Auditor', title: 'Global'
  }];

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
    <section data-nav-theme="dark" className="relative min-h-screen flex flex-col overflow-hidden bg-black pb-24 sm:pb-28 lg:pb-0">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-6 xl:gap-20 2xl:gap-28 items-center">
            
            {/* Sphere - Mobile First, Desktop Second */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] order-first lg:order-last"
            >
              <SphereImageGrid
                images={sphereImages}
                sphereRadius={isMobile ? 200 : 280}
                baseImageScale={0.8}
                autoRotate={true}
                autoRotateSpeed={0.15}
              />
            </motion.div>

            {/* Text Content - Mobile Second, Desktop First */}
            <div className="flex flex-col space-y-6 md:space-y-8 text-left order-last lg:order-first">
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