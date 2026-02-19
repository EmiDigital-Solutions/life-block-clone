import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Pause, Play, Camera, Wifi, Volume2, VolumeX, FileImage, Radio } from "lucide-react";

/* ── Scroll Nav ── */
const ScrollNav = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) => {
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanUp(el.scrollTop > 10);
      setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 10);
    };
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [scrollRef]);
  const scroll = (dir: "up" | "down") => {
    scrollRef.current?.scrollBy({ top: dir === "up" ? -120 : 120, behavior: "smooth" });
  };
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
      <button onClick={() => scroll("up")} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${canUp ? "bg-white/10 text-white/50 hover:bg-white/20" : "opacity-0 pointer-events-none"}`}>
        <ChevronUp className="w-3.5 h-3.5" />
      </button>
      <button onClick={() => scroll("down")} className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${canDown ? "bg-white/10 text-white/50 hover:bg-white/20" : "opacity-0 pointer-events-none"}`}>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ── ITP Steps ── */
interface ITPStep {
  id: string;
  code: string;
  name: string;
  type: "H" | "W" | "R";
  status: "pending" | "active" | "pass" | "fail" | "na";
  sub?: string;
}

const itpSteps: ITPStep[] = [
  { id: "1", code: "ITP-001", name: "Document Review", type: "R", status: "pending", sub: "MTRs, WPS/PQR, Drawings" },
  { id: "2", code: "ITP-002", name: "Material Verification (PMI)", type: "H", status: "pending", sub: "XRF on shell, tubes, heads" },
  { id: "3", code: "ITP-003", name: "Dimensional Inspection", type: "H", status: "pending", sub: "Shell OD, length, nozzle orient." },
  { id: "4", code: "ITP-004", name: "Weld Visual Inspection", type: "H", status: "pending", sub: "All seam + circ. welds per GOST" },
  { id: "5", code: "ITP-005", name: "NDT — Radiography (RT)", type: "H", status: "pending", sub: "100% RT on long. & circ. seams" },
  { id: "6", code: "ITP-006", name: "NDT — Ultrasonic (UT)", type: "W", status: "pending", sub: "Nozzle welds, attachments" },
  { id: "7", code: "ITP-007", name: "Post-Weld Heat Treatment", type: "W", status: "pending", sub: "Time-temp chart verification" },
  { id: "8", code: "ITP-008", name: "Hydrostatic Pressure Test", type: "H", status: "pending", sub: "1.5× design = 42.0 barg, 30 min" },
  { id: "9", code: "ITP-009", name: "Coating / Painting", type: "W", status: "pending", sub: "Sa 2.5 prep, DFT 250μm ± 25" },
  { id: "10", code: "ITP-010", name: "Preservation & Packing", type: "R", status: "pending", sub: "N₂ purge, flange caps, desiccant" },
  { id: "11", code: "ITP-011", name: "Final Acceptance", type: "H", status: "pending", sub: "Data book, nameplate, FAT cert." },
];

/* ── Inspection step details ── */
interface InspectionDetail {
  stepId: string;
  title: string;
  aiGuidance: string;
  measurements?: { param: string; spec: string; actual: string; pass: boolean }[];
  findings?: { severity: "OK" | "MAJOR" | "CRITICAL"; text: string }[];
  evidenceCapture?: string[];
  voiceNote?: string;
  iotSensors?: { sensor: string; value: string; status: "ok" | "warn" | "crit" }[];
  cameraCapture?: { filename: string; type: "photo" | "video" | "thermal" }[];
}

