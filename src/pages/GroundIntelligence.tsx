import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PageGridOverlay from "@/components/PageGridOverlay";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Plus, Minus, Eye, BarChart3, TrendingUp, Users, MapPin, ClipboardCheck, Target, GitCompare, LineChart, Calendar, Shield, Search } from "lucide-react";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] rounded-lg overflow-hidden flex flex-col shadow-xl border border-gray-200">
    <div className="h-8 bg-white flex items-center px-3 border-b border-gray-200 flex-shrink-0">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[10px] text-gray-500 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Supplier Comparison Matrix Mockup
const SupplierComparisonMockup = () => {
  const [highlightedRow, setHighlightedRow] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedRow((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Parts GmbH", location: "DE", capacity: 94, quality: 97, delivery: 91, overall: 94, verified: true },
    { name: "TechMetal Industries", location: "PL", capacity: 78, quality: 85, delivery: 88, overall: 83, verified: true },
    { name: "Apex Components Ltd", location: "UK", capacity: 89, quality: 92, delivery: 82, overall: 87, verified: false },
    { name: "Global Fasteners Co", location: "IT", capacity: 91, quality: 88, delivery: 95, overall: 91, verified: true },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <WindowChrome title="Ground Intelligence — Supplier Comparison Matrix">
      <div className="h-full flex text-[10px] bg-[#f8f9fa]">
        <div className="w-14 bg-white border-r border-gray-100 p-2 flex flex-col gap-2">
          {[GitCompare, BarChart3, TrendingUp, Search].map((Icon, i) => (
            <div key={i} className={`p-2 rounded ${i === 0 ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
              <Icon className="w-4 h-4 mx-auto" />
            </div>
          ))}
        </div>
        
        <div className="flex-1 p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900 text-[11px]">Verified Supplier Comparison</span>
            <span className="text-[8px] text-primary font-medium px-2 py-0.5 rounded-full bg-primary/10">Based on on-site audits</span>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-6 px-3 py-2 bg-gray-50 border-b border-gray-100 font-medium text-gray-500 text-[8px]">
              <div className="col-span-2">Supplier</div>
              <div className="text-center">Capacity</div>
              <div className="text-center">Quality</div>
              <div className="text-center">Delivery</div>
              <div className="text-center">Overall</div>
            </div>
            {/* Rows */}
            {suppliers.map((s, i) => (
              <motion.div 
                key={i}
                className="grid grid-cols-6 px-3 py-2 items-center border-b border-gray-50 last:border-0"
                animate={{ backgroundColor: highlightedRow === i ? 'rgba(79, 195, 247, 0.06)' : 'transparent' }}
              >
                <div className="col-span-2 flex items-center gap-1.5">
                  {s.verified && <Shield className="w-3 h-3 text-primary flex-shrink-0" />}
                  <div>
                    <div className="font-medium text-gray-900 truncate">{s.name}</div>
                    <div className="text-[8px] text-gray-400">{s.location}</div>
                  </div>
                </div>
                {[s.capacity, s.quality, s.delivery, s.overall].map((score, j) => (
                  <div key={j} className="flex justify-center">
                    <motion.span 
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${getScoreColor(score)}`}
                      animate={highlightedRow === i ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 0.5, delay: j * 0.1 }}
                    >
                      {score}
                    </motion.span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Audit Trend Dashboard Mockup
const AuditTrendMockup = () => {
  const [activePoint, setActivePoint] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const trendData = [
    { quarter: "Q1'24", score: 72, audits: 2 },
    { quarter: "Q2'24", score: 78, audits: 1 },
    { quarter: "Q3'24", score: 81, audits: 3 },
    { quarter: "Q4'24", score: 85, audits: 2 },
    { quarter: "Q1'25", score: 89, audits: 2 },
    { quarter: "Q2'25", score: 92, audits: 1 },
  ];

  const topics = [
    { name: "Process Capability", trend: "+12%", status: "improving" },
    { name: "Capacity Utilization", trend: "+8%", status: "improving" },
    { name: "Quality Systems", trend: "+15%", status: "improving" },
    { name: "Delivery Reliability", trend: "−3%", status: "declining" },
  ];

  return (
    <WindowChrome title="Ground Intelligence — Audit Trend Analysis">
      <div className="h-full flex text-[10px] bg-[#f8f9fa]">
        <div className="w-14 bg-white border-r border-gray-100 p-2 flex flex-col gap-2">
          {[LineChart, Calendar, ClipboardCheck, Target].map((Icon, i) => (
            <div key={i} className={`p-2 rounded ${i === 0 ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
              <Icon className="w-4 h-4 mx-auto" />
            </div>
          ))}
        </div>

        <div className="flex-1 p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900 text-[11px]">Precision Parts GmbH</div>
              <div className="text-[8px] text-gray-400">18 months audit history · 11 on-site visits</div>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-[9px] font-medium">
              <TrendingUp className="w-3 h-3" /> +20pts
            </div>
          </div>

          {/* Mini chart */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3">
            <div className="flex items-end justify-between h-16 gap-1">
              {trendData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full rounded-t"
                    style={{ backgroundColor: activePoint === i ? 'hsl(199, 91%, 64%)' : '#e5e7eb' }}
                    animate={{ height: `${(d.score / 100) * 48}px` }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-[7px] text-gray-400">{d.quarter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topic breakdown */}
          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="px-3 py-1.5 border-b border-gray-100 font-semibold text-gray-900 text-[10px]">
              Topic Performance Trends
            </div>
            <div className="divide-y divide-gray-50">
              {topics.map((t, i) => (
                <div key={i} className="px-3 py-1.5 flex items-center justify-between">
                  <span className="text-gray-700">{t.name}</span>
                  <span className={`font-bold ${t.status === 'improving' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// On-Demand Verification Mockup
const OnDemandVerificationMockup = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Select topic", detail: "Capacity verification for CNC 5-axis", icon: Target },
    { label: "Assign auditor", detail: "Expert matched: 12yr automotive exp.", icon: Users },
    { label: "On-site visit", detail: "Scheduled: 3 business days", icon: MapPin },
    { label: "Verified report", detail: "Standardized score + evidence photos", icon: ClipboardCheck },
  ];

  return (
    <WindowChrome title="Ground Intelligence — On-Demand Verification">
      <div className="h-full flex text-[10px] bg-[#f8f9fa]">
        <div className="w-14 bg-white border-r border-gray-100 p-2 flex flex-col gap-2">
          {[Eye, Target, MapPin, ClipboardCheck].map((Icon, i) => (
            <div key={i} className={`p-2 rounded ${i === 0 ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-gray-50'}`}>
              <Icon className="w-4 h-4 mx-auto" />
            </div>
          ))}
        </div>

        <div className="flex-1 p-3 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900 text-[11px]">Verification Request</span>
            <span className="text-[8px] text-primary font-medium">New Request</span>
          </div>

          <div className="space-y-2">
            {steps.map((s, i) => {
              const isActive = step === i;
              const isDone = step > i;
              return (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg border border-gray-100 p-3 flex items-start gap-3"
                  animate={{
                    borderColor: isActive ? 'hsl(199, 91%, 64%)' : '#f3f4f6',
                    backgroundColor: isDone ? 'rgba(79, 195, 247, 0.04)' : 'white',
                  }}
                >
                  <motion.div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDone ? 'bg-primary text-white' : isActive ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-400'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : <s.icon className="w-3.5 h-3.5" />}
                  </motion.div>
                  <div>
                    <div className={`font-medium ${isDone || isActive ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</div>
                    <div className="text-[8px] text-gray-400 mt-0.5">{s.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};


const GroundIntelligence = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const pillars = [
    {
      icon: Eye,
      title: "Verify",
      subtitle: "On-demand expert evaluation",
      description: "Send qualified auditors to any supplier, anytime — to evaluate the specific topics you care about. No generic checklists. Real answers to your real questions.",
    },
    {
      icon: GitCompare,
      title: "Benchmark",
      subtitle: "Compare with standardized scores",
      description: "Compare suppliers objectively using standardized scores derived from real audit data. Not self-reported surveys — verified ground truth from on-site visits.",
    },
    {
      icon: TrendingUp,
      title: "Predict",
      subtitle: "Trend analysis from audit history",
      description: "Track how suppliers develop over time. Identify improvement trajectories or early warning signals based on historical audit results, not scraped news feeds.",
    },
  ];

  const differentiators = [
    { desk: "Supplier self-assessment", ground: "Independent on-site verification" },
    { desk: "News-feed risk alerts", ground: "Expert evaluation of specific topics" },
    { desk: "Outdated database info", ground: "Fresh data from recent auditor visits" },
    { desk: "Generic compliance badges", ground: "Standardized scores with evidence photos" },
    { desk: "One-size-fits-all reports", ground: "Custom topic deep-dives on your request" },
  ];

  const features = [
    {
      title: "On-demand verification visits",
      description: "Define what you need verified — capacity, process capability, quality systems, working conditions — and we dispatch a matched expert auditor within days. You receive a standardized, evidence-backed report.",
      mockup: <OnDemandVerificationMockup />
    },
    {
      title: "Supplier comparison matrix",
      description: "Compare your shortlisted suppliers side-by-side using scores that come from real on-site evaluations. Capacity, quality, delivery reliability — all verified by independent auditors, not algorithms.",
      mockup: <SupplierComparisonMockup />
    },
    {
      title: "Audit history & trend prediction",
      description: "Every audit builds your supplier intelligence over time. Track improvement trajectories, spot declining performance early, and make data-driven decisions backed by ground truth.",
      mockup: <AuditTrendMockup />
    }
  ];

  const faqCategories = [
    {
      id: "general",
      label: "General",
      faqs: [
        {
          question: "How is Ground Intelligence different from Prewave or other data providers?",
          answer: "Unlike data-scraping platforms that monitor news feeds and public records, Ground Intelligence is based on physical verification. We send expert auditors on-site to evaluate specific topics you define. The result is verified ground truth — not assumptions based on web data."
        },
        {
          question: "What topics can I request for verification?",
          answer: "Anything that matters for your sourcing decision: capacity verification, process capability (Cpk), quality management systems, machine park evaluation, working conditions, environmental compliance, logistics capabilities, and more. You define the scope."
        },
        {
          question: "How quickly can an auditor visit a supplier?",
          answer: "Typically within 3–5 business days. We have 850+ qualified auditors in 47 countries, so there's almost always a local expert available near your supplier."
        },
      ],
    },
    {
      id: "methodology",
      label: "Methodology",
      faqs: [
        {
          question: "How are the standardized scores calculated?",
          answer: "Scores are based on a proprietary evaluation framework applied consistently by all auditors. Each topic has defined criteria, evidence requirements, and scoring rubrics. This ensures comparability across suppliers, industries, and geographies."
        },
        {
          question: "What evidence do I receive with each report?",
          answer: "Every report includes standardized scores, written assessments, geo-tagged evidence photos, and auditor commentary. For process capability topics, you receive actual measurement data and Cpk values."
        },
        {
          question: "Can I track supplier development over time?",
          answer: "Yes. Each audit adds to a supplier's historical profile. You can visualize trends per topic, compare improvement trajectories across suppliers, and identify patterns that predict future performance."
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      faqs: [
        {
          question: "How much does a verification visit cost?",
          answer: "A standard single-topic verification starts at €700. Multi-topic deep-dives and comprehensive audits are priced based on scope and location. All pricing is transparent — no hidden fees."
        },
        {
          question: "Is there a subscription model?",
          answer: "Yes. For organizations that need regular supplier monitoring, we offer subscription plans with scheduled verification visits, continuous benchmark updates, and predictive analytics. Contact us for a tailored plan."
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
    <div className="min-h-screen bg-background relative">
      <PageGridOverlay />
      <div className="relative">
      <Navigation />
      
      {/* Hero Section */}
      <section
        data-nav-theme="light"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="hero"
      >
        <HeroSquaresAnimation className="top-24 right-8 md:top-28 md:right-20 lg:top-32 lg:right-24" />
        <div className="mx-auto max-w-[1400px] px-8">
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground mb-8"
          >
            Truth you can<br />
            send someone for
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Not scraped data. Not self-reported surveys. Verified intelligence from expert auditors who visit your suppliers on-site — evaluating exactly what you need to know.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" onClick={() => scrollToSection('cta')}>
              Request a demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* DIN annotation */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="1200" from={4} to={6} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionCutMarker section="A" from={0} to={5} />
      </div>

      {/* Three Pillars: Verify · Benchmark · Predict */}
      <section
        data-nav-theme="light"
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background border-t border-border"
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow mb-4"
          >
            The three pillars
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="section-headline text-foreground mb-16"
          >
            Intelligence built on<br />ground truth
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-sm font-medium text-primary tracking-wide">
                  {pillar.subtitle}
                </p>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Desk Research vs. Ground Truth */}
      <section
        data-nav-theme="light"
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-muted/30"
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow mb-4"
          >
            The difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="section-headline text-foreground mb-16"
          >
            Desk research vs.<br />on-site reality
          </motion.h2>

          <div className="bg-background border border-border overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-2 border-b border-border">
              <div className="px-6 lg:px-8 py-4 bg-muted/50">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Typical data providers</span>
              </div>
              <div className="px-6 lg:px-8 py-4 bg-primary/5">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">YVOO Ground Intelligence</span>
              </div>
            </div>
            {/* Table rows */}
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-2 border-b border-border last:border-0"
              >
                <div className="px-6 lg:px-8 py-5 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm lg:text-base">{d.desk}</span>
                </div>
                <div className="px-6 lg:px-8 py-5 flex items-center gap-3 bg-primary/[0.03]">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-foreground text-sm lg:text-base font-medium">{d.ground}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase - Three animated mockups */}
      <section
        data-nav-theme="light"
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="features"
      >
        <div className="mx-auto max-w-[1400px] px-8">
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
                className="overflow-hidden border border-border bg-background h-[400px] lg:h-[450px]"
              >
                {feature.mockup}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIN annotation */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="700" from={0} to={3} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <DimensionLine from="Desk" to="Ground" unit="" gridFrom={1} gridTo={5} />
      </div>

      {/* Results Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="results"
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              Verified results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { metric: "850+", label: "Expert auditors worldwide" },
              { metric: "47", label: "Countries covered" },
              { metric: "3 days", label: "Avg. time to on-site visit" },
              { metric: "€700", label: "Starting price per verification" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-3">
                  {item.metric}
                </div>
                <p className="text-muted-foreground text-base">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIN annotation */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="Ø 800" from={2} to={5} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <ToleranceNotation nominal="97.8" tolerance="0.5" unit="%" label="Verification Accuracy" gridColumn={3} />
      </div>

      {/* FAQ Section */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
        id="faq"
      >
        <div className="mx-auto max-w-[1400px] px-8">
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
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFaqCategory === category.id
                    ? "bg-foreground text-white"
                    : "bg-[#e5e5e5] text-foreground hover:bg-[#d5d5d5]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
            <div className="hidden lg:block lg:col-span-1" />
            <motion.div
              key={activeFaqCategory}
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
        </div>
      </section>

      {/* Related Products */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-muted/30"
      >
        <div className="mx-auto max-w-[1400px] px-8">
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
                <div className="overflow-hidden bg-[#ebebeb] hover:bg-[#e3e3e3] transition-all duration-300">
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

      {/* DIN annotation */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="950" from={3} to={6} />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionCutMarker section="B" from={2} to={6} />
      </div>

      {/* Final CTA */}
      <section 
        data-nav-theme="light" 
        className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background border-t border-border"
        id="cta"
      >
        <div className="mx-auto max-w-[1400px] px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-foreground">
              Stop guessing. Start verifying.
            </h2>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Ground Intelligence gives you verified supplier data from real on-site evaluations — not scraped feeds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Request a demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Contact sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default GroundIntelligence;
