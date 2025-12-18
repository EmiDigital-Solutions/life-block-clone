import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import factoryImage from "@/assets/factory-hero-background.jpg";

interface DemoStep {
  id: number;
  title: string;
  label: string;
}

const demoSteps: DemoStep[] = [
  { id: 1, title: "Supplier Search", label: "Search" },
  { id: 2, title: "Order Audit", label: "Order" },
  { id: 3, title: "Audit Execution", label: "Audit" },
  { id: 4, title: "Report Generation", label: "Report" },
  { id: 5, title: "Follow-up Manager", label: "Follow-up" },
];

// Step 1: AI-Powered Supplier Search with Conversation + Full Profile
const SupplierSearchDemo = () => {
  const [conversationStep, setConversationStep] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setConversationStep(0);
    setShowProfile(false);
    
    timers.push(setTimeout(() => setConversationStep(1), 800));
    timers.push(setTimeout(() => setConversationStep(2), 2000));
    timers.push(setTimeout(() => setConversationStep(3), 3200));
    timers.push(setTimeout(() => setConversationStep(4), 4500));
    timers.push(setTimeout(() => setShowProfile(true), 5500));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="h-full flex text-xs bg-[#0A0A0A]">
      {/* Left: AI Chat */}
      <div className="w-1/2 p-3 flex flex-col border-r border-[#C0C0C0]/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white/90 font-medium text-[10px]">AIVOO Search</span>
          <span className="px-1.5 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[7px]">Online</span>
        </div>
        
        <div className="flex-1 space-y-2 overflow-hidden">
          {/* AI Message 1 */}
          {conversationStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-[#1391BF]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-[#1391BF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-[#161616] rounded-lg p-2 max-w-[85%]">
                <p className="text-white/80 text-[9px]">What type of supplier are you looking for?</p>
              </div>
            </motion.div>
          )}
          
          {/* User Message 1 */}
          {conversationStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 justify-end"
            >
              <div className="bg-[#1391BF] rounded-lg p-2 max-w-[85%]">
                <p className="text-white text-[9px]">CNC machining for automotive, IATF certified</p>
              </div>
            </motion.div>
          )}
          
          {/* AI Message 2 */}
          {conversationStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-[#1391BF]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-[#1391BF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="bg-[#161616] rounded-lg p-2 max-w-[85%]">
                <p className="text-white/80 text-[9px]">Great! What region or country do you prefer?</p>
              </div>
            </motion.div>
          )}
          
          {/* User Message 2 */}
          {conversationStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 justify-end"
            >
              <div className="bg-[#1391BF] rounded-lg p-2 max-w-[85%]">
                <p className="text-white text-[9px]">Germany, high-volume production capability</p>
              </div>
            </motion.div>
          )}
          
          {/* AI Loading */}
          {conversationStep >= 4 && !showProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-[#1391BF]/20 flex items-center justify-center flex-shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-2.5 h-2.5 border border-[#1391BF] border-t-transparent rounded-full"
                />
              </div>
              <div className="bg-[#161616] rounded-lg p-2">
                <p className="text-[#1391BF] text-[9px]">Searching suppliers...</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Right: Supplier Profile */}
      <div className="w-1/2 p-3 flex flex-col">
        {showProfile ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-[#161616] rounded-lg p-3 space-y-2"
          >
            {/* Header */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A0A0A] font-bold text-[7px] text-center leading-tight">DMG<br/>MORI</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-[11px]">DMG MORI AG</div>
                <div className="text-[#C0C0C0]/60 text-[8px]">Bielefeld, Germany</div>
              </div>
              <div className="text-right">
                <div className="text-[#7CC2A7] font-bold text-lg">98</div>
                <div className="text-[#C0C0C0]/40 text-[7px]">Score</div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: 'Employees', value: '12K+' },
                { label: 'Revenue', value: '€2.5B' },
                { label: 'Founded', value: '1870' },
                { label: 'Sites', value: '154' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0A0A0A] rounded p-1.5 text-center">
                  <div className="text-white font-medium text-[9px]">{stat.value}</div>
                  <div className="text-[#C0C0C0]/40 text-[6px]">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Certifications */}
            <div className="flex flex-wrap gap-1">
              {['ISO 9001', 'IATF 16949', 'ISO 14001'].map((cert) => (
                <span key={cert} className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[7px] rounded-full">
                  {cert}
                </span>
              ))}
            </div>
            
            {/* Capabilities */}
            <div className="text-[#C0C0C0]/60 text-[8px]">
              <span className="text-[#C0C0C0]/40">Capabilities:</span> 5-Axis CNC, High-Volume, Automotive Components
            </div>
            
            {/* CTA */}
            <button className="w-full py-1.5 bg-[#1391BF] text-white rounded text-[9px] font-medium">
              Add to Audit Order →
            </button>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#C0C0C0]/30 text-[10px]">
            Search for suppliers...
          </div>
        )}
      </div>
    </div>
  );
};

