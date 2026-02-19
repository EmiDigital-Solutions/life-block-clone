import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ArrowLeft, Check, Quote } from "lucide-react";
import { motion } from "framer-motion";

export interface GroundIntelligenceFeature {
  number: string;
  title: string;
  description: string;
  detail: {
    overview: string;
    forEngineering: string;
    forConstruction: string;
    forProjectControls: string;
    example: string;
  };
  capabilities: string[];
  stats: { category: string; stat: string; description: string }[];
}

export const groundIntelligenceFeatures: GroundIntelligenceFeature[] = [
  {
    number: "01",
    title: "Weld Inspection & NDE Verification",
    description: "On-site witness of welding procedures and non-destructive examination per ASME V, API 577, and EN ISO 17635.",
    detail: {
      overview: "Welding is the most critical fabrication activity in LNG and gas processing plants. A single undetected weld defect in a cryogenic piping system can cause catastrophic failure. RCA deploys certified NDE inspectors to fabrication shops to witness weld procedure qualification, welder performance tests, and production NDE execution.",
      forEngineering: "Verify that WPS/PQR packages match engineering specifications. Confirm that NDE methods (RT, UT, MT, PT) are applied per code requirements with correct acceptance criteria. Review weld maps against isometric drawings.",
      forConstruction: "Witness weld execution in real-time at the fabrication shop. Verify welder qualifications, preheat/interpass temperatures, and PWHT execution. Catch defects before they ship to site — not during erection.",
      forProjectControls: "Timestamped evidence of every NDE result supports FIDIC claims for rework costs and schedule delays caused by defective fabrication. Protected evidence chain for liquidated damages enforcement.",
      example: "During fabrication of cryogenic piping for an LNG train in Southeast Asia, RCA inspectors identified systematic lack-of-fusion defects in 23% of production welds at a Korean fabrication shop. The defects were caught via on-site UT witness before the piping shipped, avoiding an estimated 14-week schedule delay and $2.8M in field rework.",
    },
    capabilities: [
      "WPS/PQR compliance verification",
      "Welder performance qualification witness",
      "RT, UT, MT, PT execution witness",
      "Weld map vs. isometric cross-check",
      "PWHT monitoring and documentation",
      "NDE acceptance criteria validation per code",
    ],
    stats: [
      { category: "Detection", stat: "96%", description: "of weld defects caught at fabrication shop before shipment" },
      { category: "Codes", stat: "ASME V", description: "API 577, EN ISO 17635, AWS D1.1 compliance" },
      { category: "Evidence", stat: "100%", description: "of NDE results with timestamped inspector witness" },
    ],
  },
  {
    number: "02",
    title: "Dimensional Control & Verification",
    description: "Laser tracker and CMM-based dimensional verification against engineering drawings and tolerance specifications.",
    detail: {
      overview: "Dimensional non-conformances are the second most common cause of site rework in EPC projects. RCA inspectors verify critical dimensions at the fabrication shop using calibrated instruments — laser trackers, CMMs, and conventional metrology — before equipment ships to site.",
      forEngineering: "Verify that as-built dimensions match engineering drawings within specified tolerances. Check nozzle orientations, flange face perpendicularity, and critical fit-up dimensions per ASME B16.5/B16.47.",
      forConstruction: "Prevent site fit-up problems by catching dimensional deviations at the fabrication shop. Verify that modular assemblies, pipe spools, and structural steel match 3D model coordinates.",
      forProjectControls: "Dimensional deviation reports with actual vs. nominal measurements provide documented evidence for NCR processing and FIDIC variation claims when suppliers deviate from specification.",
      example: "RCA inspectors identified a 12mm nozzle orientation error on a cryogenic heat exchanger shell during dimensional verification at a Chinese fabrication shop. The deviation was corrected before hydrostatic testing, preventing a 6-week delay in mechanical completion.",
    },
    capabilities: [
      "Laser tracker 3D measurement",
      "CMM verification for machined surfaces",
      "Flange face perpendicularity checks",
      "Nozzle orientation verification",
      "Modular assembly fit-up confirmation",
      "As-built vs. as-designed comparison reports",
    ],
    stats: [
      { category: "Accuracy", stat: "±0.1mm", description: "measurement precision with laser tracker verification" },
      { category: "Prevention", stat: "87%", description: "of dimensional rework eliminated at fabrication stage" },
      { category: "Coverage", stat: "100%", description: "of critical dimensions verified per engineering spec" },
    ],
  },
  {
    number: "03",
    title: "Pressure & Leak Testing Witness",
    description: "Hydrostatic, pneumatic, and helium leak testing witness per ASME PCC-2, API 598, and project specifications.",
    detail: {
      overview: "Pressure and leak testing is the final gate before equipment ships to site. RCA inspectors witness test execution to verify compliance with test procedures, hold pressure duration, and acceptance criteria per applicable codes.",
      forEngineering: "Verify test pressure calculations per ASME B31.3 or project-specific requirements. Confirm test medium, temperature corrections, and gauge calibration. Witness hold time and verify zero pressure drop.",
      forConstruction: "Ensure that pressure test certificates are valid and complete before accepting equipment at site. Witness testing at the fabrication shop eliminates the need for re-testing at site.",
      forProjectControls: "Test witness reports with calibration certificates and timestamped pressure recordings provide FIDIC-compliant evidence for mechanical completion sign-off and performance guarantees.",
      example: "During hydrostatic testing of a 36-inch cryogenic valve at a Russian fabrication facility, RCA inspectors identified that the test gauge calibration had expired 3 months prior. Testing was halted, gauges re-calibrated, and the test repeated with valid instruments — preventing an invalid test certificate from entering the project documentation.",
    },
    capabilities: [
      "Hydrostatic test witness per ASME PCC-2",
      "Pneumatic test witness with safety assessment",
      "Helium leak test witness for cryogenic service",
      "Test gauge calibration verification",
      "Pressure recording and hold-time documentation",
      "Test certificate validation and sign-off",
    ],
    stats: [
      { category: "Witness", stat: "100%", description: "of pressure tests witnessed with calibrated instruments" },
      { category: "Compliance", stat: "ASME", description: "PCC-2, API 598, EN 12266 coverage" },
      { category: "Detection", stat: "15%", description: "of tests required re-execution due to procedural issues" },
    ],
  },
  {
    number: "04",
    title: "Material Traceability & MTR Verification",
    description: "Physical verification of material test reports, heat numbers, and PMI against engineering material specifications.",
    detail: {
      overview: "Material mix-ups and falsified MTRs are a persistent risk in global EPC fabrication. RCA inspectors physically verify material traceability at the fabrication shop — checking heat numbers against MTRs, performing PMI spot-checks, and confirming material grades match engineering specifications.",
      forEngineering: "Verify that material certificates (EN 10204 3.1/3.2) match specified grades. Confirm chemical composition and mechanical properties against code requirements. Check impact test results for cryogenic service materials.",
      forConstruction: "Prevent material non-conformances from reaching the construction site. Physical PMI verification catches grade substitutions that paper-based MTR reviews cannot detect.",
      forProjectControls: "Complete material traceability documentation from mill certificate to final installation supports regulatory compliance, insurance requirements, and dispute resolution.",
      example: "RCA PMI spot-checks at an Indian pipe fitting manufacturer revealed that 8 out of 120 fittings marked as ASTM A403 WP316L were actually WP304L — a grade substitution that would have caused cryogenic service failure. The non-conforming fittings were rejected and replaced before shipment.",
    },
    capabilities: [
      "MTR vs. physical marking cross-check",
      "Portable XRF / PMI verification",
      "Heat number traceability from mill to shop",
      "EN 10204 3.1/3.2 certificate validation",
      "Impact test result verification for cryogenic grades",
      "Material substitution detection",
    ],
    stats: [
      { category: "Detection", stat: "7%", description: "average material non-conformance rate found during PMI checks" },
      { category: "Traceability", stat: "100%", description: "heat-to-certificate verification for critical items" },
      { category: "Standards", stat: "EN 10204", description: "ASTM, ASME SA material specification compliance" },
    ],
  },
  {
    number: "05",
    title: "ITP Hold-Point Enforcement",
    description: "Mandatory witness and sign-off at Inspection & Test Plan hold points — no fabrication proceeds without inspector approval.",
    detail: {
      overview: "An ITP hold point means fabrication must stop until the inspector witnesses and approves. RCA enforces this rigorously — no sign-off, no progression. Our inspectors are deployed at fabrication shops to witness critical stages defined in the project ITP.",
      forEngineering: "Define hold points for critical fabrication stages — fit-up inspection, weld NDE, PWHT, pressure testing, final dimensional check. RCA inspectors verify compliance at each stage per engineering specifications.",
      forConstruction: "Guarantee that no critical fabrication stage is bypassed. Hold-point enforcement at the shop prevents defective or non-compliant equipment from shipping to the construction site.",
      forProjectControls: "Every hold-point sign-off is timestamped, GPS-tagged, and digitally signed. This protected evidence chain supports FIDIC clause 7.3 (Inspection) and clause 11.1 (Defects Notification) enforcement.",
      example: "A fabrication shop in China attempted to proceed past a weld NDE hold point without inspector witness. RCA's digital ITP tracking flagged the violation in real-time. Fabrication was stopped, NDE was re-executed with inspector present, and 3 rejected welds were identified and repaired.",
    },
    capabilities: [
      "Digital ITP tracking with real-time status",
      "Hold-point notification and scheduling",
      "Mandatory witness sign-off workflow",
      "Violation detection and escalation",
      "GPS-tagged and timestamped sign-offs",
      "Integration with project document management",
    ],
    stats: [
      { category: "Enforcement", stat: "100%", description: "of hold points witnessed — zero bypass tolerance" },
      { category: "Tracking", stat: "Real-time", description: "ITP status visible to project team" },
      { category: "Evidence", stat: "FIDIC", description: "compliant evidence chain for claims support" },
    ],
  },
  {
    number: "06",
    title: "Coating & Surface Protection Inspection",
    description: "Verify surface preparation, coating application, and DFT measurements per NACE, SSPC, and ISO 8501 standards.",
    detail: {
      overview: "Coating failures in LNG and offshore environments lead to accelerated corrosion and costly repair campaigns. RCA inspectors witness surface preparation and coating application at the fabrication shop to verify compliance with project coating specifications.",
      forEngineering: "Verify that surface preparation meets specified cleanliness (Sa 2½ per ISO 8501) and profile requirements. Confirm coating system compatibility, application parameters, and cure times per manufacturer data sheets.",
      forConstruction: "Prevent coating damage claims by documenting coating condition at the point of shipment. DFT measurements and adhesion test results provide baseline data for any future dispute.",
      forProjectControls: "Coating inspection reports with DFT maps, adhesion test results, and environmental condition logs provide documented evidence for warranty claims and variation management.",
      example: "RCA coating inspectors at a fabrication shop in the UAE identified that ambient temperature during epoxy application exceeded the coating manufacturer's maximum limit by 8°C. Application was halted and rescheduled to evening shifts, preventing premature coating degradation in cryogenic service.",
    },
    capabilities: [
      "Surface preparation verification (ISO 8501)",
      "DFT measurement and mapping",
      "Adhesion testing (pull-off per ASTM D4541)",
      "Environmental condition monitoring",
      "Holiday / pinhole detection",
      "Coating system compatibility verification",
    ],
    stats: [
      { category: "Standards", stat: "NACE", description: "SSPC, ISO 8501/12944 compliance verification" },
      { category: "Coverage", stat: "100%", description: "DFT measurements on all coated surfaces" },
      { category: "Prevention", stat: "92%", description: "of coating failures prevented at application stage" },
    ],
  },
  {
    number: "07",
    title: "Cryogenic Testing & Qualification",
    description: "Witness cryogenic testing procedures for LNG service equipment — leak testing at -196°C, impact testing, and material qualification.",
    detail: {
      overview: "Equipment destined for cryogenic LNG service must demonstrate performance at operating temperatures down to -162°C. RCA inspectors witness cryogenic testing at qualified test facilities to verify that valves, piping, and equipment meet cryogenic service requirements.",
      forEngineering: "Verify cryogenic test procedures against API 6D Annex H, BS 6364, and SHELL MESC SPE 77/300 requirements. Confirm LN₂ chamber temperature stability, soak times, and leak rate acceptance criteria.",
      forConstruction: "Cryogenic test witness at the manufacturer prevents unqualified equipment from shipping to site. Test certificates with inspector witness provide confidence for mechanical completion.",
      forProjectControls: "Cryogenic qualification test evidence supports equipment acceptance, warranty activation, and performance guarantee enforcement under EPC contract conditions.",
      example: "During cryogenic testing of 24-inch butterfly valves for an LNG receiving terminal, RCA inspectors identified that the LN₂ chamber did not reach the specified -196°C soak temperature — actual temperature was -178°C. The test was invalidated and repeated with proper chamber conditioning, ensuring the valves met the full cryogenic qualification requirement.",
    },
    capabilities: [
      "LN₂ cryogenic test witness",
      "Chamber temperature monitoring and verification",
      "Leak rate measurement at cryogenic temperature",
      "Impact test witness (Charpy V-notch)",
      "Material qualification review for cryogenic grades",
      "Test procedure compliance per API 6D / BS 6364",
    ],
    stats: [
      { category: "Temperature", stat: "-196°C", description: "full cryogenic qualification witness capability" },
      { category: "Codes", stat: "API 6D", description: "BS 6364, SHELL MESC compliance verification" },
      { category: "Detection", stat: "22%", description: "of cryogenic tests required re-execution" },
    ],
  },
  {
    number: "08",
    title: "FIDIC Claims & Evidence Management",
    description: "Protected evidence chain with timestamped photos, measurements, and digital signatures — ready for FIDIC claims and liquidated damages.",
    detail: {
      overview: "EPC disputes over fabrication quality, schedule delays, and specification non-conformances require documented evidence. RCA's protected evidence chain captures every inspection finding with timestamps, GPS coordinates, and digital signatures that cannot be altered after capture.",
      forEngineering: "Technical evidence packages link inspection findings to specific engineering specification clauses and code requirements. Deviation reports include actual vs. specified values with measurement uncertainty.",
      forConstruction: "Evidence collected at the fabrication shop supports NCR processing, rework cost recovery, and delay claims. Geo-tagged photos prove the condition of equipment at the point of fabrication.",
      forProjectControls: "FIDIC-ready evidence packages support Clause 7.5 (Rejection), Clause 8.7 (Delay Damages), and Clause 11.1 (Defects Notification). Automated evidence compilation reduces claims preparation time.",
      example: "An EPC contractor used RCA evidence packages to recover $4.2M in FIDIC delay damages from a fabrication shop that delivered pressure vessels 16 weeks late with 47 documented NCRs. The protected evidence chain — with timestamped inspection reports and rejected test certificates — was accepted as primary evidence in arbitration.",
    },
    capabilities: [
      "Timestamped, GPS-tagged evidence capture",
      "Digital signature and tamper-proof chain",
      "Automated NCR compilation and tracking",
      "FIDIC clause mapping for claims support",
      "Evidence package export for legal proceedings",
      "Historical evidence archive with full traceability",
    ],
    stats: [
      { category: "Protection", stat: "100%", description: "tamper-proof evidence chain with digital signatures" },
      { category: "FIDIC", stat: "Cl. 7–11", description: "compliant evidence for inspection and defects clauses" },
      { category: "Efficiency", stat: "5×", description: "faster claims preparation with automated evidence compilation" },
    ],
  },
  {
    number: "09",
    title: "Fabrication Progress Monitoring",
    description: "Real-time visibility into fabrication progress at supplier shops — schedule tracking, milestone verification, and delay risk alerts.",
    detail: {
      overview: "EPC projects depend on hundreds of fabrication packages delivered on schedule. RCA provides real-time visibility into fabrication progress at supplier shops worldwide — tracking milestones, verifying completion status, and flagging delay risks before they impact the critical path.",
      forEngineering: "Monitor technical completion milestones — material receipt, fit-up completion, welding completion, NDE clearance, pressure testing, coating, and final inspection. Verify that engineering holds are released in sequence.",
      forConstruction: "Align site construction schedules with actual fabrication progress. Early warning of delays allows schedule re-sequencing and resource reallocation before fabrication delays cascade into site delays.",
      forProjectControls: "Fabrication progress data feeds directly into S-curve reporting and earned value analysis. Delay risk alerts trigger early intervention and contract notice procedures per FIDIC Clause 8.3.",
      example: "RCA progress monitoring at 14 fabrication shops across 5 countries for an LNG expansion project identified that pipe spool fabrication at one shop was tracking 4 weeks behind schedule. Early detection allowed the EPC contractor to activate an alternative fabrication shop, maintaining the critical path for mechanical completion.",
    },
    capabilities: [
      "Real-time milestone tracking at supplier shops",
      "Fabrication S-curve and earned value reporting",
      "Delay risk detection and early warning alerts",
      "Photo-documented progress verification",
      "Multi-shop progress dashboard",
      "Integration with project scheduling tools (P6, MS Project)",
    ],
    stats: [
      { category: "Visibility", stat: "Real-time", description: "fabrication progress across all supplier shops" },
      { category: "Early warning", stat: "4 weeks", description: "average lead time for delay risk detection" },
      { category: "Coverage", stat: "Global", description: "monitoring capability across all fabrication regions" },
    ],
  },
];

