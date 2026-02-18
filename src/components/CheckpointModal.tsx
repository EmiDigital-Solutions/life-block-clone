import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface CheckpointData {
  label: string;
  detail: string;
  src: string;
  alt: string;
  modal: {
    headline: string;
    overview: string;
    forEngineers: string;
    forProcurement: string;
    whyItMatters: string;
    industryExamples: { industry: string; scenario: string }[];
    oldWay: string[];
    withYvoo: string[];
    costPrevention: { title: string; description: string }[];
    supplyChainImpact: string;
    performanceEffect: string;
    stats: { label: string; value: string; description: string }[];
  };
}

export const checkpointData: CheckpointData[] = [
  {
    label: "Machine park evaluation",
    detail: "Capacity, age, maintenance logs",
    src: "",
    alt: "CNC machine capability verification",
    modal: {
      headline: "Machine Park Evaluation",
      overview: "A supplier's machine park defines the ceiling of their production capability. Equipment lists and self-reported specs are unreliable — our auditors physically verify each critical asset: serial numbers against OEM databases, spindle hours, axis backlash, maintenance intervals, and actual vs. rated tolerances. This isn't a walkthrough. It's a technical assessment.",
      forEngineers: "Your PPAP depends on machines that can hold your GD&T callouts consistently. We verify spindle runout, axis repeatability, and thermal compensation capability. If a supplier claims ±0.005 mm but their 15-year-old VMC shows 0.02 mm backlash on the Y-axis, we'll flag it before you ship tooling. We also cross-reference machine capability with your drawing requirements to identify process risk before SOP.",
      forProcurement: "Machine condition directly predicts supplier reliability. A supplier running 90% of their capacity on aging equipment is a delivery risk you can't see in a quote. Our evaluation gives you negotiation leverage — you'll know which suppliers need CAPEX investment and which ones are production-ready. This data prevents the costly scenario of re-sourcing 6 months after nomination.",
      whyItMatters: "Outdated or poorly maintained equipment leads to dimensional drift, surface finish degradation, and unplanned downtime. A single missed calibration on a CNC grinding machine can shift your Cpk from 1.67 to below 1.0 within weeks. Discovering this after tooling investment costs 10–50× more than catching it during evaluation.",
      industryExamples: [
        { industry: "Automotive (Tier 1 Powertrain)", scenario: "Supplier quoted 5-axis simultaneous machining for a turbocharger housing. On-site verification revealed their DMU 50 was configured for 3+2 positioning only — the 4th/5th axes lacked the dynamic accuracy required for the complex impeller geometry. Redirecting to a capable supplier prevented €2.3M in tooling waste and a 9-month schedule slip." },
        { industry: "Aerospace (Structural Components)", scenario: "Maintenance log review on a Studer S41 cylindrical grinder showed three consecutive missed calibrations over 14 months. The machine was producing landing gear bushings. Cross-referencing with the supplier's inspection data revealed a 0.008 mm systematic dimensional shift — invisible in their SPC because they hadn't updated their baseline." },
        { industry: "Medical Devices (Class III Implants)", scenario: "Equipment age analysis revealed 70% of the supplier's Swiss-type turning centers were Citizen L20 models from 2006. Guide bushing wear was causing intermittent OD taper on bone screw blanks, explaining a recurring 3.2% incoming rejection rate that had persisted for two years without root cause identification." },
      ],
      oldWay: [
        "Trust supplier-provided equipment lists — often outdated or aspirational",
        "Rely on photos that may show different machines or different facilities entirely",
        "No verification of maintenance history, spindle hours, or calibration status",
        "Discover equipment limitations after tooling is built and PPAP samples fail",
      ],
      withYvoo: [
        "Physical inspection with OEM serial number and specification cross-reference",
        "Maintenance log audit including spindle hour tracking and calibration records",
        "Equipment condition scoring mapped to your specific tolerance requirements",
        "Geo-tagged photo evidence of every critical machine with metadata timestamp",
      ],
      costPrevention: [
        { title: "Tooling investment protection", description: "A single mold or fixture set can cost €50k–€500k. Verified machine capability before tooling release ensures your investment goes to a supplier who can actually hold your tolerances. One prevented mismatch pays for hundreds of evaluations." },
        { title: "Production schedule integrity", description: "Capacity bottlenecks from equipment breakdown cascade through your entire production plan. Identifying machines with deferred maintenance or excessive hours prevents the unplanned downtime that causes line stoppages at your plant." },
        { title: "Warranty and field failure prevention", description: "Machines in degraded condition produce parts that pass inspection but fail in service. A worn ball screw introduces positioning error that increases over time — catching this trend prevents latent defects from reaching your customers." },
      ],
      supplyChainImpact: "Verified machine park data transforms capacity planning from guesswork to engineering. You know exactly which suppliers can absorb volume increases, which need CAPEX support, and which are running equipment at end-of-life risk. This enables proactive dual-sourcing decisions instead of reactive crisis management.",
      performanceEffect: "Suppliers evaluated on actual equipment condition deliver 40% fewer quality non-conformances in the first 12 months vs. suppliers qualified through document review alone. The correlation is direct: verified equipment capability predicts production stability.",
      stats: [
        { label: "Equipment discrepancy rate", value: "35%", description: "of suppliers have material differences between claimed and actual equipment capability" },
        { label: "Avg. prevented loss", value: "€180k", description: "per detected equipment-to-requirement mismatch, including tooling, rework, and re-sourcing costs" },
        { label: "Quality improvement", value: "40%", description: "fewer NCRs in first year with equipment-verified suppliers vs. document-qualified suppliers" },
      ],
    },
  },
  {
    label: "Measurement systems",
    detail: "CMM, gauges, calibration records",
    src: "",
    alt: "CMM coordinate measurement during audit",
    modal: {
      headline: "Measurement Systems Verification",
      overview: "If a supplier can't measure correctly, they can't produce correctly — and they don't know they can't. We verify the entire measurement chain: CMM probe qualification, fixture repeatability, gauge R&R status, calibration traceability to national standards, and whether measurement capability actually covers your critical characteristics. This is the most overlooked risk in supplier qualification.",
      forEngineers: "Your dimensional approval means nothing if the supplier's measurement system has a GR&R above 30%. We verify MSA results against AIAG guidelines, check CMM probe qualification dates, validate fixture clamping repeatability, and assess whether the measurement strategy covers your GD&T datum scheme correctly. If a supplier is measuring a true position with a height gauge instead of a CMM, we'll catch it.",
      forProcurement: "Measurement system quality directly determines whether you can trust a supplier's inspection data. Verified measurement capability means you can reduce incoming inspection frequency — saving €20k–€80k annually per supplier. It also means fewer rejected lots, fewer 8D reports, and fewer emergency calls from your quality team.",
      whyItMatters: "Measurement system failures are the #1 hidden cause of quality escapes. A supplier may produce conforming parts but approve non-conforming ones — or reject conforming ones, causing artificial scrap. A CMM with expired probe qualification can introduce systematic bias that corrupts every measurement taken. This is invisible in supplier data because the error is in the measurement, not the production.",
      industryExamples: [
        { industry: "Automotive (Chassis Components)", scenario: "MSA review on a Zeiss Contura CMM revealed a Gage R&R of 45% on the critical bore diameter — far above the 10% AIAG threshold. The root cause: the CMM fixture wasn't constraining the part's datum A, causing part movement during scanning. Every dimensional report from the prior 8 months was unreliable. Parts were being approved that should have been rejected, and vice versa." },
        { industry: "Precision Engineering (Hydraulic Manifolds)", scenario: "Calibration audit identified 12 gauges past their due date, including three bore gauges used for final inspection on safety-critical hydraulic passages. The supplier's calibration management system had a software error that excluded transferred gauges from the recall schedule. Immediate corrective action prevented a potential field safety issue." },
        { industry: "Electronics (Connector Housings)", scenario: "Optical measurement system (Keyence IM-8000) was calibrated with a standard designed for a different product family. Verification discovered a systematic 0.015 mm measurement bias on contact pocket dimensions — affecting 100% of outgoing inspection data for the customer's connector program. The bias perfectly masked an actual tool wear issue." },
      ],
      oldWay: [
        "Accept calibration certificates without verifying the actual equipment matches",
        "No assessment of whether measurement capability covers your specific characteristics",
        "Discover measurement system errors only after customer complaints or field returns",
        "No visibility into gauge condition, fixture suitability, or probe qualification status",
      ],
      withYvoo: [
        "Physical verification of CMM probe qualification, fixture integrity, and measurement programs",
        "Calibration status audit with traceability verification to national/international standards",
        "Measurement capability assessment mapped to your specific drawing requirements",
        "Photo documentation of all critical measurement equipment with calibration sticker close-ups",
      ],
      costPrevention: [
        { title: "Eliminate false approvals", description: "Incorrect measurements cause defective parts to pass inspection and reach your assembly line. A single escaped lot can cost €50k–€200k in sorting, rework, and line disruption. Verified measurement systems prevent this at the source." },
        { title: "Recall scope containment", description: "When a measurement error is discovered, traceability determines whether you recall 100 parts or 100,000. Verified measurement systems and calibration chains enable precise containment — limiting both cost and customer impact." },
        { title: "Incoming inspection reduction", description: "When you've verified that a supplier's measurement system is capable and controlled, you can implement skip-lot or reduced inspection programs. This frees your quality team for higher-value work and accelerates your receiving process." },
      ],
      supplyChainImpact: "Verified measurement systems create trust in supplier data. This trust enables skip-lot programs, digital quality data exchange, and automated lot release — all of which accelerate your supply chain velocity. Conversely, unverified measurement systems force defensive incoming inspection that adds cost and cycle time to every delivery.",
      performanceEffect: "Suppliers with verified measurement systems generate 60% fewer dimensional complaints and enable up to 50% reduction in customer incoming inspection. The ROI is measurable within the first quarter of production.",
      stats: [
        { label: "Calibration issues found", value: "28%", description: "of suppliers have overdue, missing, or inadequate calibrations on critical measurement equipment" },
        { label: "Incoming inspection savings", value: "50%", description: "reduction achievable when supplier measurement capability is independently verified" },
        { label: "Complaint reduction", value: "60%", description: "fewer dimensional non-conformance reports from measurement-verified suppliers" },
      ],
    },
  },
  {
    label: "Process capability",
    detail: "Cpk values, SPC, process flow",
    src: "",
    alt: "Assembly station process verification",
    modal: {
      headline: "Process Capability Verification",
      overview: "Cpk values on a supplier's capability study mean nothing if they were calculated from a cherry-picked sample, a different machine, or last year's tooling. Our auditors examine live SPC data, process flow diagrams, control plans, reaction plans, and actual operator compliance — determining whether a supplier can consistently produce within your tolerances across normal production variation, not just during a capability run.",
      forEngineers: "We verify Cpk and Ppk values against actual production data — not capability study samples. We check whether SPC charts show statistical control or just data collection. We review control plans for alignment with PFMEAs and verify that reaction plans are actually executable on the shop floor. If a supplier reports Cpk 1.67 but their X-bar chart shows a trend that will breach the control limit within 50 parts, we'll document it.",
      forProcurement: "Process capability is the best predictor of total cost of ownership. A supplier with verified Cpk ≥1.33 on critical characteristics will generate 85% fewer quality events — meaning fewer 8D reports, fewer sorting actions, fewer line disruptions, and fewer emergency escalations consuming your team's time. This data belongs in your supplier scorecard and contract negotiations.",
      whyItMatters: "The gap between claimed and actual process capability is where quality costs hide. A process with Cpk 1.0 produces ~2,700 ppm defective. At Cpk 1.33, that drops to 63 ppm. At Cpk 1.67, it's 0.6 ppm. The difference between a supplier claiming 1.67 and actually running at 1.0 is a 4,500× difference in defect rate. You cannot afford to take this on trust.",
      industryExamples: [
        { industry: "Automotive (EV Battery Housing)", scenario: "Supplier submitted a capability study showing Cpk >1.67 for all critical dimensions. On-site SPC data review revealed 3 of 8 critical characteristics had real Cpk values below 1.0 — measured on different machines than the capability study. The study was technically valid but operationally misleading. Process improvement was initiated before SOP, preventing a projected €450k annual scrap cost." },
        { industry: "Medical Devices (Surgical Instruments)", scenario: "Process flow analysis uncovered an undocumented hand-deburring step between CNC machining and final inspection. This rework loop introduced operator-dependent variation, violated the validated process flow, and would have failed an FDA audit. The supplier had been shipping product with this undocumented step for 18 months." },
        { industry: "Aerospace (Engine Bracket)", scenario: "Control plan review revealed no SPC monitoring on a fatigue-critical radius dimension — the supplier was relying solely on 100% CMM inspection at final. Without in-process monitoring, tool wear was causing gradual dimensional drift between inspections. A batch of 200 brackets was at risk of being out-of-spec before the next scheduled measurement." },
      ],
      oldWay: [
        "Accept supplier-reported Cpk values from controlled capability studies",
        "Review process flow diagrams on paper without verifying shop floor reality",
        "No verification of whether SPC is actually used for process control or just data logging",
        "Discover capability gaps only after production ramp — when the cost of correction is highest",
      ],
      withYvoo: [
        "Review live SPC data and control charts from actual production runs",
        "Verify Cpk/Ppk values against real production data, not capability study samples",
        "Assess control plan implementation and reaction plan executability on-site",
        "Identify undocumented process steps, rework loops, and operator workarounds",
      ],
      costPrevention: [
        { title: "Scrap and rework elimination", description: "Low Cpk means high reject rates. A process running at Cpk 0.8 generates ~12,500 ppm defective — that's 1.25% scrap before you factor in rework. Verifying capability before volume production prevents this cost from ever materializing." },
        { title: "Line stoppage prevention", description: "Unstable processes produce unpredictable quality. Your production line can't absorb variable incoming quality. Capability verification at the source ensures consistent supply — protecting your own OEE and delivery commitments." },
        { title: "Warranty cost reduction", description: "Field failures from process capability gaps are the most expensive quality cost. A single warranty campaign can exceed €1M. Verified process capability at the source is the most effective preventive measure." },
      ],
      supplyChainImpact: "Knowing the actual process capability of every supplier enables risk-based inspection strategies, informed safety stock decisions, and data-driven dual-sourcing. It transforms supplier quality from a reactive fire-fighting function into a predictive risk management capability.",
      performanceEffect: "Suppliers with independently verified Cpk ≥1.33 deliver 85% fewer quality non-conformances compared to suppliers with unverified self-reported capability. This is the single strongest predictor of supplier quality performance.",
      stats: [
        { label: "Capability overstatement", value: "42%", description: "of suppliers report Cpk values that don't match their actual production data" },
        { label: "Annual scrap prevention", value: "€95k", description: "average savings per supplier from early process capability detection and correction" },
        { label: "NCR reduction", value: "85%", description: "fewer non-conformance reports from capability-verified suppliers in the first production year" },
      ],
    },
  },
  {
    label: "Capacity assessment",
    detail: "Throughput, shift models, bottleneck analysis",
    src: "",
    alt: "Real capacity assessment on factory floor",
    modal: {
      headline: "Capacity Assessment",
      overview: "Capacity figures in RFQ responses are aspirational, not operational. Our auditors verify actual throughput rates by operation, shift models including overtime and weekend usage, equipment utilization by machine, and production bottlenecks across the value stream. The result is a realistic capacity profile — not a sales pitch.",
      forEngineers: "We map the value stream from raw material input to finished goods output, identifying cycle times per operation, WIP buffers, and constraint operations. If a supplier's quoted capacity assumes 95% OEE on a machine that actually runs at 72%, we'll document the gap. We also check whether their capacity model accounts for setup time, maintenance windows, and quality-related downtime — factors that suppliers systematically underestimate.",
      forProcurement: "Capacity overstatement is the #1 cause of supplier delivery failure. When you nominate a supplier who can't deliver, the cost isn't the missed delivery — it's the air freight, the line stoppage penalty, the emergency re-sourcing, and the 6-month delay to your program timeline. Our capacity assessment gives you the real numbers before you commit your supply chain.",
      whyItMatters: "Overestimated capacity is the leading cause of supplier delivery failures. When a supplier can't keep up with your demand, the resulting costs — line stoppages at €250k–€500k per day, air freight at 10× sea freight, emergency sourcing at premium pricing — dwarf the cost of an upfront capacity verification by orders of magnitude.",
      industryExamples: [
        { industry: "Automotive (Interior Components)", scenario: "Capacity analysis revealed the supplier was already running 3 shifts with 15% systematic overtime to serve 4 existing OEM customers. Their RFQ response claimed 30% available capacity — calculated by subtracting theoretical capacity from nameplate capacity, ignoring their actual utilization. They had zero spare capacity for the proposed €8M annual program." },
        { industry: "Consumer Goods (Packaging)", scenario: "Bottleneck analysis identified that the finishing department (coating + QC) could only handle 60% of the machining department's output. This constraint was invisible in the supplier's capacity calculation because they quoted machining capacity, not system throughput. During peak season, this would have caused chronic 6–8 week delivery delays." },
        { industry: "Industrial Equipment (Castings)", scenario: "Shift model verification showed the supplier was counting weekend maintenance hours as production capacity — inflating their stated capability by 25%. Additionally, their heat treatment furnace was shared with another product line, creating scheduling conflicts that weren't reflected in the capacity model." },
      ],
      oldWay: [
        "Trust capacity figures from supplier questionnaires and RFQ responses",
        "No visibility into existing customer commitments or utilization rates",
        "Discover capacity shortfalls only after first delivery delays — typically 3–6 months into production",
        "No understanding of bottleneck operations or constraint resources",
      ],
      withYvoo: [
        "On-site throughput measurement by operation with cycle time verification",
        "Shift model, overtime utilization, and maintenance window analysis",
        "Value stream bottleneck identification across all production stages",
        "Assessment of existing capacity commitments to other customers",
      ],
      costPrevention: [
        { title: "Delivery failure prevention", description: "Know the real capacity before you commit your supply chain. A single program re-sourcing costs €200k–€500k in tooling, qualification, and lost time. Capacity verification is a fraction of that cost." },
        { title: "Air freight cost avoidance", description: "Capacity shortfalls result in expediting costs that often exceed the part cost itself. A single emergency air shipment from Asia can cost more than the entire annual evaluation budget." },
        { title: "Line stoppage insurance", description: "A single day of automotive assembly line stoppage costs €250k–€500k. Capacity verification at the source is the most cost-effective insurance against this scenario. The math is unambiguous." },
      ],
      supplyChainImpact: "Accurate, verified capacity data enables realistic production planning, appropriate safety stock calibration, and informed dual-sourcing strategies. It moves capacity management from reactive allocation to proactive supply chain design.",
      performanceEffect: "Suppliers with verified capacity deliver 70% fewer on-time delivery failures in the first production year compared to suppliers qualified on self-reported capacity. Delivery performance is the strongest correlator of verified capacity data.",
      stats: [
        { label: "Capacity overstatement", value: "38%", description: "of suppliers materially overstate their available production capacity in RFQ responses" },
        { label: "OTD improvement", value: "70%", description: "fewer delivery failures from suppliers with independently verified capacity data" },
        { label: "Emergency cost prevention", value: "€350k", description: "average prevented cost per detected capacity gap (air freight, re-sourcing, penalties)" },
      ],
    },
  },
  {
    label: "Material stock inspection",
    detail: "Goods receipt checks, storage conditions, traceability",
    src: "",
    alt: "Material stock inspection in warehouse",
    modal: {
      headline: "Material Stock & Traceability Inspection",
      overview: "Raw material quality and traceability are the foundation of every manufactured part. We inspect incoming goods procedures, storage conditions, material identification, FIFO discipline, and full batch traceability from mill certificate to finished goods. A broken traceability chain doesn't just fail audits — it makes containment impossible when things go wrong.",
      forEngineers: "We verify that material certificates (3.1 / 3.2 per EN 10204) are traceable to specific production batches, that incoming inspection captures the right parameters, and that storage conditions match material specifications (temperature, humidity, UV exposure, shelf life). If your PPAP requires full material traceability and the supplier can't link a finished part back to its raw material heat number, we'll document the gap before it becomes a customer audit finding.",
      forProcurement: "Material management quality is a leading indicator of overall operational maturity. Suppliers with poor material traceability take 3× longer to respond to containment requests — which means your quality team spends days instead of hours managing each issue. Verified material management also reduces incoming rejection rates, because defects from poor storage or material mix-ups are caught at the source.",
      whyItMatters: "Material mix-ups and storage degradation cause catastrophic quality failures that often aren't detected until field use. Counterfeit or uncertified material, degraded polymer stock, and broken traceability chains can lead to product recalls, safety incidents, and regulatory action. When containment is needed, traceability determines whether you recall 100 parts or 100,000.",
      industryExamples: [
        { industry: "Aerospace (Structural Forgings)", scenario: "Traceability audit revealed the supplier couldn't link 3 of 10 randomly sampled finished-goods batches back to their original mill certificates. The traceability gap existed because material was re-labeled during an internal warehouse move. This finding would have resulted in automatic failure of any NADCAP or customer audit and jeopardized the supplier's AS9100 certification." },
        { industry: "Automotive (Sealing Systems)", scenario: "Storage condition inspection found EPDM rubber compound stored in direct sunlight with no temperature monitoring. Material specification required storage below 25°C — measured ambient was 38°C. Accelerated aging was contributing to a 15% incoming rejection rate at the customer's assembly plant that had been attributed to 'batch variation' for over a year." },
        { industry: "Pharmaceutical Equipment", scenario: "FIFO audit uncovered expired stainless steel passivation chemicals mixed with current stock. The chemicals were still listed as active in the ERP system due to a receiving error. Products passivated with expired chemistry were at risk of inadequate corrosion resistance — a compliance violation for pharmaceutical contact surfaces." },
      ],
      oldWay: [
        "Review material certificates remotely without verifying they match physical stock",
        "No verification of actual storage conditions — temperature, humidity, contamination risk",
        "Trust supplier's traceability claims without testing the chain end-to-end",
        "Discover material management issues through product failures or customer audit findings",
      ],
      withYvoo: [
        "Physical inspection of storage areas with environmental condition assessment",
        "FIFO compliance verification and material shelf-life/expiry date audit",
        "End-to-end traceability chain validation: mill certificate → incoming → production → finished goods",
        "Material identification, labeling accuracy, and segregation assessment",
      ],
      costPrevention: [
        { title: "Material mix-up prevention", description: "Cross-contamination between similar grades (e.g., 304 vs. 316 stainless) can cause entire batch rejections or field failures. Physical verification of identification and segregation practices catches labeling gaps before they become quality events." },
        { title: "Recall scope limitation", description: "When a material issue is discovered, traceability determines containment scope. Verified traceability reduces average recall cost by 60–80% by enabling precise batch isolation instead of broad product withdrawal." },
        { title: "Incoming rejection reduction", description: "Poor storage degrades material before production starts — UV damage, moisture absorption, thermal aging. Identifying storage condition violations prevents waste at the source and eliminates phantom 'supplier quality' issues." },
      ],
      supplyChainImpact: "Verified material management ensures quality starts at the beginning of the value chain. Suppliers with proven traceability respond 3× faster to containment requests, limiting both the duration and business impact of quality events across your supply network.",
      performanceEffect: "Suppliers with verified material management systems generate 55% fewer material-related non-conformances and achieve 3× faster containment response time — directly reducing the cost and duration of every quality event.",
      stats: [
        { label: "Traceability gaps", value: "31%", description: "of suppliers have material traceability weaknesses that would fail a customer or regulatory audit" },
        { label: "Material NCR reduction", value: "55%", description: "fewer material-related non-conformances from suppliers with verified material management" },
        { label: "Containment acceleration", value: "3×", description: "faster response to containment requests from suppliers with verified traceability chains" },
      ],
    },
  },
  {
    label: "HSE inspection",
    detail: "Safety protocols, environmental compliance, PPE",
    src: "",
    alt: "HSE inspection on production site",
    modal: {
      headline: "Health, Safety & Environmental Inspection",
      overview: "HSE compliance isn't a soft metric — it's a hard indicator of operational discipline and supply chain risk. Suppliers who cut corners on safety systematically cut corners on quality. Our auditors evaluate workplace safety, environmental controls, emergency preparedness, labor practices, and regulatory compliance through physical walkthrough and document verification.",
      forEngineers: "HSE culture correlates directly with quality culture. A shop floor with proper chemical handling, machine guarding, and housekeeping standards is a shop floor where operators follow work instructions and quality procedures. When we find missing machine guards, unlabeled chemical containers, or blocked emergency exits, these aren't just HSE findings — they're indicators of systemic process discipline gaps that will eventually manifest as quality issues.",
      forProcurement: "An HSE incident at your supplier is your supply chain risk. A regulatory shutdown can halt production for weeks. A workplace accident can trigger media scrutiny and brand damage. ESG reporting requirements mean your investors and customers are asking for verified supplier HSE data — self-assessment questionnaires no longer suffice. Our on-site inspection delivers auditable evidence.",
      whyItMatters: "An HSE incident at your supplier can simultaneously shut down your supply chain, damage your corporate brand, trigger regulatory investigation, and expose your organization to legal liability — including under emerging supply chain due diligence legislation (EU CSDDD, German LkSG). The correlation between HSE performance and overall operational reliability is well-documented.",
      industryExamples: [
        { industry: "Consumer Brands (Apparel)", scenario: "HSE inspection revealed excessive working hours (72h/week average), missing fire exits in the finishing department, and no emergency evacuation plan. These findings — invisible in the supplier's SAQ response — would have been catastrophic if discovered by investigative media or NGO audit after contract signature. The brand avoided a potential reputation crisis estimated at €50M+ in brand damage." },
        { industry: "Chemical Processing", scenario: "Environmental inspection found improper hazardous waste storage — solvents stored in unlabeled containers adjacent to the production floor without secondary containment. This created dual risk: regulatory penalty (up to €500k) and contamination risk for adjacent manufacturing areas handling customer products." },
        { industry: "Electronics (PCB Assembly)", scenario: "PPE audit showed only 40% of workers in the selective soldering and wave soldering areas had proper respiratory protection against lead fumes. This violated both local labor regulations and the customer's supplier code of conduct. The finding was not detectable through document review — the supplier had PPE policies on paper but didn't enforce them." },
      ],
      oldWay: [
        "Rely on supplier self-assessment questionnaires (SAQ) that show 95% compliance by design",
        "Accept ISO 14001 / ISO 45001 certificates as proof of actual HSE performance",
        "Discover HSE issues through incidents, media reports, or customer audit findings",
        "No visibility into actual working conditions, chemical handling, or emergency preparedness",
      ],
      withYvoo: [
        "Physical walkthrough of all production, storage, and welfare areas",
        "PPE compliance, machine guarding, and chemical handling verification",
        "Environmental controls, waste management, and emissions assessment",
        "Working conditions, labor hours, and welfare facility evaluation",
      ],
      costPrevention: [
        { title: "Supply disruption prevention", description: "A regulatory shutdown at a key supplier halts your production. HSE violations are the fastest path to forced closure. Proactive verification identifies shutdown-risk findings before they trigger regulatory action." },
        { title: "Brand and reputation protection", description: "Supply chain scandals — factory fires, environmental contamination, labor exploitation — cause brand damage that persists for years. Verified HSE compliance is your documented due diligence defense." },
        { title: "Regulatory compliance (CSDDD/LkSG)", description: "EU Corporate Sustainability Due Diligence Directive and German Supply Chain Act require verified supplier HSE data. Self-assessments don't satisfy the 'adequate measures' standard. On-site inspection does." },
      ],
      supplyChainImpact: "Suppliers with verified HSE compliance are structurally more stable. They face fewer regulatory disruptions, carry lower insurance costs, and demonstrate the operational discipline that drives consistent quality. HSE verification is a proxy for operational maturity.",
      performanceEffect: "Suppliers with verified HSE compliance show 45% lower probability of supply disruption from regulatory or safety-related shutdown events. They also correlate with 25% better quality performance — confirming the link between safety culture and quality culture.",
      stats: [
        { label: "Critical HSE findings", value: "47%", description: "of suppliers have at least one finding that could trigger regulatory action or supply disruption" },
        { label: "Disruption risk reduction", value: "45%", description: "lower probability of forced shutdown from suppliers with independently verified HSE compliance" },
        { label: "ESG framework coverage", value: "100%", description: "of evaluation criteria map directly to major ESG and due diligence reporting frameworks" },
      ],
    },
  },
  {
    label: "Equipment intelligence",
    detail: "OEM specs, utilization rate, condition",
    src: "",
    alt: "Advanced CNC turning center evaluation",
    modal: {
      headline: "Equipment Intelligence",
      overview: "Equipment intelligence goes beyond machine lists. It's a structured, data-driven assessment of every critical production asset — OEM specifications, actual utilization rates, condition scoring, maintenance regime quality, and technology-to-requirement fit. The output is a machine-level risk profile that tells you exactly what a supplier can reliably produce and where the gaps are.",
      forEngineers: "We capture OEM model/serial data, verify axis configurations and option packages, assess spindle condition through maintenance records and vibration history, and map machine capability envelopes against your part requirements. If your drawing calls for Ra 0.4 µm surface finish and the supplier's only capable grinder is a 20-year-old unit without CNC dressing, we'll document the technology gap. This data feeds directly into your process FMEA and control plan development.",
      forProcurement: "Equipment intelligence gives you a negotiation tool and a risk model. You'll know which suppliers need CAPEX investment (and can negotiate cost-sharing), which ones have modern equipment that justifies their pricing, and which ones are running on aging assets that represent a medium-term supply risk. This data transforms supplier selection from subjective assessment to evidence-based decision-making.",
      whyItMatters: "The gap between theoretical machine capability and reliable production capability determines your quality and delivery risk. A machine's nameplate specs don't account for 15 years of wear, deferred maintenance, or retrofit modifications. Equipment intelligence provides the ground truth that closing this gap requires.",
      industryExamples: [
        { industry: "Automotive (Transmission Components)", scenario: "Equipment intelligence revealed that a supplier's 'high-precision' Junker cylindrical grinder was a rebuilt unit from 2002 with modified Siemens 840C controls — technically capable of the required tolerances but with 3× higher unplanned downtime risk than a modern equivalent. The supplier's pricing didn't reflect this age-related risk premium." },
        { industry: "Aerospace (Turbine Blades)", scenario: "Utilization rate analysis on the critical Makino a81nx 5-axis machine showed 94% booking rate across existing customer programs. The machine was the only asset capable of the required blade root geometry. One additional program would have pushed utilization past 100%, guaranteeing delivery conflicts between customers." },
        { industry: "Medical (Orthopedic Implants)", scenario: "OEM specification verification confirmed that the supplier's Arburg injection molding machine lacked the required clamping force for the customer's larger PEEK implant components — a 200-ton gap between machine capability and part requirement. This limitation was not visible in the supplier's general capability presentation." },
      ],
      oldWay: [
        "Accept equipment lists without verifying model variants, option packages, or condition",
        "No insight into machine age, spindle hours, maintenance quality, or rebuild history",
        "Discover capability limitations during trial production — after tooling is built",
        "No utilization data to assess whether scheduled capacity actually exists",
      ],
      withYvoo: [
        "OEM specification and serial number verification with manufacturer database cross-reference",
        "Machine condition assessment including maintenance history and rebuild documentation",
        "Utilization rate analysis by machine with existing customer program allocation",
        "Technology capability envelope mapped against your specific product requirements",
      ],
      costPrevention: [
        { title: "Tooling protection", description: "Don't invest tooling capital in machines that can't reliably deliver your requirements. Equipment intelligence identifies technology-to-requirement mismatches before you commit €50k–€500k in tooling. One prevented mismatch justifies years of evaluation investment." },
        { title: "Downtime risk quantification", description: "Equipment intelligence identifies machines with deferred maintenance, excessive hours, or aging components that predict unplanned downtime. This enables proactive spare part planning and maintenance scheduling — or informed dual-sourcing decisions." },
        { title: "Sourcing decision optimization", description: "Know exactly what each supplier can produce — and what they can't — before making volume commitments. Equipment intelligence enables precision allocation of parts to suppliers based on verified capability, not self-reported claims." },
      ],
      supplyChainImpact: "Equipment intelligence enables precision supply chain design. Instead of allocating parts based on supplier promises, you allocate based on verified machine capability. This eliminates trial-and-error qualification, reduces time-to-production, and ensures your supply base matches your manufacturing requirements.",
      performanceEffect: "Suppliers evaluated with equipment intelligence show 50% fewer capability-related production issues and achieve 30% faster new product ramp-up — because equipment-to-requirement fit is verified before tooling release, not discovered during production trials.",
      stats: [
        { label: "Capability mismatches", value: "29%", description: "of suppliers have equipment-to-product requirement gaps not visible in capability presentations" },
        { label: "Ramp-up acceleration", value: "30%", description: "faster new product introduction when equipment fit is verified before tooling release" },
        { label: "Downtime reduction", value: "50%", description: "fewer unplanned production stoppages from suppliers with condition-assessed equipment" },
      ],
    },
  },
  {
    label: "Expert on-site",
    detail: "Certified auditor, geo-tagged evidence",
    src: "",
    alt: "Auditor on factory floor during evaluation",
    modal: {
      headline: "Expert On-Site Evaluation",
      overview: "The quality of supplier intelligence is entirely determined by who collects it. Our evaluations are conducted by certified professionals with deep domain expertise — IATF 16949 lead auditors for automotive, AS9100 specialists for aerospace, GMP experts for pharma. Every auditor is local, industry-matched, and AI-selected based on your specific product requirements. This isn't a generalist with a checklist — it's an expert who knows what to look for and why it matters.",
      forEngineers: "Your auditor will speak your technical language. They understand GD&T, PFMEA logic, SPC interpretation, and process validation methodology. They can assess whether a supplier's control plan actually controls the right characteristics, whether their measurement strategy covers your datum scheme, and whether their process is statistically capable — not just producing parts that happen to pass inspection. The difference between a specialist finding and a generalist observation is the difference between actionable intelligence and a compliance checkbox.",
      forProcurement: "Expert evaluation eliminates the logistics burden and cost of sending your own team. No flights, no hotels, no per diems, no scheduling conflicts. Your auditor is local — available within 48 hours, at a fraction of the cost of international travel. More importantly, they provide findings that are directly actionable for sourcing decisions: can this supplier deliver, at what risk level, and what conditions should be attached to the contract?",
      whyItMatters: "A generalist auditor marks boxes. A specialist auditor identifies risk. The difference between finding 'calibration certificates are present' and finding 'the CMM fixture doesn't constrain datum A, invalidating all dimensional data' is the difference between a wasted audit and a prevented quality crisis. Industry-specific expertise cannot be replaced by checklists or AI — it requires contextual judgment that only comes from deep domain experience.",
      industryExamples: [
        { industry: "Automotive (Powertrain)", scenario: "An IATF 16949-certified lead auditor identified that the supplier's PFMEA risk analysis was superficial — high-RPN failure modes had detection controls listed as 'visual inspection' without defined criteria. A generalist would have checked the box for 'PFMEA exists.' The specialist recognized that the FMEA wouldn't survive a customer audit and, more critically, wasn't actually preventing the identified failure modes." },
        { industry: "Pharmaceutical (API Manufacturing)", scenario: "A GMP-experienced auditor identified that the supplier's cleaning validation protocol used visual inspection as the acceptance criterion for a high-potency API — a practice that fails current FDA expectations. This nuance requires pharmaceutical manufacturing expertise that cannot be trained into a generalist auditor through a checklist." },
        { industry: "Oil & Gas (Pressure Equipment)", scenario: "A PED/ASME-qualified auditor identified that welding procedure qualifications (WPQs) didn't cover the actual thickness range being produced — the qualification was for 6–12mm but production included 16mm wall pipe. This safety-critical gap would not be caught by visual document review or a non-specialist auditor." },
      ],
      oldWay: [
        "Send generalist auditors who lack the industry context to distinguish acceptable practice from hidden risk",
        "Fly your own engineering team across the globe — €3k–€8k per trip, 2–3 week lead time, schedule conflicts",
        "Wait weeks for qualified auditor availability, delaying supplier qualification decisions",
        "Language barriers reduce the depth and reliability of supplier engagement and evidence collection",
      ],
      withYvoo: [
        "Industry-specialized local auditors matched to your specific product and standard requirements",
        "AI-powered matching algorithm selects the optimal auditor based on industry, geography, and expertise",
        "Available within 48 hours — no travel logistics, visa requirements, or scheduling delays",
        "Native language capability enables deeper supplier engagement and more reliable evidence collection",
      ],
      costPrevention: [
        { title: "Travel cost elimination", description: "Local expert auditors eliminate international travel entirely. Typical savings: €3k–€8k per evaluation in flights, hotels, and per diems. For organizations conducting 20+ evaluations annually, this represents €60k–€160k in direct cost avoidance — while improving evaluation quality." },
        { title: "Expertise-driven risk prevention", description: "Specialist auditors identify 3× more actionable findings than generalists. Each additional critical finding caught before supplier nomination prevents an average €50k–€200k in downstream quality costs. The ROI of expertise is measurable in prevented losses." },
        { title: "Speed to decision", description: "48-hour auditor availability vs. 3–4 week internal scheduling. Faster evaluation means faster qualification decisions, shorter time-to-market for new products, and the ability to respond to supply chain disruptions with verified alternative suppliers." },
      ],
      supplyChainImpact: "A global network of pre-qualified, industry-specialized experts means you can evaluate any supplier, anywhere, within days — not weeks. This transforms supplier qualification from a bottleneck into a scalable, on-demand capability that supports agile supply chain management.",
      performanceEffect: "Evaluations conducted by industry-specialized auditors identify 3× more actionable critical findings compared to generalist auditors. These findings directly translate into better-informed sourcing decisions and measurably lower supplier quality risk.",
      stats: [
        { label: "Expert network", value: "850+", description: "certified, industry-specialized auditors across 45+ countries and all major manufacturing sectors" },
        { label: "Deployment speed", value: "48h", description: "average time from request to confirmed, matched expert on-site — no travel logistics required" },
        { label: "Finding quality", value: "3×", description: "more actionable critical findings vs. generalist auditors — the difference between insight and compliance" },
      ],
    },
  },
];

