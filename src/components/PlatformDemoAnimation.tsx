import { useState, useEffect } from "react";
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

// Step 1: AI-Powered Supplier Search - Conversation → Results List → Full Profile
const SupplierSearchDemo = () => {
  const [phase, setPhase] = useState<'chat' | 'results' | 'profile'>('chat');
  const [chatStep, setChatStep] = useState(0);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setPhase('chat');
    setChatStep(0);
    
    timers.push(setTimeout(() => setChatStep(1), 400));
    timers.push(setTimeout(() => setChatStep(2), 1200));
    timers.push(setTimeout(() => setChatStep(3), 2000));
    timers.push(setTimeout(() => setChatStep(4), 2800));
    timers.push(setTimeout(() => setPhase('results'), 3500));
    timers.push(setTimeout(() => setPhase('profile'), 5000));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const suppliers = [
    { name: "DMG MORI AG", location: "Bielefeld, Germany", certs: ["ISO 9001", "IATF 16949"], score: 98 },
    { name: "Precision CNC Solutions", location: "Stuttgart, Germany", certs: ["ISO 9001", "ISO 14001"], score: 94 },
    { name: "TechMold Industries", location: "Shanghai, China", certs: ["IATF 16949", "TS 16949"], score: 89 },
    { name: "AutoPrecision GmbH", location: "Munich, Germany", certs: ["VDA 6.3", "IATF 16949"], score: 91 },
  ];

  return (
    <div className="h-full flex flex-col text-xs bg-[#0A0A0A] p-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#C0C0C0]/10">
        <div className="w-5 h-5 rounded bg-[#1391BF] flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span className="text-white/90 font-medium text-[10px]">SearchPro+</span>
        <span className="px-1.5 py-0.5 bg-[#1391BF]/20 text-[#1391BF] rounded text-[7px]">AI-Powered</span>
      </div>

      {phase === 'chat' && (
        <div className="flex-1 flex flex-col">
          <div className="text-[#C0C0C0]/60 text-[7px] mb-2">Conversational Search</div>
          <div className="flex-1 space-y-1.5 overflow-hidden">
            {chatStep >= 1 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-1.5">
                <div className="w-4 h-4 rounded bg-[#161616] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 text-[#1391BF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-[#161616] rounded-lg rounded-bl-none p-1.5 max-w-[80%]">
                  <p className="text-white/80 text-[8px]">What type of supplier are you looking for?</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 2 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="bg-[#1391BF] rounded-lg rounded-br-none p-1.5 max-w-[80%]">
                  <p className="text-white text-[8px]">CNC machining, automotive sector, IATF certified</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 3 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-1.5">
                <div className="w-4 h-4 rounded bg-[#161616] flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 text-[#1391BF]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-[#161616] rounded-lg rounded-bl-none p-1.5 max-w-[80%]">
                  <p className="text-white/80 text-[8px]">Region and volume capacity preference?</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 4 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="bg-[#1391BF] rounded-lg rounded-br-none p-1.5 max-w-[80%]">
                  <p className="text-white text-[8px]">Germany or China, high-volume production</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-1.5">
                <div className="w-4 h-4 rounded bg-[#161616] flex items-center justify-center flex-shrink-0">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-2 h-2 border border-[#1391BF] border-t-transparent rounded-full" />
                </div>
                <div className="bg-[#161616] rounded-lg rounded-bl-none p-1.5">
                  <p className="text-[#1391BF] text-[8px]">Searching 25M+ suppliers...</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {phase === 'results' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-3 h-3 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span className="text-white/90 text-[9px] font-medium">4 Matching Suppliers Found</span>
          </div>
          
          <div className="grid grid-cols-2 gap-1.5 flex-1">
            {suppliers.map((supplier, i) => (
              <motion.div
                key={supplier.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-[#161616] rounded-lg p-2 cursor-pointer transition-all ${i === 0 ? 'ring-1 ring-[#1391BF]' : 'hover:bg-[#1a1a1a]'}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-white/90 text-[8px] font-medium truncate flex-1">{supplier.name}</span>
                  <span className="text-[#7CC2A7] text-[7px] font-bold ml-1">{supplier.score}</span>
                </div>
                <div className="flex items-center gap-1 text-[#C0C0C0]/60 text-[6px] mb-1">
                  <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="truncate">{supplier.location}</span>
                </div>
                <div className="flex gap-0.5 flex-wrap">
                  {supplier.certs.slice(0, 2).map((cert) => (
                    <span key={cert} className="px-1 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[5px] rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {phase === 'profile' && (
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col overflow-hidden">
          {/* Profile Header */}
          <div className="flex items-start gap-2 mb-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#0A0A0A] font-bold text-[7px] text-center leading-tight">DMG<br/>MORI</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-[10px]">DMG MORI AG</div>
              <div className="flex items-center gap-1 text-[#C0C0C0]/60 text-[7px]">
                <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Bielefeld, Germany</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#7CC2A7] font-bold text-lg">98</div>
              <div className="text-[#C0C0C0]/40 text-[6px]">Score</div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-1 mb-2">
            {[
              { label: 'Employees', value: '12K+' },
              { label: 'Revenue', value: '€2.5B' },
              { label: 'Founded', value: '1870' },
              { label: 'Sites', value: '154' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#161616] rounded p-1 text-center">
                <div className="text-white font-medium text-[8px]">{stat.value}</div>
                <div className="text-[#C0C0C0]/40 text-[5px]">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Two Column Layout */}
          <div className="flex gap-2 flex-1 min-h-0">
            {/* Left Column */}
            <div className="flex-1 space-y-2 overflow-hidden">
              {/* Certifications */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Certifications</div>
                <div className="flex flex-wrap gap-0.5">
                  {['ISO 9001', 'IATF 16949', 'ISO 14001', 'ISO 45001', 'VDA 6.3'].map((cert) => (
                    <span key={cert} className="px-1 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[6px] rounded border border-[#7CC2A7]/30">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Equipment */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Key Equipment</div>
                <div className="space-y-0.5 text-[6px] text-white/70">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#1391BF]" />
                    <span>5-Axis CNC NLX 2500</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#1391BF]" />
                    <span>DMC 125 FD duoBLOCK</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#1391BF]" />
                    <span>CMM Zeiss PRISMO</span>
                  </div>
                </div>
              </div>
              
              {/* Production Capacity */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Production Capacity</div>
                <div className="bg-[#161616] rounded p-1.5">
                  <div className="flex justify-between text-[6px] mb-0.5">
                    <span className="text-[#C0C0C0]/60">Monthly Output</span>
                    <span className="text-white">45,000 pcs</span>
                  </div>
                  <div className="h-1 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-[#7CC2A7] rounded-full" />
                  </div>
                  <div className="text-[#7CC2A7] text-[5px] mt-0.5">85% Utilization</div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex-1 space-y-2 overflow-hidden">
              {/* Audit History */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Audit History</div>
                <div className="space-y-1">
                  {[
                    { date: 'Dec 2024', type: 'IATF', score: 96 },
                    { date: 'Jun 2024', type: 'VDA 6.3', score: 94 },
                    { date: 'Jan 2024', type: 'ISO 14001', score: 98 },
                  ].map((audit, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#161616] rounded p-1">
                      <div>
                        <div className="text-white/80 text-[6px]">{audit.type}</div>
                        <div className="text-[#C0C0C0]/40 text-[5px]">{audit.date}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-1 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#7CC2A7] rounded-full" style={{ width: `${audit.score}%` }} />
                        </div>
                        <span className="text-[#7CC2A7] text-[6px] font-medium">{audit.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Customers */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Key Customers</div>
                <div className="flex flex-wrap gap-0.5">
                  {['BMW', 'Audi', 'Mercedes', 'Bosch', 'ZF'].map((customer) => (
                    <span key={customer} className="px-1 py-0.5 bg-[#1391BF]/10 text-[#1391BF] text-[5px] rounded">
                      {customer}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Financial */}
              <div>
                <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Financial Health</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="bg-[#161616] rounded p-1 text-center">
                    <div className="text-[#7CC2A7] font-bold text-[8px]">A+</div>
                    <div className="text-[#C0C0C0]/40 text-[5px]">Credit</div>
                  </div>
                  <div className="bg-[#161616] rounded p-1 text-center">
                    <div className="text-[#7CC2A7] font-bold text-[8px]">+8%</div>
                    <div className="text-[#C0C0C0]/40 text-[5px]">YoY Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <button className="w-full py-1.5 bg-[#1391BF] text-white rounded-lg text-[8px] font-medium mt-2 flex items-center justify-center gap-1">
            <span>Add to Audit Order</span>
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Step 2: Enhanced Order Audit
const OrderAuditDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Supplier Selection */}
    <div className="w-1/2 p-3 flex flex-col border-r border-[#C0C0C0]/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/90 font-medium text-[9px]">Selected Suppliers</span>
        <span className="px-1.5 py-0.5 bg-[#1391BF]/20 text-[#1391BF] rounded text-[6px]">3 Selected</span>
      </div>
      
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { name: "DMG MORI AG", location: "Bielefeld, Germany", score: 98, standard: "IATF 16949" },
          { name: "TechMold Industries", location: "Shanghai, China", score: 89, standard: "VDA 6.3" },
          { name: "Precision CNC Solutions", location: "Stuttgart, Germany", score: 94, standard: "ISO 9001" },
        ].map((supplier, i) => (
          <motion.div
            key={supplier.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="p-2 rounded-lg bg-[#1391BF]/10 border border-[#1391BF]/30"
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.2 }}
                className="w-4 h-4 rounded bg-[#1391BF] flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <div className="text-white/90 text-[8px] font-medium truncate">{supplier.name}</div>
                  <span className="text-[#7CC2A7] text-[7px]">{supplier.score}</span>
                </div>
                <div className="flex items-center gap-1 text-[6px]">
                  <span className="text-[#C0C0C0]/50">{supplier.location}</span>
                  <span className="text-[#C0C0C0]/30">•</span>
                  <span className="text-[#1391BF]">{supplier.standard}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Uploaded Documents */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-2">
        <div className="text-[#C0C0C0]/60 text-[6px] mb-1">Uploaded Documents</div>
        <div className="space-y-1">
          {[
            { name: "IATF_Checklist_v2.pdf", size: "2.4 MB" },
            { name: "Custom_Requirements.xlsx", size: "156 KB" },
          ].map((doc, i) => (
            <div key={i} className="flex items-center gap-1.5 p-1.5 bg-[#161616] rounded">
              <div className="w-5 h-6 bg-[#C4564F]/20 rounded flex items-center justify-center">
                <span className="text-[5px] text-[#C4564F] font-bold">{doc.name.split('.').pop()?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-[7px] truncate">{doc.name}</div>
                <div className="text-[#C0C0C0]/40 text-[6px]">{doc.size}</div>
              </div>
              <svg className="w-3 h-3 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
    
    {/* Right: Configuration */}
    <div className="w-1/2 p-3 flex flex-col">
      <div className="text-white/90 font-medium text-[9px] mb-2">Audit Configuration</div>
      
      <div className="space-y-2 flex-1">
        {/* Schedule Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-[#161616] rounded p-1.5">
            <div className="text-[#C0C0C0]/50 text-[6px] mb-0.5">Start Date</div>
            <div className="text-white/90 text-[8px]">Feb 15, 2025</div>
          </div>
          <div className="bg-[#161616] rounded p-1.5">
            <div className="text-[#C0C0C0]/50 text-[6px] mb-0.5">Duration</div>
            <div className="text-white/90 text-[8px]">2 Days / Audit</div>
          </div>
        </div>
        
        {/* Auditor Assignment */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="bg-[#161616] rounded-lg p-2">
          <div className="text-[#C0C0C0]/50 text-[6px] mb-1.5">Assigned Auditors</div>
          <div className="space-y-1.5">
            {[
              { name: "Dr. Schmidt", region: "Germany", cert: "Lead Auditor IATF" },
              { name: "Wei Liu", region: "China", cert: "VDA 6.3 Specialist" },
            ].map((auditor, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[6px] font-medium">
                  {auditor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-white/90 text-[7px]">{auditor.name}</div>
                  <div className="text-[#C0C0C0]/50 text-[6px]">{auditor.region} • {auditor.cert}</div>
                </div>
                <svg className="w-3 h-3 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Price Breakdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="bg-[#7CC2A7]/10 border border-[#7CC2A7]/30 rounded-lg p-2">
          <div className="space-y-1 mb-2">
            <div className="flex justify-between text-[7px]">
              <span className="text-[#C0C0C0]/70">DMG MORI (2 days)</span>
              <span className="text-white/80">€700</span>
            </div>
            <div className="flex justify-between text-[7px]">
              <span className="text-[#C0C0C0]/70">TechMold (2 days)</span>
              <span className="text-white/80">€700</span>
            </div>
            <div className="flex justify-between text-[7px]">
              <span className="text-[#C0C0C0]/70">Precision CNC (2 days)</span>
              <span className="text-white/80">€700</span>
            </div>
          </div>
          <div className="border-t border-[#7CC2A7]/30 pt-1.5 flex items-center justify-between">
            <span className="text-[#C0C0C0]/80 text-[8px]">Total (3 Audits)</span>
            <span className="text-[#7CC2A7] font-bold text-sm">€2,100</span>
          </div>
        </motion.div>
      </div>
      
      <motion.button
        initial={{ scale: 0.95 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ delay: 2, duration: 0.3 }}
        className="w-full py-2 bg-[#1391BF] text-white rounded-lg text-[9px] font-medium"
      >
        Confirm & Order Audits
      </motion.button>
    </div>
  </div>
);

// Step 3: Enhanced Audit Execution - China Factory
const AuditExecutionDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Live View with Computer Vision */}
    <div className="w-1/2 relative">
      <img src={equipmentImage} alt="Factory Equipment" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Location Badge */}
      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#C4564F] animate-pulse" />
        <span className="text-white text-[7px]">LIVE • Shanghai, China</span>
      </div>
      
      {/* AI Detection Boxes */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-10 left-3 right-3 h-16 border-2 border-[#1391BF] rounded-lg"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute -top-2 left-2 px-1.5 py-0.5 bg-[#1391BF] text-white text-[7px] font-medium rounded"
        >
          CNC Lathe NLX 2500/700
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-1 left-2 text-[#7CC2A7] text-[6px]"
        >
          ✓ Calibration Valid • ✓ Safety Guard OK
        </motion.div>
      </motion.div>
      
      {/* Second Detection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-16 left-6 w-12 h-8 border border-[#D8A860] rounded"
      >
        <div className="absolute -top-2 left-1 px-1 py-0.5 bg-[#D8A860] text-white text-[5px] rounded">
          Label Missing
        </div>
      </motion.div>
      
      {/* AI Analysis Panel */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 w-28"
      >
        <div className="text-[#1391BF] text-[7px] font-medium mb-1">AIVOO Vision</div>
        <div className="space-y-0.5 text-[6px]">
          <div className="flex justify-between">
            <span className="text-[#C0C0C0]/60">Model:</span>
            <span className="text-white/80">NLX 2500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#C0C0C0]/60">Year:</span>
            <span className="text-white/80">2022</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#C0C0C0]/60">Condition:</span>
            <span className="text-[#7CC2A7]">Good</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#C0C0C0]/60">Confidence:</span>
            <span className="text-[#1391BF]">96%</span>
          </div>
        </div>
      </motion.div>
    </div>
    
    {/* Right: AIVOO Guidance */}
    <div className="w-1/2 p-2.5 flex flex-col">
      {/* Auditor Info */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#C0C0C0]/10">
        <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-[8px] font-medium">
          WL
        </div>
        <div className="flex-1">
          <div className="text-white/90 text-[8px] font-medium">Wei Liu</div>
          <div className="text-[#7CC2A7] text-[6px]">On-site Auditor • Shanghai</div>
        </div>
        <div className="text-right">
          <div className="text-white/90 text-[8px]">67%</div>
          <div className="text-[#C0C0C0]/40 text-[5px]">Progress</div>
        </div>
      </div>
      
      {/* AIVOO Chat */}
      <div className="text-[#C0C0C0]/60 text-[6px] uppercase tracking-wide mb-1.5">AIVOO Guidance</div>
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {/* AI Suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg p-2"
        >
          <div className="flex items-start gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#1391BF] flex items-center justify-center flex-shrink-0">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-[#1391BF] text-[7px] font-medium mb-0.5">Suggested Question</div>
              <div className="text-white/80 text-[7px]">"Can you show calibration records for this CNC machine?"</div>
            </div>
          </div>
        </motion.div>
        
        {/* Checklist Items */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="bg-[#161616] rounded-lg p-2">
          <div className="text-[#C0C0C0]/60 text-[6px] mb-1.5">Current Checklist Section</div>
          <div className="space-y-1">
            {[
              { text: "Equipment identification", done: true },
              { text: "Calibration records", done: true },
              { text: "Maintenance schedule", done: false, current: true },
              { text: "Operator training", done: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-1.5 text-[7px] ${item.current ? 'text-[#1391BF]' : item.done ? 'text-[#7CC2A7]' : 'text-[#C0C0C0]/50'}`}>
                {item.done ? (
                  <svg className="w-2.5 h-2.5 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : item.current ? (
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-[#1391BF] animate-pulse" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-[#C0C0C0]/30" />
                )}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Follow-up Questions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="space-y-1">
          <div className="text-[#C0C0C0]/50 text-[6px]">Next questions:</div>
          {["Verify preventive maintenance", "Check SPC data", "Review last audit findings"].map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 + i * 0.15 }}
              className="flex items-center gap-1 text-[6px] text-white/60"
            >
              <div className="w-1 h-1 rounded-full bg-[#D8A860]" />
              <span>{q}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-2 bg-[#161616] rounded-lg p-1.5">
        <div className="flex justify-between text-[7px] mb-1">
          <span className="text-[#C0C0C0]/60">Audit Progress</span>
          <span className="text-white">67%</span>
        </div>
        <div className="h-1.5 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '67%' }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="h-full bg-[#1391BF] rounded-full"
          />
        </div>
      </div>
    </div>
  </div>
);

// Step 4: Enhanced Comprehensive Report
const ReportDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left Panel */}
    <div className="w-1/2 p-2.5 flex flex-col border-r border-[#C0C0C0]/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-white font-medium text-[9px]">TechMold Industries Ltd.</div>
          <div className="text-[#C0C0C0]/60 text-[7px]">IATF 16949 • Shanghai, China</div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="text-xl font-bold text-[#7CC2A7]">87</div>
          <div className="text-[#C0C0C0]/40 text-[6px]">Score</div>
        </motion.div>
      </div>
      
      {/* Score Chart */}
      <div className="bg-[#161616] rounded-lg p-2 mb-2">
        <div className="text-[#C0C0C0]/60 text-[6px] mb-1.5">Category Scores</div>
        <div className="space-y-1">
          {[
            { label: 'Quality Management', score: 92, color: '#7CC2A7' },
            { label: 'Process Control', score: 85, color: '#1391BF' },
            { label: 'Documentation', score: 78, color: '#D8A860' },
            { label: 'Equipment Maint.', score: 88, color: '#7CC2A7' },
            { label: 'Training', score: 90, color: '#1391BF' },
          ].map((item, i) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex justify-between text-[6px]">
                <span className="text-[#C0C0C0]/70">{item.label}</span>
                <span className="text-white">{item.score}%</span>
              </div>
              <div className="h-1 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  style={{ backgroundColor: item.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Findings Summary */}
      <div className="grid grid-cols-3 gap-1 mb-2">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-[#C4564F]/15 rounded-lg p-1.5 text-center">
          <div className="text-[#C4564F] font-bold text-sm">1</div>
          <div className="text-[#C0C0C0]/40 text-[5px]">Major NC</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="bg-[#D8A860]/15 rounded-lg p-1.5 text-center">
          <div className="text-[#D8A860] font-bold text-sm">3</div>
          <div className="text-[#C0C0C0]/40 text-[5px]">Minor NC</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="bg-[#1391BF]/15 rounded-lg p-1.5 text-center">
          <div className="text-[#1391BF] font-bold text-sm">5</div>
          <div className="text-[#C0C0C0]/40 text-[5px]">OFI</div>
        </motion.div>
      </div>
      
      {/* Trend Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="bg-[#161616] rounded-lg p-2 flex-1">
        <div className="text-[#C0C0C0]/60 text-[6px] mb-1.5">Score Trend</div>
        <div className="flex items-end justify-between h-10 gap-1">
          {[
            { month: 'Jan', score: 78 },
            { month: 'Apr', score: 82 },
            { month: 'Jul', score: 85 },
            { month: 'Oct', score: 84 },
            { month: 'Feb', score: 87, current: true },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.score - 70}px` }}
                transition={{ delay: 2 + i * 0.1, duration: 0.3 }}
                className={`w-full max-w-3 rounded-t ${item.current ? 'bg-[#7CC2A7]' : 'bg-[#1391BF]/50'}`}
              />
              <span className="text-[5px] text-[#C0C0C0]/40">{item.month}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      <button className="w-full py-1.5 bg-[#1391BF] text-white rounded text-[8px] font-medium mt-2">
        Download Full Report (PDF)
      </button>
    </div>
    
    {/* Right Panel */}
    <div className="w-1/2 p-2.5 flex flex-col">
      {/* Evidence Gallery */}
      <div className="text-[#C0C0C0]/60 text-[6px] uppercase tracking-wide mb-1.5">Evidence Gallery</div>
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[
          { img: equipmentImage, label: "CNC Area" },
          { img: factoryImage, label: "Assembly" },
          { img: equipmentImage, label: "QC Lab" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 + i * 0.1 }}
            className="relative aspect-square rounded overflow-hidden"
          >
            <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-0.5 left-1 text-white text-[5px]">{item.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="text-[#C0C0C0]/50 text-[6px] mb-2">47 photos • 12 documents • 3 videos</div>
      
      {/* Key Findings */}
      <div className="text-[#C0C0C0]/60 text-[6px] uppercase tracking-wide mb-1.5">Key Findings</div>
      <div className="flex-1 space-y-1 overflow-hidden">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }} className="bg-[#C4564F]/10 border border-[#C4564F]/30 rounded p-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <svg className="w-2.5 h-2.5 text-[#C4564F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-[#C4564F] text-[7px] font-medium">Major NC • 8.5.1</span>
          </div>
          <div className="text-white/80 text-[6px]">Missing batch traceability for production run #2024-1847. No records available for raw material lot tracking.</div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.3 }} className="bg-[#D8A860]/10 border border-[#D8A860]/30 rounded p-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <svg className="w-2.5 h-2.5 text-[#D8A860]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#D8A860] text-[7px] font-medium">Minor NC • 7.1.5</span>
          </div>
          <div className="text-white/80 text-[6px]">CMM calibration certificate expired by 3 weeks. Zeiss PRISMO due for recalibration.</div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.6 }} className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded p-1.5">
          <div className="flex items-center gap-1 mb-0.5">
            <svg className="w-2.5 h-2.5 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#1391BF] text-[7px] font-medium">OFI • 7.2</span>
          </div>
          <div className="text-white/80 text-[6px]">Recommend implementing digital training records to replace paper-based system.</div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Step 5: Enhanced Follow-up Manager
const FollowUpDemo = () => (
  <div className="h-full flex text-xs bg-[#0A0A0A]">
    {/* Left: Task Cards */}
    <div className="w-3/5 p-2.5 flex flex-col border-r border-[#C0C0C0]/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/90 font-medium text-[9px]">Corrective Actions</span>
        <div className="flex gap-1">
          <span className="px-1 py-0.5 bg-[#D8A860]/20 text-[#D8A860] rounded text-[6px]">2 Open</span>
          <span className="px-1 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-[6px]">1 Done</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {[
          { 
            title: 'Batch Traceability System',
            finding: 'NC-001 Major',
            status: 'In Progress',
            statusColor: '#D8A860',
            responsible: 'Zhang Wei',
            role: 'Quality Director',
            deadline: 'Feb 28, 2025',
            progress: 45,
            priority: 'High',
            subtasks: [
              { text: 'Define traceability requirements', done: true },
              { text: 'Implement MES module', done: false },
              { text: 'Training & validation', done: false },
            ]
          },
          { 
            title: 'CMM Recalibration',
            finding: 'NC-002 Minor',
            status: 'Pending Review',
            statusColor: '#1391BF',
            responsible: 'Li Ming',
            role: 'Metrology Manager',
            deadline: 'Feb 20, 2025',
            progress: 90,
            priority: 'Medium',
            subtasks: [
              { text: 'Schedule Zeiss service', done: true },
              { text: 'Perform calibration', done: true },
              { text: 'Update certificates', done: false },
            ]
          },
          { 
            title: 'Operator Training Update',
            finding: 'OFI-003',
            status: 'Complete',
            statusColor: '#7CC2A7',
            responsible: 'Chen Hua',
            role: 'HR Manager',
            deadline: 'Feb 15, 2025',
            progress: 100,
            priority: 'Low',
            subtasks: [
              { text: 'Revise training material', done: true },
              { text: 'Conduct sessions', done: true },
              { text: 'Update records', done: true },
            ]
          },
        ].map((task, i) => (
          <motion.div
            key={task.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className={`bg-[#161616] rounded-lg p-2 ${task.status === 'In Progress' ? 'border border-[#D8A860]/30' : ''}`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-white/90 text-[8px] font-medium">{task.title}</span>
                  <span className={`px-1 py-0.5 text-[5px] rounded ${task.priority === 'High' ? 'bg-[#C4564F]/20 text-[#C4564F]' : task.priority === 'Medium' ? 'bg-[#D8A860]/20 text-[#D8A860]' : 'bg-[#C0C0C0]/20 text-[#C0C0C0]'}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="text-[#C0C0C0]/50 text-[6px]">{task.finding}</div>
              </div>
              <span className="px-1 py-0.5 text-[6px] rounded-full" style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor }}>
                {task.status}
              </span>
            </div>
            
            {/* Responsible & Deadline */}
            <div className="flex items-center gap-2 mb-1.5 text-[6px]">
              <div className="flex items-center gap-1 text-[#C0C0C0]/60">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-[5px] font-bold">
                  {task.responsible.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{task.responsible}</span>
              </div>
              <span className="text-[#C0C0C0]/30">•</span>
              <span className="text-[#C0C0C0]/50">Due: {task.deadline}</span>
            </div>
            
            {/* Progress */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex-1 h-1 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                  style={{ backgroundColor: task.statusColor }}
                  className="h-full rounded-full"
                />
              </div>
              <span className="text-[#C0C0C0]/60 text-[6px] w-6 text-right">{task.progress}%</span>
            </div>
            
            {/* Subtasks */}
            <div className="space-y-0.5">
              {task.subtasks.map((sub, j) => (
                <div key={j} className={`flex items-center gap-1 text-[5px] ${sub.done ? 'text-[#7CC2A7]' : 'text-[#C0C0C0]/50'}`}>
                  {sub.done ? (
                    <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full border border-current" />
                  )}
                  <span>{sub.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
    {/* Right: Activity & Schedule */}
    <div className="w-2/5 p-2.5 flex flex-col">
      {/* Re-audit Schedule */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-lg p-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="text-white/90 font-medium text-[8px]">Re-audit Scheduled</div>
            <div className="text-[#1391BF] text-[7px]">May 15, 2025</div>
          </div>
        </div>
      </motion.div>
      
      {/* Comments Section */}
      <div className="text-[#C0C0C0]/60 text-[6px] uppercase tracking-wide mb-1.5">Recent Comments</div>
      <div className="bg-[#161616] rounded-lg p-2 mb-2">
        <div className="space-y-1.5">
          {[
            { user: "ZW", text: "MES module selection completed. Starting implementation next week.", time: "2h ago" },
            { user: "LM", text: "Calibration certificate uploaded to system.", time: "5h ago" },
          ].map((comment, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.2 }} className="flex gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-[5px] font-bold flex-shrink-0">
                {comment.user}
              </div>
              <div className="flex-1">
                <div className="text-white/70 text-[6px]">{comment.text}</div>
                <div className="text-[#C0C0C0]/40 text-[5px]">{comment.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Activity Timeline */}
      <div className="text-[#C0C0C0]/60 text-[6px] uppercase tracking-wide mb-1.5">Activity Log</div>
      <div className="flex-1 space-y-1 overflow-hidden">
        {[
          { time: '2h', text: 'Evidence photos uploaded', color: '#7CC2A7', user: 'ZW' },
          { time: '5h', text: 'Calibration cert submitted', color: '#1391BF', user: 'LM' },
          { time: '1d', text: 'Training task completed', color: '#7CC2A7', user: 'CH' },
          { time: '2d', text: 'Deadline reminder sent', color: '#D8A860', user: 'SYS' },
          { time: '3d', text: 'Task assigned to team', color: '#1391BF', user: 'SYS' },
        ].map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="flex items-start gap-1.5"
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[5px] font-bold text-white flex-shrink-0" style={{ backgroundColor: activity.color }}>
              {activity.user}
            </div>
            <div className="flex-1">
              <div className="text-white/70 text-[6px]">{activity.text}</div>
              <div className="text-[#C0C0C0]/40 text-[5px]">{activity.time} ago</div>
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
    }, 7000);
    
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
