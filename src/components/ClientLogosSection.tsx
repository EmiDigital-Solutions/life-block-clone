import { motion } from "framer-motion";

const clients = [
  { name: "Siemens", logo: "SIEMENS" },
  { name: "Bosch", logo: "BOSCH" },
  { name: "BMW", logo: "BMW" },
  { name: "Mercedes", logo: "MERCEDES" },
  { name: "Volkswagen", logo: "VW" },
  { name: "Continental", logo: "CONTINENTAL" },
  { name: "ZF", logo: "ZF" },
  { name: "BASF", logo: "BASF" },
  { name: "Linde", logo: "LINDE" },
  { name: "Schaeffler", logo: "SCHAEFFLER" },
];

const ClientLogosSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-medium tracking-wide uppercase"
        >
          Trusted by leading enterprises
        </motion.p>
      </div>

      {/* Infinite scrolling logos */}
      <div className="relative">
        <div className="flex animate-scroll">
          {/* First set */}
          {clients.map((client, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 tracking-wide">
                {client.logo}
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 tracking-wide">
                {client.logo}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientLogosSection;
