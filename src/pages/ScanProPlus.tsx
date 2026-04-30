import { useRef, useState, useEffect } from "react";
import React from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import PageGridOverlay from "@/components/PageGridOverlay";
import PageSEO from "@/components/PageSEO";
import TechnicalAnnotation from "@/components/TechnicalAnnotation";
import DimensionLine from "@/components/DimensionLine";
import SectionCutMarker from "@/components/SectionCutMarker";
import ToleranceNotation from "@/components/ToleranceNotation";
import Navigation from "@/components/Navigation";
import ROICalculator from "@/components/ROICalculator";

import Earth3D from "@/components/Earth3D";
import BusinessImpactChart from "@/components/charts/BusinessImpactChart";
import ROITimelineChart from "@/components/charts/ROITimelineChart";
import TimeEfficiencyChart from "@/components/charts/TimeEfficiencyChart";
import InfiniteScrollingGallery from "@/components/InfiniteScrollingGallery";
import { ComplianceModal } from "@/components/ComplianceModal";
import { IndustryUseCaseModal, IndustryUseCase } from "@/components/IndustryUseCaseModal";
import HeroSquaresAnimation from "@/components/HeroSquaresAnimation";
import { EquipmentIntelligenceDemo } from "@/components/EquipmentIntelligenceDemo";
import ResponsiveDemoFrame from "@/components/ResponsiveDemoFrame";
import SampleAuditReportPreview from "@/components/scanpro/SampleAuditReportPreview";
import BrokenCompromiseSection from "@/components/scanpro/BrokenCompromiseSection";
import ThreeLayerPlatformSection from "@/components/scanpro/ThreeLayerPlatformSection";
import HeadlineKpiBand from "@/components/scanpro/HeadlineKpiBand";
import AuditDifferenceSection from "@/components/AuditDifferenceSection";
import AtlasAIProvenance from "@/components/scanpro/AtlasAIProvenance";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import OnboardingStepsSection from "@/components/scanpro/OnboardingStepsSection";
import { ArrowRight, Check, X, Play, Pause } from "lucide-react";
import industryFoodBwGreen from "@/assets/industry-food-bw-green.jpg";
import industryEnergyBwGreen from "@/assets/industry-energy-bw-green.jpg";
import industryAutomotiveBwGreen from "@/assets/industry-automotive-bw-green.jpg";
import industryRimacUserUpload from "@/assets/industry-rimac-user-upload.png";
import industryPharmaBwGreen from "@/assets/industry-pharma-bw-green.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import aiCopilot from "@/assets/ai-copilot-analysis.jpg";
import aiInspector from "@/assets/ai-inspector-tech.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import factoryHero from "@/assets/factory-hero-background.jpg";
import scanProHeroBackground from "@/assets/scanpro-hero-background.jpg";
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import aboutSustainability from "@/assets/about-sustainability.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorMapPin from "@/assets/auditor-map-pin.png";
import scanProHeroAuditor from "@/assets/scanpro-hero-auditor.png";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import worldMapGlobe from "@/assets/world-map-globe.png";
import dottedWorldMap from "@/assets/dotted-world-map.png";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAsianBwGreen from "@/assets/auditor-female-asian-bw-green.jpg";
import auditorLatinBwGreen from "@/assets/auditor-latin-bw-green.jpg";
import auditorFemaleEuropeanBwGreen from "@/assets/auditor-female-european-bw-green.jpg";
import auditorEuropeanBwGreen from "@/assets/auditor-european-bw-green.jpg";
import auditorMiddleEastBwGreen from "@/assets/auditor-middle-east-bw-green.jpg";
import auditorSouthAsianBwGreen from "@/assets/auditor-south-asian-bw-green.jpg";
import auditorAfricanBwGreen from "@/assets/auditor-african-bw-green.jpg";
import blueprintIndustrialGas from "@/assets/blueprint-industrial-gas.png";
import { useContentByType, getMediaPublicUrl } from "@/hooks/useContentQuery";
import { supabase } from "@/integrations/supabase/client";

