import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, AlertTriangle, FileText, Camera, Scale, Clock, TrendingUp, TrendingDown, Shield, Gavel, File, BarChart3, Ruler, Thermometer, Video, Microscope, Download } from "lucide-react";

import claimWeldDefect from "@/assets/claim-weld-defect.jpg";
import claimCoatingFailure from "@/assets/claim-coating-failure.jpg";
import claimDimensionalDeviation from "@/assets/claim-dimensional-deviation.jpg";
import claimScheduleDelay from "@/assets/claim-schedule-delay.jpg";
import claimLateSpecification from "@/assets/claim-late-specification.jpg";
import claimRotatingEquipment from "@/assets/claim-rotating-equipment.jpg";

/* ── Types ── */
type ClaimStatus = "open" | "submitted" | "disputed" | "resolved" | "client-fault";
type Severity = "critical" | "major" | "minor";
type FaultParty = "supplier" | "contractor" | "client" | "shared";

interface AuditEntry {
  date: string;
  action: string;
  by: string;
  type: "inspection" | "legal" | "evidence" | "penalty" | "response";
}

type EvidenceType = "photo" | "report" | "measurement" | "video" | "document" | "scan" | "certificate";

interface EvidenceFile {
  name: string;
  type: EvidenceType;
  size: string;
  date: string;
  by: string;
  description: string;
  hasImage?: boolean;
  measurements?: { label: string; actual: string; spec: string; status: "pass" | "fail" }[];
}

interface ClaimCase {
  id: string;
  title: string;
  equipment: string;
  supplier: string;
  poNumber: string;
  image: string;
  status: ClaimStatus;
  severity: Severity;
  faultParty: FaultParty;
  claimAmount: number;
  liquidatedDamages: number;
  penaltyPerDay: number;
  delayDays: number;
  description: string;
  legalBasis: string;
  contractClause: string;
  evidenceCount: number;
  ncrCount: number;
  auditTrail: AuditEntry[];
  findings: string[];
  clientFaultReason?: string;
  evidenceFiles: EvidenceFile[];
}

