import { useLanguage } from "@/contexts/LanguageContext";
import PageSEO from "@/components/PageSEO";
import Navigation from "@/components/Navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown,
  Minus, FileText, MapPin, Users, Package, Clock, Bot,
  BarChart3, Layers, Eye, Lock, Zap, ArrowRight, Play, Pause,
  ChevronDown, Activity, Search, GitBranch, Factory, AlertCircle,
  RefreshCw, Gauge, Database, Target, Award, TriangleAlert
} from "lucide-react";

// Images
import demoStaticProfile from "@/assets/demo-static-profile.jpg";
import demoTwinCockpit from "@/assets/demo-twin-cockpit.jpg";
import demoKnowledgeGraph from "@/assets/demo-knowledge-graph.jpg";
import demoProcessTwin from "@/assets/demo-process-twin.jpg";
import demoEvidenceVault from "@/assets/demo-evidence-vault.jpg";
import demoSiteShadow from "@/assets/demo-site-shadow.jpg";
import demoRiskDashboard from "@/assets/demo-risk-dashboard.jpg";
import demoAiCopilot from "@/assets/demo-ai-copilot.jpg";
import demoComparison from "@/assets/demo-comparison.jpg";
import demoBoardMemo from "@/assets/demo-board-memo.jpg";

// ─── Scene data ───
interface Scene {
  id: string;
  label: string;
  headline: string;
  copy: string;
  image?: string;
  duration: number; // seconds
  overlay?: React.ReactNode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Animated overlay components ───

const ProblemOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.6 }}
    className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-8 bg-foreground/60 backdrop-blur-sm"
  >
    {["Self-declared", "No evidence", "Outdated", "Not decision-ready", "No risk context", "Hard to compare"].map((label, i) => (
      <motion.span
        key={label}
        initial={{ opacity: 0, scale: 0.8, rotate: -3 + i * 2 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 + i * 2 }}
        transition={{ delay: 1.8 + i * 0.15 }}
        className="px-4 py-2 bg-destructive/90 text-background text-sm font-black tracking-wide rounded shadow-lg"
        style={{ transform: `rotate(${-5 + i * 3}deg)` }}
      >
        {label}
      </motion.span>
    ))}
  </motion.div>
);