interface CheckpointModalProps {
  checkpoint: CheckpointData | null;
  onClose: () => void;
}

const CheckpointModal = ({ checkpoint, onClose }: CheckpointModalProps) => {
  if (!checkpoint) return null;
  const m = checkpoint.modal;

  return (
    <Dialog open={!!checkpoint} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-full w-full h-full max-h-full m-0 p-0 rounded-none border-none bg-white overflow-y-auto [&>button]:hidden">
        {/* Top bar */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
          <div className="mx-auto max-w-[1400px] px-8 py-4 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">On-Site Checkpoint</span>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-8 py-16 md:py-24">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-6">
              {m.headline}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {m.overview}
            </p>
          </motion.div>

          {/* Audience-specific perspectives */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-16 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="border border-border p-8 md:p-12">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4 block">For Engineers & Quality</span>
                <p className="text-foreground/80 leading-relaxed">{m.forEngineers}</p>
              </div>
              <div className="border border-border border-l-0 max-lg:border-l max-lg:border-t-0 p-8 md:p-12">
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4 block">For Procurement & Supply Chain</span>
                <p className="text-foreground/80 leading-relaxed">{m.forProcurement}</p>
              </div>
            </div>
          </motion.div>

          {/* Why it matters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16 md:mb-24">
            <div className="border-l-2 border-foreground pl-8 md:pl-12">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4 block">Why it matters</span>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                {m.whyItMatters}
              </p>
            </div>
          </motion.div>

          {/* Old Way vs YVOO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-8">The difference</h2>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-muted p-8 md:p-10">
                <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase mb-6">Traditional approach</p>
                <div className="space-y-4">
                  {m.oldWay.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-muted-foreground mt-1.5 text-xs">—</span>
                      <span className="text-foreground/60 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[hsl(0,0%,8%)] p-8 md:p-10">
                <p className="text-xs font-mono tracking-[0.2em] text-white/50 uppercase mb-6">With YVOO</p>
                <div className="space-y-4">
                  {m.withYvoo.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5 text-xs">+</span>
                      <span className="text-white/90 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Industry Examples */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-8">Industry examples</h2>
            <div className="grid md:grid-cols-3 gap-0 border-t border-foreground/10">
              {m.industryExamples.map((ex, idx) => (
                <div key={idx} className="border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 p-8">
                  <span className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3 block">{ex.industry}</span>
                  <p className="text-foreground/70 leading-relaxed text-sm">{ex.scenario}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cost & Damage Prevention */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-8">Cost & damage prevention</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {m.costPrevention.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Supply Chain Impact & Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="border border-foreground/10 p-8 md:p-10">
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">Supply chain impact</h3>
                <p className="text-foreground/80 leading-relaxed">{m.supplyChainImpact}</p>
              </div>
              <div className="border border-foreground/10 border-l-0 max-lg:border-l max-lg:border-t-0 p-8 md:p-10">
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">Performance effect</h3>
                <p className="text-foreground/80 leading-relaxed">{m.performanceEffect}</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-16 md:mb-24">
            <div className="grid grid-cols-3 gap-0 border-t-2 border-foreground">
              {m.stats.map((stat, idx) => (
                <div key={idx} className="border-r border-foreground/10 last:border-r-0 p-8 md:p-10">
                  <p className="text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase">{stat.label}</p>
                  <p className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center py-8">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-6">
              Want to verify this at your supplier?
            </h3>
            <Button size="lg" asChild>
              <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer">
                Request a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckpointModal;
