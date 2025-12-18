import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import factoryImage from "@/assets/factory-hero-background.jpg";
import worldMap from "@/assets/dotted-world-map.png";
// Custom AI-generated VDA 6.3 audit evidence images
import evidenceCNC from "@/assets/evidence-cnc-machine.jpg";
import evidenceCMM from "@/assets/evidence-cmm-measurement.jpg";
import evidenceControlPlan from "@/assets/evidence-control-plan.jpg";
import evidenceAssembly from "@/assets/evidence-assembly-station.jpg";
import evidenceCertification from "@/assets/evidence-certification.jpg";
import evidenceInspector from "@/assets/evidence-inspector.jpg";
// Auditor images for dispatch step
import auditorRealEuropean from "@/assets/auditor-real-european.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
import auditorGen4 from "@/assets/auditor-gen-4.jpg";
import auditorGen5 from "@/assets/auditor-gen-5.jpg";
import auditorGen6 from "@/assets/auditor-gen-6.jpg";

interface DemoStep {
  id: number;
  title: string;
  label: string;
}

const demoSteps: DemoStep[] = [
  { id: 1, title: "Supplier Discovery", label: "Search" },
  { id: 2, title: "Order Audit", label: "Order" },
  { id: 3, title: "Auditor Dispatch", label: "Dispatch" },
  { id: 4, title: "Audit Execution", label: "Audit" },
  { id: 5, title: "Report Generation", label: "Report" },
  { id: 6, title: "Follow-up Manager", label: "Follow-up" },
];

// Clean Window Chrome Component
const WindowChrome = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="w-full h-full bg-[#0A0A0A] rounded-xl overflow-hidden flex flex-col">
    <div className="h-8 bg-[#161616] flex items-center px-4 border-b border-[#C0C0C0]/10 flex-shrink-0">
      <span className="text-xs text-[#C0C0C0]/80 font-medium">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </div>
);

// Step 1: Professional AI Supplier Discovery
const SupplierSearchDemo = () => {
  const [phase, setPhase] = useState<'chat' | 'searching' | 'results' | 'profile'>('chat');
  const [chatStep, setChatStep] = useState(0);
  
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setPhase('chat');
    setChatStep(0);
    
    timers.push(setTimeout(() => setChatStep(1), 300));
    timers.push(setTimeout(() => setChatStep(2), 900));
    timers.push(setTimeout(() => setChatStep(3), 1500));
    timers.push(setTimeout(() => setChatStep(4), 2100));
    timers.push(setTimeout(() => setChatStep(5), 2700));
    timers.push(setTimeout(() => setPhase('searching'), 3200));
    timers.push(setTimeout(() => setPhase('results'), 4000));
    timers.push(setTimeout(() => setPhase('profile'), 5500));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const suppliers = [
    { name: "DMG MORI AG", location: "Bielefeld, Germany", certs: ["ISO 9001", "IATF 16949"], score: 98, employees: "12K+", match: 98 },
    { name: "Precision CNC Solutions", location: "Stuttgart, Germany", certs: ["ISO 9001", "ISO 14001"], score: 94, employees: "850", match: 94 },
    { name: "TechMold Industries", location: "Shanghai, China", certs: ["IATF 16949", "TS 16949"], score: 89, employees: "2.4K", match: 91 },
    { name: "AutoPrecision GmbH", location: "Munich, Germany", certs: ["VDA 6.3", "IATF 16949"], score: 91, employees: "1.2K", match: 89 },
    { name: "Jiangsu Metalworks", location: "Suzhou, China", certs: ["ISO 9001", "IATF 16949"], score: 87, employees: "3.8K", match: 86 },
    { name: "Bavaria CNC Tech", location: "Augsburg, Germany", certs: ["ISO 9001", "AS9100"], score: 92, employees: "620", match: 84 },
  ];

  return (
    <WindowChrome title="SearchPro+ — AI Supplier Discovery">
      <div className="h-full flex">
        {/* Left: AI Chat Interface */}
        <div className="w-2/5 flex flex-col border-r border-[#C0C0C0]/10">
          {/* AI Header */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1391BF] to-[#0A7FA5] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">AIVOO Discovery</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#7CC2A7] animate-pulse" />
                  <span className="text-[#C0C0C0]/60 text-xs">Analyzing 25M+ suppliers</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            {chatStep >= 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-[#161616] rounded-xl rounded-tl-sm p-3 max-w-[85%]">
                  <p className="text-white/90 text-sm leading-relaxed">Welcome! I'll help you find the perfect supplier. What are you looking for?</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 2 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="bg-[#1391BF] rounded-xl rounded-tr-sm p-3 max-w-[85%]">
                  <p className="text-white text-sm">I need CNC machining suppliers for automotive parts, IATF certified</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 3 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-[#161616] rounded-xl rounded-tl-sm p-3 max-w-[85%]">
                  <p className="text-white/90 text-sm leading-relaxed">Great! Do you have a preferred region? And what's your expected annual volume?</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 4 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="bg-[#1391BF] rounded-xl rounded-tr-sm p-3 max-w-[85%]">
                  <p className="text-white text-sm">Germany or China, high-volume production, 50K+ parts/year</p>
                </div>
              </motion.div>
            )}
            
            {chatStep >= 5 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-[#161616] rounded-xl rounded-tl-sm p-3 max-w-[85%]">
                  <p className="text-white/90 text-sm leading-relaxed">Perfect! Searching for IATF-certified CNC suppliers in Germany and China with high-volume capability...</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['CNC Machining', 'IATF 16949', 'Germany', 'China', '50K+ capacity'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#1391BF]/20 text-[#1391BF] text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {phase === 'searching' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#161616] flex items-center justify-center flex-shrink-0">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                    className="w-4 h-4 border-2 border-[#1391BF] border-t-transparent rounded-full" 
                  />
                </div>
                <div className="bg-[#161616] rounded-xl rounded-tl-sm p-3">
                  <p className="text-[#1391BF] text-sm">Analyzing suppliers across 47 databases...</p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-[#C0C0C0]/10">
            <div className="flex items-center gap-2 bg-[#161616] rounded-xl px-4 py-3">
              <input type="text" placeholder="Describe what you're looking for..." className="flex-1 bg-transparent text-white/80 placeholder:text-[#C0C0C0]/40 outline-none text-sm" />
              <div className="w-8 h-8 rounded-lg bg-[#1391BF] flex items-center justify-center cursor-pointer hover:bg-[#1391BF]/80 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Results */}
        <div className="w-3/5 flex flex-col">
          {(phase === 'results' || phase === 'profile') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
              {phase === 'results' && (
                <>
                  <div className="p-4 border-b border-[#C0C0C0]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span className="text-white font-medium">6 Matching Suppliers</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-[#161616] text-[#C0C0C0]/70 rounded-lg text-xs">Sort: Match %</span>
                        <span className="px-2 py-1 bg-[#161616] text-[#C0C0C0]/70 rounded-lg text-xs">Filter</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 h-full">
                      {suppliers.map((supplier, i) => (
                        <motion.div
                          key={supplier.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className={`bg-[#161616] rounded-xl p-3 cursor-pointer transition-all hover:bg-[#1a1a1a] ${i === 0 ? 'ring-2 ring-[#1391BF]' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium text-sm truncate">{supplier.name}</div>
                              <div className="flex items-center gap-1 text-[#C0C0C0]/60 text-xs mt-0.5">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span className="truncate">{supplier.location}</span>
                              </div>
                            </div>
                            <div className="text-right ml-2">
                              <div className="text-[#7CC2A7] font-bold text-lg">{supplier.match}%</div>
                              <div className="text-[#C0C0C0]/40 text-[10px]">Match</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#C0C0C0]/50 text-xs">{supplier.employees} employees</span>
                            <span className="text-[#C0C0C0]/30">•</span>
                            <span className="text-[#7CC2A7] text-xs">Score: {supplier.score}</span>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {supplier.certs.map((cert) => (
                              <span key={cert} className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[10px] rounded">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {phase === 'profile' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0A0A0A] font-bold text-sm text-center leading-tight">DMG<br/>MORI</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-xl">DMG MORI AG</div>
                      <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-sm mt-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>Bielefeld, Germany</span>
                        <span className="px-2 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-xs">Verified</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#7CC2A7] font-bold text-3xl">98%</div>
                      <div className="text-[#C0C0C0]/40 text-xs">Match Score</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: 'Employees', value: '12K+' },
                      { label: 'Revenue', value: '€2.5B' },
                      { label: 'Founded', value: '1870' },
                      { label: 'Sites', value: '154' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#161616] rounded-xl p-3 text-center">
                        <div className="text-white font-semibold text-base">{stat.value}</div>
                        <div className="text-[#C0C0C0]/40 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 flex-1 min-h-0">
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-[#C0C0C0]/60 text-xs mb-2">Certifications</div>
                        <div className="flex flex-wrap gap-1.5">
                          {['ISO 9001', 'IATF 16949', 'ISO 14001', 'ISO 45001', 'VDA 6.3'].map((cert) => (
                            <span key={cert} className="px-2 py-1 bg-[#7CC2A7]/15 text-[#7CC2A7] text-xs rounded-lg border border-[#7CC2A7]/30">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-[#C0C0C0]/60 text-xs mb-2">Key Equipment</div>
                        <div className="space-y-1.5">
                          {['5-Axis CNC NLX 2500', 'DMC 125 FD duoBLOCK', 'CMM Zeiss PRISMO'].map((eq) => (
                            <div key={eq} className="flex items-center gap-2 text-sm text-white/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1391BF]" />
                              <span>{eq}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-[#C0C0C0]/60 text-xs mb-2">Audit History</div>
                        <div className="space-y-1.5">
                          {[
                            { date: 'Dec 2024', type: 'IATF 16949', score: 96 },
                            { date: 'Jun 2024', type: 'VDA 6.3', score: 94 },
                          ].map((audit, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#161616] rounded-lg p-2">
                              <div>
                                <div className="text-white/80 text-sm">{audit.type}</div>
                                <div className="text-[#C0C0C0]/40 text-xs">{audit.date}</div>
                              </div>
                              <span className="text-[#7CC2A7] font-medium">{audit.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-[#C0C0C0]/60 text-xs mb-2">Key Customers</div>
                        <div className="flex flex-wrap gap-1.5">
                          {['BMW', 'Audi', 'Mercedes', 'Bosch', 'ZF'].map((customer) => (
                            <span key={customer} className="px-2 py-1 bg-[#1391BF]/10 text-[#1391BF] text-xs rounded-lg">
                              {customer}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium mt-4 flex items-center justify-center gap-2">
                    <span>Add to Audit Order</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {phase === 'chat' && (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#161616] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#C0C0C0]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-white/60 text-sm">Start a conversation to discover suppliers</div>
                <div className="text-[#C0C0C0]/40 text-xs mt-1">AIVOO analyzes 25M+ companies worldwide</div>
              </div>
            </div>
          )}
          
          {phase === 'searching' && (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-2xl bg-[#1391BF]/20 flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-8 h-8 text-[#1391BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
                <div className="text-white text-sm font-medium">Searching suppliers...</div>
                <div className="text-[#1391BF] text-xs mt-1">Analyzing 47 databases</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 2: Order Audit
const OrderAuditDemo = () => (
  <WindowChrome title="ScanPro+ — Order Audit">
    <div className="h-full flex">
      <div className="w-1/2 p-4 flex flex-col border-r border-[#C0C0C0]/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/90 font-medium text-sm">Selected Suppliers</span>
          <span className="px-2 py-1 bg-[#1391BF]/20 text-[#1391BF] rounded text-xs">3 Selected</span>
        </div>
        
        <div className="flex-1 space-y-2 overflow-hidden">
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
              className="p-3 rounded-xl bg-[#1391BF]/10 border border-[#1391BF]/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-[#1391BF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-white/90 text-sm font-medium truncate">{supplier.name}</div>
                    <span className="text-[#7CC2A7] text-xs">{supplier.score}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#C0C0C0]/50">{supplier.location}</span>
                    <span className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] rounded text-xs">{supplier.standard}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-[#C0C0C0]/10">
          <div className="text-[#C0C0C0]/60 text-xs mb-2">Uploaded Documents</div>
          <div className="space-y-1.5">
            {[
              { name: "IATF_Checklist_v2.pdf", size: "2.4 MB", type: "PDF" },
              { name: "Custom_Requirements.xlsx", size: "156 KB", type: "XLS" },
            ].map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 p-2 bg-[#161616] rounded-lg"
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${doc.type === 'PDF' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/80 text-xs truncate">{doc.name}</div>
                  <div className="text-[#C0C0C0]/40 text-xs">{doc.size}</div>
                </div>
                <svg className="w-4 h-4 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-1/2 p-4 flex flex-col">
        <div className="text-white/90 font-medium text-sm mb-4">Audit Configuration</div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#161616] rounded-xl p-3">
            <div className="text-[#C0C0C0]/50 text-xs mb-1">Start Date</div>
            <div className="text-white text-sm font-medium">Feb 15, 2025</div>
          </div>
          <div className="bg-[#161616] rounded-xl p-3">
            <div className="text-[#C0C0C0]/50 text-xs mb-1">Duration</div>
            <div className="text-white text-sm font-medium">2 Days / Audit</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-[#C0C0C0]/60 text-xs mb-2">Assigned Auditors</div>
          <div className="space-y-2">
            {[
              { name: "Dr. Schmidt", initials: "DS", role: "Germany • Lead Auditor IATF" },
              { name: "Wei Liu", initials: "WL", role: "China • VDA 6.3 Specialist" },
            ].map((auditor, i) => (
              <motion.div key={auditor.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3 p-2 bg-[#161616] rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-xs font-bold">
                  {auditor.initials}
                </div>
                <div className="flex-1">
                  <div className="text-white/90 text-sm font-medium">{auditor.name}</div>
                  <div className="text-[#C0C0C0]/50 text-xs">{auditor.role}</div>
                </div>
                <svg className="w-4 h-4 text-[#7CC2A7]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#161616] rounded-xl p-4 mb-4">
          <div className="text-[#C0C0C0]/60 text-xs mb-3">Price Breakdown</div>
          <div className="space-y-2 text-sm">
            {[
              { label: "DMG MORI (2 days)", price: "€700" },
              { label: "TechMold (2 days)", price: "€700" },
              { label: "Precision CNC (2 days)", price: "€700" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-[#C0C0C0]/70">{item.label}</span>
                <span className="text-white/90">{item.price}</span>
              </div>
            ))}
            <div className="border-t border-[#C0C0C0]/10 pt-2 mt-2 flex justify-between">
              <span className="text-white font-medium">Total (3 Audits)</span>
              <span className="text-[#7CC2A7] font-bold text-lg">€2,100</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 mt-auto">
          Confirm & Order Audits
        </button>
      </div>
    </div>
  </WindowChrome>
);

// Step 3: Auditor Dispatch - Global Network (Redesigned)
const AuditorDispatchDemo = () => {
  const [selectedAuditor, setSelectedAuditor] = useState(0);
  const [dispatchPhase, setDispatchPhase] = useState<'selecting' | 'dispatching' | 'confirmed'>('selecting');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedAuditor(prev => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setDispatchPhase('dispatching'), 4000);
    const timer2 = setTimeout(() => setDispatchPhase('confirmed'), 5500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);
  
  const auditors = [
    { name: "Dr. Klaus Schmidt", location: "Munich, Germany", specialty: "IATF 16949", distance: "210 km", available: "Tomorrow", rating: 4.9, audits: 847, x: 52, y: 32, region: "Europe", image: auditorRealEuropean },
    { name: "Wei Liu", location: "Shanghai, China", specialty: "VDA 6.3", distance: "Local", available: "Today", rating: 4.8, audits: 623, x: 80, y: 40, region: "Asia", image: auditorGen2 },
    { name: "Maria Santos", location: "São Paulo, Brazil", specialty: "ISO 9001", distance: "Local", available: "Next Week", rating: 4.7, audits: 412, x: 32, y: 68, region: "LatAm", image: auditorGen3 },
    { name: "John Miller", location: "Detroit, USA", specialty: "AS9100", distance: "150 km", available: "2 Days", rating: 4.9, audits: 534, x: 22, y: 38, region: "N.America", image: auditorGen4 },
    { name: "Raj Patel", location: "Mumbai, India", specialty: "ISO 14001", distance: "Local", available: "Today", rating: 4.6, audits: 389, x: 70, y: 48, region: "Asia", image: auditorGen5 },
    { name: "Sarah Chen", location: "Singapore", specialty: "ISO 45001", distance: "Local", available: "Tomorrow", rating: 4.8, audits: 456, x: 82, y: 55, region: "SEA", image: auditorGen6 },
  ];
  
  return (
    <WindowChrome title="ScanPro+ — Global Auditor Network">
      <div className="h-full flex">
        {/* Map View - Enhanced */}
        <div className="w-3/5 relative bg-gradient-to-br from-[#0A0A0A] via-[#0d1117] to-[#0A0A0A] overflow-hidden">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(19,145,191,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(19,145,191,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* World Map */}
          <div className="absolute inset-0 opacity-20">
            <img src={worldMap} alt="World Map" className="w-full h-full object-cover" />
          </div>
          
          {/* Animated Pulse Rings from Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1391BF]/30"
                initial={{ width: 40, height: 40, opacity: 0.6 }}
                animate={{ width: [40, 300, 500], height: [40, 300, 500], opacity: [0.6, 0.2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: ring * 1.2, ease: "easeOut" }}
              />
            ))}
          </div>
          
          {/* Connection Lines with Gradient */}
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(19,145,191,0.5))' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1391BF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#1391BF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7CC2A7" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {auditors.map((auditor, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${auditor.x}%`}
                y2={`${auditor.y}%`}
                stroke={selectedAuditor === i ? "url(#lineGradient)" : "#1391BF"}
                strokeWidth={selectedAuditor === i ? 3 : 1}
                strokeOpacity={selectedAuditor === i ? 1 : 0.15}
                strokeDasharray={selectedAuditor === i ? "8 4" : "4 4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.15 }}
              />
            ))}
          </svg>
          
          {/* Center Hub - Enhanced */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0A7FA5] flex items-center justify-center shadow-[0_0_40px_rgba(19,145,191,0.5)]">
                <div className="w-14 h-14 rounded-full bg-[#0A0A0A] flex items-center justify-center border border-[#1391BF]/50">
                  <div className="text-center">
                    <span className="text-white font-bold text-xs">YVOO</span>
                    <div className="text-[#1391BF] text-[8px]">HQ</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Auditor Pins - Enhanced */}
          {auditors.map((auditor, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
              className={`absolute ${selectedAuditor === i ? 'z-50' : 'z-20'}`}
              style={{ left: `${auditor.x}%`, top: `${auditor.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Pulse Ring for Selected */}
              {selectedAuditor === i && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7CC2A7]/20"
                  initial={{ width: 40, height: 40 }}
                  animate={{ width: [40, 70], height: [40, 70], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              <motion.div
                animate={selectedAuditor === i ? { y: [-2, 2, -2] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-lg ${
                  selectedAuditor === i 
                    ? 'bg-gradient-to-br from-[#7CC2A7] to-[#5BA88F] ring-4 ring-[#7CC2A7]/40 scale-110' 
                    : 'bg-gradient-to-br from-[#1391BF] to-[#0A7FA5] hover:scale-105'
                }`}
                onClick={() => setSelectedAuditor(i)}
              >
                <span className="text-white font-bold text-sm">
                  {auditor.name.split(' ').slice(-1)[0][0]}{auditor.name.split(' ')[0][0]}
                </span>
                
                {/* Rating Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0A0A0A] border border-[#7CC2A7] flex items-center justify-center">
                  <span className="text-[#7CC2A7] text-[8px] font-bold">{auditor.rating}</span>
                </div>
              </motion.div>
              
              {/* Info Tooltip */}
              {selectedAuditor === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-14 left-1/2 -translate-x-1/2 bg-[#161616]/95 backdrop-blur-sm rounded-xl p-3 whitespace-nowrap z-30 border border-[#C0C0C0]/10 shadow-2xl min-w-[140px]"
                >
                  <div className="text-white font-semibold text-sm mb-1">{auditor.name}</div>
                  <div className="text-[#C0C0C0]/70 text-xs mb-2">{auditor.location}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#7CC2A7]">★ {auditor.rating}</span>
                    <span className="text-[#C0C0C0]/40">•</span>
                    <span className="text-[#C0C0C0]/60">{auditor.audits} audits</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <span className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[9px] rounded">{auditor.specialty}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {/* Stats Bar - Enhanced */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pt-8 pb-4 px-4">
              <div className="bg-[#161616]/80 backdrop-blur-xl rounded-2xl p-4 border border-[#C0C0C0]/10">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: "2,000+", label: "Certified Auditors", color: "#7CC2A7", icon: "👤" },
                    { value: "90+", label: "Countries", color: "#1391BF", icon: "🌍" },
                    { value: "<48h", label: "Deployment", color: "#D8A860", icon: "⚡" },
                    { value: "100%", label: "Local Coverage", color: "#7CC2A7", icon: "📍" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[#C0C0C0]/50 text-[10px] mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* "We Are Everywhere" Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-4 left-4 bg-[#161616]/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-[#1391BF]/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1391BF] to-[#7CC2A7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">We are everywhere</div>
                <div className="text-[#1391BF] text-xs">Local experts in every region</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Auditor Selection Panel - Enhanced */}
        <div className="w-2/5 flex flex-col bg-[#0d0d0d]">
          {/* Header */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center justify-between mb-1">
              <div className="text-white font-semibold text-lg">Best Match Auditors</div>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded-full text-xs font-medium"
              >
                {auditors.length} Available
              </motion.span>
            </div>
            <div className="text-[#C0C0C0]/50 text-xs">Matching: VDA 6.3, Shanghai Region</div>
          </div>
          
          {/* Auditor Cards */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {auditors.slice(0, 4).map((auditor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedAuditor === i 
                    ? 'bg-gradient-to-r from-[#1391BF]/20 to-[#7CC2A7]/10 border border-[#1391BF]/50 shadow-lg' 
                    : 'bg-[#161616] hover:bg-[#1a1a1a] border border-transparent'
                }`}
                onClick={() => setSelectedAuditor(i)}
              >
                <div className="flex items-start gap-3">
                  <div className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all ${
                    selectedAuditor === i 
                      ? 'ring-2 ring-[#7CC2A7] ring-offset-2 ring-offset-[#161616]' 
                      : ''
                  }`}>
                    <img 
                      src={auditor.image} 
                      alt={auditor.name} 
                      className="w-full h-full object-cover"
                    />
                    {selectedAuditor === i && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#7CC2A7] rounded-full flex items-center justify-center"
                      >
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-white font-medium text-sm">{auditor.name}</div>
                      <div className="flex items-center gap-0.5">
                        <span className="text-[#D8A860] text-xs">★</span>
                        <span className="text-[#C0C0C0]/70 text-xs">{auditor.rating}</span>
                      </div>
                    </div>
                    <div className="text-[#C0C0C0]/50 text-xs mt-0.5">{auditor.location}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-[10px] rounded-full font-medium">{auditor.specialty}</span>
                      <span className="text-[#C0C0C0]/40 text-[10px]">{auditor.audits} audits</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-xs font-semibold ${auditor.available === 'Today' ? 'text-[#7CC2A7]' : auditor.available === 'Tomorrow' ? 'text-[#1391BF]' : 'text-[#D8A860]'}`}>
                      {auditor.available}
                    </div>
                    <div className="text-[#C0C0C0]/40 text-[10px] mt-0.5">{auditor.distance}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Dispatch Status */}
          <div className="p-4 border-t border-[#C0C0C0]/10">
            <motion.div 
              className={`p-4 rounded-xl transition-all ${
                dispatchPhase === 'confirmed' 
                  ? 'bg-[#7CC2A7]/15 border border-[#7CC2A7]/30' 
                  : 'bg-[#1391BF]/10 border border-[#1391BF]/30'
              }`}
            >
              {dispatchPhase === 'selecting' && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1391BF] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Select Auditor</div>
                    <div className="text-[#1391BF] text-xs">Choose from available experts</div>
                  </div>
                </div>
              )}
              
              {dispatchPhase === 'dispatching' && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D8A860] flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Dispatching...</div>
                    <div className="text-[#D8A860] text-xs">Notifying Wei Liu</div>
                  </div>
                </div>
              )}
              
              {dispatchPhase === 'confirmed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7CC2A7] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Auditor Confirmed!</div>
                    <div className="text-[#7CC2A7] text-xs">Wei Liu · Arrives Tomorrow 9:00 AM</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 4: Audit Execution in China
const AuditExecutionDemo = () => (
  <WindowChrome title="ScanPro+ — Live Audit: TechMold Industries, Shanghai">
    <div className="h-full flex">
      <div className="w-3/5 flex flex-col border-r border-[#C0C0C0]/10">
        <div className="p-4 border-b border-[#C0C0C0]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img src={factoryImage} alt="Factory" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">TechMold Industries</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#C0C0C0]/60">Shanghai, China</span>
                <span className="px-1.5 py-0.5 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded">VDA 6.3</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#7CC2A7] animate-pulse" />
            <span className="text-[#7CC2A7] text-xs font-medium">Live</span>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <img src={equipmentImage} alt="Equipment" className="w-full h-full object-cover" />
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="absolute inset-4 pointer-events-none"
          >
            <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}
              className="absolute top-4 left-4 right-[40%] bottom-[30%] border-2 border-[#7CC2A7] rounded-lg"
            >
              <div className="absolute -top-6 left-0 px-2 py-1 bg-[#7CC2A7] text-black text-xs font-bold rounded">
                CNC Lathe NLX 2500 · 94%
              </div>
            </motion.div>
            
            <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.0 }}
              className="absolute top-[20%] right-4 w-24 h-16 border-2 border-[#1391BF] rounded-lg"
            >
              <div className="absolute -bottom-6 right-0 px-2 py-1 bg-[#1391BF] text-white text-xs font-bold rounded">
                Control Panel
              </div>
            </motion.div>
            
            <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2 }}
              className="absolute bottom-4 left-8 w-20 h-20 border-2 border-[#D8A860] rounded-lg"
            >
              <div className="absolute -top-6 left-0 px-2 py-1 bg-[#D8A860] text-black text-xs font-bold rounded">
                Coolant System
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <div className="w-2/5 flex flex-col">
        <div className="p-4 border-b border-[#C0C0C0]/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium text-sm">AIVOO Assistant</div>
              <div className="text-[#7CC2A7] text-xs">Active guidance</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-[#161616] rounded-lg p-3"
            >
              <p className="text-white/80 text-sm">Equipment detected: DMG MORI NLX 2500. Check calibration certificate for this machine.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
              className="bg-[#1391BF]/20 rounded-lg p-3"
            >
              <p className="text-white/80 text-sm">Where can I find the certificate?</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
              className="bg-[#161616] rounded-lg p-3"
            >
              <p className="text-white/80 text-sm">Ask the operator for the calibration folder. It should contain certificates dated within 12 months.</p>
            </motion.div>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden">
          <div className="text-white/90 font-medium text-sm mb-3">VDA 6.3 Checklist</div>
          <div className="space-y-2">
            {[
              { item: "P6.1.1 Process inputs defined", status: 'done' },
              { item: "P6.1.2 Process sequence planned", status: 'done' },
              { item: "P6.2.1 Personnel qualified", status: 'done' },
              { item: "P6.2.2 Responsibility defined", status: 'current' },
              { item: "P6.3.1 Equipment suitable", status: 'pending' },
              { item: "P6.3.2 Measuring equipment", status: 'pending' },
            ].map((check, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 p-2 rounded-lg ${check.status === 'current' ? 'bg-[#1391BF]/20 border border-[#1391BF]/50' : 'bg-[#161616]'}`}
              >
                {check.status === 'done' ? (
                  <div className="w-5 h-5 rounded bg-[#7CC2A7] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                ) : check.status === 'current' ? (
                  <div className="w-5 h-5 rounded bg-[#1391BF] flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded border border-[#C0C0C0]/30" />
                )}
                <span className={`text-sm ${check.status === 'done' ? 'text-white/60' : 'text-white/90'}`}>{check.item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </WindowChrome>
);

// Step 5: Professional Audit Report Generation
const ReportDemo = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'analytics'>('overview');
  
  // Auto-switch between Overview and Analytics every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setViewMode(prev => prev === 'overview' ? 'analytics' : 'overview');
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const processElements = [
    { code: 'P2', name: 'Project Management', score: 88, weight: 12 },
    { code: 'P3', name: 'Product & Process Development Planning', score: 82, weight: 15 },
    { code: 'P4', name: 'Product & Process Development Realization', score: 85, weight: 18 },
    { code: 'P5', name: 'Supplier Management', score: 79, weight: 12 },
    { code: 'P6', name: 'Process Analysis / Production', score: 84, weight: 28 },
    { code: 'P7', name: 'Customer Care / Satisfaction', score: 91, weight: 15 },
  ];
  
  const nonConformances = [
    { id: 'NC-001', element: 'P6.3.2', finding: 'Calibration records for CMM Zeiss Contura incomplete - missing 3 measuring devices', severity: 'major', category: 'Process Control', rootCause: 'Documentation gap' },
    { id: 'NC-002', element: 'P6.2.1', finding: 'Operator qualification matrix not updated for 2 new CNC operators since Q3 2024', severity: 'minor', category: 'Personnel', rootCause: 'Training backlog' },
    { id: 'NC-003', element: 'P4.6', finding: 'Process FMEA (PFMEA-TM-2023-001) not revised after design change ECN-2024-047', severity: 'major', category: 'Risk Management', rootCause: 'Change management' },
    { id: 'OFI-001', element: 'P6.4.3', finding: 'SPC charts for critical dimension CTQ-012 show Cpk trending toward 1.33 limit', severity: 'observation', category: 'Quality Control', rootCause: 'Tool wear monitoring' },
  ];
  
  // Historical score data for trend chart - realistic non-linear trend with client names
  const historicalScores = [
    { year: '2021', score: 78, client: 'BMW' },
    { year: '2022', score: 82, client: 'Mercedes' },
    { year: '2023', score: 79, client: 'Audi' },
    { year: '2024', score: 85, client: 'Porsche' },
    { year: '2025', score: 88, client: 'YVOO' },
  ];
  
  // Benchmark data
  const benchmarkData = [
    { category: 'Industry Avg', score: 76 },
    { category: 'Top 10%', score: 92 },
    { category: 'This Supplier', score: 84.2 },
  ];
  
  // Custom AI-generated VDA 6.3 audit evidence images
  const evidenceImages = [evidenceCNC, evidenceCMM, evidenceControlPlan, evidenceAssembly, evidenceCertification, evidenceInspector];
  
  const evidenceItems = [
    { id: 1, type: 'Equipment', label: 'DMG MORI NLX 2500', ref: 'IMG-001', verified: true },
    { id: 2, type: 'Measurement', label: 'CMM Inspection', ref: 'IMG-012', verified: true },
    { id: 3, type: 'Document', label: 'IATF Control Plan', ref: 'DOC-023', verified: true },
    { id: 4, type: 'Process', label: 'Assembly Station', ref: 'IMG-034', verified: true },
    { id: 5, type: 'Certificate', label: 'ISO 9001 / IATF', ref: 'CRT-001', verified: true },
    { id: 6, type: 'Personnel', label: 'QC Inspector', ref: 'IMG-045', verified: true },
  ];

  const overallScore = 84.2;
  const certificationStatus = overallScore >= 90 ? 'A' : overallScore >= 80 ? 'B' : overallScore >= 60 ? 'C' : 'D';
  
  return (
    <WindowChrome title="ScanPro+ — VDA 6.3 Process Audit Report">
      <div className="h-full flex bg-[#0A0A0A]">
        {/* Main Report Content */}
        <div className="w-[65%] flex flex-col border-r border-[#C0C0C0]/10 overflow-hidden">
          {/* Report Header - Professional */}
          <div className="p-4 border-b border-[#C0C0C0]/10 bg-gradient-to-r from-[#0A0A0A] to-[#161616]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1391BF]/20 to-[#1391BF]/5 border border-[#1391BF]/30 flex items-center justify-center">
                  <span className="text-[#1391BF] font-bold text-sm">TM</span>
                </div>
                <div>
                  <div className="text-white font-semibold">TechMold Industries Co., Ltd.</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Shanghai, China • DUNS: 54-128-9047</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 bg-[#1391BF]/15 text-[#1391BF] rounded text-[10px] font-medium">VDA 6.3:2023</span>
                    <span className="px-1.5 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] rounded text-[10px] font-medium">Process Audit</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className={`text-3xl font-bold ${certificationStatus === 'A' ? 'text-[#7CC2A7]' : certificationStatus === 'B' ? 'text-[#1391BF]' : 'text-[#D8A860]'}`}>
                    {overallScore.toFixed(1)}%
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    certificationStatus === 'A' ? 'bg-[#7CC2A7]/20 text-[#7CC2A7]' : 
                    certificationStatus === 'B' ? 'bg-[#1391BF]/20 text-[#1391BF]' : 'bg-[#D8A860]/20 text-[#D8A860]'
                  }`}>
                    {certificationStatus}
                  </div>
                </div>
                <div className="text-[#C0C0C0]/50 text-[10px]">Grade {certificationStatus} Supplier</div>
                <div className="text-[#C0C0C0]/40 text-[10px]">Audit Date: Feb 14-15, 2025</div>
              </div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="px-4 py-2 border-b border-[#C0C0C0]/10 flex items-center gap-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'overview' 
                  ? 'bg-[#1391BF] text-white' 
                  : 'bg-[#161616] text-[#C0C0C0]/60 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Overview
              </span>
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'analytics' 
                  ? 'bg-[#1391BF] text-white' 
                  : 'bg-[#161616] text-[#C0C0C0]/60 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </span>
            </button>
          </div>
          
          {viewMode === 'overview' ? (
          <>
          {/* Process Elements Grid - VDA 6.3 Standard */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Process Element Scores (VDA 6.3)</div>
              <div className="flex gap-3 text-[10px]">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7CC2A7]" />≥90% (A)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1391BF]" />≥80% (B)</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#D8A860]" />≥60% (C)</span>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {processElements.map((el, i) => {
                const color = el.score >= 90 ? '#7CC2A7' : el.score >= 80 ? '#1391BF' : '#D8A860';
                return (
                  <motion.div 
                    key={el.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="bg-[#161616] rounded-xl p-3 text-center"
                  >
                    <div className="text-[#C0C0C0]/50 text-[10px] font-medium mb-1">{el.code}</div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                      className="text-lg font-bold mb-1"
                      style={{ color }}
                    >
                      {el.score}%
                    </motion.div>
                    <div className="text-[#C0C0C0]/40 text-[9px] leading-tight line-clamp-2">{el.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Non-Conformances Table - Professional */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Non-Conformances & Observations</div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-[#C4564F]/15 text-[#C4564F] rounded text-[10px] font-medium">2 Major</span>
                <span className="px-2 py-0.5 bg-[#D8A860]/15 text-[#D8A860] rounded text-[10px] font-medium">1 Minor</span>
                <span className="px-2 py-0.5 bg-[#1391BF]/15 text-[#1391BF] rounded text-[10px] font-medium">1 OFI</span>
              </div>
            </div>
            
            <div className="space-y-2 overflow-hidden">
              {nonConformances.map((nc, i) => (
                <motion.div 
                  key={nc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-[#161616] rounded-xl p-3 border-l-2"
                  style={{ borderLeftColor: nc.severity === 'major' ? '#C4564F' : nc.severity === 'minor' ? '#D8A860' : '#1391BF' }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      nc.severity === 'major' ? 'bg-[#C4564F]/20 text-[#C4564F]' : 
                      nc.severity === 'minor' ? 'bg-[#D8A860]/20 text-[#D8A860]' : 'bg-[#1391BF]/20 text-[#1391BF]'
                    }`}>
                      {nc.severity === 'observation' ? 'OFI' : nc.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#C0C0C0]/50 text-[10px] font-mono">{nc.id}</span>
                        <span className="text-[#1391BF] text-[10px] font-medium">{nc.element}</span>
                        <span className="text-[#C0C0C0]/30 text-[10px]">•</span>
                        <span className="text-[#C0C0C0]/50 text-[10px]">{nc.category}</span>
                      </div>
                      <div className="text-white/80 text-xs leading-relaxed">{nc.finding}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          </>
          ) : (
          /* Analytics View */
          <div className="flex-1 p-4 overflow-hidden">
            {/* Score Trend Chart - Bars + Line */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/90 font-medium text-sm">Audit Score History</div>
                <div className="flex gap-3 text-[9px] text-[#C0C0C0]/60">
                  <span className="flex items-center gap-1"><div className="w-3 h-2 rounded bg-[#0A7FA5]" />Score</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-[#0A7FA5]" />Trend</span>
                </div>
              </div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="relative h-36">
                  {/* Bars - all blue, thicker */}
                  <div className="flex items-end justify-around h-28 px-2 relative z-10">
                    {historicalScores.map((item, i) => {
                      const heightPx = ((item.score - 50) / 50) * 112;
                      return (
                        <div 
                          key={item.year}
                          className="flex flex-col items-center h-full justify-end"
                        >
                          <span className="text-[10px] font-bold text-white mb-1">{item.score}%</span>
                          <motion.div 
                            className="w-8 rounded-t-md bg-[#0A7FA5]"
                            initial={{ height: 0 }}
                            animate={{ height: heightPx }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Overlay lines removed (per request) */}
                  
                  {/* Year labels with client names */}
                  <div className="flex justify-between mt-2">
                    {historicalScores.map((item) => (
                      <div key={item.year} className="flex-1 text-center">
                        <span className="text-[#C0C0C0]/60 text-[9px]">{item.year}</span>
                        <div className="text-[#C0C0C0]/40 text-[8px] truncate">{item.client}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Process Elements Radar-style Comparison */}
            <div className="mb-4">
              <div className="text-white/90 font-medium text-sm mb-3">Process Element Analysis</div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="space-y-2">
                  {processElements.map((el, i) => {
                    const color = el.score >= 90 ? '#7CC2A7' : el.score >= 80 ? '#1391BF' : '#D8A860';
                    return (
                      <motion.div 
                        key={el.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span className="text-[#C0C0C0]/50 text-[10px] w-6">{el.code}</span>
                        <div className="flex-1 h-4 bg-[#0A0A0A] rounded-full overflow-hidden relative">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${el.score}%` }}
                            transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                          />
                          <div className="absolute inset-0 flex items-center px-2">
                            <span className="text-[8px] text-white/80 font-medium truncate">{el.name}</span>
                          </div>
                        </div>
                        <span className="text-white font-bold text-xs w-10 text-right">{el.score}%</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Benchmark Comparison */}
            <div>
              <div className="text-white/90 font-medium text-sm mb-3">Industry Benchmark</div>
              <div className="bg-[#161616] rounded-xl p-4">
                <div className="flex items-end justify-around h-24">
                  {benchmarkData.map((item, i) => {
                    const isThisSupplier = item.category === 'This Supplier';
                    const color = isThisSupplier ? '#1391BF' : item.category === 'Top 10%' ? '#7CC2A7' : '#C0C0C0';
                    return (
                      <motion.div 
                        key={item.category}
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                      >
                        <motion.div 
                          className={`w-16 rounded-t-lg ${isThisSupplier ? 'ring-2 ring-[#1391BF]/50' : ''}`}
                          style={{ backgroundColor: color + (isThisSupplier ? '' : '40') }}
                          initial={{ height: 0 }}
                          animate={{ height: `${(item.score / 100) * 80}px` }}
                          transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                        />
                        <span className={`text-xs font-bold ${isThisSupplier ? 'text-[#1391BF]' : 'text-[#C0C0C0]/60'}`}>{item.score}%</span>
                        <span className="text-[#C0C0C0]/50 text-[9px] text-center">{item.category}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="w-[35%] flex flex-col overflow-hidden">
          {/* Evidence Gallery - Unique Items */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/90 font-medium text-sm">Evidence Gallery</div>
              <span className="text-[#C0C0C0]/50 text-[10px]">247 items collected</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {evidenceItems.map((item, i) => {
                return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="aspect-square rounded-xl relative overflow-hidden group"
                  >
                    <img 
                      src={evidenceImages[i]} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="text-white text-[8px] font-medium truncate">{item.label}</div>
                      <div className="text-white/60 text-[7px]">{item.ref}</div>
                    </div>
                    {item.verified && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7CC2A7] flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-1 left-1 px-1 py-0.5 bg-black/60 rounded text-[7px] text-white/80">
                      {item.type}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Auditor Signature Block */}
          <div className="p-4 border-b border-[#C0C0C0]/10">
            <div className="text-white/90 font-medium text-sm mb-3">Lead Auditor</div>
            <div className="bg-[#161616] rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1391BF] to-[#0A7FA5] flex items-center justify-center text-white font-bold text-sm">
                  WL
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">Wei Liu</div>
                  <div className="text-[#C0C0C0]/60 text-[10px]">VDA 6.3 Licensed Auditor</div>
                  <div className="text-[#C0C0C0]/40 text-[9px]">Cert: VDA-QMC-2023-1847</div>
                </div>
                <div className="text-right">
                  <div className="text-[#7CC2A7] text-[10px] font-medium">Verified</div>
                  <div className="text-[#C0C0C0]/40 text-[9px]">847 audits</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="p-4 mt-auto">
            <div className="space-y-2">
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full py-2.5 bg-[#1391BF] text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export VDA 6.3 Report (PDF)
              </motion.button>
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-full py-2.5 bg-[#161616] text-white/80 rounded-xl text-sm font-medium flex items-center justify-center gap-2 border border-[#C0C0C0]/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share with BMW SQE Portal
              </motion.button>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[#C0C0C0]/40 text-[9px]">Report ID: YVOO-VDA63-2025-00847</span>
            </div>
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};

// Step 6: Follow-up Manager
const FollowUpDemo = () => (
  <WindowChrome title="ScanPro+ — Follow-up Manager">
    <div className="h-full flex">
      <div className="w-3/5 p-4 flex flex-col border-r border-[#C0C0C0]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white font-medium text-lg">Open Actions</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-[#C4564F]/20 text-[#C4564F] rounded text-xs">3 Overdue</span>
            <span className="px-2 py-1 bg-[#D8A860]/20 text-[#D8A860] rounded text-xs">5 In Progress</span>
          </div>
        </div>
        
        <div className="space-y-3 flex-1 overflow-hidden">
          {[
            { title: "Update CMM calibration records", responsible: "Zhang Wei", deadline: "Feb 28, 2025", progress: 75, status: 'In Progress', statusColor: '#D8A860', subtasks: [{ text: 'Collect certificates', done: true }, { text: 'Update database', done: true }, { text: 'Management review', done: false }] },
            { title: "Conduct operator training", responsible: "Li Ming", deadline: "Mar 5, 2025", progress: 40, status: 'In Progress', statusColor: '#D8A860', subtasks: [{ text: 'Schedule sessions', done: true }, { text: 'Prepare materials', done: false }, { text: 'Execute training', done: false }] },
            { title: "Revise Process FMEA", responsible: "Chen Hui", deadline: "Feb 20, 2025", progress: 20, status: 'Overdue', statusColor: '#C4564F', subtasks: [{ text: 'Gather input data', done: true }, { text: 'Risk assessment', done: false }, { text: 'Document update', done: false }] },
          ].map((task, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-[#161616] rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{task.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-xs font-bold">
                      {task.responsible.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[#C0C0C0]/70 text-xs">{task.responsible}</span>
                    <span className="text-[#C0C0C0]/30">•</span>
                    <span className="text-[#C0C0C0]/50 text-xs">Due: {task.deadline}</span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor }}>
                  {task.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-2 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                    style={{ backgroundColor: task.statusColor }} className="h-full rounded-full"
                  />
                </div>
                <span className="text-[#C0C0C0]/60 text-xs w-8 text-right">{task.progress}%</span>
              </div>
              
              <div className="space-y-1">
                {task.subtasks.map((sub, j) => (
                  <div key={j} className={`flex items-center gap-2 text-xs ${sub.done ? 'text-[#7CC2A7]' : 'text-[#C0C0C0]/50'}`}>
                    {sub.done ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-current" />
                    )}
                    <span>{sub.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="w-2/5 p-4 flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-xl p-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1391BF] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Re-audit Scheduled</div>
              <div className="text-[#1391BF] text-sm">May 15, 2025</div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-[#C0C0C0]/60 text-xs uppercase tracking-wide mb-3">Recent Comments</div>
        <div className="bg-[#161616] rounded-xl p-4 mb-4">
          <div className="space-y-3">
            {[
              { user: "ZW", text: "MES module selection completed. Starting implementation next week.", time: "2h ago" },
              { user: "LM", text: "Calibration certificate uploaded to system.", time: "5h ago" },
            ].map((comment, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.2 }} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-[#1391BF] text-xs font-bold flex-shrink-0">
                  {comment.user}
                </div>
                <div className="flex-1">
                  <div className="text-white/70 text-sm">{comment.text}</div>
                  <div className="text-[#C0C0C0]/40 text-xs">{comment.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-[#C0C0C0]/60 text-xs uppercase tracking-wide mb-3">Activity Log</div>
        <div className="flex-1 space-y-2 overflow-hidden">
          {[
            { time: '2h', text: 'Evidence photos uploaded', color: '#7CC2A7', user: 'ZW' },
            { time: '5h', text: 'Calibration cert submitted', color: '#1391BF', user: 'LM' },
            { time: '1d', text: 'Training task completed', color: '#7CC2A7', user: 'CH' },
            { time: '2d', text: 'Deadline reminder sent', color: '#D8A860', user: 'SYS' },
          ].map((activity, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: activity.color }}
              >
                {activity.user}
              </div>
              <div className="flex-1">
                <div className="text-white/70 text-sm">{activity.text}</div>
                <div className="text-[#C0C0C0]/40 text-xs">{activity.time} ago</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </WindowChrome>
);

const PlatformDemoAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Custom durations per step (ms) - search needs more time
  const stepDurations = [12000, 10000, 10000, 10000, 10000, 10000]; // Search, Order, Dispatch, Audit, Report, Follow-up
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, stepDurations[currentStep]);
    
    return () => clearTimeout(timeout);
  }, [currentStep]);
  
  const renderDemo = () => {
    switch (currentStep) {
      case 0: return <SupplierSearchDemo />;
      case 1: return <OrderAuditDemo />;
      case 2: return <AuditorDispatchDemo />;
      case 3: return <AuditExecutionDemo />;
      case 4: return <ReportDemo />;
      case 5: return <FollowUpDemo />;
      default: return <SupplierSearchDemo />;
    }
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-6">
        {demoSteps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i === currentStep 
                ? 'bg-[#1391BF] text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
      
      <div className="relative bg-[#0A0A0A] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
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
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Step {currentStep + 1} of {demoSteps.length}: <span className="font-medium text-gray-700">{demoSteps[currentStep].title}</span>
        </p>
      </div>
    </div>
  );
};

export default PlatformDemoAnimation;
