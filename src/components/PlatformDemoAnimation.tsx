import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import equipmentImage from "@/assets/cnc-machine-dmg-nlx.jpg";
import factoryImage from "@/assets/factory-hero-background.jpg";
import worldMap from "@/assets/dotted-world-map.png";

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

// Step 3: Auditor Dispatch - Global Network
const AuditorDispatchDemo = () => {
  const [selectedAuditor, setSelectedAuditor] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedAuditor(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const auditors = [
    { name: "Dr. Schmidt", location: "Munich, Germany", specialty: "IATF 16949", distance: "210 km", available: "Tomorrow", x: 48, y: 28 },
    { name: "Wei Liu", location: "Shanghai, China", specialty: "VDA 6.3", distance: "Local", available: "Today", x: 78, y: 38 },
    { name: "Maria Santos", location: "São Paulo, Brazil", specialty: "ISO 9001", distance: "Local", available: "Next Week", x: 30, y: 65 },
    { name: "John Miller", location: "Detroit, USA", specialty: "AS9100", distance: "150 km", available: "2 Days", x: 22, y: 35 },
  ];
  
  return (
    <WindowChrome title="ScanPro+ — Auditor Dispatch">
      <div className="h-full flex">
        {/* Map View */}
        <div className="w-3/5 relative bg-[#0A0A0A] overflow-hidden">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-30">
            <img src={worldMap} alt="World Map" className="w-full h-full object-cover" />
          </div>
          
          {/* Animated Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {auditors.map((auditor, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${auditor.x}%`}
                y2={`${auditor.y}%`}
                stroke={selectedAuditor === i ? "#1391BF" : "#1391BF"}
                strokeWidth={selectedAuditor === i ? 2 : 1}
                strokeOpacity={selectedAuditor === i ? 0.8 : 0.2}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
          </svg>
          
          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-[#1391BF] flex items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center">
                <span className="text-white font-bold text-sm">YVOO</span>
              </div>
            </motion.div>
          </div>
          
          {/* Auditor Pins */}
          {auditors.map((auditor, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className="absolute"
              style={{ left: `${auditor.x}%`, top: `${auditor.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.div
                animate={selectedAuditor === i ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  selectedAuditor === i 
                    ? 'bg-[#7CC2A7] ring-4 ring-[#7CC2A7]/30' 
                    : 'bg-[#1391BF]'
                }`}
              >
                <span className="text-white font-bold text-xs">
                  {auditor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </motion.div>
              
              {selectedAuditor === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#161616] rounded-lg p-2 whitespace-nowrap z-10"
                >
                  <div className="text-white text-xs font-medium">{auditor.name}</div>
                  <div className="text-[#C0C0C0]/60 text-[10px]">{auditor.location}</div>
                </motion.div>
              )}
            </motion.div>
          ))}
          
          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-[#161616]/90 backdrop-blur-sm rounded-xl p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-[#7CC2A7] font-bold text-2xl">2,000+</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Auditors</div>
                </div>
                <div>
                  <div className="text-[#1391BF] font-bold text-2xl">90+</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Countries</div>
                </div>
                <div>
                  <div className="text-white font-bold text-2xl">48h</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Avg. Dispatch</div>
                </div>
                <div>
                  <div className="text-[#D8A860] font-bold text-2xl">Local</div>
                  <div className="text-[#C0C0C0]/60 text-xs">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Auditor List */}
        <div className="w-2/5 p-4 flex flex-col border-l border-[#C0C0C0]/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-medium text-lg">Available Auditors</div>
              <div className="text-[#C0C0C0]/60 text-xs">Matching your requirements</div>
            </div>
            <span className="px-2 py-1 bg-[#7CC2A7]/20 text-[#7CC2A7] rounded text-xs">4 Ready</span>
          </div>
          
          <div className="flex-1 space-y-2 overflow-hidden">
            {auditors.map((auditor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedAuditor === i 
                    ? 'bg-[#1391BF]/20 border border-[#1391BF]/50' 
                    : 'bg-[#161616] hover:bg-[#1a1a1a]'
                }`}
                onClick={() => setSelectedAuditor(i)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    selectedAuditor === i ? 'bg-[#7CC2A7]' : 'bg-[#1391BF]'
                  }`}>
                    {auditor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm">{auditor.name}</div>
                    <div className="text-[#C0C0C0]/60 text-xs">{auditor.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#7CC2A7] text-xs font-medium">{auditor.available}</div>
                    <div className="text-[#C0C0C0]/40 text-xs">{auditor.distance}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 bg-[#7CC2A7]/15 text-[#7CC2A7] text-xs rounded">{auditor.specialty}</span>
                  <span className="px-2 py-0.5 bg-[#1391BF]/15 text-[#1391BF] text-xs rounded">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-[#1391BF]/10 border border-[#1391BF]/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1391BF] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium text-sm">We are everywhere</div>
                <div className="text-[#1391BF] text-xs">Local auditors in every major industrial region</div>
              </div>
            </div>
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

// Step 5: Report Generation
const ReportDemo = () => (
  <WindowChrome title="ScanPro+ — Audit Report: TechMold Industries">
    <div className="h-full flex">
      <div className="w-2/3 p-4 flex flex-col border-r border-[#C0C0C0]/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white font-medium text-lg">VDA 6.3 Audit Report</div>
            <div className="text-[#C0C0C0]/60 text-sm">TechMold Industries · February 15, 2025</div>
          </div>
          <div className="text-right">
            <div className="text-[#7CC2A7] font-bold text-3xl">87%</div>
            <div className="text-[#C0C0C0]/40 text-xs">Overall Score</div>
          </div>
        </div>
        
        <div className="bg-[#161616] rounded-xl p-4 mb-4">
          <div className="text-white/80 text-sm mb-3">Score Trend</div>
          <div className="flex items-end gap-3 h-20">
            {[65, 72, 78, 82, 87].map((score, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${score}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex-1 bg-[#1391BF] rounded-t-lg relative"
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-white">{score}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-[#C0C0C0]/40">
            <span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-white/80 text-sm mb-3">Evidence Gallery</div>
          <div className="grid grid-cols-4 gap-2">
            {[equipmentImage, factoryImage, equipmentImage, factoryImage].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img src={img} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-white/80 text-sm mb-3">Key Findings</div>
          <div className="space-y-2">
            {[
              { finding: "Calibration records incomplete for CMM equipment", severity: 'major', clause: 'P6.3.2' },
              { finding: "Training records need update for new operators", severity: 'minor', clause: 'P6.2.1' },
              { finding: "Process FMEA not updated since 2023", severity: 'major', clause: 'P6.1.4' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.15 }}
                className="flex items-start gap-3 p-3 bg-[#161616] rounded-lg"
              >
                <div className={`px-2 py-1 rounded text-xs font-bold ${item.severity === 'major' ? 'bg-[#C4564F]/20 text-[#C4564F]' : 'bg-[#D8A860]/20 text-[#D8A860]'}`}>
                  {item.severity.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-white/90 text-sm">{item.finding}</div>
                  <div className="text-[#C0C0C0]/50 text-xs mt-1">Clause: {item.clause}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-1/3 p-4 flex flex-col">
        <div className="text-white/90 font-medium text-sm mb-4">Category Scores</div>
        <div className="space-y-3 flex-1">
          {[
            { category: 'P6.1 Process Input', score: 92, color: '#7CC2A7' },
            { category: 'P6.2 Personnel', score: 85, color: '#7CC2A7' },
            { category: 'P6.3 Resources', score: 78, color: '#D8A860' },
            { category: 'P6.4 Operations', score: 88, color: '#7CC2A7' },
            { category: 'P6.5 Transport', score: 90, color: '#7CC2A7' },
            { category: 'P6.6 Analysis', score: 82, color: '#7CC2A7' },
          ].map((cat, i) => (
            <motion.div key={cat.category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#C0C0C0]/80">{cat.category}</span>
                <span className="text-white font-medium">{cat.score}%</span>
              </div>
              <div className="h-2 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${cat.score}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  style={{ backgroundColor: cat.color }} className="h-full rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          <button className="w-full py-3 bg-[#1391BF] text-white rounded-xl text-sm font-medium">
            Download PDF Report
          </button>
          <button className="w-full py-3 bg-[#161616] text-white/80 rounded-xl text-sm font-medium">
            Share with Stakeholders
          </button>
        </div>
      </div>
    </div>
  </WindowChrome>
);

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
