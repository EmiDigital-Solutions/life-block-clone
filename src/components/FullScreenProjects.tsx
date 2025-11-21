import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HowItWorksSection } from "./HowItWorksSection";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import illustrationAiCopilot from "@/assets/illustration-ai-copilot.jpg";
import illustrationRiskScoring from "@/assets/illustration-risk-scoring.jpg";
import illustrationRealtimeAlerts from "@/assets/illustration-realtime-alerts.jpg";
import illustrationSupplierSearch from "@/assets/illustration-supplier-search.jpg";
import illustrationTripleSource from "@/assets/illustration-triple-source.jpg";
import illustrationSmartMatch from "@/assets/illustration-smart-match.jpg";
import illustrationOneClick from "@/assets/illustration-one-click.jpg";
import illustrationLiveTracking from "@/assets/illustration-live-tracking.jpg";
import illustrationErpSync from "@/assets/illustration-erp-sync.jpg";

const auditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific" },
  { image: auditorAfrican, location: "Africa", region: "Sub-Saharan" },
  { image: auditorLatin, location: "Americas", region: "North & South" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region" },
  { image: auditorSouthAsian, location: "South Asia", region: "Indian Subcontinent" },
];

const featurePhotos = {
  ai: [
    { image: illustrationAiCopilot, label: "AI Co-Pilot" },
    { image: illustrationRiskScoring, label: "Risk Scoring" },
    { image: illustrationRealtimeAlerts, label: "Real-Time Alerts" },
  ],
  supplier: [
    { image: illustrationSupplierSearch, label: "SearchPro+" },
    { image: illustrationTripleSource, label: "Triple Source" },
    { image: illustrationSmartMatch, label: "Smart Match" },
  ],
  workflow: [
    { image: illustrationOneClick, label: "One Click" },
    { image: illustrationLiveTracking, label: "Real-Time Tracking" },
    { image: illustrationErpSync, label: "ERP Sync" },
  ],
};

const projects = [
  {
    number: "01",
    title: "Global On-Demand Auditor Network",
    description: "Access 2,000+ certified auditors across 90+ countries. Same-day and next-day audits available with transparent fixed pricing from €700. Smart algorithms automatically match the optimal local auditor.",
    showAuditors: true,
  },
  {
    number: "02",
    title: "ScanPro+ AI Intelligence Platform",
    description: "AI co-pilot ensures consistent audit quality regardless of location. Predictive risk scoring, real-time compliance alerts, and computer vision for automated equipment verification.",
    featureType: "ai",
  },
  {
    number: "03",
    title: "Supplier Discovery & Intelligence",
    description: "SearchPro+ AI converts procurement requirements into qualified supplier lists in minutes. Triple-source architecture with explainable AI recommendations for complete transparency.",
    featureType: "supplier",
  },
  {
    number: "04",
    title: "Seamless Digital Workflow",
    description: "One-click audit requests with auto-dispatch to certified auditors. Real-time monitoring, instant comprehensive reports, and direct ERP integration for complete process automation.",
    featureType: "workflow",
  },
];

const FullScreenProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const visibleAuditors = isMobile ? auditors.slice(0, 3) : auditors;

  return (
    <div ref={containerRef} className="relative bg-white">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={index}
            data-nav-theme="light"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-gray-200 last:border-b-0"
          >
            <div className="container mx-auto max-w-7xl">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}
                >
                  <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-gray-600">
                      {project.number}
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                    {project.title}
                  </h2>

                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <button className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300">
                    Learn more
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Visual Content */}
                {project.showAuditors ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`relative ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {visibleAuditors.map((auditor) => (
                        <div 
                          key={auditor.location}
                          className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200"
                        >
                          <img
                            src={auditor.image}
                            alt={`Professional from ${auditor.location}`}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : project.featureType ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`relative ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {featurePhotos[project.featureType as keyof typeof featurePhotos].map((card) => (
                        <div 
                          key={card.label}
                          className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200"
                        >
                          <img
                            src={card.image}
                            alt={card.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {/* How It Works Section */}
      <HowItWorksSection />
    </div>
  );
};

export default FullScreenProjects;
