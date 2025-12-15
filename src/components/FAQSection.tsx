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
  {
    question: "Does YVOO integrate with our existing ERP/PLM systems?",
    answer: "Yes, YVOO offers native integrations with SAP, Oracle, Microsoft Dynamics, and other major ERP systems. We also provide a REST API for custom integrations. Data syncs automatically, eliminating manual data entry.",
  },
  {
    question: "Can we connect YVOO to our supplier management platform?",
    answer: "Absolutely. We integrate with leading SRM platforms including Ariba, Coupa, Jaggaer, and GEP. Audit results flow directly into your supplier scorecards and risk dashboards.",
  },
  {
    question: "How is our audit data protected?",
    answer: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain SOC 2 Type II certification, GDPR compliance, and undergo regular third-party security audits. Your data is stored in ISO 27001 certified data centers.",
  },
  {
    question: "Who owns the audit data and reports?",
    answer: "You retain full ownership of all audit data and reports. We act as a data processor, not a data controller. You can export or delete your data at any time.",
  },
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
];

const FAQSection = () => {
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
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span className="font-semibold text-foreground">Frequently</span>{" "}
              <span className="text-muted-foreground font-light">asked</span>
              <br />
              <span className="text-muted-foreground font-light">questions.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
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
