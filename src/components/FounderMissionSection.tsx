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
      className="relative bg-background overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
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
                className="w-full max-w-[400px] rounded-3xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-6 text-center lg:text-left space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                Former Global Procurement Leader
              </p>
              <p className="text-sm text-muted-foreground">
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
            >
              <span className="text-primary">Our mission.</span>{" "}
              <span className="text-foreground">
                Building bridges that power innovation.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground leading-relaxed space-y-6 mb-10"
            >
              <p>
                At YVOO, we use AI and data to make the global company landscape
                more structured and transparent. Our crawler continuously maps
                the global business world, transforming scattered data into
                clear, actionable insights.
              </p>
              <p>
                This enables businesses to discover innovative companies that are
                often overlooked by traditional search engines, gain transparency
                of markets across industries, technologies and regions, and make
                informed decisions based on accurate, up-to-date information.
              </p>
              <p className="font-semibold text-foreground">
                YVOO is a tool for the whole organization, from marketing and
                sales to procurement, enabling companies to streamline processes,
                drive innovation and build resilient supply chains with confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                <p className="text-lg font-semibold text-foreground mb-3">
                  "I built my career on supplier decisions. I'm not gambling yours on AI guesses."
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  25 years in procurement taught me one thing: The best supplier
                  data comes from being there. AI is brilliant at finding needles
                  in haystacks—but here's what it will never tell you about a supplier.
                </p>
              </div>

              {/* Animated List */}
              <div className="space-y-2 pl-2">
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
                      delay: 0.6 + index * 0.15,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                  >
                    <span className="text-destructive font-bold flex-shrink-0 mt-0.5">
                      ❌
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <p className="text-lg font-bold text-foreground">
                  These aren't details. These are deal-breakers.
                </p>
                <p className="text-lg font-semibold text-primary mt-4">
                  That's why we built YVOO: AI finds them. Humans verify what
                  matters.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                viewport={{ once: true }}
                className="border-t border-border pt-6 mt-8"
              >
                <p className="text-base text-muted-foreground font-medium">
                  — Ivo Karaula, CEO YVOO
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Former Global Procurement Leader at Linde, BSH, SANYO
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMissionSection;
