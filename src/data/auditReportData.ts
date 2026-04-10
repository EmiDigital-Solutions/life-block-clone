// Comprehensive ISO 9001:2015 Supplier Audit Report Data
// Supplier: MV Motors d.o.o. — Tier-2 automotive (engine mounts & brackets)
// Standard: ISO 9001:2015 + IATF 16949:2016

import stationSupplier from '@/assets/audit/station-supplier.jpg';
import stationReception from '@/assets/audit/station-reception.jpg';
import stationIncoming from '@/assets/audit/station-incoming.jpg';
import stationProduction from '@/assets/audit/station-production.jpg';
import stationAssembly from '@/assets/audit/station-assembly.jpg';
import stationTesting from '@/assets/audit/station-testing.jpg';
import stationPacking from '@/assets/audit/station-packing.jpg';
import stationDocumentation from '@/assets/audit/station-documentation.jpg';

export type VerdictType = 'go' | 'conditional' | 'hold' | 'nogo';
export type FindingSeverity = 'pass' | 'observation' | 'concern' | 'minor-ncr' | 'major-ncr' | 'na';
export type NCRStatus = 'open' | 'in-progress' | 'closed' | 'escalated';
export type StationHealth = 'green' | 'amber' | 'red' | 'grey';
export type DepthLevel = 'executive' | 'standard' | 'full';

export interface KPITile {
  label: string;
  value: string;
  unit?: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  interpretation: string;
}

export interface NCR {
  id: string;
  severity: 'minor' | 'major';
  station: string;
  stationIndex: number;
  title: string;
  observation: string;
  rootCause: string;
  recommendedAction: string;
  owner: string | null;
  dueDate: string | null;
  evidenceIds: string[];
  status: NCRStatus;
  isoClause?: string;
}

export interface Finding {
  type: FindingSeverity;
  title: string;
  description: string;
  ncrId?: string;
  isoClause?: string;
}

export interface AuditQuestion {
  id: string;
  clause: string;
  question: string;
  score: number | null; // 0-10 or null if N/A
  notes: string;
}

export interface Station {
  index: number;
  name: string;
  health: StationHealth;
  heroPhoto: string;
  observation: string;
  interpretation: string;
  confidence: number;
  actionType: 'accept' | 'rework' | 'reject' | 'escalate' | 'none';
  findings: Finding[];
  evidenceCount: { photos: number; measurements: number; videos: number };
  ncrs: NCR[];
  auditQuestions?: AuditQuestion[];
}

// ─── Report Metadata ───────────────────────────────────────────
export const reportMeta = {
  verdict: 'conditional' as VerdictType,
  verdictLabel: 'CONDITIONAL GO',
  heroReason: '5 open non-conformities across 3 stations require your decision before PO release',
  supplier: 'MV Motors d.o.o.',
  po: 'PO 4500938221',
  auditor: 'I. Petrović, Lead Auditor (IRCA Cert. #A21849)',
  date: '2026-04-08',
  location: 'Zagreb, HR — Žitnjak Industrial Zone, Hall B',
  standard: 'ISO 9001:2015 / IATF 16949:2016',
  client: 'Linde Engineering GmbH',
  scope: 'Manufacture of precision-machined engine mounts (P/N EM-4200 series) and structural brackets (P/N SB-7100 series) for BMW N20 powertrain platform',
  auditType: 'Surveillance Audit — Annual (2nd of 3-year cycle)',
  previousAuditDate: '2025-04-12',
  previousScore: 74,
  certBody: 'TÜV SÜD Management Service GmbH',
  certNumber: 'ISO 9001:2015 — TÜV-MS/QM/2024/0847',
  certExpiry: '2027-03-15',
};

// ─── KPIs ──────────────────────────────────────────────────────
export const kpis: KPITile[] = [
  { label: 'Overall Score', value: '72', unit: '/100', trend: 'down', trendValue: '−2', interpretation: 'Declined from 74 in last audit due to new NCRs in Testing & Production' },
  { label: 'Open NCRs', value: '5', trend: 'up', trendValue: '+3', interpretation: 'Up from 2 in Apr 2025 — 2 major, 3 minor' },
  { label: 'On-time Delivery', value: '87', unit: '%', trend: 'down', trendValue: '−7%', interpretation: 'Forecast adjusted for calibration rework delay' },
  { label: 'Audit Coverage', value: '12', unit: '/13', trend: 'flat', trendValue: '—', interpretation: 'Station 11 (Delay Forecast) is analytical, not inspectable' },
];