const evidenceTypeConfig: Record<EvidenceType, { icon: typeof FileText; color: string; bg: string }> = {
  photo: { icon: Camera, color: "text-accent", bg: "bg-accent/10" },
  report: { icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  measurement: { icon: Ruler, color: "text-warning", bg: "bg-warning/10" },
  video: { icon: Video, color: "text-destructive", bg: "bg-destructive/10" },
  document: { icon: File, color: "text-muted-foreground", bg: "bg-muted" },
  scan: { icon: Microscope, color: "text-accent", bg: "bg-accent/10" },
  certificate: { icon: Shield, color: "text-primary", bg: "bg-primary/10" },
};

const claimCases: ClaimCase[] = [
  {
    id: "CLM-2024-001",
    title: "Weld Integrity Failure — Longitudinal Seam",
    equipment: "G1-22E05 · Deethanizer Condenser",
    supplier: "Volga Heavy Machinery JSC",
    poNumber: "PO-LNG-2024-0847",
    image: claimWeldDefect,
    status: "submitted",
    severity: "critical",
    faultParty: "supplier",
    claimAmount: 892000,
    liquidatedDamages: 1540000,
    penaltyPerDay: 22000,
    delayDays: 70,
    description: "Surface crack at weld toe extending 40mm into HAZ. RT confirms linear indication in longitudinal seam. GOST-34347 §5.2 violation. Hydrostatic test blocked.",
    legalBasis: "FIDIC Red Book Cl. 11.1 — Defects Liability. Supplier responsible for workmanship defects per PO T&C §8.3.",
    contractClause: "Contract §8.3 · FIDIC Cl. 11.1 · PO Schedule B",
    evidenceCount: 14,
    ncrCount: 5,
    auditTrail: [
      { date: "2024-10-15", action: "Visual inspection — crack indication at weld toe", by: "Inspector A. Petrov", type: "inspection" },
      { date: "2024-10-15", action: "MPI confirmation — 40mm linear defect in HAZ", by: "NDT Level II K. Smirnov", type: "inspection" },
      { date: "2024-10-16", action: "RT film digitized — linear indication confirmed", by: "RT Operator M. Chen", type: "evidence" },
      { date: "2024-10-17", action: "NCR-2024-0312 issued — critical severity", by: "QC Manager D. Fischer", type: "inspection" },
      { date: "2024-10-18", action: "Hydrostatic test blocked pending repair", by: "Project Engineer R. Kumar", type: "inspection" },
      { date: "2024-10-20", action: "Penalty calculation: 70 days × $22,000/day = $1,540,000", by: "Contract Admin L. Santos", type: "penalty" },
      { date: "2024-10-22", action: "Legal notice drafted — FIDIC Cl. 11.1 defects liability", by: "Legal Counsel J. Weber", type: "legal" },
      { date: "2024-10-25", action: "Formal claim submitted to supplier", by: "Project Director V. Ivanov", type: "legal" },
      { date: "2024-11-02", action: "Supplier response received — partial acceptance", by: "Volga QA Dept.", type: "response" },
    ],
    findings: [
      "Surface crack 40mm in HAZ — zero tolerance per GOST §5.2",
      "Linear indication on RT film — confirmed by Level III",
      "Excessive reinforcement 4.2mm (max 3mm)",
      "Undercut 0.8mm exceeds 0.5mm limit",
      "Incomplete WPS/PQR documentation",
    ],
    evidenceFiles: [
      { name: "VT-Report-E05-LS-001.pdf", type: "report", size: "2.4 MB", date: "2024-10-15", by: "Inspector A. Petrov", description: "Visual Testing Report — longitudinal seam weld toe crack, 40mm indication with macro photos at 5× magnification", hasImage: true },
      { name: "MPI-Film-HAZ-Zone-A.jpg", type: "photo", size: "8.1 MB", date: "2024-10-15", by: "NDT Level II K. Smirnov", description: "Magnetic Particle Inspection photo — linear indication fluorescent under UV, crack propagation into HAZ clearly visible", hasImage: true },
      { name: "RT-Film-LS-001-Scan.dcm", type: "scan", size: "34.2 MB", date: "2024-10-16", by: "RT Operator M. Chen", description: "Digitized radiographic film — linear indication 42mm, density variation confirms incomplete fusion at root", hasImage: true },
      { name: "Weld-Measurement-Report.pdf", type: "measurement", size: "1.8 MB", date: "2024-10-15", by: "QC Engineer P. Singh", description: "Dimensional measurement of weld reinforcement and undercut depths at 12 locations along seam",
        measurements: [
          { label: "Weld Reinforcement", actual: "4.2 mm", spec: "≤3.0 mm", status: "fail" },
          { label: "Undercut Depth", actual: "0.8 mm", spec: "≤0.5 mm", status: "fail" },
          { label: "Weld Width", actual: "18.3 mm", spec: "15–20 mm", status: "pass" },
          { label: "Root Penetration", actual: "1.1 mm", spec: "≥1.5 mm", status: "fail" },
        ]
      },
      { name: "NCR-2024-0312.pdf", type: "document", size: "520 KB", date: "2024-10-17", by: "QC Manager D. Fischer", description: "Non-Conformance Report — critical severity, references GOST-34347 §5.2 violation, hydrostatic test hold" },
      { name: "WPS-PQR-Audit-Checklist.xlsx", type: "document", size: "340 KB", date: "2024-10-17", by: "Welding Engineer", description: "WPS/PQR compliance checklist — 3 of 7 required documents missing from supplier package" },
      { name: "Hydro-Test-Hold-Notice.pdf", type: "document", size: "180 KB", date: "2024-10-18", by: "Project Engineer R. Kumar", description: "Formal hold notification — hydrostatic test suspended pending weld repair and re-inspection" },
      { name: "Crack-Propagation-Video.mp4", type: "video", size: "127 MB", date: "2024-10-15", by: "Inspector A. Petrov", description: "4K video walkthrough of crack indication under UV light showing full extent of HAZ damage" },
      { name: "EN-10204-3.2-Certificate.pdf", type: "certificate", size: "890 KB", date: "2024-09-01", by: "Volga QA Dept.", description: "Material test certificate EN 10204 Type 3.2 — base material SA-516 Gr.70, mill Magnitogorsk" },
    ],
  },
  {
    id: "CLM-2024-002",
    title: "Coating System Failure — Surface Prep Below Grade",
    equipment: "P1-31P01 · Amine Circulation Pump Casing",
    supplier: "KazPipe Industries LLP",
    poNumber: "PO-LNG-2024-1203",
    image: claimCoatingFailure,
    status: "open",
    severity: "major",
    faultParty: "supplier",
    claimAmount: 345000,
    liquidatedDamages: 660000,
    penaltyPerDay: 15000,
    delayDays: 44,
    description: "Surface preparation Sa 2.0 instead of required Sa 2.5. DFT primer 62μm (spec: 75±15μm). Holiday detector found 3 pinholes per m². Full re-blast and re-coat required.",
    legalBasis: "Contract §6.2 — Coating specification compliance. ISO 12944-8 §4.3 non-conformance. Supplier bears full re-work cost.",
    contractClause: "Contract §6.2 · ISO 12944 · NACE SP0188",
    evidenceCount: 8,
    ncrCount: 3,
    auditTrail: [
      { date: "2024-11-05", action: "Blast profile comparison — Sa 2.0 vs Sa 2.5 reference", by: "Coating Inspector T. Kowalski", type: "inspection" },
      { date: "2024-11-05", action: "DFT readings: 62μm avg (below 60μm minimum)", by: "Coating Inspector T. Kowalski", type: "evidence" },
      { date: "2024-11-06", action: "Holiday test — 3 pinholes detected per m²", by: "QC Inspector Y. Tanaka", type: "inspection" },
      { date: "2024-11-07", action: "NCR-2024-0398 issued — full re-blast ordered", by: "QC Manager D. Fischer", type: "inspection" },
      { date: "2024-11-10", action: "Penalty clock started: $15,000/day", by: "Contract Admin L. Santos", type: "penalty" },
    ],
    findings: [
      "Surface preparation Sa 2.0 — below Sa 2.5 minimum",
      "DFT primer 62μm — below 60μm lower tolerance",
      "3 pinholes/m² detected by holiday test",
    ],
    evidenceFiles: [
      { name: "Blast-Profile-Comparison.pdf", type: "report", size: "3.6 MB", date: "2024-11-05", by: "Coating Inspector T. Kowalski", description: "Side-by-side comparison photos: achieved Sa 2.0 vs reference Sa 2.5 per ISO 8501-1", hasImage: true },
      { name: "DFT-Readings-Report.xlsx", type: "measurement", size: "420 KB", date: "2024-11-05", by: "Coating Inspector T. Kowalski", description: "Dry Film Thickness readings — 48 measurement points across pump casing",
        measurements: [
          { label: "DFT Primer (avg)", actual: "62 μm", spec: "75±15 μm", status: "fail" },
          { label: "DFT Primer (min)", actual: "48 μm", spec: "≥60 μm", status: "fail" },
          { label: "Surface Profile", actual: "45 μm", spec: "50–75 μm", status: "fail" },
          { label: "Anchor Pattern", actual: "Sa 2.0", spec: "Sa 2.5", status: "fail" },
        ]
      },
      { name: "Holiday-Test-Map.pdf", type: "scan", size: "5.2 MB", date: "2024-11-06", by: "QC Inspector Y. Tanaka", description: "Holiday detection map — pinhole locations marked on development drawing, 3 defects per m² average", hasImage: true },
      { name: "NCR-2024-0398.pdf", type: "document", size: "480 KB", date: "2024-11-07", by: "QC Manager D. Fischer", description: "Non-Conformance Report — full re-blast and re-coat ordered, supplier to bear all costs" },
      { name: "ISO-12944-Compliance-Check.pdf", type: "certificate", size: "1.1 MB", date: "2024-11-05", by: "Coating Inspector T. Kowalski", description: "ISO 12944-8 §4.3 compliance verification — multiple non-conformances documented" },
    ],
  },
  {
    id: "CLM-2024-003",
    title: "Nozzle Projection Out of Tolerance",
    equipment: "V1-14D02 · HP Separator Vessel",
    supplier: "Ural Steel Works PJSC",
    poNumber: "PO-LNG-2024-0692",
    image: claimDimensionalDeviation,
    status: "disputed",
    severity: "major",
    faultParty: "shared",
    claimAmount: 218000,
    liquidatedDamages: 330000,
    penaltyPerDay: 11000,
    delayDays: 30,
    description: "Nozzle N1 projection 252.5mm exceeds 250±2mm tolerance. Piping field-fit required. Supplier claims approved drawing revision showed 255mm — client engineering disputes this.",
    legalBasis: "Contract §4.1 — Dimensional conformance to IFC drawings. Dispute on applicable drawing revision (Rev.04 vs Rev.05).",
    contractClause: "Contract §4.1 · ASME Y14.5 · Drawing Rev. dispute",
    evidenceCount: 11,
    ncrCount: 2,
    auditTrail: [
      { date: "2024-09-20", action: "Laser scan — nozzle N1 projection 252.5mm measured", by: "Inspector M. Volkov", type: "inspection" },
      { date: "2024-09-21", action: "Cross-check against IFC drawing Rev.05 — out of tolerance", by: "QC Engineer P. Singh", type: "evidence" },
      { date: "2024-09-22", action: "NCR-2024-0267 issued — dimensional non-conformance", by: "QC Manager D. Fischer", type: "inspection" },
      { date: "2024-09-25", action: "Supplier claims Rev.04 drawing was issued for construction", by: "Ural Steel QA", type: "response" },
      { date: "2024-09-28", action: "Document control audit — Rev.04 transmittal log requested", by: "Legal Counsel J. Weber", type: "legal" },
      { date: "2024-10-01", action: "Transmittal shows Rev.05 issued 3 weeks before fabrication start", by: "Document Control", type: "evidence" },
      { date: "2024-10-05", action: "Formal dispute notice — shared liability assessment pending", by: "Contract Admin L. Santos", type: "legal" },
    ],
    findings: [
      "Nozzle N1 projection 252.5mm — exceeds +2mm tolerance",
      "Drawing revision dispute: Rev.04 vs Rev.05 transmittal timing",
    ],
    evidenceFiles: [
      { name: "Laser-Scan-Nozzle-N1.pdf", type: "measurement", size: "12.4 MB", date: "2024-09-20", by: "Inspector M. Volkov", description: "3D laser scan point cloud — nozzle N1 projection deviation mapped against IFC model",
        measurements: [
          { label: "Nozzle N1 Projection", actual: "252.5 mm", spec: "250±2 mm", status: "fail" },
          { label: "Nozzle N1 Orientation", actual: "0.3°", spec: "±0.5°", status: "pass" },
          { label: "Shell OD at Nozzle", actual: "1524.2 mm", spec: "1524±1.5 mm", status: "pass" },
          { label: "Flange Face Flatness", actual: "0.15 mm", spec: "≤0.25 mm", status: "pass" },
        ]
      },
      { name: "IFC-Drawing-Rev05-Markup.pdf", type: "document", size: "4.8 MB", date: "2024-09-21", by: "QC Engineer P. Singh", description: "IFC drawing Rev.05 with redline markup showing specified 250mm projection vs as-built 252.5mm", hasImage: true },
      { name: "Transmittal-Log-Rev04-Rev05.pdf", type: "document", size: "320 KB", date: "2024-10-01", by: "Document Control", description: "Transmittal log proving Rev.05 was issued 3 weeks before fabrication commencement — timestamped" },
      { name: "NCR-2024-0267.pdf", type: "document", size: "560 KB", date: "2024-09-22", by: "QC Manager D. Fischer", description: "NCR for dimensional non-conformance — disposition pending drawing revision dispute resolution" },
      { name: "Piping-Stress-Impact-Analysis.pdf", type: "report", size: "2.1 MB", date: "2024-09-25", by: "Piping Engineer", description: "Stress analysis showing impact of 2.5mm over-projection on piping alignment and field-fit requirements" },
      { name: "3D-Scan-Overlay-Video.mp4", type: "video", size: "89 MB", date: "2024-09-20", by: "Inspector M. Volkov", description: "3D point cloud overlay animation — as-built vs design model deviation heat map" },
    ],
  },
  {
    id: "CLM-2024-004",
    title: "Late Specification Handover — Client Fault",
    equipment: "All Cryogenic Piping — Area 300",
    supplier: "N/A — Client Engineering",
    poNumber: "ENG-LNG-2024-CRYO",
    image: claimLateSpecification,
    status: "client-fault",
    severity: "critical",
    faultParty: "client",
    claimAmount: 0,
    liquidatedDamages: 2800000,
    penaltyPerDay: 40000,
    delayDays: 70,
    description: "Client engineering issued cryogenic piping specification 11 weeks after contractual deadline. Material procurement delayed. Fabricator idle for 70 days. Contractor entitled to Extension of Time (EOT) and prolongation costs.",
    legalBasis: "FIDIC Cl. 1.9 — Delayed Drawings. Cl. 8.4 — Extension of Time. Client responsible for consequential delay and prolongation costs.",
    contractClause: "FIDIC Cl. 1.9 · Cl. 8.4 · Cl. 20.1",
    evidenceCount: 22,
    ncrCount: 0,
    clientFaultReason: "Specification issued 77 days late (due: 15-Mar-2024, actual: 31-May-2024). No interim revision provided. Contractor mobilized workforce per original schedule — 70 days idle time documented.",
    auditTrail: [
      { date: "2024-03-15", action: "Contractual deadline for cryogenic piping spec — NOT received", by: "Project Controls", type: "inspection" },
      { date: "2024-03-22", action: "First reminder sent to client engineering", by: "Project Manager K. Müller", type: "legal" },
      { date: "2024-04-05", action: "Second reminder — escalated to client project director", by: "Project Director V. Ivanov", type: "legal" },
      { date: "2024-04-15", action: "Fabricator workforce idle — daily cost $40,000 logged", by: "Contract Admin L. Santos", type: "penalty" },
      { date: "2024-05-10", action: "Third reminder — formal notice of delay per FIDIC Cl. 20.1", by: "Legal Counsel J. Weber", type: "legal" },
      { date: "2024-05-31", action: "Specification received — 77 days late", by: "Document Control", type: "evidence" },
      { date: "2024-06-05", action: "EOT claim filed — 70 days + prolongation costs $2.8M", by: "Claims Manager", type: "legal" },
      { date: "2024-06-15", action: "Client acknowledges late issuance — negotiation ongoing", by: "Client PM", type: "response" },
    ],
    findings: [
      "Specification 77 days late vs contractual deadline",
      "70 days fabricator idle time — documented daily",
      "Material procurement could not start without approved spec",
      "Contractor entitled to EOT per FIDIC Cl. 8.4",
    ],
    evidenceFiles: [
      { name: "Contract-Schedule-Baseline.pdf", type: "document", size: "1.8 MB", date: "2024-03-15", by: "Project Controls", description: "Contractual baseline schedule showing spec delivery deadline 15-Mar-2024 — Activity ID ENG-CRYO-001" },
      { name: "Reminder-Letters-Bundle.pdf", type: "document", size: "2.2 MB", date: "2024-05-10", by: "Legal Counsel J. Weber", description: "Compiled bundle of 3 formal reminder letters with timestamps, registered mail receipts, and read confirmations" },
      { name: "Daily-Idle-Time-Log.xlsx", type: "measurement", size: "680 KB", date: "2024-05-31", by: "Contract Admin L. Santos", description: "Day-by-day idle time log — 70 days × workforce of 45 men, equipment standby costs, crane rental idle charges",
        measurements: [
          { label: "Total Idle Days", actual: "70 days", spec: "0 days", status: "fail" },
          { label: "Workforce Idle", actual: "45 men/day", spec: "Productive", status: "fail" },
          { label: "Daily Idle Cost", actual: "$40,000", spec: "$0", status: "fail" },
          { label: "Total Idle Cost", actual: "$2,800,000", spec: "$0", status: "fail" },
        ]
      },
      { name: "FIDIC-Cl20.1-Notice.pdf", type: "document", size: "420 KB", date: "2024-05-10", by: "Legal Counsel J. Weber", description: "Formal notice of claim per FIDIC Cl. 20.1 — within 28-day notification window" },
      { name: "EOT-Claim-Submission.pdf", type: "report", size: "8.4 MB", date: "2024-06-05", by: "Claims Manager", description: "Full EOT claim package — 70 days extension + $2.8M prolongation costs with supporting schedules" },
      { name: "Spec-Receipt-Timestamp.pdf", type: "document", size: "140 KB", date: "2024-05-31", by: "Document Control", description: "Timestamped receipt confirmation — specification received 31-May-2024, 77 days after deadline" },
      { name: "Workforce-Mobilization-Records.pdf", type: "document", size: "3.1 MB", date: "2024-03-10", by: "HR / Site Admin", description: "Mobilization records proving workforce deployed per original schedule — travel, accommodation, tool shipping" },
      { name: "Client-Acknowledgment-Email.pdf", type: "document", size: "220 KB", date: "2024-06-15", by: "Client PM", description: "Email chain where client acknowledges late issuance — key admission for claim enforcement" },
    ],
  },
  {
    id: "CLM-2024-005",
    title: "Requirement Change After Fabrication Start",
    equipment: "G1-22E07 · Propane Condenser",
    supplier: "N/A — Client Engineering",
    poNumber: "ENG-LNG-2024-PROP",
    image: claimScheduleDelay,
    status: "client-fault",
    severity: "critical",
    faultParty: "client",
    claimAmount: 0,
    liquidatedDamages: 1950000,
    penaltyPerDay: 30000,
    delayDays: 65,
    description: "Client changed material specification from SA-516 Gr.70 to SA-387 Gr.22 Cl.2 after shell plates were already cut and rolled. Full material scrap and re-procurement. 65 days additional delay.",
    legalBasis: "FIDIC Cl. 13.1 — Variation. Client bears cost of material change after fabrication commencement per Contract §3.7.",
    contractClause: "FIDIC Cl. 13.1 · Contract §3.7 · Variation Order",
    evidenceCount: 18,
    ncrCount: 0,
    clientFaultReason: "Material grade change (SA-516→SA-387) issued after shell plates cut and rolled. Re-procurement lead time: 12 weeks. Scrapped material: 28 tonnes of SA-516 plate at $4,200/tonne.",
    auditTrail: [
      { date: "2024-07-10", action: "Shell plates cut and rolled per approved MTO Rev.02", by: "Fabrication Supervisor", type: "inspection" },
      { date: "2024-07-18", action: "Client issues Variation Order — material change to SA-387 Gr.22", by: "Client Engineering", type: "legal" },
      { date: "2024-07-19", action: "Fabrication STOP issued — all work halted on condenser", by: "Project Manager K. Müller", type: "inspection" },
      { date: "2024-07-20", action: "Impact assessment: 28t material scrap + 12-week re-procurement", by: "Procurement", type: "evidence" },
      { date: "2024-07-25", action: "Cost estimate: $117,600 scrap + $1,832,400 delay = $1,950,000", by: "Contract Admin L. Santos", type: "penalty" },
      { date: "2024-07-28", action: "Formal Variation claim submitted per FIDIC Cl. 13.3", by: "Claims Manager", type: "legal" },
      { date: "2024-08-15", action: "Client accepts variation — cost negotiation initiated", by: "Client Commercial", type: "response" },
    ],
    findings: [
      "Material change order issued after fabrication commenced",
      "28 tonnes SA-516 plate scrapped ($117,600)",
      "12-week re-procurement lead time for SA-387 Gr.22",
      "65 days total delay attributed to client variation",
    ],
    evidenceFiles: [
      { name: "Variation-Order-VO-2024-018.pdf", type: "document", size: "1.4 MB", date: "2024-07-18", by: "Client Engineering", description: "Official Variation Order — material grade change from SA-516 Gr.70 to SA-387 Gr.22 Cl.2, signed by client engineering manager" },
      { name: "Fabrication-Progress-Photos.pdf", type: "photo", size: "18.6 MB", date: "2024-07-10", by: "Fabrication Supervisor", description: "Photo package showing shell plates already cut (4 plates) and rolled (2 plates) — fabrication 30% complete at time of change", hasImage: true },
      { name: "Material-Scrap-Assessment.xlsx", type: "measurement", size: "520 KB", date: "2024-07-20", by: "Procurement", description: "Detailed scrap assessment — 28 tonnes SA-516 plate at $4,200/tonne, residual value analysis",
        measurements: [
          { label: "Material Scrapped", actual: "28 tonnes", spec: "0 tonnes", status: "fail" },
          { label: "Unit Cost", actual: "$4,200/t", spec: "—", status: "fail" },
          { label: "Total Scrap Value", actual: "$117,600", spec: "$0", status: "fail" },
          { label: "Re-procurement Lead", actual: "12 weeks", spec: "0 weeks", status: "fail" },
        ]
      },
      { name: "MTO-Rev02-Approved.pdf", type: "document", size: "2.8 MB", date: "2024-06-15", by: "Project Engineering", description: "Approved Material Take-Off Rev.02 specifying SA-516 Gr.70 — basis for original procurement" },
      { name: "Fabrication-STOP-Notice.pdf", type: "document", size: "280 KB", date: "2024-07-19", by: "Project Manager K. Müller", description: "Formal fabrication stop notification — all work halted pending new material procurement" },
      { name: "FIDIC-Cl13.3-Claim.pdf", type: "report", size: "6.2 MB", date: "2024-07-28", by: "Claims Manager", description: "Formal variation claim per FIDIC Cl. 13.3 — $1,950,000 total (scrap + delay + re-procurement)" },
      { name: "Client-Acceptance-Email.pdf", type: "document", size: "180 KB", date: "2024-08-15", by: "Client Commercial", description: "Client email accepting variation liability — cost negotiation commenced" },
    ],
  },
  {
    id: "CLM-2024-006",
    title: "Vibration Exceedance — Compressor FAT Failure",
    equipment: "K1-41K01 · Propane Refrigerant Compressor",
    supplier: "Nevsky Engineering PJSC",
    poNumber: "PO-LNG-2024-1567",
    image: claimRotatingEquipment,
    status: "open",
    severity: "critical",
    faultParty: "supplier",
    claimAmount: 1240000,
    liquidatedDamages: 2100000,
    penaltyPerDay: 35000,
    delayDays: 60,
    description: "Compressor FAT vibration 8.2 mm/s at rated speed — API 617 limit is 6.4 mm/s. Rotor balancing failed twice. Supplier requested additional 60 days. Liquidated damages triggered.",
    legalBasis: "Contract §9.1 — Performance guarantees. API 617 §4.9 vibration limits. Liquidated damages per PO Schedule C §2.",
    contractClause: "Contract §9.1 · API 617 §4.9 · PO Schedule C",
    evidenceCount: 16,
    ncrCount: 4,
    auditTrail: [
      { date: "2024-11-01", action: "Compressor FAT — vibration 8.2 mm/s at rated speed", by: "Inspector V. Popov", type: "inspection" },
      { date: "2024-11-01", action: "API 617 limit: 6.4 mm/s — FAIL recorded", by: "Rotating Eq. Engineer", type: "evidence" },
      { date: "2024-11-03", action: "First rotor re-balance attempted", by: "Nevsky Workshop", type: "inspection" },
      { date: "2024-11-05", action: "Re-test: 7.8 mm/s — still exceeds limit", by: "Inspector V. Popov", type: "inspection" },
      { date: "2024-11-08", action: "NCR-2024-0445 issued — FAT failure", by: "QC Manager D. Fischer", type: "inspection" },
      { date: "2024-11-10", action: "Supplier requests 60-day extension for rotor rework", by: "Nevsky PM", type: "response" },
      { date: "2024-11-12", action: "LD penalty triggered: $35,000/day from delivery due date", by: "Contract Admin L. Santos", type: "penalty" },
    ],
    findings: [
      "Vibration 8.2 mm/s — exceeds API 617 limit of 6.4 mm/s",
      "First re-balance failed — 7.8 mm/s still above limit",
      "Root cause: suspected rotor mass imbalance at 3rd stage",
      "Supplier requests 60-day extension — LD clock running",
    ],
    evidenceFiles: [
      { name: "FAT-Vibration-Report.pdf", type: "measurement", size: "4.8 MB", date: "2024-11-01", by: "Inspector V. Popov", description: "Factory Acceptance Test vibration measurement report — proximity probes at all bearing locations",
        measurements: [
          { label: "Vibration @ Rated Speed", actual: "8.2 mm/s", spec: "≤6.4 mm/s", status: "fail" },
          { label: "Vibration @ Trip", actual: "9.1 mm/s", spec: "≤8.0 mm/s", status: "fail" },
          { label: "Bearing #1 Temp", actual: "78°C", spec: "≤85°C", status: "pass" },
          { label: "Oil Pressure", actual: "2.8 bar", spec: "2.5–3.5 bar", status: "pass" },
          { label: "Axial Displacement", actual: "0.12 mm", spec: "≤0.15 mm", status: "pass" },
        ]
      },
      { name: "Vibration-Spectrum-Analysis.pdf", type: "scan", size: "6.2 MB", date: "2024-11-01", by: "Rotating Eq. Engineer", description: "FFT spectrum analysis — dominant 1× frequency confirms mass imbalance, no sub-synchronous activity", hasImage: true },
      { name: "Re-Balance-Attempt-1.pdf", type: "report", size: "2.1 MB", date: "2024-11-03", by: "Nevsky Workshop", description: "First rotor re-balance report — trial weights at 120° and 240°, residual imbalance still excessive" },
      { name: "Re-Test-Results-7.8mms.pdf", type: "measurement", size: "3.4 MB", date: "2024-11-05", by: "Inspector V. Popov", description: "Post-rebalance vibration re-test — 7.8 mm/s still exceeds API 617 §4.9 limit of 6.4 mm/s",
        measurements: [
          { label: "Vibration (re-test)", actual: "7.8 mm/s", spec: "≤6.4 mm/s", status: "fail" },
          { label: "Improvement", actual: "5%", spec: "≥22%", status: "fail" },
        ]
      },
      { name: "NCR-2024-0445.pdf", type: "document", size: "620 KB", date: "2024-11-08", by: "QC Manager D. Fischer", description: "NCR for FAT failure — compressor cannot ship until vibration within API limits" },
      { name: "API-617-Compliance-Matrix.xlsx", type: "certificate", size: "380 KB", date: "2024-11-01", by: "Rotating Eq. Engineer", description: "Full API 617 §4.9 compliance matrix — 2 of 12 parameters failed, 10 passed" },
      { name: "FAT-Video-Full-Speed.mp4", type: "video", size: "245 MB", date: "2024-11-01", by: "Inspector V. Popov", description: "4K video of compressor FAT at rated speed — audible vibration anomaly at 3rd stage" },
    ],
  },
];

/* ── KPI data ── */
const getKPIs = () => {
  const total = claimCases.length;
  const supplierFault = claimCases.filter(c => c.faultParty === "supplier").length;
  const clientFault = claimCases.filter(c => c.faultParty === "client").length;
  const totalClaimValue = claimCases.reduce((s, c) => s + c.claimAmount + c.liquidatedDamages, 0);
  const supplierLiability = claimCases.filter(c => c.faultParty !== "client").reduce((s, c) => s + c.claimAmount + c.liquidatedDamages, 0);
  const clientExposure = claimCases.filter(c => c.faultParty === "client").reduce((s, c) => s + c.liquidatedDamages, 0);
  const totalEvidence = claimCases.reduce((s, c) => s + c.evidenceCount, 0);
  const totalDelay = claimCases.reduce((s, c) => s + c.delayDays, 0);
  return { total, supplierFault, clientFault, totalClaimValue, supplierLiability, clientExposure, totalEvidence, totalDelay };
};

const formatCurrency = (v: number) => `$${(v / 1000000).toFixed(2)}M`;
const formatK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`;

const statusConfig: Record<ClaimStatus, { label: string; color: string; bg: string }> = {
  "open": { label: "Open", color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  "submitted": { label: "Submitted", color: "text-accent", bg: "bg-accent/10 border-accent/30" },
  "disputed": { label: "Disputed", color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
  "resolved": { label: "Resolved", color: "text-accent", bg: "bg-accent/15 border-accent/40" },
  "client-fault": { label: "Client Fault", color: "text-primary", bg: "bg-primary/10 border-primary/30" },
};

const severityConfig: Record<Severity, { color: string }> = {
  critical: { color: "text-destructive" },
  major: { color: "text-warning" },
  minor: { color: "text-accent" },
};

const auditTypeIcons: Record<string, typeof FileText> = {
  inspection: Camera,
  legal: Gavel,
  evidence: FileText,
  penalty: Scale,
  response: Shield,
};

/* ── Detail Modal ── */
const ClaimDetailModal = ({ claim, onClose }: { claim: ClaimCase; onClose: () => void }) => {
  const [tab, setTab] = useState<"overview" | "evidence" | "penalty" | "audit">("overview");
  const sc = statusConfig[claim.status];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
        className="bg-background border border-border rounded-xl w-full max-w-[1100px] max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border">
          <div className="flex gap-4 items-start">
            <img src={claim.image} alt={claim.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">{claim.id}</span>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                <span className={`text-[9px] font-bold uppercase ${severityConfig[claim.severity].color}`}>{claim.severity}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{claim.title}</h3>
              <div className="text-[11px] text-muted-foreground mt-1">{claim.equipment} · {claim.supplier}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-6">
          {(["overview", "evidence", "penalty", "audit"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors border-b-2 ${
                tab === t ? "text-foreground border-accent" : "text-muted-foreground border-transparent hover:text-foreground/70"
              }`}>{t}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
          {tab === "overview" && (
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Description</div>
                <p className="text-[13px] text-foreground/80 leading-relaxed">{claim.description}</p>
              </div>

              {claim.clientFaultReason && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Client Responsibility</span>
                  </div>
                  <p className="text-[12px] text-foreground/70 leading-relaxed">{claim.clientFaultReason}</p>
                </div>
              )}

              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Legal Basis</div>
                <p className="text-[12px] text-foreground/70 leading-relaxed">{claim.legalBasis}</p>
                <span className="text-[10px] font-mono text-accent mt-1 block">{claim.contractClause}</span>
              </div>

              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">Findings</div>
                <div className="space-y-1.5">
                  {claim.findings.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-destructive mt-1.5 flex-shrink-0 rounded-full" />
                      <span className="text-[12px] text-foreground/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Financials */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Direct Claim", value: formatK(claim.claimAmount), color: claim.faultParty === "client" ? "text-muted-foreground" : "text-warning" },
                  { label: "Liquidated Damages", value: formatK(claim.liquidatedDamages), color: "text-destructive" },
                  { label: "Penalty Rate", value: `$${(claim.penaltyPerDay / 1000).toFixed(0)}K/day`, color: "text-foreground/60" },
                  { label: "Delay Days", value: `${claim.delayDays}d`, color: "text-warning" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/50 border border-border rounded-lg p-3">
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{item.label}</div>
                    <div className={`text-lg font-bold ${item.color} mt-1`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "evidence" && (
            <div className="space-y-6">
              {/* Summary bar */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{claim.evidenceFiles.length} Evidence Files</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-accent font-bold">{claim.ncrCount} NCRs</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[11px] text-muted-foreground">{claim.evidenceFiles.filter(e => e.measurements).length} Measurement Reports</span>
                </div>
              </div>

              {/* Primary photo */}
              <div className="rounded-lg overflow-hidden h-[180px]">
                <img src={claim.image} alt="Primary evidence" className="w-full h-full object-cover" />
              </div>

              {/* Evidence files list */}
              <div className="space-y-2">
                {claim.evidenceFiles.map((ev, i) => {
                  const cfg = evidenceTypeConfig[ev.type];
                  const Icon = cfg.icon;
                  return (
                    <div key={i} className="border border-border rounded-lg overflow-hidden">
                      {/* File header */}
                      <div className="flex items-start gap-3 p-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                          <Icon className={`w-4 h-4 ${cfg.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[12px] font-bold text-foreground truncate">{ev.name}</span>
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color}`}>{ev.type}</span>
                          </div>
                          <p className="text-[11px] text-foreground/70 leading-relaxed">{ev.description}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] font-mono text-foreground/50">{ev.date}</span>
                            <span className="text-[9px] text-foreground/30">·</span>
                            <span className="text-[9px] text-foreground/50">{ev.by}</span>
                            <span className="text-[9px] text-foreground/30">·</span>
                            <span className="text-[9px] text-foreground/50">{ev.size}</span>
                          </div>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0">
                          <Download className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Measurement table if present */}
                      {ev.measurements && (
                        <div className="border-t border-border bg-muted/30 px-3 py-2">
                          <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                            <BarChart3 className="w-3 h-3" /> Measurement Data
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                            {ev.measurements.map((m, mi) => (
                              <div key={mi} className="flex items-center justify-between bg-background rounded px-2.5 py-1.5 border border-border/50">
                                <span className="text-[10px] text-foreground/70">{m.label}</span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-mono font-bold ${m.status === "fail" ? "text-destructive" : "text-accent"}`}>{m.actual}</span>
                                  <span className="text-[9px] text-foreground/50">spec: {m.spec}</span>
                                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                    m.status === "fail" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                                  }`}>{m.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "penalty" && (
            <div className="space-y-6">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-3">Penalty Calculation</div>

              <div className="bg-muted/30 border border-border rounded-lg p-5 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-[12px] text-foreground/70">Contractual Delivery Date</span>
                  <span className="text-[12px] text-foreground font-mono">{claim.auditTrail[0]?.date || "—"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-[12px] text-foreground/70">Penalty Rate</span>
                  <span className="text-[12px] text-foreground font-mono font-bold">${claim.penaltyPerDay.toLocaleString()} / day</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-[12px] text-foreground/70">Delay Duration</span>
                  <span className="text-[12px] text-warning font-mono font-bold">{claim.delayDays} days</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-[12px] text-foreground/70">Liquidated Damages (LD)</span>
                  <span className="text-[14px] text-destructive font-mono font-bold">{formatK(claim.liquidatedDamages)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-[12px] text-foreground/70">Direct Repair / Re-work Cost</span>
                  <span className="text-[14px] text-warning font-mono font-bold">{formatK(claim.claimAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[13px] text-foreground font-bold">Total Exposure</span>
                  <span className="text-[18px] text-destructive font-bold font-mono">{formatK(claim.claimAmount + claim.liquidatedDamages)}</span>
                </div>
              </div>

              {claim.faultParty === "client" && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <span className="text-[11px] font-bold text-primary">⚠ Client bears full liability for this exposure per FIDIC Cl. 13.1/8.4</span>
                </div>
              )}
            </div>
          )}

          {tab === "audit" && (
            <div className="space-y-1">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-4">Full Audit Trail — {claim.auditTrail.length} entries</div>
              {claim.auditTrail.map((entry, i) => {
                const Icon = auditTypeIcons[entry.type] || FileText;
                const typeColors: Record<string, string> = {
                  inspection: "text-accent bg-accent/10",
                  legal: "text-primary bg-primary/10",
                  evidence: "text-warning bg-warning/10",
                  penalty: "text-destructive bg-destructive/10",
                  response: "text-muted-foreground bg-muted",
                };
                return (
                  <div key={i} className="flex gap-3 py-2.5 border-b border-border/50 last:border-none">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[entry.type]?.split(" ")[1] || "bg-muted"}`}>
                      <Icon className={`w-3.5 h-3.5 ${typeColors[entry.type]?.split(" ")[0] || "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground/80">{entry.action}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-foreground/50">{entry.date}</span>
                        <span className="text-[10px] text-foreground/30">·</span>
                        <span className="text-[10px] text-foreground/50">{entry.by}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-[11px] text-foreground/60 font-medium transition-colors">Export PDF</button>
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-[11px] text-foreground/60 font-medium transition-colors">Share</button>
          </div>
          <div className="flex gap-2">
            {claim.faultParty !== "client" && (
              <button className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 rounded-lg text-[11px] text-destructive font-bold transition-colors">
                Issue Legal Notice
              </button>
            )}
            <button className="px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg text-[11px] text-accent-foreground font-bold transition-colors">
              {claim.faultParty === "client" ? "File EOT Claim" : "Submit Claim"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main Dashboard ── */
export default function LNGSupplierClaimsDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<ClaimCase | null>(null);
  const [filter, setFilter] = useState<"all" | "supplier" | "client">("all");
  const kpi = getKPIs();

  const filtered = filter === "all" ? claimCases
    : filter === "supplier" ? claimCases.filter(c => c.faultParty !== "client")
    : claimCases.filter(c => c.faultParty === "client");

  return (
    <div className="w-full">
      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-border rounded-xl overflow-hidden mb-6">
        {[
          { label: "Total Claims", value: kpi.total.toString(), icon: FileText, color: "text-foreground" },
          { label: "Total Exposure", value: formatCurrency(kpi.totalClaimValue), icon: TrendingDown, color: "text-destructive" },
          { label: "Supplier Liability", value: formatCurrency(kpi.supplierLiability), icon: Scale, color: "text-warning" },
          { label: "Client Exposure", value: formatCurrency(kpi.clientExposure), icon: AlertTriangle, color: "text-primary" },
          { label: "Supplier Fault", value: kpi.supplierFault.toString(), icon: TrendingUp, color: "text-warning" },
          { label: "Client Fault", value: kpi.clientFault.toString(), icon: Shield, color: "text-primary" },
          { label: "Evidence Files", value: kpi.totalEvidence.toString(), icon: Camera, color: "text-accent" },
          { label: "Delay Days", value: `${kpi.totalDelay}d`, icon: Clock, color: "text-destructive" },
        ].map((item, i) => (
          <div key={i} className="bg-background p-4 flex flex-col items-center text-center">
            <item.icon className={`w-4 h-4 ${item.color} mb-2 opacity-60`} />
            <div className={`text-lg md:text-xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {(["all", "supplier", "client"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border ${
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}>
            {f === "all" ? "All Cases" : f === "supplier" ? "Supplier Fault" : "Client Fault"}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-[11px] text-muted-foreground font-mono">{filtered.length} cases</span>
      </div>

      {/* Claim Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((claim, i) => {
          const sc = statusConfig[claim.status];
          return (
            <motion.div key={claim.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedClaim(claim)}
              className="bg-background border border-border rounded-xl overflow-hidden cursor-pointer group hover:border-foreground/20 hover:shadow-lg transition-all">

              {/* Image */}
              <div className="relative h-[140px] overflow-hidden">
                <img src={claim.image} alt={claim.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`text-[8px] font-bold uppercase px-2 py-1 rounded border ${sc.bg} ${sc.color}`}>{sc.label}</span>
                  <span className={`text-[8px] font-bold uppercase px-2 py-1 rounded border border-border bg-background/80 ${severityConfig[claim.severity].color}`}>{claim.severity}</span>
                </div>
                <span className="absolute top-3 right-3 text-[9px] font-mono text-foreground/50 bg-background/70 px-2 py-0.5 rounded">{claim.id}</span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-[13px] font-bold text-foreground mb-1 line-clamp-1">{claim.title}</h4>
                <div className="text-[10px] text-muted-foreground mb-3">{claim.equipment}</div>

                {/* Financials */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider font-bold">Claim</div>
                    <div className="text-[13px] font-bold text-warning">{formatK(claim.claimAmount + claim.liquidatedDamages)}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider font-bold">LD Penalty</div>
                    <div className="text-[13px] font-bold text-destructive">{formatK(claim.liquidatedDamages)}</div>
                  </div>
                </div>

                {/* Delay + Evidence + Fault */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-foreground/60"><Clock className="w-3 h-3 inline mr-1" />{claim.delayDays}d</span>
                    <span className="text-[10px] text-foreground/60"><Camera className="w-3 h-3 inline mr-1" />{claim.evidenceCount}</span>
                    <span className="text-[10px] text-foreground/60"><FileText className="w-3 h-3 inline mr-1" />{claim.ncrCount} NCR</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-foreground/50 transition-colors" />
                </div>

                {/* Fault party bar */}
                <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    claim.faultParty === "client" ? "bg-primary" :
                    claim.faultParty === "supplier" ? "bg-destructive" : "bg-warning"
                  }`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    claim.faultParty === "client" ? "text-primary" :
                    claim.faultParty === "supplier" ? "text-destructive" : "text-warning"
                  }`}>
                    {claim.faultParty === "client" ? "Client Fault" :
                     claim.faultParty === "supplier" ? "Supplier Fault" : "Shared Liability"}
                  </span>
                  <span className="text-[9px] text-foreground/40 ml-auto">{claim.supplier}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedClaim && <ClaimDetailModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />}
      </AnimatePresence>
    </div>
  );
}
