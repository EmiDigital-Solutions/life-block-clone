import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Upload, CheckCircle2, FileText, Building2, MapPin, Globe, ArrowRight, Loader2, ChevronRight, File, X } from "lucide-react";
import { PixelIcon } from "@/components/PixelIcon";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

const OrderingProcess = () => {
  const [currentScreen, setCurrentScreen] = useState<1 | 2>(1);
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'complete'>('idle');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [uploadedChecklist, setUploadedChecklist] = useState<UploadedFile[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedFile[]>([]);

  const handleSearch = () => {
    setSearchState('searching');
    setTimeout(() => setSearchState('complete'), 2500);
  };

  const suppliers = [
    { id: "1", name: "Precision Parts GmbH", location: "Stuttgart, Germany", industry: "Automotive", score: 87 },
    { id: "2", name: "Shenzhen Electronics Co.", location: "Shenzhen, China", industry: "Electronics", score: 72 },
    { id: "3", name: "Nordic Components AB", location: "Gothenburg, Sweden", industry: "Automotive", score: 94 },
  ];

  const toggleSupplier = (id: string) => {
    setSelectedSuppliers(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0A0A0A] rounded-2xl overflow-hidden"
    >
      {/* Screen Navigation Tabs */}
      <div className="flex border-b border-[#C0C0C0]/10">
        <button
          onClick={() => setCurrentScreen(1)}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
            currentScreen === 1 
              ? 'text-white bg-[#1391BF]/10 border-b-2 border-[#1391BF]' 
              : 'text-[#C0C0C0]/60 hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-xs">1</span>
            Search & Intelligence
          </span>
        </button>
        <button
          onClick={() => setCurrentScreen(2)}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
            currentScreen === 2 
              ? 'text-white bg-[#1391BF]/10 border-b-2 border-[#1391BF]' 
              : 'text-[#C0C0C0]/60 hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1391BF]/20 flex items-center justify-center text-xs">2</span>
            Prepare & Order
          </span>
        </button>
      </div>

      <div className="p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {currentScreen === 1 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Step 1: Find Your Supplier */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">1</div>
                  <h3 className="text-lg font-semibold text-white">Find Your Supplier</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#C0C0C0]/60 mb-2 block">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]/40" />
                      <input 
                        type="text" 
                        placeholder="Enter supplier name..."
                        className="w-full bg-[#161616] border border-[#C0C0C0]/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#C0C0C0]/40 focus:outline-none focus:border-[#1391BF]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#C0C0C0]/60 mb-2 block">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]/40" />
                        <input 
                          type="text" 
                          placeholder="City..."
                          className="w-full bg-[#161616] border border-[#C0C0C0]/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-[#C0C0C0]/40 focus:outline-none focus:border-[#1391BF]/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#C0C0C0]/60 mb-2 block">Country</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]/40" />
                        <select className="w-full bg-[#161616] border border-[#C0C0C0]/10 rounded-lg pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-[#1391BF]/50">
                          <option value="">Select country</option>
                          <option value="DE">Germany</option>
                          <option value="CN">China</option>
                          <option value="US">United States</option>
                          <option value="JP">Japan</option>
                          <option value="SE">Sweden</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]/40 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSearch}
                    disabled={searchState === 'searching'}
                    className="w-full bg-[#1391BF] hover:bg-[#1391BF]/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {searchState === 'searching' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {searchState === 'searching' ? 'Searching...' : 'Search with AI'}
                  </button>
                </div>
              </div>

              {/* Step 2: AI Intelligence Report */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm font-bold">2</div>
                  <h3 className="text-lg font-semibold text-white">AI Intelligence Report</h3>
                </div>

                <div className="bg-[#161616] rounded-xl p-5 min-h-[280px]">
                  {searchState === 'idle' && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-[#C0C0C0]/10 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-[#C0C0C0]/40" />
                      </div>
                      <p className="text-[#C0C0C0]/60 text-sm">Enter supplier details and search to generate intelligence report</p>
                    </div>
                  )}

                  {searchState === 'searching' && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-2 border-[#1391BF] border-t-transparent flex items-center justify-center mb-4"
                      >
                        <Sparkles className="w-6 h-6 text-[#1391BF]" />
                      </motion.div>
                      <p className="text-white font-medium mb-2">AI crawling supplier data...</p>
                      <p className="text-[#C0C0C0]/60 text-sm">Report ready in minutes</p>
                    </div>
                  )}

                  {searchState === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[#7CC2A7] text-sm font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Report Ready
                        </span>
                        <span className="text-xs text-[#C0C0C0]/60">Generated just now</span>
                      </div>

                      {/* Intelligence Metrics */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Risk Score", value: "Low", color: "#7CC2A7" },
                          { label: "Financial Health", value: "Stable", color: "#1391BF" },
                          { label: "Compliance", value: "ISO 9001", color: "#7CC2A7" },
                          { label: "Industry Match", value: "95%", color: "#1391BF" },
                        ].map((metric) => (
                          <div key={metric.label} className="bg-[#0A0A0A] rounded-lg p-3">
                            <p className="text-[10px] text-[#C0C0C0]/60 uppercase">{metric.label}</p>
                            <p className="text-sm font-semibold" style={{ color: metric.color }}>{metric.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#C0C0C0]/10">
                        <p className="text-xs text-[#C0C0C0]/80 mb-3">3 potential suppliers found matching your criteria</p>
                        <button 
                          onClick={() => setCurrentScreen(2)}
                          className="w-full bg-[#7CC2A7] hover:bg-[#7CC2A7]/90 text-[#0A0A0A] font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
                        >
                          Continue to Selection
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Step 3: Select & Prepare Audit */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1391BF] flex items-center justify-center text-white text-sm font-bold">3</div>
                  <h3 className="text-lg font-semibold text-white">Select & Prepare Audit</h3>
                </div>

                {/* Supplier Selection */}
                <div className="space-y-3">
                  <p className="text-sm text-[#C0C0C0]/60">Select suppliers to audit</p>
                  {suppliers.map((supplier) => (
                    <motion.div
                      key={supplier.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => toggleSupplier(supplier.id)}
                      className={`flex items-center gap-4 p-4 bg-[#161616] rounded-xl cursor-pointer border-2 transition-all ${
                        selectedSuppliers.includes(supplier.id) 
                          ? 'border-[#1391BF]' 
                          : 'border-transparent hover:border-[#C0C0C0]/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedSuppliers.includes(supplier.id) 
                          ? 'bg-[#1391BF] border-[#1391BF]' 
                          : 'border-[#C0C0C0]/30'
                      }`}>
                        {selectedSuppliers.includes(supplier.id) && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{supplier.name}</p>
                        <p className="text-xs text-[#C0C0C0]/60">{supplier.location} • {supplier.industry}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold" style={{ color: supplier.score >= 80 ? '#7CC2A7' : supplier.score >= 60 ? '#D8A860' : '#C4564F' }}>
                          {supplier.score}%
                        </div>
                        <p className="text-[10px] text-[#C0C0C0]/60">Risk Score</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Upload Zones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-sm text-[#C0C0C0]/60">Upload Your Checklist</p>
                    <div className="border-2 border-dashed border-[#C0C0C0]/20 rounded-xl p-6 text-center hover:border-[#1391BF]/50 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-[#C0C0C0]/40 mx-auto mb-2" />
                      <p className="text-sm text-[#C0C0C0]/60">Drag & drop or click to upload</p>
                      <p className="text-xs text-[#C0C0C0]/40 mt-1">PDF, Excel, Word</p>
                    </div>
                    {uploadedChecklist.length > 0 && (
                      <div className="space-y-2">
                        {uploadedChecklist.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-[#161616] rounded-lg">
                            <FileText className="w-4 h-4 text-[#1391BF]" />
                            <span className="text-xs text-white flex-1 truncate">{file.name}</span>
                            <button className="text-[#C0C0C0]/40 hover:text-[#C4564F]">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-[#C0C0C0]/60">Additional Documents</p>
                    <div className="border-2 border-dashed border-[#C0C0C0]/20 rounded-xl p-6 text-center hover:border-[#1391BF]/50 transition-colors cursor-pointer">
                      <File className="w-8 h-8 text-[#C0C0C0]/40 mx-auto mb-2" />
                      <p className="text-sm text-[#C0C0C0]/60">Drag & drop or click to upload</p>
                      <p className="text-xs text-[#C0C0C0]/40 mt-1">Specs, drawings, requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Confirm & Order */}
              <div className="space-y-6 pt-6 border-t border-[#C0C0C0]/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7CC2A7] flex items-center justify-center text-white text-sm font-bold">4</div>
                  <h3 className="text-lg font-semibold text-white">Confirm & Order</h3>
                </div>

                <div className="bg-[#161616] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#C0C0C0]/60 text-sm">Order Summary</span>
                    <span className="text-xs text-[#7CC2A7]">{selectedSuppliers.length} supplier(s) selected</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#C0C0C0]/80">Base audit fee</span>
                      <span className="text-white">€700</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#C0C0C0]/80">Suppliers × {selectedSuppliers.length}</span>
                      <span className="text-white">€{700 * Math.max(1, selectedSuppliers.length)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-[#C0C0C0]/10">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-[#1391BF] font-bold text-lg">€{700 * Math.max(1, selectedSuppliers.length)}</span>
                    </div>
                  </div>

                  <a 
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1391BF] hover:bg-[#1391BF]/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    Order Audit
                    <PixelIcon name="arrow-right" className="w-4 h-4" />
                  </a>
                  
                  <p className="text-[10px] text-[#C0C0C0]/40 text-center mt-3">No setup fees • Pay per audit • Dedicated account manager</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OrderingProcess;
