import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Feature categories with their features
const featureCategories = [
  {
    id: "search-suppliers",
    name: "Search Suppliers",
    headline: "Search Suppliers\nfeatures",
    link: "/search-suppliers",
    features: [
      {
        title: "AI-Powered Search",
        description: "Find suppliers using natural language queries and intelligent matching."
      },
      {
        title: "Global Coverage",
        description: "Access verified suppliers across 50+ countries worldwide."
      },
      {
        title: "Smart Filters",
        description: "Filter by certification, capacity, industry, and location."
      },
      {
        title: "Capability Matching",
        description: "Match your requirements to supplier capabilities automatically."
      },
      {
        title: "Risk Scoring",
        description: "View supplier risk profiles and compliance status instantly."
      },
      {
        title: "Verified Profiles",
        description: "Access supplier data validated through on-site audits."
      },
      {
        title: "Instant Shortlists",
        description: "Create and export supplier shortlists in seconds."
      },
      {
        title: "Historical Data",
        description: "Leverage past audit data for better sourcing decisions."
      },
      {
        title: "Integration Ready",
        description: "Connect with your existing procurement systems seamlessly."
      },
      {
        title: "Custom Alerts",
        description: "Get notified when new matching suppliers are verified."
      },
      {
        title: "Comparison Tools",
        description: "Compare multiple suppliers side-by-side with ease."
      },
      {
        title: "Export & Share",
        description: "Share supplier profiles and reports with stakeholders."
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
        title: "One-Click Dispatch",
        description: "Deploy auditors to any factory with a single click."
      },
      {
        title: "AI Copilot",
        description: "Get intelligent audit recommendations and analysis."
      },
      {
        title: "Live Tracking",
        description: "Monitor audit progress in real-time from anywhere."
      },
      {
        title: "Compliance Standards",
        description: "Support for 200+ international compliance standards."
      },
      {
        title: "Evidence Collection",
        description: "Capture and verify audit evidence digitally."
      },
      {
        title: "Smart Scheduling",
        description: "Optimize auditor deployment with AI-powered scheduling."
      },
      {
        title: "Multi-Language Reports",
        description: "Generate audit reports in 15+ languages automatically."
      },
      {
        title: "Root Cause Analysis",
        description: "Identify systemic issues with AI-powered analysis."
      },
      {
        title: "Corrective Actions",
        description: "Track and verify corrective action implementation."
      },
      {
        title: "Audit Templates",
        description: "Use industry-specific audit templates and checklists."
      },
      {
        title: "Photo Documentation",
        description: "Geo-tagged, timestamped evidence with AI verification."
      },
      {
        title: "Instant Reports",
        description: "Receive comprehensive audit reports within 24 hours."
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
        description: "Continuous visibility into factory operations and performance."
      },
      {
        title: "Risk Scoring",
        description: "Dynamic risk assessment updated with live data."
      },
      {
        title: "ERP Integration",
        description: "Seamless connection with your enterprise systems."
      },
      {
        title: "Predictive Analytics",
        description: "Anticipate issues before they impact your supply chain."
      },
      {
        title: "Alert System",
        description: "Customizable alerts for quality and compliance events."
      },
      {
        title: "Performance Dashboards",
        description: "Visual insights into supplier performance metrics."
      },
      {
        title: "Trend Analysis",
        description: "Track supplier performance trends over time."
      },
      {
        title: "Benchmark Comparison",
        description: "Compare supplier performance against industry benchmarks."
      },
      {
        title: "Document Management",
        description: "Centralized repository for all supplier documentation."
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
        description: "Access to 500+ certified auditors in 50+ countries."
      },
      {
        title: "Industry Expertise",
        description: "Specialists in automotive, aerospace, pharma, and more."
      },
      {
        title: "Certification Verified",
        description: "All auditors verified for relevant certifications."
      },
      {
        title: "Fast Deployment",
        description: "Auditors on-site within 48 hours in most regions."
      },
      {
        title: "Quality Assurance",
        description: "Continuous auditor performance monitoring and training."
      },
      {
        title: "Local Language",
        description: "Native speakers for effective factory communication."
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
        title: "REST API",
        description: "Full API access for custom integrations and automation."
      },
      {
        title: "ERP Connectors",
        description: "Pre-built connectors for SAP, Oracle, and more."
      },
      {
        title: "SSO Integration",
        description: "Enterprise single sign-on with SAML and OAuth."
      },
      {
        title: "Webhook Events",
        description: "Real-time event notifications to your systems."
      },
      {
        title: "Data Export",
        description: "Flexible data export in multiple formats."
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
