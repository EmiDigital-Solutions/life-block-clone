import { motion } from "framer-motion";
import { Search, Clock, FileX, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [Search, Clock, FileX, AlertTriangle];

const PainPointsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50">
              {t.painPoints.eyebrow}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground whitespace-pre-line">
            {t.painPoints.headline}
          </h2>
          <p className="text-lg text-foreground/50 mt-6">
            {t.painPoints.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-foreground/10">
          {t.painPoints.items.map((point, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-8 md:p-10 border-b border-r border-foreground/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
              >
                <Icon className="w-5 h-5 text-destructive mb-4" />
                <p className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                  {point.metric}
                </p>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
