import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, FileText, Camera, Ruler, Eye, Download, Bot, Send,
  CheckCircle2, XCircle, Clock, AlertTriangle, Shield, Gavel,
  ChevronRight, File, MessageSquare, ThumbsUp, ThumbsDown,
  Scale, ExternalLink, Bell, User
} from "lucide-react";

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
interface SupplierClaim {
  id: string;
  title: string;
  equipment: string;
  tag: string;
  severity: "critical" | "major";
  status: "pending-review" | "accepted" | "disputed" | "partially-accepted" | "change-request";
  claimAmount: number;
  liquidatedDamages: number;
  penaltyPerDay: number;
  delayDays: number;
  receivedDate: string;
  deadline: string;
  daysRemaining: number;
  clientName: string;
  projectName: string;
  contractRef: string;
  findings: string[];
  evidence: { name: string; type: string; date: string; by: string }[];
  claimLetterText: string;
  supplierOptions: string[];
}

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const supplierClaims: SupplierClaim[] = [
  {
    id: "CLM-2024-001",
    title: "Weld Integrity Failure — Longitudinal Seam",
    equipment: "Deethanizer Condenser",
    tag: "G1-22E05",
    severity: "critical",
    status: "pending-review",
    claimAmount: 892000,
    liquidatedDamages: 1540000,
    penaltyPerDay: 22000,
    delayDays: 70,
    receivedDate: "2024-10-25",
    deadline: "2024-11-08",
    daysRemaining: 3,
    clientName: "LNG Mega-Project Phase II",
    projectName: "Arctic LNG-2 Train 3",
    contractRef: "PO-LNG-2024-0847 · FIDIC Cl. 11.1",
    findings: [
      "Surface crack 40mm in HAZ — zero tolerance per GOST §5.2",
      "Linear indication on RT film — confirmed by Level III",
      "Excessive reinforcement 4.2mm (max 3mm)",
      "Undercut 0.8mm exceeds 0.5mm limit",
      "Incomplete WPS/PQR documentation (3 of 7 missing)",
    ],
    evidence: [
      { name: "VT-Report-E05-LS-001.pdf", type: "report", date: "2024-10-15", by: "Inspector A. Petrov" },
      { name: "MPI-Film-HAZ-Zone-A.jpg", type: "photo", date: "2024-10-15", by: "NDT Level II K. Smirnov" },
      { name: "RT-Film-LS-001-Scan.dcm", type: "scan", date: "2024-10-16", by: "RT Operator M. Chen" },
      { name: "Weld-Measurement-Report.pdf", type: "measurement", date: "2024-10-15", by: "QC Engineer P. Singh" },
      { name: "NCR-2024-0312.pdf", type: "document", date: "2024-10-17", by: "QC Manager D. Fischer" },
      { name: "Hydro-Test-Hold-Notice.pdf", type: "document", date: "2024-10-18", by: "Project Engineer R. Kumar" },
      { name: "Crack-Propagation-Video.mp4", type: "video", date: "2024-10-15", by: "Inspector A. Petrov" },
      { name: "EN-10204-3.2-Certificate.pdf", type: "certificate", date: "2024-09-01", by: "Volga QA Dept." },
    ],
    claimLetterText: `FORMAL CLAIM NOTICE — CLM-2024-001

To: Volga Heavy Machinery JSC — Quality Assurance Department
From: RCA Project Management — LNG Mega-Project Phase II
Date: 2024-10-25
Reference: PO-LNG-2024-0847 · NCR-2024-0312

Subject: Claim for Defective Workmanship — Deethanizer Condenser G1-22E05

Dear Sir/Madam,

We hereby notify you of a formal claim under FIDIC Red Book Clause 11.1 (Defects Liability) and Purchase Order Terms & Conditions §8.3 for defective workmanship identified during Third-Party Inspection.

═══════════════════════════════════
DEFECT SUMMARY
═══════════════════════════════════

1. Surface crack extending 40mm into Heat Affected Zone (HAZ) at longitudinal seam weld toe
2. Radiographic examination confirms linear indication — incomplete fusion at root (42mm length)
3. Weld reinforcement measured at 4.2mm, exceeding maximum allowable 3.0mm per GOST-34347 §5.2
4. Undercut depth 0.8mm exceeds 0.5mm specification limit
5. Incomplete WPS/PQR documentation package (3 of 7 documents missing)

═══════════════════════════════════
FINANCIAL IMPACT
═══════════════════════════════════

Direct repair and re-inspection costs:     $892,000
Liquidated Damages (70d × $22,000/d):   $1,540,000
─────────────────────────────────────
Total claim value:                       $2,432,000

═══════════════════════════════════
LEGAL BASIS
═══════════════════════════════════

Per FIDIC Red Book Cl. 11.1, the Contractor is liable for all costs arising from defects attributable to workmanship. Evidence chain established through 14 documented inspection records.

═══════════════════════════════════
REQUIRED ACTION
═══════════════════════════════════

⚠ Supplier must ACCEPT or DISPUTE this claim within 14 calendar days.

Failure to respond by 2024-11-08 will result in automatic acceptance per Contract §12.1 and escalation to Dispute Resolution.

This claim is supported by AI-verified evidence chain with full traceability.

──────────────────────────
RCA Claims Management System
Atlas AI — Claim Module v3.2`,
    supplierOptions: [
      "Accept Full Claim — acknowledge all findings and financial liability",
      "Accept Partial — accept defect findings, dispute LD calculation",
      "Dispute — provide counter-evidence within 14 days",
      "Request Extension — additional 7 days for technical review",
    ],
  },
  {
    id: "CLM-2024-002",
    title: "Coating System Failure — Surface Prep Below Grade",
    equipment: "Amine Circulation Pump Casing",
    tag: "P1-31P01",
    severity: "major",
    status: "pending-review",
    claimAmount: 345000,
    liquidatedDamages: 660000,
    penaltyPerDay: 15000,
    delayDays: 44,
    receivedDate: "2024-11-10",
    deadline: "2024-11-24",
    daysRemaining: 8,
    clientName: "LNG Mega-Project Phase II",
    projectName: "Arctic LNG-2 Train 3",
    contractRef: "PO-LNG-2024-1203 · Contract §6.2",
    findings: [
      "Surface preparation Sa 2.0 instead of required Sa 2.5",
      "DFT primer 62μm — below 60μm lower tolerance",
      "3 pinholes/m² detected by holiday test",
    ],
    evidence: [
      { name: "Blast-Profile-Comparison.pdf", type: "report", date: "2024-11-05", by: "Coating Inspector T. Kowalski" },
      { name: "DFT-Readings-Report.xlsx", type: "measurement", date: "2024-11-05", by: "Coating Inspector T. Kowalski" },
      { name: "Holiday-Test-Map.pdf", type: "scan", date: "2024-11-06", by: "QC Inspector Y. Tanaka" },
      { name: "NCR-2024-0398.pdf", type: "document", date: "2024-11-07", by: "QC Manager D. Fischer" },
    ],
    claimLetterText: `FORMAL CLAIM NOTICE — CLM-2024-002

To: KazPipe Industries LLP — Quality Department
From: RCA Project Management
Date: 2024-11-10

Subject: Coating Non-Conformance — Amine Circulation Pump P1-31P01

DEFECT SUMMARY:
1. Surface preparation Sa 2.0 — specification requires Sa 2.5
2. DFT primer 62μm — below minimum 60μm tolerance
3. Holiday detection: 3 pinholes per m²

FINANCIAL IMPACT:
- Re-blast and re-coat: $345,000
- Liquidated Damages: 44d × $15,000/d = $660,000
- Total: $1,005,000

⚠ Supplier must respond within 14 calendar days.

RCA Claims Management System`,
    supplierOptions: [
      "Accept Full Claim",
      "Accept Partial — dispute LD amount",
      "Dispute — provide counter-evidence",
      "Request Extension",
    ],
  },
  {
    id: "CLM-2024-004",
    title: "Vibration Exceeds API Limit — Compressor",
    equipment: "Propane Compressor",
    tag: "G1-51K01",
    severity: "critical",
    status: "partially-accepted",
    claimAmount: 185000,
    liquidatedDamages: 810000,
    penaltyPerDay: 18000,
    delayDays: 45,
    receivedDate: "2024-12-01",
    deadline: "2024-12-15",
    daysRemaining: 0,
    clientName: "LNG Mega-Project Phase II",
    projectName: "Arctic LNG-2 Train 3",
    contractRef: "API 617 · Contract §9.1",
    findings: [
      "Vibration 4.5 mm/s exceeds API 617 limit (3.5 mm/s)",
      "Coupling misalignment suspected",
      "Baseplate grouting voids detected by borescope",
    ],
    evidence: [
      { name: "Vibration-Analysis-Report.pdf", type: "report", date: "2026-02-22", by: "Vibration Analyst" },
      { name: "Alignment-Laser-Readings.xlsx", type: "measurement", date: "2026-02-22", by: "Alignment Specialist" },
      { name: "Baseplate-Borescope-Video.mp4", type: "video", date: "2026-02-23", by: "Inspector" },
    ],
    claimLetterText: `FORMAL CLAIM NOTICE — CLM-2024-004

Subject: API 617 Non-Conformance — Propane Compressor G1-51K01

Vibration at 4.5 mm/s exceeds API 617 max 3.5 mm/s.

FINANCIAL IMPACT:
- Repair & specialist: $185,000
- LD: 45d × $18,000/d = $810,000
- Total: $995,000

⚠ Response required within 14 calendar days.

RCA Claims Management System`,
    supplierOptions: [
      "Accept Full Claim",
      "Accept Partial",
      "Dispute",
      "Request Extension",
    ],
  },
  {
    id: "CR-2024-005",
    title: "Mid-Fabrication Design Change — Client Specification Rev",
    equipment: "Cryogenic Piping Spool — Area 300",
    tag: "SP-300-CR-12",
    severity: "major",
    status: "change-request",
    claimAmount: 0,
    liquidatedDamages: 0,
    penaltyPerDay: 0,
    delayDays: 0,
    receivedDate: "2025-01-15",
    deadline: "2025-01-29",
    daysRemaining: 12,
    clientName: "LNG Mega-Project Phase II",
    projectName: "Arctic LNG-2 Train 3",
    contractRef: "FIDIC Cl. 13.1 · Variation Order VO-2025-018",
    findings: [
      "Client issued Spec Rev.06 changing material from SS316L to Duplex 2205 — mid-fabrication",
      "12 spools already fabricated per Rev.05 — must be scrapped or reworked",
      "New material requires revised WPS/PQR qualification (6–8 weeks)",
      "Heat treatment requirements change from solution annealing to full PWHT",
      "All existing NDT records void — complete re-inspection required",
    ],
    evidence: [
      { name: "Variation-Order-VO-2025-018.pdf", type: "document", date: "2025-01-15", by: "Client Engineering" },
      { name: "Spec-Rev05-vs-Rev06-Comparison.pdf", type: "report", date: "2025-01-15", by: "Client Engineering" },
      { name: "Fabricated-Spools-Inventory.xlsx", type: "measurement", date: "2025-01-16", by: "Production Manager" },
      { name: "Material-Certificate-SS316L-Scrapped.pdf", type: "certificate", date: "2024-11-01", by: "Mill Certificate" },
      { name: "WPS-PQR-Requalification-Plan.pdf", type: "report", date: "2025-01-17", by: "Welding Engineer" },
      { name: "New-Duplex-2205-Procurement-Quote.pdf", type: "document", date: "2025-01-18", by: "Procurement Dept." },
    ],
    claimLetterText: `CHANGE REQUEST NOTIFICATION — CR-2024-005
═══════════════════════════════════════════════

To: Volga Heavy Machinery JSC — Production & Planning
From: RCA Project Management — on behalf of Client Engineering
Date: 2025-01-15
Reference: Variation Order VO-2025-018 · FIDIC Cl. 13.1

Subject: Mid-Fabrication Design Change — Cryogenic Piping Area 300
         Material Change: SS316L → Duplex 2205

═══════════════════════════════════════════════
⚠ THIS IS A CLIENT-INITIATED CHANGE REQUEST
  (Not a supplier fault — FIDIC Cl. 13.1 Variation)
═══════════════════════════════════════════════

Dear Supplier,

The Client has issued Specification Revision 06, changing the
material requirement for all cryogenic piping spools in Area 300
from SS 316L to Duplex 2205.

This change was initiated AFTER fabrication commenced on Rev.05.

═══════════════════════════════════
WHAT NEEDS TO CHANGE
═══════════════════════════════════

1. MATERIAL: SS 316L → Duplex 2205 (UNS S31803)
   - All raw material must be re-procured
   - 12 spools already fabricated must be scrapped

2. WELDING: New WPS/PQR qualification required
   - Duplex requires different shielding gas (Ar/N₂)
   - Ferrite content testing mandatory (30–65% range)
   - Different filler metal: ER2209 instead of ER316L

3. HEAT TREATMENT: Solution annealing → full PWHT cycle
   - Temperature range: 1020–1100°C (vs 1040–1080°C)
   - Water quench rate ≥ 40°C/min required

4. NDT: All existing records voided
   - New inspection plan per ASME B31.3 for Duplex
   - Additional ferrite scope testing at every weld
   - PAUT replaces conventional UT

═══════════════════════════════════
AI PREDICTION — REPAIR / CHANGE FORECAST
═══════════════════════════════════

Atlas AI has analyzed your production capacity, material
lead times, and welding requalification requirements:

┌─────────────────────────────────────────────┐
│  PREDICTED LEAD TIME BREAKDOWN              │
├─────────────────────────────────────────────┤
│  Material procurement (Duplex 2205):  8–12 weeks  │
│  WPS/PQR requalification:            6–8 weeks   │
│  Re-fabrication (12 spools):          4–6 weeks   │
│  NDT & inspection:                    2–3 weeks   │
│  Documentation & handover:            1 week      │
│─────────────────────────────────────────────│
│  TOTAL PREDICTED LEAD TIME:     14–18 WEEKS │
│  (vs. traditional proposal cycle: 4–6 weeks │
│   just for the proposal itself)             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  COST FORECAST (AI-Generated)               │
├─────────────────────────────────────────────┤
│  Scrapped material (12 spools SS316L):   $127,000  │
│  New Duplex 2205 material:               $284,000  │
│  WPS/PQR requalification:                $45,000   │
│  Additional labor (re-fabrication):      $168,000   │
│  Extended NDT scope:                     $52,000    │
│  Heat treatment (revised cycle):         $38,000    │
│  Project management & documentation:     $22,000    │
│─────────────────────────────────────────────│
│  ESTIMATED CHANGE ORDER TOTAL:      $736,000  │
│  CONTINGENCY (15%):                 $110,400  │
│  ─────────────────────────────────────────  │
│  TOTAL FORECAST:                    $846,400  │
└─────────────────────────────────────────────┘

═══════════════════════════════════
COMPARISON: AI vs TRADITIONAL PROCESS
═══════════════════════════════════

Traditional Process:
  1. Client sends change request         → Day 0
  2. Supplier reviews (2–3 weeks)        → Day 21
  3. Supplier prepares cost proposal     → Day 35
  4. Client reviews proposal             → Day 49
  5. Negotiation rounds (2–4 weeks)      → Day 77
  6. Variation Order signed              → Day 84
  7. Work begins                         → Day 84+
  TOTAL WASTED TIME: 12 WEEKS before work starts

RCA AI-Accelerated Process:
  1. Change request with AI forecast     → Day 0
  2. Supplier reviews AI proposal        → Day 3
  3. Adjusted proposal (if needed)       → Day 7
  4. Variation Order signed              → Day 10
  5. Work begins                         → Day 10
  TOTAL TIME: 10 DAYS (vs 84 days)
  TIME SAVED: 74 DAYS = $2.96M in delay costs

═══════════════════════════════════
REQUIRED SUPPLIER ACTION
═══════════════════════════════════

Please review the AI-generated cost forecast and lead time
prediction above. You may:

  ✓ ACCEPT the AI forecast as your proposal basis
  ✓ ADJUST specific line items with justification
  ✓ REQUEST clarification on spec requirements

Deadline for response: 2025-01-29 (14 calendar days)

Note: Since this is a CLIENT-INITIATED change (FIDIC Cl. 13.1),
all costs are borne by the Client. No penalties apply to supplier.
Supplier is entitled to Extension of Time per FIDIC Cl. 8.4.

──────────────────────────
RCA Claims Management System
Atlas AI — Change Order Module v2.1`,
    supplierOptions: [
      "Accept AI Forecast — use as proposal basis ($846,400 / 14–18 weeks)",
      "Adjust Forecast — modify specific line items with justification",
      "Request Clarification — need more detail on spec requirements",
      "Submit Counter-Proposal — provide alternative approach",
    ],
  },
];

