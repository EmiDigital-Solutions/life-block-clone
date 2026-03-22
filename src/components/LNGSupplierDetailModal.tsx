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
    name: "Đuro Đaković Specijalna Vozila d.d.",
    location: "Slavonski Brod, Croatia",
    match: 97,
    certs: ["ISO 9001", "EN 1090-2", "EN 15085-2", "ISO 3834-2", "CE Marking", "NATO AQAP"],
    capacity: "12,000 t/yr",
    speciality: "Heavy steel structures, pressure vessels, railway vehicles",
    initials: "ĐĐ",
    established: "1921",
    employees: "450",
    revenue: "€38M",
    leadTime: "8–14 weeks",
    qualityScore: 96,
    deliveryRating: "97.2%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "Heavy Steel Structure — Bridge & Infrastructure Components",
        specs: [
          { label: "Material", value: "S355J2+N / S460ML structural steel" },
          { label: "Max Plate Thickness", value: "80mm" },
          { label: "Max Unit Weight", value: "25 tonnes" },
          { label: "Welding", value: "EN ISO 3834-2, GMAW/SAW" },
          { label: "Surface Treatment", value: "SA 2.5 + epoxy + polyurethane" },
          { label: "NDT", value: "100% UT, MT, PT per EN 1090-2 EXC3" },
          { label: "Tolerance", value: "ISO 13920-B" },
          { label: "Certification", value: "EN 1090-2 EXC3, CE marked" },
        ],
        datasheet: "DS-STEEL-STRUCT-Rev.5",
      },
      {
        name: "Pressure Vessel — ASME / PED Compliant",
        specs: [
          { label: "Design Code", value: "EN 13445 / ASME VIII Div.1" },
          { label: "Max Pressure", value: "40 bar" },
          { label: "Material", value: "P265GH / 1.4571 stainless" },
          { label: "Max Diameter", value: "3,200mm" },
          { label: "Max Length", value: "12,000mm" },
          { label: "Welding", value: "WPS per EN ISO 15614" },
          { label: "Testing", value: "Hydrostatic + 100% RT" },
          { label: "Certification", value: "PED 2014/68/EU, Module H" },
        ],
        datasheet: "DS-PV-Rev.8",
      },
    ],
    projectRefs: [
      "Siemens Mobility — Railway bogie frames for Desiro HC platform",
      "Andritz Hydro — Penstock sections for Hydropower plant (Austria)",
      "Doppelmayr — Cable car station steel structures",
      "Croatian Railways — Complete wagon manufacturing program",
    ],
    portfolioFit: {
      score: 94,
      reasoning: "Đuro Đaković is Croatia's premier heavy industry manufacturer with over 100 years of steel fabrication heritage. Their EN 1090-2 EXC3 and EN 15085-2 certifications cover demanding railway and infrastructure applications. NATO AQAP qualification adds defense sector credibility. Located in Slavonski Brod with direct motorway access to EU markets.",
      strengths: [
        "100+ year heavy industry heritage — deep process maturity",
        "EN 1090-2 EXC3 + EN 15085-2 — covers most demanding steel fabrication scopes",
        "Active Siemens Mobility and Andritz supplier — proven EU export capability",
        "12,000 t/yr capacity — significant for Croatian market, scalable",
      ],
      gaps: [
        "Lead time 8–14 weeks — longer than some Western EU alternatives",
        "Limited stainless steel welding capacity — primarily carbon steel focused",
      ],
    },
    recommendations: [
      "Initiate supplier qualification audit for bridge component program",
      "Request capacity study for 2026 railway bogie frame order increase",
      "Evaluate stainless steel welding capability expansion investment",
      "Negotiate frame agreement with quarterly delivery schedule",
      "Audit NATO AQAP quality system for defense project eligibility",
    ],
  },
  {
    name: "Končar — Elektroindustrija d.d.",
    location: "Zagreb, Croatia",
    match: 94,
    certs: ["ISO 9001", "ISO 14001", "IEC 61439", "IEC 62271", "CE Marking", "ATEX"],
    capacity: "500+ transformers/yr",
    speciality: "Power transformers, switchgear, electric locomotives",
    initials: "KN",
    established: "1921",
    employees: "3,800",
    revenue: "€420M",
    leadTime: "12–20 weeks",
    qualityScore: 93,
    deliveryRating: "96.5%",
    riskLevel: "Low",
    financialHealth: "Strong",
    products: [
      {
        name: "Power Distribution Transformer 10/0.4 kV",
        specs: [
          { label: "Power Rating", value: "100–2,500 kVA" },
          { label: "Primary Voltage", value: "6–35 kV" },
          { label: "Cooling", value: "ONAN / ONAF" },
          { label: "Losses", value: "Tier 2 per EU 548/2014" },
          { label: "Insulation", value: "Mineral oil / ester" },
          { label: "Testing", value: "Routine + type per IEC 60076" },
          { label: "Noise Level", value: "≤55 dB(A)" },
          { label: "Lifetime", value: ">30 years" },
        ],
        datasheet: "DS-TRAFO-DT-Rev.6",
      },
    ],
    projectRefs: [
      "HEP — Croatian national grid transformer supply (ongoing)",
      "ELES (Slovenia) — 110kV substation equipment",
      "DB Energie (Germany) — Traction transformer prototypes",
      "IEC TC 14 — Active standards committee participation",
    ],
    portfolioFit: {
      score: 91,
      reasoning: "Končar is Croatia's largest industrial conglomerate and a recognized European transformer manufacturer. Their 100+ year electrical engineering heritage, IEC-compliant production, and existing EU utility supply contracts demonstrate export readiness. The Zagreb campus integrates R&D, production, and testing — unique vertical integration for the region.",
      strengths: [
        "Croatia's largest industrial group — financial stability and scale",
        "Active EU utility supplier (HEP, ELES) — proven cross-border delivery",
        "Vertically integrated: R&D + winding + core assembly + testing on one campus",
      ],
      gaps: [
        "12–20 week lead time — typical for custom transformers",
        "Limited presence in North American market (different standards)",
        "Competition from lower-cost Turkish and Chinese transformer manufacturers",
      ],
    },
    recommendations: [
      "Arrange factory visit to Zagreb campus for transformer production assessment",
      "Request IEC 60076 type test reports for 630 kVA distribution transformer",
      "Evaluate Končar's medium-voltage switchgear portfolio for package deal",
    ],
  },
  {
    name: "AD Plastik d.d.",
    location: "Solin, Croatia",
    match: 91,
    certs: ["ISO 9001", "IATF 16949", "ISO 14001", "ISO 45001", "VDA 6.3"],
    capacity: "35M parts/yr",
    speciality: "Automotive interior & exterior plastic components",
    initials: "AP",
    established: "1952",
    employees: "2,100",
    revenue: "€120M",
    leadTime: "6–10 weeks",
    qualityScore: 95,
    deliveryRating: "98.4%",
    riskLevel: "Low",
    financialHealth: "Stable",
    products: [
      {
        name: "Automotive Interior Trim Panel — Injection Molded",
        specs: [
          { label: "Material", value: "PP-T20, ABS/PC, PA6-GF30" },
          { label: "Max Part Size", value: "1,200 × 800mm" },
          { label: "Clamping Force", value: "Up to 3,200 tonnes" },
          { label: "Surface Finish", value: "VDI 3400 texture, grain per OEM spec" },
          { label: "Tolerance", value: "ISO 20457 Class A" },
          { label: "Decoration", value: "In-mold graining, chrome-look, soft-touch" },
          { label: "Assembly", value: "Ultrasonic welding, clip integration" },
          { label: "Testing", value: "Scratch, UV aging, emissions VOC per VDA 270" },
        ],
        datasheet: "DS-INTRIM-Rev.9",
      },
    ],
    projectRefs: [
      "Renault-Nissan — Dashboard and door panel components (Dacia platform)",
      "Volkswagen — Interior trim for Škoda Octavia / Superb",
      "Ford — Exterior trim components for Transit Connect",
      "PSA/Stellantis — A/B/C pillar covers, glove box assemblies",
    ],
    portfolioFit: {
      score: 88,
      reasoning: "AD Plastik is a Tier 1 automotive supplier with IATF 16949 certification and active supply contracts with Renault-Nissan, VW, Ford, and Stellantis. Their injection molding capacity of 35M parts/yr and VDA 6.3 process audit compliance demonstrate automotive-grade manufacturing excellence. Plants in Croatia and Romania provide EU production flexibility.",
      strengths: [
        "Tier 1 automotive supplier — active VW, Renault-Nissan, Ford contracts",
        "IATF 16949 + VDA 6.3 — full automotive quality system compliance",
        "35M parts/yr capacity with EU dual-plant flexibility (HR + RO)",
      ],
      gaps: [
        "Primarily automotive-focused — limited non-auto industry experience",
        "Higher tooling costs vs. Chinese injection molding alternatives",
        "No metal component capability — plastics only",
      ],
    },
    recommendations: [
      "Arrange VDA 6.3 process audit of Solin plant for dashboard components",
      "Request PPAP package for representative interior trim component",
      "Evaluate AD Plastik's mold design & build capability for new programs",
    ],
  },
  {
    name: "Brodosplit d.d.",
    location: "Split, Croatia",
    match: 89,
    certs: ["ISO 9001", "ISO 3834-2", "EN 1090-2", "DNV GL", "Lloyd's Register", "Bureau Veritas"],
    capacity: "80,000 DWT/yr",
    speciality: "Shipbuilding, offshore structures, complex steel fabrication",
    initials: "BS",
    established: "1932",
    employees: "1,200",
    revenue: "€85M",
    leadTime: "16–24 weeks",
    qualityScore: 92,
    deliveryRating: "95.8%",
    riskLevel: "Medium",
    financialHealth: "Restructuring",
    products: [
      {
        name: "Offshore Platform Module — Structural Steel Assembly",
        specs: [
          { label: "Material", value: "AH36/DH36 shipbuilding steel" },
          { label: "Max Module Weight", value: "500 tonnes (lifted)" },
          { label: "Welding Process", value: "FCAW / SAW per AWS D1.1" },
          { label: "NDT Coverage", value: "100% UT + MT on Class I joints" },
          { label: "Coating", value: "NORSOK M-501 System 1" },
          { label: "Fire Protection", value: "SOLAS A-60 rated" },
          { label: "Classification", value: "DNV GL / Lloyd's Register" },
          { label: "Max Dimensions", value: "40m × 20m × 15m" },
        ],
        datasheet: "DS-OFFSHORE-Rev.3",
      },
    ],
    projectRefs: [
      "Saipem — Offshore jacket structures for Adriatic gas platform",
      "Jan De Nul — Vessel hull sections and superstructure",
      "Croatian Navy — Patrol vessel construction program",
      "TUI Cruises — Cruise ship block sections",
    ],
    portfolioFit: {
      score: 85,
      reasoning: "Brodosplit is Croatia's largest shipyard with classification society approvals from DNV GL, Lloyd's, and Bureau Veritas. Their heavy steel fabrication capability extends beyond ships to offshore structures and large industrial assemblies. The Split waterfront location enables direct sea transport of oversized components. Financial restructuring is ongoing but production capability remains strong.",
      strengths: [
        "Multi-class society approvals — DNV GL, Lloyd's, Bureau Veritas",
        "Heavy lift and oversized fabrication up to 500t modules",
        "Direct waterfront access — ship/barge loading for oversized delivery",
      ],
      gaps: [
        "Financial restructuring — buyer should verify creditworthiness",
        "16–24 week lead time — complex project scheduling required",
        "Workforce retention challenges during restructuring period",
      ],
    },
    recommendations: [
      "Conduct financial due diligence before major purchase commitment",
      "Visit Split facility for offshore module fabrication capability assessment",
      "Request welder qualification records and NDT operator certifications",
    ],
  },
  {
    name: "Rimac Technology d.o.o.",
    location: "Sveta Nedelja, Croatia",
    match: 86,
    certs: ["ISO 9001", "IATF 16949", "ISO 26262 (ASIL-D)", "ISO 14001", "UN ECE R100"],
    capacity: "5,000 units/yr",
    speciality: "High-voltage battery systems, e-powertrain components, electronics",
    initials: "RT",
    established: "2009",
    employees: "2,500",
    revenue: "€180M",
    leadTime: "10–16 weeks",
    qualityScore: 94,
    deliveryRating: "96.1%",
    riskLevel: "Low",
    financialHealth: "Very Strong",
    products: [
      {
        name: "HV Battery Module — 800V Architecture",
        specs: [
          { label: "Voltage", value: "800V nominal" },
          { label: "Energy", value: "120 kWh (configurable)" },
          { label: "Cell Chemistry", value: "NMC 811 / LFP options" },
          { label: "Cooling", value: "Immersion / bottom plate" },
          { label: "BMS", value: "Rimac proprietary, ASIL-D" },
          { label: "Safety", value: "UN ECE R100, thermal runaway tested" },
          { label: "Weight", value: "480 kg (excl. enclosure)" },
          { label: "Lifecycle", value: ">2,000 cycles to 80% SoH" },
        ],
        datasheet: "DS-HVBAT-800V-Rev.4",
      },
    ],
    projectRefs: [
      "Bugatti — Rimac Nevera battery system & e-axle",
      "Porsche — Technology partnership for EV components",
      "Hyundai Motor Group — Battery technology development",
      "Koenigsegg — Gemera powertrain battery supply",
    ],
    portfolioFit: {
      score: 82,
      reasoning: "Rimac Technology is Croatia's highest-profile technology company and a Tier 1 EV powertrain supplier to hypercar and premium OEMs. Their Sveta Nedelja campus houses state-of-the-art battery module assembly, motor winding, and power electronics production. IATF 16949 and ISO 26262 ASIL-D certified. Strong R&D capability but primarily focused on high-value, lower-volume applications.",
      strengths: [
        "Croatia's most advanced technology company — global brand recognition",
        "IATF 16949 + ISO 26262 ASIL-D — automotive functional safety certified",
        "Active hypercar OEM supplier: Bugatti, Porsche, Hyundai partnership",
      ],
      gaps: [
        "Lower volume capability — 5,000 units/yr vs. mass production suppliers",
        "Premium pricing appropriate for hypercar segment, not mass market",
        "Young company (2009) — limited long-term track record vs. established suppliers",
      ],
    },
    recommendations: [
      "Evaluate Rimac's power electronics modules for industrial EV applications",
      "Visit new Rimac Campus for battery assembly and testing capability assessment",
      "Explore technology licensing for BMS intellectual property",
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
