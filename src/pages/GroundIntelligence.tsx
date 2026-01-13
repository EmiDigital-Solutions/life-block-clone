import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Plus, Minus } from "lucide-react";

// Import images
import liveTrackingImg from "@/assets/live-tracking-dashboard.jpg";
import riskScoringImg from "@/assets/risk-scoring-ai.jpg";
import erpIntegrationImg from "@/assets/erp-integration-sync.jpg";

const GroundIntelligence = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      title: "Centralize supplier data",
      description: "Store all supplier information, risk scores, performance metrics, and audit history in one secure platform."
    },
    {
      title: "Real-time monitoring",
      description: "Track supplier performance continuously with IoT sensors and AI-powered analytics for instant visibility."
    },
    {
      title: "Predictive intelligence",
      description: "Leverage AI insights on risk patterns and capacity trends to make proactive decisions."
    }
  ];

  const features = [
    {
      title: "Live monitoring dashboard",
      description: "Monitor all your suppliers in real-time with our centralized dashboard. Track performance metrics, risk indicators, and capacity utilization across your entire supply network.",
      image: liveTrackingImg
    },
    {
      title: "AI-powered risk scoring",
      description: "Our AI continuously analyzes supplier data to provide accurate risk scores. Identify potential issues before they impact your operations with predictive analytics.",
      image: riskScoringImg
    },
    {
      title: "Seamless ERP integrations",
      description: "Connect Ground Intelligence with your existing ERP, MES, and QMS systems. Keep your source of truth intact while gaining enhanced visibility.",
      image: erpIntegrationImg
    }
  ];

  const faqCategories = [
    {
      id: "general",
      label: "General",
      faqs: [
        {
          question: "How does Ground Intelligence monitor suppliers in real-time?",
          answer: "Ground Intelligence combines IoT sensor data, system integrations, and AI analytics to provide continuous visibility into supplier operations. Data is collected from multiple sources and processed in real-time to detect anomalies and predict potential issues."
        },
        {
          question: "How long does implementation take?",
          answer: "Most teams are operational within 2-4 weeks. The pilot program focuses on a single critical supplier, with full network deployment following. Our team provides comprehensive support throughout the implementation process."
        },
        {
          question: "What are the key benefits of using Ground Intelligence?",
          answer: "Ground Intelligence reduces issue detection lead time by up to 85%, achieves 92% accuracy in delay prediction, and enables 3.2x faster response to supplier risks. The platform transforms reactive supplier management into proactive supply chain optimization."
        },
      ],
    },
    {
      id: "integrations",
      label: "Integrations",
      faqs: [
        {
          question: "Does Ground Intelligence integrate with existing systems?",
          answer: "Yes. Ground Intelligence provides open APIs and pre-built connectors for major ERP, MES, and QMS systems. Your existing source of truth remains intact while gaining enhanced real-time visibility."
        },
        {
          question: "What data sources can be connected?",
          answer: "We support IoT sensors, ERP systems (SAP, Oracle, Microsoft Dynamics), MES platforms, QMS tools, and custom data feeds via our REST API. Data syncs continuously for real-time monitoring."
        },
        {
          question: "How long does integration setup take?",
          answer: "Standard ERP integrations can be configured in 1-2 days. IoT sensor deployment typically takes 1-2 weeks depending on supplier locations. Our integration team provides full support throughout."
        },
      ],
    },
    {
      id: "security",
      label: "Security",
      faqs: [
        {
          question: "How is supplier data protected?",
          answer: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain SOC 2 Type II certification, GDPR compliance, and undergo regular third-party security audits."
        },
        {
          question: "Who has access to the intelligence data?",
          answer: "Access is controlled through role-based permissions. You define who can view supplier data, risk scores, and analytics. All access is logged and auditable."
        },
      ],
    },
  ];

  const [activeFaqCategory, setActiveFaqCategory] = useState("general");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeFaqs = faqCategories.find((cat) => cat.id === activeFaqCategory)?.faqs || [];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFaqCategoryChange = (categoryId: string) => {
    setActiveFaqCategory(categoryId);
    setOpenFaqIndex(0);
  };

  const relatedProducts = [
    {
      title: "Search",
      description: "Find and evaluate new suppliers with AI-powered discovery and due diligence.",
      link: "/search-suppliers",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
    },
    {
      title: "ScanPro+",
      description: "Conduct comprehensive supplier audits with AI-assisted inspection and documentation.",
      link: "/scanpro-plus",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
    },
    {
      title: "Be Found",
      description: "Help suppliers get discovered by enterprise buyers through verified profiles.",
      link: "/be-found",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Clean white background like Archlet */}
      <section
        data-nav-theme="light"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="hero"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-sm font-mono tracking-wider mb-6"
          >
            Ground Intelligence
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.05] text-foreground mb-8"
          >
            One place for all<br />
            supplier intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Monitor supplier performance, risk, and capacity in one integrated intelligence platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={() => scrollToSection('cta')}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all duration-300"
            >
              Request a demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - 3 columns with accent bars */}
      <section
        data-nav-theme="light"
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background border-t border-border"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                {/* Accent bar - using primary color */}
                <div className="w-16 h-1.5 bg-primary rounded-full" />
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Section - Tabbed with images */}
      <section
        data-nav-theme="light"
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-muted/30"
        id="features"
      >
        <div className="container mx-auto max-w-6xl">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`mb-24 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="space-y-6 mb-8">
                <h2 className="text-3xl lg:text-4xl font-semibold text-foreground">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {feature.description}
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden border border-border bg-background"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="results"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              Proven results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { metric: "−85%", label: "Lead time for issue detection" },
              { metric: "92%", label: "Accuracy in delay prediction" },
              { metric: "3.2x", label: "Faster response to supplier risks" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-8"
              >
                <div className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-4">
                  {item.metric}
                </div>
                <p className="text-muted-foreground text-lg">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-muted/30"
        id="pricing"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              Pricing plans
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                name: "Pilot", 
                description: "Single-supplier deployment",
                features: ["Monitor one critical supplier", "6-month engagement", "Training included"]
              },
              { 
                name: "Network", 
                description: "Multi-supplier program",
                features: ["Up to 10 suppliers", "Comparative analytics", "Dedicated analyst"],
                highlighted: true
              },
              { 
                name: "Enterprise", 
                description: "Organization-wide intelligence",
                features: ["Unlimited suppliers", "Custom integrations", "Strategic advisory"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 lg:p-10 rounded-2xl border ${
                  plan.highlighted 
                    ? 'bg-background border-primary border-2 shadow-lg' 
                    : 'bg-background border-border'
                }`}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-8">{plan.description}</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Homepage style */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-white"
        id="faq"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-headline text-foreground">
              Questions about Ground Intelligence
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
                onClick={() => handleFaqCategoryChange(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFaqCategory === category.id
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
            key={activeFaqCategory}
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
                    {openFaqIndex === index ? (
                      <Minus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? "auto" : 0,
                    opacity: openFaqIndex === index ? 1 : 0,
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

      {/* Related Products Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-muted/30"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((product, index) => (
              <motion.a
                key={index}
                href={product.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                <div className="rounded-2xl overflow-hidden border border-border bg-background hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background border-t border-border"
        id="cta"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-foreground">
              Ready to transform supplier intelligence?
            </h2>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Ground Intelligence gives you real-time visibility into your entire supply network.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all duration-300">
                Request a demo
              </button>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-foreground text-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-foreground hover:text-background transition-all duration-300">
                Contact sales
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroundIntelligence;