// ─── Stations ──────────────────────────────────────────────────
export const stations: Station[] = [
  // Station 1: Verdict & Summary (hero, no content)
  {
    index: 1, name: 'Verdict & Summary', health: 'amber', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },

  // Station 2: Supplier Snapshot
  {
    index: 2, name: 'Supplier Snapshot', health: 'green',
    heroPhoto: stationSupplier,
    observation: 'MV Motors d.o.o. is a Tier-2 automotive supplier specializing in precision-machined engine mounts and structural brackets for European OEMs. 280 employees across two shifts, 4,200 m² production area with 23 CNC machines. ISO 9001:2015 & IATF 16949:2016 certified since 2019. Primary customer: BMW via Linde Engineering. Annual revenue €18.4M (2025).',
    interpretation: 'Stable supplier with 8-year relationship. Revenue grew 12% YoY. Workforce turnover at 6.2% — below regional average of 11%. Key risk: single-source dependency for CNC boring operations on Mazak Integrex machines. Second risk: no formal succession plan for Quality Manager.',
    confidence: 95, actionType: 'none',
    findings: [
      { type: 'pass', title: 'Organizational context (4.1)', description: 'Organization has documented internal/external issues affecting the QMS. SWOT analysis updated Q1 2026.', isoClause: '4.1' },
      { type: 'pass', title: 'Interested parties (4.2)', description: 'Stakeholder register maintained and reviewed semi-annually. Customer requirements clearly mapped.', isoClause: '4.2' },
      { type: 'observation', title: 'Business continuity planning', description: 'No formal BCP for single-source CNC boring operations. Recommend documenting contingency plan.', isoClause: '6.1' },
    ],
    evidenceCount: { photos: 4, measurements: 0, videos: 1 }, ncrs: [],
    auditQuestions: [
      { id: 'Q2-01', clause: '4.1', question: 'Has the organization determined external and internal issues relevant to its purpose and strategic direction?', score: 9, notes: 'SWOT analysis updated Q1 2026. Includes market, regulatory, and technological factors.' },
      { id: 'Q2-02', clause: '4.2', question: 'Has the organization determined the interested parties relevant to the QMS and their requirements?', score: 9, notes: 'Stakeholder register includes customers, regulators, employees, suppliers. Reviewed semi-annually.' },
      { id: 'Q2-03', clause: '4.3', question: 'Has the organization determined the boundaries and applicability of the QMS scope?', score: 8, notes: 'Scope documented. Excludes design — correctly noted as outsourced to customer.' },
      { id: 'Q2-04', clause: '4.4', question: 'Has the organization established, implemented, maintained, and continually improved its QMS?', score: 8, notes: 'QMS structure sound. Process interaction diagram current. Some gaps in change management process.' },
      { id: 'Q2-05', clause: '5.1', question: 'Does top management demonstrate leadership and commitment to the QMS?', score: 9, notes: 'CEO participated in opening meeting. Quarterly management reviews documented.' },
      { id: 'Q2-06', clause: '6.1', question: 'Has the organization planned actions to address risks and opportunities?', score: 6, notes: 'Risk register exists but no BCP for single-source CNC boring dependency. Gap noted.' },
    ],
  },

  // Station 3: Reception & Management Review
  {
    index: 3, name: 'Reception & Management', health: 'green',
    heroPhoto: stationReception,
    observation: 'Reception area clean and organized. Full PPE set provided on arrival. Visitor log digitized with NDA auto-signature via tablet. Management team — including CEO, Quality Manager, and Production Director — present for opening meeting. Quality policy displayed at entrance and all production stations. Management review minutes from Q1 2026 presented, covering all ISO 9001 Clause 9.3 required inputs.',
    interpretation: 'Strong management commitment evidenced by CEO participation and well-structured management review process. The quality culture is visibly embedded at leadership level. Positive indicator for corrective action follow-through on previous audit findings.',
    confidence: 94, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Leadership commitment (5.1)', description: 'CEO actively engaged in audit opening. Quality objectives cascaded to department KPIs.', isoClause: '5.1' },
      { type: 'pass', title: 'Quality policy (5.2)', description: 'Policy displayed, understood by interviewed staff, and appropriate to organizational context.', isoClause: '5.2' },
      { type: 'pass', title: 'Management review (9.3)', description: 'Q1 2026 minutes complete: customer feedback, audit results, process performance, risks, improvement opportunities all addressed.', isoClause: '9.3' },
      { type: 'observation', title: 'Quality objectives measurability', description: 'Two of six quality objectives lack quantifiable targets. Recommend adding specific KPIs for "improve customer satisfaction" and "enhance employee competence."', isoClause: '6.2' },
      { type: 'pass', title: 'Organizational roles & authorities (5.3)', description: 'Org chart current. Responsibilities documented in role descriptions. Quality Manager has authority to stop production.', isoClause: '5.3' },
    ],
    evidenceCount: { photos: 5, measurements: 0, videos: 0 }, ncrs: [],
    auditQuestions: [
      { id: 'Q3-01', clause: '5.1.1', question: 'Does top management demonstrate leadership and commitment with respect to the QMS?', score: 9, notes: 'CEO personally chairs quarterly management reviews.' },
      { id: 'Q3-02', clause: '5.1.2', question: 'Does top management ensure customer requirements are determined and met?', score: 9, notes: 'Customer requirements matrix maintained. BMW-specific requirements flagged.' },
      { id: 'Q3-03', clause: '5.2', question: 'Has top management established a quality policy appropriate to the purpose of the organization?', score: 8, notes: 'Policy current but dated 2024 — recommend annual re-endorsement.' },
      { id: 'Q3-04', clause: '5.3', question: 'Has top management assigned relevant QMS responsibilities and authorities?', score: 9, notes: 'Clear authority matrix. Quality Manager can halt production.' },
      { id: 'Q3-05', clause: '6.2', question: 'Has the organization established quality objectives at relevant functions and levels?', score: 7, notes: 'Objectives exist but 2/6 lack measurable targets.' },
      { id: 'Q3-06', clause: '9.3', question: 'Does management review address all required inputs per ISO 9001:2015?', score: 9, notes: 'Minutes cover all 9.3.2 inputs including changes, nonconformities, monitoring results, and improvement opportunities.' },
    ],
  },

  // Station 4: Incoming Goods / QC
  {
    index: 4, name: 'Incoming Goods / QC', health: 'amber',
    heroPhoto: stationIncoming,
    observation: 'Incoming inspection area well-lit with dedicated measurement bench. Raw material lots traced via barcode system linked to SAP. However, 3 of 12 incoming inspection records from March 2026 were missing inspector signatures. Material certificates (3.1 per EN 10204) available for all steel batches. Supplier evaluation matrix covers 42 active suppliers but 6 have not been re-evaluated in over 18 months.',
    interpretation: 'Material traceability is fully digitized and reliable. The unsigned inspection records indicate a process discipline gap — not a systemic failure, but requiring corrective action. Supplier re-evaluation delays could mask quality deterioration in the supply chain.',
    confidence: 87, actionType: 'rework',
    findings: [
      { type: 'pass', title: 'Material traceability (8.5.2)', description: 'Barcode scanning system linked to SAP ERP. Full lot trace demonstrated from raw steel coil to finished part.', isoClause: '8.5.2' },
      { type: 'minor-ncr', title: 'Unsigned inspection records', description: '3 of 12 incoming inspection records from March 2026 missing inspector signatures. Violates documented procedure QP-INC-003 and ISO 9001 Clause 7.5.', ncrId: 'NCR-0004', isoClause: '7.5' },
      { type: 'concern', title: 'Supplier re-evaluation overdue', description: '6 of 42 active suppliers not re-evaluated within the 12-month cycle defined in QP-PUR-001. Oldest evaluation: 19 months.', isoClause: '8.4' },
      { type: 'pass', title: 'Material certificates', description: 'EN 10204 Type 3.1 certificates present for all steel batches inspected. Chemical composition within specification.', isoClause: '8.4.2' },
      { type: 'observation', title: 'Incoming rejection tracking', description: 'Rejection rate at 1.8% — above the 1.5% target. Trend upward from 1.2% in 2025. Main contributor: dimensional issues from Supplier #S-017.', isoClause: '8.4.2' },
    ],
    evidenceCount: { photos: 6, measurements: 4, videos: 0 },
    ncrs: [
      {
        id: 'NCR-0004', severity: 'minor', station: 'Incoming Goods / QC', stationIndex: 4,
        title: 'Unsigned incoming inspection records',
        observation: '3 of 12 incoming inspection records from March 2026 missing inspector signatures, violating documented procedure QP-INC-003.',
        rootCause: 'Inspector shift handover process does not include signature verification step (AI-suggested)',
        recommendedAction: 'Implement shift-end signature verification checklist. Retrospectively complete missing signatures with investigation note.',
        owner: null, dueDate: null, evidenceIds: ['EVD-020', 'EVD-021', 'EVD-022'], status: 'open', isoClause: '7.5.3',
      },
    ],
    auditQuestions: [
      { id: 'Q4-01', clause: '8.4.1', question: 'Does the organization ensure that externally provided processes, products, and services conform to requirements?', score: 7, notes: 'Incoming inspection effective but signature discipline needs improvement.' },
      { id: 'Q4-02', clause: '8.4.2', question: 'Has the organization defined controls for externally provided processes, products, and services?', score: 8, notes: 'Incoming inspection plan QP-INC-003 well-defined. Material certificates verified.' },
      { id: 'Q4-03', clause: '8.4.3', question: 'Has the organization communicated applicable requirements to external providers?', score: 7, notes: 'Purchase orders include quality requirements. Some suppliers lack updated specifications.' },
      { id: 'Q4-04', clause: '8.5.2', question: 'Can the organization identify outputs by suitable means throughout production?', score: 9, notes: 'Full barcode traceability from raw material to finished product via SAP.' },
      { id: 'Q4-05', clause: '7.5.3', question: 'Are documented records controlled (legible, identifiable, retrievable)?', score: 5, notes: 'Missing signatures on 3/12 records. Process discipline gap identified.' },
      { id: 'Q4-06', clause: '8.4.1', question: 'Does the organization evaluate, select, monitor, and re-evaluate external providers?', score: 6, notes: '6 suppliers overdue for re-evaluation. Process exists but adherence lagging.' },
    ],
  },

  // Station 5: Production Lines
  {
    index: 5, name: 'Production Lines', health: 'red',
    heroPhoto: stationProduction,
    observation: 'Two of four CNC machines (Mazak #2 and #4) running without current calibration stickers — last calibration expired 2026-03-15 (24 days overdue). Coolant temperature on Machine #3 measured at 28°C vs. 22°C specification limit, risking thermal expansion on precision bores. Work instructions at stations are current revision. Operator competency records verified for all 8 operators on shift. Chip evacuation system on Machine #1 blocked — metal chips accumulating near spindle.',
    interpretation: 'Critical calibration lapse on 50% of CNC machines creates uncontrolled measurement uncertainty. Historical data shows a 14% rework rate when calibration lapses >30 days at this supplier. Coolant temperature drift compounds the dimensional risk. The chip evacuation blockage is a safety and quality risk that requires immediate attention.',
    confidence: 88, actionType: 'reject',
    findings: [
      { type: 'major-ncr', title: 'Calibration lapse — CNC #2 & #4', description: 'Two CNC machines operating 24 days past calibration due date. Calibration certificates expired 2026-03-15. All parts produced since that date have unverified dimensional accuracy. Violates ISO 9001 Clause 7.1.5.', ncrId: 'NCR-0003', isoClause: '7.1.5' },
      { type: 'concern', title: 'Coolant temperature deviation', description: 'Machine #3 coolant at 28°C vs. 22°C spec. Thermal expansion coefficient for C45 steel = 11.7 µm/m·K, meaning a 6°C deviation on a 200mm workpiece causes ~14µm drift — significant for H7 tolerances.', isoClause: '8.5.1' },
      { type: 'minor-ncr', title: 'Chip evacuation system blocked', description: 'Machine #1 chip conveyor blocked. Metal chips accumulating near spindle area. Quality risk from chip inclusion in surface finish. Safety risk from hot chip projection.', ncrId: 'NCR-0005', isoClause: '7.1.4' },
      { type: 'pass', title: 'Operator competency (7.2)', description: 'All 8 operators on shift have current competency records. Training matrix up to date.', isoClause: '7.2' },
      { type: 'pass', title: 'Work instructions (8.5.1)', description: 'Work instructions WI-CNC-001 through WI-CNC-004 at each station. Current revision D matches controlled document register.', isoClause: '8.5.1' },
      { type: 'observation', title: 'Preventive maintenance schedule', description: 'PM schedule exists but Machine #3 coolant pump was flagged for service in Feb 2026 — still pending. Link to temperature deviation likely.', isoClause: '7.1.3' },
    ],
    evidenceCount: { photos: 12, measurements: 8, videos: 2 },
    ncrs: [
      {
        id: 'NCR-0003', severity: 'major', station: 'Production Lines', stationIndex: 5,
        title: 'Calibration lapse on CNC machines #2 & #4',
        observation: 'Two of four CNC machines operating without valid calibration. Certificates expired 2026-03-15 — 24 days overdue. All parts machined since that date have unverifiable dimensional accuracy.',
        rootCause: 'Calibration scheduling system not integrated with ERP maintenance module. Manual tracking via spreadsheet failed when responsible technician was on leave (AI-suggested)',
        recommendedAction: 'Immediate: Quarantine all parts produced on CNC #2 & #4 since 2026-03-15 (~1,400 parts). Recalibrate machines within 48 hours. Perform 100% dimensional inspection of quarantined parts. Long-term: Integrate calibration scheduling into SAP PM module.',
        owner: null, dueDate: null, evidenceIds: ['EVD-012', 'EVD-013', 'EVD-014', 'EVD-015'], status: 'open', isoClause: '7.1.5',
      },
      {
        id: 'NCR-0005', severity: 'minor', station: 'Production Lines', stationIndex: 5,
        title: 'Chip evacuation system blocked on CNC #1',
        observation: 'Chip conveyor on CNC Machine #1 blocked. Metal chips accumulating near spindle and workpiece area.',
        rootCause: 'Conveyor belt worn and slipping. Replacement part on order but not expedited (AI-suggested)',
        recommendedAction: 'Expedite conveyor belt replacement. Implement interim manual chip clearing every 30 minutes until repair completed. Add chip evacuation check to pre-shift inspection checklist.',
        owner: null, dueDate: null, evidenceIds: ['EVD-016', 'EVD-017'], status: 'open', isoClause: '7.1.4',
      },
    ],
    auditQuestions: [
      { id: 'Q5-01', clause: '7.1.5.1', question: 'Has the organization determined the monitoring and measuring resources needed to ensure valid results?', score: 3, notes: 'CRITICAL: 2 of 4 CNC machines out of calibration. Systemic scheduling failure.' },
      { id: 'Q5-02', clause: '7.1.5.2', question: 'Is measurement traceability maintained where required?', score: 4, notes: 'Calibration certificates reference NIST-traceable standards, but expired certificates void traceability.' },
      { id: 'Q5-03', clause: '8.5.1', question: 'Has the organization implemented production under controlled conditions?', score: 5, notes: 'Work instructions current. Coolant temperature out of specification on Machine #3.' },
      { id: 'Q5-04', clause: '7.2', question: 'Has the organization determined necessary competence of persons?', score: 9, notes: 'All 8 operators trained and certified. Competency matrix maintained.' },
      { id: 'Q5-05', clause: '7.1.4', question: 'Has the organization determined the environment necessary for operation?', score: 5, notes: 'Chip evacuation blocked. Ambient temperature controlled but coolant system degraded.' },
      { id: 'Q5-06', clause: '7.1.3', question: 'Has the organization determined the infrastructure necessary?', score: 6, notes: 'PM schedule exists but not consistently executed. Machine #3 coolant pump overdue for service.' },
      { id: 'Q5-07', clause: '8.5.1', question: 'Are work instructions available at point of use?', score: 9, notes: 'All WIs current revision D, laminated and mounted at each workstation.' },
      { id: 'Q5-08', clause: '8.5.6', question: 'Has the organization implemented control of changes to the extent necessary?', score: 7, notes: 'Change control process exists but recent tooling change on CNC #2 not fully documented.' },
    ],
  },

  // Station 6: Assembly & Sub-assembly
  {
    index: 6, name: 'Assembly & Sub-assy', health: 'green',
    heroPhoto: stationAssembly,
    observation: 'Assembly line running at 92% OEE across both shifts. All 12 torque wrenches calibrated and logged within validity. Poka-yoke fixtures verified on all 8 critical assembly stations — error-proofing active and functional. FIFO system enforced via lane markers and digital pick-to-light. Statistical process control charts updated hourly on 3 critical torque values. No rework or scrap observed during 2-hour observation window.',
    interpretation: 'Well-controlled assembly process with mature error-proofing. SPC data shows all monitored characteristics within control limits for the past 30 production days. OEE of 92% is best-in-class for this product type. No systemic risk identified.',
    confidence: 96, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Torque verification (8.5.1)', description: 'All 12 torque stations within ±2% of target. Calibration current. SPC charts demonstrate Cpk > 1.67 on all critical torques.', isoClause: '8.5.1' },
      { type: 'pass', title: 'Error-proofing / Poka-yoke (8.5.1)', description: 'Error-proofing active on 8/8 critical assembly points. Tested during audit — all correctly rejected misoriented parts.', isoClause: '8.5.1' },
      { type: 'pass', title: 'FIFO enforcement (8.5.4)', description: 'First-in-first-out strictly maintained. Lane markers, color coding, and digital pick-to-light system in use.', isoClause: '8.5.4' },
      { type: 'pass', title: 'Traceability through assembly (8.5.2)', description: 'Each sub-assembly receives unique serial number via laser marking. Full component traceability to raw material lot.', isoClause: '8.5.2' },
      { type: 'pass', title: 'Competency & awareness (7.2/7.3)', description: 'Assembly operators passed practical skills assessment. Quality alerts from last audit visibly posted at workstations.', isoClause: '7.2' },
    ],
    evidenceCount: { photos: 8, measurements: 12, videos: 1 }, ncrs: [],
    auditQuestions: [
      { id: 'Q6-01', clause: '8.5.1', question: 'Has the organization implemented production under controlled conditions including monitoring and measurement?', score: 9, notes: 'SPC on 3 critical torques. All within control limits for 30 days.' },
      { id: 'Q6-02', clause: '8.5.1', question: 'Are error-proofing devices implemented and verified?', score: 10, notes: 'Poka-yoke tested live during audit. All 8 fixtures functioned correctly.' },
      { id: 'Q6-03', clause: '8.5.2', question: 'Is product identification and traceability maintained through assembly?', score: 9, notes: 'Laser-marked serial numbers on each sub-assembly. Full genealogy in SAP.' },
      { id: 'Q6-04', clause: '8.5.4', question: 'Is preservation of outputs ensured (FIFO, handling, packaging)?', score: 9, notes: 'FIFO strictly enforced via pick-to-light and lane markers.' },
      { id: 'Q6-05', clause: '7.2', question: 'Are personnel competent based on education, training, and experience?', score: 9, notes: 'All operators have current skills matrix. Annual recertification in place.' },
    ],
  },

  // Station 7: Final Test & Validation
  {
    index: 7, name: 'Final Test & Validation', health: 'red',
    heroPhoto: stationTesting,
    observation: 'Dimensional check on Bore ID Ø42H7 showed Cpk = 0.98 against BMW minimum requirement of Cpk ≥ 1.33. 30-piece sample measured on Zeiss CONTURA CMM (S/N: CMM-2019-0847). Test fixture alignment verified — offset by 0.02mm from nominal datum A. Surface roughness Ra on critical sealing face measured at 1.8µm vs. specification of Ra ≤ 1.6µm on 2 of 5 sampled parts. Gauge R&R study from January 2026 showed 18% total variation — acceptable but approaching the 20% warning threshold.',
    interpretation: 'Critical process capability gap on Bore ID. At current Cpk of 0.98, the expected defect rate is ~2.7% or 27,000 DPPM — far exceeding BMW\'s 50 DPPM target. Fixture misalignment is a contributing factor. Surface roughness exceedance on sealing faces creates leak risk in final engine assembly. Combined, these findings represent the highest risk in this audit.',
    confidence: 85, actionType: 'reject',
    findings: [
      { type: 'major-ncr', title: 'Cpk below requirement — Bore ID Ø42H7', description: 'Cpk = 0.98 vs. BMW requirement of Cpk ≥ 1.33. 30-piece study on Zeiss CMM. Process is not capable. Expected reject rate ~2.7% (27,000 DPPM) vs. 50 DPPM target.', ncrId: 'NCR-0001', isoClause: '8.6' },
      { type: 'minor-ncr', title: 'CMM fixture misalignment', description: 'CMM fixture offset by 0.02mm from nominal datum A. Contributing to measurement variation. Gauge R&R at 18% — approaching 20% limit.', ncrId: 'NCR-0002', isoClause: '7.1.5' },
      { type: 'concern', title: 'Surface roughness exceedance', description: 'Ra = 1.8µm on 2 of 5 parts vs. Ra ≤ 1.6µm specification on critical sealing face. Potential leak path in final assembly.', isoClause: '8.6' },
      { type: 'observation', title: 'Gauge R&R trending upward', description: 'Measurement system analysis shows 18% total variation — up from 12% in 2025. Approaching 20% action threshold.', isoClause: '7.1.5.1' },
      { type: 'pass', title: 'Test equipment calibration', description: 'Zeiss CONTURA CMM calibration current (due 2026-09-15). Surface roughness tester Mitutoyo SJ-410 calibrated.', isoClause: '7.1.5.2' },
      { type: 'pass', title: 'Test records (7.5)', description: 'All inspection records complete, signed, and archived per document retention policy (7 years).', isoClause: '7.5.3' },
    ],
    evidenceCount: { photos: 8, measurements: 16, videos: 2 },
    ncrs: [
      {
        id: 'NCR-0001', severity: 'major', station: 'Final Test & Validation', stationIndex: 7,
        title: 'Cpk below requirement on Bore ID Ø42H7',
        observation: 'Dimensional capability study: Cpk = 0.98 vs. BMW minimum Cpk ≥ 1.33. 30-piece sample on Zeiss CONTURA CMM. Process mean shifted +0.008mm from nominal.',
        rootCause: 'Tool wear on boring bar (Bar #BB-2019-042, 1,847 cycles since last insert change vs. 1,500 cycle recommended interval) combined with coolant temperature drift from Station 5 (AI-suggested)',
        recommendedAction: 'Reject current lot (~340 parts). Replace boring bar insert. Verify coolant system repair. Run new 50-piece capability study. Submit PPAP Level 3 re-approval before production restart.',
        owner: null, dueDate: null, evidenceIds: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-004', 'EVD-005'], status: 'open', isoClause: '8.6',
      },
      {
        id: 'NCR-0002', severity: 'minor', station: 'Final Test & Validation', stationIndex: 7,
        title: 'CMM fixture misalignment — datum A offset',
        observation: 'CMM fixture offset by 0.02mm from nominal datum A. Gauge R&R study shows 18% total variation.',
        rootCause: 'Fixture locating pin worn. Not re-zeroed after last calibration cycle in January 2026 (AI-suggested)',
        recommendedAction: 'Replace worn locating pin on CMM fixture. Re-zero fixture to master part. Re-run Gauge R&R study. Re-measure last 50 parts from affected production run.',
        owner: null, dueDate: null, evidenceIds: ['EVD-006', 'EVD-007'], status: 'open', isoClause: '7.1.5',
      },
    ],
    auditQuestions: [
      { id: 'Q7-01', clause: '8.6', question: 'Has the organization implemented planned arrangements to verify that product requirements have been met?', score: 3, notes: 'CRITICAL: Cpk = 0.98 on critical bore. Process not capable. Product release criteria not met.' },
      { id: 'Q7-02', clause: '7.1.5.1', question: 'Is measurement equipment suitable for the type of monitoring and measurement activities?', score: 5, notes: 'CMM fixture misaligned. Gauge R&R at 18% — approaching limit.' },
      { id: 'Q7-03', clause: '7.1.5.2', question: 'Is measurement traceability maintained when required?', score: 8, notes: 'CMM and roughness tester both have current NIST-traceable calibration certificates.' },
      { id: 'Q7-04', clause: '8.6', question: 'Is evidence of conformity with acceptance criteria retained?', score: 8, notes: 'All records complete, signed, and properly archived.' },
      { id: 'Q7-05', clause: '8.7', question: 'Has the organization dealt with nonconforming outputs appropriately?', score: 7, notes: 'Nonconforming product procedure exists. Red-tag quarantine area observed and active.' },
      { id: 'Q7-06', clause: '9.1.1', question: 'Has the organization determined what needs to be monitored and measured?', score: 6, notes: 'Control plan specifies characteristics but SPC not applied to surface roughness — only reactive inspection.' },
    ],
  },

  // Station 8: Packing & Outgoing
  {
    index: 8, name: 'Packing & Outgoing', health: 'green',
    heroPhoto: stationPacking,
    observation: 'Packing specifications strictly followed per Linde Engineering LP-PKG-004 Rev. C. VCI paper used for corrosion protection on all machined surfaces. Parts individually wrapped in foam-lined dividers. Shipping labels match PO requirements including part number, lot number, quantity, and date. Final outgoing quality gate includes visual inspection, dimensional spot-check (3 per 100), and packaging integrity verification.',
    interpretation: 'Outgoing quality gate is well-controlled and exceeds minimum ISO requirements. Packing process is standardized and operator-proof. Zero customer complaints related to shipping damage in the past 12 months. This station is a strength of the supplier.',
    confidence: 97, actionType: 'accept',
    findings: [
      { type: 'pass', title: 'Packing conformity (8.5.4)', description: 'VCI protection, foam dividers, labeling, and documentation all conform to Linde spec LP-PKG-004 Rev. C.', isoClause: '8.5.4' },
      { type: 'pass', title: 'Product identification on packaging (8.5.2)', description: 'Shipping labels include all required fields. QR code links to electronic CoC.', isoClause: '8.5.2' },
      { type: 'pass', title: 'Final outgoing inspection (8.6)', description: 'Visual + dimensional spot-check (3/100) + packaging integrity check. Records complete.', isoClause: '8.6' },
      { type: 'pass', title: 'Customer property care (8.5.3)', description: 'Customer-provided fixtures stored in dedicated locked area. Inventory matches customer register.', isoClause: '8.5.3' },
    ],
    evidenceCount: { photos: 5, measurements: 2, videos: 0 }, ncrs: [],
    auditQuestions: [
      { id: 'Q8-01', clause: '8.5.4', question: 'Does the organization preserve outputs during production and service provision?', score: 10, notes: 'Best-in-class packing process. Zero shipping damage complaints in 12 months.' },
      { id: 'Q8-02', clause: '8.5.2', question: 'Is product identification maintained through delivery?', score: 9, notes: 'QR-coded labels with full traceability. Matches CoC and delivery note.' },
      { id: 'Q8-03', clause: '8.6', question: 'Is final inspection performed before release of products?', score: 9, notes: 'Three-tier final gate: visual + dimensional spot-check + packaging audit.' },
      { id: 'Q8-04', clause: '8.5.3', question: 'Does the organization care for property belonging to customers?', score: 9, notes: 'Customer fixtures in locked storage. Regular inventory reconciliation.' },
    ],
  },

  // Station 9: Documentation & QMS
  {
    index: 9, name: 'Documentation & QMS', health: 'amber',
    heroPhoto: stationDocumentation,
    observation: 'Quality Management System documentation generally well-maintained. Quality Manual QM-001 Rev. G current. Control plan CP-EM4200-C current and matches production floor setup. However, 4 of 28 work instructions reference superseded drawing revisions (WI-042 Rev. B references Drawing DWG-4201 Rev. B instead of current Rev. D; WI-057, WI-063, WI-071 similarly outdated). Internal audit program covers all ISO 9001 clauses on a 12-month cycle but 2 planned audits from Q4 2025 were postponed and not yet rescheduled. CAPA register shows 3 of 8 corrective actions from 2025 still open past their due dates.',
    interpretation: 'Document control process exists but has significant gaps in revision management — 14% of sampled work instructions reference obsolete drawings. This creates risk of operators following incorrect specifications. Delayed internal audits weaken the self-correction mechanism. Overdue CAPAs suggest insufficient follow-through on corrective actions — a cultural indicator worth monitoring.',
    confidence: 82, actionType: 'rework',
    findings: [
      { type: 'pass', title: 'Quality Manual (7.5)', description: 'Quality Manual QM-001 Rev. G current, comprehensive, and accessible via intranet.', isoClause: '7.5.2' },
      { type: 'pass', title: 'Control plan (8.5.1)', description: 'Control plan CP-EM4200-C current. Matches observed production parameters and inspection points.', isoClause: '8.5.1' },
      { type: 'minor-ncr', title: 'Outdated work instructions', description: '4 of 28 work instructions reference superseded drawing revisions. WI-042, WI-057, WI-063, WI-071 all reference obsolete drawings. Violates ISO 9001 Clause 7.5.3 — control of documented information.', ncrId: 'NCR-0006', isoClause: '7.5.3' },
      { type: 'concern', title: 'Postponed internal audits', description: '2 of 12 planned internal audits from Q4 2025 not yet conducted. Clauses 8.5 and 9.1 not audited in 15 months.', isoClause: '9.2' },
      { type: 'concern', title: 'Overdue corrective actions', description: '3 of 8 CAPAs from 2025 still open past due dates. Average overdue period: 47 days. Indicates insufficient follow-through.', isoClause: '10.2' },
      { type: 'observation', title: 'Document control improvement', description: 'Recommend migrating from shared-drive document control to a dedicated DMS with automatic revision alerts and obsolescence notifications.', isoClause: '7.5.3' },
    ],
    evidenceCount: { photos: 4, measurements: 0, videos: 0 },
    ncrs: [
      {
        id: 'NCR-0006', severity: 'minor', station: 'Documentation & QMS', stationIndex: 9,
        title: 'Work instructions referencing obsolete drawing revisions',
        observation: '4 of 28 sampled work instructions (WI-042, WI-057, WI-063, WI-071) reference superseded drawing revisions. Operators may be working to incorrect specifications.',
        rootCause: 'Document control process relies on manual cross-referencing when new drawings are released. No automated linking between drawing revisions and dependent work instructions (AI-suggested)',
        recommendedAction: 'Immediately update all 4 affected work instructions. Conduct full cross-reference audit of all 28 WIs against current drawing register. Implement automated revision linking in document control system.',
        owner: null, dueDate: null, evidenceIds: ['EVD-030', 'EVD-031', 'EVD-032'], status: 'open', isoClause: '7.5.3',
      },
    ],
    auditQuestions: [
      { id: 'Q9-01', clause: '7.5.2', question: 'When creating and updating documented information, has the organization ensured appropriate identification, format, and review?', score: 7, notes: 'Quality Manual well-maintained. Some WIs have revision control gaps.' },
      { id: 'Q9-02', clause: '7.5.3', question: 'Is documented information controlled to ensure availability, suitability, and adequate protection?', score: 4, notes: 'FINDING: 4/28 WIs reference obsolete drawings. Shared-drive system lacks auto-alerts.' },
      { id: 'Q9-03', clause: '9.2', question: 'Does the organization conduct internal audits at planned intervals?', score: 5, notes: '2 planned audits postponed. Clauses 8.5 and 9.1 not audited in 15 months.' },
      { id: 'Q9-04', clause: '10.2', question: 'Does the organization react to nonconformities and take corrective action?', score: 5, notes: '3/8 CAPAs overdue by average 47 days. Follow-through is weakest link.' },
      { id: 'Q9-05', clause: '10.3', question: 'Does the organization continually improve the QMS suitability, adequacy, and effectiveness?', score: 6, notes: 'Improvement intentions documented but execution lagging behind plan.' },
      { id: 'Q9-06', clause: '9.1.3', question: 'Has the organization analyzed and evaluated data and information from monitoring and measurement?', score: 7, notes: 'Data analysis performed quarterly. Trends identified but not always acted upon promptly.' },
    ],
  },

  // Stations 10-13: Meta-stations
  {
    index: 10, name: 'NCR Register', health: 'red', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },
  {
    index: 11, name: 'Delay Forecast', health: 'grey', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },
  {
    index: 12, name: 'Recommendation & Next', health: 'amber', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },
  {
    index: 13, name: 'Evidence Vault', health: 'green', heroPhoto: '',
    observation: '', interpretation: '', confidence: 0, actionType: 'none',
    findings: [], evidenceCount: { photos: 0, measurements: 0, videos: 0 }, ncrs: [],
  },
];

