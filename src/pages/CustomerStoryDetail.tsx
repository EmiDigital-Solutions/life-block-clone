import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import person images
import testimonialChristoph from "@/assets/testimonial-christoph-seeholzer.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";
import procurementFemaleMiddleEast from "@/assets/procurement-female-middle-east.jpg";

// Full customer story data
const customerStoriesData: Record<string, {
  id: string;
  companyLogo: string;
  companyName: string;
  industry: string;
  heroImage: string;
  personImage: string;
  personName: string;
  personRole: string;
  headline: string;
  subheadline: string;
  quote: string;
  challenge: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
  results: {
    stat: string;
    label: string;
  }[];
  useCases: {
    title: string;
    description: string;
  }[];
}> = {
  pepsico: {
    id: "pepsico",
    companyLogo: "PEPSICO",
    companyName: "PepsiCo",
    industry: "Food & Beverage",
    heroImage: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=1200&h=600&fit=crop",
    personImage: procurementMaleEuropean,
    personName: "Michael Chen",
    personRole: "VP Global Procurement, PepsiCo",
    headline: "PepsiCo runs sourcing with YVOO across 50 categories",
    subheadline: "How PepsiCo transformed their global supplier qualification process",
    quote: "YVOO has revolutionized how we manage supplier relationships across our global network. The speed and accuracy of audits has exceeded all expectations.",
    challenge: {
      title: "The Challenge",
      description: "Managing supplier quality across 50+ categories and 200+ countries with inconsistent audit processes.",
      points: [
        "Fragmented supplier data across multiple legacy systems",
        "Inconsistent audit quality from different regional teams",
        "Long qualification cycles delaying new product launches",
        "Limited visibility into supplier compliance status"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Implementing YVOO's unified platform for end-to-end supplier intelligence and audit management.",
      points: [
        "Centralized supplier database with real-time updates",
        "Standardized audit templates across all regions",
        "AI-powered risk scoring for proactive management",
        "Automated compliance tracking and alerting"
      ]
    },
    results: [
      { stat: "50+", label: "Categories managed" },
      { stat: "60%", label: "Faster qualification" },
      { stat: "35%", label: "Cost reduction" }
    ],
    useCases: [
      { title: "Ingredient Supplier Audits", description: "Standardized quality audits for raw material suppliers across global facilities." },
      { title: "Packaging Compliance", description: "Automated tracking of sustainability certifications for packaging suppliers." },
      { title: "Co-manufacturer Qualification", description: "Rapid onboarding of new manufacturing partners with structured assessments." }
    ]
  },
  swisslog: {
    id: "swisslog",
    companyLogo: "SWISSLOG",
    companyName: "Swisslog",
    industry: "Robotics & Automation",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    personImage: procurementFemaleAsian,
    personName: "Anna Müller",
    personRole: "Head of Supply Chain, Swisslog",
    headline: "Swisslog drives efficient, transparent sourcing with YVOO",
    subheadline: "Building supply chain resilience in the automation industry",
    quote: "The transparency YVOO provides into our supplier base has been transformative. We now make decisions based on real data, not assumptions.",
    challenge: {
      title: "The Challenge",
      description: "Ensuring component quality and supply continuity for precision robotics manufacturing.",
      points: [
        "Complex multi-tier supply chains with limited visibility",
        "High precision requirements demanding rigorous quality control",
        "Geopolitical risks affecting component availability",
        "Manual audit processes consuming valuable engineering time"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Deploying YVOO for intelligent supplier monitoring and automated audit orchestration.",
      points: [
        "Multi-tier supply chain mapping and monitoring",
        "AI-powered equipment recognition for capability verification",
        "Real-time risk alerts and mitigation recommendations",
        "Integrated audit scheduling with certified auditor network"
      ]
    },
    results: [
      { stat: "40%", label: "Audit time saved" },
      { stat: "3x", label: "Supplier visibility" },
      { stat: "25%", label: "Risk reduction" }
    ],
    useCases: [
      { title: "Precision Component Verification", description: "Automated capability assessments for high-tolerance component suppliers." },
      { title: "Supply Chain Risk Mapping", description: "Real-time monitoring of multi-tier supplier networks for early warning." },
      { title: "New Supplier Qualification", description: "Accelerated onboarding with standardized technical assessments." }
    ]
  },
  omv: {
    id: "omv",
    companyLogo: "OMV",
    companyName: "OMV",
    industry: "Energy & Chemicals",
    heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=600&fit=crop",
    personImage: procurementMaleAsian,
    personName: "Thomas Weber",
    personRole: "Director Procurement Excellence, OMV",
    headline: "OMV enhances sourcing decisions by combining YVOO with SAP",
    subheadline: "Integrating supplier intelligence with enterprise systems",
    quote: "The seamless integration between YVOO and our SAP landscape has eliminated data silos and given us a single source of truth for supplier quality.",
    challenge: {
      title: "The Challenge",
      description: "Bridging the gap between procurement systems and quality management in a complex ERP landscape.",
      points: [
        "Disconnected data between SAP modules and quality systems",
        "Manual data entry causing delays and errors",
        "Limited real-time visibility into supplier performance",
        "Compliance documentation scattered across systems"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Implementing YVOO with native SAP integration for unified supplier intelligence.",
      points: [
        "Bi-directional SAP S/4HANA integration",
        "Automated supplier master data synchronization",
        "Real-time quality metrics in procurement workflows",
        "Centralized compliance document management"
      ]
    },
    results: [
      { stat: "100%", label: "SAP integration" },
      { stat: "45%", label: "Process efficiency" },
      { stat: "Zero", label: "Data silos" }
    ],
    useCases: [
      { title: "ERP-Integrated Audits", description: "Audit results automatically synced to SAP supplier master records." },
      { title: "Automated Compliance Checks", description: "Real-time validation of supplier certifications against procurement rules." },
      { title: "Performance Analytics", description: "Unified dashboards combining procurement and quality KPIs." }
    ]
  },
  gordon: {
    id: "gordon",
    companyLogo: "GORDON",
    companyName: "Gordon Food Service",
    industry: "Food Distribution",
    heroImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=600&fit=crop",
    personImage: procurementFemaleEuropean,
    personName: "Sarah Johnson",
    personRole: "VP Quality Assurance, Gordon Food Service",
    headline: "Gordon Food Service accelerates sourcing with YVOO",
    subheadline: "Ensuring food safety across a vast supplier network",
    quote: "Food safety is non-negotiable. YVOO gives us the confidence that every supplier in our network meets our rigorous standards.",
    challenge: {
      title: "The Challenge",
      description: "Maintaining consistent food safety standards across thousands of suppliers.",
      points: [
        "Large supplier base with varying audit frequencies",
        "Regulatory compliance across multiple jurisdictions",
        "Seasonal supplier onboarding requiring rapid qualification",
        "Traceability requirements demanding detailed documentation"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Leveraging YVOO for comprehensive food safety audit management and supplier monitoring.",
      points: [
        "GFSI-aligned audit templates and scoring",
        "Automated audit scheduling based on risk profiles",
        "Real-time supplier certification tracking",
        "Integrated corrective action management"
      ]
    },
    results: [
      { stat: "2,000+", label: "Suppliers managed" },
      { stat: "50%", label: "Faster audits" },
      { stat: "99.9%", label: "Compliance rate" }
    ],
    useCases: [
      { title: "GFSI Compliance Audits", description: "Standardized food safety audits aligned with global certification schemes." },
      { title: "Seasonal Supplier Onboarding", description: "Rapid qualification of seasonal produce suppliers." },
      { title: "Recall Readiness", description: "Complete traceability documentation for swift incident response." }
    ]
  },
  stada: {
    id: "stada",
    companyLogo: "STADA",
    companyName: "STADA Arzneimittel",
    industry: "Pharmaceuticals",
    heroImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=600&fit=crop",
    personImage: procurementFemaleMiddleEast,
    personName: "Dr. Elena Schmidt",
    personRole: "Head of Supplier Quality, STADA",
    headline: "STADA turns days into seconds with YVOO's AI-driven audit analysis",
    subheadline: "Accelerating pharmaceutical supplier qualification",
    quote: "What used to take our team days of manual analysis now happens in seconds. YVOO's AI understands pharmaceutical quality requirements.",
    challenge: {
      title: "The Challenge",
      description: "Meeting stringent GMP requirements while accelerating supplier qualification timelines.",
      points: [
        "Complex GMP compliance documentation requirements",
        "Long qualification cycles impacting time-to-market",
        "Resource-intensive audit preparation and analysis",
        "Regulatory inspections requiring comprehensive audit trails"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Implementing YVOO's pharma-specific modules for GMP audit management.",
      points: [
        "GMP-compliant audit templates and workflows",
        "AI-powered document analysis and gap identification",
        "Automated CAPA tracking and verification",
        "21 CFR Part 11 compliant electronic signatures"
      ]
    },
    results: [
      { stat: "70%", label: "Time saved" },
      { stat: "100%", label: "GMP compliant" },
      { stat: "Zero", label: "Audit findings" }
    ],
    useCases: [
      { title: "API Supplier Qualification", description: "Comprehensive GMP audits for active pharmaceutical ingredient suppliers." },
      { title: "CMO Oversight", description: "Continuous monitoring of contract manufacturing organizations." },
      { title: "Regulatory Inspection Prep", description: "Instant access to complete audit history for regulatory inspections." }
    ]
  },
  coop: {
    id: "coop",
    companyLogo: "COOP",
    companyName: "Coop Switzerland",
    industry: "Retail",
    heroImage: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=600&fit=crop",
    personImage: testimonialChristoph,
    personName: "Marc Bauer",
    personRole: "Director Sustainability, Coop Switzerland",
    headline: "Coop transforms sourcing with YVOO to boost savings",
    subheadline: "Driving sustainable sourcing across retail operations",
    quote: "Sustainability isn't just a checkbox—it's core to our brand. YVOO helps us verify that every supplier shares our commitment.",
    challenge: {
      title: "The Challenge",
      description: "Verifying sustainability claims across a diverse supplier network.",
      points: [
        "Complex sustainability certification landscape",
        "Consumer demand for transparency and traceability",
        "Diverse supplier types from small farms to large manufacturers",
        "Need for consistent sustainability scoring methodology"
      ]
    },
    solution: {
      title: "The Solution",
      description: "Deploying YVOO for unified sustainability audit and certification management.",
      points: [
        "Multi-standard sustainability audit templates",
        "Automated certification expiry tracking",
        "Supplier sustainability scorecards",
        "Consumer-facing traceability integration"
      ]
    },
    results: [
      { stat: "85%", label: "Certified suppliers" },
      { stat: "30%", label: "Cost savings" },
      { stat: "100%", label: "Traceability" }
    ],
    useCases: [
      { title: "Organic Certification Audits", description: "Verification of organic farming practices and certifications." },
      { title: "Fair Trade Compliance", description: "Social audit programs ensuring ethical sourcing." },
      { title: "Carbon Footprint Tracking", description: "Supplier-level emissions data collection and verification." }
    ]
  }
};

const CustomerStoryDetail = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  
  const story = storyId ? customerStoriesData[storyId] : null;
  
  if (!story) {
    return (
      <div className="min-h-screen bg-white" data-nav-theme="light">
        <Navigation />
        <div className="pt-40 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Story not found</h1>
          <Link to="/customer-stories" className="text-primary hover:underline">
            ← Back to Customer Stories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get other stories for navigation
  const storyIds = Object.keys(customerStoriesData);
  const currentIndex = storyIds.indexOf(storyId || "");
  const prevStory = currentIndex > 0 ? customerStoriesData[storyIds[currentIndex - 1]] : null;
  const nextStory = currentIndex < storyIds.length - 1 ? customerStoriesData[storyIds[currentIndex + 1]] : null;

  return (
    <div className="min-h-screen bg-white" data-nav-theme="light">
      <Navigation />
      
      {/* Secondary Navigation Bar - With background for visibility */}
      <div className="fixed top-24 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-foreground/5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-10">
            <Link 
              to="/customer-stories"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="text-sm">Back to Customer Stories</span>
            </Link>
            
            {/* Story navigation */}
            <div className="flex items-center gap-3 text-sm">
              {prevStory && (
                <Link
                  to={`/customer-stories/${prevStory.id}`}
                  className="text-foreground/50 hover:text-foreground transition-colors"
                >
                  ← {prevStory.companyName}
                </Link>
              )}
              {prevStory && nextStory && (
                <span className="text-foreground/30">|</span>
              )}
              {nextStory && (
                <Link
                  to={`/customer-stories/${nextStory.id}`}
                  className="text-foreground/50 hover:text-foreground transition-colors"
                >
                  {nextStory.companyName} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section - Full bleed image with overlay */}
      <section className="relative min-h-[70vh] flex items-end pt-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={story.heroImage}
            alt={story.companyName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-16 pt-40">
          {/* Industry badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-xs font-medium text-white uppercase tracking-wider mb-4">
              {story.industry}
            </span>
          </motion.div>

          {/* Company Logo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/60 font-bold text-xl tracking-wider mb-4"
          >
            {story.companyLogo}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.1] max-w-4xl"
          >
            {story.headline}
          </motion.h1>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <Quote className="w-12 h-12 text-primary/30 mb-6" />
            <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed mb-8">
              "{story.quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src={story.personImage}
                alt={story.personName}
                className="w-16 h-16 object-cover grayscale"
              />
              <div className="text-left">
                <p className="font-semibold text-foreground">{story.personName}</p>
                <p className="text-muted-foreground text-sm">{story.personRole}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-xs font-medium uppercase tracking-wider">
                {story.challenge.title}
              </span>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {story.challenge.description}
              </p>
              <ul className="space-y-3">
                {story.challenge.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />
                    <span className="text-foreground/70">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-xs font-medium uppercase tracking-wider">
                {story.solution.title}
              </span>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {story.solution.description}
              </p>
              <ul className="space-y-3">
                {story.solution.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 bg-foreground text-white">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            Measurable Results
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {story.results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl sm:text-6xl font-bold text-primary mb-2">
                  {result.stat}
                </p>
                <p className="text-white/70">{result.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center"
          >
            Key Use Cases
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {story.useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-muted/30 p-6"
              >
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Success Stories Section */}
      <section className="py-20 px-6 border-t border-foreground/10">
        <div className="container mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-8"
          >
            More success stories
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storyIds
              .filter(id => id !== storyId)
              .slice(0, 3)
              .map((id, idx) => {
                const relatedStory = customerStoriesData[id];
                // Get industry image for each story
                const storyImages: Record<string, string> = {
                  pepsico: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=600&h=400&fit=crop",
                  swisslog: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
                  omv: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
                  gordon: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop",
                  stada: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
                  coop: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&fit=crop"
                };
                
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link to={`/customer-stories/${id}`} className="block group">
                      {/* Image with logo overlay */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 mb-4">
                        <img
                          src={storyImages[id] || relatedStory.heroImage}
                          alt={relatedStory.companyName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-2xl tracking-wider">
                            {relatedStory.companyLogo}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                        {relatedStory.headline}
                      </h3>
                      <p className="text-muted-foreground text-sm font-mono flex items-center gap-1 group-hover:text-foreground transition-colors">
                        Read more →
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA Section - Archlet style */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-8"
          >
            Ready to<br />
            change the way<br />
            you source?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 font-mono text-sm font-medium hover:bg-primary/90 transition-colors min-w-[200px]"
            >
              Request a demo
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerStoryDetail;
