import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";

const FounderMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const listItems = [
    "Production floor organization",
    "Quality system effectiveness",
    "Certification validity",
    "Volume capacity",
    "Management competence",
    "Actual lead times",
    "Quality issue handling",
    "Equipment modernity",
  ];

  return (
    <div ref={sectionRef} className="mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Smaller Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative group w-full max-w-[250px] lg:max-w-none">
              <img
                src={founderPortrait}
                alt="Ivo Karaula, CEO YVOO"
                className="w-full rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 text-center lg:text-left space-y-1">
              <p className="text-sm font-semibold text-white">
                Ivo Karaula
              </p>
              <p className="text-sm text-white/80">
                CEO YVOO
              </p>
              <p className="text-xs text-white/60 mt-2">
                Former Global Procurement Leader
              </p>
              <p className="text-xs text-white/60">
                Linde • BSH • SANYO
              </p>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                "I built my career on supplier decisions. I'm not gambling yours on AI guesses."
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                25 years in procurement taught me one thing: The best supplier
                data comes from being there. AI is brilliant at finding needles
                in haystacks—but here's what it will never tell you about a supplier:
              </p>
            </div>

            {/* Animated List - 2 Columns */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isVisible
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-2 text-sm md:text-base text-white/80"
                >
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">
                    ❌
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="pt-4 space-y-3"
            >
              <p className="text-base md:text-lg font-bold text-white">
                These aren't details. These are deal-breakers.
              </p>
              <p className="text-base md:text-lg font-semibold text-[#14B8A6]">
                That's why we built YVOO: AI finds them. Humans verify what matters.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FounderMissionSection;
