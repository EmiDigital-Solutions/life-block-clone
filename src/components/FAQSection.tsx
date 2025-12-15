import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How quickly can you assign an auditor?",
    answer: "In most cases, we can assign a certified auditor within 24-48 hours. For urgent requests, we have expedited options available. Our global network ensures coverage even in remote locations.",
  },
  {
    question: "What audit standards do you support?",
    answer: "We support 50+ international standards including ISO 9001, ISO 14001, IATF 16949, ISO 13485, AS9100, and many industry-specific standards. Our AI adapts frameworks to your specific requirements.",
  },
  {
    question: "How do you ensure audit quality?",
    answer: "Every auditor in our network is vetted and certified. Our AI-powered platform guides auditors through standardized processes, ensuring consistent quality across all audits regardless of location.",
  },
  {
    question: "What's included in the audit report?",
    answer: "You receive a comprehensive digital report within 24 hours, including findings, non-conformances, photos, evidence, risk scoring, and actionable recommendations. All data is accessible in your dashboard.",
  },
  {
    question: "Can I use my own audit checklists?",
    answer: "Absolutely. You can upload your proprietary checklists, modify our templates, or use industry-standard frameworks. Our platform adapts to your specific audit requirements.",
  },
  {
    question: "How does pricing work?",
    answer: "Pricing varies by audit type, location, and complexity. Use our ROI calculator above for instant estimates. There are no hidden fees — you pay per audit with transparent pricing.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5]">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            <span className="font-semibold text-foreground">Frequently</span>
            <br />
            <span className="text-[#b5b5b5] font-normal">asked questions</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-[#d5d5d5]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg md:text-xl text-foreground font-medium leading-snug">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d5d5d5] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#c5c5c5]">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-[#888888] text-base md:text-lg leading-relaxed pb-6 pr-16">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
