import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Pause, Play, Camera, Wifi, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    const obs = new MutationObserver(check);
    obs.observe(el, { childList: true, subtree: true });
    return () => { el.removeEventListener("scroll", check); obs.disconnect(); };
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
  evidenceFiles?: { name: string; type: "img" | "doc" | "thermal" | "video"; status: "verified" | "review" }[];
  voiceNote?: string;
  iotSensors?: { sensor: string; value: string; status: "ok" | "warn" | "crit" }[];
}

const inspectionDetails: InspectionDetail[] = [
  {
    stepId: "1",
    title: "Document Review — MTRs & Welding Records",
    aiGuidance: "Open the MTR package first. Check each mill cert against the MTO line items — match heat numbers to the PMI plan. Look for EN 10204 certification level — you need 3.2 with third-party witness signature. Then pull the WPS register and verify every procedure has a backing PQR. Flag any gaps before moving to physical inspection.",
    measurements: [
      { param: "Mill Certs (MTR)", spec: "EN 10204 3.2", actual: "3.1 only", pass: false },
      { param: "WPS Count", spec: "6 required", actual: "4 submitted", pass: false },
      { param: "PQR Records", spec: "All WPS backed", actual: "2 missing PQR", pass: false },
      { param: "Drawing Rev.", spec: "Rev. 05", actual: "Rev. 05 ✓", pass: true },
    ],
    findings: [
      { severity: "MAJOR", text: "MTR grade 3.1 instead of 3.2 — request supplier to provide upgraded certification" },
      { severity: "MAJOR", text: "2 WPS without backing PQR — ask welding engineer to locate qualification records" },
    ],
    evidenceFiles: [
      { name: "MTR_package_scan.pdf", type: "doc", status: "verified" },
      { name: "WPS_register.jpg", type: "img", status: "review" },
    ],
    voiceNote: "Start with the MTR package. You're looking for 3.2 certs with witness stamps. Then cross-reference the WPS register — every procedure needs a PQR behind it.",
  },
  {
    stepId: "2",
    title: "Material Verification — Positive Material Identification",
    aiGuidance: "Connect the XRF analyzer and calibrate against the reference coupon. Take readings on shell plates at three locations minimum. Then move to the channel head — focus on Ni content, the spec calls for ≥0.40%. Scan each nozzle forging. Compare every reading against the MTR values you just reviewed.",
    measurements: [
      { param: "Shell (SA-516 Gr.70)", spec: "C≤0.27, Mn≤1.20", actual: "C=0.22, Mn=1.05", pass: true },
      { param: "Tubes (SA-179)", spec: "C≤0.18", actual: "C=0.14 ✓", pass: true },
      { param: "Channel (SA-350 LF2)", spec: "Ni≥0.40", actual: "Ni=0.38", pass: false },
      { param: "Nozzle N1 (A105)", spec: "C≤0.35", actual: "C=0.29 ✓", pass: true },
    ],
    findings: [
      { severity: "MAJOR", text: "Channel head Ni at 0.38% — take two more readings at different spots to confirm. If consistent, escalate to materials engineer" },
      { severity: "OK", text: "Shell, tubes, nozzles within specification — proceed to next checkpoint" },
    ],
    evidenceFiles: [
      { name: "PMI_shell_XRF_001.jpg", type: "img", status: "verified" },
      { name: "PMI_channel_XRF_002.jpg", type: "img", status: "verified" },
    ],
    voiceNote: "XRF is connected. Start with the shell plates — three spots each. Then the channel head, watch the nickel level closely. Photograph each reading.",
    iotSensors: [
      { sensor: "XRF Analyzer", value: "Connected", status: "ok" },
      { sensor: "Temp Probe", value: "22.4°C", status: "ok" },
    ],
  },
  {
    stepId: "3",
    title: "Dimensional Inspection — Shell & Nozzle Orientation",
    aiGuidance: "Set up the laser scanner at the shell center. Take OD readings at three cross-sections: both ends and mid-span. Measure overall length between tubesheet faces. For nozzle N1, measure projection from shell OD to flange face — the drawing calls for 250 ±2mm. Check flange face flatness with a straightedge and feeler gauge.",
    measurements: [
      { param: "Shell OD (top)", spec: "1200 ±3mm", actual: "1201.2mm ✓", pass: true },
      { param: "Shell OD (mid)", spec: "1200 ±3mm", actual: "1199.5mm ✓", pass: true },
      { param: "Overall Length", spec: "6400 ±5mm", actual: "6403mm ✓", pass: true },
      { param: "Nozzle N1 Proj.", spec: "250 ±2mm", actual: "252.5mm", pass: false },
      { param: "Flange Flatness", spec: "≤0.25mm", actual: "0.18mm ✓", pass: true },
    ],
    findings: [
      { severity: "OK", text: "Shell dimensions within tolerance — note the readings and move on" },
      { severity: "MAJOR", text: "Nozzle N1 projection reads 252.5mm — re-measure to confirm, check from the opposite side as well" },
    ],
    evidenceFiles: [
      { name: "dim_shell_laser.jpg", type: "img", status: "verified" },
      { name: "dim_nozzle_proj.mp4", type: "video", status: "verified" },
      { name: "dim_flange_flat.jpg", type: "img", status: "verified" },
    ],
    voiceNote: "Laser scanner is set. Measure OD at both ends and midpoint first. Then go to Nozzle N1 and verify the projection distance carefully.",
    iotSensors: [
      { sensor: "Laser Scanner", value: "Active", status: "ok" },
      { sensor: "Digital Caliper", value: "Synced", status: "ok" },
      { sensor: "Inclinometer", value: "0.02°", status: "ok" },
    ],
  },
  {
    stepId: "4",
    title: "Weld Visual Inspection — Seam & Circumferential",
    aiGuidance: "Start at the top longitudinal seam. Use a weld gauge to measure reinforcement height — you're looking for ≤3mm per GOST. Run your fingers along the toe line, feel for undercut. Move to each circumferential weld systematically. At any crack indication, stop — photograph it, mark it with paint stick, and call for MPI confirmation before continuing.",
    measurements: [
      { param: "Long. Seam Reinforc.", spec: "≤3mm", actual: "4.2mm", pass: false },
      { param: "Circ. Weld Undercut", spec: "≤0.5mm", actual: "0.8mm", pass: false },
      { param: "Weld Surface Cracks", spec: "None allowed", actual: "Indication found", pass: false },
      { param: "Weld Spatter", spec: "Removed", actual: "Present", pass: false },
    ],
    findings: [
      { severity: "CRITICAL", text: "Possible crack indication at weld toe — do NOT grind. Mark location, request MPI to confirm extent and depth" },
      { severity: "CRITICAL", text: "Linear indication on longitudinal seam — mark both ends, measure visible length, request RT of this zone" },
      { severity: "MAJOR", text: "Undercut 0.8mm at circumferential weld — measure depth at three points along the length" },
      { severity: "MAJOR", text: "Reinforcement 4.2mm exceeds 3mm limit — note location for potential grinding" },
    ],
    evidenceFiles: [
      { name: "weld_crack_HAZ.jpg", type: "img", status: "verified" },
      { name: "weld_long_crack.jpg", type: "img", status: "verified" },
      { name: "weld_thermal_scan.jpg", type: "thermal", status: "verified" },
      { name: "weld_inspection.mp4", type: "video", status: "verified" },
    ],
    voiceNote: "Pause here. There's a possible crack indication at the weld toe — don't touch it. Mark it with a paint stick and photograph from two angles. We need MPI before going further.",
    iotSensors: [
      { sensor: "Weld Gauge", value: "4.2mm", status: "crit" },
      { sensor: "Magnetic Particle", value: "Indication+", status: "crit" },
      { sensor: "Surface Temp", value: "18.6°C", status: "ok" },
    ],
  },
  {
    stepId: "5",
    title: "NDT — Radiography (RT) on Seam Welds",
    aiGuidance: "Review the digitized RT films on screen. Start with the longitudinal seam — look for linear indications, they'll appear as dark lines along the weld axis. On circumferential welds, check for rounded indications (porosity) and irregular shapes (slag). Compare each film against the acceptance criteria in ASME Sec V, Table T-276. If you see anything borderline, flag it for Level III review.",
    measurements: [
      { param: "Long. Seam RT", spec: "Accept per ASME V", actual: "Linear indication", pass: false },
      { param: "Circ. Weld #1 RT", spec: "Accept", actual: "Slag 12mm", pass: false },
      { param: "Circ. Weld #2 RT", spec: "Accept", actual: "Acceptable ✓", pass: true },
      { param: "Circ. Weld #3 RT", spec: "Accept", actual: "Porosity cluster", pass: false },
    ],
    findings: [
      { severity: "CRITICAL", text: "Linear indication on long. seam RT film — correlates with visual finding. Request TOFD scan for depth sizing" },
      { severity: "MAJOR", text: "Slag inclusion 12mm on circ. weld #1 — exceeds acceptance. Mark for excavation and re-weld" },
      { severity: "MAJOR", text: "Porosity cluster on circ. weld #3 — measure aggregate area against Table T-276 limits" },
    ],
    evidenceFiles: [
      { name: "RT_film_digitized.jpg", type: "img", status: "verified" },
      { name: "RT_circ1_slag.jpg", type: "img", status: "verified" },
    ],
    voiceNote: "Pull up the RT films now. Focus on the longitudinal seam first — you're looking for any linear dark lines. Then check each circumferential weld zone by zone.",
    iotSensors: [
      { sensor: "RT Source", value: "Ir-192", status: "warn" },
      { sensor: "Dosimeter", value: "0.12 mSv/h", status: "ok" },
    ],
  },
  {
    stepId: "8",
    title: "Hydrostatic Pressure Test — ON HOLD",
    aiGuidance: "Do not pressurize. Multiple weld indications are still open from previous checkpoints. Before this test can proceed, confirm: all weld repairs are complete, repair welds have passed RT re-examination, and the welding engineer has signed off. Once cleared, fill with clean water, vent all high points, and pressurize slowly to 42.0 barg. Hold for 30 minutes and walk the vessel checking for leaks.",
    measurements: [
      { param: "Test Pressure", spec: "42.0 barg", actual: "— ON HOLD —", pass: false },
      { param: "Hold Time", spec: "30 min", actual: "— ON HOLD —", pass: false },
      { param: "Ambient Temp", spec: ">5°C", actual: "12°C ✓", pass: true },
    ],
    findings: [
      { severity: "CRITICAL", text: "Hydro test cannot proceed — open weld repair items must be closed first. Verify with welding engineer." },
      { severity: "CRITICAL", text: "Pressure boundary integrity not yet confirmed — do not fill or pressurize" },
    ],
    evidenceFiles: [],
    voiceNote: "This test is on hold. Do not fill or pressurize until all weld repairs are confirmed complete and re-examined. Check back with the welding engineer.",
    iotSensors: [
      { sensor: "Pressure A", value: "0.0 barg", status: "ok" },
      { sensor: "Pressure B", value: "0.0 barg", status: "ok" },
      { sensor: "Water Fill", value: "Standby", status: "warn" },
    ],
  },
  {
    stepId: "9",
    title: "Coating / Painting Inspection",
    aiGuidance: "Check the surface preparation grade first — compare against the Sa 2.5 reference panel visually. If it looks lighter or has visible mill scale remnants, it's likely under-prepared. Next, take DFT readings in a grid pattern: 5 spots per square meter. Use the holiday detector at the specified voltage for the coating system. Mark any pinhole locations with chalk.",
    measurements: [
      { param: "Surface Prep.", spec: "Sa 2.5", actual: "Sa 2.0", pass: false },
      { param: "DFT Primer", spec: "75 ±15 μm", actual: "62μm", pass: false },
      { param: "Total DFT", spec: "250 ±25 μm", actual: "235μm", pass: false },
      { param: "Holiday Test", spec: "No pinholes", actual: "3 holidays", pass: false },
    ],
    findings: [
      { severity: "MAJOR", text: "Surface prep looks under-blasted — compare again with reference panel and photograph side-by-side" },
      { severity: "MAJOR", text: "3 pinhole locations detected — mark each with chalk, photograph, and note positions on the coating map" },
    ],
    evidenceFiles: [
      { name: "coating_DFT.jpg", type: "img", status: "verified" },
      { name: "holiday_test.jpg", type: "img", status: "verified" },
      { name: "surface_prep.mp4", type: "video", status: "review" },
    ],
    voiceNote: "Start with the blast comparison panel. Hold it next to the surface and photograph both. Then take DFT readings in a grid. Run the holiday detector last.",
    iotSensors: [
      { sensor: "DFT Gauge", value: "235μm", status: "warn" },
      { sensor: "Holiday Det.", value: "3 found", status: "crit" },
      { sensor: "Humidity", value: "62% RH", status: "ok" },
    ],
  },
];