const inspectionDetails: InspectionDetail[] = [
  {
    stepId: "1",
    title: "Document Review — MTRs & Welding Records",
    aiGuidance: "Verify mill test reports match MTO. Cross-check heat numbers against PMI plan. Confirm WPS/PQR approved for material grade.",
    measurements: [
      { param: "Mill Certs (MTR)", spec: "EN 10204 3.2", actual: "3.1 only", pass: false },
      { param: "WPS Count", spec: "6 required", actual: "4 submitted", pass: false },
      { param: "PQR Records", spec: "All WPS backed", actual: "2 missing PQR", pass: false },
      { param: "Drawing Rev.", spec: "Rev. 05", actual: "Rev. 05 ✓", pass: true },
    ],
    findings: [
      { severity: "MAJOR", text: "MTR grade 3.1 instead of 3.2 — third-party witness missing" },
      { severity: "MAJOR", text: "2 WPS without backing PQR — welder qualification gap" },
    ],
    evidenceCapture: ["MTR_package_scan.pdf", "WPS_register_screenshot.jpg"],
    voiceNote: "Document review complete. Two major findings: MTR certification level insufficient, and two welding procedures lack qualification records.",
    cameraCapture: [{ filename: "DOC_MTR_stamp.jpg", type: "photo" }],
  },
  {
    stepId: "2",
    title: "Material Verification — Positive Material Identification",
    aiGuidance: "Perform handheld XRF on shell plates, tube bundle, channel heads, and nozzle forgings. Verify alloy composition against MTR and MTO.",
    measurements: [
      { param: "Shell (SA-516 Gr.70)", spec: "C≤0.27, Mn≤1.20", actual: "C=0.22, Mn=1.05", pass: true },
      { param: "Tubes (SA-179)", spec: "C≤0.18", actual: "C=0.14 ✓", pass: true },
      { param: "Channel (SA-350 LF2)", spec: "Ni≥0.40", actual: "Ni=0.38", pass: false },
      { param: "Nozzle N1 (A105)", spec: "C≤0.35", actual: "C=0.29 ✓", pass: true },
    ],
    findings: [
      { severity: "MAJOR", text: "Channel head Ni content 0.38% — below spec minimum 0.40%" },
      { severity: "OK", text: "Shell, tubes, nozzles all within specification" },
    ],
    evidenceCapture: ["PMI_shell_XRF_001.jpg", "PMI_channel_XRF_002.jpg"],
    voiceNote: "PMI complete. Channel head nickel content marginally below specification at 0.38 percent.",
    iotSensors: [
      { sensor: "XRF Analyzer", value: "Connected", status: "ok" },
      { sensor: "Temp Probe", value: "22.4°C", status: "ok" },
    ],
    cameraCapture: [
      { filename: "PMI_XRF_shell.jpg", type: "photo" },
      { filename: "PMI_XRF_channel.jpg", type: "photo" },
    ],
  },
  {
    stepId: "3",
    title: "Dimensional Inspection — Shell & Nozzle Orientation",
    aiGuidance: "Measure shell OD at 3 cross-sections (ends + mid), overall length, nozzle projection, and flange face flatness. Tolerance per ASME Sec VIII Div 1.",
    measurements: [
      { param: "Shell OD (top)", spec: "1200 ±3mm", actual: "1201.2mm ✓", pass: true },
      { param: "Shell OD (mid)", spec: "1200 ±3mm", actual: "1199.5mm ✓", pass: true },
      { param: "Shell OD (btm)", spec: "1200 ±3mm", actual: "1200.8mm ✓", pass: true },
      { param: "Overall Length", spec: "6400 ±5mm", actual: "6403mm ✓", pass: true },
      { param: "Nozzle N1 Proj.", spec: "250 ±2mm", actual: "252.5mm", pass: false },
      { param: "Flange Flatness", spec: "≤0.25mm", actual: "0.18mm ✓", pass: true },
    ],
    findings: [
      { severity: "OK", text: "Shell dimensions within tolerance — roundness acceptable" },
      { severity: "MAJOR", text: "Nozzle N1 projection 252.5mm exceeds +2mm tolerance" },
    ],
    evidenceCapture: ["dim_shell_OD_laser.jpg", "dim_nozzle_projection.jpg", "dim_flange_flatness.jpg"],
    voiceNote: "Dimensional check done. Nozzle N1 projection out of tolerance by half a millimeter.",
    iotSensors: [
      { sensor: "Laser Scanner", value: "Active", status: "ok" },
      { sensor: "Digital Caliper", value: "Synced", status: "ok" },
      { sensor: "Inclinometer", value: "0.02°", status: "ok" },
    ],
    cameraCapture: [
      { filename: "DIM_shell_OD_laser_scan.jpg", type: "photo" },
      { filename: "DIM_nozzle_projection.mp4", type: "video" },
    ],
  },
  {
    stepId: "4",
    title: "Weld Visual Inspection — All Seam & Circumferential Welds",
    aiGuidance: "Inspect all longitudinal seam welds, circumferential welds, and nozzle-to-shell welds per GOST-34347-2017. Check reinforcement height, undercut, porosity, cracks.",
    measurements: [
      { param: "Long. Seam Reinforc.", spec: "≤3mm", actual: "4.2mm", pass: false },
      { param: "Circ. Weld Undercut", spec: "≤0.5mm", actual: "0.8mm", pass: false },
      { param: "Nozzle Weld Profile", spec: "Smooth blend", actual: "Irregular", pass: false },
      { param: "Weld Surface Cracks", spec: "None allowed", actual: "Crack found", pass: false },
      { param: "Weld Spatter", spec: "Removed", actual: "Present", pass: false },
    ],
    findings: [
      { severity: "CRITICAL", text: "Surface crack from weld toe — 40mm into HAZ, zero tolerance per GOST §5.2" },
      { severity: "CRITICAL", text: "Longitudinal crack in seam weld — 4mm visible, may extend deeper" },
      { severity: "MAJOR", text: "Underfilled weld: 0.8mm depth × 7mm — stress concentration risk" },
      { severity: "MAJOR", text: "Excessive reinforcement 4.2mm (max 3mm) — grinding required" },
      { severity: "MAJOR", text: "Rust contamination on saddle support — preservation failure" },
    ],
    evidenceCapture: ["weld_crack_HAZ_40mm.jpg", "weld_underfill_seam.jpg", "weld_long_crack.jpg", "rust_saddle.jpg"],
    voiceNote: "CRITICAL — Two surface cracks identified in weld zone. Longitudinal crack in seam weld requires immediate RT confirmation. Hydrostatic test must be blocked.",
    iotSensors: [
      { sensor: "Weld Gauge", value: "4.2mm reinf.", status: "crit" },
      { sensor: "Magnetic Particle", value: "Indication+", status: "crit" },
      { sensor: "Surface Temp", value: "18.6°C", status: "ok" },
    ],
    cameraCapture: [
      { filename: "WELD_crack_HAZ_closeup.jpg", type: "photo" },
      { filename: "WELD_long_crack_seam.jpg", type: "photo" },
      { filename: "WELD_thermal_scan.jpg", type: "thermal" },
      { filename: "WELD_inspection_video.mp4", type: "video" },
    ],
  },
  {
    stepId: "5",
    title: "NDT — Radiography (RT) on Seam Welds",
    aiGuidance: "Review 100% RT films for longitudinal and circumferential seams. AI digitization of RT films — check for slag, porosity, lack of fusion, cracks per ASME Sec V.",
    measurements: [
      { param: "Long. Seam RT", spec: "Accept per ASME V", actual: "Linear indication", pass: false },
      { param: "Circ. Weld #1 RT", spec: "Accept", actual: "Slag 12mm", pass: false },
      { param: "Circ. Weld #2 RT", spec: "Accept", actual: "Acceptable ✓", pass: true },
      { param: "Circ. Weld #3 RT", spec: "Accept", actual: "Porosity cluster", pass: false },
    ],
    findings: [
      { severity: "CRITICAL", text: "RT confirms linear indication (crack) in long. seam — matches visual" },
      { severity: "MAJOR", text: "Slag inclusion 12mm in circ. weld #1 — exceeds ASME acceptance" },
      { severity: "MAJOR", text: "Porosity cluster in circ. weld #3 — requires repair + re-RT" },
    ],
    evidenceCapture: ["RT_film_long_seam_digitized.jpg", "RT_film_circ1_slag.jpg"],
    voiceNote: "NDT radiography confirms crack in longitudinal seam. Slag and porosity in circumferential welds. Three out of four weld zones rejected.",
    iotSensors: [
      { sensor: "RT Source", value: "Ir-192 Active", status: "warn" },
      { sensor: "Dosimeter", value: "0.12 mSv/h", status: "ok" },
      { sensor: "Film Densitometer", value: "D=2.4", status: "ok" },
    ],
    cameraCapture: [
      { filename: "RT_film_digitized_AI.jpg", type: "photo" },
      { filename: "RT_setup_photo.jpg", type: "photo" },
    ],
  },
  {
    stepId: "8",
    title: "Hydrostatic Pressure Test — 1.5× Design Pressure",
    aiGuidance: "Test pressure: 42.0 barg (1.5 × 28.0 barg design). Hold 30 min. Monitor all gauges, check for leaks at welds, flanges, nozzle connections. HOLD POINT — do not proceed until weld repairs complete.",
    measurements: [
      { param: "Test Pressure", spec: "42.0 barg", actual: "— BLOCKED —", pass: false },
      { param: "Hold Time", spec: "30 min", actual: "— BLOCKED —", pass: false },
      { param: "Ambient Temp", spec: ">5°C", actual: "12°C ✓", pass: true },
      { param: "Test Medium", spec: "Clean water", actual: "Available ✓", pass: true },
    ],
    findings: [
      { severity: "CRITICAL", text: "HYDRO TEST BLOCKED — 5 weld defects must be repaired before pressurization" },
      { severity: "CRITICAL", text: "Crack in pressure boundary — catastrophic failure risk if tested as-is" },
    ],
    evidenceCapture: [],
    voiceNote: "HYDRO TEST BLOCKED. Five weld defects in pressure boundary prevent safe pressurization. Catastrophic failure risk. All repairs must be completed and re-inspected.",
    iotSensors: [
      { sensor: "Pressure Gauge A", value: "0.0 barg", status: "ok" },
      { sensor: "Pressure Gauge B", value: "0.0 barg", status: "ok" },
      { sensor: "Ambient Temp", value: "12.1°C", status: "ok" },
      { sensor: "Water Fill Level", value: "Standby", status: "warn" },
    ],
    cameraCapture: [],
  },
  {
    stepId: "9",
    title: "Coating / Painting Inspection",
    aiGuidance: "Verify surface preparation to Sa 2.5 (SSPC-SP10). Measure DFT at 5 spots per m². Check primer, intermediate, and topcoat adhesion. Verify RAL color match.",
    measurements: [
      { param: "Surface Prep.", spec: "Sa 2.5", actual: "Sa 2.0", pass: false },
      { param: "DFT Primer", spec: "75 ±15 μm", actual: "62μm", pass: false },
      { param: "DFT Intermediate", spec: "100 ±20 μm", actual: "95μm ✓", pass: true },
      { param: "DFT Topcoat", spec: "75 ±15 μm", actual: "78μm ✓", pass: true },
      { param: "Total DFT", spec: "250 ±25 μm", actual: "235μm", pass: false },
      { param: "Holiday Test", spec: "No pinholes", actual: "3 holidays found", pass: false },
    ],
    findings: [
      { severity: "MAJOR", text: "Surface preparation Sa 2.0 — does not meet Sa 2.5 minimum" },
      { severity: "MAJOR", text: "Primer DFT 62μm below 60μm minimum — adhesion risk" },
      { severity: "MAJOR", text: "3 holidays (pinholes) detected — corrosion initiation points" },
    ],
    evidenceCapture: ["coating_DFT_gauge.jpg", "holiday_detector_results.jpg"],
    voiceNote: "Coating inspection: surface preparation only Sa 2.0, below Sa 2.5 requirement. Primer thickness insufficient. Three pinholes detected by holiday test.",
    iotSensors: [
      { sensor: "DFT Gauge", value: "235μm avg", status: "warn" },
      { sensor: "Holiday Detector", value: "3 found", status: "crit" },
      { sensor: "Humidity", value: "62% RH", status: "ok" },
      { sensor: "Surface Temp", value: "19.2°C", status: "ok" },
    ],
    cameraCapture: [
      { filename: "COAT_DFT_measurement.jpg", type: "photo" },
      { filename: "COAT_holiday_pinhole.jpg", type: "photo" },
      { filename: "COAT_surface_prep.mp4", type: "video" },
    ],
  },
];

