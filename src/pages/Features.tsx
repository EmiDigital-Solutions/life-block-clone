import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageGridOverlay from "@/components/PageGridOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";

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
        description: "Core intelligence layer that learns your company profile, industry context, and usage patterns to auto-detect requirements, recognize technical entities (materials, certificates, tests), and deliver pre-filtered results.",
        highlighted: true
      },
      {
        title: "AI Company Finder",
        description: "Real-time company search with AI-powered scraping, enrichment, profile auto-population, and automatic industry and capability detection."
      },
      {
        title: "AI Agent Sessions",
        description: "Conversational supplier discovery with 10+ specialized agents: Supplier Discovery, Product Research, Market Analysis, Risk Assessment, Price Comparison, Compliance Check, Sourcing Strategy, and more."
      },
      {
        title: "Intelligent Matching",
        description: "AI-powered compatibility scoring using semantic vector embeddings across industry match, location proximity, certification alignment, capacity fit, risk assessment, and quality scores."
      },
      {
        title: "Reverse Matching",
        description: "Suppliers are automatically matched to buyers with recommendation confidence scores for both directions."
      },
      {
        title: "Comprehensive Supplier Profiles",
        description: "Business verification, manufacturing capabilities, multi-location support, production capacity, quality control processes, shipping methods, and premium verification badges."
      },
      {
        title: "Certification Tracking",
        description: "ISO standards tracking (9001, 14001, 45001), industry certifications (FDA, CE, ROHS), expiry monitoring, and compliance verification."
      },
      {
        title: "Supplier Product Catalog",
        description: "Product listings with material types, technical specifications, images, MOQs, lead times, and pricing — all searchable and filterable."
      },
      {
        title: "Performance Metrics",
        description: "Rating and reliability scores, quality performance tracking, delivery performance, and communication responsiveness."
      },
      {
        title: "RFQ System",
        description: "Multi-line item RFQs with specifications, target pricing, delivery dates, attachments, and sample requirements. Open or targeted distribution."
      },
      {
        title: "Auto-Match RFQs to Suppliers",
        description: "Automatic supplier matching for RFQs with invitation tracking and targeted supplier selection."
      },
      {
        title: "RFQ Response Management",
        description: "Supplier quote submissions, specification compliance, alternative proposals, payment terms, certificate uploads, and sample availability tracking."
      },
      {
        title: "Evaluation & Award",
        description: "Response comparison tools, buyer evaluation and rating, award decision workflow, and automatic notification to winners."
      }
    ]
  },
  {
    id: "scanpro-plus",
    name: "ScanPro+",
    headline: "ScanPro+\nfor Clients",
    link: "/scanpro-plus",
    clusters: [
      {
        clusterName: "Audit Management System",
        features: [
          { title: "Audit Templates", description: "Reusable templates with version control, section/question hierarchy, scoring criteria, public/private access, and standard-template mapping." },
          { title: "Multi-Standard Support", description: "20+ ISO and industry standards including ISO 9001, 14001, 45001, IATF 16949, AS9100, ISO 13485, ISO 22000 — with complexity levels and auditor requirements per standard." },
          { title: "Audit Lifecycle Management", description: "Full workflow from Scheduled → Document Review → On-site → Technical Review → Decision → Completed. 14 distinct status states, auditor assignment, and multi-company audit support." },
          { title: "Question & Answer System", description: "8 question types (Text, Number, Scale, Multiple Choice, Checkbox, Yes/No, Date, File Upload) with weighting, critical flags, auto-scoring, and auto-NC generation triggers." }
        ]
      },
      {
        clusterName: "Audit Ordering & Payments",
        features: [
          { title: "Audit Order System", description: "Multi-company orders, standard-template pairing, urgent audit handling with priority pricing, custom orders with company finder, per-company scheduling, and special instructions." },
          { title: "Regional Pricing", description: "10 pricing tiers (DACH, West EU, East EU, Turkey, China, India, SEA, USA, LATAM) with regional detection, overrides, and savings calculations vs traditional pricing." },
          { title: "Payment Processing", description: "Stripe integration with payment status workflow, 30-day reminders, 7-day payment window, auditor revenue tracking, payout management, and refund handling." }
        ]
      },
      {
        clusterName: "Report Generation & Versioning",
        features: [
          { title: "Multi-Version Reports", description: "Report versioning per audit with types: Initial Certification, Surveillance, Recertification, Follow-up, Special Investigation, Scope Extension, and Gap Analysis." },
          { title: "Report Content", description: "Compliance level calculation (High/Medium/Low/Critical), certification recommendations, section-level scoring, and auditor observations including positive findings, concerns, and recommendations." },
          { title: "Report Delivery", description: "PDF generation and storage, client acknowledgment tracking, shareable report links, and token-based access." }
        ]
      },
      {
        clusterName: "CAPA / Non-Conformance Management",
        features: [
          { title: "NC Creation & Tracking", description: "Three severity levels (Major, Minor, Observation), automatic NC from critical answers, AI-generated titles and descriptions, and evidence tracking with file uploads." },
          { title: "CAPA Workflow", description: "Root cause analysis, corrective and preventive action documentation, implementation date tracking, NC status workflow (Open → Under Review → Closed), and auditor review." },
          { title: "AI-Powered NC Detection", description: "Auto-generated NCs from template triggers (Major), AI-detected non-conformances (Minor), and AI-generated CAPA guidance." }
        ]
      },
      {
        clusterName: "Equipment Management",
        features: [
          { title: "Equipment Registry", description: "18+ equipment types, identification and serial numbers, technical specs including power, dimensions, materials processed, and capabilities." },
          { title: "Calibration Tracking", description: "Status monitoring, last/next calibration dates, calibration provider, and certificate documentation." },
          { title: "Equipment Analysis", description: "Condition assessment, maintenance scheduling and history, performance capabilities, AI analysis with confidence scores, ROI calculation, and documentation." }
        ]
      },
      {
        clusterName: "Connections & Communication",
        features: [
          { title: "Supplier Connections", description: "Connection requests (buyer or supplier initiated), status workflow (Pending → Accepted/Rejected/Blocked), relationship tracking, preferred supplier flags, and contract status." },
          { title: "Messaging System", description: "Direct buyer-supplier messaging with text, document, RFQ, and quote types. Threading, replies, attachments, read receipts, and archiving." },
          { title: "Bookmarks & Favorites", description: "Bookmark suppliers/buyers, organize into collections, and quick access lists." }
        ]
      },
      {
        clusterName: "Reviews & Ratings",
        features: [
          { title: "Supplier Reviews", description: "5-star rating system with detailed category ratings (Quality, Delivery, Communication, Value, Service), written comments, verified badges, and public/private options." },
          { title: "Rating Aggregation", description: "Average rating calculation, rating distribution analysis, and review count tracking." }
        ]
      },
      {
        clusterName: "Dashboards & Analytics",
        features: [
          { title: "Buyer Dashboard", description: "Active RFQs overview, recommended suppliers, recent activity feed, performance charts, and spending analytics." }
        ]
      },
      {
        clusterName: "Notifications System",
        features: [
          { title: "15+ Notification Types", description: "Search alerts, new supplier/buyer notifications, RFQ updates, messages, audit status, risk changes, market updates, connection requests, reviews, profile views, and payment reminders." },
          { title: "Delivery Options", description: "Real-time push and email notifications with frequency preferences (Real-time, Daily, Weekly, Monthly) and bulk actions (mark read, archive, delete)." }
        ]
      }
    ]
  },
  {
    id: "ai-audit-app",
    name: "AI Audit APP",
    headline: "AI Audit APP\nfeatures",
    link: "#",
    clusters: [
      {
        clusterName: "YVOO Atlas AI",
        highlighted: true,
        features: [
          { title: "Atlas Brain — Intelligent Knowledge Panel", description: "Auto-generated audit context per question with client-specific priorities, standard requirements in plain language, What to Check verification points, Best Practices, Common Issues, Evidence Checklist, and real-time Activity Log.", highlighted: true },
          { title: "Atlas Copilot — AI-Guided Assessment", description: "Conversational audit execution with step-by-step AI guidance, voice input (hands-free), smart evidence requests, automatic evidence analysis, equipment photo recognition, maturity level recommendations, auditor override, AI-generated findings, and minor NC detection.", highlighted: true },
          { title: "Cross-Audit Intelligence", description: "Pattern recognition from historical data, industry benchmarking, predictive insights, and continuous learning from feedback.", highlighted: true }
        ]
      },
      {
        clusterName: "Auditor Management",
        features: [
          { title: "Auditor Profiles", description: "Registration and verification workflow, certification tracking per standard, auditor levels (Internal, Auditor, Lead Auditor, Principal), years of experience, completed audits count, and specializations." },
          { title: "Auditor Verification", description: "Document verification (ID, passport, certificates), verification status (Pending → Approved/Rejected/Suspended), and admin notes with feedback." },
          { title: "Revenue & Payouts", description: "Revenue tracking per auditor, bank account and PayPal setup, payout management, and payment history." }
        ]
      },
      {
        clusterName: "Dashboards & Analytics",
        features: [
          { title: "Supplier Dashboard", description: "Connection overview, RFQ invitations, lead metrics, profile view tracking, and performance summary." },
          { title: "Auditor Dashboard", description: "Accepted audits, available audits, nearby audits map, revenue charts, and recent activity." },
          { title: "Client Dashboard", description: "Ordered audits, active RFQs, recommended suppliers, audit scoring displays, and spending analytics." }
        ]
      },
      {
        clusterName: "Security & Authentication",
        features: [
          { title: "Authentication", description: "JWT-based authentication, OAuth integration (Google, LinkedIn), session management, and password reset/recovery." },
          { title: "Multi-Factor Authentication", description: "MFA setup and management, QR code generation, and backup codes." },
          { title: "Access Control", description: "Role-based permissions, multi-tenant support, and token-based sharing." }
        ]
      },
      {
        clusterName: "Evidence Management",
        features: [
          { title: "Evidence Collection", description: "Multi-file upload, evidence linking to questions, audits, and NCs, file type/size validation, and evidence galleries." },
          { title: "Evidence Workflow", description: "Status tracking (Pending → Accepted/Rejected/Needs Clarification), AI evidence analysis, relevance scoring, and extracted data from documents and images." }
        ]
      },
      {
        clusterName: "Supplier QuickScan Assessment",
        features: [
          { title: "Quick Evaluation", description: "Rapid supplier assessment questionnaire with 25+ evaluation categories, supply potential assessment, and production ability evaluation." },
          { title: "AI-Assisted Completion", description: "AI auto-completion, progress tracking, and smart suggestions for faster assessments." },
          { title: "Scoring & Reports", description: "Maturity level scoring (Initial → Optimizing), category-specific scores, overall assessment, report generation, and key strengths/concerns." }
        ]
      },
      {
        clusterName: "File & Document Management",
        features: [
          { title: "File Storage", description: "Cloud storage (AWS S3), secure file upload/download, file type validation, and size limits." },
          { title: "Document Tracking", description: "Required documents checklist, document verification, and document linking to audits and evidence." }
        ]
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
    <div className="min-h-screen bg-white relative" data-nav-theme="light">
      <PageGridOverlay />
      <div className="relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-16 px-8">
        <HeroSquaresAnimation className="top-12 right-12 md:top-16 md:right-20 lg:top-20 lg:right-24" />
        <div className="mx-auto max-w-[1400px]">
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
      <section className="px-8 border-t border-foreground/10">
        <div className="mx-auto max-w-[1400px]">
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
        <section className="py-16 px-8">
          <div className="mx-auto max-w-[1400px]">
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

            {/* Features Grid - Standard or Clustered */}
            {'clusters' in currentCategory && currentCategory.clusters ? (
              <motion.div
                key={`clusters-${currentCategory.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-12"
              >
                {currentCategory.clusters.map((cluster, clusterIdx) => (
                  <div key={cluster.clusterName} className={(cluster as any).highlighted ? "bg-primary/5 p-8 border-l-4 border-l-primary" : ""}>
                    <h3 className={`font-mono font-semibold uppercase tracking-wide mb-6 border-b pb-3 ${
                      (cluster as any).highlighted
                        ? "text-xl text-primary border-primary/30"
                        : "text-lg text-primary border-primary/20"
                    }`}>
                      {cluster.clusterName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                      {cluster.features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.03 * index + clusterIdx * 0.05 }}
                          className={`py-6 pr-8 border-t border-foreground/10 ${
                            (feature as any).highlighted
                              ? "md:col-span-2 lg:col-span-3"
                              : ""
                          }`}
                        >
                          <h4 className={`font-semibold text-foreground mb-2 ${(feature as any).highlighted ? "text-xl" : "text-lg"}`}>{feature.title}</h4>
                          <p className={`text-foreground/60 leading-relaxed ${(feature as any).highlighted ? "text-base max-w-3xl" : "text-sm"}`}>{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
            <motion.div
              key={`grid-${currentCategory.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
            >
              {'features' in currentCategory && currentCategory.features?.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className={`py-8 pr-8 border-t border-foreground/10 ${
                    (feature as any).highlighted
                      ? "md:col-span-2 lg:col-span-3 bg-primary/5 pl-8 border-l-4 border-l-primary"
                      : ""
                  }`}
                >
                  <h3 className={`font-semibold text-foreground mb-3 ${
                    (feature as any).highlighted ? "text-2xl" : "text-xl"
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-foreground/60 leading-relaxed ${
                    (feature as any).highlighted ? "text-base max-w-3xl" : "text-sm"
                  }`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            )}

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
      <section className="py-16 px-8 bg-muted/30">
        <div className="mx-auto max-w-[1400px]">
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
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[1400px] text-center">
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
    </div>
  );
};

export default Features;
