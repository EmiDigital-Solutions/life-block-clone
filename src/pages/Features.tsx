import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Feature categories with their features - Based on official YVOO tech sheets
const featureCategories = [
  {
    id: "search-suppliers",
    name: "SearchPro+",
    headline: "SearchPro+\nfeatures",
    link: "/search-suppliers",
    features: [
      {
        title: "AI Preference Engine",
        description: "AI automatically recognizes your requirements and preferences based on your profile and usage patterns."
      },
      {
        title: "Intelligent Requirement Capture",
        description: "AI extracts specifications from natural language or uploaded documents like CAD drawings and datasheets."
      },
      {
        title: "Triple-Source Search Architecture",
        description: "Simultaneous search across verified supplier database, company research database, and real-time web discovery."
      },
      {
        title: "Multi-Factor Matching",
        description: "Evaluation by industry, location, certifications, capacity, and specific technical requirements."
      },
      {
        title: "Explainable AI",
        description: "Transparent reasoning for supplier recommendations with match percentages and qualification details."
      },
      {
        title: "Smart Deduplication",
        description: "Automatic detection and merging of duplicate supplier entries across different data sources."
      },
      {
        title: "Dynamic Results",
        description: "Delivers only genuinely relevant matches, no filler results to pad the list."
      },
      {
        title: "Context-Aware Suggestions",
        description: "Industry-specific recommendations based on usage patterns and search history."
      },
      {
        title: "Alternative Term Discovery",
        description: "Identifies related terms and synonyms for complete market coverage across languages."
      },
      {
        title: "Real-Time Data Enrichment",
        description: "Continuous supplier data updates including new certifications, expansions, and risk signals."
      },
      {
        title: "One-Click Audit Ordering",
        description: "Direct on-site audit ordering with AI-powered facility analysis, equipment recognition, and compliance verification."
      },
      {
        title: "Integrated RFQ Management",
        description: "Send standardized RFQs to multiple suppliers directly from search results with one click."
      }
    ]
  },
  {
    id: "scanpro-plus",
    name: "ScanPro+",
    headline: "ScanPro+\nfeatures",
    link: "/scanpro-plus",
    features: [
      {
        title: "Flexible Audit Templates",
        description: "Customizable audit frameworks for any industry, standard, or customer requirement."
      },
      {
        title: "AI Equipment Recognition",
        description: "Point camera at machines for instant identification, age, maintenance status, and compliance assessment."
      },
      {
        title: "Global Auditor Network (Uber Principle)",
        description: "On-demand access to certified auditors worldwide with same-day and next-day availability."
      },
      {
        title: "Smart Auditor Matching",
        description: "Automatic selection of optimal auditors based on your industry and specific requirements."
      },
      {
        title: "Dynamic Scoring Systems",
        description: "Configurable evaluation criteria with industry-specific weightings for Pharma, Automotive, Aerospace."
      },
      {
        title: "Intelligent Evidence Collection",
        description: "Automatic categorization and analysis of audit evidence by quality control, safety, environmental standards."
      },
      {
        title: "Real-Time Progress Tracking",
        description: "Live updates with milestone notifications during audit execution."
      },
      {
        title: "Predictive Risk Scoring",
        description: "Risk prediction based on historical audit data identifying quality risks from equipment and processes."
      },
      {
        title: "Automated Improvement Tracking",
        description: "Monitor supplier development with milestone oversight and automatic reminders for corrective actions."
      },
      {
        title: "Comparative Benchmarking",
        description: "Analyze suppliers against industry peers with percentage-based quality and environmental scoring."
      },
      {
        title: "AI-Powered Audit Planning",
        description: "Optimal resource allocation, duration estimation, and specialist requirements for each audit."
      },
      {
        title: "Template Marketplace",
        description: "Share and discover certified audit frameworks from industry leaders."
      }
    ]
  },
  {
    id: "ground-intelligence",
    name: "Ground Intelligence",
    headline: "Ground Intelligence\nfeatures",
    link: "/ground-intelligence",
    features: [
      {
        title: "Real-Time Monitoring",
        description: "Continuous visibility into factory operations and performance with live data feeds."
      },
      {
        title: "Predictive Risk Scoring",
        description: "Dynamic risk assessment updated with live data anticipating issues before impact."
      },
      {
        title: "ERP Integration",
        description: "Seamless connection with SAP, Oracle, Microsoft Dynamics, Infor, and Epicor systems."
      },
      {
        title: "Quality Management Integration",
        description: "Direct data exchange with Trackwise, MasterControl, Pilgrim, and ETQ systems."
      },
      {
        title: "Automated Red-Flag Alerts",
        description: "Immediate notification for security violations, quality defects, or compliance issues."
      },
      {
        title: "Performance Dashboards",
        description: "Visual insights into supplier performance metrics and trend analysis over time."
      },
      {
        title: "Benchmark Comparison",
        description: "Compare supplier performance against industry benchmarks and standards."
      },
      {
        title: "Supplier Portal Integration",
        description: "Audit status and results visible to suppliers in your existing portal."
      },
      {
        title: "CAPA System Integration",
        description: "Non-conformance reports automatically transferred to your corrective action system."
      }
    ]
  },
  {
    id: "auditor-network",
    name: "Auditor Network",
    headline: "Auditor Network\nfeatures",
    link: "/auditors",
    features: [
      {
        title: "Global Coverage",
        description: "Access to certified auditors in 50+ countries with local expertise and language skills."
      },
      {
        title: "Industry Specialists",
        description: "Experts in Automotive (IATF 16949), Aerospace (AS9100), Pharma (GMP), and Chemical (REACH)."
      },
      {
        title: "Fast Deployment",
        description: "Same-day and next-day audits available. Auditors on-site within 24-48 hours."
      },
      {
        title: "Transparent Fixed Pricing",
        description: "Audits from €700 fixed price with no hidden costs or renegotiations."
      },
      {
        title: "Rating System",
        description: "Continuous auditor performance monitoring with quality assurance and training."
      },
      {
        title: "GPS Tracking",
        description: "Real-time auditor location tracking with live status updates during audits."
      }
    ]
  },
  {
    id: "integrations",
    name: "Integrations & API",
    headline: "Integrations\nfeatures",
    link: "#",
    features: [
      {
        title: "ERP Connectors",
        description: "Pre-built connectors for SAP, Oracle, Microsoft Dynamics, Infor, and Epicor."
      },
      {
        title: "Quality Management Systems",
        description: "Direct integration with Trackwise, MasterControl, Pilgrim Quality Solutions, and ETQ."
      },
      {
        title: "Supplier Portal Integration",
        description: "Embed audit status and results into your existing supplier portal infrastructure."
      },
      {
        title: "SSO Integration",
        description: "Enterprise single sign-on with SAML and OAuth for secure access management."
      },
      {
        title: "REST API",
        description: "Full API access for custom integrations and automation workflows."
      },
      {
        title: "Compliance & Certifications",
        description: "GDPR-compliant, SOC2-certified with complete audit trail for FDA, ISO 9001, TS16949, AS9100."
      }
    ]
  }
];

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("search-suppliers");

  const currentCategory = featureCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-white" data-nav-theme="light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Feature overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/70 max-w-2xl mb-8"
          >
            This overview highlights key functionality. For the full picture and the latest updates, we'd be happy to walk you through a demo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-white px-6 py-3 font-mono text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Request a demo
            </a>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 border-t border-foreground/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-0">
            {featureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-4 font-mono text-sm border-b-2 transition-colors ${
                  activeCategory === category.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {currentCategory && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Category Headline */}
            <motion.h2
              key={currentCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] leading-tight mb-12 whitespace-pre-line"
            >
              {currentCategory.headline}
            </motion.h2>

            {/* Features Grid */}
            <motion.div
              key={`grid-${currentCategory.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
            >
              {currentCategory.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="py-8 pr-8 border-t border-foreground/10"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Learn More Link */}
            {currentCategory.link !== "#" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-12"
              >
                <Link
                  to={currentCategory.link}
                  className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* API Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                API library
              </h2>
              <p className="text-foreground/60 max-w-xl">
                Leverage YVOO's API library to integrate seamlessly, sync data, and keep your procurement workflows connected.
              </p>
            </div>
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-white px-6 py-3 font-mono text-sm font-medium hover:bg-foreground/90 transition-colors shrink-0"
            >
              Request a demo
            </a>
          </div>
        </div>
      </section>

      {/* Looking for more details */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] mb-6">
            Looking for more details?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
            Our team is ready to walk you through every feature and answer your questions.
          </p>
          <a
            href="https://calendly.com/yvoo/demo-yvoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-mono text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Request a demo
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
