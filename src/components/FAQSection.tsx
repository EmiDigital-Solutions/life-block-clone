import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    question: "How do you ensure audit quality and consistency?",
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
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about YVOO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-200 px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-gray-900 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
