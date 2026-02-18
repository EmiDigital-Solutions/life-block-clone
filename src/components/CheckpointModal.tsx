import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Check, AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export interface CheckpointData {
  label: string;
  detail: string;
  src: string;
  alt: string;
  modal: {
    headline: string;
    overview: string;
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
      overview: "A supplier's machine park is the backbone of their production capability. We don't rely on equipment lists — our auditors physically inspect each machine, verify serial numbers, check maintenance records, and assess actual condition vs. claimed specifications.",
      whyItMatters: "Outdated or poorly maintained equipment leads to quality defects, delivery delays, and unexpected downtime. Discovering machine issues after awarding a contract can cost 10–50× more than catching them during evaluation.",
      industryExamples: [
        { industry: "Automotive", scenario: "A tier-1 supplier claimed 5-axis CNC capability but only had 3-axis machines. On-site verification prevented a €2.3M tooling investment into the wrong supplier." },
        { industry: "Aerospace", scenario: "Maintenance logs revealed a critical grinding machine had missed 3 scheduled calibrations — a finding that would have been invisible from a desktop review." },
        { industry: "Medical Devices", scenario: "Equipment age analysis showed 70% of turning centers were past their rated lifecycle, explaining recurring dimensional non-conformances." },
      ],
      oldWay: [
        "Trust supplier-provided equipment lists",
        "Rely on photos that may be outdated",
        "No verification of maintenance history",
        "Discover equipment issues after quality failures",
      ],
      withYvoo: [
        "Physical inspection of every critical machine",
        "Serial number and OEM spec verification",
        "Maintenance log review with photo evidence",
        "Equipment age and condition scoring",
      ],
      costPrevention: [
        { title: "Avoid tooling waste", description: "Don't invest tooling in machines that can't hold your tolerances. Verified capability before commitment." },
        { title: "Prevent delivery delays", description: "Identify capacity bottlenecks before they impact your production schedule." },
        { title: "Reduce quality escapes", description: "Machines in poor condition produce inconsistent parts — catch this before it reaches your line." },
      ],
      supplyChainImpact: "Accurate machine park data enables better capacity planning across your supply base. You know exactly which suppliers can handle volume increases, which need investment, and which are running at risk.",
      performanceEffect: "Suppliers evaluated on equipment condition show 40% fewer quality non-conformances in the first 12 months of production compared to suppliers qualified through document review alone.",
      stats: [
        { label: "Detection rate", value: "35%", description: "of suppliers have equipment discrepancies vs. claims" },
        { label: "Cost prevention", value: "€180k", description: "avg. prevented losses per detected equipment issue" },
        { label: "Quality improvement", value: "40%", description: "fewer NCRs with equipment-verified suppliers" },
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
      overview: "If a supplier can't measure correctly, they can't produce correctly. Our auditors verify the complete measurement chain — from CMMs and optical systems to hand gauges and calibration records. We check calibration status, traceability, and whether measurement capability matches your product requirements.",
      whyItMatters: "Measurement system failures are the #1 hidden cause of quality escapes. A supplier may produce good parts but measure them incorrectly — or vice versa. Verified measurement capability is the foundation of quality assurance.",
      industryExamples: [
        { industry: "Automotive", scenario: "MSA (Measurement System Analysis) revealed a supplier's CMM had a Gage R&R of 45% — far above the 10% threshold. Parts were being approved that should have been rejected." },
        { industry: "Precision Engineering", scenario: "Calibration records showed 12 gauges past their calibration due date, including those used for final inspection. Immediate corrective action prevented a potential product recall." },
        { industry: "Electronics", scenario: "Optical measurement system was calibrated for a different product family. Verification discovered systematic measurement bias affecting all outgoing inspection data." },
      ],
      oldWay: [
        "Accept calibration certificates at face value",
        "No check of actual measurement capability",
        "Discover measurement errors after customer complaints",
        "No visibility into gauge condition or suitability",
      ],
      withYvoo: [
        "Physical inspection of measurement equipment",
        "Calibration status and traceability verification",
        "Measurement capability assessment per product",
        "Photo documentation of gauges and calibration stickers",
      ],
      costPrevention: [
        { title: "Prevent false approvals", description: "Incorrect measurements lead to defective parts passing inspection. Verify before it reaches your assembly line." },
        { title: "Avoid recall costs", description: "Measurement errors can cause systematic defects across entire batches — catch the root cause at the source." },
        { title: "Reduce sorting costs", description: "When measurement capability is verified, you can trust the supplier's inspection results and reduce incoming checks." },
      ],
      supplyChainImpact: "Verified measurement systems mean you can trust your supplier's data. This reduces the need for costly incoming inspection and enables skip-lot programs that accelerate your supply chain.",
      performanceEffect: "Suppliers with verified measurement systems show 60% fewer customer complaints related to dimensional non-conformances, and incoming inspection can be reduced by up to 50%.",
      stats: [
        { label: "Calibration issues", value: "28%", description: "of suppliers have overdue or missing calibrations" },
        { label: "Incoming inspection", value: "50%", description: "reduction possible with verified measurement systems" },
        { label: "Complaint reduction", value: "60%", description: "fewer dimensional complaints from verified suppliers" },
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
      overview: "Cpk values on paper mean nothing without verification. Our auditors examine actual SPC data, process flow diagrams, control plans, and real-time process monitoring to determine whether a supplier can consistently produce within your tolerances — not just occasionally.",
      whyItMatters: "A process with a Cpk of 1.0 produces approximately 2,700 defects per million. At Cpk 1.33, that drops to 63 ppm. The difference between claimed and actual Cpk directly determines your reject rate, rework costs, and delivery reliability.",
      industryExamples: [
        { industry: "Automotive", scenario: "Supplier claimed Cpk >1.67 for all critical dimensions. On-site SPC review revealed 3 out of 8 critical characteristics had Cpk values below 1.0. Process improvement was initiated before SOP." },
        { industry: "Medical Devices", scenario: "Process flow analysis uncovered an undocumented rework step between machining and assembly — a practice that violated GMP requirements and would have triggered regulatory issues." },
        { industry: "Aerospace", scenario: "Control plan review showed no SPC monitoring on a safety-critical dimension. The supplier had been relying on 100% final inspection instead of process control." },
      ],
      oldWay: [
        "Accept supplier-reported Cpk values",
        "Review process flow on paper only",
        "No verification of actual SPC implementation",
        "Discover capability gaps after production start",
      ],
      withYvoo: [
        "Review actual SPC data and control charts",
        "Verify Cpk values against real production data",
        "Assess control plan implementation on-site",
        "Identify undocumented process steps or rework loops",
      ],
      costPrevention: [
        { title: "Prevent scrap costs", description: "Low process capability means high reject rates. Verify before committing production volumes." },
        { title: "Avoid line stoppages", description: "Unstable processes cause unpredictable quality — catching this early prevents supply disruptions." },
        { title: "Reduce warranty costs", description: "Verified process capability at the source means fewer field failures downstream." },
      ],
      supplyChainImpact: "When you know the actual process capability of your suppliers, you can make informed decisions about inspection levels, safety stock, and dual-sourcing strategies.",
      performanceEffect: "Suppliers with verified process capability of Cpk ≥1.33 deliver 85% fewer quality non-conformances compared to suppliers with unverified capability claims.",
      stats: [
        { label: "Cpk discrepancy", value: "42%", description: "of suppliers overstate their process capability" },
        { label: "Scrap reduction", value: "€95k", description: "avg. annual savings from early capability detection" },
        { label: "Quality improvement", value: "85%", description: "fewer NCRs with capability-verified suppliers" },
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
      overview: "Capacity claims in supplier proposals are often optimistic. Our auditors verify actual throughput rates, shift models, equipment utilization, and identify production bottlenecks — giving you a realistic picture of what a supplier can actually deliver, not what they promise.",
      whyItMatters: "Overestimated capacity is the leading cause of supplier delivery failures. When a supplier can't keep up with your demand, the cost of line stoppages, emergency sourcing, and air freight dwarfs the cost of an upfront capacity verification.",
      industryExamples: [
        { industry: "Automotive", scenario: "Capacity analysis revealed the supplier was already running 3 shifts with 15% overtime to serve existing customers. They had zero spare capacity for the proposed new project — something hidden in the RFQ response." },
        { industry: "Consumer Goods", scenario: "Bottleneck analysis identified that the finishing department could only handle 60% of the machining output. This constraint would have caused chronic delivery delays during peak season." },
        { industry: "Industrial Equipment", scenario: "Shift model verification showed the supplier counted weekend maintenance hours as production capacity, inflating their stated capability by 25%." },
      ],
      oldWay: [
        "Trust capacity figures from supplier questionnaires",
        "No visibility into existing customer commitments",
        "Discover capacity issues after delivery delays",
        "No understanding of production bottlenecks",
      ],
      withYvoo: [
        "On-site throughput measurement and verification",
        "Shift model and utilization rate analysis",
        "Bottleneck identification across value stream",
        "Assessment of existing capacity commitments",
      ],
      costPrevention: [
        { title: "Prevent delivery failures", description: "Know the real capacity before committing. Avoid the cascade of missed deliveries and emergency actions." },
        { title: "Avoid air freight costs", description: "Capacity shortfalls often result in expediting fees that exceed the part cost. Verify upfront." },
        { title: "Prevent line stoppages", description: "A single day of automotive line stoppage costs €250k–€500k. Capacity verification is insurance against this." },
      ],
      supplyChainImpact: "Accurate capacity data enables realistic production planning, appropriate safety stock levels, and informed dual-sourcing decisions across your supply base.",
      performanceEffect: "Suppliers with verified capacity show 70% fewer delivery delays in the first year of production compared to suppliers qualified on self-reported capacity alone.",
      stats: [
        { label: "Overstatement", value: "38%", description: "of suppliers overstate their available capacity" },
        { label: "Delivery improvement", value: "70%", description: "fewer delivery delays with capacity-verified suppliers" },
        { label: "Cost avoidance", value: "€350k", description: "avg. prevented emergency costs per detected capacity gap" },
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
      overview: "Raw material quality and traceability are the foundation of every manufactured part. Our auditors inspect incoming goods procedures, storage conditions, material identification systems, and FIFO compliance — verifying that what enters production is what it claims to be.",
      whyItMatters: "Material mix-ups and poor storage conditions cause catastrophic quality failures. Counterfeit materials, degraded stock, and broken traceability chains can lead to product recalls, safety incidents, and regulatory penalties.",
      industryExamples: [
        { industry: "Aerospace", scenario: "Material traceability audit revealed the supplier couldn't link 3 out of 10 sampled batches back to mill certificates. This traceability gap would have failed any customer audit and risked product certification." },
        { industry: "Automotive", scenario: "Storage condition inspection found rubber seals stored in direct sunlight with no temperature control, causing premature degradation and contributing to a 15% incoming rejection rate." },
        { industry: "Pharma", scenario: "FIFO compliance check revealed expired raw materials mixed with current stock. The expired materials were still in the active inventory system, posing contamination risk." },
      ],
      oldWay: [
        "Review material certificates remotely",
        "No verification of actual storage conditions",
        "Trust supplier's traceability claims",
        "Discover material issues through product failures",
      ],
      withYvoo: [
        "Physical inspection of storage areas and conditions",
        "FIFO compliance and material dating verification",
        "Traceability chain validation from receipt to production",
        "Material identification and labeling assessment",
      ],
      costPrevention: [
        { title: "Prevent material mix-ups", description: "Cross-contamination between similar materials can cause entire batch rejections. Physical verification catches labeling gaps." },
        { title: "Avoid recall risk", description: "Broken traceability means you can't isolate affected products. Verified traceability limits recall scope and cost." },
        { title: "Reduce incoming rejections", description: "Poor storage damages materials before production starts. Identifying storage issues prevents waste at the source." },
      ],
      supplyChainImpact: "Verified material management ensures that the quality chain starts correctly. Suppliers with proper traceability can respond faster to quality escapes, limiting the blast radius of any issue.",
      performanceEffect: "Suppliers with verified material management systems show 55% fewer material-related non-conformances and respond 3× faster to containment requests.",
      stats: [
        { label: "Traceability gaps", value: "31%", description: "of suppliers have traceability weaknesses" },
        { label: "Material NCRs", value: "55%", description: "reduction with verified material management" },
        { label: "Containment speed", value: "3×", description: "faster response from suppliers with verified traceability" },
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
      overview: "HSE compliance isn't just a moral obligation — it's a business risk indicator. Suppliers who cut corners on safety and environment often cut corners on quality. Our auditors evaluate workplace safety, environmental controls, and regulatory compliance on-site.",
      whyItMatters: "An HSE incident at your supplier can shut down your supply chain, damage your brand, and expose you to legal liability. ESG reporting requirements make supplier HSE performance a board-level concern.",
      industryExamples: [
        { industry: "Consumer Brands", scenario: "HSE inspection revealed excessive working hours and missing fire exits — findings that would have been a PR catastrophe if discovered by media or NGOs after a contract was signed." },
        { industry: "Chemical", scenario: "Environmental inspection found improper hazardous waste storage, creating both regulatory risk and contamination risk for adjacent production areas handling customer products." },
        { industry: "Electronics", scenario: "PPE audit showed only 40% of workers in the plating department had proper respiratory protection — a compliance violation that could trigger regulatory shutdown." },
      ],
      oldWay: [
        "Rely on supplier self-assessment questionnaires",
        "Accept certificates without on-site verification",
        "Discover HSE issues through incidents or media reports",
        "No visibility into actual working conditions",
      ],
      withYvoo: [
        "Physical walkthrough of all production areas",
        "PPE compliance and safety protocol verification",
        "Environmental controls and waste management check",
        "Working conditions and labor practice assessment",
      ],
      costPrevention: [
        { title: "Prevent supply disruption", description: "A regulatory shutdown at your supplier stops your production. Proactive HSE verification prevents this scenario." },
        { title: "Protect brand reputation", description: "Supply chain scandals damage brands for years. Verified HSE compliance is your first line of defense." },
        { title: "ESG compliance", description: "Investor and regulatory pressure demands verified supplier ESG data. On-site HSE assessment delivers this." },
      ],
      supplyChainImpact: "Suppliers with verified HSE compliance are more stable long-term partners. They face fewer regulatory disruptions, lower insurance costs, and demonstrate the operational discipline that also drives quality.",
      performanceEffect: "Suppliers with verified HSE compliance show 45% lower risk of supply disruption due to regulatory or safety-related shutdowns.",
      stats: [
        { label: "HSE gaps", value: "47%", description: "of suppliers have at least one critical HSE finding" },
        { label: "Disruption prevention", value: "45%", description: "lower risk of regulatory shutdown with verified HSE" },
        { label: "ESG alignment", value: "100%", description: "of evaluations map to ESG reporting frameworks" },
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
      overview: "Beyond a basic machine list, equipment intelligence provides deep insight into machine specifications, utilization rates, maintenance condition, and technological capability. Our auditors capture OEM data, verify production readiness, and assess whether equipment matches your product requirements.",
      whyItMatters: "The gap between what a machine can theoretically do and what it can reliably produce in practice determines your quality and delivery risk. Equipment intelligence closes this gap with verified data.",
      industryExamples: [
        { industry: "Automotive", scenario: "Equipment intelligence revealed that a supplier's 'high-precision' grinding machine was a rebuilt unit from 1998 with modified controls — technically capable but with significantly higher failure risk than a modern equivalent." },
        { industry: "Aerospace", scenario: "Utilization rate analysis showed the critical 5-axis machine was running at 94% capacity for existing customers, leaving virtually no slot availability for new projects." },
        { industry: "Medical", scenario: "OEM spec verification confirmed that the supplier's cleanroom injection molding machine lacked the required clamping force for the customer's larger parts — a limitation not visible in the quoted capabilities." },
      ],
      oldWay: [
        "Accept equipment lists without verification",
        "No insight into machine age or condition",
        "Discover capability limitations during production",
        "No utilization or availability data",
      ],
      withYvoo: [
        "OEM specification and serial number verification",
        "Machine condition and maintenance assessment",
        "Utilization rate and availability analysis",
        "Technology capability vs. product requirement matching",
      ],
      costPrevention: [
        { title: "Prevent tooling waste", description: "Don't invest in tooling for machines that can't deliver your requirements. Verify equipment fit before commitment." },
        { title: "Avoid unplanned downtime", description: "Poorly maintained equipment fails during production. Equipment intelligence flags maintenance risks early." },
        { title: "Optimize sourcing decisions", description: "Know exactly what each supplier can produce — and what they can't — before making volume commitments." },
      ],
      supplyChainImpact: "Equipment intelligence enables precision capacity planning. You know exactly which suppliers can handle specific part families, allowing smarter allocation across your supply base.",
      performanceEffect: "Suppliers evaluated with equipment intelligence show 50% fewer capability-related production issues and 30% faster ramp-up for new products.",
      stats: [
        { label: "Capability gaps", value: "29%", description: "of suppliers have equipment-product mismatches" },
        { label: "Ramp-up speed", value: "30%", description: "faster new product introduction with verified equipment" },
        { label: "Downtime reduction", value: "50%", description: "fewer unplanned stoppages with condition-assessed equipment" },
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
      overview: "The quality of intelligence depends entirely on who collects it. Our auditors are certified professionals with deep industry expertise — not generalists ticking boxes. Every evaluation is conducted by a local expert who understands the manufacturing context, speaks the language, and knows what to look for.",
      whyItMatters: "A generalist auditor misses what a specialist catches. Industry-specific expertise means the auditor can distinguish between acceptable practice and hidden risk — context that no checklist can replace.",
      industryExamples: [
        { industry: "Automotive", scenario: "An auditor with IATF 16949 experience identified that the supplier's FMEA process was superficial — a finding that a generalist would have marked as 'compliant' based on documentation alone." },
        { industry: "Pharma", scenario: "A GMP-experienced auditor recognized that the supplier's cleaning validation protocol was insufficient for the customer's API — a nuance that requires deep pharmaceutical manufacturing knowledge." },
        { industry: "Oil & Gas", scenario: "A specialist auditor identified welding procedure qualifications that didn't cover the actual thickness range being produced — a safety-critical gap that paperwork review alone would have missed." },
      ],
      oldWay: [
        "Send generalist auditors who lack industry context",
        "Fly your own team across the globe at high cost",
        "Wait weeks for auditor availability",
        "Language barriers reduce evaluation quality",
      ],
      withYvoo: [
        "Industry-specialized local auditors",
        "AI-matched expertise to your requirements",
        "Available within 48 hours, no travel delays",
        "Native language capability for deeper engagement",
      ],
      costPrevention: [
        { title: "Eliminate travel costs", description: "Local experts mean zero flights, hotels, and per diems. Audit costs drop by up to 80% compared to sending your own team." },
        { title: "Prevent knowledge gaps", description: "Specialist auditors catch industry-specific risks that generalists miss. Better findings mean better decisions." },
        { title: "Speed to insight", description: "Available in days, not weeks. Faster evaluation means faster decision-making and shorter qualification cycles." },
      ],
      supplyChainImpact: "A network of local experts means you can evaluate any supplier, anywhere, anytime — without the logistics of organizing international travel or finding qualified auditors yourself.",
      performanceEffect: "Evaluations conducted by industry-specialized auditors identify 3× more actionable findings compared to generalist auditors, leading to more informed sourcing decisions.",
      stats: [
        { label: "Network", value: "850+", description: "certified industry-specialized auditors worldwide" },
        { label: "Matching speed", value: "48h", description: "average time to match and confirm an expert" },
        { label: "Finding quality", value: "3×", description: "more actionable findings vs. generalist auditors" },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
              {m.headline}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              {m.overview}
            </p>
          </motion.div>

          {/* Why it matters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16 md:mb-24">
            <div className="border-l-4 border-primary pl-8 md:pl-12">
              <span className="text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4 block">Why it matters</span>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                {m.whyItMatters}
              </p>
            </div>
          </motion.div>

          {/* Old Way vs YVOO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">The difference</h2>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="bg-[#ebebeb] p-8 md:p-10">
                <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6">Traditional approach</p>
                <div className="space-y-4">
                  {m.oldWay.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-destructive" />
                      </div>
                      <span className="text-foreground/60">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#0a0a0a] p-8 md:p-10">
                <p className="text-sm font-medium tracking-[0.2em] text-white/80 uppercase mb-6">With YVOO</p>
                <div className="space-y-4">
                  {m.withYvoo.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Industry Examples */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">Industry examples</h2>
            <div className="grid md:grid-cols-3 gap-0 border-t border-foreground/10">
              {m.industryExamples.map((ex, idx) => (
                <div key={idx} className="border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0 p-8">
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-primary mb-3 block">{ex.industry}</span>
                  <p className="text-foreground/70 leading-relaxed text-sm">{ex.scenario}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cost & Damage Prevention */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">Cost & damage prevention</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {m.costPrevention.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Supply Chain Impact & Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16 md:mb-24">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Supply chain impact</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.supplyChainImpact}</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h3 className="text-xl font-semibold text-foreground">Performance effect</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.performanceEffect}</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-16 md:mb-24">
            <div className="grid grid-cols-3 gap-0 border-t-2 border-primary">
              {m.stats.map((stat, idx) => (
                <div key={idx} className="border-r border-foreground/10 last:border-r-0 p-8 md:p-10">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
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
