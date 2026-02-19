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
    name: "CryoValve Engineering AG",
    location: "Zurich, Switzerland",
    match: 97,
    certs: ["ASME B16.34", "API 6D", "PED 2014/68/EU", "NACE MR0175", "Fire Safe API 607", "ATEX", "SIL 3"],
    capacity: "800 units/yr",
    speciality: "Cryogenic ball valves for LNG",
    initials: "CV",
    established: "1992",
    employees: "450",
    revenue: "€120M",
    leadTime: "16–24 weeks",
    qualityScore: 96,
    deliveryRating: "98.1%",
    riskLevel: "Low",
    financialHealth: "Strong",
    products: [
      {
        name: "CryoBall CB-150 — Cryogenic Ball Valve",
        specs: [
          { label: "Size Range", value: "DN50 – DN600 (2\" – 24\")" },
          { label: "Pressure Class", value: "ANSI 150 – 2500" },
          { label: "Temperature", value: "−196°C to +200°C" },
          { label: "Body Material", value: "ASTM A351 CF8M / Inconel 625" },
          { label: "Seat Material", value: "PTFE / PEEK reinforced" },
          { label: "End Connection", value: "RF, RTJ, BW per ASME B16.25" },
          { label: "Testing", value: "Helium leak, cryogenic cycle, hydrostatic" },
          { label: "Actuation", value: "Pneumatic, electric, manual gear" },
        ],
        datasheet: "DS-CB150-Rev.7",
      },
      {
        name: "CryoGate CG-200 — Cryogenic Gate Valve",
        specs: [
          { label: "Size Range", value: "DN100 – DN900 (4\" – 36\")" },
          { label: "Pressure Class", value: "ANSI 300 – 1500" },
          { label: "Temperature", value: "−196°C to +120°C" },
          { label: "Body Material", value: "ASTM A352 LCC / LCB" },
          { label: "Trim", value: "Stellite 6 overlay" },
          { label: "Fire Safe", value: "API 607 / BS 6755 Part 2" },
          { label: "Testing", value: "Cryogenic shell + seat, PMI, UT" },
          { label: "Fugitive Emissions", value: "ISO 15848-1 Class BH" },
        ],
        datasheet: "DS-CG200-Rev.4",
      },
    ],
    projectRefs: [
      "Yamal LNG — 180 cryogenic isolation valves",
      "Ichthys LNG — ESD valve package (42 units)",
      "Prelude FLNG — Tank isolation system",
      "Corpus Christi LNG — Ball valve package T3",
    ],
    portfolioFit: {
      score: 94,
      reasoning: "CryoValve's product range covers 92% of your typical LNG cryogenic valve requirements. Their ASME B16.34 and API 6D dual certification matches your standard procurement specs. Temperature ratings (−196°C) exceed your minimum requirement of −162°C for LNG service.",
      strengths: [
        "Full cryogenic range matches LNG storage tank requirements",
        "Proven track record on 4 major LNG projects",
        "In-house helium leak testing eliminates third-party delays",
        "SIL 3 rated — meets your ESD valve specifications",
      ],
      gaps: [
        "No butterfly valves above DN600 — would need secondary supplier for large-bore",
        "Lead time 16–24 weeks — tight for fast-track EPC schedules",
      ],
    },
    recommendations: [
      "Request budgetary quote for DN150–DN300 cryogenic ball valve package — their sweet spot",
      "Order a code compliance audit to verify ASME stamp validity and PED module H1 conformity",
      "Consider pairing with Nippon Cryo Systems for large-bore butterfly valves (DN600+)",
      "Negotiate frame agreement — their capacity of 800 units/yr can cover 3 projects simultaneously",
      "Request witness test invitation for next cryogenic cycle test (typically every 6 weeks)",
    ],
  },
  {
    name: "Petro-Valve Industries LLC",
    location: "Abu Dhabi, UAE",
    match: 94,
    certs: ["API 6D", "NACE MR0175", "API 6A", "ISO 9001:2015"],
    capacity: "1,200 units/yr",
    speciality: "LNG storage tank isolation valves",
    initials: "PV",
    established: "2005",
    employees: "320",
    revenue: "€85M",
    leadTime: "12–18 weeks",
    qualityScore: 91,
    deliveryRating: "96.4%",
    riskLevel: "Medium",
    financialHealth: "Stable",
    products: [
      {
        name: "PetroGate PG-300 — Through-Conduit Gate Valve",
        specs: [
          { label: "Size Range", value: "DN100 – DN1200 (4\" – 48\")" },
          { label: "Pressure Class", value: "ANSI 150 – 900" },
          { label: "Temperature", value: "−46°C to +200°C" },
          { label: "Body Material", value: "ASTM A216 WCB / A352 LCB" },
          { label: "Seat", value: "Metal-to-metal, Stellite 6" },
          { label: "Sour Service", value: "NACE MR0175 / ISO 15156" },
          { label: "Testing", value: "Hydrostatic, pneumatic, PMI" },
          { label: "Coating", value: "Epoxy internal + external TSA" },
        ],
        datasheet: "DS-PG300-Rev.5",
      },
    ],
    projectRefs: [
      "ADNOC LNG — 320 isolation valves",
      "QatarEnergy NFE — Gate valve package",
      "Ras Laffan Refinery — Sour service valves",
    ],
    portfolioFit: {
      score: 78,
      reasoning: "Strong on large-bore gate valves and sour service, but limited cryogenic range. Temperature rating of −46°C falls short of LNG requirements (−162°C). Best suited as a complementary supplier for non-cryogenic LNG facility valves.",
      strengths: [
        "Highest capacity in the region — 1,200 units/yr",
        "Faster lead times than European competitors (12–18 weeks)",
        "Strong ADNOC/QatarEnergy project references",
      ],
      gaps: [
        "No cryogenic rating below −46°C — cannot supply LNG tank valves",
        "Missing PED certification — limits EU project eligibility",
        "No SIL certification for ESD applications",
      ],
    },
    recommendations: [
      "Use for non-cryogenic process valves in LNG facility (utility, flare, drain)",
      "Competitive pricing for large-bore gate valves — request quote for DN600+ package",
      "Recommend PED certification roadmap before qualifying for EU EPC projects",
    ],
  },
  {
    name: "Nippon Cryo Systems Co.",
    location: "Osaka, Japan",
    match: 91,
    certs: ["ASME B16.34", "JIS B 2073", "KHK", "PED"],
    capacity: "600 units/yr",
    speciality: "Triple-offset butterfly valves",
    initials: "NC",
    established: "1978",
    employees: "680",
    revenue: "€210M",
    leadTime: "20–28 weeks",
    qualityScore: 98,
    deliveryRating: "99.2%",
    riskLevel: "Low",
    financialHealth: "Very Strong",
    products: [
      {
        name: "CryoFly CF-800 — Triple-Offset Butterfly Valve",
        specs: [
          { label: "Size Range", value: "DN200 – DN1500 (8\" – 60\")" },
          { label: "Pressure Class", value: "ANSI 150 – 600" },
          { label: "Temperature", value: "−196°C to +400°C" },
          { label: "Body Material", value: "ASTM A352 LCC / Super Duplex" },
          { label: "Seat", value: "Laminated graphite + Stellite overlay" },
          { label: "Torque", value: "30% lower than conventional designs" },
          { label: "Testing", value: "Cryo cycle, fire safe, fugitive emissions" },
          { label: "Bubble-Tight", value: "Zero leakage at cryogenic temps" },
        ],
        datasheet: "DS-CF800-Rev.11",
      },
    ],
    projectRefs: [
      "Sakhalin LNG — Complete butterfly valve package",
      "Cameron LNG — Large-bore cryogenic butterfly valves",
      "Tangguh LNG — Tank isolation butterfly valves",
    ],
    portfolioFit: {
      score: 88,
      reasoning: "Best-in-class for large-bore cryogenic butterfly valves. Fills the gap that ball valve manufacturers cannot cover above DN600. Premium quality (98/100) with the highest delivery rating in the dataset. Longer lead times offset by exceptional reliability.",
      strengths: [
        "Unmatched large-bore cryogenic butterfly valve capability (up to DN1500)",
        "Highest quality score (98/100) and delivery rating (99.2%)",
        "45+ years of LNG-specific experience",
      ],
      gaps: [
        "No ball valve or gate valve offering — single product type",
        "Longest lead times in comparison (20–28 weeks)",
        "Higher pricing due to premium positioning",
      ],
    },
    recommendations: [
      "Ideal complement to CryoValve for large-bore butterfly applications",
      "Request early engineering to lock in production slots (lead time is critical path)",
      "Explore frame agreement for multi-project butterfly valve standardization",
    ],
  },
  {
    name: "Arctic Flow Solutions",
    location: "Houston, TX, USA",
    match: 88,
    certs: ["API 6D", "Fire Safe API 607", "ASME B16.34", "SIL 3"],
    capacity: "900 units/yr",
    speciality: "Emergency shutdown valves",
    initials: "AF",
    established: "2001",
    employees: "280",
    revenue: "€95M",
    leadTime: "14–20 weeks",
    qualityScore: 89,
    deliveryRating: "95.8%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "ArcticESD E-500 — Emergency Shutdown Valve",
        specs: [
          { label: "Size Range", value: "DN100 – DN600 (4\" – 24\")" },
          { label: "Pressure Class", value: "ANSI 300 – 1500" },
          { label: "Temperature", value: "−162°C to +260°C" },
          { label: "SIL Rating", value: "SIL 3 per IEC 61508 / 61511" },
          { label: "Body Material", value: "ASTM A352 LCC / Inconel clad" },
          { label: "Closure Time", value: "< 3 seconds (fail-close)" },
          { label: "Fire Safe", value: "API 607 7th Ed." },
          { label: "Diagnostics", value: "Partial stroke test, smart positioner" },
        ],
        datasheet: "DS-E500-Rev.6",
      },
    ],
    projectRefs: [
      "Freeport LNG — ESD valve package (28 units)",
      "Sabine Pass LNG — Train 6 shutdown valves",
      "Driftwood LNG — Complete ESD system",
    ],
    portfolioFit: {
      score: 82,
      reasoning: "Specialized ESD valve manufacturer with strong US Gulf Coast project references. SIL 3 and fire safe certifications match critical safety requirements. Limited to ESD applications — not a general cryogenic valve supplier.",
      strengths: [
        "SIL 3 certified with < 3 second closure — exceeds most ESD requirements",
        "Fastest lead times in comparison (14–20 weeks)",
        "Strong US Gulf Coast LNG project track record",
      ],
      gaps: [
        "ESD-only product line — no process isolation valves",
        "No PED certification — limits EU/Middle East projects",
        "Delivery rating (95.8%) below portfolio average",
      ],
    },
    recommendations: [
      "Best choice for US-based LNG ESD valve packages — request quote for Train-specific scope",
      "Pair with CryoValve (process) + Nippon Cryo (butterfly) for complete valve package",
      "Request PED certification timeline if considering for EU/ME projects",
    ],
  },
  {
    name: "KryoTech Armaturen GmbH",
    location: "Düsseldorf, Germany",
    match: 85,
    certs: ["PED 2014/68/EU", "ATEX Zone 1", "SIL 3", "ISO 14001"],
    capacity: "500 units/yr",
    speciality: "SIL-rated cryogenic gate valves",
    initials: "KT",
    established: "1988",
    employees: "220",
    revenue: "€65M",
    leadTime: "18–26 weeks",
    qualityScore: 93,
    deliveryRating: "97.5%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "KryoGate KG-400 — SIL-Rated Cryogenic Gate Valve",
        specs: [
          { label: "Size Range", value: "DN80 – DN400 (3\" – 16\")" },
          { label: "Pressure Class", value: "ANSI 300 – 1500" },
          { label: "Temperature", value: "−196°C to +150°C" },
          { label: "SIL Rating", value: "SIL 3 per IEC 61508" },
          { label: "Body Material", value: "1.4408 / ASTM A351 CF8M" },
          { label: "ATEX", value: "Zone 1, Group IIA/IIB, T3" },
          { label: "Fugitive Emissions", value: "ISO 15848-1 Class AH" },
          { label: "Extended Bonnet", value: "Cryogenic design per BS 6364" },
        ],
        datasheet: "DS-KG400-Rev.9",
      },
    ],
    projectRefs: [
      "Hammerfest LNG — Cryogenic gate valve package",
      "German LNG Terminal — Complete gate valve scope",
      "Gate Terminal Rotterdam — SIL-rated isolation valves",
    ],
    portfolioFit: {
      score: 76,
      reasoning: "Niche specialist in SIL-rated cryogenic gate valves with strong European PED/ATEX compliance. Smaller size range (max DN400) limits applicability for large-bore requirements. Best for European LNG terminal projects requiring stringent ATEX certification.",
      strengths: [
        "Best-in-class fugitive emissions rating (ISO 15848-1 Class AH)",
        "Full PED + ATEX + SIL 3 triple certification — rare combination",
        "Strong European LNG terminal references",
      ],
      gaps: [
        "Limited size range — max DN400 (16\")",
        "Smallest capacity (500 units/yr) among compared suppliers",
        "No API 6D certification — limits Middle East / US project eligibility",
      ],
    },
    recommendations: [
      "Ideal for European LNG terminals requiring ATEX Zone 1 compliance",
      "Use for small-to-mid bore cryogenic gate valves (DN80–DN400)",
      "Recommend API 6D certification if targeting MENA/US project pipeline",
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
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">LNG Project References</h3>
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