const statusConfig: Record<SupplierClaim["status"], { label: string; color: string; bg: string }> = {
  "pending-review": { label: "Pending Your Review", color: "text-[#F5A623]", bg: "bg-[#F5A623]/10" },
  "accepted": { label: "Accepted", color: "text-[#6EA996]", bg: "bg-[#6EA996]/10" },
  "disputed": { label: "Disputed", color: "text-[#AE3D3D]", bg: "bg-[#AE3D3D]/10" },
  "partially-accepted": { label: "Partially Accepted", color: "text-primary", bg: "bg-primary/10" },
  "change-request": { label: "Change Request · Client Fault", color: "text-[#5B8DEF]", bg: "bg-[#5B8DEF]/10" },
};

/* ═══════════════════════════════════════════
   TYPING EFFECT
═══════════════════════════════════════════ */
const useTypingEffect = (text: string, speed = 6, active = false) => {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  useEffect(() => {
    if (!active) { setDisplayed(""); indexRef.current = 0; return; }
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, active]);
  return displayed;
};

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */
const LNGSupplierPortal = () => {
  const [selectedClaim, setSelectedClaim] = useState<SupplierClaim>(supplierClaims[0]);
  const [activeTab, setActiveTab] = useState<"claim" | "evidence" | "respond">("claim");
  const [botActive, setBotActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const botText = useTypingEffect(selectedClaim.claimLetterText, 5, botActive);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start animation only when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
          setBotActive(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [botText]);

  useEffect(() => {
    setBotActive(true);
    setSelectedResponse(null);
    setResponseSubmitted(false);
    setActiveTab("claim");
  }, [selectedClaim]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const evidenceIcon = (type: string) => {
    switch (type) {
      case "report": return <FileText className="w-3.5 h-3.5" />;
      case "photo": return <Camera className="w-3.5 h-3.5" />;
      case "measurement": return <Ruler className="w-3.5 h-3.5" />;
      case "scan": case "video": return <Eye className="w-3.5 h-3.5" />;
      case "certificate": return <Shield className="w-3.5 h-3.5" />;
      default: return <File className="w-3.5 h-3.5" />;
    }
  };

  const totalExposure = supplierClaims.reduce((s, c) => s + c.claimAmount + c.liquidatedDamages, 0);
  const pendingCount = supplierClaims.filter(c => c.status === "pending-review").length;

  const portalRef = useRef<HTMLDivElement>(null);

  const handleSubmitResponse = () => {
    if (selectedResponse === null) return;
    const scrollY = window.scrollY;
    setResponseSubmitted(true);
    // Prevent browser from scrolling due to content height change
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  return (
    <div ref={sectionRef} className="border-2 border-foreground/10 bg-white">

      {/* ── SUPPLIER PORTAL HEADER ── */}
      <div className="border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-foreground flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-foreground/40">Supplier Portal</div>
              <div className="text-base font-bold text-foreground">Volga Heavy Machinery JSC</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-foreground/40" />
              {pendingCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#AE3D3D] rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">{pendingCount}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-foreground/10">
              <div className="w-7 h-7 bg-foreground/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-foreground/40" />
              </div>
              <span className="text-xs text-foreground/50">QA Department</span>
            </div>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="px-6 py-3 border-t border-foreground/5 flex items-center gap-8 overflow-x-auto">
          <div>
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Open Claims</div>
            <div className="text-lg font-bold text-[#AE3D3D]">{pendingCount}</div>
          </div>
          <div className="w-px h-8 bg-foreground/10" />
          <div>
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Total Exposure</div>
            <div className="text-lg font-bold text-foreground">{formatCurrency(totalExposure)}</div>
          </div>
          <div className="w-px h-8 bg-foreground/10" />
          <div>
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Urgent</div>
            <div className="flex items-center gap-1.5">
              <div className="text-lg font-bold text-[#AE3D3D]">{supplierClaims.filter(c => c.daysRemaining <= 3).length}</div>
              <span className="text-[9px] text-[#AE3D3D]">≤3 days left</span>
            </div>
          </div>
          <div className="w-px h-8 bg-foreground/10" />
          <div>
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Project</div>
            <div className="text-sm font-medium text-foreground">Arctic LNG-2 Train 3</div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: Claims List + Detail ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">

        {/* LEFT: Claims List */}
        <div className="lg:col-span-4 border-r border-foreground/10">
          <div className="px-4 py-3 border-b border-foreground/10 bg-foreground/[0.01]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                Incoming Claims ({supplierClaims.length})
              </span>
            </div>
          </div>

          <div className="divide-y divide-foreground/5">
            {supplierClaims.map(claim => {
              const sc = statusConfig[claim.status];
              return (
                <button
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim)}
                  className={`w-full text-left px-4 py-4 transition-all hover:bg-foreground/[0.02] ${
                    selectedClaim.id === claim.id 
                      ? `bg-foreground/[0.04] border-l-2 ${claim.status === "change-request" ? "border-[#5B8DEF]" : "border-[#AE3D3D]"}` 
                      : "border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-foreground/30">{claim.id}</span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${sc.bg} ${sc.color}`}>
                      {sc.label}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground leading-tight mb-1">{claim.equipment}</h4>
                  <p className="text-[10px] text-foreground/40 mb-2">{claim.tag} · {claim.title}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#AE3D3D]">{formatCurrency(claim.claimAmount + claim.liquidatedDamages)}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-foreground/30" />
                      <span className={`text-[10px] font-bold ${claim.daysRemaining <= 3 ? "text-[#AE3D3D]" : "text-foreground/40"}`}>
                        {claim.daysRemaining > 0 ? `${claim.daysRemaining}d left` : "Overdue"}
                      </span>
                    </div>
                  </div>

                  {/* Urgency bar */}
                  {claim.daysRemaining <= 3 && claim.daysRemaining > 0 && (
                    <div className="mt-2 h-1 bg-foreground/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#AE3D3D] rounded-full animate-pulse" style={{ width: `${(1 - claim.daysRemaining / 14) * 100}%` }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Detail Panel */}
        <div className="lg:col-span-8 flex flex-col">

          {/* Claim Header */}
          <div className={`px-6 py-4 border-b ${selectedClaim.status === "change-request" ? "border-[#5B8DEF]/20 bg-[#5B8DEF]/[0.02]" : "border-foreground/10 bg-foreground/[0.01]"}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedClaim.status === "change-request" ? (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-[#5B8DEF]/10 text-[#5B8DEF]">Client Change Request</span>
                  ) : (
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                      selectedClaim.severity === "critical" ? "bg-[#AE3D3D]/10 text-[#AE3D3D]" : "bg-[#F5A623]/10 text-[#F5A623]"
                    }`}>{selectedClaim.severity}</span>
                  )}
                  <span className="text-[10px] font-mono text-foreground/30">{selectedClaim.contractRef}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{selectedClaim.title}</h3>
                <p className="text-xs text-foreground/40 mt-0.5">{selectedClaim.equipment} · {selectedClaim.tag}</p>
              </div>
              <div className="text-right">
                {selectedClaim.status === "change-request" ? (
                  <>
                    <div className="text-[9px] text-[#5B8DEF] uppercase tracking-wider font-bold">No Penalties Apply</div>
                    <div className="text-xs text-foreground/40 mt-0.5">Client bears all costs</div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Clock className="w-3 h-3 text-foreground/30" />
                      <span className="text-[10px] font-bold text-foreground/40">
                        Respond by: {selectedClaim.deadline}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[9px] text-foreground/30 uppercase tracking-wider">Total Exposure</div>
                    <div className="text-xl font-bold text-[#AE3D3D]">{formatCurrency(selectedClaim.claimAmount + selectedClaim.liquidatedDamages)}</div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Clock className="w-3 h-3 text-foreground/30" />
                      <span className={`text-[10px] font-bold ${selectedClaim.daysRemaining <= 3 ? "text-[#AE3D3D]" : "text-foreground/40"}`}>
                        Deadline: {selectedClaim.deadline}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mini KPIs — different for change request */}
            {selectedClaim.status === "change-request" ? (
              <div className="grid grid-cols-4 gap-3 mt-4">
                <div className="bg-[#5B8DEF]/[0.03] border border-[#5B8DEF]/10 px-3 py-2">
                  <div className="text-[8px] text-[#5B8DEF]/60 uppercase">Type</div>
                  <div className="text-sm font-bold text-[#5B8DEF]">Variation</div>
                </div>
                <div className="bg-[#5B8DEF]/[0.03] border border-[#5B8DEF]/10 px-3 py-2">
                  <div className="text-[8px] text-[#5B8DEF]/60 uppercase">AI Forecast</div>
                  <div className="text-sm font-bold text-foreground">$846,400</div>
                </div>
                <div className="bg-[#5B8DEF]/[0.03] border border-[#5B8DEF]/10 px-3 py-2">
                  <div className="text-[8px] text-[#5B8DEF]/60 uppercase">Lead Time</div>
                  <div className="text-sm font-bold text-foreground">14–18 wk</div>
                </div>
                <div className="bg-[#6EA996]/[0.05] border border-[#6EA996]/10 px-3 py-2">
                  <div className="text-[8px] text-[#6EA996]/60 uppercase">Time Saved</div>
                  <div className="text-sm font-bold text-[#6EA996]">74 days</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 mt-4">
                <div className="bg-foreground/[0.02] border border-foreground/5 px-3 py-2">
                  <div className="text-[8px] text-foreground/30 uppercase">Claim</div>
                  <div className="text-sm font-bold text-foreground">{formatCurrency(selectedClaim.claimAmount)}</div>
                </div>
                <div className="bg-foreground/[0.02] border border-foreground/5 px-3 py-2">
                  <div className="text-[8px] text-foreground/30 uppercase">LD Amount</div>
                  <div className="text-sm font-bold text-[#AE3D3D]">{formatCurrency(selectedClaim.liquidatedDamages)}</div>
                </div>
                <div className="bg-foreground/[0.02] border border-foreground/5 px-3 py-2">
                  <div className="text-[8px] text-foreground/30 uppercase">Penalty/Day</div>
                  <div className="text-sm font-bold text-foreground">{formatCurrency(selectedClaim.penaltyPerDay)}</div>
                </div>
                <div className="bg-foreground/[0.02] border border-foreground/5 px-3 py-2">
                  <div className="text-[8px] text-foreground/30 uppercase">Delay</div>
                  <div className="text-sm font-bold text-foreground">{selectedClaim.delayDays}d</div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-foreground/10">
            {([
              { key: "claim" as const, label: selectedClaim.status === "change-request" ? "Change Order & AI Forecast" : "AI Claim Letter", icon: Bot },
              { key: "evidence" as const, label: `Evidence (${selectedClaim.evidence.length})`, icon: Camera },
              { key: "respond" as const, label: selectedClaim.status === "change-request" ? "Submit Proposal" : "Your Response", icon: Scale },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === tab.key ? "border-primary text-primary bg-primary/[0.02]" : "border-transparent text-foreground/40 hover:text-foreground/60"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">

              {/* ── AI CLAIM LETTER ── */}
              {activeTab === "claim" && (
                <motion.div key="claim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                  <div className={`px-6 py-3 border-b flex items-center gap-3 ${
                    selectedClaim.status === "change-request" 
                      ? "bg-[#5B8DEF]/[0.03] border-[#5B8DEF]/10" 
                      : "bg-[#AE3D3D]/[0.03] border-[#AE3D3D]/10"
                  }`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      selectedClaim.status === "change-request" ? "bg-[#5B8DEF]" : "bg-[#AE3D3D]"
                    }`}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        {selectedClaim.status === "change-request" ? "RCA Atlas AI — Change Order & Cost Forecast" : "RCA Atlas AI — Formal Claim"}
                      </div>
                      <div className="text-[9px] text-foreground/40">
                        {selectedClaim.status === "change-request" 
                          ? "AI-generated change scope with predicted lead time & cost forecast" 
                          : "AI-generated claim with full evidence chain · You must review & respond"}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      {selectedClaim.status === "change-request" ? (
                        <>
                          <Shield className="w-3.5 h-3.5 text-[#5B8DEF]" />
                          <span className="text-[9px] text-[#5B8DEF] font-bold">CLIENT CHANGE</span>
                        </>
                      ) : (
                        <>
                          <Gavel className="w-3.5 h-3.5 text-[#AE3D3D]" />
                          <span className="text-[9px] text-[#AE3D3D] font-bold">LEGALLY BINDING</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-auto p-6 min-h-[350px]">
                    <div className="flex gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedClaim.status === "change-request" ? "bg-[#5B8DEF]/10" : "bg-[#AE3D3D]/10"
                      }`}>
                        <Bot className={`w-3.5 h-3.5 ${selectedClaim.status === "change-request" ? "text-[#5B8DEF]" : "text-[#AE3D3D]"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[9px] text-foreground/30 mb-1">
                          {selectedClaim.status === "change-request" ? "RCA ATLAS AI · CHANGE ORDER MODULE" : "RCA ATLAS AI · CLAIM MODULE"}
                        </div>
                        <div className="bg-foreground/[0.02] border border-foreground/5 rounded-lg p-4">
                          <pre className="text-xs text-foreground/70 whitespace-pre-wrap font-mono leading-relaxed">
                            {botText}
                            {botText.length < selectedClaim.claimLetterText.length && (
                              <span className={`inline-block w-1.5 h-4 animate-pulse ml-0.5 ${selectedClaim.status === "change-request" ? "bg-[#5B8DEF]" : "bg-[#AE3D3D]"}`} />
                            )}
                          </pre>
                        </div>
                        {botText.length >= selectedClaim.claimLetterText.length && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex flex-wrap gap-2">
                            <button className="flex items-center gap-1.5 text-[10px] font-bold text-foreground border border-foreground/20 rounded px-3 py-1.5 hover:bg-foreground/5 transition-colors">
                              <Download className="w-3 h-3" /> Download PDF
                            </button>
                            <button
                              onClick={() => setActiveTab("evidence")}
                              className="flex items-center gap-1.5 text-[10px] font-bold text-primary border border-primary/20 rounded px-3 py-1.5 hover:bg-primary/5 transition-colors"
                            >
                              <Eye className="w-3 h-3" /> Review Evidence
                            </button>
                            <button
                              onClick={() => setActiveTab("respond")}
                              className="flex items-center gap-1.5 text-[10px] font-bold text-[#6EA996] bg-[#6EA996]/10 border border-[#6EA996]/20 rounded px-3 py-1.5 hover:bg-[#6EA996]/15 transition-colors"
                            >
                              <Scale className="w-3 h-3" /> Respond to Claim
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3 border-t border-foreground/5 bg-foreground/[0.01]">
                    <div className="flex items-center gap-3 bg-foreground/[0.03] border border-foreground/10 rounded-lg px-4 py-2.5">
                      <MessageSquare className="w-4 h-4 text-foreground/20" />
                      <span className="text-sm text-foreground/30 flex-1">Ask questions about this claim…</span>
                      <Send className="w-4 h-4 text-foreground/20" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── EVIDENCE ── */}
              {activeTab === "evidence" && (
                <motion.div key="evidence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                      Evidence Package — {selectedClaim.evidence.length} files
                    </div>
                    <button className="flex items-center gap-1.5 text-[10px] font-bold text-primary border border-primary/20 rounded px-3 py-1.5 hover:bg-primary/5">
                      <Download className="w-3 h-3" /> Download All
                    </button>
                  </div>

                  {/* Findings */}
                  <div className="mb-6 p-4 bg-[#AE3D3D]/[0.03] border border-[#AE3D3D]/10 rounded">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#AE3D3D] mb-2">Inspection Findings</div>
                    <div className="space-y-1.5">
                      {selectedClaim.findings.map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-[#AE3D3D] mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-foreground/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Files */}
                  <div className="space-y-2">
                    {selectedClaim.evidence.map((ev, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-3 border border-foreground/5 hover:border-foreground/15 transition-all group cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors">
                          {evidenceIcon(ev.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{ev.name}</div>
                          <div className="text-[10px] text-foreground/30">{ev.date} · {ev.by}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-[9px] font-bold text-primary border border-primary/20 rounded px-2 py-1 hover:bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            View
                          </button>
                          <Download className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── RESPOND ── */}
              {activeTab === "respond" && (
                <motion.div key="respond" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 min-h-[500px]">
                  {!responseSubmitted ? (
                    <>
                      <div className="mb-6">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">Your Response</div>
                        <p className="text-sm text-foreground/50">Select your response to claim {selectedClaim.id}. You have <span className={`font-bold ${selectedClaim.daysRemaining <= 3 ? "text-[#AE3D3D]" : "text-foreground"}`}>{selectedClaim.daysRemaining > 0 ? `${selectedClaim.daysRemaining} days` : "0 days (overdue)"}</span> remaining.</p>
                      </div>

                      <div className="space-y-3 mb-8">
                        {selectedClaim.supplierOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedResponse(i)}
                            className={`w-full text-left p-4 border-2 transition-all flex items-center gap-3 ${
                              selectedResponse === i
                                ? i === 0 ? "border-[#6EA996] bg-[#6EA996]/[0.03]"
                                : i === 2 ? "border-[#AE3D3D] bg-[#AE3D3D]/[0.03]"
                                : "border-primary bg-primary/[0.03]"
                                : "border-foreground/10 hover:border-foreground/20"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedResponse === i ? "border-primary bg-primary" : "border-foreground/20"
                            }`}>
                              {selectedResponse === i && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <span className="text-sm font-bold text-foreground">{opt.split("—")[0]}</span>
                              {opt.includes("—") && (
                                <span className="text-sm text-foreground/40"> — {opt.split("—")[1]}</span>
                              )}
                            </div>
                            {i === 0 && <ThumbsUp className="w-4 h-4 text-[#6EA996] ml-auto" />}
                            {i === 2 && <ThumbsDown className="w-4 h-4 text-[#AE3D3D] ml-auto" />}
                          </button>
                        ))}
                      </div>

                      {/* Comment box */}
                      <div className="mb-6">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-2">Additional Comments (optional)</div>
                        <div className="border border-foreground/10 rounded-lg p-3 min-h-[80px] bg-foreground/[0.01]">
                          <span className="text-sm text-foreground/30">Enter your justification or counter-arguments…</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleSubmitResponse}
                          disabled={selectedResponse === null}
                          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded transition-all ${
                            selectedResponse !== null
                              ? "bg-foreground text-white hover:bg-foreground/90"
                              : "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          Submit Response
                        </button>
                        <span className="text-[10px] text-foreground/30">Response is legally binding per contract terms</span>
                      </div>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <div className="w-16 h-16 bg-[#6EA996]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-[#6EA996]" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Response Submitted</h3>
                      <p className="text-sm text-foreground/50 max-w-sm mx-auto mb-1">
                        Your response to claim {selectedClaim.id} has been recorded and sent to the project management team.
                      </p>
                      <p className="text-xs text-foreground/30">
                        "{selectedClaim.supplierOptions[selectedResponse!]?.split("—")[0]?.trim()}"
                      </p>
                      <div className="mt-6 text-[10px] font-mono text-foreground/20">
                        Timestamp: {new Date().toISOString()} · Logged by RCA Claims System
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LNGSupplierPortal;
