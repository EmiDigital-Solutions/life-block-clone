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
    "Is the production floor actually organized—or chaotic?",
    "Does their quality system work in practice—or just on paper?",
    "Are certifications current and properly implemented?",
    "Can they really handle your volume requirements?",
    "Is management competent, experienced, reliable?",
    "What's their actual lead time under pressure?",
    "How do they handle quality issues with current clients?",
    "Is their equipment modern or outdated?",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F9FAFB] overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col items-center lg:items-start"
          >
            <div className="relative group">
              <img
                src={founderPortrait}
                alt="Ivo Karaula, CEO YVOO"
                className="w-full max-w-[400px] rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-6 text-center lg:text-left">
              <p className="text-sm text-[#6B7280]">
                Former Global Procurement Leader
              </p>
              <p className="text-sm text-[#6B7280] mt-1">
                Linde • BSH • SANYO
              </p>
            </div>
          </motion.div>

          {/* Right Side - Content (60%) */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2937] leading-tight mb-6"
            >
              "I built my career on supplier decisions.
              <br />
              I'm not gambling yours on AI guesses."
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-[#4B5563] leading-relaxed space-y-6 mb-8"
            >
              <p>
                25 years in procurement taught me one thing: The best supplier
                data comes from being there.
              </p>
              <p>
                AI is brilliant at finding needles in haystacks. It searches
                millions of suppliers in seconds. It gives you 85%+ accuracy on
                what's online.
              </p>
              <p className="font-semibold">
                But here's what AI will never tell you:
              </p>
            </motion.div>

            {/* Animated List */}
            <div className="space-y-3 mb-8 pl-5">
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 text-lg text-[#4B5563] leading-relaxed"
                >
                  <span className="text-[#EF4444] font-bold flex-shrink-0">
                    ❌
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              viewport={{ once: true }}
              className="space-y-4 mb-6"
            >
              <p className="text-xl font-bold text-[#1F2937]">
                These aren't details. These are deal-breakers.
              </p>
              <p className="text-xl font-bold text-[#1F2937]">
                And every single one of them is offline. Invisible to AI.
                Critical for your decision.
              </p>
              <p className="text-xl font-bold text-[#1F2937]">
                That's why we built YVOO: AI finds them. Humans verify what
                matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.3 }}
              viewport={{ once: true }}
              className="border-t border-[#E5E7EB] pt-6"
            >
              <p className="text-base text-[#6B7280]">
                — Ivo Karaula, CEO YVOO
              </p>
              <p className="text-sm text-[#6B7280] mt-1">
                Former Global Procurement Leader at Linde, BSH, SANYO
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMissionSection;
