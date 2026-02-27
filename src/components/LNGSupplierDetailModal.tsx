import { motion } from "framer-motion";
import { X, Star, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export interface LNGSupplier {
  name: string;
  location: string;
  match: number;
  certs: string[];
  capacity: string;
  speciality: string;
  initials: string;
  established: string;
  employees: string;
  revenue: string;
  leadTime: string;
  qualityScore: number;
  deliveryRating: string;
  riskLevel: string;
  financialHealth: string;
  products: {
    name: string;
    specs: { label: string; value: string }[];
    datasheet: string;
  }[];
  projectRefs: string[];
  portfolioFit: {
    score: number;
    reasoning: string;
    strengths: string[];
    gaps: string[];
  };
  recommendations: string[];
}

const suppliersData: LNGSupplier[] = [
  {
    name: "Makita Corporation",
    location: "Anjo, Japan",
    match: 97,
    certs: ["IEC 62841", "EN 60745", "UL Listed", "CE Marking", "IP56 Rated", "EPTA 05/2015"],
    capacity: "25,000 units/yr",
    speciality: "Cordless rotary hammers & impact drivers",
    initials: "MK",
    established: "1915",
    employees: "18,500",
    revenue: "€4.8B",
    leadTime: "4–8 weeks",
    qualityScore: 96,
    deliveryRating: "98.1%",
    riskLevel: "Low",
    financialHealth: "Strong",
    products: [
      {
        name: "HR5212C — SDS-Max Rotary Hammer",
        specs: [
          { label: "Impact Energy", value: "19.1 J (EPTA)" },
          { label: "No Load Speed", value: "155–310 rpm" },
          { label: "Blow Rate", value: "1,100–2,250 bpm" },
          { label: "Motor", value: "1,510W brushless" },
          { label: "Weight", value: "13.6 kg" },
          { label: "Vibration (3-axis)", value: "8.0 m/s² (drilling)" },
          { label: "Dust Protection", value: "AWS dust extraction compatible" },
          { label: "Modes", value: "Rotation + hammering, hammering only" },
        ],
        datasheet: "DS-HR5212C-Rev.5",
      },
      {
        name: "DTD172 — 18V Brushless Impact Driver",
        specs: [
          { label: "Max Torque", value: "180 Nm" },
          { label: "No Load Speed", value: "0–3,800 rpm" },
          { label: "Impact Rate", value: "0–4,600 ipm" },
          { label: "Battery Platform", value: "18V LXT Li-Ion" },
          { label: "Weight (w/ battery)", value: "1.7 kg" },
          { label: "IP Rating", value: "IP56 dust & water resistant" },
          { label: "Modes", value: "4-speed + assist mode" },
          { label: "LED", value: "Dual-zone work light" },
        ],
        datasheet: "DS-DTD172-Rev.3",
      },
    ],
    projectRefs: [
      "Deutsche Bahn — 12,000 cordless tool fleet rollout",
      "Skanska — Rotary hammer standardization (Nordic region)",
      "Bouygues Construction — Impact driver package (2,400 units)",
      "HOCHTIEF — Jobsite tool fleet management program",
    ],
    portfolioFit: {
      score: 94,
      reasoning: "Makita's cordless platform covers 92% of your typical jobsite tool requirements. Their IEC 62841 and EN 60745 dual certification matches your standard procurement specs. Battery interchangeability across 300+ tools reduces fleet complexity significantly.",
      strengths: [
        "Broadest cordless platform — 300+ tools on 18V LXT battery",
        "Proven track record on 4 major construction fleet programs",
        "In-house motor manufacturing eliminates supply chain risk",
        "IP56 rating standard — exceeds jobsite durability requirements",
      ],
      gaps: [
        "No gas-actuated fastening tools — would need secondary supplier for direct fastening",
        "Lead time 4–8 weeks — may be tight for urgent project mobilization",
      ],
    },
    recommendations: [
      "Request budgetary quote for rotary hammer fleet package — their sweet spot product category",
      "Order a quality compliance audit to verify IEC 62841 test lab accreditation and CE module conformity",
      "Consider pairing with Husqvarna for concrete cutting & sawing applications",
      "Negotiate frame agreement — their capacity of 25,000 units/yr can cover multiple projects simultaneously",
      "Request demo day invitation at nearest Makita experience center (typically monthly)",
    ],
  },
  {
    name: "Bosch Professional",
    location: "Stuttgart, Germany",
    match: 94,
    certs: ["IEC 62841", "EN 60745", "UL Listed", "CE Marking", "IP54"],
    capacity: "30,000 units/yr",
    speciality: "Cordless drilling & measuring systems",
    initials: "BP",
    established: "1886",
    employees: "72,000",
    revenue: "€6.1B",
    leadTime: "3–6 weeks",
    qualityScore: 91,
    deliveryRating: "96.4%",
    riskLevel: "Medium",
    financialHealth: "Stable",
    products: [
      {
        name: "GBH 18V-45 C — BITURBO SDS-Max Hammer",
        specs: [
          { label: "Impact Energy", value: "12.5 J (EPTA)" },
          { label: "No Load Speed", value: "0–305 rpm" },
          { label: "Blow Rate", value: "1,380–2,900 bpm" },
          { label: "Battery Platform", value: "18V ProCORE Li-Ion" },
          { label: "Weight (w/ battery)", value: "8.9 kg" },
          { label: "Vibration", value: "13.0 m/s² (chiseling)" },
          { label: "Connectivity", value: "Bluetooth + Bosch Connected" },
          { label: "Modes", value: "Drill, hammer drill, chisel" },
        ],
        datasheet: "DS-GBH45C-Rev.4",
      },
    ],
    projectRefs: [
      "Vinci Construction — 8,000-unit fleet standardization",
      "Strabag — ProCORE battery platform migration",
      "PORR Group — Drilling systems for tunnel projects",
    ],
    portfolioFit: {
      score: 78,
      reasoning: "Strong on cordless drilling and measuring systems, but connected tool fleet management (Bosch Connected) is still maturing. IP54 rating falls slightly below jobsite requirements for heavy rain/dust exposure. Best suited as a complementary supplier for precision drilling and measurement.",
      strengths: [
        "Highest production capacity — 30,000 units/yr",
        "Fastest lead times among European manufacturers (3–6 weeks)",
        "Strong Vinci/Strabag fleet standardization references",
      ],
      gaps: [
        "IP54 rating — below IP56 requirement for harsh jobsite conditions",
        "Connected tool platform still maturing vs. competitors",
        "No SDS-Max rotary hammer above 12.5 J in cordless range",
      ],
    },
    recommendations: [
      "Use for precision drilling and measuring tool packages — competitive pricing on volume",
      "Request fleet management demo of Bosch Connected platform for tool tracking",
      "Monitor IP rating upgrade roadmap before qualifying for outdoor heavy construction",
    ],
  },
  {
    name: "DeWalt Industrial",
    location: "Towson, MD, USA",
    match: 91,
    certs: ["UL Listed", "CSA", "EN 62841", "OSHA Compliant", "MET Listed"],
    capacity: "40,000 units/yr",
    speciality: "Heavy-duty demolition & concrete tools",
    initials: "DW",
    established: "1923",
    employees: "14,200",
    revenue: "€3.8B",
    leadTime: "3–5 weeks",
    qualityScore: 98,
    deliveryRating: "99.2%",
    riskLevel: "Low",
    financialHealth: "Very Strong",
    products: [
      {
        name: "DCH735 — 60V FlexVolt SDS-Max Combination Hammer",
        specs: [
          { label: "Impact Energy", value: "13.3 J (EPTA)" },
          { label: "No Load Speed", value: "0–380 rpm" },
          { label: "Blow Rate", value: "1,170–2,340 bpm" },
          { label: "Battery Platform", value: "60V FlexVolt MAX" },
          { label: "Weight (w/ battery)", value: "9.3 kg" },
          { label: "E-Clutch", value: "Electronic torque limiter" },
          { label: "Dust Management", value: "AirLock system compatible" },
          { label: "Warranty", value: "3-year + 1-year free service" },
        ],
        datasheet: "DS-DCH735-Rev.8",
      },
    ],
    projectRefs: [
      "Turner Construction — FlexVolt fleet deployment (US nationwide)",
      "Bechtel — Demolition tool package for refinery turnarounds",
      "Kiewit Corporation — Heavy-duty concrete drilling program",
    ],
    portfolioFit: {
      score: 88,
      reasoning: "Best-in-class for heavy-duty demolition and concrete applications. FlexVolt 60V platform delivers corded-equivalent power in cordless form factor. Premium quality (98/100) with the highest delivery rating in the dataset. US-centric distribution may limit EU project logistics.",
      strengths: [
        "Unmatched heavy-duty cordless power with 60V FlexVolt platform",
        "Highest quality score (98/100) and delivery rating (99.2%)",
        "100+ years of professional tool engineering heritage",
      ],
      gaps: [
        "FlexVolt batteries not cross-compatible with 18V competitor platforms",
        "Limited measuring/layout tool portfolio vs. competitors",
        "Higher pricing due to premium positioning",
      ],
    },
    recommendations: [
      "Ideal complement to Makita for heavy demolition and high-power concrete applications",
      "Request early fleet assessment to standardize battery platform across project sites",
      "Explore frame agreement for multi-project demolition tool standardization",
    ],
  },
  {
    name: "Milwaukee Tool",
    location: "Brookfield, WI, USA",
    match: 88,
    certs: ["UL Listed", "CSA", "EN 62841", "OSHA Compliant", "IP56"],
    capacity: "35,000 units/yr",
    speciality: "M18 FUEL cordless platform & One-Key fleet management",
    initials: "MW",
    established: "1924",
    employees: "11,000",
    revenue: "€3.2B",
    leadTime: "4–6 weeks",
    qualityScore: 89,
    deliveryRating: "95.8%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "M18 FUEL 2915-20 — SDS-Max Rotary Hammer",
        specs: [
          { label: "Impact Energy", value: "11.6 J (EPTA)" },
          { label: "No Load Speed", value: "0–310 rpm" },
          { label: "Blow Rate", value: "1,450–2,900 bpm" },
          { label: "Battery Platform", value: "M18 REDLITHIUM HIGH OUTPUT" },
          { label: "Weight (w/ battery)", value: "9.1 kg" },
          { label: "One-Key", value: "Tool tracking + custom profiles" },
          { label: "Anti-Vibration", value: "AUTOSTOP kickback control" },
          { label: "LED", value: "Built-in task lighting" },
        ],
        datasheet: "DS-2915-Rev.4",
      },
    ],
    projectRefs: [
      "Skanska USA — One-Key fleet management pilot (5,000 tools)",
      "PCL Construction — M18 FUEL standardization program",
      "Walsh Group — Complete cordless conversion initiative",
    ],
    portfolioFit: {
      score: 82,
      reasoning: "Industry-leading fleet management platform (One-Key) with GPS tracking, usage reporting, and remote tool lockout. Strong M18 FUEL cordless lineup covers most jobsite applications. Limited to M18 platform — no high-voltage option like DeWalt FlexVolt for heaviest-duty tasks.",
      strengths: [
        "One-Key fleet management — best digital tool tracking in the industry",
        "IP56 rated across M18 FUEL lineup — exceeds jobsite requirements",
        "Strong North American construction fleet references",
      ],
      gaps: [
        "No high-voltage (>18V) platform for heaviest demolition work",
        "One-Key platform availability limited outside North America",
        "Delivery rating (95.8%) below portfolio average",
      ],
    },
    recommendations: [
      "Best choice for fleet management & tool tracking requirements — request One-Key demo",
      "Pair with DeWalt (heavy demo) + Makita (precision) for complete tool ecosystem",
      "Request One-Key international availability timeline if considering for EU/ME projects",
    ],
  },
  {
    name: "Festool GmbH",
    location: "Wendlingen, Germany",
    match: 85,
    certs: ["IEC 62841", "EN 60745", "CE Marking", "GS Mark", "IP55"],
    capacity: "15,000 units/yr",
    speciality: "Precision drilling & dust-free cutting systems",
    initials: "FT",
    established: "1925",
    employees: "3,200",
    revenue: "€850M",
    leadTime: "5–8 weeks",
    qualityScore: 93,
    deliveryRating: "97.5%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "BHC 18 — Cordless SDS-Plus Rotary Hammer",
        specs: [
          { label: "Impact Energy", value: "2.2 J (EPTA)" },
          { label: "No Load Speed", value: "0–1,100 rpm" },
          { label: "Blow Rate", value: "0–4,600 bpm" },
          { label: "Battery Platform", value: "18V Festool battery system" },
          { label: "Weight (w/ battery)", value: "3.3 kg" },
          { label: "Dust Extraction", value: "Integrated D-handle + hose connection" },
          { label: "Vibration", value: "7.5 m/s² (drilling)" },
          { label: "Systainer", value: "Compatible with Festool system storage" },
        ],
        datasheet: "DS-BHC18-Rev.6",
      },
    ],
    projectRefs: [
      "Implenia — Dust-free interior fit-out program",
      "Goldbeck — Precision drilling standardization for modular construction",
      "Züblin — Systainer fleet rollout for occupied renovation projects",
    ],
    portfolioFit: {
      score: 76,
      reasoning: "Niche specialist in dust-free and precision applications with strong European compliance. Smaller tool range and lower impact energy limit applicability for heavy concrete work. Best for interior fit-out, renovation, and occupied building projects requiring strict dust management.",
      strengths: [
        "Best-in-class dust extraction integration — exceeds occupational health standards",
        "Full CE + GS + IEC certification — rare combination for European compliance",
        "Strong European fit-out and renovation project references",
      ],
      gaps: [
        "Limited impact energy — max 2.2 J, insufficient for structural concrete",
        "Smallest capacity (15,000 units/yr) among compared suppliers",
        "No SDS-Max platform — limits heavy demolition eligibility",
      ],
    },
    recommendations: [
      "Ideal for interior fit-out and occupied renovation requiring dust-free operation",
      "Use for precision SDS-Plus drilling and cutting (light to medium duty)",
      "Complement with Makita or DeWalt for heavy-duty SDS-Max applications",
    ],
  },
];

