import { useLanguage } from "@/contexts/LanguageContext";
import PageSEO from "@/components/PageSEO";
import Navigation from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, AlertTriangle, CheckCircle, TrendingUp,
  FileText, MapPin, Users, Package, Clock, Bot,
  BarChart3, Layers, Eye, Lock, Zap, ArrowRight, Play, Pause,
  Activity, Search, GitBranch, Factory, AlertCircle,
  RefreshCw, Gauge, Database, Target, Award, TriangleAlert,
  CheckCircle2, Globe, Wrench, Cable, Box, Flame
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
  duration: number;
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

// ─── Layer 1: Identity Twin overlay ───
const IdentityTwinOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-primary">1</span>
        </div>
        <span className="text-xs font-bold text-background/80">Identity Twin — Who is the supplier?</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {[
          "Legal entity · Ownership",
          "Plants · Sites (Geo-Map)",
          "Contacts + Roles",
          "Product portfolio",
          "Certifications (ISO, ASME, PED)",
          "Markets · Industries",
          "Machine park (high-level)",
          "Export capability · Incoterms",
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.06 }}
            className="bg-background/5 border border-background/10 rounded px-2 py-1.5"
          >
            <span className="text-[9px] text-background/60">{item}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-[9px] text-background/30 mt-2 font-mono">Foundation layer — state of the art baseline</p>
    </div>
  </motion.div>
);

// ─── Layer 2: Operational Twin overlay ───
const OperationalTwinOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-primary">2</span>
        </div>
        <span className="text-xs font-bold text-background/80">Operational Twin — How does the supplier actually work?</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { title: "Capacity", desc: "Theoretical vs realistic" },
          { title: "Lead Times", desc: "Historical + current" },
          { title: "Process Maturity", desc: "Per step: Weld, Machine, Test" },
          { title: "Bottlenecks", desc: "Machines · Personnel · Test rigs" },
          { title: "Subsupplier Deps", desc: "Critical path · Single-source" },
          { title: "Documentation", desc: "Traceability · QA/QC org" },
          { title: "Shopfloor", desc: "Housekeeping · Maintenance" },
          { title: "Change Mgmt", desc: "Scope change agility" },
          { title: "Rework Zones", desc: "Error focus areas" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
            className="bg-background/5 border border-background/10 rounded px-2 py-1.5"
          >
            <span className="text-[9px] font-semibold text-background/70">{item.title}</span>
            <p className="text-[8px] text-background/40">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <Shield className="w-3 h-3 text-accent" />
        <span className="text-[9px] text-accent font-medium">AI-guided, on-site verified — not self-declared</span>
      </div>
    </div>
  </motion.div>
);

