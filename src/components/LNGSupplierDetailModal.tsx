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
    name: "Nidec Corporation",
    location: "Kyoto, Japan",
    match: 97,
    certs: ["ISO 9001", "IATF 16949", "IEC 60034", "UL Recognized", "RoHS", "REACH"],
    capacity: "12M motors/yr",
    speciality: "Brushless DC motors & drive units for power tools",
    initials: "ND",
    established: "1973",
    employees: "107,000",
    revenue: "€14.2B",
    leadTime: "6–10 weeks",
    qualityScore: 96,
    deliveryRating: "98.1%",
    riskLevel: "Low",
    financialHealth: "Strong",
    products: [
      {
        name: "BLDC-4270 — 36V Brushless Motor Assembly",
        specs: [
          { label: "Rated Power", value: "1,510W continuous" },
          { label: "Max Speed", value: "32,000 rpm (no load)" },
          { label: "Torque", value: "4.8 Nm peak" },
          { label: "Efficiency", value: "92% at rated load" },
          { label: "Weight", value: "480g (incl. housing)" },
          { label: "Winding", value: "12-slot 10-pole, Class H insulation" },
          { label: "Bearing", value: "NSK sealed ball bearing, 8,000h MTBF" },
          { label: "Protection", value: "IP5X dust ingress rated" },
        ],
        datasheet: "DS-BLDC4270-Rev.7",
      },
      {
        name: "ECM-1850 — 18V Compact Motor Unit",
        specs: [
          { label: "Rated Power", value: "850W continuous" },
          { label: "Max Speed", value: "28,000 rpm" },
          { label: "Torque", value: "2.1 Nm peak" },
          { label: "Efficiency", value: "89% at rated load" },
          { label: "Weight", value: "310g" },
          { label: "Commutation", value: "Sensorless FOC" },
          { label: "Thermal Protection", value: "Integrated NTC, 155°C cutoff" },
          { label: "Connector", value: "6-pin Molex press-fit" },
        ],
        datasheet: "DS-ECM1850-Rev.4",
      },
    ],
    projectRefs: [
      "Hilti — TE 60-ATC/AVR motor platform (2022–present)",
      "Makita — 40V XGT brushless motor series",
      "Bosch — ProCORE motor assembly line",
      "Stanley Black & Decker — FlexVolt drive units",
    ],
    portfolioFit: {
      score: 94,
      reasoning: "Nidec is the world's largest motor manufacturer with deep power tool expertise. Their BLDC motor technology covers 90% of Hilti's rotary hammer and drill motor requirements. Vertical integration (magnets, windings, bearings) reduces supply chain risk. Existing Hilti supply relationship strengthens qualification position.",
      strengths: [
        "World's #1 motor manufacturer — unmatched scale and R&D depth",
        "Active Hilti supplier for TE 60-ATC motor platform since 2022",
        "Vertical integration: magnets, stators, rotors, bearings in-house",
        "12M units/yr capacity — can absorb volume spikes without lead time impact",
      ],
      gaps: [
        "Lead time 6–10 weeks — longer than some regional alternatives",
        "Japan-centric production — freight cost and transit time for EU delivery",
      ],
    },
    recommendations: [
      "Extend frame agreement to cover next-generation 36V motor platform",
      "Order qualification audit for new Nidec Mexico plant (closer to US operations)",
      "Request thermal endurance test data for Class H insulation at 155°C sustained",
      "Negotiate safety stock agreement — 4-week buffer at Nidec's EU distribution hub",
      "Evaluate Nidec's integrated motor+controller modules for cost reduction",
    ],
  },
  {
    name: "Samsung SDI",
    location: "Yongin, South Korea",
    match: 94,
    certs: ["ISO 9001", "ISO 14001", "UN 38.3", "IEC 62133", "UL 2054", "KC Mark"],
    capacity: "500 GWh/yr",
    speciality: "Li-ion battery cells & packs for professional tools",
    initials: "SS",
    established: "1970",
    employees: "31,000",
    revenue: "€8.9B",
    leadTime: "8–14 weeks",
    qualityScore: 93,
    deliveryRating: "96.8%",
    riskLevel: "Low",
    financialHealth: "Very Strong",
    products: [
      {
        name: "INR21700-50G — High-drain Li-ion Cell",
        specs: [
          { label: "Nominal Capacity", value: "5,000 mAh" },
          { label: "Nominal Voltage", value: "3.6V" },
          { label: "Max Discharge", value: "25A continuous" },
          { label: "Energy Density", value: "260 Wh/kg" },
          { label: "Cycle Life", value: ">500 cycles to 80% SoH" },
          { label: "Weight", value: "68.5g" },
          { label: "Operating Temp", value: "-20°C to +60°C" },
          { label: "Safety", value: "CID + PTC + ceramic separator" },
        ],
        datasheet: "DS-INR21700-50G-Rev.9",
      },
    ],
    projectRefs: [
      "Hilti — Nuron 22V battery platform cell supply",
      "Bosch — ProCORE 18V battery cells",
      "Festool — 18V battery pack development",
      "TTI Group — Milwaukee M18 cell qualification",
    ],
    portfolioFit: {
      score: 91,
      reasoning: "Samsung SDI is a top-3 global battery cell manufacturer with proven power tool credentials. Their 21700 cells deliver the high-drain performance required for rotary hammers and demolition tools. Existing Hilti Nuron supply relationship ensures process alignment. Long lead times are the primary risk factor.",
      strengths: [
        "Top-3 global Li-ion cell manufacturer — proven scale and quality",
        "Active Hilti Nuron 22V platform supplier",
        "260 Wh/kg energy density — best-in-class for power tool applications",
      ],
      gaps: [
        "8–14 week lead time — requires careful demand planning",
        "Cell allocation priority may shift during EV industry demand surges",
        "Korea-centric production — geopolitical supply chain considerations",
      ],
    },
    recommendations: [
      "Secure 12-month cell allocation agreement to protect against EV demand spikes",
      "Request next-generation 46800-format cell samples for future platform evaluation",
      "Audit Samsung SDI Malaysia plant as alternative production site for risk diversification",
    ],
  },
  {
    name: "Georg Fischer (GF Machining)",
    location: "Schaffhausen, Switzerland",
    match: 91,
    certs: ["ISO 9001", "ISO 14001", "IATF 16949", "EN 9100", "CE Marking"],
    capacity: "850K housings/yr",
    speciality: "Precision die-cast & machined housings for power tools",
    initials: "GF",
    established: "1802",
    employees: "15,100",
    revenue: "€4.1B",
    leadTime: "4–8 weeks",
    qualityScore: 95,
    deliveryRating: "97.5%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "DC-7050 — Magnesium Die-Cast Tool Housing",
        specs: [
          { label: "Material", value: "AZ91D magnesium alloy" },
          { label: "Wall Thickness", value: "1.8–3.2mm" },
          { label: "Surface Finish", value: "Ra 1.6 μm (as-cast)" },
          { label: "Dimensional Tolerance", value: "±0.05mm on critical features" },
          { label: "Weight Reduction", value: "33% lighter vs. aluminum" },
          { label: "Porosity", value: "<0.5% by X-ray (ASTM E505)" },
          { label: "Coating", value: "E-coat + powder coat, 500h salt spray" },
          { label: "Annual Volume", value: "250K–850K units" },
        ],
        datasheet: "DS-DC7050-Rev.5",
      },
    ],
    projectRefs: [
      "Hilti — TE 500-AVR housing series (magnesium)",
      "Stihl — Chainsaw crankcase die-casting",
      "Husqvarna — Power cutter housing program",
      "Miele — Precision motor housing for vacuum systems",
    ],
    portfolioFit: {
      score: 88,
      reasoning: "GF is a world leader in precision casting and machining with 220+ years of manufacturing heritage. Their magnesium die-casting capability directly addresses Hilti's weight reduction targets for next-gen tools. Swiss quality culture aligns with Hilti's precision requirements.",
      strengths: [
        "220+ year manufacturing heritage — unmatched process maturity",
        "Active Hilti supplier for TE 500-AVR magnesium housings",
        "EU-based production — short logistics chain, no tariff risk",
      ],
      gaps: [
        "Capacity limited to 850K/yr — may constrain high-volume product launches",
        "Higher unit cost vs. Asian die-casting alternatives",
        "No plastic injection capability — secondary supplier needed for polymer housings",
      ],
    },
    recommendations: [
      "Negotiate capacity reservation for 2026 next-gen tool platform launch",
      "Request feasibility study for thin-wall (<1.5mm) magnesium housing designs",
      "Explore GF's additive manufacturing capability for rapid prototyping",
    ],
  },
  {
    name: "Infineon Technologies",
    location: "Neubiberg, Germany",
    match: 89,
    certs: ["ISO 9001", "IATF 16949", "AEC-Q100", "IPC-A-610", "RoHS", "REACH"],
    capacity: "2B chips/yr",
    speciality: "Power semiconductors & motor controllers for cordless tools",
    initials: "IF",
    established: "1999",
    employees: "56,200",
    revenue: "€16.3B",
    leadTime: "10–16 weeks",
    qualityScore: 92,
    deliveryRating: "94.2%",
    riskLevel: "Medium",
    financialHealth: "Very Strong",
    products: [
      {
        name: "MOTIX™ IMD700A — Integrated Motor Driver",
        specs: [
          { label: "Voltage Range", value: "8–60V" },
          { label: "Phase Current", value: "30A continuous" },
          { label: "MOSFET RDS(on)", value: "3.8 mΩ (per phase)" },
          { label: "PWM Frequency", value: "Up to 100 kHz" },
          { label: "Package", value: "QFN 7×7mm" },
          { label: "Protection", value: "OCP, OVP, OTP, UVLO" },
          { label: "Sensorless Control", value: "FOC with flux observer" },
          { label: "Operating Temp", value: "-40°C to +150°C" },
        ],
        datasheet: "DS-IMD700A-Rev.3",
      },
    ],
    projectRefs: [
      "Hilti — Nuron platform motor controller IC design-in",
      "Bosch — eBike motor controller series",
      "Dyson — Digital motor driver program",
      "Nidec — Integrated motor+controller modules",
    ],
    portfolioFit: {
      score: 85,
      reasoning: "Infineon is the #1 power semiconductor supplier globally with strong motor control expertise. Their MOTIX platform is designed specifically for brushless motor applications in cordless tools. Existing Hilti design-in for Nuron platform reduces re-qualification risk. Long lead times are the main constraint.",
      strengths: [
        "#1 global power semiconductor company — deep application expertise",
        "Active Hilti design-in for Nuron motor controller platform",
        "Automotive-grade quality (AEC-Q100) exceeds tool industry standards",
      ],
      gaps: [
        "10–16 week lead time — semiconductor cycle sensitivity",
        "Delivery rating 94.2% — below portfolio target of 96%+",
        "Single-source risk if no second supplier qualified for critical ICs",
      ],
    },
    recommendations: [
      "Establish 6-month rolling forecast commitment to secure allocation priority",
      "Qualify Texas Instruments as second source for motor driver ICs",
      "Request Infineon application engineering support for next-gen sensorless FOC tuning",
    ],
  },
  {
    name: "Bossard Group",
    location: "Zug, Switzerland",
    match: 86,
    certs: ["ISO 9001", "ISO 14001", "IATF 16949", "VDA 6.3", "EN 15048"],
    capacity: "4B fasteners/yr",
    speciality: "Precision fasteners, assembly components & smart logistics",
    initials: "BG",
    established: "1831",
    employees: "2,800",
    revenue: "€1.1B",
    leadTime: "2–6 weeks",
    qualityScore: 94,
    deliveryRating: "99.1%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "ecosyn® — Thread-forming Screws for Tool Assembly",
        specs: [
          { label: "Material", value: "Case-hardened steel, Class 10.9" },
          { label: "Thread Type", value: "Trilobular thread-forming" },
          { label: "Drive", value: "TORX PLUS® T25" },
          { label: "Coating", value: "ecosyn®-lubric (friction-controlled)" },
          { label: "Clamp Force", value: "±10% consistency across 100K cycles" },
          { label: "Sizes", value: "M3–M8, lengths 6–40mm" },
          { label: "Salt Spray", value: ">720h per ISO 9227" },
          { label: "Smart Factory", value: "SmartBin IoT replenishment" },
        ],
        datasheet: "DS-ECOSYN-Rev.11",
      },
    ],
    projectRefs: [
      "Hilti — Assembly fastener program (all tool platforms)",
      "Siemens — Switchgear assembly fastener standardization",
      "ABB — SmartBin logistics pilot for robotics assembly",
      "Schindler — Elevator assembly fastener program",
    ],
    portfolioFit: {
      score: 82,
      reasoning: "Bossard is a premium fastener and assembly technology specialist with deep expertise in thread-forming and friction-controlled coatings. Their SmartBin IoT system automates replenishment, reducing line-stop risk. Active Hilti supplier across all tool assembly platforms. Highest delivery rating in the portfolio (99.1%).",
      strengths: [
        "Active Hilti assembly fastener supplier across all platforms",
        "99.1% delivery rating — best in portfolio",
        "SmartBin IoT — automated replenishment eliminates stockout risk",
      ],
      gaps: [
        "Limited to fastener/assembly components — no structural parts capability",
        "Premium pricing vs. Asian fastener alternatives",
        "Smaller company scale vs. other portfolio suppliers",
      ],
    },
    recommendations: [
      "Expand SmartBin deployment to Hilti Thüringen plant assembly lines",
      "Request total cost analysis (fastener + assembly time savings) vs. standard screws",
      "Evaluate Bossard's assembly process consulting for next-gen tool design-for-assembly",
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
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Speciality</h3>
                  <p className="text-foreground">{supplier.speciality}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Project References</h3>
                  <div className="space-y-2">
                    {supplier.projectRefs.map((ref, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{ref}</p>
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
                    { label: "Quality Score", value: `${supplier.qualityScore}/100`, color: supplier.qualityScore >= 90 ? "text-primary" : "text-foreground" },
                    { label: "Delivery Rating", value: supplier.deliveryRating, color: "text-primary" },
                    { label: "Risk Level", value: supplier.riskLevel, color: supplier.riskLevel === "Low" ? "text-secondary" : "text-[hsl(var(--warning))]" },
                    { label: "Financial Health", value: supplier.financialHealth, color: "text-secondary" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Performance Trend</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Quality and delivery metrics have been stable or improving over the last 4 assessment periods. No significant deviations or escalation triggers detected.</p>
                </div>
              </div>
            )}

            {/* Product Specs */}
            {activeTab === 2 && (
              <div className="space-y-6">
                {supplier.products.map((product, pi) => (
                  <div key={pi} className="border border-border">
                    <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
                      <h3 className="text-sm font-bold text-foreground">{product.name}</h3>
                      <span className="text-[10px] font-mono text-muted-foreground">{product.datasheet}</span>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {product.specs.map((spec, si) => (
                          <div key={si}>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">{spec.label}</p>
                            <p className="text-sm font-medium text-foreground">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Portfolio Fit */}
            {activeTab === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{supplier.portfolioFit.score}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Fit Score</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">{supplier.portfolioFit.reasoning}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" /> Strengths
                    </h3>
                    <div className="space-y-2">
                      {supplier.portfolioFit.strengths.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-foreground">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))]" /> Gaps & Limitations
                    </h3>
                    <div className="space-y-2">
                      {supplier.portfolioFit.gaps.map((g, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 text-[hsl(var(--warning))] mt-1 flex-shrink-0" />
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
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">AI-Generated Recommendations</h3>
                </div>
                {supplier.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 border border-border">
                    <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{rec}</p>
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
