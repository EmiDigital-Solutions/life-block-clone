import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";

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

// Step 1: Supplier Search - DMG MORI Profile
const SupplierSearchDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">1</div>
      <span className="text-white/90 font-medium">Find Supplier</span>
    </div>
    
    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#161616] rounded-xl p-3 mb-3"
    >
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-[#0A0A0A] rounded border border-[#C0C0C0]/20 px-3 flex items-center">
          <svg className="w-3.5 h-3.5 text-[#C0C0C0]/40 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80"
          >
            DMG MORI
          </motion.span>
        </div>
        <motion.button
          initial={{ scale: 0.95 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="px-4 py-2 bg-[#1391BF] text-white rounded-lg text-[11px] font-medium"
        >
          Search
        </motion.button>
      </div>
    </motion.div>

    {/* DMG MORI Supplier Profile Card */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="flex-1 bg-[#161616] rounded-xl p-3 space-y-3"
    >
      {/* Company Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-[#0A0A0A] font-bold text-[9px] text-center leading-tight">DMG<br/>MORI</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm">DMG MORI AG</div>
          <div className="flex items-center gap-1.5 text-[#C0C0C0]/70 text-[10px] mt-0.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Bielefeld, Germany</span>
          </div>
          <div className="text-[#C0C0C0]/50 text-[10px]">CNC Machine Manufacturing</div>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
          className="text-right"
        >
          <div className="text-[#7CC2A7] font-bold text-lg">98</div>
          <div className="text-[#C0C0C0]/40 text-[9px]">Risk Score</div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="grid grid-cols-4 gap-1.5"
      >
        {[
          { label: 'Employees', value: '12,000+' },
          { label: 'Revenue', value: '€2.5B' },
          { label: 'Founded', value: '1870' },
          { label: 'Sites', value: '154' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0A0A0A] rounded-lg p-2 text-center">
            <div className="text-white font-medium text-[11px]">{stat.value}</div>
            <div className="text-[#C0C0C0]/40 text-[8px]">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Certifications */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="flex flex-wrap gap-1.5"
      >
        {['ISO 9001', 'ISO 14001', 'IATF 16949', 'ISO 45001'].map((cert) => (
          <span key={cert} className="px-2 py-1 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[9px] rounded-full border border-[#7CC2A7]/30">
            {cert}
          </span>
        ))}
      </motion.div>

      {/* Product Categories */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="text-[#C0C0C0]/60 text-[9px]"
      >
        <span className="text-[#C0C0C0]/40">Products:</span> CNC Lathes, Milling Machines, Automation Systems, Digital Solutions
      </motion.div>
    </motion.div>
  </div>
);

// Step 2: Order Audit
const OrderAuditDemo = () => (
  <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
      <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
      <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">2</div>
      <span className="text-white/90 font-medium">Order Audit</span>
    </div>
    
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161616] rounded-xl p-4 mb-3"
    >
      <div className="flex items-center gap-3 mb-3 p-3 bg-[#0A0A0A] rounded-lg border border-[#1391BF]/30">
        <div className="w-3 h-3 rounded-sm bg-[#1391BF] flex items-center justify-center">
          <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-white/90 font-medium">Müller GmbH</div>
          <div className="text-[#C0C0C0]/60 text-[10px]">Stuttgart, Germany • ISO 9001</div>
        </div>
        <div className="px-2 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[10px]">Low Risk</div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-[#161616] rounded-xl p-4 mb-3"
    >
      <div className="text-[#C0C0C0]/80 text-[10px] mb-2">Audit Configuration</div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Standard", value: "ISO 9001:2015" },
          { label: "Duration", value: "2 Days" },
          { label: "Date", value: "Dec 28, 2025" },
          { label: "Price", value: "€1,400" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="bg-[#0A0A0A] p-2 rounded-lg"
          >
            <div className="text-[#C0C0C0]/50 text-[9px]">{item.label}</div>
            <div className="text-white/90 font-medium">{item.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="mt-auto py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      Confirm & Order Audit
    </motion.button>
  </div>
);

// Step 3: Audit Execution
const AuditExecutionDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    <div className="flex-1 relative">
      <img 
        src={equipmentImage} 
        alt="Equipment" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-4"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute top-4 left-4 right-4 h-24 border-2 border-[#7CC2A7] rounded-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-2 left-2 px-2 py-0.5 bg-[#7CC2A7] text-white text-[10px] font-medium rounded"
          >
            CNC Lathe DMG MORI NLX 2500
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3"
        >
          <div className="text-[#7CC2A7] text-[10px] font-medium mb-1">AI Detection</div>
          <div className="text-white/80 text-[10px]">Model: NLX 2500/700</div>
          <div className="text-white/60 text-[9px]">Condition: Good • 94% confidence</div>
        </motion.div>
      </motion.div>
    </div>
    
    <div className="w-32 bg-[#161616] p-3 flex flex-col">
      <div className="text-[#C0C0C0]/60 text-[9px] uppercase tracking-wide mb-2">Progress</div>
      {[
        { name: "Opening", status: "complete" },
        { name: "Documents", status: "complete" },
        { name: "Process A", status: "complete" },
        { name: "Process B", status: "active" },
        { name: "Interviews", status: "pending" },
      ].map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="flex items-center gap-2 py-1.5"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${
            item.status === 'complete' ? 'bg-[#7CC2A7]' : 
            item.status === 'active' ? 'bg-[#1391BF]' : 'bg-[#C0C0C0]/20'
          }`} />
          <span className={`text-[9px] ${
            item.status === 'active' ? 'text-[#1391BF] font-medium' : 
            item.status === 'complete' ? 'text-white/70' : 'text-[#C0C0C0]/40'
          }`}>{item.name}</span>
        </motion.div>
      ))}
      
      <div className="mt-auto space-y-2">
        <div className="bg-[#D8A860]/15 rounded p-2">
          <div className="text-[#D8A860] text-[9px] font-medium">1 Minor</div>
        </div>
        <div className="bg-[#1391BF]/15 rounded p-2">
          <div className="text-[#1391BF] text-[9px] font-medium">1 OFI</div>
        </div>
      </div>
    </div>
  </div>
);

// Step 4: Report Generation - Comprehensive with findings, images, charts
const ReportDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left Panel - Report Overview */}
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
        <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
        <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">4</div>
        <span className="text-white/90 font-medium">Report</span>
      </div>
      
      {/* Header with Score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#161616] rounded-xl p-3 mb-3"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-white font-medium">DMG MORI AG</div>
            <div className="text-[#C0C0C0]/60 text-[10px]">IATF 16949 Audit • Jan 2025</div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-[#7CC2A7]">87</div>
            <div className="text-[#C0C0C0]/40 text-[9px]">Overall Score</div>
          </motion.div>
        </div>
        
        {/* Score Chart Bars */}
        <div className="space-y-2">
          {[
            { label: 'Quality Management', score: 92, color: '#7CC2A7' },
            { label: 'Process Control', score: 85, color: '#1391BF' },
            { label: 'Documentation', score: 78, color: '#D8A860' },
            { label: 'Equipment Maint.', score: 88, color: '#7CC2A7' },
          ].map((item, i) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex justify-between text-[9px]">
                <span className="text-[#C0C0C0]/60">{item.label}</span>
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
      </motion.div>

      {/* Findings Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="grid grid-cols-3 gap-2 mb-3"
      >
        <div className="bg-[#C4564F]/15 rounded-lg p-2 text-center">
          <div className="text-[#C4564F] font-bold">1</div>
          <div className="text-[#C0C0C0]/40 text-[9px]">Major NC</div>
        </div>
        <div className="bg-[#D8A860]/15 rounded-lg p-2 text-center">
          <div className="text-[#D8A860] font-bold">3</div>
          <div className="text-[#C0C0C0]/40 text-[9px]">Minor NC</div>
        </div>
        <div className="bg-[#1391BF]/15 rounded-lg p-2 text-center">
          <div className="text-[#1391BF] font-bold">5</div>
          <div className="text-[#C0C0C0]/40 text-[9px]">OFI</div>
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-auto py-2.5 bg-[#1391BF] text-white rounded-lg text-[11px] font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Full Report (PDF)
      </motion.button>
    </div>

    {/* Right Panel - Evidence & Findings */}
    <div className="w-44 bg-[#161616] p-3 flex flex-col gap-3">
      {/* Evidence Gallery */}
      <div>
        <div className="text-[#C0C0C0]/60 text-[9px] uppercase tracking-wide mb-2">Evidence</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="relative rounded-lg overflow-hidden"
        >
          <img src={equipmentImage} alt="Evidence" className="w-full h-16 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
            <div className="text-white text-[8px]">47 photos attached</div>
          </div>
        </motion.div>
      </div>

      {/* Key Findings */}
      <div className="flex-1">
        <div className="text-[#C0C0C0]/60 text-[9px] uppercase tracking-wide mb-2">Key Findings</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-2"
        >
          <div className="bg-[#C4564F]/10 border border-[#C4564F]/30 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3 h-3 text-[#C4564F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-[#C4564F] text-[9px] font-medium">Major NC</span>
            </div>
            <div className="text-white/70 text-[8px]">Missing traceability for batch #2024-1847</div>
          </div>
          <div className="bg-[#D8A860]/10 border border-[#D8A860]/30 rounded-lg p-2">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3 h-3 text-[#D8A860]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[#D8A860] text-[9px] font-medium">Minor NC</span>
            </div>
            <div className="text-white/70 text-[8px]">CMM calibration records incomplete</div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Step 5: Follow-up Manager - Detailed with responsible, deadline, tasks, status
const FollowUpDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Main Panel - Tasks */}
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm">✓</div>
        <div className="h-0.5 flex-1 bg-[#7CC2A7]" />
        <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">5</div>
        <span className="text-white/90 font-medium">Follow-up</span>
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-white font-medium">Corrective Actions</div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-[#D8A860]/20 text-[#D8A860] rounded text-[9px]">2 In Progress</div>
          <div className="px-2 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[9px]">1 Complete</div>
        </div>
      </div>
      
      {/* Task Cards */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {[
          { 
            title: 'Traceability Documentation Update',
            status: 'In Progress',
            statusColor: '#D8A860',
            responsible: 'Hans Mueller',
            role: 'Quality Manager',
            deadline: 'Feb 15, 2025',
            progress: 65,
            tasks: 4,
            completed: 2
          },
          { 
            title: 'CMM Calibration Records',
            status: 'Pending Review',
            statusColor: '#1391BF',
            responsible: 'Anna Schmidt',
            role: 'Metrology Lead',
            deadline: 'Feb 20, 2025',
            progress: 90,
            tasks: 3,
            completed: 3
          },
          { 
            title: 'Training Records Update',
            status: 'Complete',
            statusColor: '#7CC2A7',
            responsible: 'Thomas Weber',
            role: 'HR Manager',
            deadline: 'Feb 10, 2025',
            progress: 100,
            tasks: 2,
            completed: 2
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className={`bg-[#161616] rounded-lg p-3 ${
              item.status === 'In Progress' ? 'border border-[#D8A860]/30' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-white/90 font-medium text-[11px]">{item.title}</div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 text-[#C0C0C0]/60 text-[9px]">
                    <div className="w-4 h-4 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-[7px] font-bold">
                      {item.responsible.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{item.responsible}</span>
                    <span className="text-[#C0C0C0]/40">• {item.role}</span>
                  </div>
                </div>
              </div>
              <span 
                className="px-2 py-0.5 text-[9px] rounded-full"
                style={{ backgroundColor: `${item.statusColor}20`, color: item.statusColor }}
              >
                {item.status}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1.5 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                  style={{ backgroundColor: item.statusColor }}
                  className="h-full rounded-full"
                />
              </div>
              <span className="text-[#C0C0C0]/60 text-[9px]">{item.progress}%</span>
            </div>
            
            {/* Meta */}
            <div className="flex items-center gap-3 text-[9px] text-[#C0C0C0]/50">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Due: {item.deadline}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{item.completed}/{item.tasks} Tasks</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Right Panel - Activity & Schedule */}
    <div className="w-40 bg-[#161616] p-3 flex flex-col gap-3">
      {/* Re-audit Schedule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg p-2"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="text-white/90 font-medium text-[10px]">Re-audit</div>
            <div className="text-[#1391BF] text-[9px]">Mar 15, 2026</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="flex-1">
        <div className="text-[#C0C0C0]/60 text-[9px] uppercase tracking-wide mb-2">Activity</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="space-y-2"
        >
          {[
            { time: '2h ago', text: 'Hans uploaded evidence', color: '#7CC2A7' },
            { time: '5h ago', text: 'Anna requested review', color: '#1391BF' },
            { time: '1d ago', text: 'Thomas completed task', color: '#7CC2A7' },
            { time: '2d ago', text: 'Deadline reminder sent', color: '#D8A860' },
          ].map((activity, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + i * 0.15 }}
              className="flex items-start gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: activity.color }} />
              <div>
                <div className="text-white/70 text-[9px]">{activity.text}</div>
                <div className="text-[#C0C0C0]/40 text-[8px]">{activity.time}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
);

const PlatformDemoAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 7000); // Change step every 7 seconds for better absorption
    
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