// ─── Layer 3: Decision Twin overlay ───
const DecisionTwinOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-primary">3</span>
        </div>
        <span className="text-xs font-bold text-background/80">Decision Twin — How well does the supplier fit my need?</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-3">
        {[
          { title: "Fit-to-Requirement", desc: "Per concrete RFQ" },
          { title: "Risk Score", desc: "Qualitative + quantitative" },
          { title: "TCO Hypothesis", desc: "Not just unit price" },
          { title: "Ramp-up Capability", desc: "EPC / series start risk" },
          { title: "Compliance Fit", desc: "Standard coverage vs scope" },
          { title: "Regional Risk", desc: "Sanctions · Logistics" },
          { title: "Comparison", desc: "vs reference supplier" },
          { title: "AI Recommendation", desc: "Use / Conditional / Develop" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
            className="bg-background/5 border border-background/10 rounded px-2 py-1.5"
          >
            <span className="text-[9px] font-semibold text-background/70">{item.title}</span>
            <p className="text-[8px] text-background/40">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-accent/10 border border-accent/20 rounded px-3 py-1.5">
        <p className="text-[9px] text-accent font-medium">Not just a profile — a decision copilot for procurement.</p>
      </div>
    </div>
  </motion.div>
);

const KnowledgeGraphOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
    className="absolute bottom-6 left-6 right-6"
  >
    <div className="bg-foreground/80 backdrop-blur rounded-lg px-4 py-3 flex flex-wrap gap-2">
      {["Sites", "Processes", "Certifications", "Subsuppliers", "Audits", "NCR Patterns", "Machines", "Materials"].map((n, i) => (
        <motion.span
          key={n}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.08 }}
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
        { label: "Third-party verified", color: "bg-primary/30 text-primary" },
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

const RiskOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
    className="absolute top-6 right-6 max-w-[280px]"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-warning text-xs font-bold">
        <AlertCircle className="w-3.5 h-3.5" />
        Contradiction Detector
      </div>
      <p className="text-[11px] text-background/60 leading-relaxed">
        Lead time claim: 8 weeks · Observed pattern: 12-week avg · OTD trend: deteriorating
      </p>
      <span className="text-[10px] px-2 py-0.5 rounded bg-warning/20 text-warning font-mono">Claim–Evidence Mismatch</span>
    </div>
  </motion.div>
);

// ─── Advanced Modules overlay ───
const AdvancedModulesOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4">
      <p className="text-[10px] font-mono text-primary uppercase tracking-wider mb-2">12 Advanced Twin Modules</p>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
        {[
          { icon: GitBranch, label: "Knowledge Graph" },
          { icon: Clock, label: "Time Machine" },
          { icon: Shield, label: "Evidence Vault" },
          { icon: Gauge, label: "Capability DNA" },
          { icon: Factory, label: "Process Twin" },
          { icon: AlertTriangle, label: "Dynamic Risk" },
          { icon: BarChart3, label: "Commercial Intel" },
          { icon: CheckCircle, label: "Compliance Twin" },
          { icon: RefreshCw, label: "NCR/CAPA Intel" },
          { icon: MapPin, label: "Site Shadow" },
          { icon: Search, label: "Fit Simulator" },
          { icon: Bot, label: "AI Agent Layer" },
        ].map(({ icon: Icon, label }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.04 }}
            className="flex items-center gap-1.5 bg-background/5 border border-background/10 rounded px-2 py-1.5"
          >
            <Icon className="w-3 h-3 text-accent shrink-0" />
            <span className="text-[8px] text-background/60 font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const TrustPanelOverlay = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
    className="absolute top-6 right-6 max-w-[280px]"
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
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">Source: Audit 2026-01</span>
      </div>
      <div className="border-t border-background/10 pt-2 mt-1">
        <p className="text-[8px] text-background/40 font-mono">Every insight: source · timestamp · confidence · verification · reasoning</p>
      </div>
    </div>
  </motion.div>
);

const TwinQualityOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute bottom-6 left-6 right-6"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4 grid grid-cols-5 gap-3">
      {[
        { label: "Twin Health", value: "92%" },
        { label: "Data Freshness", value: "87%" },
        { label: "Evidence Coverage", value: "72%" },
        { label: "Contradiction", value: "0 found" },
        { label: "Confidence", value: "High" },
      ].map((m, i) => (
        <motion.div key={i} className="text-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}>
          <p className="text-sm font-black text-primary">{m.value}</p>
          <p className="text-[8px] text-background/40 font-mono uppercase">{m.label}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ─── Role-based Views overlay ───
const RoleViewsOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4">
      <p className="text-[10px] font-mono text-primary uppercase tracking-wider mb-2">5 Role-based Twin Views</p>
      <div className="grid grid-cols-5 gap-1.5">
        {[
          { role: "Executive", items: "Fit · Risk · Capability · Action" },
          { role: "Engineer/QA", items: "Processes · Machines · Gaps" },
          { role: "Procurement", items: "Cost · Lead time · Levers" },
          { role: "Audit", items: "Findings · Evidence · Triggers" },
          { role: "AI Chat", items: "Ask the twin anything" },
        ].map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08 }}
            className="bg-background/5 border border-background/10 rounded p-2 text-center"
          >
            <span className="text-[9px] font-bold text-accent block">{v.role}</span>
            <p className="text-[7px] text-background/40 mt-0.5">{v.items}</p>
          </motion.div>
        ))}
      </div>
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
        "TCO vs unit price: -18% advantage",
      ].map((t, i) => (
        <motion.p key={i} className="text-[10px] text-background/70"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + i * 0.1 }}>
          {t}
        </motion.p>
      ))}
    </div>
  </motion.div>
);

