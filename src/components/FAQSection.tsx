import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const activeFaqs = faqCategories.find((cat) => cat.id === activeCategory)?.faqs || [];

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        {/* Outer container - offmenu style */}
        <div className="bg-[#ebebeb] rounded-[32px] p-8 md:p-12 lg:p-16">
          {/* Header - offmenu style mixed weight typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="font-semibold text-foreground">Frequently</span>{" "}
              <span className="text-muted-foreground font-light">asked</span>
              <br />
              <span className="text-muted-foreground font-light">questions.</span>
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-foreground text-white"
                    : "bg-white text-foreground hover:bg-[#fafafa]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* FAQs */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {activeFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-[24px] border-0 px-7 data-[state=open]:bg-[#fafafa] transition-colors duration-300 hover:bg-[#fafafa]"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-foreground hover:no-underline py-6 [&[data-state=open]>svg]:rotate-180">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pb-7">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
