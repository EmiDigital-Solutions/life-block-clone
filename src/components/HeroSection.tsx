import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      data-nav-theme="light"
      className="relative min-h-screen flex flex-col bg-white"
    >
      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
        <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-foreground/60 text-sm tracking-widest uppercase mb-6"
            >
              AI-Powered Supplier Verification
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
              Verify Suppliers<br />
              in Days, Not Weeks
            </motion.h1>

            {/* Subtitle + CTA */}
            <div className="mt-12 lg:mt-16 lg:ml-[50%] max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-foreground/60 text-lg lg:text-xl mb-8"
              >
                Reduce supplier risk by 85%. Cut verification from 14 days to 3. AI-powered audits with 99% accuracy—so you never get burned by a bad supplier again.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg">
                  <a
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Your First Audit Free
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See How We'd Verify Your Supplier
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Client Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="py-8 overflow-hidden mt-auto relative z-10 border-t border-foreground/10"
      >
        <p className="text-center text-foreground/40 text-xs tracking-widest uppercase mb-5">
          Built for procurement teams at companies like
        </p>
        <div className="flex justify-center gap-10 md:gap-16 flex-wrap px-6">
          {["Siemens", "Bosch", "Schneider Electric", "ABB", "Honeywell", "Emerson", "Rockwell Automation", "Mitsubishi Electric"].map((company) => (
            <span
              key={company}
              className="text-lg md:text-xl font-semibold text-foreground/30 tracking-wide"
            >
              {company}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