interface GroundIntelligenceFeatureModalProps {
  feature: GroundIntelligenceFeature | null;
  onClose: () => void;
}

const GroundIntelligenceFeatureModal = ({ feature, onClose }: GroundIntelligenceFeatureModalProps) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-none w-screen h-screen sm:rounded-none p-0 bg-white border-none overflow-hidden [&>button]:hidden">
        {/* Top Nav */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-foreground/20 text-foreground text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Construction Intelligence
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="h-full overflow-y-auto pt-14">
          {/* Hero */}
          <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-end bg-foreground">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/95 to-foreground/80" />
            <div className="relative z-10 container mx-auto max-w-7xl px-6 pb-16 pt-40">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-xs font-medium text-white uppercase tracking-wider mb-4"
              >
                Feature {feature.number}
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/60 font-bold text-xl tracking-wider mb-4"
              >
                Construction Intelligence
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.1] max-w-4xl"
              >
                {feature.title}
              </motion.h1>
            </div>
          </section>

          {/* Quote/Overview */}
          <section className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed mb-8">
                  "{feature.detail.overview}"
                </blockquote>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Role-Specific Benefits */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                      For Engineering
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forEngineering}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground text-xs font-medium uppercase tracking-wider">
                      For Construction
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forConstruction}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-accent/15 text-accent text-xs font-medium uppercase tracking-wider">
                      For Project Controls
                    </span>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {feature.detail.forProjectControls}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Real-World Example
                    </span>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.detail.example}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-32 px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl font-bold text-foreground tracking-[-0.02em] max-w-2xl mb-16"
              >
                Measurable Impact
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
                {feature.stats.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="pb-12"
                  >
                    <p className="text-sm text-foreground/50 font-mono tracking-wide uppercase mb-2">
                      {result.category}
                    </p>
                    <div className="border-t border-foreground/20 pt-4">
                      <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                        {result.stat}
                      </p>
                      <p className="text-foreground/60 text-sm">
                        {result.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Capabilities */}
          <section className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
              >
                Included Capabilities
              </motion.h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {feature.capabilities.map((cap, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-white"
                  >
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{cap}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroundIntelligenceFeatureModal;
