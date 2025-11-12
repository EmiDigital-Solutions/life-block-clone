import { motion, useInView } from "framer-motion";
import { Check, Search, Save, FileText, Globe, Brain, TrendingUp, Users, Clock, Target, Zap, Shield, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useRef } from "react";

const SearchSuppliers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "save" | "export">("search");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen pt-32 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)" }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: ["-10%", "10%", "-10%"],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)" }}
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["10%", "-10%", "10%"],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 rounded-full mb-6 border border-[#14B8A6]/20"
              >
                <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-sm font-semibold text-[#14B8A6]">AI-Powered Supplier Discovery</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-[#14B8A6]">Find suppliers</span>
                <br />
                <span className="text-white">worldwide in real-time.</span>
              </h1>
              
              <div className="space-y-4 mb-8">
                {[
                  "25+ million supplier profiles",
                  "Relevant supplier data",
                  "Save and export options"
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 text-white group"
                  >
                    <div className="w-6 h-6 bg-[#14B8A6]/20 rounded-full flex items-center justify-center group-hover:bg-[#14B8A6]/30 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
                    </div>
                    <span className="text-lg">{text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Data Table Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#14B8A6] rounded-full animate-pulse-soft"></div>
                  9823 companies found
                </span>
                <Button variant="outline" size="sm" className="rounded-full border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10">
                  Save to list
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Aventro Mobility", desc: "Develops modular sensor-fusion...", country: "🇬🇧", year: "1973", color: "from-blue-500 to-blue-600" },
                  { name: "StratoSensor", desc: "Develops scalable LiDAR platform...", country: "🇬🇧", year: "2019", color: "from-purple-500 to-purple-600" },
                  { name: "Quanteer Drive", desc: "Conducts research on predictive...", country: "🇬🇧", year: "2021", color: "from-[#14B8A6] to-[#0D9488]" }
                ].map((company, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-md transition-all cursor-pointer border border-gray-200 hover:border-[#14B8A6]/30 group"
                  >
                    <input type="checkbox" className="w-4 h-4 accent-[#14B8A6]" checked={index < 2} readOnly />
                    <div className={`w-12 h-12 bg-gradient-to-br ${company.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {company.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{company.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{company.country}</span>
                      <span className="text-xs text-gray-400 font-mono">{company.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Market transparency text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-900">Gain market transparency in seconds.</span>{" "}
                    We spotlight the most relevant suppliers – <span className="font-semibold text-[#14B8A6]">across all industries.</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section 
        className="py-16"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        data-nav-theme="light"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider font-semibold"
          >
            Trusted by world leading companies
          </motion.p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {["AVL", "IFAM", "REWE", "KNORR-BREMSE", "Krombacher", "SAP"].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-default"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Benefits</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">Your next supplier,</span>
              <br />
              <span className="text-black">just a click away.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "10x",
                title: "faster supplier research",
                features: ["Filtered results", "AI-based ranking systems", "Always up-to-date"],
                gradient: "from-blue-500 to-blue-600"
              },
              {
                stat: "25M+",
                title: "supplier profiles",
                features: ["Global transparency", "Niche technologies", "Cross-sector searches"],
                gradient: "from-[#14B8A6] to-[#0D9488]"
              },
              {
                stat: "100x",
                title: "more results per query with SearchPro+",
                features: ["Greater variety in supplier profiles", "Better comparison opportunities", "Higher match rate"],
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden relative">
                  {/* Gradient accent bar on top */}
                  <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
                  
                  <CardHeader className="relative">
                    {/* Background gradient glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    
                    <CardTitle className="text-[#14B8A6] text-6xl font-bold mb-4 relative z-10">{item.stat}</CardTitle>
                    <CardDescription className="text-black text-xl font-semibold relative z-10">{item.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {item.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <div className="w-5 h-5 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#14B8A6]" />
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section 
        className="py-20"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
        data-nav-theme="light"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-[#14B8A6]">Product</span>
              <br />
              <span className="text-black">Overview.</span>
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {[
              { id: "search", label: "1 Search", icon: Search },
              { id: "save", label: "2 Save", icon: Save },
              { id: "export", label: "3 Export", icon: FileText }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white text-[#14B8A6] shadow-lg border-2 border-[#14B8A6]/20 scale-105"
                    : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab === tab.id ? "bg-[#14B8A6]/10" : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-[#14B8A6]" : "text-gray-500"}`} />
                </div>
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
            >
              {activeTab === "search" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {[
                      { name: "Kenna Metal Inc.", location: "Chicago, USA", year: "1973" },
                      { name: "DuPont SARL", location: "Paris, France", year: "1896" },
                      { name: "CRH Automotive", location: "Munich, Germany", year: "2005" }
                    ].map((company, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#14B8A6]/5 to-transparent rounded-2xl hover:from-[#14B8A6]/10 transition-all group"
                      >
                        <div className="w-10 h-10 bg-[#14B8A6]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-[#14B8A6]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.location} • {company.year}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white hover:from-[#0F9B8E] hover:to-[#0A7A6E] rounded-full w-full py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Save to list
                  </Button>
                </div>
              )}
              {activeTab === "save" && (
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-[#14B8A6]/5 to-blue-50 rounded-2xl border border-[#14B8A6]/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#14B8A6]/20 rounded-full flex items-center justify-center">
                        <Save className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">Local List - Automotive Supplier EMEA</p>
                        <p className="text-sm text-gray-600">Contains all contacts gathered during the Automotive Sector for Europe.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="rounded-full text-[#14B8A6] border-[#14B8A6]/30 hover:bg-[#14B8A6]/10">Share</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-[#14B8A6] border-[#14B8A6]/30 hover:bg-[#14B8A6]/10">Edit</Button>
                      <Button variant="outline" size="sm" className="rounded-full text-red-500 border-red-300 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "export" && (
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">Export your supplier lists in multiple formats for seamless integration with your existing systems.</p>
                  <div className="flex gap-3 flex-wrap">
                    {["CSV", "Excel", "PDF", "JSON"].map((format, index) => (
                      <motion.div
                        key={format}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button variant="outline" className="rounded-full border-[#14B8A6]/30 text-[#14B8A6] hover:bg-[#14B8A6]/10 px-6 py-3">
                          <FileText className="w-4 h-4 mr-2" />
                          {format}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Key suppliers always in sight</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You can easily create lists of suppliers tailored to your business needs and continuously add new ones as you discover them. Your entire team can access the platform and collaborate effortlessly – keeping everyone on the same page and fully aligned.
              </p>
              <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Technology</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="text-[#14B8A6]">Our technology</span>
              <br />
              <span className="text-black">for global supplier identification.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Conversational Workflow",
                subtitle: "7-Step Intelligence",
                description: "Our AI agent guides you through a structured dialogue, converting vague requirements into precise specifications with technical details, materials, and certifications.",
                icon: Brain,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Triple-Source Search Architecture",
                subtitle: "Complete Market Coverage",
                description: "Simultaneous search across verified supplier database, company research database, and real-time web discovery to find both established suppliers and newest startups.",
                icon: Globe,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Smart AI Preference Engine",
                subtitle: "Learns Your Requirements",
                description: "AI automatically recognizes your profile and preferences, prioritizing suppliers with relevant certifications and experience based on your industry and past searches.",
                icon: TrendingUp,
                gradient: "from-[#14B8A6] to-[#0D9488]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all h-full border-0 overflow-hidden">
                  <div className={`h-56 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                      }}></div>
                    </div>
                    
                    {/* Icon with glow */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <item.icon className="w-14 h-14 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  <CardHeader>
                    <CardDescription className="text-[#14B8A6] text-sm font-bold uppercase tracking-wide mb-2">
                      {item.subtitle}
                    </CardDescription>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">7 AI Features</span>
              <br />
              <span className="text-black">that will change your procurement forever</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Preference Engine",
                description: "AI automatically recognizes your requirements and preferences based on your profile. For example, if you mainly work in automotive, the system automatically prefers TS16949-certified suppliers."
              },
              {
                icon: FileText,
                title: "Intelligent Requirement Capture",
                description: "AI automatically extracts specifications from natural language or uploaded documents. Upload CAD drawings or datasheets, and AI extracts dimensions, materials, and standards."
              },
              {
                icon: Target,
                title: "Multi-Factor Matching",
                description: "Evaluation based on industry, location, certifications, and capacity. Example: LNG plant supplier with PED/ASME certification, max 200km to port, min 500 tons/year steel processing."
              },
              {
                icon: Shield,
                title: "Explainable AI",
                description: "Transparent reasoning for supplier recommendations. Example: 'Supplier A recommended because: ISO14001 certification (90% match), 2 years experience with similar projects, local presence.'"
              },
              {
                icon: Users,
                title: "Smart Deduplication",
                description: "Automatic recognition and merging of identical suppliers. 'Müller GmbH', 'Mueller Group' and 'Müller Precision' are recognized as one company."
              },
              {
                icon: Zap,
                title: "Dynamic Results",
                description: "Delivers only truly relevant matches, no filler results. With specific queries, only the 7 actually matching suppliers are displayed instead of padding the list with less relevant ones."
              },
              {
                icon: Clock,
                title: "Real-Time Data Enrichment",
                description: "Continuous updating of supplier data. New certifications, location expansions, or insolvency proceedings are automatically detected and integrated."
              },
              {
                icon: Globe,
                title: "Alternative Term Discovery",
                description: "Identifies related terms for complete market coverage. 'Die casting' automatically expands to 'Pressure Die Casting', 'Permanent Mold Casting', etc."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all h-full border-0 p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0F9B8E] flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" data-nav-theme="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">FAQ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">We answer all questions</span>
              <br />
              <span className="text-black">about SearchPro+.</span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How does YVOO's search engine work?",
                a: "YVOO SearchPro+ uses a triple-source architecture combining verified supplier databases, company research databases, and real-time web searches. Our AI agent guides you through a conversational workflow to understand your exact requirements."
              },
              {
                q: "Do I need a subscription to use YVOO's search engine?",
                a: "Yes, YVOO SearchPro+ is available through subscription plans tailored to your company size and needs. Contact us for a demo and custom pricing."
              },
              {
                q: "Who can use SearchPro+?",
                a: "SearchPro+ is designed for procurement professionals, supply chain managers, and sourcing teams across all industries looking to streamline their supplier discovery process."
              },
              {
                q: "How can I use SearchPro+'s export files?",
                a: "You can export supplier lists in CSV, Excel, or PDF formats for seamless integration with your existing procurement systems or ERP platforms."
              },
              {
                q: "Is my data treated confidentially?",
                a: "Absolutely. We maintain strict data privacy standards and comply with GDPR regulations. Your searches and supplier lists remain completely confidential."
              },
              {
                q: "What makes SearchPro+ different from traditional search engines?",
                a: "Unlike traditional search engines, SearchPro+ uses AI to understand procurement-specific requirements, searches multiple verified databases simultaneously, and provides explainable recommendations with quality scores."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl px-6 border-0 shadow-sm hover:shadow-md transition-all">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline text-gray-900 py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 50%, rgb(15, 23, 42) 100%)" }}>
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)", opacity: 0.2 }}
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)", opacity: 0.15 }}
            animate={{
              x: ["0%", "-100%", "0%"],
              y: ["0%", "-100%", "0%"],
              scale: [1.5, 1, 1.5]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#14B8A6]/10 rounded-full mb-6 border border-[#14B8A6]/20"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-sm font-semibold text-[#14B8A6]">Find companies</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-8"
            >
              Start searching today
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-2 flex items-center gap-4 max-w-2xl mx-auto mb-8 shadow-2xl"
            >
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Ask our AI to find the right companies"
                className="flex-1 outline-none text-gray-600 bg-transparent py-2"
              />
              <Button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#0F9B8E] hover:to-[#0A7A6E] text-white rounded-full px-8 py-6 shadow-lg hover:scale-105 transition-all">
                Search
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 justify-center flex-wrap"
            >
              <span className="text-gray-400 text-sm">Popular:</span>
              {["Quantum Chips", "Quantum Simulations", "Precision Farming", "3D Bin Picking"].map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all border border-white/10 hover:border-[#14B8A6]/30"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchSuppliers;