export { suppliersData };

interface Props {
  supplier: LNGSupplier | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LNGSupplierDetailModal = ({ supplier, open, onOpenChange }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!supplier) return null;

  const tabs = ["Basic Data", "Rating & Risk", "Product Specs", "Portfolio Fit", "Recommendations"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-foreground/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{supplier.initials}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-foreground">{supplier.name}</h2>
                <span className="px-3 py-1 bg-primary text-white text-sm font-bold">{supplier.match}% Match</span>
              </div>
              <p className="text-muted-foreground">{supplier.location} · Est. {supplier.established} · {supplier.employees} employees · {supplier.revenue} revenue</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-foreground/10 px-6 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

            {/* Basic Data */}
            {activeTab === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Capacity", value: supplier.capacity },
                    { label: "Lead Time", value: supplier.leadTime },
                    { label: "Employees", value: supplier.employees },
                    { label: "Revenue", value: supplier.revenue },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Certifications & Compliance</h3>
                  <div className="flex gap-2 flex-wrap">
                    {supplier.certs.map((c, i) => (
                      <span key={i} className="px-3 py-1.5 border border-primary/30 text-primary text-xs font-bold uppercase">{c}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Project References</h3>
                  <div className="space-y-0">
                    {supplier.projectRefs.map((ref, i) => (
                      <div key={i} className="flex items-center gap-3 py-3 border-b border-foreground/5 last:border-0">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <p className="text-sm text-foreground font-medium">{ref}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rating & Risk */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Quality Score", value: `${supplier.qualityScore}/100`, icon: Star, color: supplier.qualityScore >= 95 ? "text-primary" : supplier.qualityScore >= 90 ? "text-secondary" : "text-foreground" },
                    { label: "Delivery Rating", value: supplier.deliveryRating, icon: TrendingUp, color: "text-primary" },
                    { label: "Risk Level", value: supplier.riskLevel, icon: AlertTriangle, color: supplier.riskLevel === "Low" ? "text-secondary" : "text-destructive" },
                    { label: "Financial Health", value: supplier.financialHealth, icon: CheckCircle, color: "text-primary" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{item.label}</p>
                      </div>
                      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Quality Score Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Documentation & Traceability", score: Math.min(100, supplier.qualityScore + 2) },
                      { label: "Process Control", score: supplier.qualityScore },
                      { label: "Non-Conformance Rate", score: Math.max(80, supplier.qualityScore - 3) },
                      { label: "Corrective Action Effectiveness", score: Math.min(100, supplier.qualityScore + 1) },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-foreground font-medium">{item.label}</span>
                          <span className="text-sm font-bold text-primary">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-foreground/10 overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Product Specs */}
            {activeTab === 2 && (
              <div className="space-y-6">
                {supplier.products.map((product, pi) => (
                  <div key={pi} className="border border-foreground/10">
                    <div className="p-4 bg-muted flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">Datasheet: {product.datasheet}</p>
                      </div>
                    </div>
                    <div className="divide-y divide-foreground/5">
                      {product.specs.map((spec, si) => (
                        <div key={si} className="flex items-center justify-between px-4 py-3">
                          <span className="text-sm text-muted-foreground font-medium">{spec.label}</span>
                          <span className="text-sm font-bold text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Fit — AI Prediction */}
            {activeTab === 3 && (
              <div className="space-y-6">
                <div className="p-5 bg-primary/5 border border-primary/15">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary">AI Portfolio Fit Analysis</h3>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-5xl font-bold text-primary">{supplier.portfolioFit.score}%</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Portfolio Fit Score</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-foreground/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${supplier.portfolioFit.score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{supplier.portfolioFit.reasoning}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/5 border border-secondary/15">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary mb-3">Strengths</h4>
                    <div className="space-y-2">
                      {supplier.portfolioFit.strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-destructive/5 border border-destructive/15">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-destructive mb-3">Gaps</h4>
                    <div className="space-y-2">
                      {supplier.portfolioFit.gaps.map((g, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">{g}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {activeTab === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary">AI-Generated Recommendations</h3>
                </div>
                {supplier.recommendations.map((rec, i) => (
                  <div key={i} className="p-4 bg-muted flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium leading-relaxed">{rec}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LNGSupplierDetailModal;