export const allNCRs: NCR[] = stations.flatMap(s => s.ncrs);

export const radarData = [
  { station: 'Context (4)', score: 88, fullMark: 100 },
  { station: 'Leadership (5)', score: 92, fullMark: 100 },
  { station: 'Planning (6)', score: 70, fullMark: 100 },
  { station: 'Support (7)', score: 55, fullMark: 100 },
  { station: 'Operations (8)', score: 48, fullMark: 100 },
  { station: 'Performance (9)', score: 60, fullMark: 100 },
  { station: 'Improvement (10)', score: 58, fullMark: 100 },
];

export const delayForecastData = [
  { milestone: 'Calibration Rework', contracted: '2026-04-12', predicted: '2026-04-18', confidence: 65 },
  { milestone: 'FAI Re-approval', contracted: '2026-04-20', predicted: '2026-04-28', confidence: 55 },
  { milestone: 'Lot A Ship', contracted: '2026-05-05', predicted: '2026-05-14', confidence: 60 },
  { milestone: 'Lot B Ship', contracted: '2026-05-20', predicted: '2026-05-24', confidence: 75 },
  { milestone: 'Final Delivery', contracted: '2026-06-15', predicted: '2026-06-22', confidence: 60 },
];

export const ncrSeverityData = [
  { name: 'Major', count: 2, color: '#F04464' },
  { name: 'Minor', count: 3, color: '#FF7A59' },
  { name: 'Concern', count: 4, color: '#F5B544' },
  { name: 'Observation', count: 5, color: '#A1A5B7' },
];
