import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        question: "How does YVOO's search engine work?",
        answer: "YVOO SearchPro+ uses a triple-source architecture combining verified supplier databases, company research databases, and real-time web searches. Our AI agent guides you through a conversational workflow to understand your exact requirements.",
      },
      {
        question: "What makes SearchPro+ different from traditional search engines?",
        answer: "Unlike traditional search engines, SearchPro+ uses AI to understand procurement-specific requirements, searches multiple verified databases simultaneously, and provides explainable recommendations with quality scores.",
      },
      {
        question: "Who can use SearchPro+?",
        answer: "SearchPro+ is designed for procurement professionals, supply chain managers, and sourcing teams across all industries looking to streamline their supplier discovery process.",
      },
      {
        question: "How quickly can I find suppliers?",
        answer: "Most searches return qualified supplier matches within seconds. Our AI processes your requirements in real-time and ranks suppliers based on capability match, quality scores, and availability.",
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    faqs: [
      {
        question: "What is the AI Copilot feature?",
        answer: "The AI Copilot is an intelligent assistant that guides you through the supplier search process. It asks clarifying questions, understands your specific requirements, and provides contextual recommendations throughout your search journey.",
      },
      {
        question: "How does risk scoring work?",
        answer: "Our AI analyzes multiple factors including financial stability, certification status, audit history, location risks, and delivery performance to generate a comprehensive risk score for each supplier.",
      },
      {
        question: "Can I save and compare suppliers?",
        answer: "Yes, you can save suppliers to shortlists, compare them side-by-side, and export comparison reports. All your searches and saved suppliers are accessible from your dashboard.",
      },
      {
        question: "How can I use SearchPro+'s export files?",
        answer: "You can export supplier lists in CSV, Excel, or PDF formats for seamless integration with your existing procurement systems or ERP platforms.",
      },
    ],
  },
  {
    id: "data",
    label: "Data & Sources",
    faqs: [
      {
        question: "Where does the supplier data come from?",
        answer: "We aggregate data from verified supplier databases, company registries, certification bodies, trade publications, and real-time web searches. All data is validated and regularly updated.",
      },
      {
        question: "How current is the supplier information?",
        answer: "Our system continuously updates supplier data. Core information is refreshed weekly, while critical data like certifications and compliance status is monitored in real-time.",
      },
      {
        question: "Can I verify supplier certifications?",
        answer: "Yes, SearchPro+ displays verified certifications with expiration dates. You can also request direct verification through our one-click audit ordering feature.",
      },
      {
        question: "How many suppliers are in your database?",
        answer: "Our database includes millions of suppliers across all major manufacturing categories and geographies. Coverage is particularly strong in Asia, Europe, and North America.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Plans",
    faqs: [
      {
        question: "Do I need a subscription to use SearchPro+?",
        answer: "Yes, YVOO SearchPro+ is available through subscription plans tailored to your company size and needs. Contact us for a demo and custom pricing.",
      },
      {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a 14-day free trial with full access to SearchPro+ features. No credit card required to start.",
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.",
      },
      {
        question: "Are there enterprise pricing options?",
        answer: "Yes, we offer custom enterprise plans with volume discounts, dedicated support, and advanced features like SSO and API access. Contact our sales team for details.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    faqs: [
      {
        question: "Is my data treated confidentially?",
        answer: "Absolutely. We maintain strict data privacy standards and comply with GDPR regulations. Your searches and supplier lists remain completely confidential.",
      },
      {
        question: "How is my search data protected?",
        answer: "All data is encrypted at rest and in transit. We maintain SOC 2 Type II certification and undergo regular third-party security audits.",
      },
      {
        question: "Who can see my supplier searches?",
        answer: "Only authorized users within your organization can access your searches. Suppliers cannot see who has searched for them or viewed their profiles.",
      },
      {
        question: "Can I control team access?",
        answer: "Yes, enterprise plans include role-based access control, allowing you to manage permissions for different team members and departments.",
      },
    ],
  },
];

const SearchSuppliersFAQ = () => {
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
    <section className="py-24 md:py-32 bg-white" data-nav-theme="light">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
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

        {/* Category Tabs - matching homepage */}
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
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-foreground text-white"
                  : "bg-[#e5e5e5] text-foreground hover:bg-[#d5d5d5]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List — shifted one grid column right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          <div className="hidden lg:block lg:col-span-1" />
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5"
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d5d5d5] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#c5c5c5]">
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
      </div>
    </section>
  );
};

export default SearchSuppliersFAQ;