/* ── Voice alert parts for TTS ── */
const voiceAlertPartsEn = [
  "Attention inspector. Multiple weld indications require your review on the Deethanizer Condenser.",
  "Proceed to the longitudinal seam first. There is a possible crack indication at the weld toe — photograph it and request magnetic particle inspection to confirm.",
  "Hydrostatic test is on hold until weld repairs are verified. Check with the welding engineer before proceeding.",
];

const voiceAlertPartsRu = [
  "Внимание инспектор. Множественные дефекты сварки требуют вашей проверки на конденсаторе деэтанизатора.",
  "Перейдите сначала к продольному шву. Обнаружена возможная трещина у кромки шва — сфотографируйте и запросите магнитопорошковый контроль для подтверждения.",
  "Гидростатическое испытание приостановлено до проверки ремонта сварки. Свяжитесь с инженером-сварщиком перед продолжением.",
];

const LNGAtlasDemo = () => {
  const [paused, setPaused] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [step, setStep] = useState(0);
  const [activeITPIndex, setActiveITPIndex] = useState(-1);
  const [itpStatuses, setItpStatuses] = useState<ITPStep["status"][]>(itpSteps.map(() => "pending"));
  const [photoFlash, setPhotoFlash] = useState(false);

  // Voice / Copilot state
  const [copilotSpeaking, setCopilotSpeaking] = useState(false);
  const [copilotText, setCopilotText] = useState("");
  const [speakerPulsing, setSpeakerPulsing] = useState(false);
  const { language } = useLanguage();

  const leftScrollRef = useRef<HTMLDivElement>(null);
  const middleScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const copilotSpeakingRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { copilotSpeakingRef.current = copilotSpeaking; }, [copilotSpeaking]);

  // Scroll middle panel only
  useEffect(() => {
    const el = middleScrollRef.current;
    if (el) setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }), 200);
  }, [step]);

  // Scroll left panel — container only, no page jump
  useEffect(() => {
    const el = leftScrollRef.current;
    if (el && activeITPIndex >= 0) {
      const items = el.querySelectorAll("[data-itp-item]");
      const target = items[activeITPIndex] as HTMLElement | undefined;
      if (target) {
        const containerRect = el.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        el.scrollBy({ top: targetRect.top - containerRect.top - containerRect.height / 2 + targetRect.height / 2, behavior: "smooth" });
      }
    }
  }, [activeITPIndex]);

  // Pulse speaker when visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !copilotSpeaking) setSpeakerPulsing(true);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [copilotSpeaking]);
  useEffect(() => { if (copilotSpeaking) setSpeakerPulsing(false); }, [copilotSpeaking]);

  // TTS speak function
  const speakAlert = useCallback(() => {
    if (copilotSpeaking) {
      window.speechSynthesis.cancel();
      setCopilotSpeaking(false);
      setCopilotText("");
      return;
    }
    window.speechSynthesis.cancel();

    const parts = voiceAlertPartsEn;
    const langCode = "en-US";

    const voices = window.speechSynthesis.getVoices();
    const langVoices = voices.filter(v => v.lang.startsWith("en"));
    const preferred = langVoices.find(v => v.name.includes("Google")) || langVoices[0];

    setCopilotSpeaking(true);
    parts.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95; u.pitch = 1.0; u.lang = langCode;
      if (preferred) u.voice = preferred;
      u.onstart = () => setCopilotText(text);
      if (i === parts.length - 1) {
        u.onend = () => { setCopilotSpeaking(false); setCopilotText(""); };
        u.onerror = () => { setCopilotSpeaking(false); setCopilotText(""); };
      }
      window.speechSynthesis.speak(u);
    });
  }, [copilotSpeaking, language]);

  // Animation timeline
  useEffect(() => {
    setStep(0); setActiveITPIndex(-1);
    setItpStatuses(itpSteps.map(() => "pending"));
    setPhotoFlash(false);
    middleScrollRef.current?.scrollTo({ top: 0 });
    const timers: number[] = [];
    const t = (delay: number, fn: () => void) => {
      timers.push(window.setTimeout(() => {
        if (!pausedRef.current) fn();
        else { const retry = () => { if (!pausedRef.current) fn(); else window.setTimeout(retry, 500); }; window.setTimeout(retry, 500); }
      }, delay));
    };
    const setITP = (index: number, status: ITPStep["status"]) => {
      setItpStatuses(prev => { const n = [...prev]; n[index] = status; return n; });
    };

    // Doc Review
    t(600, () => { setStep(1); setActiveITPIndex(0); setITP(0, "active"); });
    t(1500, () => { setPhotoFlash(true); });
    t(1750, () => { setPhotoFlash(false); });
    t(2000, () => { setStep(2); setITP(0, "fail"); });

    // PMI
    t(3500, () => { setStep(3); setActiveITPIndex(1); setITP(1, "active"); });
    t(5000, () => { setStep(4); setITP(1, "fail"); });

    // Dimensional
    t(6500, () => { setStep(5); setActiveITPIndex(2); setITP(2, "active"); });
    t(8000, () => { setStep(6); setITP(2, "fail"); });

    // Weld Visual
    t(9500, () => { setStep(7); setActiveITPIndex(3); setITP(3, "active"); });
    t(10000, () => { setPhotoFlash(true); });
    t(10250, () => { setPhotoFlash(false); });
    t(10500, () => setStep(8));
    t(12000, () => { setStep(9); setITP(3, "fail"); });

    // NDT RT
    t(13500, () => { setStep(10); setActiveITPIndex(4); setITP(4, "active"); });
    t(15000, () => { setStep(11); setITP(4, "fail"); });

    // Skip UT/PWHT
    t(15500, () => { setITP(5, "pass"); setITP(6, "pass"); });

    // Hydro BLOCKED
    t(16500, () => { setStep(12); setActiveITPIndex(7); setITP(7, "active"); });
    t(18000, () => { setStep(13); setITP(7, "fail"); });

    // Coating
    t(19500, () => { setStep(14); setActiveITPIndex(8); setITP(8, "active"); });
    t(20000, () => { setPhotoFlash(true); });
    t(20250, () => { setPhotoFlash(false); });
    t(21000, () => { setStep(15); setITP(8, "fail"); });

    // Preservation pass
    t(21500, () => { setITP(9, "pass"); });

    // Final REJECTED
    t(22000, () => { setStep(16); setActiveITPIndex(10); setITP(10, "fail"); });

    // Summary
    t(24000, () => setStep(17));

    // Restart
    t(30000, () => {
      const wait = () => { if (copilotSpeakingRef.current) setTimeout(wait, 1000); else setLoopKey(k => k + 1); };
      wait();
    });

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const togglePause = useCallback(() => setPaused(p => !p), []);

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
  const allEvidence = getVisibleDetails().flatMap(d => d.evidenceFiles || []);

  const TOTAL_DURATION = 30;

  return (
    <div ref={sectionRef} className="w-full h-full overflow-hidden">
      <div className="w-full h-full bg-[hsl(220,18%,13%)] rounded-[16px] md:rounded-[20px] border border-white/10 flex flex-col overflow-hidden relative">

        {/* Camera Flash */}
        <AnimatePresence>
          {photoFlash && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-50" />
          )}
        </AnimatePresence>

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 md:px-8 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6EA996] animate-pulse" />
            <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">AI Inspector Autopilot</span>
          </div>
          <span className="text-[14px] font-bold text-white tracking-wide hidden md:block">G1-22E05 · Deethanizer Condenser</span>
          <div className="flex items-center gap-3">
            <button onClick={togglePause} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
              {paused ? <Play className="w-3 h-3 text-[#6EA996]" /> : <Pause className="w-3 h-3 text-white/50" />}
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{paused ? "Play" : "Pause"}</span>
            </button>
            <div className="w-20 h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div key={loopKey} initial={{ width: 0 }} animate={{ width: "100%" }}
                transition={{ duration: TOTAL_DURATION, ease: "linear" }}
                className="h-full bg-[#6EA996] rounded-full"
                style={paused ? { animationPlayState: "paused" } : {}}
              />
            </div>
          </div>
        </div>

        {/* Main 3-Column */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* LEFT — ITP Checklist + Evidence */}
          <div className="flex-[25] border-r border-white/[0.03] flex flex-col overflow-hidden">
            <div className="px-4 py-3">
              <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">ITP Checklist</span>
              <div className="text-[10px] text-white/25 mt-1">Heat Exchanger FAT · GOST-34347</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] px-1.5 py-0.5 bg-[#AE3D3D]/20 text-[#AE3D3D] font-bold rounded">H</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#F5A623]/20 text-[#F5A623] font-bold rounded">W</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-white/40 font-bold rounded">R</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 relative" ref={leftScrollRef} style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={leftScrollRef} />
              {itpSteps.map((itp, i) => {
                const status = itpStatuses[i];
                const isActive = i === activeITPIndex;
                return (
                  <motion.div key={itp.id} data-itp-item
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: status !== "pending" ? 1 : 0.4, scale: isActive ? 1.02 : 1 }}
                    className={`rounded-lg px-3 py-2 transition-colors ${
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

            {/* Evidence Section — same as homepage */}
            <div className="px-4 py-4 border-t border-white/[0.05]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">Evidence</span>
                <span className={`text-[12px] font-bold ${allEvidence.length >= 5 ? "text-[#6EA996]" : "text-[#F5A623]"}`}>
                  {allEvidence.filter(e => e.status === "verified").length} / {allEvidence.length} ✓
                </span>
              </div>
              <div className="space-y-1.5 max-h-[120px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                {allEvidence.slice(-5).map((ev, i) => (
                  <EvidenceItem key={i} name={ev.name} type={ev.type} status={ev.status} />
                ))}
                {allEvidence.length === 0 && (
                  <div className="text-[10px] text-white/20 italic py-2">No evidence captured yet</div>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg py-2.5 transition-colors group border border-white/8 hover:border-white/20">
                  <Camera className="w-4 h-4 text-white/30 group-hover:text-[#6EA996] transition-colors" />
                  <span className="text-[10px] text-white/30 group-hover:text-white/60 font-medium">Capture</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg py-2.5 transition-colors group border border-white/8 hover:border-white/20">
                  <svg className="w-4 h-4 text-white/30 group-hover:text-[#6EA996] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-[10px] text-white/30 group-hover:text-white/60 font-medium">Upload</span>
                </button>
              </div>
            </div>

            {/* ITP Summary */}
            <div className="px-4 py-3 border-t border-white/[0.05]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Status</span>
                <span className={`text-[12px] font-bold ${step >= 16 ? "text-[#F5A623]" : "text-white/30"}`}>
                  {step >= 16 ? "ACTION REQUIRED" : "In Progress..."}
                </span>
              </div>
              <div className="flex gap-3 text-[10px]">
                <span className="text-[#AE3D3D]">{itpStatuses.filter(s => s === "fail").length} Failed</span>
                <span className="text-[#6EA996]">{itpStatuses.filter(s => s === "pass").length} Passed</span>
                <span className="text-white/30">{itpStatuses.filter(s => s === "pending" || s === "active").length} Pending</span>
              </div>
            </div>
          </div>

          {/* MIDDLE — AI Inspector View */}
          <div className="flex-[45] border-r border-white/[0.03] flex flex-col overflow-hidden">
            {/* Header with action icons — same as homepage */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider">AI Inspector View</span>
                  {totalFindings > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-1 px-2 py-1 border border-[#AE3D3D]/30 rounded">
                      <span className="text-[9px] text-[#AE3D3D] font-bold">{totalFindings} NCRs</span>
                      {criticalCount > 0 && <span className="text-[9px] text-[#AE3D3D] font-bold">({criticalCount} CRIT)</span>}
                    </motion.div>
                  )}
                </div>
                <div className="flex gap-2">
                  {[
                    { icon: "🔊", active: copilotSpeaking, onClick: speakAlert },
                    { icon: "📷", active: photoFlash },
                    { icon: "📎", active: false },
                  ].map((btn, i) => (
                    <button key={i} onClick={btn.onClick}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-[14px] border ${
                        btn.active ? "bg-[#6EA996]/15 border-[#6EA996] ring-1 ring-[#6EA996]/30" : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                      }`}
                    >{btn.icon}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#6EA996] rounded-full animate-pulse" />
                <span className="text-[10px] text-[#6EA996] font-bold uppercase tracking-wider">Autopilot Active</span>
              </div>
            </motion.div>

            {/* AI Guidance — scrollable chat area */}
            <div ref={middleScrollRef} className="flex-1 overflow-y-auto px-6 py-2 space-y-3 relative" style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={middleScrollRef} />

              {/* Welcome */}
              {step >= 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#6EA996]/8 border border-[#6EA996]/20 rounded-lg p-4">
                  <div className="text-[11px] text-[#6EA996] font-bold mb-1">Atlas AI — Inspector Autopilot Activated</div>
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    Starting inspection sequence for Deethanizer Condenser G1-22E05. Design: 28 barg / 180°C. You have 11 checkpoints with 7 hold points. Camera, IoT sensors, and voice copilot are connected. Begin with the document package — I'll guide you through each step.
                  </p>
                </motion.div>
              )}

              {/* Inspection Step Cards */}
              <AnimatePresence>
                {getVisibleDetails().map((detail) => (
                  <motion.div key={detail.stepId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.05]">
                      <span className="text-[11px] font-bold text-white">{detail.title}</span>
                    </div>
                    <div className="px-4 py-2 bg-[#6EA996]/5 border-b border-white/[0.05]">
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] text-[#6EA996] font-bold shrink-0 mt-0.5">AI:</span>
                        <p className="text-[10px] text-white/50 leading-relaxed">{detail.aiGuidance}</p>
                      </div>
                    </div>
                    {detail.measurements && (
                      <div className="px-4 py-2">
                        <div className="text-[9px] text-white/30 uppercase tracking-wider font-bold mb-1.5">Measurements</div>
                        <div className="space-y-1">
                          {detail.measurements.map((m, j) => (
                            <div key={j} className="flex items-center text-[10px] gap-1">
                              <span className="text-white/40 w-[35%] truncate">{m.param}</span>
                              <span className="text-white/25 w-[25%] truncate font-mono">{m.spec}</span>
                              <span className={`w-[25%] truncate font-mono font-semibold ${m.pass ? "text-[#6EA996]" : "text-[#AE3D3D]"}`}>{m.actual}</span>
                              <span className={`w-[15%] text-right font-bold ${m.pass ? "text-[#6EA996]" : "text-[#AE3D3D]"}`}>{m.pass ? "✓" : "✗"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                    {/* IoT Sensors inline */}
                    {detail.iotSensors && detail.iotSensors.length > 0 && (
                      <div className="px-4 py-2 border-t border-white/[0.05]">
                        <div className="flex flex-wrap gap-2">
                          {detail.iotSensors.map((s, j) => (
                            <div key={j} className={`flex items-center gap-1.5 text-[9px] px-2 py-1 rounded border ${
                              s.status === "crit" ? "border-[#AE3D3D]/30 bg-[#AE3D3D]/5" :
                              s.status === "warn" ? "border-[#F5A623]/30 bg-[#F5A623]/5" :
                              "border-white/10 bg-white/5"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${s.status === "crit" ? "bg-[#AE3D3D]" : s.status === "warn" ? "bg-[#F5A623]" : "bg-[#6EA996]"}`} />
                              <span className="text-white/40">{s.sensor}</span>
                              <span className={`font-mono font-medium ${s.status === "crit" ? "text-[#AE3D3D]" : s.status === "warn" ? "text-[#F5A623]" : "text-white/60"}`}>{s.value}</span>
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
                    <div className="text-[12px] font-bold text-white mb-2">Inspection Walkthrough Complete — Next Steps</div>
                    <p className="text-[10px] text-white/45 leading-[1.6]">
                      11-point ITP walkthrough finished. {totalFindings} findings documented across {getVisibleDetails().length} checkpoints. {criticalCount} items need immediate attention — prioritize weld repair verification before scheduling hydro test. {allEvidence.length} evidence files captured for your review. Discuss open items with the welding engineer and materials team before finalizing disposition.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg shrink-0 bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="1" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0014 0" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <div className="flex-1 bg-white/5 border border-white/8 rounded-lg px-4 py-2.5 flex items-center hover:border-white/15 transition-colors">
                  <span className="text-[12px] text-white/25">Ask Atlas AI about this inspection...</span>
                </div>
                <button className="w-10 h-10 flex items-center justify-center bg-[#6EA996] rounded-lg shrink-0 hover:bg-[#6EA996]/80 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Atlas Copilot + Intelligence */}
          <div className="flex-[30] flex flex-col overflow-hidden">

            {/* Atlas Copilot Voice — big speaker, same as homepage */}
            <div className="px-4 py-4 flex flex-col items-center min-h-[180px] overflow-visible">
              <span className="text-[14px] font-bold text-white tracking-wide mb-3">Atlas Copilot</span>
              <div className="relative flex items-center justify-center">
                <AnimatePresence>
                  {(copilotSpeaking || speakerPulsing) && (
                    <>
                      <motion.div initial={{ scale: 0.8, opacity: 0.4 }} animate={{ scale: 1.8, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-16 h-16 rounded-full border border-[#6EA996]/30" />
                      <motion.div initial={{ scale: 0.9, opacity: 0.3 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="absolute w-16 h-16 rounded-full border border-[#6EA996]/20" />
                      <motion.div initial={{ scale: 1.0, opacity: 0.2 }} animate={{ scale: 1.3, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="absolute w-16 h-16 rounded-full border border-[#6EA996]/10" />
                    </>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={speakAlert}
                  animate={(copilotSpeaking || speakerPulsing) ? {
                    boxShadow: ["0 0 15px rgba(110,169,150,0.15)", "0 0 35px rgba(110,169,150,0.4)", "0 0 15px rgba(110,169,150,0.15)"],
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${(copilotSpeaking || speakerPulsing) ? "bg-[#6EA996]/15 border-2 border-[#6EA996]" : "bg-white/5 border-2 border-white/15 hover:border-white/30"}`}
                >
                  <svg className={`w-6 h-6 ${copilotSpeaking ? "text-[#6EA996]" : "text-white/40"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    {copilotSpeaking ? (
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                        <motion.path d="M15.54 8.46a5 5 0 010 7.07" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }} />
                        <motion.path d="M19.07 4.93a10 10 0 010 14.14" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                      </>
                    ) : (
                      <>
                        <rect x="9" y="1" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0014 0" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                      </>
                    )}
                  </svg>
                </motion.button>
              </div>
              <span className={`text-[12px] font-medium mt-2 ${copilotSpeaking ? "text-[#6EA996]" : speakerPulsing ? "text-[#6EA996] animate-pulse" : "text-white/30"}`}>
                {copilotSpeaking ? "Speaking..." : speakerPulsing ? "Tap to listen" : "Tap to speak"}
              </span>
              {/* Waveform */}
              <div className="flex items-center gap-0.5 mt-2 h-5">
                {copilotSpeaking && [...Array(16)].map((_, i) => (
                  <motion.div key={i} className="w-[3px] rounded-full bg-[#6EA996]"
                    initial={{ height: 2 }}
                    animate={{ height: [2, Math.random() * 16 + 4, 2] }}
                    transition={{ duration: 0.25 + Math.random() * 0.25, repeat: Infinity, repeatType: "reverse", delay: i * 0.03 }} />
                ))}
              </div>
              {/* Speech text */}
              <div className="h-8 mt-2 flex items-start justify-center">
                {copilotText && (
                  <motion.p key={copilotText} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[10px] text-white/40 text-center px-2 leading-[1.5] max-w-[200px]">
                    {copilotText}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Intelligence Cards */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative" ref={rightScrollRef} style={{ scrollbarWidth: "none" }}>
              <ScrollNav scrollRef={rightScrollRef} />

              {/* IoT Connector Status */}
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-[#6EA996] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" /> IoT Connectors
                  </span>
                  <div className="mt-2 space-y-1.5">
                    {getVisibleDetails().slice(-1)[0]?.iotSensors?.map((s, j) => (
                      <div key={j} className="flex justify-between text-[10px]">
                        <span className="text-white/40 flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${s.status === "crit" ? "bg-[#AE3D3D] animate-pulse" : s.status === "warn" ? "bg-[#F5A623]" : "bg-[#6EA996]"}`} />
                          {s.sensor}
                        </span>
                        <span className={`font-mono font-medium ${s.status === "crit" ? "text-[#AE3D3D]" : s.status === "warn" ? "text-[#F5A623]" : "text-white/60"}`}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Compliance Violations */}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-[#AE3D3D] uppercase tracking-wider font-bold">Compliance Violations</span>
                  <div className="mt-2 space-y-2">
                    {step >= 2 && <ComplianceItem std="EN 10204 3.2" note="MTR grade 3.1 insufficient" />}
                    {step >= 4 && <ComplianceItem std="SA-350 LF2 Spec" note="Ni content below minimum" />}
                    {step >= 9 && <ComplianceItem std="GOST-34347 §5.2" note="Zero tolerance: cracks found" />}
                    {step >= 11 && <ComplianceItem std="ASME Section V" note="RT: linear indication + slag" />}
                    {step >= 15 && <ComplianceItem std="ISO 8501 / Sa 2.5" note="Surface prep Sa 2.0 only" />}
                  </div>
                </motion.div>
              )}

              {/* WPS Deviations */}
              {step >= 9 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-[#F5A623] uppercase tracking-wider font-bold">WPS Deviations</span>
                  <div className="mt-2 space-y-1.5">
                    {[
                      { param: "Preheat", spec: "150–200°C", actual: "<100°C" },
                      { param: "Interpass", spec: "<250°C", actual: ">300°C" },
                      { param: "Heat Input", spec: "1.0–1.5 kJ/mm", actual: ">2.0 kJ/mm" },
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

              {/* Vendor Rating */}
              {step >= 16 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Vendor Rating</span>
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-white/40">Shanghai Bu Hau</span>
                      <span className="text-[#AE3D3D] font-bold">2.1 / 10</span>
                    </div>
                    <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "21%" }} transition={{ duration: 1 }}
                        className="h-full rounded-full bg-[#AE3D3D]" />
                    </div>
                    <div className="text-[10px] text-[#AE3D3D] font-semibold mt-1">⚠ Probation / Debarment</div>
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

const EvidenceItem = ({ name, type, status }: { name: string; type: string; status: "verified" | "review" }) => (
  <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${status === "review" ? "bg-[#F5A623]/5 border border-[#F5A623]/15" : "bg-white/5 border border-transparent"}`}>
    <span className="text-[12px]">{type === "img" ? "🖼" : type === "thermal" ? "🌡" : type === "video" ? "🎬" : "📄"}</span>
    <span className="text-[10px] text-white/40 truncate flex-1">{name}</span>
    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${status === "verified" ? "bg-[#6EA996]/15 text-[#6EA996]" : "bg-[#F5A623]/15 text-[#F5A623]"}`}>
      {status === "verified" ? "✓" : "⚠"}
    </span>
  </div>
);

export default LNGAtlasDemo;