// Compliance Standards Grid with Modal
const ComplianceStandardsGrid = () => {
  const [selectedStandard, setSelectedStandard] = useState<any>(null);

  const standards = [
    {
      name: "ISO 9001",
      iconName: "trophy",
      description: "Quality Management System",
      details:
        "ISO 9001 is the international standard for quality management systems (QMS). It helps organizations ensure they meet customer and regulatory requirements while continuously improving processes and efficiency.",
      whyItMatters:
        "For procurement teams, ISO 9001 is the baseline proof that a supplier can run stable, repeatable processes and deliver consistent quality at scale.",
      services: [
        "On-site and remote ISO 9001 supplier audits",
        "Gap analysis against your internal quality requirements",
        "Verification of process documentation and KPIs",
        "Follow-up audits to confirm corrective actions",
      ],
      benefits: [
        {
          iconName: "checkbox-on",
          title: "Lower quality risk",
          description: "Reduce defects and rework by validating core quality controls before awarding business.",
        },
        {
          iconName: "analytics",
          title: "Comparable suppliers",
          description: "Standardized reports make it easy to compare suppliers across regions and categories.",
        },
        {
          iconName: "clock",
          title: "Faster approvals",
          description: "Shorten onboarding cycles with clear, audit-ready evidence for your stakeholders.",
        },
      ],
    },
    {
      name: "IATF 16949",
      iconName: "car",
      description: "Automotive Quality Standard",
      details:
        "IATF 16949 defines quality management system requirements for the automotive industry. It emphasizes defect prevention, reduction of variation and waste in the supply chain, and continuous improvement.",
      whyItMatters:
        "For automotive buyers, IATF 16949 is a non-negotiable requirement when qualifying critical component suppliers.",
      services: [
        "IATF 16949 readiness and surveillance audits",
        "Process walk-throughs on production lines and logistics",
        "Verification of control plans, PFMEAs and traceability",
        "Audits of tier‑2 and tier‑3 sub-suppliers where needed",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "OEM-ready evidence",
          description: "Provide audit documentation that satisfies OEM quality and launch teams.",
        },
        {
          iconName: "zap",
          title: "Issue detection early",
          description: "Identify systemic risks before SOP and avoid line-stops or recalls.",
        },
        {
          iconName: "factory",
          title: "Global coverage",
          description: "Verify automotive suppliers in established and emerging markets with one playbook.",
        },
      ],
    },
    {
      name: "AS9100",
      iconName: "plane",
      description: "Aerospace Quality Standard",
      details:
        "AS9100 is the quality management standard specifically written for the aerospace industry. It ensures high reliability, safety, and quality in aviation, space, and defense manufacturing.",
      whyItMatters:
        "Aerospace programs depend on extremely low failure rates; AS9100 audits provide confidence in suppliers handling critical components.",
      services: [
        "On-site AS9100 supplier and sub-tier audits",
        "Assessment of special processes and qualification records",
        "Review of configuration, change and document control",
        "Follow-up audits to track closure of major findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Safety assurance",
          description: "Strengthen safety cases with independent verification of supplier controls.",
        },
        {
          iconName: "target",
          title: "Program stability",
          description: "Reduce risk of delivery or quality disruption on long-running aerospace programs.",
        },
        {
          iconName: "globe",
          title: "Global sourcing",
          description: "Confidently source aerospace parts from new geographies with consistent audits.",
        },
      ],
    },
    {
      name: "ISO 14001",
      iconName: "leaf",
      description: "Environmental Management",
      details:
        "ISO 14001 provides a framework for environmental management systems. It helps organizations minimize their environmental impact, comply with regulations, and achieve sustainability goals.",
      whyItMatters:
        "Sustainability targets increasingly flow into supplier contracts; ISO 14001 audits show how suppliers manage emissions, waste and compliance.",
      services: [
        "Verification of environmental management systems on-site",
        "Assessment of waste, emissions and energy controls",
        "Review of legal compliance and reporting obligations",
        "ESG-focused supplier risk assessments",
      ],
      benefits: [
        {
          iconName: "leaf",
          title: "ESG alignment",
          description: "Connect supplier selection with your corporate sustainability and ESG goals.",
        },
        {
          iconName: "shield",
          title: "Regulatory confidence",
          description: "Reduce the risk of non-compliance fines through independent checks.",
        },
        {
          iconName: "analytics",
          title: "Comparable metrics",
          description: "Standardized findings make it easier to benchmark suppliers on sustainability.",
        },
      ],
    },
    {
      name: "GMP",
      iconName: "heart",
      description: "Good Manufacturing Practice",
      details:
        "GMP ensures products are consistently produced and controlled according to quality standards. It is critical for pharmaceutical, food, and medical device industries to ensure product safety and efficacy.",
      whyItMatters:
        "For regulated industries, GMP failures can immediately translate into patient, consumer and brand risk.",
      services: [
        "On-site GMP compliance audits for pharma, biotech and food",
        "Review of batch records, validations and cleanroom controls",
        "Verification of training records and SOP adherence",
        "Audit support before authority or customer inspections",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Patient safety",
          description: "Validate that critical controls work in practice, not just on paper.",
        },
        {
          iconName: "file",
          title: "Audit-ready files",
          description: "Generate structured documentation for regulatory and customer audits.",
        },
        {
          iconName: "clock",
          title: "Faster approvals",
          description: "Support faster tech transfers and supplier changes with clear evidence.",
        },
      ],
    },
    {
      name: "API Q1",
      iconName: "building",
      description: "Petroleum Quality Standard",
      details:
        "API Q1 is a quality management system specification for manufacturing organizations in the petroleum and natural gas industry, ensuring product integrity and safety throughout the supply chain.",
      whyItMatters:
        "Energy and oil and gas projects depend on reliable equipment; API Q1 audits help avoid critical failures in the field.",
      services: [
        "Supplier qualification audits for API Q1 facilities",
        "Verification of material traceability and welding procedures",
        "Review of design, testing and calibration controls",
        "Re-audits focused on closure of high-risk findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Field reliability",
          description: "Reduce unplanned downtime and HSE incidents on critical projects.",
        },
        {
          iconName: "globe",
          title: "Global qualification",
          description: "Qualify suppliers in key oil and gas hubs using one consistent standard.",
        },
        {
          iconName: "analytics",
          title: "Supplier rankings",
          description: "Compare manufacturers with clear, objective scoring frameworks.",
        },
      ],
    },
    {
      name: "SQF",
      iconName: "cutlery",
      description: "Safe Quality Food",
      details:
        "SQF (Safe Quality Food) is a rigorous food safety and quality management certification recognized by retailers and foodservice providers worldwide.",
      whyItMatters:
        "Food retailers and restaurants require SQF certification to list products; audits protect against recalls, contamination and supply disruption.",
      services: [
        "SQF readiness assessments and certification audits",
        "HACCP plan review and on-site verification",
        "Food safety culture evaluations",
        "Post-audit corrective action support",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Brand protection",
          description: "Reduce recall risk and demonstrate due diligence to customers.",
        },
        {
          iconName: "target",
          title: "Retailer acceptance",
          description: "Meet stringent listing requirements for major grocery and foodservice buyers.",
        },
        {
          iconName: "analytics",
          title: "Supply chain visibility",
          description: "Monitor ingredient and co-packer quality across multiple sites.",
        },
      ],
    },
    {
      name: "VDA 6.3",
      iconName: "car",
      description: "Process Audit Standard",
      details:
        "VDA 6.3 is a process audit standard developed by the German Association of the Automotive Industry (VDA) to evaluate the maturity and effectiveness of production processes in automotive supply chains.",
      whyItMatters:
        "German OEMs and tier‑1s require VDA 6.3 scores before awarding new business; strong results accelerate nominations and SOPs.",
      services: [
        "Full VDA 6.3 process audits with scoring",
        "Pre-audit gap analysis and improvement planning",
        "Verification of corrective actions from previous audits",
        "Training on VDA 6.3 requirements for supplier teams",
      ],
      benefits: [
        {
          iconName: "target",
          title: "OEM nomination",
          description: "Improve VDA scores to meet thresholds for new project awards.",
        },
        {
          iconName: "analytics",
          title: "Benchmark comparison",
          description: "Compare process maturity across plants and suppliers objectively.",
        },
        {
          iconName: "zap",
          title: "Continuous improvement",
          description: "Use structured findings to drive focused process optimization.",
        },
      ],
    },
    {
      name: "TS16949",
      iconName: "car",
      description: "Technical Specification",
      details:
        "TS16949 was the predecessor to IATF 16949 and remains referenced in legacy contracts. It established core automotive quality system requirements still relevant during transitions.",
      whyItMatters:
        "Older contracts and some markets still reference TS16949; audits clarify how legacy requirements map to current standards.",
      services: [
        "Legacy TS16949 verification and transition support",
        "Comparison audits mapping TS16949 to IATF 16949",
        "Documentation reviews for contract compliance",
        "Supplier development plans for standard upgrades",
      ],
      benefits: [
        {
          iconName: "file",
          title: "Contract clarity",
          description: "Clarify how historic TS16949 approvals map to current standards.",
        },
        {
          iconName: "analytics",
          title: "Portfolio harmonization",
          description: "Unify expectations across plants, regions and legacy contracts.",
        },
        {
          iconName: "shield",
          title: "Reduced ambiguity",
          description: "Avoid misunderstandings between OEM, tier‑1 and suppliers.",
        },
      ],
    },
    {
      name: "GDPR",
      iconName: "lock",
      description: "Data Protection Regulation",
      details:
        "GDPR is the EU data protection law that ensures personal data privacy and security. It mandates strict requirements for data collection, processing and storage.",
      whyItMatters:
        "Procurement increasingly works with SaaS and data processors; GDPR compliance is essential to avoid fines and reputational damage.",
      services: [
        "Vendor GDPR due diligence and documentation review",
        "Verification of technical and organizational measures (TOMs)",
        "Assessment of data processing agreements and sub-processors",
        "Follow-up reviews after major platform or scope changes",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Lower legal risk",
          description: "Independent verification reduces exposure to regulatory findings.",
        },
        {
          iconName: "lock",
          title: "Data trust",
          description: "Ensure critical supplier platforms handle customer and employee data correctly.",
        },
        {
          iconName: "analytics",
          title: "Clear accountability",
          description: "Document who is responsible for which part of the data flow.",
        },
      ],
    },
    {
      name: "SOC 2",
      iconName: "shield",
      description: "Security & Compliance",
      details:
        "SOC 2 is an auditing standard for service organizations that store customer data in the cloud. It ensures proper security, availability, processing integrity, confidentiality and privacy controls.",
      whyItMatters:
        "When you outsource critical processes to SaaS or managed services, SOC 2 reports give insight into how they manage risk.",
      services: [
        "Supplier SOC 2 report reviews and interpretation",
        "On-site or remote validation of key controls where needed",
        "Mapping SOC 2 findings to your internal risk framework",
        "Continuous monitoring plans for high-impact vendors",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Security assurance",
          description: "Validate that cloud and IT suppliers protect your data appropriately.",
        },
        {
          iconName: "analytics",
          title: "Actionable insight",
          description: "Translate technical reports into clear procurement recommendations.",
        },
        {
          iconName: "clock",
          title: "Faster sign-offs",
          description: "Give risk and IT stakeholders the evidence they need more quickly.",
        },
      ],
    },
    {
      name: "FDA",
      iconName: "building",
      description: "FDA Compliance",
      details:
        "FDA compliance ensures products meet US Food and Drug Administration regulations for safety, efficacy and quality. It is critical for pharmaceutical, medical device and food industries.",
      whyItMatters:
        "Selling into the US market requires confidence that suppliers can pass FDA inspections and maintain compliant operations.",
      services: [
        "Pre-FDA inspection readiness audits for suppliers",
        "Verification of quality systems, validation and documentation",
        "Review of change control, complaints and CAPA processes",
        "Follow-up audits after warning letters or major findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Market access",
          description: "Support safe entry or expansion in highly regulated US markets.",
        },
        {
          iconName: "file",
          title: "Inspection files",
          description: "Create structured, re-usable evidence packs for authorities and customers.",
        },
        {
          iconName: "clock",
          title: "Reduced disruption",
          description: "Limit operational impact when issues are identified and corrected early.",
        },
      ],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {standards.map((standard, idx) => {
          return (
            <motion.button
              key={standard.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedStandard(standard)}
              className="group bg-[#ebebeb] p-6 hover:bg-[#e3e3e3] transition-colors duration-300 cursor-pointer w-full text-left"
            >
              {/* Standard name */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {standard.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {standard.description}
              </p>

              {/* Click indicator */}
              <div className="text-xs font-medium text-primary flex items-center gap-1">
                Learn more
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Modal */}
      <ComplianceModal 
        standard={selectedStandard} 
        onClose={() => setSelectedStandard(null)} 
      />
    </>
  );
};

// Parallax Image Component
const ParallaxImage = ({ 
  src, 
  alt, 
  parallaxStrength = 20 
}: { 
  src: string; 
  alt: string; 
  parallaxStrength?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img 
        src={src} 
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Industry Showcase Card - VanMoof Product Style
const IndustryShowcaseCard = ({ 
  useCase, 
  onClick,
  badge,
  isLarge = false,
  delay = 0
}: { 
  useCase: IndustryUseCase;
  onClick: () => void;
  badge: string;
  isLarge?: boolean;
  delay?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <div 
      ref={containerRef}
      className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        onClick={onClick}
        className="group relative overflow-hidden cursor-pointer w-full h-full"
      >
        {/* Full-bleed image container */}
        <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-[4/3]'}`}>
          {/* Full-bleed image with parallax */}
          <motion.img 
            src={useCase.image} 
            alt={useCase.title}
            style={{ y, scale }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
            {/* Badge */}
            <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
              {badge}
            </span>
            
            <h3 className={`font-bold text-white mb-1.5 leading-tight ${isLarge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
              {useCase.title.split(':')[1]?.trim() || useCase.title}
            </h3>
            
            <p className={`text-white/70 line-clamp-2 mb-3 ${isLarge ? 'text-sm' : 'text-xs'}`}>
              {useCase.useCase}
            </p>
            
            <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
              <span className="text-xs font-medium">View details</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

// Industry Use Cases Grid with Modal - VanMoof Product Showcase Style
const IndustryUseCasesGrid = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<IndustryUseCase | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const useCases: IndustryUseCase[] = [
    {
      image: industryRimacUserUpload,
      title: "Rimac Technology — HV Battery, e-Axle, Power Electronics & Infotainment Audit (IATF 16949 + ISO 26262 + ASPICE)",
      useCase: "Qualify a Croatian Tier-1 supplier feeding Rimac Technology's full B2B portfolio — high-voltage battery systems, e-axles, inverters, power electronics and connected infotainment software — across Porsche, Hyundai-Kia, Bugatti Rimac and Automobili Pininfarina EV programs.",
      solutions: [
        "IATF 16949 + ISO 26262 (ASIL-D) functional safety audit across hardware and software development at Sveta Nedelja",
        "800 V battery system PPAP, cell traceability and thermal-runaway witness (UN ECE R100.02 / GB 38031)",
        "e-axle, inverter and DC/DC EMC + HV insulation testing per ISO 21498, LV 123/124 and CISPR 25",
        "Automotive SPICE (ASPICE) L2 software process assessment for infotainment and vehicle control units",
        "VDA 6.3 P5–P7 process scoring with evidence dossier accepted by Porsche, Hyundai-Kia and Bugatti SQA"
      ],
      result: "Result: Rimac-grade Tier-1 supplier qualified in 5 days with combined ASIL-D, ASPICE L2 and IATF 16949 dossier — buyer skipped a 14-week traditional OEM onboarding."
    },
    {
      image: industryEnergyBwGreen,
      title: "KONČAR Group — HV Power Transformers & Grid Equipment FAT Witness (IEC 60076 / IEEE)",
      useCase: "Witness Factory Acceptance Test of a 400 kV power transformer at KONČAR D&ST Zagreb for a German TSO grid-modernisation project.",
      solutions: [
        "IEC 60076 routine + type tests: lightning impulse, partial discharge (<10 pC), temperature rise",
        "Active-part inspection — CRGO core stacking, winding insulation, oil quality (IEC 60296)",
        "ISO 9001 + ISO 14001 + ISO 45001 plant-wide QMS review across KONČAR Power Plant Engineering",
        "FAT report packaged for 50Hertz, TenneT, Amprion and Terna grid operator acceptance"
      ],
      result: "Result: KONČAR HV transformer accepted on first FAT, full IEC 60076 dossier delivered — €4.2M asset shipped 6 weeks ahead of schedule."
    },
    {
      image: industryFoodBwGreen,
      title: "Podravka & Kraš — Food Safety & Export Audit (FSSC 22000 / IFS Food / BRCGS)",
      useCase: "Qualify a Croatian food-processing supplier delivering private-label products (Vegeta-style seasonings, confectionery, ready meals) to Lidl, REWE, Kaufland and Carrefour across the EU.",
      solutions: [
        "FSSC 22000 v6 + IFS Food v8 + BRCGS Issue 9 unannounced site audit at Podravka Koprivnica / Kraš Zagreb",
        "HACCP plan verification, allergen management and metal-detection / X-ray CCP validation",
        "EU Regulation 1169/2011 labelling, halal / kosher and organic (EU 2018/848) scheme conformity",
        "Microbiological lab competency review (ISO/IEC 17025) with traceability mock-recall in <2 hours"
      ],
      result: "Result: Croatian food producer cleared for EU private-label supply in 6 days — buyer onboarded with full FSSC 22000 + IFS dossier and zero major NCs."
    },
    {
      image: industryPharmaBwGreen,
      title: "Pliva & JGL — Pharmaceutical GMP Audit (EU GMP Annex 1 / ICH Q7 / ISO 13485)",
      useCase: "Pre-qualification of a Croatian API and finished-dose manufacturer (Pliva Zagreb / JGL Rijeka) supplying generics and sterile injectables to Teva, Sandoz and EU hospital tenders.",
      solutions: [
        "EU GMP Part I + Annex 1 (2022) sterile manufacturing audit — cleanroom Grade A/B, CCS review",
        "ICH Q7 API audit, data-integrity (ALCOA+) and computerised-system validation per Annex 11",
        "HALMED / EMA inspection-readiness gap assessment with CAPA tracking to PIC/S standards",
        "Serialisation & FMD (EU 2016/161) verification, cold-chain GDP audit per EU 2013/C 343/01"
      ],
      result: "Result: Croatian pharma site pre-qualified for EU tender supply in 8 days — full GMP + Annex 1 evidence pack accepted by Teva and Sandoz QA without re-audit."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      data-nav-theme="light" 
      className="py-24 md:py-32 bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — standard project headline pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="section-eyebrow">Projects</span>
          </div>
          <h2 className="section-headline text-foreground max-w-3xl">
            CEIP Croatian high-tech use cases
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            How CEIP buyers qualify Croatia's flagship manufacturers — Rimac Technology EV systems, KONČAR HV transformers, Podravka & Kraš food processing, and Pliva & JGL pharmaceuticals — across automotive, energy, food safety and GMP-regulated supply.
          </p>
        </motion.div>

        {/* VanMoof-style Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-[1400px] mx-auto">
          {/* Large card - Rail & Rolling Stock */}
          <IndustryShowcaseCard
            useCase={useCases[0]}
            onClick={() => setSelectedUseCase(useCases[0])}
            badge="EV Powertrain & Battery"
            isLarge={true}
            delay={0}
          />

          {/* Top right - HV Grid Equipment */}
          <IndustryShowcaseCard
            useCase={useCases[1]}
            onClick={() => setSelectedUseCase(useCases[1])}
            badge="HV Grid Equipment"
            delay={0.1}
          />

          {/* Bottom right - Food & Beverage */}
          <IndustryShowcaseCard
            useCase={useCases[2]}
            onClick={() => setSelectedUseCase(useCases[2])}
            badge="Food & Beverage"
            delay={0.2}
          />
        </div>

        {/* Full width bottom card - Heavy Steel Fabrication & EPC */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => setSelectedUseCase(useCases[3])}
          className="group relative w-full overflow-hidden cursor-pointer mt-4 md:mt-6 max-w-[1400px] mx-auto"
        >
          {/* Full-bleed image container */}
          <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
            {/* Full-bleed image */}
            <img
              src={useCases[3].image}
              alt={useCases[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-center p-6 md:p-10 lg:p-12 max-w-xl z-10">
              {/* Badge */}
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3 w-fit">
                Pharmaceutical & Life Sciences
              </span>

              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                EU GMP Annex 1 & ICH Q7 Audits — Pliva, JGL
              </h3>
              
              <p className="text-white/70 text-sm md:text-base line-clamp-2 hidden md:block">
                {useCases[3].useCase}
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-white/80 group-hover:text-white transition-colors">
                <span className="text-sm font-medium">Explore use case</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Modal */}
      <IndustryUseCaseModal 
        useCase={selectedUseCase} 
        onClose={() => setSelectedUseCase(null)} 
      />
    </section>
  );
};

// Challenge Toggle Section
const ChallengeToggleSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  // Auto-switch every 5 seconds
  useEffect(() => {
    if (!isAutoSwitching) return;
    
    const interval = setInterval(() => {
      setIsWithScanPro(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const withScanProContent = [
    {
      icon: "checkbox-on",
      title: "Predictable, scoped pricing",
      description: "Finance approves immediately. No surprises."
    },
    {
      icon: "zap",
      title: "Auditor on-site in 48 hours",
      description: "Supplier issues do not wait — and you should not wait either."
    },
    {
      icon: "calendar",
      title: "1–3 day structured audit",
      description: "Minimal disruption for your team and supplier."
    },
    {
      icon: "analytics",
      title: "Report in 24 hours, not weeks",
      description: "Make decisions while the context is still clear."
    },
    {
      icon: "checkbox-on",
      title: "Every audit, same standard",
      description: "AI ensures consistency your QM team can rely on."
    },
    {
      icon: "camera",
      title: "AI equipment intelligence",
      description: "Machine conditions documented automatically."
    },
  ];

  const traditionalContent = [
    {
      icon: "coin",
      title: "Opaque, escalating audit cost",
      description: "Budget discussions, travel expenses, hotel costs."
    },
    {
      icon: "clock",
      title: "2–3 weeks just to start",
      description: "Your quality engineer is not available."
    },
    {
      icon: "close",
      title: "3–5 days on-site",
      description: "Your engineer is away from their actual work."
    },
    {
      icon: "alert",
      title: "Report delayed — maybe 10 days",
      description: "By then, the details are forgotten."
    },
    {
      icon: "close",
      title: "Quality depends on who is sent",
      description: "Junior auditor today, expert tomorrow."
    },
    {
      icon: "alert",
      title: "Photos missing",
      description: "Documentation gaps that cause problems later."
    },
  ];

  const currentContent = isWithScanPro ? withScanProContent : traditionalContent;

  return (
    <section 
      data-nav-theme="light"
      className="pt-24 pb-12 md:pt-32 md:pb-16 bg-background"
      id="challenge"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isWithScanPro ? 'With' : 'The Old'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'ScanPro+' : 'Way'}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsAutoSwitching(false); setIsWithScanPro(!isWithScanPro); }}
              className={`relative w-16 h-8 transition-colors duration-300 ${isWithScanPro ? 'bg-primary' : 'bg-destructive'}`}
              aria-label="Toggle comparison"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-7 h-7 bg-background"
                animate={{ x: isWithScanPro ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <button
              onClick={() => setIsAutoSwitching(!isAutoSwitching)}
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                isAutoSwitching ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={isAutoSwitching ? 'Pause auto-switch' : 'Resume auto-switch'}
            >
              {isAutoSwitching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {isWithScanPro 
            ? "What procurement directors, quality managers, and CFOs experience when they switch."
            : "The hidden cost of 'we have always done it this way.'"}
        </p>

        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-muted p-10 hover:bg-muted/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const fallbackAuditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe", gradient: "from-gray-700 via-gray-800 to-gray-900", gender: "male" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific", gradient: "from-accent via-secondary to-secondary", gender: "male" },
  { image: auditorLatin, location: "Americas", region: "North & South", gradient: "from-gray-700 via-gray-800 to-gray-900", gender: "male" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region", gradient: "from-accent via-secondary to-secondary", gender: "male" },
  { image: auditorFemaleEuropean, location: "Europe", region: "Western Europe", gradient: "from-gray-800 via-gray-900 to-black", gender: "female" },
  { image: auditorFemaleAsian, location: "Asia", region: "Southeast Asia", gradient: "from-gray-800 via-gray-900 to-black", gender: "female" },
];

// How ScanPro+ Works Carousel - Card Design with Original Visuals
const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      number: "01",
      title: "One click. Audit requested.",
      description: "Your procurement team submits through the platform or ERP integration. No RFQs, no vendor negotiations, no calendar coordination.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          {/* 3D Earth */}
          <div className="relative w-full max-w-[180px] sm:max-w-[350px] md:max-w-[450px] h-[140px] sm:h-[280px] md:h-[360px]">
            <Earth3D width="100%" height="100%" showPins={false} />
            
            {/* Green Location Marker */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute"
              style={{ top: '30%', left: '70%' }}
            >
              <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
              <div className="absolute inset-0 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-primary animate-ping opacity-40" />
            </motion.div>
            
            {/* 1-Click Button */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute"
              style={{ top: '32%', left: '73%' }}
            >
              <div className="bg-primary text-primary-foreground px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full flex items-center gap-1 sm:gap-2 shadow-xl">
                <span className="font-semibold text-[10px] sm:text-sm md:text-base lg:text-lg whitespace-nowrap">1-Click</span>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      number: "02",
      title: "Local expert assigned instantly",
      description: "Our AI matches a certified auditor near your supplier — no travel costs, no jet lag, no delays. They know the language and the local context.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          <div className="relative w-full max-w-[180px] sm:max-w-[350px] md:max-w-[450px] h-[140px] sm:h-[280px] md:h-[360px]">
            <Earth3D width="100%" height="100%" showPins={true} />
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Watch progress live",
      description: "Your quality manager sees real-time updates. Chat directly with the auditor. See exactly what is happening without being there.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          {/* Chat Interface */}
          <div className="bg-[#ebebeb] p-4 sm:p-6 md:p-8 w-full max-w-[200px] sm:max-w-[320px] md:max-w-[380px] h-[200px] sm:h-[320px] md:h-[400px] relative z-10 flex flex-col justify-center gap-4">
            {/* User Message */}
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-xs sm:text-sm font-bold">You</span>
              </div>
              <div className="bg-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 flex-1">
                <p className="text-xs sm:text-sm font-bold mb-2">You</p>
                <div className="space-y-2">
                  <motion.div 
                    animate={{ width: ["0%", "80%", "80%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                  <motion.div 
                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1], delay: 0.2 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Auditor Message */}
            <div className="flex items-start gap-2 sm:gap-3 justify-end">
              <div className="bg-primary/80 text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 flex-1">
                <p className="text-xs sm:text-sm font-bold mb-2">Auditor</p>
                <div className="space-y-2">
                  <motion.div 
                    animate={{ width: ["0%", "90%", "90%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.5 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                  <motion.div 
                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1], delay: 0.7 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/60 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-xs sm:text-sm font-bold">A</span>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Check className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/60 flex items-center justify-center"
              >
                <span className="text-primary-foreground font-bold">💬</span>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "04",
      title: "Report in your inbox. Next day.",
      description: "AI-structured report with photos, findings, and action items — ready for your QM system. No more waiting weeks for documentation.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          <div className="bg-[#ebebeb] p-4 sm:p-6 md:p-8 w-full max-w-[200px] sm:max-w-[320px] md:max-w-[380px] h-[200px] sm:h-[320px] md:h-[400px] flex flex-col justify-center gap-3">
            {/* Report Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center justify-center">
                  <span className="text-primary text-2xl sm:text-4xl">📊</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-10 h-10 sm:w-14 sm:h-14 text-primary" />
                </div>
              </div>
              
              {/* Report Lines */}
              <div className="space-y-2">
                <div className="h-2 sm:h-3 bg-border rounded w-full"></div>
                <div className="h-2 sm:h-3 bg-border rounded w-5/6"></div>
                <div className="h-2 sm:h-3 bg-border rounded w-4/6"></div>
              </div>
            </motion.div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-primary/10 rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-primary mb-2">95%</div>
                <div className="h-1 bg-border rounded mx-auto w-12"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/5 rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary/80 mb-2">A+</div>
                <div className="h-1 bg-border rounded mx-auto w-12"></div>
              </motion.div>
            </div>
            
            {/* Chart Bars */}
            <div className="flex items-end gap-2 h-12 sm:h-20 mb-3">
              {[60, 80, 95, 70].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className={`rounded-t flex-1 ${
                    i % 2 === 0 ? 'bg-primary' : 'bg-primary/60'
                  }`}
                ></motion.div>
              ))}
            </div>
            
            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-primary text-primary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2 sm:gap-3"
            >
              <span className="text-sm sm:text-base">Report Ready</span>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Touch swipe handlers
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextStep();
    }
    if (touchStart - touchEnd < -75) {
      prevStep();
    }
  };

  return (
    <section 
      data-nav-theme="light"
      className="relative py-12 sm:py-20 md:py-28 bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Section Header - Homepage Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            From request to report in 4 steps
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mt-4">
            What used to take your team weeks now happens in days—without anyone leaving their desk.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            className="overflow-x-hidden overflow-y-visible pb-0 sm:pb-20 md:pb-24"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              className="flex transition-transform duration-500 ease-out"
              animate={{ x: `-${currentStep * 100}%` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0 px-0 md:px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#ebebeb] hover:bg-[#e3e3e3] shadow-xl overflow-visible mx-auto max-w-6xl h-[480px] sm:h-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center overflow-visible h-full">
                      {/* Left Side - Visual */}
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-8 md:p-8 min-h-[200px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-visible">
                        {step.visual}
                        
                        <div className="absolute top-1 sm:top-4 left-1 sm:left-4 text-[40px] sm:text-[80px] font-bold text-[#A8C5B8]/10 leading-none">
                          {step.number}
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="p-4 sm:p-8 md:p-12">
                        <span className="inline-block px-2 sm:px-4 py-0.5 sm:py-1.5 bg-[#A8C5B8]/20 text-[#A8C5B8] rounded-full text-[10px] sm:text-sm font-black mb-2 sm:mb-4 md:mb-6 shadow-sm">
                          Step {step.number}
                        </span>
                        
                        <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6 leading-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-snug sm:leading-relaxed mb-3 sm:mb-6 md:mb-8">
                          {step.description}
                        </p>

                        <p className="text-xs sm:text-base text-gray-700">
                          {index === 0 && "Quick integration with ERP systems"}
                          {index === 1 && "Global network of certified auditors"}
                          {index === 2 && "Direct communication channel"}
                          {index === 3 && "AI-powered insights and analytics"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-12">
            <button
              onClick={prevStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ebebeb] hover:bg-[#e3e3e3] transition-all hover:scale-110 flex items-center justify-center text-foreground"
              aria-label="Previous step"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                >
                  <div className={`transition-all ${
                    index === currentStep
                      ? 'w-10 sm:w-12 h-2.5 sm:h-3 bg-primary rounded-full'
                      : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-border rounded-full hover:bg-primary/50'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ebebeb] hover:bg-[#e3e3e3] transition-all hover:scale-110 flex items-center justify-center text-foreground"
              aria-label="Next step"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScanProPlus = () => {
  const isMobile = useIsMobile();
  const [auditors, setAuditors] = useState(fallbackAuditors);
  
  // Fetch auditor cards from CMS
  const { data: auditorCards } = useContentByType("auditor_card");
  
  // Process auditor cards
  useEffect(() => {
    const processAuditorCards = async () => {
      if (!auditorCards || auditorCards.length === 0) {
        setAuditors(fallbackAuditors);
        return;
      }

      const processedAuditors = await Promise.all(
        auditorCards.map(async (card, index) => {
          let imageUrl = fallbackAuditors[index]?.image;
          
          if (card.body?.imageId) {
            try {
              const { data: media } = await supabase
                .from("media")
                .select("storage_path")
                .eq("id", card.body.imageId)
                .single();

              if (media) {
                imageUrl = getMediaPublicUrl(media.storage_path);
              }
            } catch (error) {
              console.error("Error fetching auditor image:", error);
            }
          }

          return {
            image: imageUrl,
            location: card.title || fallbackAuditors[index]?.location || "Location",
            region: card.body?.content || fallbackAuditors[index]?.region || "Region",
            gradient: fallbackAuditors[index % fallbackAuditors.length].gradient,
            gender: fallbackAuditors[index % fallbackAuditors.length].gender
          };
        })
      );

      setAuditors(processedAuditors.length > 0 ? processedAuditors : fallbackAuditors);
    };

    processAuditorCards();
  }, [auditorCards]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const features = [
    {
      label: "Flexible Templates",
      title: "Create custom frameworks per industry, standard or customer requirement.",
      image: scanProDashboard,
    },
    {
      label: "AI Guidance",
      title: "Contextual hints during audits to ensure completeness and objectivity.",
      image: aiCopilot,
    },
    {
      label: "Equipment Intelligence",
      title: "Identify machines and assets from photos; assess condition and compliance.",
      image: aiInspector,
    },
    {
      label: "Dynamic Scoring",
      title: "Configurable weightings and 1–5 scoring for transparent results.",
      image: riskScoring,
    },
    {
      label: "Evidence Handling",
      title: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
      image: aiAudit,
    },
    {
      label: "Real-Time Progress",
      title: "Live milestones and alerts during audits for fast course-corrections.",
      image: liveTracking,
    },
    {
      label: "Predictive Risk Scoring",
      title: "Anticipate issues from historical patterns and equipment signals.",
      image: riskScoring,
    },
    {
      label: "Corrective Action Tracking",
      title: "Monitor improvements with reminders and due-dates.",
      image: oneClickDispatch,
    },
    {
      label: "Integrations",
      title: "ERP/QMS connectors (SAP, Oracle, Dynamics, Trackwise, MasterControl, ETQ).",
      image: scanProDashboard,
    }
  ];

  return (
    <div className="min-h-screen relative">
      <PageSEO
        title="ScanPro+ for CEIP — Croatian Audit Platform"
        description="AI-guided CEIP buyer audits across the Croatian export supply chain. Dispatch vetted engineers, auditors and inspectors with evidence-backed reports."
        canonical="/scanpro-plus"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CEIP ScanPro+",
          "applicationCategory": "BusinessApplication",
          "description": "AI-powered audit execution platform for CEIP buyers, cross-border partner verification and on-demand expert dispatch across the Croatian export supply chain."
        }}
      />
      <PageGridOverlay />
      <div className="relative">
      <Navigation />
      
      {/* Hero Section - White Background, Archlet Style (matching Homepage) */}
      <section
        data-nav-theme="light"
        id="hero"
        className="relative min-h-[100dvh] flex flex-col bg-background"
      >
        <HeroSquaresAnimation className="top-24 right-8 md:top-28 md:right-20 lg:top-32 lg:right-24" />
        {/* Main Content */}
        <div className="flex-1 flex items-center relative z-10 pt-20 md:pt-32 lg:pt-40 min-h-0">
          <div className="px-8 w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm text-foreground/50 font-mono tracking-wide mb-4 md:mb-6"
              >
                ScanPro+ · CEIP Buyer Audit Platform
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
              >
                Audit any partner<br />
                in Croatia.
              </motion.h1>

              {/* Subtitle + CTA - right-offset like Homepage */}
              <div className="mt-8 md:mt-12 lg:mt-16 md:ml-[30%] lg:ml-[50%] max-w-xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-foreground/60 text-base md:text-lg lg:text-xl mb-6 md:mb-8"
                >
                  Dispatch CEIP-vetted engineers, auditors and inspectors to Croatian supplier sites.<br />
                  Atlas AI structures every audit. Local experts verify. CEIP buyers decide with evidence.
                </motion.p>

                {/* Hero CTAs removed — presentation, not website */}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Industry Band - matching Homepage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...[
              "Built for the Croatian Enterprise Intelligence Platform",
              "Rail & Rolling Stock", "Energy & Pipelines", "Logistics & Terminals",
              "Heavy Steel Fabrication", "Industrial Manufacturing", "Mining & Minerals",
              "EPC & Industrial Parks", "Automotive Tier-1/2", "Hydropower", "Agri & Food Processing",
            ], ...[
              "Built for the Croatian Enterprise Intelligence Platform",
              "Rail & Rolling Stock", "Energy & Pipelines", "Logistics & Terminals",
              "Heavy Steel Fabrication", "Industrial Manufacturing", "Mining & Minerals",
              "EPC & Industrial Parks", "Automotive Tier-1/2", "Hydropower", "Agri & Food Processing",
            ]].map((item, i) => (
              <span
                key={i}
                className={`mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase ${
                  item.startsWith("Built")
                    ? "font-bold text-foreground"
                    : "font-bold text-foreground/80"
                }`}
              >
                {item}
                <span className="ml-6 md:ml-10 text-foreground/20">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Combined credentials band — industry fit + procurement trust signals */}
      <section data-nav-theme="light" className="bg-background border-t border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-8 py-6 md:py-8 space-y-4 md:space-y-5">
          {/* Row 1 — industry fit */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            <p className="md:col-span-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Made for CEIP buyer teams in
            </p>
            <div className="md:col-span-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <span>DACH OEMs sourcing in Croatia</span>
              <span className="text-foreground/20">·</span>
              <span>Croatian industrial suppliers</span>
              <span className="text-foreground/20">·</span>
              <span>Adriatic and EU logistics</span>
              <span className="text-foreground/20">·</span>
              <span>Energy, rail and steel fabrication</span>
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-foreground/10" />
          {/* Row 2 — procurement trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {[
              "CEIP buyer access",
              "NDA before dispatch",
              "Conflict-of-interest declared",
              "GPS/time-stamped evidence chain",
              "Export-ready report format",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 && <span className="text-muted-foreground/30">·</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* DIN annotation — grid 4→6 */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 h-4">
        <TechnicalAnnotation label="1200" from={3} to={6} />
      </div>

      {/* ============================================================ */}
      {/* PAIN — name the enemy, then make it concrete                */}
      {/* ============================================================ */}

      {/* 04 — The broken compromise (problem narrative) */}
      <BrokenCompromiseSection />

      {/* 05 — Traditional vs ScanPro+ comparison (pain made concrete) */}
      <section data-nav-theme="light" className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">The difference</span>
            </div>
            <h2 className="section-headline text-foreground max-w-3xl">
              Traditional delegation vs. CEIP ScanPro+
            </h2>
          </motion.div>

          <div className="border border-foreground/15">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-foreground/[0.03] border-b border-foreground/15">
              <div className="p-5 md:p-6 font-mono text-xs md:text-sm uppercase tracking-wider text-foreground/50">Dimension</div>
              <div className="p-5 md:p-6 font-mono text-xs md:text-sm uppercase tracking-wider text-foreground/50 border-l border-foreground/15">Traditional firms</div>
              <div className="p-5 md:p-6 font-mono text-xs md:text-sm uppercase tracking-wider text-primary border-l border-foreground/15">ScanPro+</div>
            </div>

            {[
              { dim: "Time to on-site", trad: "Cross-border travel planning, visas and calendars", yvoo: "CEIP-vetted local expert dispatched in 48–72h" },
              { dim: "Time to signed report", trad: "Weeks after the visit", yvoo: "Decision-ready report within 3 days" },
              { dim: "Expert profile", trad: "General consultant or internal delegation", yvoo: "Engineer, auditor or inspector matched to scope" },
              { dim: "Market reach", trad: "Limited to who can travel", yvoo: "Croatia, DACH and EU supply-chain coverage" },
              { dim: "Evidence", trad: "Photos in email threads", yvoo: "GPS/time-stamped, structured, signed evidence" },
              { dim: "Standards", trad: "Different templates per country", yvoo: "ISO, IATF, VDA, EN 15085 and API-ready workflows" },
              { dim: "Buyer value", trad: "One-off mission cost", yvoo: "Reusable CEIP intelligence layer" },
              { dim: "Parallel work", trad: "One visit at a time", yvoo: "Multiple Croatian supplier audits scheduled in parallel" },
            ].map((row, i) => (
              <div
                key={row.dim}
                className={`grid grid-cols-3 ${i !== 7 ? "border-b border-foreground/10" : ""}`}
              >
                <div className="p-5 md:p-6 text-sm md:text-base font-medium text-foreground">{row.dim}</div>
                <div className="p-5 md:p-6 text-sm md:text-base text-muted-foreground border-l border-foreground/10 flex items-start gap-2">
                  <X className="w-4 h-4 mt-1 flex-shrink-0 text-foreground/30" />
                  <span>{row.trad}</span>
                </div>
                <div className="p-5 md:p-6 text-sm md:text-base text-foreground border-l border-foreground/10 flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span className="font-medium">{row.yvoo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROMISE — the mechanism + quantified                         */}
      {/* ============================================================ */}

      {/* 06 — How ScanPro+ works (3-layer anchor diagram) */}
      <ThreeLayerPlatformSection />

      {/* 07 — Headline KPI band (promise quantified) */}
      <HeadlineKpiBand />

      {/* 08 — Global auditor network (THE INNOVATION) —
          on-demand, accredited lead auditors in 40+ countries.
          This is the mechanism that makes the 7-day / 3-day promise possible —
          the "Uberization" of complex supplier audits. */}
      <GlobalNetworkSection />

      {/* ============================================================ */}
      {/* PROOF OF MECHANISM — why & how it works, then see it run     */}
      {/* ============================================================ */}

      {/* 09 — Expert-level audits (3-phase tabbed narrative — Before / On-floor / Within 24h) */}
      <AuditDifferenceSection />

      {/* 09 — Atlas AI methodology (provenance) */}
      <AtlasAIProvenance />

      {/* 10 — Equipment Intelligence demo (see it run) */}
      <section
        data-nav-theme="light"
        className="py-24 md:py-32 bg-background"
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="section-headline text-foreground max-w-2xl mb-4">
              See the platform in action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Equipment intelligence: machines, welding stations and site assets are identified on site and matched against CEIP buyer scope, certification and qualification records.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-[hsl(0,0%,92%)] p-2 md:p-4 lg:p-6 overflow-hidden">
              <ResponsiveDemoFrame designWidth={1280} designHeight={820}>
                <EquipmentIntelligenceDemo />
              </ResponsiveDemoFrame>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11 — Sample Audit Report (see the output) */}
      <SampleAuditReportPreview />

      {/* Section cut marker — proof of mechanism → proof of outcome */}
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionCutMarker section="B" from={0} to={6} />
      </div>

      {/* Challenge & Solution toggle — kept as bridge into outcome proof */}
      <ChallengeToggleSection />

      {/* ============================================================ */}
      {/* PROOF OF OUTCOME — social proof + evidence numbers           */}
      {/* ============================================================ */}

      {/* 12 — Testimonial / Industry reference (3-col) */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-[1400px] px-8">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-12"
          >
            Built for CEIP Croatian export sectors with regulated quality requirements
          </motion.h2>

          <div className="grid lg:grid-cols-3 gap-0 items-stretch">
            {/* Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 flex flex-col justify-between aspect-square"
            >
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-[-0.02em]">3 days</p>
                <p className="text-xl text-white/90 font-medium mt-2">on-site to signed report</p>
              </div>
            </motion.div>

            {/* Industry visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square bg-background border border-foreground/15 shadow-sm overflow-hidden flex items-center justify-center p-3 relative"
            >
              {/* Corner ticks — technical-drawing frame */}
              <span aria-hidden="true" className="absolute top-2 left-2 w-3 h-px bg-foreground/30" />
              <span aria-hidden="true" className="absolute top-2 left-2 w-px h-3 bg-foreground/30" />
              <span aria-hidden="true" className="absolute top-2 right-2 w-3 h-px bg-foreground/30" />
              <span aria-hidden="true" className="absolute top-2 right-2 w-px h-3 bg-foreground/30" />
              <span aria-hidden="true" className="absolute bottom-2 left-2 w-3 h-px bg-foreground/30" />
              <span aria-hidden="true" className="absolute bottom-2 left-2 w-px h-3 bg-foreground/30" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-px bg-foreground/30" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 w-px h-3 bg-foreground/30" />

              <img
                src={blueprintIndustrialGas}
                alt="Technical blueprint — industrial gas storage tank and precision flange assembly"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-[115%] h-[115%] max-w-none object-contain"
              />
            </motion.div>

            {/* Industry Reference Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 flex flex-col justify-center space-y-6 bg-background"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Industry reference
                </p>
                <p className="text-lg font-bold text-foreground tracking-wide">
                  Heavy Steel Fabrication & Energy Equipment
                </p>
                <p className="text-sm text-foreground/60 mt-1">Croatia ↔ DACH / EU · Multi-site qualification</p>
              </div>

              <blockquote className="text-lg text-foreground leading-relaxed border-l-2 border-primary pl-4">
                "CEIP buyers can verify a fabrication partner, review evidence and align corrective actions without sending a full delegation across Croatia and EU export chains."
              </blockquote>

              <p className="text-xs text-foreground/40 font-mono uppercase tracking-wider">
                Representative CEIP scenario based on cross-border industrial qualification · Buyer references available under NDA
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUALIFICATION — fit & risk filters                           */}
      {/* ============================================================ */}

      {/* 14 — Compliance standards grid */}
      <section
        data-nav-theme="light"
        className="py-24 md:py-32 bg-background"
      >
        <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <h2 className="section-headline text-foreground max-w-2xl mb-6">
              The standards CEIP buyer projects require
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Audits aligned to cross-border Croatian export projects — including VDA 6.3, IATF 16949, ISO 9001, ISO 14001, EN 15085, EN ISO 3834 and API Q1.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-base font-medium text-foreground mb-3">
              CEIP-vetted engineers, auditors and inspectors are matched against the standards your project requires:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span>VDA 6.3</span>
              <span className="text-border">•</span>
              <span>IATF 16949</span>
              <span className="text-border">•</span>
              <span>ISO 9001 / 14001 / 45001</span>
              <span className="text-border">•</span>
              <span>EN 15085 / EN ISO 3834</span>
            </div>
          </motion.div>

          <ComplianceStandardsGrid />
        </div>
      </section>

      {/* 15 — Industry use cases */}
      <IndustryUseCasesGrid />

      {/* 17 — Security & data handling */}
      <section data-nav-theme="light" className="bg-background border-y border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-8 py-12 md:py-16">
          <div className="flex items-start gap-3 mb-8">
            <div className="w-12 h-px bg-foreground mt-3" />
            <div>
              <p className="section-eyebrow mb-1">Security and data handling</p>
              <p className="text-sm text-muted-foreground">Designed to pass procurement and IT security reviews. Documentation available on request.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/10">
            {[
              "ISO 27001-aligned",
              "GDPR compliant",
              "SOC 2 roadmap",
              "NDA standard",
              "EU data residency",
              "Role-based access",
            ].map((item) => (
              <div key={item} className="bg-background p-5 md:p-6">
                <div className="border-t border-foreground/20 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CLOSE — make it personal, then commit                        */}
      {/* ============================================================ */}

      {/* 19 — Final CTA — 3-step onboarding (Demo → QuickScan → Rollout) */}
      <OnboardingStepsSection />



      </div>
    </div>
  );
};

export default ScanProPlus;
