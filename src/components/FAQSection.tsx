import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
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
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    faqs: [
      {
        question: "Does YVOO integrate with our existing ERP/PLM systems?",
        answer: "Yes, YVOO offers native integrations with SAP, Oracle, Microsoft Dynamics, and other major ERP systems. We also provide a REST API for custom integrations. Data syncs automatically, eliminating manual data entry.",
      },
      {
        question: "Can we connect YVOO to our supplier management platform?",
        answer: "Absolutely. We integrate with leading SRM platforms including Ariba, Coupa, Jaggaer, and GEP. Audit results flow directly into your supplier scorecards and risk dashboards.",
      },
      {
        question: "Is there an API for custom integrations?",
        answer: "Yes, we provide a comprehensive REST API with full documentation. You can automate audit requests, retrieve reports, sync supplier data, and integrate with any internal system.",
      },
      {
        question: "How long does integration setup take?",
        answer: "Standard ERP integrations can be configured in 1-2 days. Custom API integrations typically take 1-2 weeks depending on complexity. Our integration team provides full support throughout.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    faqs: [
      {
        question: "How is our audit data protected?",
        answer: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain SOC 2 Type II certification, GDPR compliance, and undergo regular third-party security audits. Your data is stored in ISO 27001 certified data centers.",
      },
      {
        question: "Who owns the audit data and reports?",
        answer: "You retain full ownership of all audit data and reports. We act as a data processor, not a data controller. You can export or delete your data at any time.",
      },
      {
        question: "Where is data stored geographically?",
        answer: "We offer data residency options in the EU, US, and Asia-Pacific regions. Enterprise clients can specify their preferred data center location to meet regulatory requirements.",
      },
      {
        question: "Do you have compliance certifications?",
        answer: "Yes, we maintain SOC 2 Type II, ISO 27001, and GDPR compliance. We can provide audit reports and compliance documentation upon request for your vendor assessment process.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    faqs: [
      {
        question: "What kind of support do you offer?",
        answer: "We provide 24/7 email support, dedicated account managers for enterprise clients, and live chat during business hours. Our average response time is under 2 hours for critical issues.",
      },
      {
        question: "Do you offer training for our team?",
        answer: "Yes, we provide complimentary onboarding sessions, video tutorials, and documentation. Enterprise clients receive customized training programs and ongoing success management.",
      },
      {
        question: "What happens if an audit needs to be rescheduled?",
        answer: "Audits can be rescheduled up to 48 hours before the scheduled date at no additional cost. Our support team handles all coordination with auditors and suppliers.",
      },
      {
        question: "How do I escalate urgent issues?",
        answer: "Enterprise clients have direct access to their account manager and a priority support line. Critical issues are escalated immediately and resolved within 4 hours SLA.",
      },
    ],
  },
];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = faqCategories.find((cat) => cat.id === activeCategory)?.faqs || [];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(0);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-headline text-foreground">
            Frequently asked questions
          </h2>
        </motion.div>

        {/* Category Tabs - pill style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-foreground text-white"
                  : "bg-[#e5e5e5] text-foreground hover:bg-[#d5d5d5]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeFaqs.map((faq, index) => (
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
