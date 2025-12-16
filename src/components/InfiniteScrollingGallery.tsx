import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { motion } from "framer-motion";

// Import images for mockups
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import evidenceImg1 from "@/assets/auditor-factory-team.jpg";
import evidenceImg2 from "@/assets/factory-hero-background.jpg";
import evidenceImg3 from "@/assets/industry-electronics.jpg";

interface Capability {
  title: string;
  description: string;
  detailedDescription: string;
  mockupType: 'template' | 'ai' | 'equipment' | 'scoring' | 'evidence' | 'progress';
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    detailedDescription: "Build audit templates tailored to specific industries, international standards (ISO 9001, IATF 16949, AS9100), or customer-specific requirements.",
    mockupType: 'template'
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    detailedDescription: "AI-powered contextual assistance guides auditors through complex assessments in real-time.",
    mockupType: 'ai'
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    detailedDescription: "Advanced computer vision automatically identifies machinery, equipment, and assets from photos taken during audits.",
    mockupType: 'equipment'
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    detailedDescription: "Flexible scoring engine supports multiple methodologies including weighted scoring, pass/fail criteria, and numeric scales.",
    mockupType: 'scoring'
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    detailedDescription: "Intelligent document management system automatically categorizes photos, videos, and documents by topic.",
    mockupType: 'evidence'
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    detailedDescription: "Live dashboard provides real-time visibility into audit progress, completion rates, and emerging issues.",
    mockupType: 'progress'
  },
];