// ─── Roadmap overlay ───
const RoadmapOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
    className="absolute inset-x-6 bottom-24 md:bottom-28 top-auto"
  >
    <div className="bg-foreground/90 backdrop-blur rounded-lg p-4">
      <p className="text-[10px] font-mono text-primary uppercase tracking-wider mb-3">Modular Rollout Roadmap</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          { phase: "Phase 1 — MVP+", items: ["Identity + site map", "Capability matrix", "Certs + expiry", "Evidence vault", "Risk score", "AI recommendation"] },
          { phase: "Phase 2 — Differentiation", items: ["Time-series twin", "Compliance mapping", "CAPA/NCR intelligence", "Capacity intelligence", "Fit-to-RFQ simulator"] },
          { phase: "Phase 3 — Category-defining", items: ["Knowledge graph reasoning", "Predictive forecasting", "Supplier dev copilot", "Portfolio benchmarking", "Autonomous monitoring"] },
        ].map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="bg-background/5 border border-background/10 rounded p-2.5"
          >
            <p className="text-[8px] font-bold text-accent mb-1.5 font-mono uppercase">{p.phase}</p>
            {p.items.map((item, j) => (
              <div key={j} className="flex items-start gap-1 mb-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-accent/50 mt-0.5 shrink-0" />
                <span className="text-[8px] text-background/50">{item}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
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
      copy: "A living, evidence-based representation of supplier capability, risk, and readiness — structured in three layers.",
      image: demoTwinCockpit,
      duration: 8,
      overlay: <TwinCockpitOverlay />,
    },
    {
      id: "identity-twin",
      label: "03 — Identity Twin",
      headline: "Layer 1: Who is the supplier?",
      copy: "Legal entity, production sites, certifications, product portfolio, machine park — the state-of-the-art foundation.",
      image: demoTwinCockpit,
      duration: 10,
      overlay: <IdentityTwinOverlay />,
    },
    {
      id: "operational-twin",
      label: "04 — Operational Twin",
      headline: "Layer 2: How does the supplier\nactually work?",
      copy: "Capacity, lead times, process maturity, bottleneck resources, subsupplier dependencies — AI-guided, on-site verified operational truth.",
      image: demoProcessTwin,
      duration: 10,
      overlay: <OperationalTwinOverlay />,
    },
    {
      id: "decision-twin",
      label: "05 — Decision Twin",
      headline: "Layer 3: How well does the\nsupplier fit my need?",
      copy: "Fit-to-requirement score, explainable risk, TCO hypothesis, compliance fit — AI-generated recommendations per sourcing package.",
      image: demoComparison,
      duration: 10,
      overlay: <DecisionTwinOverlay />,
    },
    {
      id: "knowledge-graph",
      label: "06 — Knowledge Graph",
      headline: "360° Supplier Intelligence Graph",
      copy: "Supplier as a connected model: entities ↔ sites ↔ processes ↔ machines ↔ certifications ↔ audits ↔ NCR patterns. AI reasons on relationships.",
      image: demoKnowledgeGraph,
      duration: 9,
      overlay: <KnowledgeGraphOverlay />,
    },
    {
      id: "process-twin",
      label: "07 — Process Twin",
      headline: "End-to-end execution reality",
      copy: "Order intake → engineering → planning → procurement → production → inspection → dispatch. Bottlenecks, quality gates, rework zones, delay root causes.",
      image: demoProcessTwin,
      duration: 9,
      overlay: <ProcessTwinOverlay />,
    },
    {
      id: "evidence",
      label: "08 — Evidence Vault",
      headline: "Every statement\ntraced to evidence",
      copy: "Audit photos (geotagged), documents, interview transcripts, checklists, measurements. Each field: self-declared → document-verified → on-site verified → AI-inferred.",
      image: demoEvidenceVault,
      duration: 9,
      overlay: <EvidenceOverlay />,
    },
    {
      id: "risk",
      label: "09 — Dynamic Risk",
      headline: "Risk is not static.\nRCA shows what changed.",
      copy: "Quality · Delivery · Capacity · Financial · Compliance · ESG · Geo · Subsupplier risk. Contradiction Detector flags claim-evidence mismatches.",
      image: demoRiskDashboard,
      duration: 10,
      overlay: <RiskOverlay />,
    },
    {
      id: "advanced-modules",
      label: "10 — Twin Modules",
      headline: "12 modular intelligence layers",
      copy: "Knowledge Graph, Time Machine, Evidence Vault, Capability DNA, Process Twin, Dynamic Risk, Commercial Intel, Compliance Twin, NCR/CAPA, Site Shadow, Fit Simulator, AI Agents.",
      image: demoSiteShadow,
      duration: 10,
      overlay: <AdvancedModulesOverlay />,
    },
    {
      id: "trust",
      label: "11 — Trust & Provenance",
      headline: "Traceable scores.\nExplainable AI.",
      copy: "Every insight: source, timestamp, confidence, verification status, reasoning logic. Enterprise-ready auditability.",
      image: demoTwinCockpit,
      duration: 9,
      overlay: <TrustPanelOverlay />,
    },
    {
      id: "twin-quality",
      label: "12 — Twin Quality",
      headline: "Twin Health Score &\nIntelligence Indicators",
      copy: "Data Freshness Meter, Evidence Coverage Score, Contradiction Detector, Twin Confidence Index, Requalification Triggers, Supplier DNA Fingerprint.",
      image: demoSiteShadow,
      duration: 9,
      overlay: <TwinQualityOverlay />,
    },
    {
      id: "role-views",
      label: "13 — Role-based Views",
      headline: "Executive · Engineer · Procurement\nAudit · AI Chat",
      copy: "Each user sees what matters. Fit scores for the board, process detail for QA, negotiation levers for procurement, evidence explorer for audit.",
      image: demoComparison,
      duration: 9,
      overlay: <RoleViewsOverlay />,
    },
    {
      id: "requalification",
      label: "14 — Requalification",
      headline: "Proactive monitoring.\nAutomatic triggers.",
      copy: "RCA monitors supplier changes and flags when requalification or deeper review is required.",
      image: demoRiskDashboard,
      duration: 8,
      overlay: <RequalOverlay />,
    },
    {
      id: "ai-copilot",
      label: "15 — AI Copilot",
      headline: "Ask the twin.\nGet traceable answers.",
      copy: "Atlas Auditor Copilot · Procurement Decision Copilot · Supplier Development Copilot · Expediting/Inspection Copilot. Context-aware, evidence-referenced.",
      image: demoAiCopilot,
      duration: 10,
    },
    {
      id: "scenario",
      label: "16 — Scenario Mode",
      headline: "What-if evaluation\nunder changing conditions",
      copy: "Upload spec/RFQ → twin evaluates: technical fit, process fit, quality fit, compliance fit, capacity fit, risk fit. Score + gaps + mitigations.",
      image: demoComparison,
      duration: 9,
      overlay: <ScenarioOverlay />,
    },
    {
      id: "commercial",
      label: "17 — Commercial Twin",
      headline: "Procurement intelligence\nbeyond qualification",
      copy: "Should-cost indicators · Cost driver map · MOQ behavior · Negotiation levers · TCO analysis. Not just unit price — total cost of ownership.",
      image: demoComparison,
      duration: 8,
      overlay: <CommercialOverlay />,
    },
    {
      id: "board-memo",
      label: "18 — Decision Note",
      headline: "Board-ready output\nfrom the twin",
      copy: "Structured decision notes: Use · Use with conditions · Develop first · Do not use for critical scope. 1-click Board Memo Generator.",
      image: demoBoardMemo,
      duration: 8,
    },
    {
      id: "roadmap",
      label: "19 — Rollout Roadmap",
      headline: "Modular. Phased.\nEnterprise-ready.",
      copy: "Phase 1: MVP+ with identity, capability, evidence vault. Phase 2: Differentiation with time-series, compliance, fit simulator. Phase 3: Category-defining with knowledge graph reasoning and predictive AI.",
      image: demoTwinCockpit,
      duration: 10,
      overlay: <RoadmapOverlay />,
    },
    {
      id: "closing",
      label: "20 — Move Beyond",
      headline: "From profiles to\nverified digital twins",
      copy: "Built for AI-native procurement decisions. Use verified supplier digital twins to improve qualification quality, reduce sourcing risk, and make faster, better decisions.",
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
              {scene.image && (
                <img
                  src={scene.image}
                  alt={scene.headline}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/20" />
              {scene.overlay}
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
          <div className="w-full h-1 bg-background/10 rounded-full mb-3 overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors shrink-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

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

            <span className="text-[11px] font-mono text-background/40 shrink-0">
              {String(currentScene + 1).padStart(2, '0')} / {scenes.length}
            </span>
          </div>
        </div>
      </div>

      {/* Scene navigation sidebar */}
      <div className="bg-foreground border-t border-background/5">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 py-16">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-8">All Scenes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