const TwinCockpitOverlay = () => (
  <motion.div
    initial="hidden" animate="visible" variants={stagger}
    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground via-foreground/90 to-transparent"
  >
    <div className="grid grid-cols-4 gap-3 max-w-[800px]">
      {[
        { label: "Fit Score", value: "87%", color: "text-primary" },
        { label: "Risk", value: "Low", color: "text-accent" },
        { label: "Confidence", value: "94%", color: "text-primary" },
        { label: "Status", value: "Verified", color: "text-accent" },
      ].map((m, i) => (
        <motion.div key={i} variants={fadeUp} className="text-center">
          <p className="text-[10px] font-mono text-background/40 uppercase">{m.label}</p>
          <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const KnowledgeGraphOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
    className="absolute bottom-6 left-6 right-6"
  >
    <div className="bg-foreground/80 backdrop-blur rounded-lg px-4 py-3 flex flex-wrap gap-2">
      {["Sites", "Processes", "Certifications", "Subsuppliers", "Audits", "NCR Patterns"].map((n, i) => (
        <motion.span
          key={n}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-[10px] px-2 py-1 rounded bg-primary/20 text-primary font-mono"
        >
          {n}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const ProcessTwinOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground to-transparent"
  >
    <div className="flex gap-1 items-end justify-center">
      {["Order", "Eng.", "Plan", "Procure", "Prod.", "Inspect", "Doc", "Ship"].map((step, i) => {
        const colors = ["bg-accent", "bg-accent", "bg-primary", "bg-warning", "bg-primary", "bg-accent", "bg-warning", "bg-accent"];
        const heights = [16, 20, 14, 10, 22, 18, 12, 20];
        return (
          <motion.div key={step} className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.08 }}>
            <div className={`w-6 ${colors[i]} rounded-t`} style={{ height: heights[i] }} />
            <span className="text-[8px] text-background/50 font-mono">{step}</span>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

const RiskOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
    className="absolute top-6 right-6 max-w-[280px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-warning text-xs font-bold">
        <AlertCircle className="w-3.5 h-3.5" />
        Claim–Evidence Mismatch
      </div>
      <p className="text-[11px] text-background/60 leading-relaxed">
        Lead time claim: 8 weeks · Observed pattern: 12-week avg · OTD trend: deteriorating
      </p>
      <span className="text-[10px] px-2 py-0.5 rounded bg-warning/20 text-warning font-mono">Review recommended</span>
    </div>
  </motion.div>
);

const EvidenceOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute top-6 left-6"
  >
    <div className="flex flex-col gap-1.5">
      {[
        { label: "Self-declared", color: "bg-muted text-muted-foreground" },
        { label: "Document-verified", color: "bg-primary/20 text-primary" },
        { label: "On-site verified", color: "bg-accent/20 text-accent" },
        { label: "AI-inferred", color: "bg-warning/20 text-warning" },
      ].map((b, i) => (
        <motion.span
          key={b.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.12 }}
          className={`text-[10px] px-2.5 py-1 rounded font-bold ${b.color}`}
        >
          {b.label}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const TrustPanelOverlay = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
    className="absolute top-6 right-6 max-w-[260px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-3">
      <p className="text-[11px] font-bold text-primary font-mono uppercase">Why this score?</p>
      <div className="space-y-2">
        {[
          { driver: "Capacity utilization at 78%", icon: Gauge },
          { driver: "3 NCRs in last 6 months", icon: AlertTriangle },
          { driver: "ISO 9001 valid until 2027", icon: CheckCircle },
        ].map(({ driver, icon: Icon }, i) => (
          <div key={i} className="flex items-start gap-2">
            <Icon className="w-3 h-3 text-primary mt-0.5 shrink-0" />
            <span className="text-[10px] text-background/70">{driver}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-mono">Confidence: 91%</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">Updated: 3d ago</span>
      </div>
    </div>
  </motion.div>
);

const TwinQualityOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute bottom-6 left-6 right-6"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 grid grid-cols-3 gap-4">
      {[
        { label: "Data Freshness", value: "87%", sub: "Updated < 6mo" },
        { label: "Evidence Coverage", value: "72%", sub: "Critical fields" },
        { label: "Twin Confidence", value: "High", sub: "Decision-ready" },
      ].map((m, i) => (
        <motion.div key={i} className="text-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
          <p className="text-lg font-black text-primary">{m.value}</p>
          <p className="text-[10px] text-background/50 font-mono uppercase">{m.label}</p>
          <p className="text-[9px] text-background/30">{m.sub}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const RequalOverlay = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
    className="absolute bottom-6 right-6 max-w-[280px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-2">
      <p className="text-[11px] font-bold text-warning font-mono uppercase flex items-center gap-1.5">
        <RefreshCw className="w-3.5 h-3.5" /> Requalification Triggers
      </p>
      {["Certificate expiring in 45 days", "Risk score increased +12%", "2 repeat NCR patterns detected"].map((t, i) => (
        <motion.div key={i} className="flex items-start gap-2"
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.12 }}>
          <TriangleAlert className="w-3 h-3 text-warning mt-0.5 shrink-0" />
          <span className="text-[10px] text-background/70">{t}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ScenarioOverlay = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
    className="absolute bottom-6 left-6 max-w-[320px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-2">
      <p className="text-[11px] font-bold text-primary font-mono uppercase">What-if: Volume doubles</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Fit Score", from: "87%", to: "62%" },
          { label: "Risk", from: "Low", to: "High" },
          { label: "Bottleneck", from: "None", to: "Testing" },
          { label: "Status", from: "Ready", to: "Conditional" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-[9px] text-background/40 font-mono">{s.label}</p>
            <p className="text-[10px]">
              <span className="text-accent">{s.from}</span>
              <span className="text-background/30 mx-1">→</span>
              <span className="text-warning">{s.to}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CommercialOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
    className="absolute top-6 left-6 max-w-[260px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-2">
      <p className="text-[11px] font-bold text-primary font-mono uppercase">Procurement Intelligence</p>
      {[
        "Cost drivers: Material 42% · Labor 28%",
        "Lead-time sensitivity: High",
        "Negotiation lever: Batch size flexibility",
      ].map((t, i) => (
        <motion.p key={i} className="text-[10px] text-background/70"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + i * 0.1 }}>
          {t}
        </motion.p>
      ))}
    </div>
  </motion.div>
);

// ─── Main Component ───

const SupplierDigitalTwin = () => {
  const { t } = useLanguage();
  const s = t.supplierDigitalTwin;
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scenes: Scene[] = [
    {
      id: "problem",
      label: "01 — The Problem",
      headline: "Most supplier profiles answer who.\nThey do not answer whether.",
      copy: "Static. Self-declared. No evidence. No risk context. Not decision-ready.",
      image: demoStaticProfile,
      duration: 8,
      overlay: <ProblemOverlay />,
    },
    {
      id: "approach",
      label: "02 — RCA Approach",
      headline: "Verified Supplier Digital Twin",
      copy: "A living, evidence-based representation of supplier capability, risk, and readiness.",
      image: demoTwinCockpit,
      duration: 8,
      overlay: <TwinCockpitOverlay />,
    },
    {
      id: "cockpit",
      label: "03 — Twin Cockpit",
      headline: "Decision-ready summary\nfor the current sourcing scope",
      copy: "Scope-specific fit · Risk drivers visible · Verification depth shown · Recommendation with rationale",
      image: demoTwinCockpit,
      duration: 10,
      overlay: <TrustPanelOverlay />,
    },
    {
      id: "knowledge-graph",
      label: "04 — Supplier Graph",
      headline: "360° Knowledge Graph",
      copy: "RCA structures supplier intelligence as a connected model — so capability, risk, and evidence can be evaluated in context.",
      image: demoKnowledgeGraph,
      duration: 9,
      overlay: <KnowledgeGraphOverlay />,
    },
    {
      id: "process-twin",
      label: "05 — Process Twin",
      headline: "End-to-end execution reality",
      copy: "RCA maps how work actually flows through the supplier — helping teams identify execution bottlenecks before award.",
      image: demoProcessTwin,
      duration: 9,
      overlay: <ProcessTwinOverlay />,
    },
    {
      id: "evidence",
      label: "06 — Evidence Vault",
      headline: "Every statement\ntraced to evidence",
      copy: "RCA separates declarations from verified facts. Field-level evidence links with verification status and confidence.",
      image: demoEvidenceVault,
      duration: 9,
      overlay: <EvidenceOverlay />,
    },
    {
      id: "risk",
      label: "07 — Dynamic Risk",
      headline: "Risk is not static.\nRCA shows what changed.",
      copy: "Explainable risk drivers · Trend-based view · Contradiction detection · Mitigation actions suggested",
      image: demoRiskDashboard,
      duration: 10,
      overlay: <RiskOverlay />,
    },
    {
      id: "site-shadow",
      label: "08 — Digital Site Shadow",
      headline: "Visual factory context",
      copy: "RCA adds visual site context to audit evidence — making observations easier to review and validate.",
      image: demoSiteShadow,
      duration: 8,
      overlay: <TwinQualityOverlay />,
    },
    {
      id: "trust",
      label: "09 — Trust & Provenance",
      headline: "Traceable scores.\nExplainable AI.",
      copy: "RCA makes scores and AI recommendations traceable — with source, recency, verification status, and reasoning context.",
      image: demoTwinCockpit,
      duration: 9,
      overlay: <TrustPanelOverlay />,
    },
    {
      id: "requalification",
      label: "10 — Requalification",
      headline: "Proactive monitoring.\nAutomatic triggers.",
      copy: "RCA monitors supplier changes and flags when requalification or deeper review is required.",
      image: demoRiskDashboard,
      duration: 8,
      overlay: <RequalOverlay />,
    },
    {
      id: "ai-copilot",
      label: "11 — AI Copilot",
      headline: "Ask the twin.\nGet traceable answers.",
      copy: "Twin-aware reasoning · Evidence-referenced answers · Decision support, not chat for chat's sake",
      image: demoAiCopilot,
      duration: 10,
    },
    {
      id: "scenario",
      label: "12 — Scenario Mode",
      headline: "What-if evaluation\nunder changing conditions",
      copy: "RCA supports what-if evaluation — so teams can assess supplier readiness under changing project conditions.",
      image: demoComparison,
      duration: 9,
      overlay: <ScenarioOverlay />,
    },
    {
      id: "commercial",
      label: "13 — Commercial Twin",
      headline: "Procurement intelligence\nbeyond qualification",
      copy: "Cost drivers, lead-time trade-offs, negotiation levers, and TCO-oriented decision support.",
      image: demoComparison,
      duration: 8,
      overlay: <CommercialOverlay />,
    },
    {
      id: "comparison",
      label: "14 — Comparison",
      headline: "Structured trade-off\ndecisions",
      copy: "RCA supports structured comparison and trade-off decisions — not just supplier discovery.",
      image: demoComparison,
      duration: 8,
    },
    {
      id: "board-memo",
      label: "15 — Decision Note",
      headline: "Board-ready output\nfrom the twin",
      copy: "RCA generates structured decision notes aligned to procurement and quality review workflows.",
      image: demoBoardMemo,
      duration: 8,
    },
    {
      id: "closing",
      label: "16 — Move Beyond",
      headline: "Move beyond\nsupplier profiles",
      copy: "Use verified supplier digital twins to improve qualification quality, reduce sourcing risk, and make faster, better decisions.",
      image: demoTwinCockpit,
      duration: 10,
      overlay: <TwinCockpitOverlay />,
    },
  ];

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  const advanceScene = useCallback(() => {
    setCurrentScene((prev) => {
      if (prev >= scenes.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [scenes.length]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(advanceScene, scenes[currentScene].duration * 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentScene, advanceScene, scenes]);

  const handlePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setCurrentScene(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const goToScene = (i: number) => {
    setCurrentScene(i);
    setHasStarted(true);
    setIsPlaying(false);
  };

  const scene = scenes[currentScene];
  const progress = ((currentScene + 1) / scenes.length) * 100;

  return (
    <div className="min-h-screen bg-foreground text-background" ref={containerRef}>
      <PageSEO title={s.pageTitle} description={s.pageDescription} canonical="/supplier-digital-twin" />
      <Navigation />

      {/* Full-screen cinematic player */}
      <div className="relative w-full h-screen flex flex-col">

        {/* Main viewport */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Background image */}
              {scene.image && (
                <img
                  src={scene.image}
                  alt={scene.headline}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              )}

              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/20" />

              {/* Scene-specific overlay */}
              {scene.overlay}

              {/* Text content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary mb-3"
                >
                  {scene.label}
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-3 whitespace-pre-line max-w-[700px]"
                >
                  {scene.headline}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-sm md:text-base text-background/60 max-w-[600px] leading-relaxed"
                >
                  {scene.copy}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Play overlay (before start) */}
          {!hasStarted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-foreground/80 backdrop-blur-sm cursor-pointer"
              onClick={handlePlay}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30"
              >
                <Play className="w-8 h-8 text-foreground ml-1" />
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-center mb-4 max-w-[600px]">
                {s.heroHeadline1}<br />
                <span className="text-primary">{s.heroHeadline2}</span>
              </h1>
              <p className="text-sm text-background/50 max-w-[500px] text-center leading-relaxed">
                {s.heroSubheadline}
              </p>
              <p className="text-xs text-background/30 mt-6 font-mono">
                {scenes.length} scenes · ~{Math.round(totalDuration / 60)}:{String(totalDuration % 60).padStart(2, '0')} min
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom control bar */}
        <div className="relative z-10 bg-foreground border-t border-background/10 px-4 md:px-8 py-3">
          {/* Progress bar */}
          <div className="w-full h-1 bg-background/10 rounded-full mb-3 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Play/Pause */}
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors shrink-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Scene dots / mini timeline */}
            <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {scenes.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goToScene(i)}
                  className={`shrink-0 h-2 rounded-full transition-all duration-300 ${
                    i === currentScene
                      ? "w-8 bg-primary"
                      : i < currentScene
                      ? "w-2 bg-primary/40"
                      : "w-2 bg-background/15"
                  }`}
                  title={s.label}
                />
              ))}
            </div>

            {/* Scene counter */}
            <span className="text-[11px] font-mono text-background/40 shrink-0">
              {String(currentScene + 1).padStart(2, '0')} / {scenes.length}
            </span>
          </div>
        </div>
      </div>

      {/* Scene navigation sidebar (below the player, scrollable) */}
      <div className="bg-foreground border-t border-background/5">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-8">All Scenes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {scenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  goToScene(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-left border rounded-lg p-4 transition-all ${
                  i === currentScene
                    ? "border-primary bg-primary/10"
                    : "border-background/10 hover:border-background/20"
                }`}
              >
                <p className="text-[10px] font-mono text-primary mb-1">{s.label}</p>
                <p className="text-xs font-semibold leading-tight line-clamp-2">{s.headline.replace('\n', ' ')}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDigitalTwin;