// Step 2: Order Audit - Multiple Suppliers Selection + Checklist Upload
const OrderAuditDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Supplier Selection */}
    <div className="w-1/2 p-3 flex flex-col border-r border-[#C0C0C0]/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/90 font-medium text-[10px]">Selected Suppliers</span>
        <span className="px-1.5 py-0.5 bg-[#1391BF]/20 text-[#1391BF] rounded text-[7px]">3 Selected</span>
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { name: "DMG MORI AG", location: "Bielefeld, Germany", score: 98, selected: true },
          { name: "Precision CNC Solutions", location: "Stuttgart, Germany", score: 94, selected: true },
          { name: "TechMold Industries", location: "Shanghai, China", score: 89, selected: true },
        ].map((supplier, i) => (
          <motion.div
            key={supplier.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`p-2 rounded-lg ${supplier.selected ? 'bg-[#1391BF]/10 border border-[#1391BF]/30' : 'bg-[#161616]'}`}
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 0.3 }}
                className="w-4 h-4 rounded bg-[#1391BF] flex items-center justify-center"
              >
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </motion.div>
              <div className="flex-1">
                <div className="text-white/90 text-[9px] font-medium">{supplier.name}</div>
                <div className="text-[#C0C0C0]/50 text-[7px]">{supplier.location}</div>
              </div>
              <div className="text-[#7CC2A7] text-[9px] font-medium">{supplier.score}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
    {/* Right: Audit Configuration */}
    <div className="w-1/2 p-3 flex flex-col">
      <div className="text-white/90 font-medium text-[10px] mb-3">Audit Configuration</div>
      
      <div className="space-y-2 flex-1">
        {/* Standard */}
        <div className="bg-[#161616] rounded-lg p-2">
          <div className="text-[#C0C0C0]/50 text-[7px] mb-1">Standard</div>
          <div className="text-white/90 text-[9px]">IATF 16949:2016</div>
        </div>
        
        {/* Schedule */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#161616] rounded-lg p-2">
            <div className="text-[#C0C0C0]/50 text-[7px] mb-1">Start Date</div>
            <div className="text-white/90 text-[9px]">Feb 15, 2025</div>
          </div>
          <div className="bg-[#161616] rounded-lg p-2">
            <div className="text-[#C0C0C0]/50 text-[7px] mb-1">Duration</div>
            <div className="text-white/90 text-[9px]">2 Days Each</div>
          </div>
        </div>
        
        {/* Checklist Upload */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-[#161616] rounded-lg p-2"
        >
          <div className="text-[#C0C0C0]/50 text-[7px] mb-1.5">Uploaded Checklist</div>
          <div className="flex items-center gap-2 p-1.5 bg-[#0A0A0A] rounded">
            <div className="w-6 h-7 bg-[#C4564F]/20 rounded flex items-center justify-center">
              <span className="text-[6px] text-[#C4564F] font-bold">PDF</span>
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-[8px]">IATF_Checklist_Custom.pdf</div>
              <div className="text-[#C0C0C0]/40 text-[7px]">2.4 MB • Uploaded</div>
            </div>
            <svg className="w-3 h-3 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </motion.div>
        
        {/* Price */}
        <div className="bg-[#7CC2A7]/10 border border-[#7CC2A7]/30 rounded-lg p-2">
          <div className="flex items-center justify-between">
            <span className="text-[#C0C0C0]/80 text-[9px]">Total (3 Audits)</span>
            <span className="text-[#7CC2A7] font-bold text-sm">€2,100</span>
          </div>
        </div>
      </div>
      
      <motion.button
        initial={{ scale: 0.95 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ delay: 2, duration: 0.3 }}
        className="w-full py-2 bg-[#1391BF] text-white rounded-lg text-[10px] font-medium"
      >
        Confirm & Order Audits
      </motion.button>
    </div>
  </div>
);

// Step 3: Audit Execution - China Factory with AIVOO Guidance + Computer Vision
const AuditExecutionDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Live View with Computer Vision */}
    <div className="w-1/2 relative">
      <img 
        src={equipmentImage} 
        alt="Factory Equipment" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Location Badge */}
      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#C4564F] animate-pulse" />
        <span className="text-white text-[8px]">LIVE • Shanghai, China</span>
      </div>
      
      {/* AI Detection Box */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute top-12 left-3 right-3 h-20 border-2 border-[#1391BF] rounded-lg"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-2 left-2 px-2 py-0.5 bg-[#1391BF] text-white text-[8px] font-medium rounded"
        >
          CNC Lathe NLX 2500/700
        </motion.div>
      </motion.div>
      
      {/* AI Analysis Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-sm rounded-lg p-2"
      >
        <div className="text-[#1391BF] text-[8px] font-medium mb-1">AIVOO Analysis</div>
        <div className="text-white/80 text-[8px]">Model: NLX 2500/700</div>
        <div className="text-white/60 text-[7px]">Year: 2022 • Condition: Good</div>
        <div className="text-[#7CC2A7] text-[7px]">94% confidence</div>
      </motion.div>
    </div>
    
    {/* Right: AIVOO Guidance */}
    <div className="w-1/2 p-3 flex flex-col">
      {/* Auditor Info */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C0C0C0]/10">
        <div className="w-7 h-7 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[9px] font-medium">
          WL
        </div>
        <div className="flex-1">
          <div className="text-white/90 text-[9px] font-medium">Wei Liu</div>
          <div className="text-[#7CC2A7] text-[7px]">On-site Auditor • Shanghai</div>
        </div>
      </div>
      
      {/* AIVOO Chat Guidance */}
      <div className="text-[#C0C0C0]/60 text-[7px] uppercase tracking-wide mb-2">AIVOO Guidance</div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {/* AI Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg p-2"
        >
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded-full bg-[#1391BF] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-[#1391BF] text-[8px] font-medium mb-1">Suggested Question</div>
              <div className="text-white/80 text-[8px]">"Can you show me the calibration records for this CNC machine?"</div>
            </div>
          </div>
        </motion.div>
        
        {/* Follow-up Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="space-y-1"
        >
          <div className="text-[#C0C0C0]/50 text-[7px]">Follow-up questions:</div>
          {[
            "Verify preventive maintenance schedule",
            "Check operator training records",
            "Review last SPC data"
          ].map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.8 + i * 0.2 }}
              className="flex items-center gap-1.5 text-[8px] text-white/70"
            >
              <div className="w-1 h-1 rounded-full bg-[#D8A860]" />
              <span>{q}</span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="bg-[#161616] rounded-lg p-2 mt-auto"
        >
          <div className="flex justify-between text-[8px] mb-1">
            <span className="text-[#C0C0C0]/60">Audit Progress</span>
            <span className="text-white">67%</span>
          </div>
          <div className="h-1.5 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ delay: 3.8, duration: 0.8 }}
              className="h-full bg-[#1391BF] rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Step 4: Comprehensive Report with Images, Charts, Findings
const ReportDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Overview + Charts */}
    <div className="w-1/2 p-3 flex flex-col border-r border-[#C0C0C0]/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-medium text-[10px]">TechMold Industries</div>
          <div className="text-[#C0C0C0]/60 text-[8px]">IATF 16949 • Shanghai, China</div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-[#7CC2A7]">87</div>
          <div className="text-[#C0C0C0]/40 text-[7px]">Score</div>
        </motion.div>
      </div>
      
      {/* Score Chart */}
      <div className="bg-[#161616] rounded-lg p-2 mb-2">
        <div className="text-[#C0C0C0]/60 text-[7px] mb-2">Category Scores</div>
        <div className="space-y-1.5">
          {[
            { label: 'Quality Management', score: 92, color: '#7CC2A7' },
            { label: 'Process Control', score: 85, color: '#1391BF' },
            { label: 'Documentation', score: 78, color: '#D8A860' },
            { label: 'Equipment Maintenance', score: 88, color: '#7CC2A7' },
          ].map((item, i) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex justify-between text-[8px]">
                <span className="text-[#C0C0C0]/70">{item.label}</span>
                <span className="text-white">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  style={{ backgroundColor: item.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Findings Summary */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-[#C4564F]/15 rounded-lg p-2 text-center"
        >
          <div className="text-[#C4564F] font-bold text-sm">1</div>
          <div className="text-[#C0C0C0]/40 text-[7px]">Major NC</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="bg-[#D8A860]/15 rounded-lg p-2 text-center"
        >
          <div className="text-[#D8A860] font-bold text-sm">3</div>
          <div className="text-[#C0C0C0]/40 text-[7px]">Minor NC</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
          className="bg-[#1391BF]/15 rounded-lg p-2 text-center"
        >
          <div className="text-[#1391BF] font-bold text-sm">5</div>
          <div className="text-[#C0C0C0]/40 text-[7px]">OFI</div>
        </motion.div>
      </div>
      
      <button className="w-full py-1.5 bg-[#1391BF] text-white rounded text-[9px] font-medium mt-auto">
        Download Full Report (PDF)
      </button>
    </div>
    
    {/* Right: Evidence + Key Findings */}
    <div className="w-1/2 p-3 flex flex-col">
      {/* Evidence Gallery */}
      <div className="text-[#C0C0C0]/60 text-[7px] uppercase tracking-wide mb-2">Evidence Gallery</div>
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <img src={equipmentImage} alt="Evidence" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
            <span className="text-white text-[7px]">CNC Area</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4 }}
          className="relative aspect-video rounded-lg overflow-hidden"
        >
          <img src={factoryImage} alt="Evidence" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
            <span className="text-white text-[7px]">Assembly</span>
          </div>
        </motion.div>
      </div>
      <div className="text-[#C0C0C0]/50 text-[7px] mb-3">47 photos • 12 documents attached</div>
      
      {/* Key Findings */}
      <div className="text-[#C0C0C0]/60 text-[7px] uppercase tracking-wide mb-2">Key Findings</div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 }}
          className="bg-[#C4564F]/10 border border-[#C4564F]/30 rounded-lg p-2"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-[#C4564F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-[#C4564F] text-[8px] font-medium">Major NC</span>
          </div>
          <div className="text-white/80 text-[8px]">Missing batch traceability for production run #2024-1847</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.2 }}
          className="bg-[#D8A860]/10 border border-[#D8A860]/30 rounded-lg p-2"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-[#D8A860]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#D8A860] text-[8px] font-medium">Minor NC</span>
          </div>
          <div className="text-white/80 text-[8px]">CMM calibration certificate expired by 3 weeks</div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Step 5: Detailed Follow-up with Responsible, Deadline, Tasks, Status
const FollowUpDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Task Cards */}
    <div className="w-3/5 p-3 flex flex-col border-r border-[#C0C0C0]/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/90 font-medium text-[10px]">Corrective Actions</span>
        <div className="flex gap-1.5">
          <span className="px-1.5 py-0.5 bg-[#D8A860]/20 text-[#D8A860] rounded text-[7px]">2 In Progress</span>
          <span className="px-1.5 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[7px]">1 Complete</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { 
            title: 'Batch Traceability System',
            status: 'In Progress',
            statusColor: '#D8A860',
            responsible: 'Zhang Wei',
            role: 'Quality Director',
            deadline: 'Feb 28, 2025',
            progress: 45,
            priority: 'High'
          },
          { 
            title: 'CMM Recalibration',
            status: 'Pending Review',
            statusColor: '#1391BF',
            responsible: 'Li Ming',
            role: 'Metrology Manager',
            deadline: 'Feb 20, 2025',
            progress: 90,
            priority: 'Medium'
          },
          { 
            title: 'Operator Training Update',
            status: 'Complete',
            statusColor: '#7CC2A7',
            responsible: 'Chen Hua',
            role: 'HR Manager',
            deadline: 'Feb 15, 2025',
            progress: 100,
            priority: 'Low'
          },
        ].map((task, i) => (
          <motion.div
            key={task.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className={`bg-[#161616] rounded-lg p-2.5 ${task.status === 'In Progress' ? 'border border-[#D8A860]/30' : ''}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-white/90 text-[9px] font-medium">{task.title}</span>
                  <span className={`px-1 py-0.5 text-[6px] rounded ${task.priority === 'High' ? 'bg-[#C4564F]/20 text-[#C4564F]' : task.priority === 'Medium' ? 'bg-[#D8A860]/20 text-[#D8A860]' : 'bg-[#C0C0C0]/20 text-[#C0C0C0]'}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[8px]">
                  <div className="flex items-center gap-1 text-[#C0C0C0]/60">
                    <div className="w-4 h-4 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-[6px] font-bold">
                      {task.responsible.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{task.responsible}</span>
                  </div>
                  <span className="text-[#C0C0C0]/40">•</span>
                  <span className="text-[#C0C0C0]/50">{task.role}</span>
                </div>
              </div>
              <span 
                className="px-1.5 py-0.5 text-[7px] rounded-full"
                style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor }}
              >
                {task.status}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex-1 h-1.5 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                  style={{ backgroundColor: task.statusColor }}
                  className="h-full rounded-full"
                />
              </div>
              <span className="text-[#C0C0C0]/60 text-[8px] w-8 text-right">{task.progress}%</span>
            </div>
            
            {/* Deadline */}
            <div className="flex items-center gap-1 text-[7px] text-[#C0C0C0]/50">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {task.deadline}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
    {/* Right: Activity & Schedule */}
    <div className="w-2/5 p-3 flex flex-col">
      {/* Re-audit Schedule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg p-2 mb-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#1391BF] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="text-white/90 font-medium text-[9px]">Re-audit Scheduled</div>
            <div className="text-[#1391BF] text-[8px]">May 15, 2025</div>
          </div>
        </div>
      </motion.div>
      
      {/* Activity Timeline */}
      <div className="text-[#C0C0C0]/60 text-[7px] uppercase tracking-wide mb-2">Recent Activity</div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {[
          { time: '2h ago', text: 'Zhang Wei uploaded evidence photos', color: '#7CC2A7', user: 'ZW' },
          { time: '5h ago', text: 'Li Ming submitted calibration cert', color: '#1391BF', user: 'LM' },
          { time: '1d ago', text: 'Chen Hua completed training task', color: '#7CC2A7', user: 'CH' },
          { time: '2d ago', text: 'Deadline reminder sent to team', color: '#D8A860', user: 'SYS' },
        ].map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.15 }}
            className="flex items-start gap-2"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[6px] font-bold text-white flex-shrink-0" style={{ backgroundColor: activity.color }}>
              {activity.user}
            </div>
            <div>
              <div className="text-white/70 text-[8px]">{activity.text}</div>
              <div className="text-[#C0C0C0]/40 text-[7px]">{activity.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const PlatformDemoAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 7000); // Change step every 7 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const renderDemo = () => {
    switch (currentStep) {
      case 0: return <SupplierSearchDemo />;
      case 1: return <OrderAuditDemo />;
      case 2: return <AuditExecutionDemo />;
      case 3: return <ReportDemo />;
      case 4: return <FollowUpDemo />;
      default: return <SupplierSearchDemo />;
    }
  };
  
  return (
    <div className="w-full">
      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {demoSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === currentStep 
                ? 'bg-[#1391BF] text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
      
      {/* Demo Window */}
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 border border-gray-200">
              yvoo.com/platform/{demoSteps[currentStep].title.toLowerCase().replace(' ', '-')}
            </div>
          </div>
        </div>
        
        {/* Demo Content */}
        <div className="aspect-video bg-[#0A0A0A] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderDemo()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Current Step Title */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {demoSteps.length}: <span className="font-medium text-gray-700">{demoSteps[currentStep].title}</span>
        </p>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
