import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
const WindowChrome = ({ title, children, large = false }: { title: string; children: React.ReactNode; large?: boolean }) => (
  <div className={`w-full h-full bg-[#0d0d14] rounded-xl overflow-hidden flex flex-col shadow-2xl ${large ? 'min-h-[500px]' : ''}`}>
    <div className="h-8 bg-[#1a1a24] flex items-center px-3 gap-2 border-b border-white/5 flex-shrink-0">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 cursor-pointer" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-xs text-white/50 font-medium">{title}</span>
      </div>
      <div className="w-14" />
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);

// Interactive Template Demo
const InteractiveTemplateDemo = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ "4": true });
  const [activeTab, setActiveTab] = useState("sections");

  const sections = [
    { id: "4", name: "4. Context of the Organization", items: ["4.1 Understanding the organization", "4.2 Understanding needs of interested parties", "4.3 Determining the scope of the QMS", "4.4 QMS and its processes"] },
    { id: "5", name: "5. Leadership", items: ["5.1 Leadership and commitment", "5.2 Quality policy", "5.3 Organizational roles"] },
    { id: "6", name: "6. Planning", items: ["6.1 Actions to address risks", "6.2 Quality objectives", "6.3 Planning of changes"] },
    { id: "7", name: "7. Support", items: ["7.1 Resources", "7.2 Competence", "7.3 Awareness", "7.4 Communication", "7.5 Documented information"] },
  ];

  const toggleCheck = (id: string) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (id: string) => setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <WindowChrome title="Template Builder — ISO 9001:2015" large>
      <div className="h-full flex text-sm">
        {/* Sidebar */}
        <div className="w-20 bg-[#12121a] border-r border-white/5 p-3 flex flex-col gap-2">
          {[
            { id: "sections", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Sections" },
            { id: "fields", icon: "M4 6h16M4 10h16M4 14h16M4 18h16", label: "Fields" },
            { id: "settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded-lg text-center transition-all ${activeTab === tab.id ? 'bg-primary/20 text-primary' : 'text-white/40 hover:bg-white/5'}`}
            >
              <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
              </svg>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Published</div>
              <span className="text-white/40 text-xs">Version 2.4</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-xs hover:bg-white/10 transition-colors">Preview</button>
              <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs hover:bg-primary/90 transition-colors">Save Changes</button>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4 bg-[#1a1a24] rounded-xl p-3">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/60">Template Completion</span>
              <span className="text-white">{checkedCount} / {totalItems} criteria</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(checkedCount / totalItems) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Sections */}
          <div className="space-y-2">
            {sections.map((section) => (
              <div key={section.id} className="bg-[#1a1a24] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
                >
                  <motion.svg
                    animate={{ rotate: expandedSections[section.id] ? 90 : 0 }}
                    className="w-4 h-4 text-white/40"
                    viewBox="0 0 24 24" fill="currentColor"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </motion.svg>
                  <span className="text-white/90 font-medium flex-1 text-left">{section.name}</span>
                  <div className="text-white/40 text-xs">{section.items.filter((_, i) => checkedItems[`${section.id}-${i}`]).length}/{section.items.length}</div>
                </button>
                <AnimatePresence>
                  {expandedSections[section.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/5"
                    >
                      <div className="px-4 py-2 space-y-1">
                        {section.items.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => toggleCheck(`${section.id}-${i}`)}
                            className="w-full flex items-center gap-3 py-2 px-2 hover:bg-white/5 rounded-lg transition-colors text-left"
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checkedItems[`${section.id}-${i}`] ? 'bg-primary border-primary' : 'border-white/20'}`}>
                              {checkedItems[`${section.id}-${i}`] && (
                                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </motion.svg>
                              )}
                            </div>
                            <span className={`flex-1 text-sm ${checkedItems[`${section.id}-${i}`] ? 'text-white/60 line-through' : 'text-white/80'}`}>{item}</span>
                            <span className="text-white/30 text-xs">Click to toggle</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Interactive AI Chat Demo
const InteractiveAIDemo = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "I noticed you haven't collected evidence for Clause 7.1.5 - Monitoring and measuring resources. This is a critical requirement.", time: "2 min ago" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = [
    { trigger: "what", response: "Based on ISO 9001:2015, you should collect:\n• Calibration certificates & schedules\n• Equipment maintenance records\n• Measurement traceability evidence\n• Verification reports" },
    { trigger: "help", response: "I can help you with:\n• Finding missing evidence\n• Explaining ISO requirements\n• Suggesting best practices\n• Reviewing your audit progress" },
    { trigger: "next", response: "After completing Clause 7.1.5, you should proceed to:\n• 7.2 Competence\n• 7.3 Awareness\n• 7.4 Communication\n\nShall I explain any of these?" },
    { trigger: "", response: "I understand. Let me analyze that and provide relevant guidance for your ISO 9001 audit. Is there a specific clause or requirement you'd like me to focus on?" },
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text: input, time: "Just now" }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      const response = aiResponses.find(r => input.toLowerCase().includes(r.trigger)) || aiResponses[aiResponses.length - 1];
      setMessages(prev => [...prev, { role: "ai", text: response.response, time: "Just now" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <WindowChrome title="YVOO Copilot — Audit Assistant" large>
      <div className="h-full flex flex-col text-sm bg-[#0f0f17]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">YVOO Copilot</div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs">Active • ISO 9001 context loaded</span>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-auto space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-primary/20' : 'bg-[#1a1a28]'} rounded-2xl ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'} p-3`}>
                <p className="text-white/90 whitespace-pre-line">{msg.text}</p>
                <span className="text-white/30 text-xs mt-2 block">{msg.time}</span>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-sm text-white/60 font-medium">
                  You
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-[#1a1a28] rounded-2xl rounded-tl-sm p-3">
                <div className="flex gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-white/50" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-white/50" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-white/50" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Suggestions */}
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {["What evidence do I need?", "Help me", "What's next?"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => { setInput(suggestion); }}
              className="px-3 py-1.5 bg-white/5 text-white/60 rounded-full text-xs hover:bg-white/10 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 bg-[#1a1a28] rounded-xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about audit requirements..."
              className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none"
            />
            <button
              onClick={sendMessage}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Interactive Equipment Scanner Demo
const InteractiveEquipmentDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setDetected(false);
    setTimeout(() => {
      setIsScanning(false);
      setDetected(true);
    }, 2000);
  };

  return (
    <WindowChrome title="Equipment Scanner — AI Detection" large>
      <div className="h-full flex flex-col text-sm bg-[#0a0a12]">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
          <div className="flex gap-2">
            {["Detect", "Measure", "Compare", "History"].map((tool, i) => (
              <button key={tool} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                {tool}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <button
            onClick={startScan}
            disabled={isScanning}
            className="px-4 py-1.5 bg-accent text-white rounded-lg text-xs hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {isScanning ? "Scanning..." : "Start Scan"}
          </button>
        </div>
        
        {/* Image Area */}
        <div className="flex-1 relative bg-gradient-to-br from-[#0f0f18] to-[#0a0a12] m-4 rounded-xl overflow-hidden">
          {/* Machine Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-36 bg-gradient-to-b from-[#2a2a3a] to-[#1a1a28] rounded-xl relative">
                {/* Control Panel - Clickable */}
                <button
                  onClick={() => setSelectedArea("control")}
                  className={`absolute top-2 left-2 w-16 h-12 bg-[#0f0f18] rounded-lg cursor-pointer transition-all ${selectedArea === 'control' ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-white/30'}`}
                >
                  <div className="grid grid-cols-3 gap-1 p-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="mt-1 mx-1.5 h-4 bg-primary/30 rounded" />
                </button>
                {/* Spindle - Clickable */}
                <button
                  onClick={() => setSelectedArea("spindle")}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-[#3a3a4a] border-3 border-[#4a4a5a] cursor-pointer transition-all ${selectedArea === 'spindle' ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-white/30'}`}
                >
                  <div className="absolute inset-2 rounded-full bg-[#2a2a3a]" />
                </button>
                {/* Work Area - Clickable */}
                <button
                  onClick={() => setSelectedArea("work")}
                  className={`absolute bottom-2 inset-x-2 h-16 bg-[#12121a] rounded-lg cursor-pointer transition-all ${selectedArea === 'work' ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-white/30'}`}
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#3a3a4a] rounded" />
                </button>
              </div>
              <div className="w-56 h-6 bg-gradient-to-b from-[#3a3a4a] to-[#2a2a3a] rounded-b-xl -mt-1 mx-auto" />
            </div>
          </div>
          
          {/* Scanning Effect */}
          {isScanning && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
            />
          )}
          
          {/* Detection Overlay */}
          <AnimatePresence>
            {detected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-8"
              >
                <div className="absolute inset-0 border-2 border-accent rounded-xl">
                  <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-accent" />
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-accent" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-accent" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-accent" />
                </div>
                <div className="absolute top-0 left-0 bg-accent px-2 py-1 rounded-br rounded-tl flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white text-xs font-medium">CNC Lathe Detected • 94%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Click hint */}
          {!isScanning && !detected && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              Click "Start Scan" or click on machine parts
            </div>
          )}
        </div>
        
        {/* Results Panel */}
        <AnimatePresence>
          {(detected || selectedArea) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-4 mb-4 bg-[#12121a] rounded-xl p-4 border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">
                  {selectedArea === 'control' ? 'Control Panel' : selectedArea === 'spindle' ? 'Main Spindle' : selectedArea === 'work' ? 'Work Area' : 'DMG MORI NLX 2500'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs">Verified</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-white/40 mb-1">Asset ID</div>
                  <div className="text-white">MCH-2024-0847</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Last Service</div>
                  <div className="text-white">Oct 15, 2024</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Condition</div>
                  <div className="text-green-400">Good</div>
                </div>
                <div>
                  <div className="text-white/40 mb-1">Next Calibration</div>
                  <div className="text-white">Jan 2025</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WindowChrome>
  );
};

// Interactive Scoring Demo
const InteractiveScoringDemo = () => {
  const [scores, setScores] = useState({ quality: 92, process: 85, docs: 78, improvement: 70 });
  const [weights, setWeights] = useState({ quality: 40, process: 25, docs: 20, improvement: 15 });

  const totalScore = Math.round(
    (scores.quality * weights.quality + scores.process * weights.process + 
     scores.docs * weights.docs + scores.improvement * weights.improvement) / 100
  );

  const categories = [
    { key: 'quality', name: 'Quality Management', color: 'bg-green-400' },
    { key: 'process', name: 'Process Control', color: 'bg-accent' },
    { key: 'docs', name: 'Documentation', color: 'bg-yellow-400' },
    { key: 'improvement', name: 'Continuous Improvement', color: 'bg-primary' },
  ] as const;

  return (
    <WindowChrome title="Audit Scorecard — Interactive Demo" large>
      <div className="h-full flex flex-col text-sm bg-[#0a0a12] p-4 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white font-medium text-lg">Müller GmbH</div>
            <div className="text-white/50 text-xs">ISO 9001 • IATF 16949 • Drag sliders to adjust scores</div>
          </div>
        </div>
        
        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <motion.circle
                cx="64" cy="64" r="56" fill="none" stroke="url(#scoreGradient2)" strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 352" }}
                animate={{ strokeDasharray: `${(totalScore / 100) * 352} 352` }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="scoreGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A7FA5" />
                  <stop offset="100%" stopColor="#6EA996" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={totalScore}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-white"
              >
                {totalScore}
              </motion.span>
              <span className="text-white/40 text-sm">/ 100</span>
            </div>
          </div>
        </div>
        
        {/* Category Sliders */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.key} className="bg-[#12121a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90">{cat.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs">Weight: {weights[cat.key]}%</span>
                  <span className="text-white font-bold text-lg w-8">{scores[cat.key]}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scores[cat.key]}
                onChange={(e) => setScores(prev => ({ ...prev, [cat.key]: Number(e.target.value) }))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${cat.color === 'bg-green-400' ? '#4ade80' : cat.color === 'bg-accent' ? '#6EA996' : cat.color === 'bg-yellow-400' ? '#facc15' : '#0A7FA5'} ${scores[cat.key]}%, rgba(255,255,255,0.1) ${scores[cat.key]}%)`
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${totalScore >= 80 ? 'bg-green-400' : totalScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`} />
            <span className="text-white/60 text-sm">{totalScore >= 80 ? 'Approved' : totalScore >= 60 ? 'Conditional' : 'Not Approved'}</span>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </WindowChrome>
  );
};

// Interactive Evidence Demo
const InteractiveEvidenceDemo = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [uploading, setUploading] = useState(false);

  const files = [
    { id: 1, type: "img", name: "Production_Floor.jpg", tag: "QMS", tagColor: "bg-green-400", size: "2.4 MB" },
    { id: 2, type: "pdf", name: "ISO_Certificate.pdf", tag: "QMS", tagColor: "bg-green-400", size: "1.1 MB" },
    { id: 3, type: "img", name: "Fire_Exits.jpg", tag: "Safety", tagColor: "bg-accent", size: "3.2 MB" },
    { id: 4, type: "img", name: "Waste_Storage.jpg", tag: "Env", tagColor: "bg-yellow-400", size: "2.8 MB" },
    { id: 5, type: "doc", name: "Training_Records.xlsx", tag: "QMS", tagColor: "bg-green-400", size: "450 KB" },
    { id: 6, type: "img", name: "Equipment_Label.jpg", tag: "Safety", tagColor: "bg-accent", size: "1.9 MB" },
    { id: 7, type: "pdf", name: "Audit_Checklist.pdf", tag: "QMS", tagColor: "bg-green-400", size: "890 KB" },
    { id: 8, type: "img", name: "Emergency_Exit.jpg", tag: "Safety", tagColor: "bg-accent", size: "2.1 MB" },
  ];

  const filteredFiles = activeFilter === "All" ? files : files.filter(f => f.tag === activeFilter);

  const toggleSelect = (id: number) => {
    setSelectedFiles(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <WindowChrome title="Evidence Manager — Interactive Demo" large>
      <div className="h-full flex flex-col text-sm bg-[#0a0a12]">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[#12121a] rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search evidence..." className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm" />
          </div>
          <div className="flex gap-1">
            {["All", "QMS", "Safety", "Env"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${activeFilter === tab ? 'bg-primary text-white' : 'text-white/50 hover:bg-white/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Actions Bar */}
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 bg-primary/10 border-b border-primary/20 flex items-center gap-3"
          >
            <span className="text-white/80 text-xs">{selectedFiles.length} files selected</span>
            <div className="flex-1" />
            <button className="px-3 py-1 bg-white/10 text-white/80 rounded text-xs hover:bg-white/20">Download</button>
            <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30">Delete</button>
            <button onClick={() => setSelectedFiles([])} className="text-white/40 hover:text-white/60 text-xs">Clear</button>
          </motion.div>
        )}
        
        {/* Grid */}
        <div className="flex-1 p-4 grid grid-cols-4 gap-3 overflow-auto">
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => toggleSelect(file.id)}
              className={`bg-[#12121a] rounded-xl overflow-hidden cursor-pointer transition-all ${selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-white/20'}`}
            >
              <div className="aspect-square relative bg-gradient-to-br from-white/5 to-transparent">
                {file.type === "img" ? (
                  <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-white/15 to-white/5" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-10 h-12 rounded-lg ${file.type === 'pdf' ? 'bg-red-500/20' : 'bg-blue-500/20'} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white/60 uppercase">{file.type}</span>
                    </div>
                  </div>
                )}
                <div className={`absolute top-2 right-2 ${file.tagColor} px-1.5 py-0.5 rounded text-[10px] text-white font-medium`}>
                  {file.tag}
                </div>
                {selectedFiles.includes(file.id) && (
                  <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-white/80 truncate text-xs font-medium">{file.name}</div>
                <div className="text-white/40 text-[10px]">{file.size}</div>
              </div>
            </motion.div>
          ))}
          
          {/* Upload Zone */}
          <button
            onClick={simulateUpload}
            className="bg-[#12121a] rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 aspect-square"
          >
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-white/40 text-xs">Add Files</span>
          </button>
        </div>
        
        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mx-4 mb-4 bg-primary/10 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                />
                <div className="flex-1">
                  <div className="text-white text-sm">Processing files...</div>
                  <div className="text-white/50 text-xs">AI is categorizing and extracting metadata</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WindowChrome>
  );
};

// Interactive Progress Demo
const InteractiveProgressDemo = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, name: "Opening Meeting", time: "09:00", status: "complete" as const },
    { id: 2, name: "Document Review", time: "09:45", status: "complete" as const },
    { id: 3, name: "Process Area A", time: "11:00", status: "complete" as const },
    { id: 4, name: "Process Area B", time: "12:30", status: "active" as const },
    { id: 5, name: "Interviews", time: "14:00", status: "pending" as const },
    { id: 6, name: "Closing Meeting", time: "16:00", status: "pending" as const },
  ]);

  const completeMilestone = (id: number) => {
    setMilestones(prev => prev.map((m, i, arr) => {
      if (m.id === id && m.status === 'active') {
        return { ...m, status: 'complete' as const };
      }
      if (arr[i - 1]?.id === id && m.status === 'pending') {
        return { ...m, status: 'active' as const };
      }
      return m;
    }));
  };

  const completed = milestones.filter(m => m.status === 'complete').length;
  const progress = Math.round((completed / milestones.length) * 100);

  return (
    <WindowChrome title="Live Audit Tracker — Interactive Demo" large>
      <div className="h-full flex text-sm bg-[#0a0a12]">
        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-medium">Audit In Progress</span>
            </div>
            <span className="text-white/50 text-xs">Click active milestone to complete</span>
          </div>
          
          {/* Progress */}
          <div className="mb-6 bg-[#12121a] rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/60">Overall Completion</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Milestones */}
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <motion.button
                key={m.id}
                layout
                onClick={() => m.status === 'active' && completeMilestone(m.id)}
                disabled={m.status !== 'active'}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  m.status === 'active' 
                    ? 'bg-primary/10 border border-primary/30 cursor-pointer hover:bg-primary/20' 
                    : m.status === 'complete'
                    ? 'bg-[#12121a]'
                    : 'bg-[#12121a] opacity-50'
                }`}
              >
                <div className="flex flex-col items-center w-6">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    m.status === 'complete' ? 'bg-green-400' : 
                    m.status === 'active' ? 'bg-primary ring-4 ring-primary/20' : 'bg-white/20'
                  }`}>
                    {m.status === 'complete' && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </motion.svg>
                    )}
                    {m.status === 'active' && (
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className={`w-0.5 h-4 mt-1 ${m.status === 'complete' ? 'bg-green-400/50' : 'bg-white/10'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={m.status === 'pending' ? 'text-white/40' : 'text-white'}>{m.name}</div>
                  {m.status === 'active' && <span className="text-primary text-xs">Click to complete</span>}
                </div>
                <div className="text-white/40 text-sm">{m.time}</div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Side Panel */}
        <div className="w-48 bg-[#0f0f17] border-l border-white/5 p-4 flex flex-col">
          <div className="text-white/60 text-xs mb-3 font-medium">Audit Findings</div>
          <div className="space-y-2 flex-1">
            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-3">
              <div className="text-yellow-400 text-xs font-medium">Minor NC</div>
              <div className="text-white/60 text-[11px] mt-1">Document control 4.2.3</div>
            </div>
            <div className="bg-blue-400/20 border border-blue-400/30 rounded-lg p-3">
              <div className="text-blue-400 text-xs font-medium">OFI</div>
              <div className="text-white/60 text-[11px] mt-1">Training records incomplete</div>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5 mt-4">
            <div className="text-white/40 text-xs mb-2">Quick Stats</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Areas</span>
                <span className="text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Evidence</span>
                <span className="text-white">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Findings</span>
                <span className="text-white">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Demo Modal Renderer
const DemoRenderer = ({ type }: { type: Capability['mockupType'] }) => {
  switch (type) {
    case 'template': return <InteractiveTemplateDemo />;
    case 'ai': return <InteractiveAIDemo />;
    case 'equipment': return <InteractiveEquipmentDemo />;
    case 'scoring': return <InteractiveScoringDemo />;
    case 'evidence': return <InteractiveEvidenceDemo />;
    case 'progress': return <InteractiveProgressDemo />;
    default: return <InteractiveProgressDemo />;
  }
};

// Static Mockups for Cards (simplified versions)
const StaticMockup = ({ type }: { type: Capability['mockupType'] }) => {
  const mockups: Record<string, React.ReactNode> = {
    template: (
      <div className="w-full h-full bg-[#0d0d14] p-2 flex flex-col text-[8px]">
        <div className="h-5 bg-[#1a1a24] rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" /><div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /></div>
        </div>
        {[1,2,3].map(i => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3, repeat: Infinity, repeatDelay: 5 }} className="bg-[#1a1a24] rounded p-1.5 mb-1">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded border border-primary bg-primary/20" /><div className="h-1.5 bg-white/20 rounded flex-1" /></div>
          </motion.div>
        ))}
      </div>
    ),
    ai: (
      <div className="w-full h-full bg-[#0d0d14] p-2 flex flex-col text-[8px]">
        <div className="h-5 bg-[#1a1a24] rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" /><div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /></div>
        </div>
        <div className="flex-1 space-y-2">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ repeat: Infinity, repeatDelay: 5 }} className="bg-[#1a1a24] rounded-lg p-2 max-w-[80%]"><div className="h-1.5 bg-white/20 rounded w-full mb-1" /><div className="h-1.5 bg-white/20 rounded w-2/3" /></motion.div>
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, repeat: Infinity, repeatDelay: 5 }} className="bg-primary/20 rounded-lg p-2 max-w-[60%] ml-auto"><div className="h-1.5 bg-white/20 rounded" /></motion.div>
        </div>
      </div>
    ),
    equipment: (
      <div className="w-full h-full bg-[#0d0d14] p-2 flex flex-col">
        <div className="h-5 bg-[#1a1a24] rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" /><div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /></div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-4 bg-[#1a1a24] rounded-lg" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, repeat: Infinity, repeatDelay: 5 }} className="absolute inset-3 border-2 border-accent rounded">
            <div className="absolute top-0 left-0 bg-accent px-1 py-0.5 rounded-br text-[6px] text-white">94%</div>
          </motion.div>
        </div>
      </div>
    ),
    scoring: (
      <div className="w-full h-full bg-[#0d0d14] p-2 flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatDelay: 6 }} className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center">
          <span className="text-xl font-bold text-white">84</span>
        </motion.div>
        <div className="w-full mt-3 space-y-1 px-2">
          {[80, 65, 50].map((w, i) => (<motion.div key={i} initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 6 }} className="h-1.5 bg-accent/60 rounded" />))}
        </div>
      </div>
    ),
    evidence: (
      <div className="w-full h-full bg-[#0d0d14] p-2">
        <div className="h-5 bg-[#1a1a24] rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" /><div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /></div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[0,1,2,3,4,5].map(i => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, repeat: Infinity, repeatDelay: 5 }} className="aspect-square bg-[#1a1a24] rounded relative">
              <div className="absolute bottom-0.5 right-0.5 w-3 h-2 bg-accent/60 rounded text-[4px]" />
            </motion.div>
          ))}
        </div>
      </div>
    ),
    progress: (
      <div className="w-full h-full bg-[#0d0d14] p-2">
        <div className="h-5 bg-[#1a1a24] rounded-t flex items-center px-2 gap-1 mb-2">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" /><div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /></div>
        </div>
        <div className="space-y-1.5">
          {['complete', 'complete', 'active', 'pending', 'pending'].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15, repeat: Infinity, repeatDelay: 6 }} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${s === 'complete' ? 'bg-green-400' : s === 'active' ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
              <div className={`h-1.5 rounded flex-1 ${s === 'pending' ? 'bg-white/10' : 'bg-white/20'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    ),
  };
  return <>{mockups[type]}</>;
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
                <StaticMockup type={item.mockupType} />
              </div>
              <div className="p-4 bg-card">
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-snug line-clamp-2">{item.description}</p>
                <span className="text-xs font-medium text-primary mt-2 inline-flex items-center gap-1 hover:underline">
                  Try interactive demo
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
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
          .animate-scroll-left { animation: scroll-left 30s linear infinite; }
          .animate-scroll-right { animation: scroll-right 30s linear infinite; }
          .hover\\:animation-pause:hover { animation-play-state: paused; }
        `}</style>
      </div>

      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          {selectedCapability && <DemoRenderer type={selectedCapability.mockupType} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
