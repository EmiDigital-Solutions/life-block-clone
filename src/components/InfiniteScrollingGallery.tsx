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
  mockupType: 'template' | 'ai' | 'equipment' | 'scoring' | 'evidence' | 'progress' | 'supplierSearch' | 'auditPrep' | 'followUp';
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
  { 
    title: "Supplier Search & Intelligence", 
    description: "Find suppliers and generate AI-powered intelligence reports instantly.",
    detailedDescription: "Search for suppliers by company name, city, or country and receive comprehensive AI-generated intelligence reports with risk assessments, certifications, and recommendations.",
    mockupType: 'supplierSearch'
  },
  { 
    title: "Audit Preparation & Ordering", 
    description: "Select suppliers, upload documents, and order audits with one click.",
    detailedDescription: "Streamlined audit ordering process: select multiple suppliers, upload checklists and supporting documents, configure audit parameters, and submit orders instantly.",
    mockupType: 'auditPrep'
  },
  { 
    title: "Follow-up Manager", 
    description: "Track action items, assignments, and resolution progress in one place.",
    detailedDescription: "Comprehensive follow-up management with task assignments, due dates, progress tracking, attachments, comments, and complete history logs for audit findings.",
    mockupType: 'followUp'
  },
];

// Window Chrome Component - Light enterprise design
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#fafafa] rounded-lg overflow-hidden flex flex-col shadow-xl border border-gray-200">
    {/* Title Bar - Clean light design */}
    <div className="h-7 bg-white flex items-center px-3 border-b border-gray-200 flex-shrink-0">
      <span className="text-[9px] text-gray-500 font-medium">{title}</span>
    </div>
    {/* Content */}
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Template Builder UI - Light Enterprise Style
const TemplateMockup = () => (
  <WindowChrome title="Template Builder — ISO 9001:2015">
    <div className="h-full flex text-[9px]">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-100 p-2 flex flex-col gap-1">
        <div className="p-1.5 bg-[#1391BF]/10 rounded text-[#1391BF] text-center">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[7px]">Sections</span>
        </div>
        <div className="p-1.5 text-gray-400 text-center hover:bg-gray-50 rounded">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="text-[7px]">Fields</span>
        </div>
        <div className="p-1.5 text-gray-400 text-center hover:bg-gray-50 rounded">
          <svg className="w-3 h-3 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[7px]">Settings</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-2.5 overflow-hidden bg-[#fafafa]">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[7px] font-medium">Published</div>
            <span className="text-gray-400 text-[7px]">v2.4</span>
          </div>
          <div className="flex gap-1">
            <div className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[7px]">Preview</div>
            <div className="px-2 py-0.5 bg-gray-900 text-white rounded text-[7px]">Save</div>
          </div>
        </div>
        
        {/* Sections */}
        <div className="space-y-1.5">
          {[
            { name: "4. Context of the Organization", items: ["4.1 Understanding the organization", "4.2 Understanding needs of parties", "4.3 Scope of QMS"], progress: 100, status: 'compliant' },
            { name: "5. Leadership", items: ["5.1 Leadership commitment", "5.2 Quality policy", "5.3 Roles & responsibilities"], progress: 100, status: 'compliant' },
            { name: "7. Support", items: ["7.1 Resources", "7.2 Competence", "7.3 Awareness"], progress: 66, status: 'review' },
          ].map((section, i) => (
          <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
              className="bg-white rounded-lg overflow-hidden border border-gray-100"
            >
              <div className="px-2 py-1.5 flex items-center gap-1.5 border-b border-gray-50">
                <motion.svg
                  animate={{ rotate: [0, 90] }}
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                  className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </motion.svg>
                <span className="text-gray-900 font-medium flex-1">{section.name}</span>
                <div className={`w-2 h-2 rounded-full ${section.status === 'compliant' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="w-10 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${section.progress === 100 ? 'bg-emerald-500' : 'bg-[#1391BF]'}`} style={{ width: `${section.progress}%` }} />
                </div>
              </div>
              <div className="px-2 py-1 space-y-0.5">
                {section.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 + j * 0.1 + 0.4, duration: 0.2, repeat: Infinity, repeatDelay: 6 }}
                    className="flex items-center gap-1.5 py-0.5 px-1 hover:bg-gray-50 rounded"
                  >
                    <div className={`w-2.5 h-2.5 rounded border ${j < 2 || section.progress === 100 ? 'bg-[#1391BF] border-[#1391BF]' : 'border-gray-300'} flex items-center justify-center`}>
                      {(j < 2 || section.progress === 100) && (
                        <svg className="w-1.5 h-1.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-600 flex-1">{item}</span>
                    <span className="text-gray-400 text-[7px]">12 criteria</span>
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

// AI Assistant Chat UI - Light Enterprise Style
const AIMockup = () => (
  <WindowChrome title="AIVOO — Audit Assistant">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa]">
      {/* Header */}
      <div className="px-2.5 py-2 border-b border-gray-200 bg-white flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#1391BF] flex items-center justify-center ring-2 ring-[#1391BF]/20">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-gray-900 font-medium">AIVOO</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-gray-500 text-[7px]">Active • ISO 9001 context</span>
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
          <div className="w-5 h-5 rounded-full bg-[#1391BF] flex-shrink-0 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="bg-white rounded-xl rounded-tl-sm p-2 max-w-[85%] border border-gray-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">I noticed you haven't collected evidence for <span className="text-[#1391BF] font-medium">Clause 7.1.5 - Monitoring and measuring resources</span>. This is a critical requirement.</p>
            <span className="text-gray-400 text-[7px] mt-1 block">2 min ago</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          className="flex gap-2 justify-end"
        >
          <div className="bg-[#1391BF]/10 rounded-xl rounded-tr-sm p-2 max-w-[75%]">
            <p className="text-gray-700">What evidence should I collect?</p>
            <span className="text-gray-400 text-[7px] mt-1 block text-right">1 min ago</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-[7px] text-gray-600 font-medium">
            JD
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
          className="flex gap-2"
        >
          <div className="w-5 h-5 rounded-full bg-[#1391BF] flex-shrink-0 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="bg-white rounded-xl rounded-tl-sm p-2 max-w-[90%] border border-gray-100 shadow-sm">
            <p className="text-gray-700 mb-1.5">Based on ISO 9001:2015, you should collect:</p>
            <div className="space-y-1 bg-gray-50 rounded-lg p-1.5">
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
                  className="flex items-center gap-1.5 text-gray-600"
                >
                  <span className="text-[8px]">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-1 mt-1.5">
              <div className="px-1.5 py-0.5 bg-[#1391BF]/10 text-[#1391BF] rounded text-[7px] cursor-pointer hover:bg-[#1391BF]/20">Add to checklist</div>
              <div className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[7px] cursor-pointer hover:bg-gray-200">Show examples</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Input */}
      <div className="p-2 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
          <input type="text" placeholder="Ask about audit requirements..." className="flex-1 bg-transparent text-gray-700 placeholder:text-gray-400 outline-none text-[9px]" />
          <div className="w-5 h-5 rounded bg-gray-900 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </WindowChrome>
);

// Equipment Recognition UI - Light Enterprise Style
const EquipmentMockup = () => (
  <WindowChrome title="Equipment Scanner — AI Detection">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa]">
      {/* Toolbar */}
      <div className="px-2 py-1.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <div className="flex gap-1">
          {["Detect", "Measure", "Compare"].map((tool, i) => (
            <div key={tool} className={`px-1.5 py-0.5 rounded text-[7px] ${i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {tool}
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-gray-500 text-[7px]">Confidence: 94%</span>
      </div>
      
      {/* Image Area */}
      <div className="flex-1 relative bg-gray-100 m-2 rounded-lg overflow-hidden">
        {/* Real Equipment Image */}
        <img 
          src={equipmentImage} 
          alt="Factory equipment" 
          className="absolute inset-0 w-full h-full object-cover"
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
            className="absolute inset-2 border-2 border-emerald-500 rounded"
          >
            {/* Corners */}
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-emerald-500" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-emerald-500" />
            <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-emerald-500" />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-emerald-500" />
          </motion.div>
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
            className="absolute top-0 left-0 bg-emerald-500 px-1.5 py-0.5 rounded-br rounded-tl flex items-center gap-1"
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
            className="absolute top-4 left-2 w-10 h-8 border border-[#1391BF] rounded-sm"
          >
            <div className="absolute -top-2 left-0 bg-[#1391BF] px-1 py-0.5 rounded text-[6px] text-white">Control Panel</div>
          </motion.div>
        </motion.div>
        
        {/* Scanning Line */}
        <motion.div
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          className="absolute left-0 right-0 h-0.5 bg-[#1391BF]/60"
        />
      </div>
      
      {/* Results Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.4, repeat: Infinity, repeatDelay: 6 }}
        className="mx-2 mb-2 bg-white rounded-lg p-2 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-gray-900 font-medium">DMG MORI NLX 2500</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-600 text-[7px]">Compliant</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[7px]">
          <div>
            <div className="text-gray-400">Asset ID</div>
            <div className="text-gray-700">MCH-2024-0847</div>
          </div>
          <div>
            <div className="text-gray-400">Last Service</div>
            <div className="text-gray-700">Oct 15, 2024</div>
          </div>
          <div>
            <div className="text-gray-400">Condition</div>
            <div className="text-emerald-600">Good</div>
          </div>
        </div>
      </motion.div>
    </div>
  </WindowChrome>
);

// Scoring Dashboard UI - Light Enterprise Style
const ScoringMockup = () => (
  <WindowChrome title="Audit Scorecard — Supplier Assessment">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa] p-2.5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 bg-white rounded-lg p-2 border border-gray-100">
        <div>
          <div className="text-gray-900 font-medium">Müller GmbH</div>
          <div className="text-gray-500 text-[7px]">ISO 9001 • IATF 16949</div>
        </div>
        <div className="text-right">
          <div className="text-gray-400 text-[7px]">Audit Date</div>
          <div className="text-gray-600">Nov 12, 2024</div>
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
            <circle cx="40" cy="40" r="34" fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <motion.circle
              cx="40" cy="40" r="34" fill="none" stroke="#1391BF" strokeWidth="6"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 214" }}
              animate={{ strokeDasharray: "180 214" }}
              transition={{ delay: 0.6, duration: 1, repeat: Infinity, repeatDelay: 7 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
              className="text-2xl font-bold text-gray-900"
            >
              84
            </motion.span>
            <span className="text-gray-400 text-[7px]">/ 100</span>
          </div>
        </motion.div>
      </div>
      
      {/* Category Breakdown */}
      <div className="flex-1 space-y-1.5">
        {[
          { name: "Quality Management", score: 92, weight: "40%", status: "compliant" },
          { name: "Process Control", score: 85, weight: "25%", status: "compliant" },
          { name: "Documentation", score: 78, weight: "20%", status: "review" },
          { name: "Continuous Improvement", score: 70, weight: "15%", status: "review" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-white rounded-lg p-1.5 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.status === 'compliant' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[7px]">{item.weight}</span>
                <span className="text-gray-900 font-medium">{item.score}</span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ delay: 1.7 + i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 7 }}
                className={`h-full ${item.status === 'compliant' ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-gray-600 text-[7px]">Approved</span>
        </div>
        <span className="text-gray-400 text-[7px]">Previous: 79 (+5)</span>
      </div>
    </div>
  </WindowChrome>
);

// Evidence Gallery UI - Light Enterprise Style
const EvidenceMockup = () => (
  <WindowChrome title="Evidence Manager — 47 files">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa]">
      {/* Toolbar */}
      <div className="px-2 py-1.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <div className="flex-1 flex items-center gap-1 bg-gray-50 rounded px-1.5 py-0.5 border border-gray-200">
          <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-400 text-[8px]">Search evidence...</span>
        </div>
        <div className="flex gap-0.5">
          {["All", "QMS", "Safety", "Env"].map((tab, i) => (
            <div key={tab} className={`px-1.5 py-0.5 rounded text-[7px] ${i === 0 ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              {tab}
            </div>
          ))}
        </div>
      </div>
      
      {/* Grid */}
      <div className="flex-1 p-2 grid grid-cols-3 gap-1.5 overflow-hidden">
        {[
          { type: "img", name: "CNC_Inspection.jpg", tag: "QMS", tagColor: "bg-emerald-500", size: "2.4 MB", img: evidenceImg1 },
          { type: "pdf", name: "Quality_Manual_v3.2.pdf", tag: "QMS", tagColor: "bg-emerald-500", size: "4.8 MB", img: null },
          { type: "img", name: "Emergency_Routes.jpg", tag: "Safety", tagColor: "bg-amber-500", size: "3.2 MB", img: evidenceImg2 },
          { type: "pdf", name: "Work_Instruction_WI-042.pdf", tag: "QMS", tagColor: "bg-emerald-500", size: "1.2 MB", img: null },
          { type: "doc", name: "Calibration_Log_2024.xlsx", tag: "QMS", tagColor: "bg-emerald-500", size: "450 KB", img: null },
          { type: "img", name: "Machine_Nameplate.jpg", tag: "Safety", tagColor: "bg-amber-500", size: "1.9 MB", img: equipmentImage },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12, duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
            className="bg-white rounded-lg overflow-hidden group cursor-pointer hover:ring-1 hover:ring-[#1391BF]/50 border border-gray-100"
          >
            {/* Preview */}
            <div className="aspect-square relative bg-gray-50 overflow-hidden">
              {item.type === "img" && item.img ? (
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-6 h-7 rounded ${item.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'} flex items-center justify-center`}>
                    <span className="text-[7px] font-bold text-gray-500 uppercase">{item.type}</span>
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
                className="absolute bottom-1 left-1 bg-[#1391BF] px-1 py-0.5 rounded text-[5px] text-white flex items-center gap-0.5 shadow-sm"
              >
                <svg className="w-1.5 h-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Auto-tagged
              </motion.div>
            </div>
            {/* Info */}
            <div className="p-1.5">
              <div className="text-gray-700 truncate text-[8px]">{item.name}</div>
              <div className="text-gray-400 text-[7px]">{item.size}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Upload Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 3, duration: 3, repeat: Infinity, repeatDelay: 3 }}
        className="mx-2 mb-2 bg-[#1391BF]/5 border border-[#1391BF]/20 rounded-lg p-2"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border border-[#1391BF] border-t-transparent rounded-full"
          />
          <div className="flex-1">
            <div className="text-gray-700 text-[8px]">Processing 3 new files...</div>
            <div className="text-gray-500 text-[7px]">AI categorizing and extracting metadata</div>
          </div>
        </div>
      </motion.div>
    </div>
  </WindowChrome>
);

// Progress Dashboard UI - Light Enterprise Style
const ProgressMockup = () => (
  <WindowChrome title="Live Audit Tracker — Müller GmbH">
    <div className="h-full flex text-[9px] bg-[#fafafa]">
      {/* Main Content */}
      <div className="flex-1 p-3 overflow-hidden">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1391BF] animate-pulse" />
            <span className="text-gray-900 font-medium text-[10px]">Audit In Progress</span>
          </div>
          <div className="px-2 py-0.5 bg-[#1391BF]/10 rounded text-[#1391BF] text-[7px] font-medium">
            65% Complete
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 7 }}
              className="h-full bg-[#1391BF] rounded-full"
            />
          </div>
          <div className="flex justify-between mt-1 text-[7px] text-gray-400">
            <span>Started 3h 24m ago</span>
            <span>Est. 2h remaining</span>
          </div>
        </div>
        
        {/* Milestones Timeline */}
        <div className="space-y-0.5">
          {[
            { name: "Opening Meeting", time: "09:00", status: "complete" },
            { name: "Document Review", time: "09:45", status: "complete" },
            { name: "Process Area A", time: "11:00", status: "complete" },
            { name: "Process Area B", time: "12:30", status: "active" },
            { name: "Interviews", time: "14:00", status: "pending" },
            { name: "Closing Meeting", time: "16:00", status: "pending" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
              className={`flex items-center gap-2.5 py-1.5 px-2 rounded ${
                item.status === 'active' ? 'bg-[#1391BF]/10' : ''
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center ${
                  item.status === 'complete' ? 'bg-emerald-500' : 
                  item.status === 'active' ? 'bg-[#1391BF]' : 'bg-gray-200'
                }`}>
                  {item.status === 'complete' && (
                    <svg className="w-1.5 h-1.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
                {i < 5 && (
                  <div className={`w-px h-3 ${
                    item.status === 'complete' ? 'bg-emerald-200' : 'bg-gray-100'
                  }`} />
                )}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className={`${
                  item.status === 'pending' ? 'text-gray-400' : 
                  item.status === 'active' ? 'text-[#1391BF] font-medium' : 'text-gray-700'
                }`}>{item.name}</span>
                <span className="text-gray-400 text-[7px]">{item.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Stats Panel */}
      <div className="w-16 bg-white border-l border-gray-100 p-2 flex flex-col gap-2">
        <div className="text-gray-400 text-[7px] uppercase tracking-wider">Stats</div>
        
        <div className="space-y-2">
          <div className="text-center">
            <div className="text-gray-900 text-[12px] font-medium">12</div>
            <div className="text-gray-400 text-[6px]">Areas</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 text-[12px] font-medium">47</div>
            <div className="text-gray-400 text-[6px]">Evidence</div>
          </div>
        </div>
        
        <div className="mt-auto space-y-1.5">
          <div className="text-gray-400 text-[6px] uppercase tracking-wider">Findings</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-amber-50 rounded px-1.5 py-1"
          >
            <div className="text-amber-600 text-[7px] font-medium">1 Minor</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.3, repeat: Infinity, repeatDelay: 7 }}
            className="bg-blue-50 rounded px-1.5 py-1"
          >
            <div className="text-blue-600 text-[7px] font-medium">1 OFI</div>
          </motion.div>
        </div>
      </div>
    </div>
  </WindowChrome>
);

// Supplier Search & Intelligence UI - Light Enterprise Style
const SupplierSearchMockup = () => (
  <WindowChrome title="Supplier Search & Intelligence">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa] p-2.5">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-3 bg-white rounded-lg p-2 border border-gray-100">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[7px] font-bold">1</div>
          <span className="text-gray-700 text-[7px]">Search</span>
        </div>
        <div className="h-px flex-1 bg-[#1391BF]/30" />
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[7px] font-bold">2</div>
          <span className="text-gray-400 text-[7px]">Report</span>
        </div>
      </div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 8 }}
        className="bg-white rounded-lg p-2.5 mb-2 border border-gray-100"
      >
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div>
            <label className="text-gray-500 text-[7px] block mb-0.5">Company Name</label>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatDelay: 8 }}
              className="h-5 bg-gray-50 rounded border border-gray-200 px-1.5 flex items-center"
            >
              <span className="text-gray-700">Müller GmbH</span>
            </motion.div>
          </div>
          <div>
            <label className="text-gray-500 text-[7px] block mb-0.5">City</label>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.7, duration: 0.6, repeat: Infinity, repeatDelay: 8 }}
              className="h-5 bg-gray-50 rounded border border-gray-200 px-1.5 flex items-center"
            >
              <span className="text-gray-700">Stuttgart</span>
            </motion.div>
          </div>
          <div>
            <label className="text-gray-500 text-[7px] block mb-0.5">Country</label>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.9, duration: 0.5, repeat: Infinity, repeatDelay: 8 }}
              className="h-5 bg-gray-50 rounded border border-gray-200 px-1.5 flex items-center"
            >
              <span className="text-gray-700">Germany</span>
            </motion.div>
          </div>
        </div>
        <motion.button
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ delay: 1.3, duration: 0.3, repeat: Infinity, repeatDelay: 8 }}
          className="w-full py-1.5 bg-gray-900 text-white rounded text-[8px] font-medium flex items-center justify-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Supplier
        </motion.button>
      </motion.div>

      {/* AI Report Generation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, repeat: Infinity, repeatDelay: 8 }}
        className="flex-1 bg-white rounded-lg p-2.5 overflow-hidden border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-[#1391BF] border-t-transparent rounded-full"
          />
          <span className="text-[#1391BF] text-[8px] font-medium">Generating AI Intelligence Report...</span>
        </div>
        
        <div className="space-y-1.5">
          {[
            { label: "Company Profile", progress: 100 },
            { label: "Financial Analysis", progress: 85 },
            { label: "Risk Assessment", progress: 60 },
            { label: "Certifications", progress: 30 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 + i * 0.3, duration: 0.3, repeat: Infinity, repeatDelay: 8 }}
              className="flex items-center gap-2"
            >
              <span className="text-gray-600 text-[7px] w-20">{item.label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: 2.7 + i * 0.3, duration: 0.5, repeat: Infinity, repeatDelay: 8 }}
                  className="h-full bg-[#1391BF] rounded-full"
                />
              </div>
              <span className="text-emerald-600 text-[7px] w-6">{item.progress}%</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 0.5, repeat: Infinity, repeatDelay: 8 }}
          className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg"
        >
          <div className="flex items-center gap-1 mb-1">
            <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-emerald-600 text-[8px] font-medium">Report Ready</span>
          </div>
          <p className="text-gray-600 text-[7px]">Overall Risk Score: Low • ISO 9001 Certified</p>
        </motion.div>
      </motion.div>
    </div>
  </WindowChrome>
);

// Audit Preparation & Ordering UI - Light Enterprise Style
const AuditPrepMockup = () => (
  <WindowChrome title="Audit Preparation & Ordering">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa] p-2.5">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-3 bg-white rounded-lg p-2 border border-gray-100">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[7px]">✓</div>
          <span className="text-emerald-600 text-[7px]">Search</span>
        </div>
        <div className="h-px flex-1 bg-emerald-500" />
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[7px] font-bold">3</div>
          <span className="text-gray-700 text-[7px]">Prepare</span>
        </div>
        <div className="h-px flex-1 bg-gray-200" />
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[7px] font-bold">4</div>
          <span className="text-gray-400 text-[7px]">Order</span>
        </div>
      </div>

      {/* Supplier Selection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mb-2"
      >
        <div className="text-gray-600 text-[7px] mb-1.5">Select Suppliers for Audit</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { name: "Müller GmbH", location: "Germany", selected: true },
            { name: "TechParts Inc", location: "USA", selected: true },
            { name: "Asia Components", location: "China", selected: false },
          ].map((supplier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.3, repeat: Infinity, repeatDelay: 10 }}
              className={`p-1.5 rounded-lg border cursor-pointer ${supplier.selected ? 'bg-[#1391BF]/5 border-[#1391BF]/40' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded border-2 flex items-center justify-center ${supplier.selected ? 'bg-[#1391BF] border-[#1391BF]' : 'border-gray-300'}`}>
                  {supplier.selected && <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 text-[8px] font-medium truncate">{supplier.name}</div>
                  <div className="text-gray-500 text-[6px]">{supplier.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mb-2"
      >
        <div className="text-gray-600 text-[7px] mb-1.5">Upload Documents</div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 border border-dashed border-emerald-300 bg-emerald-50 rounded-lg text-center">
            <svg className="w-4 h-4 mx-auto text-emerald-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-emerald-600 text-[7px] font-medium">Checklist.pdf</div>
            <div className="text-gray-500 text-[6px]">Uploaded</div>
          </div>
          <div className="p-2 border border-dashed border-gray-300 bg-white rounded-lg text-center">
            <svg className="w-4 h-4 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-gray-500 text-[7px]">Drop files here</div>
          </div>
        </div>
      </motion.div>

      {/* Order Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="flex-1 bg-white rounded-lg p-2.5 border border-gray-100"
      >
        <div className="text-gray-900 text-[8px] font-medium mb-2">Order Summary</div>
        <div className="space-y-1 mb-2">
          <div className="flex justify-between text-[7px]">
            <span className="text-gray-500">Suppliers</span>
            <span className="text-gray-700">2 selected</span>
          </div>
          <div className="flex justify-between text-[7px]">
            <span className="text-gray-500">Audit Type</span>
            <span className="text-gray-700">ISO 9001</span>
          </div>
          <div className="flex justify-between text-[7px]">
            <span className="text-gray-500">Est. Cost</span>
            <span className="text-emerald-600 font-medium">€1,400</span>
          </div>
        </div>
        <motion.button
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ delay: 4, duration: 0.3, repeat: Infinity, repeatDelay: 10 }}
          className="w-full py-2 bg-gray-900 text-white rounded-lg text-[8px] font-medium flex items-center justify-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Confirm & Order Audit
        </motion.button>
      </motion.div>
    </div>
  </WindowChrome>
);

// Follow-up Manager UI - Light Enterprise Style
const FollowUpMockup = () => (
  <WindowChrome title="Follow-up Manager — Action Item">
    <div className="h-full flex flex-col text-[9px] bg-[#fafafa] p-2.5 overflow-hidden">
      {/* Task Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mb-2 bg-white rounded-lg p-2 border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-900 text-[10px] font-semibold">Document Control Improvement</span>
          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded text-[6px] font-medium">Minor NC</span>
          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[6px] font-medium">In Progress</span>
        </div>
        <div className="flex items-center gap-3 text-[7px]">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[6px] text-gray-600">MS</div>
            <span className="text-gray-600">Michael Schmidt</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-red-500">Due: Dec 20, 2024</span>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mb-2 bg-white rounded-lg p-2 border border-gray-100"
      >
        <div className="flex justify-between text-[7px] mb-1">
          <span className="text-gray-500">Completion Progress</span>
          <span className="text-gray-700">60%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 0.7, duration: 0.8, repeat: Infinity, repeatDelay: 10 }}
            className="h-full bg-[#1391BF] rounded-full"
          />
        </div>
      </motion.div>

      {/* Attachments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mb-2"
      >
        <div className="text-gray-600 text-[7px] mb-1">Attachments</div>
        <div className="flex gap-1">
          {["CAPA_Form.pdf", "Training_Record.xlsx"].map((file, i) => (
            <div key={i} className="px-1.5 py-1 bg-white rounded border border-gray-200 flex items-center gap-1">
              <svg className="w-2.5 h-2.5 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-gray-700 text-[7px]">{file}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="flex-1 min-h-0"
      >
        <div className="text-gray-600 text-[7px] mb-1">Comments & Notes</div>
        <div className="bg-white rounded-lg p-1.5 h-[50px] overflow-hidden border border-gray-100">
          {[
            { user: "AS", text: "Updated procedures drafted", time: "2h ago" },
            { user: "MS", text: "Awaiting QM approval", time: "1d ago" },
          ].map((comment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + i * 0.3, duration: 0.3, repeat: Infinity, repeatDelay: 10 }}
              className="flex items-start gap-1.5 mb-1"
            >
              <div className="w-3 h-3 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[5px] text-[#1391BF] flex-shrink-0">{comment.user}</div>
              <div className="flex-1 min-w-0">
                <span className="text-gray-700 text-[7px]">{comment.text}</span>
                <span className="text-gray-400 text-[6px] ml-1">{comment.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.4, repeat: Infinity, repeatDelay: 10 }}
        className="mt-2 pt-2 border-t border-gray-200"
      >
        <div className="text-gray-400 text-[6px] mb-1">History Log</div>
        <div className="flex items-center gap-2 text-[6px]">
          <span className="text-gray-400">Dec 5</span>
          <span className="text-gray-600">Created from audit finding</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Dec 8</span>
          <span className="text-gray-600">Assigned to MS</span>
          <span className="text-gray-300">→</span>
          <span className="text-[#1391BF]">In Progress</span>
        </div>
      </motion.div>
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
    case 'supplierSearch': return <SupplierSearchMockup />;
    case 'auditPrep': return <AuditPrepMockup />;
    case 'followUp': return <FollowUpMockup />;
    default: return <ProgressMockup />;
  }
};

const InfiniteScrollingGallery = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const row1 = [capabilities[0], capabilities[1], capabilities[2], capabilities[6]];
  const row2 = [capabilities[3], capabilities[4], capabilities[5], capabilities[7], capabilities[8]];

  const renderRow = (items: Capability[], direction: 'left' | 'right', rowIndex: number) => {
    const duplicatedItems = [...items, ...items, ...items];
    
    return (
      <div
        className="overflow-visible relative"
        style={{
          // Important: each row is its own stacking context because the scrolling container uses transforms.
          // Raise the entire hovered row above the other row.
          zIndex: hoveredKey && hoveredKey.startsWith(`${rowIndex}-`) ? 100 : 1,
        }}
      >
        <div 
          className={`flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} ${isPaused ? 'animation-paused' : ''} hover:animation-pause relative`}
          style={{ width: 'fit-content', zIndex: hoveredKey && hoveredKey.startsWith(`${rowIndex}-`) ? 100 : 1 }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${rowIndex}-${index}`}
              onClick={() => setSelectedCapability(item)}
              onMouseEnter={() => setHoveredKey(`${rowIndex}-${index}`)}
              onMouseLeave={() => setHoveredKey(null)}
              className="flex-shrink-0 cursor-pointer rounded-2xl overflow-visible bg-card transition-all duration-500 relative"
              style={{ width: '320px', zIndex: hoveredKey === `${rowIndex}-${index}` ? 50 : 1 }}
              initial={false}
              animate={{
                scale: hoveredKey === `${rowIndex}-${index}` ? 1.35 : 1,
                y: hoveredKey === `${rowIndex}-${index}` ? -30 : 0,
                filter: hoveredKey && hoveredKey !== `${rowIndex}-${index}` ? 'blur(3px)' : 'blur(0px)',
                opacity: hoveredKey && hoveredKey !== `${rowIndex}-${index}` ? 0.7 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileTap={{ scale: 0.95 }}
              whileHover={{
                boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div className="aspect-square overflow-hidden rounded-t-2xl">
                <MockupRenderer type={item.mockupType} />
              </div>
              <div className="p-4 bg-card rounded-b-2xl">
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Pause/Play Button */}
      <div className="mb-6 px-4 sm:px-6 lg:px-12 xl:px-24 flex justify-end">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="inline-flex items-center gap-2 bg-[#161616] hover:bg-[#1a1a1a] rounded-full px-5 py-3 transition-colors duration-200"
        >
          {isPaused ? (
            <>
              <svg className="w-4 h-4 text-[#7CC2A7]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="text-[#F5F5F5]/80 text-sm font-medium">Play</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-[#D8A860]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
              <span className="text-[#F5F5F5]/80 text-sm font-medium">Pause</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-6 py-4 overflow-visible relative isolate">
        {renderRow(row1, 'left', 1)}
        {renderRow(row2, 'right', 2)}

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-344px * 4)); }
          }

          @keyframes scroll-right {
            0% { transform: translateX(calc(-344px * 5)); }
            100% { transform: translateX(0); }
          }

          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 45s linear infinite;
          }

          .hover\\:animation-pause:hover {
            animation-play-state: paused;
          }

          .animation-paused {
            animation-play-state: paused !important;
          }
        `}</style>
      </div>

      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Full-size Mockup */}
            <div className="flex-1 bg-[#0A0A0A] p-4 lg:p-6 min-h-[400px] lg:min-h-[600px]">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                {selectedCapability && <MockupRenderer type={selectedCapability.mockupType} />}
              </div>
            </div>
            
            {/* Details Panel */}
            <div className="w-full lg:w-80 bg-background p-6 flex flex-col">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-bold text-primary">
                  {selectedCapability?.title}
                </DialogTitle>
              </DialogHeader>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedCapability?.detailedDescription}
              </p>
              
              {/* Color Legend in Dialog */}
              <div className="mt-auto pt-4 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-3">Status Indicators</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#7CC2A7]" />
                    <span className="text-muted-foreground">Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D8A860]" />
                    <span className="text-muted-foreground">Review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#C4564F]" />
                    <span className="text-muted-foreground">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1391BF]" />
                    <span className="text-muted-foreground">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
