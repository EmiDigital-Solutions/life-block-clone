import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect, useMemo } from "react";
import { FeatureModal } from "@/components/FeatureModal";
import SearchSuppliersFAQ from "@/components/SearchSuppliersFAQ";

// 3-Window Demo: Chatbot → Search Results → Full Supplier Profile
const SearchProDemoWindows = () => {
  const [activeWindow, setActiveWindow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWindow((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const windowTitles = [
    "SearchPro+ — AI Chatbot",
    "SearchPro+ — Search Results",
    "SearchPro+ — Supplier Profile"
  ];

  const stepLabels = ["Discover", "Results", "Profile"];

  return (
    <div className="bg-[hsl(0,0%,85%)] overflow-hidden rounded-none border border-[hsl(0,0%,80%)] h-[600px] flex flex-col">
      {/* Window chrome bar */}
      <div className="h-8 bg-[hsl(0,0%,88%)] flex items-center px-3 border-b border-[hsl(0,0%,80%)] flex-shrink-0">
        <div className="flex gap-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-none bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-none bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-none bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-[hsl(0,0%,35%)] font-medium">
          {windowTitles[activeWindow]}
        </span>
        <div className="ml-auto flex gap-1">
          {stepLabels.map((label, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded-none transition-colors ${
                activeWindow === i
                  ? 'bg-primary text-white'
                  : 'bg-[hsl(0,0%,78%)] text-[hsl(0,0%,45%)]'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          key={activeWindow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {activeWindow === 0 && <DemoChatbot />}
          {activeWindow === 1 && <DemoSearchResults />}
          {activeWindow === 2 && <DemoSupplierProfile />}
        </motion.div>
      </div>
    </div>
  );
};

// Window 1: Enterprise AI Assistant with suggestion tables
const DemoChatbot = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers = [600, 1800, 3500, 5500, 7500].map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full bg-[hsl(0,0%,85%)] flex flex-col">
      {/* Top toolbar */}
      <div className="px-4 py-2 border-b border-[hsl(0,0%,78%)] bg-[hsl(0,0%,88%)] flex items-center justify-between flex-shrink-0">
        <span className="text-[11px] font-semibold text-[hsl(0,0%,30%)] uppercase tracking-wider">SearchPro+ AI Assistant</span>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-bold rounded-none">Automotive</span>
          <span className="px-2 py-0.5 bg-[hsl(0,0%,75%)] text-[hsl(0,0%,35%)] text-[10px] font-medium rounded-none">EV Program</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {/* User query */}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-[hsl(0,0%,50%)] border border-[hsl(0,0%,45%)] rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block mb-1">Your Request</span>
              <p className="text-sm font-semibold text-white leading-relaxed">Precision CNC brake calipers for our EV program — need in-house surface treatment</p>
            </div>
          </motion.div>
        )}

        {/* AI parsed requirements table */}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">AI-Parsed Requirements</span>
              <div className="space-y-0">
                {[
                  { param: "Product", value: "CNC Brake Caliper" },
                  { param: "Material", value: "Aluminum 6082-T6" },
                  { param: "Certification", value: "IATF 16949 Required" },
                  { param: "Volume", value: "50,000+ units/month" },
                  { param: "Surface", value: "In-house anodizing" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center border-b border-[hsl(0,0%,33%)] last:border-0">
                    <span className="text-[11px] font-semibold text-[hsl(0,0%,70%)] w-[100px] py-1.5 flex-shrink-0">{row.param}</span>
                    <span className="text-[11px] font-bold text-white py-1.5">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* AI suggested categories */}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">Suggested Commodity Match</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { cat: "Precision CNC Machining", match: "98%" },
                  { cat: "Aluminum Die Casting", match: "85%" },
                  { cat: "Surface Treatment", match: "92%" },
                  { cat: "EV Powertrain Components", match: "88%" },
                ].map((item, i) => (
                  <div key={i} className={`p-2 rounded-none border ${i === 0 ? 'bg-primary/15 border-primary/40' : 'bg-[hsl(0,0%,34%)] border-[hsl(0,0%,30%)]'}`}>
                    <p className={`text-[11px] font-bold ${i === 0 ? 'text-primary' : 'text-white'}`}>{item.cat}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${i === 0 ? 'text-primary/80' : 'text-[hsl(0,0%,65%)]'}`}>{item.match} match</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* AI search status */}
        {step >= 4 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">Search Intelligence</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">23</p>
                  <p className="text-[10px] text-[hsl(0,0%,65%)] font-medium">Verified Matches</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">8</p>
                  <p className="text-[10px] text-[hsl(0,0%,65%)] font-medium">IATF Certified</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">5</p>
                  <p className="text-[10px] text-[hsl(0,0%,65%)] font-medium">Surface In-House</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results preview */}
        {step >= 5 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-none">
              <p className="text-[11px] font-bold text-primary">Top match: Precision Metalworks GmbH — 96% fit</p>
              <p className="text-[10px] text-[hsl(0,0%,40%)] mt-0.5">Munich, Germany · IATF 16949 · 65K/mo · In-house anodizing</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-[hsl(0,0%,78%)] flex gap-2 flex-shrink-0 bg-[hsl(0,0%,88%)]">
        <div className="flex-1 h-9 bg-white border border-[hsl(0,0%,75%)] rounded-none flex items-center px-3">
          <span className="text-[hsl(0,0%,55%)] text-[11px]">Describe what you need...</span>
        </div>
        <div className="w-9 h-9 bg-primary flex items-center justify-center rounded-none">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

// Window 2: Search Results — Classic Enterprise Software UI
const DemoSearchResults = () => {
  const results = [
    { name: "Precision Metalworks GmbH", location: "Munich, Germany", match: 96, certs: ["IATF 16949", "ISO 14001"], capacity: "65K/mo", speciality: "Aluminum brake calipers" },
    { name: "TechForm Automotive S.r.l.", location: "Turin, Italy", match: 93, certs: ["IATF 16949", "ISO 9001"], capacity: "50K/mo", speciality: "EV powertrain housings" },
    { name: "Apex CNC Solutions Ltd", location: "Birmingham, UK", match: 89, certs: ["ISO 9001", "AS9100D"], capacity: "40K/mo", speciality: "Multi-axis brake components" },
    { name: "Dongyang Precision Co.", location: "Incheon, South Korea", match: 87, certs: ["IATF 16949", "ISO 9001"], capacity: "120K/mo", speciality: "High-volume caliper machining" },
    { name: "AutoParts Bavaria AG", location: "Stuttgart, Germany", match: 84, certs: ["IATF 16949"], capacity: "55K/mo", speciality: "Surface-treated brake parts" },
  ];

  const menuItems = ["Dashboard", "Search", "Saved Lists", "RFQ Manager", "Audit Orders", "Reports"];
  const activeMenu = 1;

  return (
    <div className="h-full bg-[hsl(0,0%,85%)] flex">
      {/* Left sidebar navigation */}
      <div className="w-[100px] md:w-[120px] bg-[hsl(0,0%,28%)] border-r border-[hsl(0,0%,22%)] flex flex-col flex-shrink-0">
        <div className="p-2.5 border-b border-[hsl(0,0%,22%)]">
          <span className="text-[10px] text-[hsl(0,0%,60%)] uppercase tracking-widest font-bold">SearchPro+</span>
        </div>
        <div className="flex-1 py-1">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`px-3 py-2 text-[11px] font-medium cursor-default ${
                activeMenu === i
                  ? 'bg-primary/20 text-primary border-l-2 border-primary'
                  : 'text-[hsl(0,0%,65%)]'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top toolbar */}
        <div className="px-3 py-2.5 border-b border-[hsl(0,0%,78%)] flex items-center justify-between flex-shrink-0 bg-[hsl(0,0%,88%)]">
          <div>
            <p className="text-[11px] text-[hsl(0,0%,30%)] uppercase tracking-wider font-bold">23 Suppliers Found</p>
            <p className="text-[10px] text-[hsl(0,0%,50%)]">CNC Brake Calipers · IATF 16949 · 50K+ capacity</p>
          </div>
          <div className="flex gap-1.5">
            <span className="px-2 py-1 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] text-[10px] text-white font-medium rounded-none">Sort: Match</span>
            <span className="px-2 py-1 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] text-[10px] text-white font-medium rounded-none">Export</span>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Filter sidebar */}
          <div className="w-[110px] md:w-[130px] bg-[hsl(0,0%,82%)] border-r border-[hsl(0,0%,76%)] p-2.5 flex-shrink-0 overflow-y-auto">
            <p className="text-[10px] text-[hsl(0,0%,30%)] uppercase tracking-widest font-bold mb-2.5">Filters</p>
            {[
              { label: "Certification", values: ["IATF 16949", "ISO 9001", "AS9100D"] },
              { label: "Region", values: ["Europe", "Asia", "Americas"] },
              { label: "Capacity", values: [">50K/mo", ">100K/mo"] },
            ].map((filter, i) => (
              <div key={i} className="mb-2.5">
                <p className="text-[10px] text-[hsl(0,0%,35%)] font-bold uppercase mb-1">{filter.label}</p>
                {filter.values.map((v, j) => (
                  <div key={j} className="flex items-center gap-1.5 py-0.5">
                    <div className={`w-3 h-3 border rounded-none flex items-center justify-center ${
                      j === 0 ? 'border-primary bg-primary/20' : 'border-[hsl(0,0%,55%)]'
                    }`}>
                      {j === 0 && <Check className="w-2 h-2 text-primary" />}
                    </div>
                    <span className="text-[10px] text-[hsl(0,0%,30%)] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="mb-2">
              <p className="text-[10px] text-[hsl(0,0%,35%)] font-bold uppercase mb-1">Match Score</p>
              <div className="h-1.5 bg-[hsl(0,0%,70%)] rounded-none relative">
                <div className="h-full bg-primary rounded-none" style={{ width: '80%' }} />
              </div>
              <p className="text-[9px] text-[hsl(0,0%,45%)] mt-0.5 font-medium">Min: 80%</p>
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
            {/* Score explanation banner */}
            <div className="p-2.5 bg-[hsl(0,0%,88%)] border border-[hsl(0,0%,78%)] rounded-none mb-1.5">
              <p className="text-[10px] text-[hsl(0,0%,30%)] leading-relaxed">
                <span className="font-bold text-primary">Match Score</span> — AI-calculated fit based on certification, production capability, quality history, proximity, and commodity expertise.
              </p>
            </div>

            {results.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none flex items-start gap-2.5"
              >
                {/* Numbering */}
                <div className="w-6 h-6 bg-[hsl(0,0%,30%)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-bold text-white">{i + 1}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-bold text-white truncate">{s.name}</p>
                  </div>
                  <p className="text-[11px] text-[hsl(0,0%,72%)] font-medium mb-1.5">{s.location} · {s.speciality}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {s.certs.map((c, j) => (
                      <span key={j} className="px-1.5 py-0.5 border border-primary/40 text-primary text-[9px] font-bold uppercase">{c}</span>
                    ))}
                    <span className="px-1.5 py-0.5 border border-[hsl(0,0%,55%)] text-[hsl(0,0%,80%)] text-[9px] font-semibold">{s.capacity}</span>
                  </div>
                </div>

                {/* Score column */}
                <div className="flex flex-col items-center flex-shrink-0 gap-0.5">
                  <span className="text-xl font-bold text-primary leading-none">{s.match}</span>
                  <span className="text-[9px] text-[hsl(0,0%,65%)] uppercase tracking-wider font-medium">Score</span>
                  <div className="w-10 h-1.5 bg-[hsl(0,0%,30%)] rounded-none mt-0.5">
                    <div className="h-full bg-primary rounded-none" style={{ width: `${s.match}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Window 3: Full Supplier Profile
const DemoSupplierProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tabs = [0, 1, 2, 3, 4, 5];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % tabs.length;
      setActiveTab(tabs[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const tabLabels = ["Overview", "Audit Reports", "Intelligence", "RFQ", "Audit Order", "News"];

  return (
    <div className="h-full bg-[hsl(0,0%,85%)] flex flex-col">
      {/* Supplier header */}
      <div className="p-4 md:px-6 md:pt-4 md:pb-3 border-b border-[hsl(0,0%,78%)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] flex items-center justify-center rounded-none">
            <span className="text-sm font-bold text-white">PM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-[hsl(0,0%,15%)]">Precision Metalworks GmbH</h3>
              <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-none">96% Match</span>
            </div>
            <p className="text-[11px] text-[hsl(0,0%,45%)] font-medium">Munich, Germany · Est. 1987 · 280 employees</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-none">Request Quote</button>
            <button className="px-3 py-1.5 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] text-white text-[11px] font-semibold rounded-none">Order Audit</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[hsl(0,0%,78%)] px-4 md:px-6 flex-shrink-0 overflow-x-auto">
        {tabLabels.map((tab, i) => (
          <button
            key={tab}
            className={`px-3 py-2.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
              activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-[hsl(0,0%,50%)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 md:p-5">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

          {/* Overview */}
          {activeTab === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Capacity", value: "65,000 units/mo" },
                { label: "Lead Time", value: "4–6 weeks" },
                { label: "Surface Treatment", value: "In-house anodizing" },
                { label: "Quality Score", value: "94/100" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                  <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                  <p className="text-[14px] font-bold text-white">{item.value}</p>
                </div>
              ))}
              <div className="col-span-2 md:col-span-4 p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-2">Certifications</p>
                <div className="flex gap-2 flex-wrap">
                  {["IATF 16949:2016", "ISO 14001:2015", "ISO 9001:2015", "REACH Compliant"].map((c, i) => (
                    <span key={i} className="px-2 py-1 border border-primary/40 text-primary text-[10px] font-bold uppercase">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audit Reports */}
          {activeTab === 1 && (
            <div className="space-y-2.5">
              {[
                { type: "Process Audit", date: "Jan 2026", score: "92/100", auditor: "M. Schmidt", status: "Completed" },
                { type: "Quality System Audit", date: "Nov 2025", score: "88/100", auditor: "K. Tanaka", status: "Completed" },
                { type: "Product Audit — Brake Caliper", date: "Sep 2025", score: "95/100", auditor: "L. Chen", status: "Completed" },
              ].map((audit, i) => (
                <div key={i} className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13px] font-bold text-white">{audit.type}</p>
                    <span className="text-[11px] font-bold text-primary">{audit.score}</span>
                  </div>
                  <p className="text-[11px] text-[hsl(0,0%,72%)] font-medium">{audit.date} · Auditor: {audit.auditor}</p>
                  <div className="mt-2 h-2 bg-[hsl(0,0%,30%)] rounded-none overflow-hidden">
                    <div className="h-full bg-primary rounded-none" style={{ width: audit.score.split('/')[0] + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Intelligence */}
          {activeTab === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Risk Score", value: "Low", color: "text-secondary" },
                  { label: "Financial Health", value: "Stable", color: "text-primary" },
                  { label: "Delivery Rating", value: "97.2%", color: "text-primary" },
                ].map((kpi, i) => (
                  <div key={i} className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none text-center">
                    <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-1">{kpi.label}</p>
                    <p className={`text-[14px] font-bold ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-2">Geopolitical Exposure</p>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-secondary/20 text-secondary text-[10px] font-bold rounded-none">EU — Low Risk</span>
                  <span className="px-2.5 py-1 bg-[hsl(0,0%,50%)] text-white text-[10px] font-semibold rounded-none">No sanctions</span>
                </div>
              </div>
              <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-2">Equipment Verified</p>
                {["DMG MORI NLX 2500 — 5-Axis CNC", "Zeiss CMM Contura — Quality", "Anodizing Line — In-house"].map((eq, i) => (
                  <p key={i} className="text-[11px] text-white font-medium py-1.5 border-b border-[hsl(0,0%,33%)] last:border-0">{eq}</p>
                ))}
              </div>
            </div>
          )}

          {/* RFQ */}
          {activeTab === 3 && (
            <div className="space-y-3">
              <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-2">Quick RFQ</p>
                <div className="space-y-0">
                  {[
                    { field: "Product", value: "CNC Brake Caliper — Aluminum 6082" },
                    { field: "Volume", value: "50,000 units / month" },
                    { field: "Tolerance", value: "±0.01mm" },
                    { field: "Surface", value: "Hard anodized, Type III" },
                    { field: "Delivery", value: "DDP Frankfurt, Incoterms 2020" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[hsl(0,0%,33%)] last:border-0">
                      <span className="text-[11px] text-[hsl(0,0%,72%)] font-medium">{row.field}</span>
                      <span className="text-[11px] font-bold text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-[12px] font-semibold rounded-none">
                Send RFQ to Supplier
              </button>
            </div>
          )}

          {/* Audit Order */}
          {activeTab === 4 && (
            <div className="space-y-3">
              <div className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                <p className="text-[10px] text-[hsl(0,0%,72%)] uppercase tracking-wider font-semibold mb-2">Order On-Site Audit</p>
                <div className="flex gap-2 mb-3">
                  {["Process Audit", "Quality Audit", "Product Audit"].map((type, i) => (
                    <span key={i} className={`px-2.5 py-1 text-[10px] font-semibold rounded-none ${
                      i === 0 ? 'bg-primary text-white' : 'bg-[hsl(0,0%,50%)] border border-[hsl(0,0%,45%)] text-white'
                    }`}>{type}</span>
                  ))}
                </div>
                <div className="space-y-0">
                  <div className="flex justify-between py-2 border-b border-[hsl(0,0%,33%)]">
                    <span className="text-[11px] text-[hsl(0,0%,72%)] font-medium">Audit Standard</span>
                    <span className="text-[11px] font-bold text-white">VDA 6.3</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[hsl(0,0%,33%)]">
                    <span className="text-[11px] text-[hsl(0,0%,72%)] font-medium">Duration</span>
                    <span className="text-[11px] font-bold text-white">2 days on-site</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[11px] text-[hsl(0,0%,72%)] font-medium">Earliest Date</span>
                    <span className="text-[11px] font-bold text-white">March 10, 2026</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-[12px] font-semibold rounded-none">
                Schedule Audit Now
              </button>
            </div>
          )}

          {/* News Flash */}
          {activeTab === 5 && (
            <div className="space-y-2.5">
              {[
                { headline: "Precision Metalworks expands EV production line", date: "Feb 10, 2026", tag: "Company" },
                { headline: "German automotive suppliers face new EU supply chain regulations", date: "Feb 8, 2026", tag: "Regulatory" },
                { headline: "Aluminum prices stabilize after Q4 volatility", date: "Feb 5, 2026", tag: "Commodity" },
                { headline: "IATF 16949 revision expected in 2027 — key changes outlined", date: "Jan 30, 2026", tag: "Industry" },
              ].map((news, i) => (
                <div key={i} className="p-3 bg-[hsl(0,0%,38%)] border border-[hsl(0,0%,33%)] rounded-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-none ${
                      news.tag === 'Company' ? 'bg-primary/20 text-primary' :
                      news.tag === 'Regulatory' ? 'bg-[hsl(30,80%,50%)]/20 text-[hsl(30,80%,60%)]' :
                      news.tag === 'Commodity' ? 'bg-secondary/20 text-secondary' :
                      'bg-[hsl(0,0%,50%)] text-white'
                    }`}>{news.tag}</span>
                    <span className="text-[10px] text-[hsl(0,0%,65%)] font-medium">{news.date}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-white leading-relaxed">{news.headline}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};


// Import procurement images for hero carousel background
import procurementFemaleAfrican from "@/assets/procurement-female-african.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import procurementMaleSouthAsian from "@/assets/procurement-male-south-asian.jpg";

// Design tokens
const SCREEN_BG = "bg-[hsl(0,0%,85%)]";
const GLASS_CARD_LAYER1 = "bg-[hsl(0,0%,45%)] border-[hsl(0,0%,40%)]";
const GLASS_CARD_LAYER2 = "bg-[hsl(0,0%,42%)] border-[hsl(0,0%,37%)]";

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[hsl(0,0%,85%)] overflow-hidden flex flex-col rounded-none shadow-none border border-[hsl(0,0%,80%)]">
    <div className="h-8 bg-[hsl(0,0%,88%)] flex items-center px-3 border-b border-[hsl(0,0%,80%)] flex-shrink-0">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-none bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-none bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-none bg-[#28c840]" />
      </div>
      <span className="text-[10px] text-[hsl(0,0%,35%)] font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// AI Search Mockup Component
const AISearchMockup = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1500); // 6 seconds total (4 steps × 1.5s)
    return () => clearInterval(interval);
  }, []);

  const messages = [
    { role: 'ai', text: "What type of product or service are you looking for?" },
    { role: 'user', text: "CNC machining for automotive brake components" },
    { role: 'ai', text: "For automotive brake components, what certifications do you require?" },
    { role: 'user', text: "IATF 16949, ISO 9001, capacity for 50,000 units/month" },
  ];

  return (
    <WindowChrome title="SearchPro+ — AI Discovery">
      <div className={`h-full ${SCREEN_BG} p-4 flex flex-col`}>
        <div className="flex-1 space-y-3 overflow-hidden">
          {messages.slice(0, step + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 text-sm rounded-none border ${
                msg.role === 'user' 
                  ? `${GLASS_CARD_LAYER1} text-white` 
                  : `bg-[hsl(0,0%,55%)] border-[hsl(0,0%,50%)] text-[hsl(0,0%,95%)]`
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 bg-primary/30 flex items-center justify-center rounded-none">
                      <span className="text-[6px] text-primary font-bold">AI</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary">YVOO</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`mt-4 p-3 ${GLASS_CARD_LAYER2} border rounded-none`}
            >
              <p className="text-xs font-medium text-primary mb-2">Found 47 matching suppliers</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-[hsl(0,0%,60%)] text-[10px] border border-[hsl(0,0%,50%)] rounded-none text-[hsl(0,0%,95%)]">IATF 16949</span>
                <span className="px-2 py-1 bg-[hsl(0,0%,60%)] text-[10px] border border-[hsl(0,0%,50%)] rounded-none text-[hsl(0,0%,95%)]">50K units</span>
                <span className="px-2 py-1 bg-[hsl(0,0%,60%)] text-[10px] border border-[hsl(0,0%,50%)] rounded-none text-[hsl(0,0%,95%)]">Verified ✓</span>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <div className={`flex-1 h-10 ${GLASS_CARD_LAYER2} border rounded-none flex items-center px-3`}>
            <span className="text-[hsl(0,0%,70%)] text-sm">Type your requirements...</span>
          </div>
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-none">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Audit Order Mockup Component
const AuditOrderMockup = () => {
  const [orderStep, setOrderStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStep((prev) => (prev + 1) % 4);
    }, 1500); // 6 seconds total (4 steps × 1.5s)
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks GmbH", location: "Munich, Germany", selected: true },
    { name: "AutoParts Bavaria", location: "Stuttgart, Germany", selected: orderStep >= 1 },
    { name: "CNC Masters Ltd", location: "Birmingham, UK", selected: orderStep >= 2 },
  ];

  return (
    <WindowChrome title="ScanPro+ — Order Audit">
      <div className={`h-full ${SCREEN_BG} p-4`}>
        <div className="mb-4 pb-3 border-b border-[hsl(0,0%,75%)]">
          <h3 className="font-bold text-[hsl(0,0%,20%)] text-sm">Schedule On-Site Audit</h3>
          <p className="text-[10px] text-[hsl(0,0%,50%)] mt-1">Select suppliers for ground truth verification</p>
        </div>

        <div className="space-y-2 mb-4">
          {suppliers.map((supplier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-3 border rounded-none transition-all ${supplier.selected ? `${GLASS_CARD_LAYER1}` : `bg-[hsl(0,0%,75%)] border-[hsl(0,0%,70%)]`}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${supplier.selected ? 'text-white' : 'text-[hsl(0,0%,30%)]'}`}>{supplier.name}</p>
                  <p className={`text-[10px] ${supplier.selected ? 'text-[hsl(0,0%,80%)]' : 'text-[hsl(0,0%,50%)]'}`}>{supplier.location}</p>
                </div>
                <div className={`w-5 h-5 rounded-none border-2 flex items-center justify-center ${
                  supplier.selected ? 'bg-primary border-primary' : 'border-[hsl(0,0%,60%)]'
                }`}>
                  {supplier.selected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={`${GLASS_CARD_LAYER2} p-3 mb-4 border rounded-none`}>
          <p className="text-[10px] text-[hsl(0,0%,80%)] mb-2">Audit Type</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-primary text-white text-[10px] font-medium rounded-none">Process Audit</span>
            <span className="px-2 py-1 bg-[hsl(0,0%,60%)] border border-[hsl(0,0%,50%)] text-[10px] rounded-none text-[hsl(0,0%,95%)]">Quality Audit</span>
            <span className="px-2 py-1 bg-[hsl(0,0%,60%)] border border-[hsl(0,0%,50%)] text-[10px] rounded-none text-[hsl(0,0%,95%)]">Full Assessment</span>
          </div>
        </div>

        <button className="w-full py-2.5 bg-primary text-white text-xs font-medium flex items-center justify-center gap-2 rounded-none">
          Order Audit for {suppliers.filter(s => s.selected).length} Suppliers
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </WindowChrome>
  );
};

// Ground Truth Intelligence Mockup Component  
const GroundTruthMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 2000); // 6 seconds total (3 tabs × 2s)
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="YVOO — Ground Truth Intelligence">
      <div className={`h-full ${SCREEN_BG} p-4`}>
        <div className="flex items-start gap-3 mb-4 pb-3 border-b border-[hsl(0,0%,75%)]">
          <div className="w-10 h-10 bg-secondary/30 flex items-center justify-center rounded-none">
            <Check className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-[hsl(0,0%,20%)] text-sm">Verified Ground Truth</h3>
            <p className="text-[10px] text-[hsl(0,0%,50%)]">Last audit: 3 days ago • Auditor: M. Schmidt</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4 border-b border-[hsl(0,0%,75%)]">
          {['Equipment', 'Certificates', 'Capacity'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors rounded-none ${
                activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-[hsl(0,0%,60%)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeTab === 0 && (
            <>
              {['DMG MORI NLX 2500 • Verified ✓', 'Zeiss CMM Contura • Verified ✓', 'TRUMPF TruLaser • Verified ✓'].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                  <div className="w-2 h-2 rounded-none bg-secondary" />
                  <span className="text-xs text-[hsl(0,0%,95%)]">{item}</span>
                </div>
              ))}
            </>
          )}
          {activeTab === 1 && (
            <>
              {[
                { cert: 'IATF 16949:2016', status: 'Valid', date: '2026' },
                { cert: 'ISO 9001:2015', status: 'Valid', date: '2025' },
                { cert: 'ISO 14001', status: 'Valid', date: '2025' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                  <span className="text-xs font-medium text-[hsl(0,0%,95%)]">{item.cert}</span>
                  <span className="text-[10px] text-secondary font-medium">Verified until {item.date}</span>
                </div>
              ))}
            </>
          )}
          {activeTab === 2 && (
            <div className="space-y-3">
              <div className={`p-3 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <p className="text-[10px] text-[hsl(0,0%,70%)] mb-1">Production Capacity</p>
                <p className="text-lg font-bold text-[hsl(0,0%,95%)]">60,000 <span className="text-sm font-normal">units/month</span></p>
                <p className="text-[10px] text-secondary mt-1">✓ Verified on-site</p>
              </div>
              <div className={`p-3 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <p className="text-[10px] text-[hsl(0,0%,70%)] mb-1">Current Utilization</p>
                <div className="h-2 bg-[hsl(0,0%,35%)] rounded-none overflow-hidden">
                  <div className="h-full w-[72%] bg-primary rounded-none" />
                </div>
                <p className="text-[10px] text-[hsl(0,0%,70%)] mt-1">72% — Available capacity confirmed</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </WindowChrome>
  );
};

// Supplier Development Mockup Component
const SupplierDevelopmentMockup = () => {
  const [progress, setProgress] = useState(65);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev >= 95 ? 65 : prev + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const actions = [
    { task: "Implement 5S methodology", status: "completed", due: "Completed" },
    { task: "Update quality control procedure", status: "in-progress", due: "Due in 5 days" },
    { task: "Add CMM inspection station", status: "pending", due: "Due in 2 weeks" },
  ];

  return (
    <WindowChrome title="YVOO — Supplier Development">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm">Development Progress</h3>
            <motion.span 
              key={progress}
              className="text-lg font-bold text-primary"
            >
              {progress}%
            </motion.span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Improvement Actions */}
        <div className="space-y-2 mb-4">
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Improvement Actions</p>
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-3 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center ${
                    action.status === 'completed' ? 'bg-secondary' :
                    action.status === 'in-progress' ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    {action.status === 'completed' && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{action.task}</p>
                    <p className="text-[10px] text-gray-500">{action.due}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Audit */}
        <div className="bg-primary/5 border border-primary/20 p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary font-bold">📋</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">Follow-up Audit Scheduled</p>
              <p className="text-[10px] text-primary">Feb 15, 2026 • Verify improvements</p>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Supplier Profile Mockup Component
const SupplierProfileMockup = () => {
  const [activeProfileTab, setActiveProfileTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProfileTab((prev) => (prev + 1) % 3);
    }, 2000); // 6 seconds total (3 tabs × 2s)
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="SearchPro+ — Supplier Profile">
      <div className={`h-full ${SCREEN_BG} p-4`}>
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-[hsl(0,0%,75%)]">
          <div className={`w-12 h-12 ${GLASS_CARD_LAYER1} flex items-center justify-center rounded-none`}>
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">PM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[hsl(0,0%,20%)]">Precision Metalworks GmbH</h3>
              <span className={`px-1.5 py-0.5 bg-secondary/30 text-secondary text-[10px] font-medium rounded-none`}>94% Match</span>
            </div>
            <p className="text-xs text-[hsl(0,0%,50%)]">Munich, Germany • Est. 1987</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4 border-b border-[hsl(0,0%,75%)]">
          {['Capabilities', 'Certifications', 'Equipment'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors rounded-none ${
                activeProfileTab === i ? 'text-primary border-b-2 border-primary' : 'text-[hsl(0,0%,60%)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeProfileTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeProfileTab === 0 && (
            <>
              <div className={`flex items-center gap-2 p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs text-[hsl(0,0%,95%)]">5-Axis CNC Machining</span>
              </div>
              <div className={`flex items-center gap-2 p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs text-[hsl(0,0%,95%)]">Precision Grinding (±0.005mm)</span>
              </div>
              <div className={`flex items-center gap-2 p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs text-[hsl(0,0%,95%)]">Brake Component Expertise</span>
              </div>
            </>
          )}
          {activeProfileTab === 1 && (
            <>
              <div className={`flex items-center justify-between p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <span className="text-xs font-medium text-[hsl(0,0%,95%)]">IATF 16949:2016</span>
                <span className="text-[10px] text-secondary">Valid until 2026</span>
              </div>
              <div className={`flex items-center justify-between p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <span className="text-xs font-medium text-[hsl(0,0%,95%)]">ISO 9001:2015</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
              <div className={`flex items-center justify-between p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <span className="text-xs font-medium text-[hsl(0,0%,95%)]">ISO 14001</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
            </>
          )}
          {activeProfileTab === 2 && (
            <>
              <div className={`p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <p className="text-xs font-medium text-[hsl(0,0%,95%)]">DMG MORI NLX 2500</p>
                <p className="text-[10px] text-[hsl(0,0%,70%)]">5-Axis CNC • 2021</p>
              </div>
              <div className={`p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <p className="text-xs font-medium text-[hsl(0,0%,95%)]">Zeiss CMM Contura</p>
                <p className="text-[10px] text-[hsl(0,0%,70%)]">Quality Measurement • 2022</p>
              </div>
              <div className={`p-2 ${GLASS_CARD_LAYER2} border rounded-none`}>
                <p className="text-xs font-medium text-[hsl(0,0%,95%)]">Surface Grinder Okamoto</p>
                <p className="text-[10px] text-[hsl(0,0%,70%)]">Precision Grinding • 2019</p>
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium rounded-none">
            Request Quote
          </button>
          <button className={`flex-1 py-2 border rounded-none text-xs font-medium bg-[hsl(0,0%,65%)] border-[hsl(0,0%,55%)] text-[hsl(0,0%,95%)]`}>
            Order Audit
          </button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Comparison Mockup Component
const ComparisonMockup = () => {
  const [selectedCount, setSelectedCount] = useState(2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCount((prev) => prev === 2 ? 3 : 2);
    }, 3000); // 6 seconds total (2 states × 3s)
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks", match: 94, cert: "IATF 16949", capacity: "60K/mo" },
    { name: "AutoParts Bavaria", match: 89, cert: "IATF 16949", capacity: "45K/mo" },
    { name: "CNC Masters", match: 82, cert: "ISO 9001", capacity: "80K/mo" },
  ];

  return (
    <WindowChrome title="SearchPro+ — Compare Suppliers">
      <div className={`h-full ${SCREEN_BG} p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-[hsl(0,0%,20%)] text-sm">Comparison Table</h3>
            <p className="text-[10px] text-[hsl(0,0%,50%)]">{selectedCount} suppliers selected</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-medium flex items-center gap-1 rounded-none">
              Export
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className={`border-b border-[hsl(0,0%,75%)]`}>
                <th className="text-left py-2 font-medium text-[hsl(0,0%,60%)]">Criteria</th>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <th key={i} className="text-left py-2 font-medium text-[hsl(0,0%,20%)]">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b border-[hsl(0,0%,70%)]`}>
                <td className="py-2 text-[hsl(0,0%,50%)]">Match Score</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">
                    <span className={`font-bold ${s.match >= 90 ? 'text-secondary' : 'text-primary'}`}>
                      {s.match}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={`border-b border-[hsl(0,0%,70%)]`}>
                <td className="py-2 text-[hsl(0,0%,50%)]">Certification</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2 text-[hsl(0,0%,30%)]">{s.cert}</td>
                ))}
              </tr>
              <tr className={`border-b border-[hsl(0,0%,70%)]`}>
                <td className="py-2 text-[hsl(0,0%,50%)]">Capacity</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2 text-[hsl(0,0%,30%)]">{s.capacity}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-2">
          <button className={`flex-1 py-2 text-xs font-medium rounded-none ${GLASS_CARD_LAYER2} border text-[hsl(0,0%,95%)]`}>Add to List</button>
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium rounded-none">Order Audits</button>
        </div>
      </div>
    </WindowChrome>
  );
};

const SearchSuppliers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "save" | "export">("search");
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [selectedAIFeature, setSelectedAIFeature] = useState<{
    number: string;
    title: string;
    description: string;
    detailedExplanation: {
      overview: string;
      forEngineers: string;
      forBuyers: string;
      forAuditors: string;
      example: string;
    };
  } | null>(null);
  const isRunningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  // Three different search scenarios - AI understands preferences and suggests products
  const scenarios = [
    {
      steps: [
        {
          step: 1,
          aiPrompt: "Hi! Tell me what you're sourcing — I'll guide you to the best match.",
          userResponse: "We need precision CNC parts for our EV brake system",
          aiFollowUp: "Got it — EV brake components require tight tolerances and automotive-grade quality. Based on your needs, I'd recommend these product categories:"
        },
        {
          step: 2,
          aiPrompt: "",
          userResponse: "",
          aiFollowUp: "",
          aiSuggestions: [
            "Precision CNC Brake Calipers — IATF 16949 certified",
            "Hydraulic Valve Bodies — ISO 9001 + PPAP Level 3",
            "Brake Disc Carriers — Aluminum & Steel, high-volume"
          ]
        }
      ]
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "Hi! Tell me what you're sourcing — I'll guide you to the best match.",
          userResponse: "Looking for titanium implant components, FDA approved",
          aiFollowUp: "Understood — implantable devices need cleanroom manufacturing and biocompatible materials. Here are my top suggestions:"
        },
        {
          step: 2,
          aiPrompt: "",
          userResponse: "",
          aiFollowUp: "",
          aiSuggestions: [
            "Titanium Bone Screws — ISO 13485 + FDA registered",
            "Spinal Cage Implants — Cleanroom Class 7, Ti-6Al-4V",
            "Dental Abutments — Medical-grade, CNC 5-axis"
          ]
        }
      ]
    },
    {
      steps: [
        {
          step: 1,
          aiPrompt: "Hi! Tell me what you're sourcing — I'll guide you to the best match.",
          userResponse: "High-reliability PCBs for satellite communication",
          aiFollowUp: "Space-grade electronics — that means stringent testing and AS9100 compliance. Based on your requirements, I suggest:"
        },
        {
          step: 2,
          aiPrompt: "",
          userResponse: "",
          aiFollowUp: "",
          aiSuggestions: [
            "Multi-layer HDI PCBs — IPC Class 3, AS9100D",
            "RF/Microwave Boards — PTFE substrate, space-qualified",
            "Flex-Rigid Assemblies — Hi-Rel, conformal coated"
          ]
        }
      ]
    }
  ];

  // Hero carousel images
  const heroImages = [
    { src: procurementFemaleEuropean, alt: 'Procurement Specialist - Europe' },
    { src: procurementMaleAsian, alt: 'Supply Chain Manager - Asia' },
    { src: procurementFemaleBlonde, alt: 'Sourcing Manager - Germany' },
    { src: procurementMaleLatin, alt: 'Procurement Director - Latin America' },
    { src: procurementFemaleAfrican, alt: 'Strategic Buyer - Africa' },
    { src: procurementMaleSouthAsian, alt: 'Category Manager - South Asia' },
    { src: procurementFemaleAsian, alt: 'Global Sourcing Lead - Asia Pacific' },
    { src: procurementMaleEuropean, alt: 'Purchasing Manager - Europe' },
  ];

  // Auto-advance hero carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      isRunningRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Prevent multiple conversations from running
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    const runConversation = () => {
      const steps = scenarios[currentScenario].steps;
      
      const t1 = setTimeout(() => {
        typeAiMessage(steps[0].aiPrompt, () => {
          const t2 = setTimeout(() => {
            typeUserMessage(steps[0].userResponse, () => {
              const t3 = setTimeout(() => {
                typeAiMessage(steps[0].aiFollowUp, () => {
                  const t4 = setTimeout(() => {
                    setCurrentStep(2);
                    // AI suggests products instead of user typing again
                    const suggestions = (steps[1] as any).aiSuggestions as string[];
                    if (suggestions) {
                      setConversationHistory(prev => [...prev, { role: 'ai', message: suggestions.join('\n') }]);
                    }
                    const t5 = setTimeout(() => {
                      setShowResults(true);
                      const t6 = setTimeout(() => {
                        setIsFading(true);
                        const t7 = setTimeout(() => {
                          setShowResults(false);
                          setConversationHistory([]);
                          setCurrentStep(1);
                          setIsFading(false);
                          isRunningRef.current = false;
                          setCurrentScenario((prev) => (prev + 1) % scenarios.length);
                        }, 400);
                        timeoutsRef.current.push(t7);
                      }, 3000);
                      timeoutsRef.current.push(t6);
                    }, 1200);
                    timeoutsRef.current.push(t5);
                  }, 700);
                  timeoutsRef.current.push(t4);
                });
              }, 800);
              timeoutsRef.current.push(t3);
            });
          }, 600);
          timeoutsRef.current.push(t2);
        });
      }, 400);
      timeoutsRef.current.push(t1);
    };

    runConversation();
  }, [currentScenario]);

  const typeAiMessage = (message: string, onComplete: () => void) => {
    setIsTyping(true);
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setAiResponse(message.slice(0, currentIndex));
        currentIndex += 2;
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setConversationHistory(prev => [...prev, { role: 'ai', message }]);
        setAiResponse("");
        onComplete();
      }
    }, 15);
  };

  const typeUserMessage = (message: string, onComplete: () => void) => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setUserInput(message.slice(0, currentIndex));
        currentIndex += 2;
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(typingInterval);
        setConversationHistory(prev => [...prev, { role: 'user', message }]);
        setUserInput("");
        onComplete();
      }
    }, 25);
  };

// Window Chrome Component for mockups
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] overflow-hidden flex flex-col shadow-xl border border-gray-200">
    <div className="h-8 bg-white flex items-center px-3 border-b border-gray-200 flex-shrink-0">
      <div className="flex gap-1.5 mr-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[10px] text-gray-500 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// AI Search Mockup Component
const AISearchMockup = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messages = [
    { role: 'ai', text: "What type of product or service are you looking for?" },
    { role: 'user', text: "CNC machining for automotive brake components" },
    { role: 'ai', text: "For automotive brake components, what certifications do you require?" },
    { role: 'user', text: "IATF 16949, ISO 9001, capacity for 50,000 units/month" },
  ];

  return (
    <WindowChrome title="SearchPro+ — AI Assistant">
      <div className="h-full bg-white p-4 flex flex-col">
        <div className="flex-1 space-y-3 overflow-hidden">
          {messages.slice(0, step + 1).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 bg-primary/20 flex items-center justify-center">
                      <span className="text-[6px] text-primary font-bold">AI</span>
                    </div>
                    <span className="text-[10px] font-medium text-primary">YVOO</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-3 bg-primary/5 border border-primary/20"
            >
              <p className="text-xs font-medium text-primary mb-2">Searching 25M+ suppliers...</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white text-[10px] border">IATF 16949</span>
                <span className="px-2 py-1 bg-white text-[10px] border">50K units</span>
                <span className="px-2 py-1 bg-white text-[10px] border">Automotive</span>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-10 bg-gray-50 border border-gray-200 flex items-center px-3">
            <span className="text-gray-400 text-sm">Type your requirements...</span>
          </div>
          <div className="w-10 h-10 bg-primary flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Supplier Profile Mockup Component
const SupplierProfileMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <WindowChrome title="SearchPro+ — Supplier Profile">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">PM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900">Precision Metalworks GmbH</h3>
              <span className="px-1.5 py-0.5 bg-secondary/20 text-secondary text-[10px] font-medium">94% Match</span>
            </div>
            <p className="text-xs text-gray-500">Munich, Germany • Est. 1987</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 border-b border-gray-100">
          {['Capabilities', 'Certifications', 'Equipment'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-2 text-xs font-medium transition-colors ${
                activeTab === i ? 'text-primary border-b-2 border-primary' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          {activeTab === 0 && (
            <>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">5-Axis CNC Machining</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Precision Grinding (±0.005mm)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50">
                <Check className="w-3 h-3 text-primary" />
                <span className="text-xs">Brake Component Expertise</span>
              </div>
            </>
          )}
          {activeTab === 1 && (
            <>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">IATF 16949:2016</span>
                <span className="text-[10px] text-secondary">Valid until 2026</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 9001:2015</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50">
                <span className="text-xs font-medium">ISO 14001</span>
                <span className="text-[10px] text-secondary">Valid until 2025</span>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">DMG MORI NLX 2500</p>
                <p className="text-[10px] text-gray-500">5-Axis CNC • 2021</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Zeiss CMM Contura</p>
                <p className="text-[10px] text-gray-500">Quality Measurement • 2022</p>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="text-xs font-medium">Surface Grinder Okamoto</p>
                <p className="text-[10px] text-gray-500">Precision Grinding • 2019</p>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">
            Request Quote
          </button>
          <button className="flex-1 py-2 border border-gray-200 text-xs font-medium">
            Order Audit
          </button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Comparison Mockup Component
const ComparisonMockup = () => {
  const [selectedCount, setSelectedCount] = useState(2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedCount((prev) => prev === 2 ? 3 : 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const suppliers = [
    { name: "Precision Metalworks", match: 94, cert: "IATF 16949", capacity: "60K/mo" },
    { name: "AutoParts Bavaria", match: 89, cert: "IATF 16949", capacity: "45K/mo" },
    { name: "CNC Masters", match: 82, cert: "ISO 9001", capacity: "80K/mo" },
  ];

  return (
    <WindowChrome title="SearchPro+ — Compare Suppliers">
      <div className="h-full bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Comparison Table</h3>
            <p className="text-[10px] text-gray-500">{selectedCount} suppliers selected</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-white text-[10px] font-medium flex items-center gap-1">
              Export
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-medium text-gray-500">Criteria</th>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <th key={i} className="text-left py-2 font-medium text-gray-900">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Match Score</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">
                    <span className={`font-bold ${s.match >= 90 ? 'text-secondary' : 'text-primary'}`}>
                      {s.match}%
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Certification</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.cert}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-2 text-gray-500">Capacity</td>
                {suppliers.slice(0, selectedCount).map((s, i) => (
                  <td key={i} className="py-2">{s.capacity}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2 bg-gray-100 text-xs font-medium">Add to List</button>
          <button className="flex-1 py-2 bg-primary text-white text-xs font-medium">Send RFQ</button>
        </div>

        {/* Export formats */}
        <div className="mt-3 flex gap-2">
          {['CSV', 'Excel', 'PDF'].map((fmt) => (
            <span key={fmt} className="px-2 py-1 bg-gray-50 text-[10px] text-gray-600">{fmt}</span>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
};

  // Supplier database organized by industry/scenario
  const allSuppliers = {
    // Scenario 0: CNC Machining / Automotive
    cnc_automotive: [
      {
        id: 1,
        name: "Precision CNC Solutions",
        location: "Stuttgart, Germany",
        size: "250-500",
        specialties: "Automotive, ISO 9001, TS16949",
        description: "Leading CNC machining specialist with 25+ years experience in automotive precision components",
        certifications: ["ISO 9001:2015", "IATF 16949:2016", "ISO 14001"],
        capabilities: ["5-axis CNC machining", "Aluminum & Steel processing", "Medium to high-volume production", "Quality inspection", "Surface treatment"],
        experience: "25+ years in automotive sector",
        capacity: "Medium to high-volume production (10,000-100,000 units/month)",
        equipment: ["DMG Mori 5-axis machines", "Mazak CNC centers", "CMM inspection systems"],
        founded: 1998,
        employees: 380,
        revenue: "€45-50M annually"
      },
      {
        id: 2,
        name: "TechMold Industries",
        location: "Shanghai, China",
        size: "500-1000",
        specialties: "Injection Molding, IATF 16949",
        description: "Advanced manufacturing facility specializing in precision CNC and automotive components",
        certifications: ["IATF 16949:2016", "ISO 9001:2015", "TS 16949"],
        capabilities: ["CNC machining", "Injection molding", "Tool & die making", "Assembly services", "Quality control"],
        experience: "18+ years in automotive sector",
        capacity: "High-volume production (100,000+ units/month)",
        equipment: ["Haas CNC machines", "Injection molding presses", "Automated inspection"],
        founded: 2005,
        employees: 720,
        revenue: "¥280-300M annually"
      },
      {
        id: 3,
        name: "AutoPrecision GmbH",
        location: "Munich, Germany",
        size: "150-300",
        specialties: "Automotive CNC, ISO 9001",
        description: "Specialized in high-precision automotive CNC machining with advanced quality systems",
        certifications: ["ISO 9001:2015", "IATF 16949:2016", "VDA 6.3"],
        capabilities: ["Multi-axis CNC", "Automotive components", "In-process inspection", "Heat treatment", "Prototype to production"],
        experience: "20+ years in automotive manufacturing",
        capacity: "Medium-volume production (25,000-75,000 units/month)",
        equipment: ["Fanuc CNC machines", "Coordinate measuring machines", "Quality labs"],
        founded: 2003,
        employees: 215,
        revenue: "€28-32M annually"
      },
      {
        id: 4,
        name: "DriveComponents Ltd",
        location: "Birmingham, UK",
        size: "200-400",
        specialties: "Automotive, IATF 16949",
        description: "UK-based automotive component specialist with strong quality management",
        certifications: ["IATF 16949:2016", "ISO 9001:2015", "ISO 14001"],
        capabilities: ["CNC turning & milling", "Automotive assembly", "Supply chain management", "JIT delivery", "Engineering support"],
        experience: "22+ years serving automotive OEMs",
        capacity: "High-volume production (50,000-150,000 units/month)",
        equipment: ["Mazak multi-tasking machines", "Robotic automation", "Vision inspection systems"],
        founded: 2001,
        employees: 340,
        revenue: "£35-40M annually"
      }
    ],
    // Scenario 1: Medical Device Components
    medical_devices: [
      {
        id: 11,
        name: "MediParts GmbH",
        location: "Munich, Germany",
        size: "100-250",
        specialties: "Medical Devices, GMP, ISO 13485",
        description: "Specialized in medical-grade precision components with cleanroom manufacturing",
        certifications: ["ISO 13485:2016", "ISO 9001:2015", "GMP", "FDA Registered"],
        capabilities: ["Precision CNC machining", "Medical-grade materials", "Cleanroom production", "Validation services", "Regulatory compliance"],
        experience: "15+ years in medical device manufacturing",
        capacity: "Low to medium-volume production (5,000-50,000 units/month)",
        equipment: ["5-axis CNC machines", "Cleanroom facilities Class 7", "Validation equipment"],
        founded: 2008,
        employees: 185,
        revenue: "€18-22M annually"
      },
      {
        id: 12,
        name: "BioTech Precision SA",
        location: "Geneva, Switzerland",
        size: "80-150",
        specialties: "Implantable devices, ISO 13485, FDA",
        description: "Swiss precision manufacturer specializing in implantable medical components",
        certifications: ["ISO 13485:2016", "FDA Registered", "CE Mark", "GMP"],
        capabilities: ["Micro-machining", "Implant-grade materials", "Cleanroom Class 5", "Biocompatibility testing", "Full traceability"],
        experience: "18+ years in implantable devices",
        capacity: "Low-volume high-precision (2,000-15,000 units/month)",
        equipment: ["Swiss-type lathes", "Cleanroom production", "Advanced metrology"],
        founded: 2006,
        employees: 125,
        revenue: "CHF 22-26M annually"
      },
      {
        id: 13,
        name: "MedTech Components Inc",
        location: "Boston, MA, USA",
        size: "150-300",
        specialties: "Medical devices, FDA, cleanroom",
        description: "US-based medical component manufacturer with extensive FDA experience",
        certifications: ["ISO 13485:2016", "FDA Registered", "ISO 9001:2015", "ISO 14971"],
        capabilities: ["Medical machining", "Cleanroom assembly", "Sterilization validation", "Design transfer", "Quality systems"],
        experience: "20+ years FDA-regulated manufacturing",
        capacity: "Medium-volume production (10,000-40,000 units/month)",
        equipment: ["Medical-grade CNC", "Class 7 cleanrooms", "Automated inspection"],
        founded: 2003,
        employees: 245,
        revenue: "$32-38M annually"
      },
      {
        id: 14,
        name: "SurgiPrecision Ltd",
        location: "Dublin, Ireland",
        size: "90-180",
        specialties: "Surgical instruments, ISO 13485",
        description: "European leader in surgical instrument and implant component manufacturing",
        certifications: ["ISO 13485:2016", "CE Mark", "FDA Registered", "ISO 9001:2015"],
        capabilities: ["Surgical components", "Implantable parts", "Cleanroom manufacturing", "Material certification", "Regulatory support"],
        experience: "12+ years in surgical devices",
        capacity: "Low to medium-volume (8,000-35,000 units/month)",
        equipment: ["Precision CNC centers", "Cleanroom Class 7", "Surface finishing"],
        founded: 2012,
        employees: 160,
        revenue: "€15-19M annually"
      }
    ],
    // Scenario 2: Electronics Assembly / PCB
    electronics_pcb: [
      {
        id: 21,
        name: "CircuitPro Manufacturing",
        location: "Shenzhen, China",
        size: "800-1500",
        specialties: "PCB Assembly, IPC-A-610 Class 3",
        description: "Leading electronics manufacturer specializing in high-reliability PCB assembly for aerospace",
        certifications: ["IPC-A-610 Class 3", "AS9100D", "ISO 9001:2015", "ITAR Registered"],
        capabilities: ["SMT assembly", "Through-hole assembly", "X-ray inspection", "Conformal coating", "Aerospace PCBs"],
        experience: "15+ years in aerospace electronics",
        capacity: "High-volume production (500,000+ boards/month)",
        equipment: ["Fuji SMT lines", "AOI systems", "X-ray inspection", "Wave soldering"],
        founded: 2008,
        employees: 1200,
        revenue: "¥450-500M annually"
      },
      {
        id: 22,
        name: "AeroElectronics GmbH",
        location: "Hamburg, Germany",
        size: "300-600",
        specialties: "Aerospace PCB, AS9100, IPC Class 3",
        description: "German precision electronics for aerospace with stringent quality standards",
        certifications: ["AS9100D", "IPC-A-610 Class 3", "EN 9100", "ISO 9001:2015"],
        capabilities: ["Complex PCB assembly", "Box build", "Environmental testing", "DO-254 compliance", "Aerospace certification"],
        experience: "22+ years in aerospace electronics",
        capacity: "Medium-volume (50,000-200,000 boards/month)",
        equipment: ["High-precision SMT", "Flying probe test", "Environmental chambers"],
        founded: 2001,
        employees: 485,
        revenue: "€58-65M annually"
      },
      {
        id: 23,
        name: "Precision Electronics Ltd",
        location: "San Jose, CA, USA",
        size: "400-800",
        specialties: "IPC Class 3, aerospace PCB",
        description: "Silicon Valley electronics manufacturer with aerospace and defense expertise",
        certifications: ["IPC-A-610 Class 3", "AS9100D", "ITAR", "J-STD-001"],
        capabilities: ["High-reliability PCB", "Conformal coating", "Potting services", "Rework & repair", "Full traceability"],
        experience: "18+ years aerospace & defense",
        capacity: "Medium to high-volume (100,000-400,000 boards/month)",
        equipment: ["Mycronic SMT", "3D AOI", "X-ray systems", "ESD protected"],
        founded: 2006,
        employees: 620,
        revenue: "$72-82M annually"
      },
      {
        id: 24,
        name: "SkyCircuits International",
        location: "Toulouse, France",
        size: "250-500",
        specialties: "Aerospace electronics, AS9100",
        description: "French aerospace electronics specialist with European certification expertise",
        certifications: ["AS9100D", "IPC-A-610 Class 3", "EN 9100", "NADCAP Electronics"],
        capabilities: ["Aerospace PCB assembly", "Cable harness", "System integration", "Qualification testing", "Design support"],
        experience: "25+ years in aerospace",
        capacity: "Low to medium-volume (30,000-120,000 boards/month)",
        equipment: ["Advanced SMT lines", "Flying probe", "Boundary scan", "Climate testing"],
        founded: 1998,
        employees: 410,
        revenue: "€48-55M annually"
      }
    ]
  };

  // Get suppliers for current scenario
  const getRelevantSuppliers = () => {
    switch(currentScenario) {
      case 0: return allSuppliers.cnc_automotive;
      case 1: return allSuppliers.medical_devices;
      case 2: return allSuppliers.electronics_pcb;
      default: return allSuppliers.cnc_automotive;
    }
  };

  const suppliers = getRelevantSuppliers();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Clean White, matching Homepage */}
      <section 
        data-nav-theme="light"
        className="relative min-h-[100dvh] flex flex-col bg-white"
      >
        {/* Main Content */}
        <div className="flex-1 flex items-center relative z-10 pt-20 md:pt-32 lg:pt-40 min-h-0">
          <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm text-foreground/50 font-mono tracking-wide mb-4 md:mb-6"
              >
                Conversational Search
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
              >
                AI-guided<br />
                supplier discovery
              </motion.h1>

              {/* Subtitle + CTA - right-offset like Archlet */}
              <div className="mt-8 md:mt-12 lg:mt-16 ml-[28%] md:ml-[30%] lg:ml-[50%] max-w-xl">
                {/* Subtitle with checkmarks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-wrap gap-4 mb-6 md:mb-8"
                >
                  {["25+ million profiles", "Verified data", "Export ready"].map((text, index) => (
                    <div key={index} className="flex items-center gap-2 text-foreground/70">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="w-full sm:w-auto text-lg">
                    <a href="#">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Industry Band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...["Built for high‑performance B2B Supply Chains", "Automotive", "Aerospace", "Medical Devices", "Pharma", "Electronics", "Energy", "Chemical", "Industrial Manufacturing", "Precision Engineering", "Defense", "Rail & Transport"], ...["Built for high‑performance B2B Supply Chains", "Automotive", "Aerospace", "Medical Devices", "Pharma", "Electronics", "Energy", "Chemical", "Industrial Manufacturing", "Precision Engineering", "Defense", "Rail & Transport"]].map((item, i) => (
              <span
                key={i}
                className={`mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase ${
                  item.startsWith("Built")
                    ? "font-bold text-foreground"
                    : "font-bold text-foreground/80"
                }`}
              >
                {item}
                <span className="ml-6 md:ml-10 text-foreground/20">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

        {/* Interactive Demo Section - White Background */}
        <section className="py-24 bg-white" data-nav-theme="light">
          <div className="container mx-auto px-6 lg:px-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="section-headline text-foreground mb-4 max-w-xl">
              Try SearchPro+ in Action
            </h2>
            <p className="text-muted-foreground text-lg">
              From conversational search to verified supplier intelligence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <SearchProDemoWindows />
          </motion.div>
        </div>
      </section>

      {/* Stats Section - BeFound KPI Style */}
      <section className="pt-16 md:pt-96 pb-8 md:pb-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 md:px-6 lg:px-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <h2 className="section-headline text-foreground mb-3 max-w-3xl">
              Your next supplier, just a click away
            </h2>
          </motion.div>

          {/* KPI Grid 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
            {[
              {
                category: "Research efficiency",
                stat: "10x",
                description: "Faster supplier research with AI-based ranking and always up-to-date data"
              },
              {
                category: "Global coverage",
                stat: "25M+",
                description: "Supplier profiles across industries and niche technologies worldwide"
              },
              {
                category: "Search depth",
                stat: "100x",
                description: "More results per query with SearchPro+ for greater variety and higher match rates"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="pb-12"
              >
                <p className="text-sm text-foreground/50 font-mono tracking-wide uppercase mb-2">
                  {item.category}
                </p>
                <div className="border-t border-foreground/20 pt-4">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                    {item.stat}
                  </p>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section - Beyond Discovery */}
      <section className="py-24 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Beyond discovery: from search to verified partnership
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-20 max-w-2xl"
          >
            Other platforms stop at search results. We take you from discovery through on-site verification to continuous supplier development.
          </motion.p>
          
          {/* Step 1 - AI Discovery */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">01</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Discovery</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                AI-powered supplier discovery
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Describe your requirements in plain language. Our AI extracts technical specifications, certifications, and capacity needs to find matching suppliers from 25M+ profiles.
              </p>
              <ul className="space-y-3">
                {[
                  "Conversational search understands complex requirements",
                  "Multi-factor matching across 20+ criteria",
                  "Real-time results from verified databases"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <AISearchMockup />
            </motion.div>
          </div>

          {/* Step 2 - On-Site Audits */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <AuditOrderMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">02</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Verification</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Order on-site audits instantly
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Don't rely on self-reported data. Order professional on-site audits directly from the platform. Our certified auditors verify equipment, certifications, and capabilities in person.
              </p>
              <ul className="space-y-3">
                {[
                  "2,500+ certified auditors in 95+ countries",
                  "Process, quality, and full assessment options",
                  "Reports delivered within 5 business days"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Step 3 - Ground Truth Intelligence */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">03</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Intelligence</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ground truth data you can trust
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every audit generates verified intelligence: confirmed equipment, validated certifications, actual production capacity. No more guessing—know exactly what your suppliers can deliver.
              </p>
              <ul className="space-y-3">
                {[
                  "Equipment verified through on-site inspection",
                  "Certificates validated for authenticity and scope",
                  "Capacity confirmed with production evidence"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GroundTruthMockup />
            </motion.div>
          </div>

          {/* Step 4 - Supplier Development */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <SupplierDevelopmentMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-primary text-white text-sm font-bold flex items-center justify-center">04</span>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Development</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Continuous supplier development
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Turn audit findings into improvement actions. Track progress, schedule follow-ups, and monitor supplier development over time. Build partnerships, not just transactions.
              </p>
              <ul className="space-y-3">
                {[
                  "Structured improvement action tracking",
                  "Automated follow-up audit scheduling",
                  "Performance trending and risk monitoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section - BeFound Style Benefits Cards */}
      <section className="py-16 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Conversational Workflow",
                description: "7-step intelligent dialogue that transforms vague requirements into precise technical specifications with materials and certifications."
              },
              {
                title: "Triple-Source Architecture",
                description: "Simultaneous search across verified databases, research platforms, and real-time web discovery for comprehensive market coverage."
              },
              {
                title: "Smart Preference Engine",
                description: "AI learns your industry requirements and automatically prioritizes suppliers with relevant certifications and experience."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden"
              >
                <div className="h-2 bg-primary w-full mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 AI Features Section - BeFound Style */}
      <section className="py-24 md:py-32 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Eight features that transform procurement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-16 max-w-2xl"
          >
            Built to eliminate manual work and deliver precision matching across global supplier networks.
          </motion.p>

          {/* Features Grid - 2x4 Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                title: "AI Preference Engine",
                description: "Automatically recognizes your requirements and preferences based on your profile, prioritizing certified suppliers for your industry.",
                detailedExplanation: {
                  overview: "The AI Preference Engine learns from your search history, industry focus, and organizational requirements to intelligently prioritize supplier recommendations.",
                  forEngineers: "Advanced machine learning algorithms analyze technical specifications, material requirements, and process capabilities from your past searches to predict ideal supplier matches.",
                  forBuyers: "The engine automatically filters suppliers based on your company's preferred certifications, geographic preferences, and volume requirements.",
                  forAuditors: "Compliance-first filtering ensures recommended suppliers meet your industry's mandatory certifications before presentation.",
                  example: "Automotive procurement teams searching for precision components will automatically see TS16949-certified suppliers ranked higher."
                }
              },
              {
                number: "02",
                title: "Intelligent Requirement Capture",
                description: "Extracts specifications from natural language or uploaded documents, converting CAD drawings into searchable requirements.",
                detailedExplanation: {
                  overview: "Transform unstructured information into precise, searchable supplier requirements automatically.",
                  forEngineers: "Upload technical drawings and the AI extracts tolerances, material specifications, and geometric tolerances.",
                  forBuyers: "Eliminate hours of manual RFQ preparation. Simply describe what you need in plain language.",
                  forAuditors: "Automatically identify compliance requirements embedded in technical documents.",
                  example: "Upload a valve assembly drawing and the AI extracts material specs, compliance requirements, and testing standards."
                }
              },
              {
                number: "03",
                title: "Multi-Factor Matching",
                description: "Evaluates suppliers across 20+ criteria including industry, location, certifications, capacity, and experience simultaneously.",
                detailedExplanation: {
                  overview: "Simultaneous evaluation across 20+ criteria to identify optimal supplier matches.",
                  forEngineers: "Technical matching evaluates material processing capabilities, tolerance capabilities, and testing equipment.",
                  forBuyers: "Strategic sourcing criteria include MOQs, payment terms, Incoterms, and multi-site capacity.",
                  forAuditors: "Compliance matching cross-references industry certifications and environmental standards.",
                  example: "Sourcing a complex part returns only suppliers meeting ALL criteria, not partial matches."
                }
              },
              {
                number: "04",
                title: "Explainable AI",
                description: "Transparent reasoning for every recommendation, showing exactly why suppliers match your requirements.",
                detailedExplanation: {
                  overview: "Every recommendation includes detailed justification with matching scores and potential gaps.",
                  forEngineers: "See technical match percentages for each requirement with clear gap analysis.",
                  forBuyers: "Understand trade-offs clearly with explanations of why lower-scored options differ.",
                  forAuditors: "Compliance transparency shows certification status, audit dates, and gaps.",
                  example: "Why Supplier X recommended: Technical match 94%, Location +15 points, Certification +20 points."
                }
              },
              {
                number: "05",
                title: "Smart Deduplication",
                description: "Automatically recognizes and merges identical suppliers listed under different names or variations.",
                detailedExplanation: {
                  overview: "Entity resolution identifies when different records refer to the same supplier.",
                  forEngineers: "Consolidates technical data from multiple sources into one complete profile.",
                  forBuyers: "Prevents duplicate RFQs and consolidates past performance data.",
                  forAuditors: "Links certification records across name variations for complete audit histories.",
                  example: "System recognizes 'Müller GmbH' and 'Mueller Group' as the same entity."
                }
              },
              {
                number: "06",
                title: "Dynamic Results",
                description: "Returns only genuinely relevant matches—no filler. If 7 suppliers meet criteria, you see 7, not 50 with poor matches.",
                detailedExplanation: {
                  overview: "Quality over quantity: returns only suppliers that genuinely meet requirements.",
                  forEngineers: "No more sifting through irrelevant suppliers to find qualified ones.",
                  forBuyers: "Receive a pre-qualified list instead of reviewing 50+ suppliers to shortlist 5.",
                  forAuditors: "Only audit-ready suppliers appear, optimizing resource allocation.",
                  example: "Search for specialized valves returns 3 suppliers because only 3 meet ALL criteria."
                }
              },
              {
                number: "07",
                title: "Real-Time Data Enrichment",
                description: "Continuous updating of supplier profiles with verified capabilities, certifications, and ground truth data from audits.",
                detailedExplanation: {
                  overview: "Continuously updated database with verified ground truth from audits.",
                  forEngineers: "Supplier profiles updated after site visits with verified equipment details.",
                  forBuyers: "Access supplier data verified through actual site visits and audits.",
                  forAuditors: "Contribute to and benefit from a growing database of verified information.",
                  example: "After facility audit, profile reflects actual equipment and certifications observed."
                }
              },
              {
                number: "08",
                title: "Alternative Term Discovery",
                description: "Identifies related terms for complete market coverage. 'Die casting' expands to include global equivalents.",
                detailedExplanation: {
                  overview: "AI searches all equivalent terms across regions and languages.",
                  forEngineers: "'CNC milling' also searches 'machining center', 'Fraesen', 'fraisage'.",
                  forBuyers: "'Sheet metal fabrication' includes 'metal stamping', 'presswork'.",
                  forAuditors: "'ISO 9001' includes '2015', '2008 transition', 'EN ISO 9001' variants.",
                  example: "'Investment casting' finds 47 suppliers globally vs 12 with exact term only."
                }
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedAIFeature(feature)}
                className="group cursor-pointer border-t border-foreground/10 pt-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono text-muted-foreground">{feature.number}</span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Differentiator Section */}
      <section className="py-20 px-6 bg-background" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-6 max-w-3xl"
          >
            Beyond discovery: the only end-to-end supplier platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-16 max-w-2xl"
          >
            Competitors stop at search results. We deliver verified ground truth through audits, continuous intelligence, and supplier development.
          </motion.p>

          {/* End-to-End Pipeline Visual */}
          <div className="grid md:grid-cols-5 gap-4 mb-16">
            {[
              { step: "01", title: "Discovery", description: "AI-powered search across 25M+ suppliers", icon: "🔍" },
              { step: "02", title: "Audits", description: "On-site verification by certified auditors", icon: "✓" },
              { step: "03", title: "Intelligence", description: "Ground truth data from real facility visits", icon: "📊" },
              { step: "04", title: "Development", description: "Continuous supplier improvement tracking", icon: "📈" },
              { step: "05", title: "Control", description: "Ongoing compliance and performance monitoring", icon: "🛡️" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-2 bg-primary w-full mb-4" />
                <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - BeFound 3-Column Style */}
      <section className="py-20 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground mb-12 max-w-3xl"
          >
            From database searches to verified partnerships
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-0 items-stretch">
            {/* Stat Card - Primary Color Background */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 flex flex-col justify-between aspect-square"
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              {/* Stat */}
              <div>
                <p className="text-5xl md:text-6xl font-bold text-white tracking-[-0.02em]">
                  100%
                </p>
                <p className="text-xl text-white/90 font-medium mt-2">
                  verified ground truth data
                </p>
              </div>
            </motion.div>
            
            {/* Portrait Photo - Square */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square bg-muted overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" 
                alt="Michael Weber - VP of Procurement"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Quote Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 flex flex-col justify-center space-y-6 bg-white"
            >
              {/* Company Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background text-xs font-bold">TI</span>
                </div>
                <span className="text-lg font-bold text-foreground tracking-wide">TECHNIK INDUSTRIES</span>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed">
                "Other platforms gave us lists. YVOO gave us verified partners. The on-site audits and continuous intelligence mean we're not just finding suppliers—we're building relationships based on real data, not claims."
              </blockquote>
              
              {/* Attribution */}
              <div>
                <p className="font-semibold text-foreground">Michael Weber,</p>
                <p className="text-sm text-primary">VP of Global Procurement</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - End-to-End Value KPIs */}
      <section className="py-32 px-6 bg-white" data-nav-theme="light">
        <div className="container mx-auto max-w-7xl">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-foreground max-w-3xl mb-16"
          >
            The complete supplier lifecycle in one platform
          </motion.h2>

          {/* KPI Grid 2x2 */}
          <div className="grid md:grid-cols-2 gap-x-12">
            {/* KPI 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Discovery to verification</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  5 days
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  From supplier search to on-site audit completion with verified ground truth
                </p>
              </div>
            </motion.div>

            {/* KPI 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Ground truth audits</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  12K+
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  On-site audits completed with verified equipment, certifications, and capabilities
                </p>
              </div>
            </motion.div>

            {/* KPI 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Supplier development</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  35%
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Average improvement in supplier performance through continuous monitoring
                </p>
              </div>
            </motion.div>

            {/* KPI 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="pb-12"
            >
              <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">Risk reduction</p>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                  60%
                </p>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  Reduction in supplier quality incidents through proactive intelligence
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors rounded-lg"
            >
              See the full platform
            </a>
          </motion.div>
        </div>
      </section>

      {/* How Procurement Teams Use YVOO Search - Industry Showcase Section */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          {/* Header - offmenu.design "Projects" Style */}
          <div className="relative">
            {/* Giant Background Text - positioned to sit just above the cards */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-end justify-center pointer-events-none overflow-visible mb-[-40px] sm:mb-[-60px] md:mb-[-100px] lg:mb-[-140px]"
            >
              <motion.span 
                style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -60]) }}
                className="text-[120px] sm:text-[180px] md:text-[260px] lg:text-[340px] font-bold leading-[0.75] tracking-[-0.04em] select-none whitespace-nowrap bg-clip-text text-transparent"
              >
                <span
                  style={{ 
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.08) 30%, rgba(0, 0, 0, 0.03) 70%, rgba(0, 0, 0, 0) 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Projects
                </span>
              </motion.span>
            </motion.div>
          </div>

          {/* Product Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Large card - CNC Machined Parts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                <img 
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80" 
                  alt="CNC Machined Parts"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Precision Machining
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 leading-tight">
                    CNC Machined Components
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-3">
                    Find IATF 16949 certified suppliers for precision automotive and aerospace parts with 5-axis capabilities.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">2,400+ verified suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top right - Medical Device Components */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80" 
                  alt="Medical Device Components"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Medical Devices
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight">
                    Implantable Components
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 mb-3">
                    ISO 13485 certified cleanroom manufacturing for surgical instruments and implants.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">680+ suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom right - Electronics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" 
                  alt="PCB Assembly"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3">
                    Electronics
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1.5 leading-tight">
                    PCB Assembly & EMS
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 mb-3">
                    IPC Class 3 certified assembly with full AOI and X-ray inspection capabilities.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-xs font-medium">1,850+ suppliers</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full width bottom card - Industrial Valves */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative w-full overflow-hidden cursor-pointer mt-4 md:mt-6 max-w-7xl mx-auto"
          >
            <div className="relative overflow-hidden aspect-[21/9] md:aspect-[3/1]">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80" 
                alt="Industrial Valves & Process Equipment"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 top-0 flex flex-col justify-center p-6 md:p-10 lg:p-12 max-w-xl z-10">
                <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[10px] font-medium text-white uppercase tracking-wider mb-3 w-fit">
                  Process Industry
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                  Industrial Valves & Flow Control
                </h3>
                <p className="text-white/70 text-sm md:text-base line-clamp-2 hidden md:block">
                  Source cryogenic valves, safety relief systems, and control valves from API 6D and EN certified manufacturers.
                </p>
                <div className="flex items-center gap-2 mt-4 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">920+ verified suppliers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Matching Homepage Style with Categories */}
      <SearchSuppliersFAQ />

      {/* CTA Section - Matching Homepage Style */}
      <section 
        data-nav-theme="light"
        className="relative py-20 md:py-32 overflow-hidden bg-white"
      >
        <div className="container mx-auto px-6 md:px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Start Your Search</span>
              </div>
              
              <h2 className="section-headline text-foreground mb-6">
                Find your next supplier partner
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of procurement professionals discovering and verifying suppliers with AI
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-[#ebebeb] shadow-lg p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl mx-auto mb-8"
            >
              <div className="flex items-center gap-3 flex-1 px-4">
                <input
                  type="text"
                  placeholder="What are you looking for? (e.g., CNC machining, ISO 9001...)"
                  className="flex-1 outline-none text-base text-foreground bg-transparent py-3 placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="group">
                Start Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-2 justify-center flex-wrap text-sm text-muted-foreground"
            >
              <span>Popular:</span>
              {["CNC Machining", "Injection Molding", "PCB Assembly", "Metal Stamping"].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground hover:bg-[#e5e5e5] transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Feature Detail Modal */}
      <FeatureModal 
        feature={selectedAIFeature} 
        onClose={() => setSelectedAIFeature(null)} 
      />

      {/* Supplier Detail Modal */}
      <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 md:mx-auto">
          {selectedSupplier && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {selectedSupplier.name}
                    </DialogTitle>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                      <span>{selectedSupplier.location}</span>
                      <span>{selectedSupplier.employees} employees</span>
                      <span>Founded {selectedSupplier.founded}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">{selectedSupplier.description}</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Experience</p>
                    <p className="text-lg font-bold text-primary">{selectedSupplier.experience}</p>
                </div>
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Production Capacity</p>
                    <p className="text-sm font-semibold text-gray-700">{selectedSupplier.capacity}</p>
                </div>
                <div className="bg-[#ebebeb] p-4">
                    <p className="text-xs text-gray-600 mb-1">Annual Revenue</p>
                    <p className="text-lg font-bold text-gray-700">{selectedSupplier.revenue}</p>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Certifications & Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.certifications.map((cert: string) => (
                    <Badge key={cert} className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSupplier.capabilities.map((capability: string) => (
                    <div key={capability} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Equipment & Technology
                </h3>
                <div className="space-y-2">
                  {selectedSupplier.equipment.map((equip: string) => (
                    <div key={equip} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{equip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button className="flex-1" size="lg">
                  Request Quote
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  Schedule Audit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchSuppliers;