const LNGAtlasDemo = () => {
  const [paused, setPaused] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [step, setStep] = useState(0);
  const [activeITPIndex, setActiveITPIndex] = useState(-1);
  const [itpStatuses, setItpStatuses] = useState<ITPStep["status"][]>(itpSteps.map(() => "pending"));
  const [voiceActive, setVoiceActive] = useState(false);
  const [activeVoiceText, setActiveVoiceText] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [iotConnected, setIotConnected] = useState(0);

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // Scroll middle panel to bottom on step change — ONLY scroll the container, not the page
  useEffect(() => {
    const el = middleScrollRef.current;
    if (el) setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }), 200);
  }, [step]);

  // Scroll left panel to active ITP — use scrollTo on container to prevent page jump
  useEffect(() => {
    const el = leftScrollRef.current;
    if (el && activeITPIndex >= 0) {
      const items = el.querySelectorAll("[data-itp-item]");
      const target = items[activeITPIndex] as HTMLElement | undefined;
      if (target) {
        const containerRect = el.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scrollOffset = targetRect.top - containerRect.top - containerRect.height / 2 + targetRect.height / 2;
        el.scrollBy({ top: scrollOffset, behavior: "smooth" });
      }
    }
  }, [activeITPIndex]);

  // Animation timeline — pure inspection, no claims
  useEffect(() => {
    setStep(0);
    setActiveITPIndex(-1);
    setItpStatuses(itpSteps.map(() => "pending"));
    setVoiceActive(false);
    setActiveVoiceText("");
    setCameraActive(false);
    setIotConnected(0);
    const timers: number[] = [];
    const t = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(() => {
        if (!pausedRef.current) fn();
        else {
          const retry = () => { if (!pausedRef.current) fn(); else window.setTimeout(retry, 500); };
          window.setTimeout(retry, 500);
        }
      }, delay));
    };

    const setITP = (index: number, status: ITPStep["status"]) => {
      setItpStatuses(prev => { const n = [...prev]; n[index] = status; return n; });
    };

    // Step 1: Doc Review
    t(600, () => { setStep(1); setActiveITPIndex(0); setITP(0, "active"); setCameraActive(true); });
    t(2000, () => { setStep(2); setITP(0, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[0].voiceNote || ""); });
    t(3000, () => { setVoiceActive(false); });

    // Step 2: PMI
    t(3500, () => { setStep(3); setActiveITPIndex(1); setITP(1, "active"); setIotConnected(2); setCameraActive(true); });
    t(5000, () => { setStep(4); setITP(1, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[1].voiceNote || ""); });
    t(6000, () => { setVoiceActive(false); });

    // Step 3: Dimensional
    t(6500, () => { setStep(5); setActiveITPIndex(2); setITP(2, "active"); setIotConnected(3); setCameraActive(true); });
    t(8000, () => { setStep(6); setITP(2, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[2].voiceNote || ""); });
    t(9000, () => { setVoiceActive(false); });

    // Step 4: Weld Visual — THE MAIN EVENT
    t(9500, () => { setStep(7); setActiveITPIndex(3); setITP(3, "active"); setIotConnected(3); setCameraActive(true); });
    t(10500, () => setStep(8));
    t(12000, () => { setStep(9); setITP(3, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[3].voiceNote || ""); });
    t(13200, () => { setVoiceActive(false); });

    // Step 5: NDT RT
    t(13500, () => { setStep(10); setActiveITPIndex(4); setITP(4, "active"); setIotConnected(3); setCameraActive(true); });
    t(15000, () => { setStep(11); setITP(4, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[4].voiceNote || ""); });
    t(16000, () => { setVoiceActive(false); });

    // Skip UT/PWHT (pass for demo brevity)
    t(16200, () => { setITP(5, "pass"); setITP(6, "pass"); });

    // Step 6: Hydro BLOCKED
    t(16500, () => { setStep(12); setActiveITPIndex(7); setITP(7, "active"); setIotConnected(4); });
    t(18000, () => { setStep(13); setITP(7, "fail"); setVoiceActive(true); setActiveVoiceText(inspectionDetails[5].voiceNote || ""); });
    t(19200, () => { setVoiceActive(false); });

    // Step 7: Coating
    t(19500, () => { setStep(14); setActiveITPIndex(8); setITP(8, "active"); setIotConnected(4); setCameraActive(true); });
    t(21000, () => { setStep(15); setITP(8, "fail"); setCameraActive(false); setVoiceActive(true); setActiveVoiceText(inspectionDetails[6].voiceNote || ""); });
    t(22000, () => { setVoiceActive(false); });

    // Skip preservation (pass for demo)
    t(22200, () => { setITP(9, "pass"); });

    // Final Acceptance BLOCKED
    t(22500, () => { setStep(16); setActiveITPIndex(10); setITP(10, "fail"); });

    // AI Summary
    t(24000, () => setStep(17));

    // Restart
    t(30000, () => setLoopKey(k => k + 1));

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const togglePause = useCallback(() => setPaused(p => !p), []);

  // Map step to which inspection detail to show
  const getVisibleDetails = (): InspectionDetail[] => {
    const visible: InspectionDetail[] = [];
    if (step >= 2) visible.push(inspectionDetails[0]);
    if (step >= 4) visible.push(inspectionDetails[1]);
    if (step >= 6) visible.push(inspectionDetails[2]);
    if (step >= 9) visible.push(inspectionDetails[3]);
    if (step >= 11) visible.push(inspectionDetails[4]);
    if (step >= 13) visible.push(inspectionDetails[5]);
    if (step >= 15) visible.push(inspectionDetails[6]);
    return visible;
  };

  const totalFindings = getVisibleDetails().reduce((sum, d) => sum + (d.findings?.filter(f => f.severity !== "OK").length || 0), 0);
  const criticalCount = getVisibleDetails().reduce((sum, d) => sum + (d.findings?.filter(f => f.severity === "CRITICAL").length || 0), 0);
  const totalEvidence = getVisibleDetails().reduce((sum, d) => sum + (d.evidenceCapture?.length || 0) + (d.cameraCapture?.length || 0), 0);

  const TOTAL_DURATION = 30;

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6EA996] animate-pulse" />
            <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">AI Inspector Autopilot</span>
          </div>
          <span className="text-[13px] font-bold text-white tracking-wide hidden md:block">G1-22E05 · Deethanizer Condenser · Heat Exchanger Inspection</span>
          <div className="flex items-center gap-2">
            {/* Feature indicators */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded border transition-all ${cameraActive ? "border-[#6EA996]/40 bg-[#6EA996]/10" : "border-white/10 bg-white/5"}`}>
              <Camera className={`w-3 h-3 ${cameraActive ? "text-[#6EA996]" : "text-white/30"}`} />
              {cameraActive && <span className="text-[8px] font-bold text-[#6EA996] uppercase">REC</span>}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded border transition-all ${voiceActive ? "border-[#F5A623]/40 bg-[#F5A623]/10" : "border-white/10 bg-white/5"}`}>
              {voiceActive ? <Volume2 className="w-3 h-3 text-[#F5A623] animate-pulse" /> : <VolumeX className="w-3 h-3 text-white/30" />}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded border transition-all ${iotConnected > 0 ? "border-[#6EA996]/40 bg-[#6EA996]/10" : "border-white/10 bg-white/5"}`}>
              <Wifi className={`w-3 h-3 ${iotConnected > 0 ? "text-[#6EA996]" : "text-white/30"}`} />
              {iotConnected > 0 && <span className="text-[8px] font-bold text-[#6EA996]">{iotConnected}</span>}
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded border border-white/10 bg-white/5">
              <FileImage className="w-3 h-3 text-white/40" />
              <span className="text-[8px] font-bold text-white/40">{totalEvidence}</span>
            </div>

            <button
              onClick={togglePause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors ml-1"
            >
              {paused ? <Play className="w-3 h-3 text-[#6EA996]" /> : <Pause className="w-3 h-3 text-white/50" />}
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{paused ? "Play" : "Pause"}</span>
            </button>
            <div className="w-24 h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                key={loopKey}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: TOTAL_DURATION, ease: "linear" }}
                className="h-full bg-[#6EA996] rounded-full"
                style={paused ? { animationPlayState: "paused" } : {}}
              />
            </div>
          </div>
        </div>

        {/* Voice Output Bar */}
        <AnimatePresence>
          {voiceActive && activeVoiceText && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-[#F5A623]/20 bg-[#F5A623]/5 overflow-hidden"
            >
              <div className="px-4 md:px-8 py-2 flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-[#F5A623] animate-pulse" />
                  <span className="text-[9px] font-bold text-[#F5A623] uppercase tracking-wider">Voice Output</span>
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed truncate">{activeVoiceText}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main 3-Column */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — ITP Checklist */}
          <div className="flex-[25] border-r border-white/[0.03] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.05]">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">ITP Checklist</span>
              <div className="text-[10px] text-white/25 mt-1">Inspection & Test Plan — FAT</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] px-1.5 py-0.5 bg-[#AE3D3D]/20 text-[#AE3D3D] font-bold rounded">H = Hold</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#F5A623]/20 text-[#F5A623] font-bold rounded">W = Witness</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-white/40 font-bold rounded">R = Review</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 relative" ref={leftScrollRef} style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={leftScrollRef} />
              {itpSteps.map((itp, i) => {
                const status = itpStatuses[i];
                const isActive = i === activeITPIndex;
                return (
                  <motion.div
                    key={itp.id}
                    data-itp-item
                    initial={{ opacity: 0.4 }}
                    animate={{
                      opacity: status !== "pending" ? 1 : 0.4,
                      scale: isActive ? 1.02 : 1,
                    }}
                    className={`rounded-lg px-3 py-2.5 transition-colors ${
                      isActive ? "bg-[#6EA996]/10 border border-[#6EA996]/30" :
                      status === "fail" ? "bg-[#AE3D3D]/5 border border-[#AE3D3D]/15" :
                      status === "pass" ? "bg-[#6EA996]/5 border border-[#6EA996]/15" :
                      "bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          itp.type === "H" ? "bg-[#AE3D3D]/20 text-[#AE3D3D]" :
                          itp.type === "W" ? "bg-[#F5A623]/20 text-[#F5A623]" :
                          "bg-white/10 text-white/40"
                        }`}>{itp.type}</span>
                        <span className="text-[9px] font-mono text-white/30">{itp.code}</span>
                      </div>
                      <StatusBadge status={status} />
                    </div>
                    <div className="text-[11px] font-semibold text-white">{itp.name}</div>
                    <div className="text-[9px] text-white/30 mt-0.5">{itp.sub}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* ITP Summary */}
            <div className="px-4 py-3 border-t border-white/[0.05]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Result</span>
                <span className={`text-[12px] font-bold ${step >= 16 ? "text-[#AE3D3D]" : "text-white/30"}`}>
                  {step >= 16 ? "REJECTED" : "In Progress..."}
                </span>
              </div>
              <div className="flex gap-3 text-[10px]">
                <span className="text-[#AE3D3D]">{itpStatuses.filter(s => s === "fail").length} Failed</span>
                <span className="text-[#6EA996]">{itpStatuses.filter(s => s === "pass").length} Passed</span>
                <span className="text-white/30">{itpStatuses.filter(s => s === "pending" || s === "active").length} Pending</span>
              </div>
            </div>
          </div>

          {/* MIDDLE — AI Inspector Guidance */}
          <div className="flex-[45] border-r border-white/[0.03] flex flex-col overflow-hidden">
            <div className="px-6 py-3 border-b border-white/[0.05]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">AI Inspector View</span>
                <div className="flex items-center gap-3">
                  {totalFindings > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-1 px-2 py-1 border border-[#AE3D3D]/30 rounded">
                      <span className="text-[9px] text-[#AE3D3D] font-bold">{totalFindings} NCRs</span>
                      {criticalCount > 0 && <span className="text-[9px] text-[#AE3D3D] font-bold">({criticalCount} CRIT)</span>}
                    </motion.div>
                  )}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-1 px-2 py-1 border border-[#6EA996]/40 rounded">
                    <div className="w-1.5 h-1.5 bg-[#6EA996] rounded-full animate-pulse" />
                    <span className="text-[9px] text-[#6EA996] font-bold uppercase">Autopilot</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <div ref={middleScrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3 relative" style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={middleScrollRef} />

              {/* Welcome */}
              {step >= 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#6EA996]/8 border border-[#6EA996]/20 rounded-lg p-4">
                  <div className="text-[11px] text-[#6EA996] font-bold mb-1">Atlas AI — Inspector Autopilot Activated</div>
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    Beginning FAT inspection of Deethanizer Condenser G1-22E05. Design: 28 barg / 180°C. Material: SA-516 Gr.70 shell, SA-179 tubes. Following ITP with 7 hold points and 3 witness points. Camera, IoT sensors, and voice output ready.
                  </p>
                </motion.div>
              )}

              {/* Inspection Step Cards */}
              <AnimatePresence>
                {getVisibleDetails().map((detail) => (
                  <motion.div
                    key={detail.stepId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden"
                  >
                    {/* Step header */}
                    <div className="px-4 py-2.5 border-b border-white/[0.05] flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white">{detail.title}</span>
                    </div>

                    {/* AI Guidance */}
                    <div className="px-4 py-2 bg-[#6EA996]/5 border-b border-white/[0.05]">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] text-[#6EA996] font-bold shrink-0 mt-0.5">AI:</span>
                        <p className="text-[10px] text-white/50 leading-relaxed">{detail.aiGuidance}</p>
                      </div>
                    </div>

                    {/* Measurements */}
                    {detail.measurements && (
                      <div className="px-4 py-2">
                        <div className="text-[9px] text-white/30 uppercase tracking-wider font-bold mb-1.5">Measurements</div>
                        <div className="space-y-1">
                          {detail.measurements.map((m, j) => (
                            <motion.div key={j} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05 }}
                              className="flex items-center text-[10px] gap-1">
                              <span className="text-white/40 w-[35%] truncate">{m.param}</span>
                              <span className="text-white/25 w-[25%] truncate font-mono">{m.spec}</span>
                              <span className={`w-[25%] truncate font-mono font-semibold ${m.pass ? "text-[#6EA996]" : "text-[#AE3D3D]"}`}>{m.actual}</span>
                              <span className={`w-[15%] text-right font-bold ${m.pass ? "text-[#6EA996]" : "text-[#AE3D3D]"}`}>
                                {m.pass ? "✓" : "✗"}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Findings */}
                    {detail.findings && detail.findings.length > 0 && (
                      <div className="px-4 py-2 border-t border-white/[0.05]">
                        <div className="text-[9px] text-white/30 uppercase tracking-wider font-bold mb-1.5">Findings</div>
                        <div className="space-y-1">
                          {detail.findings.map((f, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <span className={`text-[8px] font-bold uppercase px-1 py-0.5 rounded mt-0.5 shrink-0 ${
                                f.severity === "CRITICAL" ? "bg-[#AE3D3D]/20 text-[#AE3D3D]" :
                                f.severity === "MAJOR" ? "bg-[#F5A623]/20 text-[#F5A623]" :
                                "bg-[#6EA996]/20 text-[#6EA996]"
                              }`}>{f.severity}</span>
                              <span className="text-[10px] text-white/50">{f.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Evidence + Camera Captures */}
                    {((detail.evidenceCapture && detail.evidenceCapture.length > 0) || (detail.cameraCapture && detail.cameraCapture.length > 0)) && (
                      <div className="px-4 py-2 border-t border-white/[0.05]">
                        <div className="text-[9px] text-white/30 uppercase tracking-wider font-bold mb-1.5">Evidence Captured</div>
                        <div className="flex flex-wrap gap-1">
                          {detail.evidenceCapture?.map((ev, j) => (
                            <span key={`ev-${j}`} className="text-[9px] px-2 py-1 bg-white/5 text-white/30 rounded font-mono flex items-center gap-1">
                              <FileImage className="w-2.5 h-2.5" /> {ev}
                            </span>
                          ))}
                          {detail.cameraCapture?.map((cam, j) => (
                            <span key={`cam-${j}`} className={`text-[9px] px-2 py-1 rounded font-mono flex items-center gap-1 ${
                              cam.type === "thermal" ? "bg-[#F5A623]/10 text-[#F5A623]/60" :
                              cam.type === "video" ? "bg-[#6EA996]/10 text-[#6EA996]/60" :
                              "bg-white/5 text-white/30"
                            }`}>
                              <Camera className="w-2.5 h-2.5" />
                              {cam.filename}
                              {cam.type === "thermal" && <span className="text-[7px] uppercase">FLIR</span>}
                              {cam.type === "video" && <span className="text-[7px] uppercase">VID</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* IoT Sensors */}
                    {detail.iotSensors && detail.iotSensors.length > 0 && (
                      <div className="px-4 py-2 border-t border-white/[0.05]">
                        <div className="text-[9px] text-white/30 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5" /> IoT Sensors
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {detail.iotSensors.map((s, j) => (
                            <div key={j} className={`flex items-center gap-1.5 text-[9px] px-2 py-1 rounded border ${
                              s.status === "crit" ? "border-[#AE3D3D]/30 bg-[#AE3D3D]/5" :
                              s.status === "warn" ? "border-[#F5A623]/30 bg-[#F5A623]/5" :
                              "border-white/10 bg-white/5"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                s.status === "crit" ? "bg-[#AE3D3D]" :
                                s.status === "warn" ? "bg-[#F5A623]" :
                                "bg-[#6EA996]"
                              }`} />
                              <span className="text-white/40">{s.sensor}</span>
                              <span className={`font-mono font-medium ${
                                s.status === "crit" ? "text-[#AE3D3D]" :
                                s.status === "warn" ? "text-[#F5A623]" :
                                "text-white/60"
                              }`}>{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Final Summary */}
              <AnimatePresence>
                {step >= 17 && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[#6EA996]/8 border border-[#6EA996]/20 rounded-lg p-4">
                    <div className="text-[12px] font-bold text-white mb-2">Inspection Complete — AI Summary</div>
                    <p className="text-[10px] text-white/45 leading-[1.6]">
                      11-point ITP executed. 7 hold points inspected. 5 critical and 12 major NCRs identified across welding, NDT, coating, and documentation. Hydrostatic test BLOCKED pending weld repairs. Equipment REJECTED — return to fabricator recommended. {totalEvidence} evidence files captured. All IoT sensor data logged. Voice transcripts archived.
                    </p>
                    <div className="flex gap-3 mt-3">
                      <div className="flex items-center gap-1 text-[9px] text-white/40">
                        <FileImage className="w-3 h-3" /> {totalEvidence} Evidence Files
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-white/40">
                        <Camera className="w-3 h-3" /> Camera Sessions
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-white/40">
                        <Wifi className="w-3 h-3" /> IoT Data Logged
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-white/40">
                        <Volume2 className="w-3 h-3" /> Voice Archived
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-6 py-3 border-t border-white/[0.05]">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 flex items-center">
                  <span className="text-[12px] text-white/25">Ask Atlas AI about this inspection...</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-[#6EA996] rounded-lg shrink-0">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Intelligence Panel */}
          <div className="flex-[30] flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.05]">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Intelligence</span>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative" ref={rightScrollRef} style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={rightScrollRef} />

              {/* Equipment Info */}
              <div className="bg-white/5 rounded-lg p-4">
                <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Equipment Data</span>
                <div className="mt-2 space-y-1.5">
                  {[
                    { label: "Type", value: "Shell & Tube HEX" },
                    { label: "Tag", value: "G1-22E05" },
                    { label: "Design P/T", value: "28 barg / 180°C" },
                    { label: "Shell Material", value: "SA-516 Gr.70" },
                    { label: "Tube Material", value: "SA-179" },
                    { label: "Code", value: "GOST-34347-2017" },
                    { label: "Fabricator", value: "Shanghai Bu Hau" },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between text-[10px]">
                      <span className="text-white/40">{d.label}</span>
                      <span className="text-white/70 font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IoT Connector Status */}
              {iotConnected > 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#6EA996]/8 border border-[#6EA996]/20 rounded-lg p-4">
                  <span className="text-[10px] text-[#6EA996] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" /> IoT Connectors Active
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {getVisibleDetails().slice(-1)[0]?.iotSensors?.map((s, j) => (
                      <div key={j} className="flex justify-between text-[10px]">
                        <span className="text-white/40 flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            s.status === "crit" ? "bg-[#AE3D3D] animate-pulse" :
                            s.status === "warn" ? "bg-[#F5A623]" :
                            "bg-[#6EA996]"
                          }`} />
                          {s.sensor}
                        </span>
                        <span className={`font-mono font-medium ${
                          s.status === "crit" ? "text-[#AE3D3D]" :
                          s.status === "warn" ? "text-[#F5A623]" :
                          "text-white/60"
                        }`}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Compliance Tracker */}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-[#AE3D3D] uppercase tracking-wider font-bold">Compliance Violations</span>
                  <div className="mt-2 space-y-2">
                    {step >= 2 && <ComplianceItem std="EN 10204 3.2" note="MTR grade 3.1 insufficient" />}
                    {step >= 4 && <ComplianceItem std="SA-350 LF2 Spec" note="Ni content below minimum" />}
                    {step >= 9 && <ComplianceItem std="GOST-34347 §5.2" note="Zero tolerance: cracks found" />}
                    {step >= 9 && <ComplianceItem std="GOST-34347 §6.3" note="Underfill exceeds limit" />}
                    {step >= 11 && <ComplianceItem std="ASME Section V" note="RT: linear indication + slag" />}
                    {step >= 15 && <ComplianceItem std="ISO 8501 / Sa 2.5" note="Surface prep Sa 2.0 only" />}
                  </div>
                </motion.div>
              )}

              {/* WPS Deviations */}
              {step >= 9 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-[#F5A623] uppercase tracking-wider font-bold">WPS Deviations Suspected</span>
                  <div className="mt-2 space-y-1.5">
                    {[
                      { param: "Preheat", spec: "150–200°C", actual: "<100°C" },
                      { param: "Interpass", spec: "<250°C", actual: ">300°C" },
                      { param: "Heat Input", spec: "1.0–1.5 kJ/mm", actual: ">2.0 kJ/mm" },
                      { param: "Travel Speed", spec: "15–20 cm/min", actual: "Too fast" },
                      { param: "Electrode", spec: "120°C oven", actual: "Ambient" },
                    ].map(d => (
                      <div key={d.param} className="flex items-center justify-between text-[10px]">
                        <span className="text-white/40">{d.param}</span>
                        <span className="text-[#6EA996] font-mono">{d.spec}</span>
                        <span className="text-[#AE3D3D] font-mono">{d.actual}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Evidence Summary */}
              {totalEvidence > 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <FileImage className="w-3 h-3" /> Evidence Chain
                  </span>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Total Files</span>
                      <span className="text-white font-bold">{totalEvidence}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Photos</span>
                      <span className="text-white font-bold">{getVisibleDetails().reduce((sum, d) => sum + (d.cameraCapture?.filter(c => c.type === "photo").length || 0), 0)}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Videos</span>
                      <span className="text-white font-bold">{getVisibleDetails().reduce((sum, d) => sum + (d.cameraCapture?.filter(c => c.type === "video").length || 0), 0)}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Thermal</span>
                      <span className="text-white font-bold">{getVisibleDetails().reduce((sum, d) => sum + (d.cameraCapture?.filter(c => c.type === "thermal").length || 0), 0)}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Documents</span>
                      <span className="text-white font-bold">{getVisibleDetails().reduce((sum, d) => sum + (d.evidenceCapture?.length || 0), 0)}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Vendor Rating */}
              {step >= 16 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Vendor Rating</span>
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-white/40">Shanghai Bu Hau Tech.</span>
                      <span className="text-[#AE3D3D] font-bold">2.1 / 10</span>
                    </div>
                    <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "21%" }} transition={{ duration: 1 }}
                        className="h-full rounded-full bg-[#AE3D3D]" />
                    </div>
                    <div className="text-[10px] text-[#AE3D3D] font-semibold mt-1">⚠ Recommended: Probation / Debarment</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ── */
const StatusBadge = ({ status }: { status: ITPStep["status"] }) => {
  if (status === "active") return (
    <span className="flex items-center gap-1 text-[9px] font-bold text-[#6EA996]">
      <div className="w-1.5 h-1.5 bg-[#6EA996] rounded-full animate-pulse" /> INSPECTING
    </span>
  );
  if (status === "pass") return <span className="text-[9px] font-bold text-[#6EA996]">✓ PASS</span>;
  if (status === "fail") return <span className="text-[9px] font-bold text-[#AE3D3D]">✗ FAIL</span>;
  return <span className="text-[9px] font-bold text-white/20">—</span>;
};

const ComplianceItem = ({ std, note }: { std: string; note: string }) => (
  <div className="flex items-start gap-2">
    <div className="w-1.5 h-1.5 bg-[#AE3D3D] mt-1.5 flex-shrink-0" />
    <div>
      <div className="text-[10px] text-white/60 font-medium">{std}</div>
      <div className="text-[9px] text-white/30">{note}</div>
    </div>
  </div>
);

export default LNGAtlasDemo;