// Window Chrome Component
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#0d0d14] rounded-lg overflow-hidden flex flex-col shadow-2xl">
    {/* Title Bar */}
    <div className="h-7 bg-[#1a1a24] flex items-center px-2.5 gap-2 border-b border-white/5 flex-shrink-0">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[9px] text-white/40 font-medium">{title}</span>
      </div>
      <div className="w-12" />
    </div>
    {/* Content */}
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Template Builder UI
const TemplateMockup = () => (
  <WindowChrome title="Template Builder — ISO 9001:2015">
    <div className="h-full flex text-[9px]">
      {/* Sidebar */}
      <div className="w-16 bg-[#12121a] border-r border-white/5 p-2 flex flex-col gap-1">
        <div className="p-1.5 bg-primary/20 rounded text-primary text-center">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[7px]">Sections</span>
        </div>
        <div className="p-1.5 text-white/40 text-center hover:bg-white/5 rounded">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="text-[7px]">Fields</span>
        </div>
        <div className="p-1.5 text-white/40 text-center hover:bg-white/5 rounded">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[7px]">Settings</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-2.5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[7px]">Published</div>
            <span className="text-white/40 text-[7px]">v2.4</span>
          </div>
          <div className="flex gap-1">
            <div className="px-2 py-0.5 bg-white/5 text-white/60 rounded text-[7px]">Preview</div>
            <div className="px-2 py-0.5 bg-primary text-white rounded text-[7px]">Save</div>
          </div>
        </div>
        
        {/* Sections */}
        <div className="space-y-1.5">
          {[
            { name: "4. Context of the Organization", items: ["4.1 Understanding the organization", "4.2 Understanding needs of parties", "4.3 Scope of QMS"], progress: 100 },
            { name: "5. Leadership", items: ["5.1 Leadership commitment", "5.2 Quality policy", "5.3 Roles & responsibilities"], progress: 100 },
            { name: "7. Support", items: ["7.1 Resources", "7.2 Competence", "7.3 Awareness"], progress: 66 },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
              className="bg-[#1a1a24] rounded-lg overflow-hidden"
            >
              <div className="px-2 py-1.5 flex items-center gap-1.5 border-b border-white/5">
                <motion.svg
                  animate={{ rotate: [0, 90] }}
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                  className="w-2.5 h-2.5 text-white/40" viewBox="0 0 24 24" fill="currentColor"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </motion.svg>
                <span className="text-white/90 font-medium flex-1">{section.name}</span>
                <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${section.progress === 100 ? 'bg-green-400' : 'bg-primary'}`} style={{ width: `${section.progress}%` }} />
                </div>
              </div>
              <div className="px-2 py-1 space-y-0.5">
                {section.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 + j * 0.1 + 0.4, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                    className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-white/5 rounded"
                  >
                    <div className={`w-2.5 h-2.5 rounded border ${j < 2 || section.progress === 100 ? 'bg-primary border-primary' : 'border-white/20'} flex items-center justify-center`}>
                      {(j < 2 || section.progress === 100) && (
                        <svg className="w-1.5 h-1.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-white/60 flex-1">{item}</span>
                    <span className="text-white/30 text-[7px]">12 criteria</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </WindowChrome>
);

// AI Assistant Chat UI
const AIMockup = () => (
  <WindowChrome title="YVOO Copilot — Audit Assistant">
    <div className="h-full flex flex-col text-[9px] bg-[#0f0f17]">
      {/* Header */}
      <div className="px-2.5 py-2 border-b border-white/5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/20">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white/90 font-medium">YVOO Copilot</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-white/40 text-[7px]">Active • ISO 9001 context</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-white/40">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-2.5 space-y-2 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          className="flex gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="bg-[#1a1a28] rounded-xl rounded-tl-sm p-2 max-w-[85%]">
            <p className="text-white/80 leading-relaxed">I noticed you haven't collected evidence for <span className="text-primary font-medium">Clause 7.1.5 - Monitoring and measuring resources</span>. This is a critical requirement.</p>
            <span className="text-white/30 text-[7px] mt-1 block">2 min ago</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          className="flex gap-2 justify-end"
        >
          <div className="bg-primary/20 rounded-xl rounded-tr-sm p-2 max-w-[75%]">
            <p className="text-white/80">What evidence should I collect?</p>
            <span className="text-white/30 text-[7px] mt-1 block text-right">1 min ago</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-[7px] text-white/60 font-medium">
            JD
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          className="flex gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="bg-[#1a1a28] rounded-xl rounded-tl-sm p-2 max-w-[90%]">
            <p className="text-white/80 mb-1.5">Based on ISO 9001:2015, you should collect:</p>
            <div className="space-y-1 bg-white/5 rounded-lg p-1.5">
              {[
                { icon: "📋", text: "Calibration certificates & schedules" },
                { icon: "🔧", text: "Equipment maintenance records" },
                { icon: "📊", text: "Measurement traceability evidence" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5 + i * 0.2, duration: 0.2, repeat: Infinity, repeatDelay: 8 }}
                  className="flex items-center gap-1.5 text-white/70"
                >
                  <span className="text-[8px]">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-1 mt-1.5">
              <div className="px-1.5 py-0.5 bg-primary/20 text-primary rounded text-[7px] cursor-pointer hover:bg-primary/30">Add to checklist</div>
              <div className="px-1.5 py-0.5 bg-white/5 text-white/60 rounded text-[7px] cursor-pointer hover:bg-white/10">Show examples</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Input */}
      <div className="p-2 border-t border-white/5">
        <div className="flex items-center gap-2 bg-[#1a1a28] rounded-lg px-2 py-1.5">
          <input type="text" placeholder="Ask about audit requirements..." className="flex-1 bg-transparent text-white/80 placeholder:text-white/30 outline-none text-[9px]" />
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </WindowChrome>
);

// Equipment Recognition UI
const EquipmentMockup = () => (
  <WindowChrome title="Equipment Scanner — AI Detection">
    <div className="h-full flex flex-col text-[9px] bg-[#0a0a12]">
      {/* Toolbar */}
      <div className="px-2 py-1.5 border-b border-white/5 flex items-center gap-2">
        <div className="flex gap-1">
          {["Detect", "Measure", "Compare"].map((tool, i) => (
            <div key={tool} className={`px-1.5 py-0.5 rounded text-[7px] ${i === 0 ? 'bg-primary text-white' : 'bg-white/5 text-white/50'}`}>
              {tool}
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-white/40 text-[7px]">Confidence: 94%</span>
      </div>
      
      {/* Image Area */}
      <div className="flex-1 relative bg-gradient-to-br from-[#0f0f18] to-[#0a0a12] m-2 rounded-lg overflow-hidden">
        {/* Real Equipment Image */}
        <img 
          src={equipmentImage} 
          alt="Factory equipment" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        
        {/* Detection Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 6 }}
          className="absolute inset-3"
        >
          {/* Main Bounding Box */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
            className="absolute inset-2 border-2 border-accent rounded"
          >
            {/* Corners */}
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-accent" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-accent" />
            <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-accent" />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-accent" />
          </motion.div>
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
            className="absolute top-0 left-0 bg-accent px-1.5 py-0.5 rounded-br rounded-tl flex items-center gap-1"
          >
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-[8px] font-medium">CNC Lathe • 94%</span>
          </motion.div>
          
          {/* Sub-detection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
            className="absolute top-4 left-2 w-10 h-8 border border-primary/60 rounded-sm"
          >
            <div className="absolute -top-2 left-0 bg-primary/80 px-1 py-0.5 rounded text-[6px] text-white">Control Panel</div>
          </motion.div>
        </motion.div>
        
        {/* Scanning Line */}
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>
      
      {/* Results Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
        className="mx-2 mb-2 bg-[#12121a] rounded-lg p-2 border border-white/5"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/90 font-medium">DMG MORI NLX 2500</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-green-400 text-[7px]">Verified</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[7px]">
          <div>
            <div className="text-white/40">Asset ID</div>
            <div className="text-white/80">MCH-2024-0847</div>
          </div>
          <div>
            <div className="text-white/40">Last Service</div>
            <div className="text-white/80">Oct 15, 2024</div>
          </div>
          <div>
            <div className="text-white/40">Condition</div>
            <div className="text-green-400">Good</div>
          </div>
        </div>
      </motion.div>
    </div>
  </WindowChrome>
);

// Scoring Dashboard UI
const ScoringMockup = () => (
  <WindowChrome title="Audit Scorecard — Supplier Assessment">
    <div className="h-full flex flex-col text-[9px] bg-[#0a0a12] p-2.5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-white/90 font-medium">Müller GmbH</div>
          <div className="text-white/40 text-[7px]">ISO 9001 • IATF 16949</div>
        </div>
        <div className="text-right">
          <div className="text-white/40 text-[7px]">Audit Date</div>
          <div className="text-white/60">Nov 12, 2024</div>
        </div>
      </div>
      
      {/* Score Circle */}
      <div className="flex justify-center mb-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 7 }}
          className="relative w-20 h-20"
        >
          {/* Background Ring */}
          <svg className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <motion.circle
              cx="40" cy="40" r="34" fill="none" stroke="url(#scoreGradient)" strokeWidth="6"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 214" }}
              animate={{ strokeDasharray: "180 214" }}
              transition={{ delay: 0.6, duration: 1, repeat: Infinity, repeatDelay: 7 }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A7FA5" />
                <stop offset="100%" stopColor="#6EA996" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
              className="text-2xl font-bold text-white"
            >
              84
            </motion.span>
            <span className="text-white/40 text-[7px]">/ 100</span>
          </div>
        </motion.div>
      </div>
      
      {/* Category Breakdown */}
      <div className="flex-1 space-y-1.5">
        {[
          { name: "Quality Management", score: 92, weight: "40%", color: "bg-green-400" },
          { name: "Process Control", score: 85, weight: "25%", color: "bg-accent" },
          { name: "Documentation", score: 78, weight: "20%", color: "bg-yellow-400" },
          { name: "Continuous Improvement", score: 70, weight: "15%", color: "bg-primary" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-[#12121a] rounded-lg p-1.5"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/80">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-[7px]">{item.weight}</span>
                <span className="text-white font-medium">{item.score}</span>
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ delay: 1.7 + i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 7 }}
                className={`h-full ${item.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-white/60 text-[7px]">Approved</span>
        </div>
        <span className="text-white/40 text-[7px]">Previous: 79 (+5)</span>
      </div>
    </div>
  </WindowChrome>
);

// Evidence Gallery UI
const EvidenceMockup = () => (
  <WindowChrome title="Evidence Manager — 47 files">
    <div className="h-full flex flex-col text-[9px] bg-[#0a0a12]">
      {/* Toolbar */}
      <div className="px-2 py-1.5 border-b border-white/5 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-1 bg-[#12121a] rounded px-1.5 py-0.5">
          <svg className="w-2.5 h-2.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-white/30 text-[8px]">Search evidence...</span>
        </div>
        <div className="flex gap-0.5">
          {["All", "QMS", "Safety", "Env"].map((tab, i) => (
            <div key={tab} className={`px-1.5 py-0.5 rounded text-[7px] ${i === 0 ? 'bg-primary text-white' : 'text-white/40 hover:bg-white/5'}`}>
              {tab}
            </div>
          ))}
        </div>
      </div>
      
      {/* Grid */}
      <div className="flex-1 p-2 grid grid-cols-3 gap-1.5 overflow-hidden">
        {[
          { type: "img", name: "CNC_Inspection.jpg", tag: "QMS", tagColor: "bg-green-400", size: "2.4 MB", img: evidenceImg1 },
          { type: "pdf", name: "Quality_Manual_v3.2.pdf", tag: "QMS", tagColor: "bg-green-400", size: "4.8 MB", img: null },
          { type: "img", name: "Emergency_Routes.jpg", tag: "Safety", tagColor: "bg-accent", size: "3.2 MB", img: evidenceImg2 },
          { type: "pdf", name: "Work_Instruction_WI-042.pdf", tag: "QMS", tagColor: "bg-green-400", size: "1.2 MB", img: null },
          { type: "doc", name: "Calibration_Log_2024.xlsx", tag: "QMS", tagColor: "bg-green-400", size: "450 KB", img: null },
          { type: "img", name: "Machine_Nameplate.jpg", tag: "Safety", tagColor: "bg-accent", size: "1.9 MB", img: equipmentImage },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
            className="bg-[#12121a] rounded-lg overflow-hidden group cursor-pointer hover:ring-1 hover:ring-primary/50"
          >
            {/* Preview */}
            <div className="aspect-square relative bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
              {item.type === "img" && item.img ? (
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-6 h-7 rounded ${item.type === 'pdf' ? 'bg-red-500/20' : 'bg-blue-500/20'} flex items-center justify-center`}>
                    <span className="text-[7px] font-bold text-white/60 uppercase">{item.type}</span>
                  </div>
                </div>
              )}
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                className={`absolute top-1 right-1 ${item.tagColor} px-1 py-0.5 rounded text-[6px] text-white font-medium shadow-sm`}
              >
                {item.tag}
              </motion.div>
              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.12 + 0.4, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                className="absolute bottom-1 left-1 bg-primary/90 px-1 py-0.5 rounded text-[5px] text-white flex items-center gap-0.5 shadow-sm"
              >
                <svg className="w-1.5 h-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Auto-tagged
              </motion.div>
            </div>
            {/* Info */}
            <div className="p-1.5">
              <div className="text-white/80 truncate text-[8px]">{item.name}</div>
              <div className="text-white/40 text-[7px]">{item.size}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Upload Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 3, duration: 3, repeat: Infinity, repeatDelay: 3 }}
        className="mx-2 mb-2 bg-primary/10 border border-primary/20 rounded-lg p-2"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border border-primary border-t-transparent rounded-full"
          />
          <div className="flex-1">
            <div className="text-white/80 text-[8px]">Processing 3 new files...</div>
            <div className="text-white/40 text-[7px]">AI categorizing and extracting metadata</div>
          </div>
        </div>
      </motion.div>
    </div>
  </WindowChrome>
);

// Progress Dashboard UI
const ProgressMockup = () => (
  <WindowChrome title="Live Audit Tracker — Müller GmbH">
    <div className="h-full flex text-[9px] bg-[#0a0a12]">
      {/* Timeline */}
      <div className="flex-1 p-2.5 overflow-hidden">
        {/* Status Bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 font-medium">In Progress</span>
          </div>
          <div className="text-white/40 text-[7px]">Started 3h 24m ago</div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[7px] mb-1">
            <span className="text-white/40">Overall Completion</span>
            <span className="text-white/80">65%</span>
          </div>
          <div className="h-2 bg-[#12121a] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 7 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>
        
        {/* Milestones */}
        <div className="space-y-1">
          {[
            { name: "Opening Meeting", time: "09:00", status: "complete", auditor: "JD" },
            { name: "Document Review", time: "09:45", status: "complete", auditor: "JD" },
            { name: "Process Area A", time: "11:00", status: "complete", auditor: "MK" },
            { name: "Process Area B", time: "12:30", status: "active", auditor: "JD" },
            { name: "Interviews", time: "14:00", status: "pending", auditor: "—" },
            { name: "Closing Meeting", time: "16:00", status: "pending", auditor: "—" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
              className={`flex items-center gap-2 p-1.5 rounded-lg ${item.status === 'active' ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5'}`}
            >
              <div className="flex flex-col items-center w-4">
                <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                  item.status === 'complete' ? 'bg-green-400' : 
                  item.status === 'active' ? 'bg-primary ring-2 ring-primary/30' : 'bg-white/20'
                }`}>
                  {item.status === 'complete' && (
                    <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                  {item.status === 'active' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                {i < 5 && <div className={`w-0.5 h-3 ${item.status === 'complete' ? 'bg-green-400/50' : 'bg-white/10'}`} />}
              </div>
              <div className="flex-1">
                <div className={`${item.status === 'pending' ? 'text-white/40' : 'text-white/80'}`}>{item.name}</div>
              </div>
              <div className="text-white/40 text-[7px] w-8">{item.time}</div>
              <div className={`w-4 h-4 rounded-full ${item.auditor === '—' ? 'bg-white/10' : 'bg-white/20'} flex items-center justify-center text-[6px] text-white/60`}>
                {item.auditor}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Side Panel */}
      <div className="w-20 bg-[#0f0f17] border-l border-white/5 p-2 flex flex-col">
        <div className="text-white/60 text-[7px] mb-1.5">Findings</div>
        <div className="space-y-1 flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-yellow-400/20 border border-yellow-400/30 rounded p-1"
          >
            <div className="text-yellow-400 text-[7px] font-medium">Minor NC</div>
            <div className="text-white/60 text-[6px]">Doc control 4.2.3</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-blue-400/20 border border-blue-400/30 rounded p-1"
          >
            <div className="text-blue-400 text-[7px] font-medium">OFI</div>
            <div className="text-white/60 text-[6px]">Training records</div>
          </motion.div>
        </div>
        <div className="pt-2 border-t border-white/5">
          <div className="text-white/40 text-[6px] mb-1">Quick Stats</div>
          <div className="text-white/80 text-[8px]">12 areas</div>
          <div className="text-white/80 text-[8px]">47 evidence</div>
          <div className="text-white/80 text-[8px]">2 findings</div>
        </div>
      </div>
    </div>
  </WindowChrome>
);

const MockupRenderer = ({ type }: { type: Capability['mockupType'] }) => {
  switch (type) {
    case 'template': return <TemplateMockup />;
    case 'ai': return <AIMockup />;
    case 'equipment': return <EquipmentMockup />;
    case 'scoring': return <ScoringMockup />;
    case 'evidence': return <EvidenceMockup />;
    case 'progress': return <ProgressMockup />;
    default: return <ProgressMockup />;
  }
};

const InfiniteScrollingGallery = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  const row1 = [capabilities[0], capabilities[1], capabilities[2]];
  const row2 = [capabilities[3], capabilities[4], capabilities[5]];

  const renderRow = (items: Capability[], direction: 'left' | 'right', rowIndex: number) => {
    const duplicatedItems = [...items, ...items, ...items];
    
    return (
      <div className="overflow-hidden">
        <div 
          className={`flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:animation-pause`}
          style={{ width: 'fit-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${rowIndex}-${index}`}
              onClick={() => setSelectedCapability(item)}
              className="flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-1 hover:ring-primary/30"
              style={{ width: '300px' }}
            >
              <div className="aspect-square overflow-hidden">
                <MockupRenderer type={item.mockupType} />
              </div>
              <div className="p-4 bg-card">
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                  {item.description}
                </p>
                <span className="text-xs font-medium text-primary mt-2 inline-block hover:underline">
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6 py-4">
        {renderRow(row1, 'left', 1)}
        {renderRow(row2, 'right', 2)}

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-324px * 3)); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(calc(-324px * 3)); }
            100% { transform: translateX(0); }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 30s linear infinite;
          }

          .hover\\:animation-pause:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4 text-primary">
              {selectedCapability?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedCapability?.detailedDescription}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
