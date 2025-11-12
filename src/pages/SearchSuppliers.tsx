import { motion } from "framer-motion";
import { Check, Search, Save, FileText, Globe, Brain, TrendingUp, Users, Clock, Target, Zap, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const SearchSuppliers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "save" | "export">("search");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-[#14B8A6]">Find suppliers</span>
                <br />
                <span className="text-white">worldwide in real-time.</span>
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#14B8A6]" />
                  <span className="text-lg">25+ million supplier profiles</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#14B8A6]" />
                  <span className="text-lg">Relevant supplier data</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#14B8A6]" />
                  <span className="text-lg">Save and export options</span>
                </div>
              </div>

              <Button className="bg-[#14B8A6] hover:bg-[#0F9B8E] text-white px-8 py-6 text-lg rounded-full">
                Get Started
              </Button>
            </motion.div>

            {/* Right Content - Data Table Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-600">9823 companies found</span>
                <Button variant="outline" size="sm" className="rounded-full">
                  Save to list
                </Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Aventro Mobility", desc: "Develops modular sensor-fusion...", country: "🇬🇧", year: "1973" },
                  { name: "StratoSensor", desc: "Develops scalable LiDAR platform...", country: "🇬🇧", year: "2019" },
                  { name: "Quanteer Drive", desc: "Conducts research on predictive...", country: "🇬🇧", year: "2021" }
                ].map((company, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input type="checkbox" className="w-4 h-4" checked={index < 2} readOnly />
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {company.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.desc}</p>
                    </div>
                    <span className="text-xl">{company.country}</span>
                    <span className="text-xs text-gray-500">{company.year}</span>
                  </div>
                ))}
              </div>

              {/* Market transparency text */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-semibold">Gain market transparency in seconds.</span>{" "}
                  We spotlight the most relevant suppliers – <span className="font-semibold">across all industries.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <p className="text-center text-gray-600 mb-8 text-sm uppercase tracking-wide">
            Trusted by world leading companies
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
            {["AVL", "IFAM", "REWE", "KNORR-BREMSE", "Krombacher", "SAP"].map((company) => (
              <div key={company} className="text-2xl font-bold text-black">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">Your next supplier,</span>
              <br />
              <span className="text-black">just a click away.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: "10x",
                title: "faster supplier research",
                features: ["Filtered results", "AI-based ranking systems", "Always up-to-date"]
              },
              {
                stat: "25M+",
                title: "supplier profiles",
                features: ["Global transparency", "Niche technologies", "Cross-sector searches"]
              },
              {
                stat: "100x",
                title: "more results per query with SearchPro+",
                features: ["Greater variety in supplier profiles", "Better comparison opportunities", "Higher match rate"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full border-0">
                  <CardHeader>
                    <CardTitle className="text-[#14B8A6] text-5xl font-bold mb-4">{item.stat}</CardTitle>
                    <CardDescription className="text-black text-xl font-semibold">{item.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-[#14B8A6] flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">Product</span>
              <br />
              <span className="text-black">Overview.</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            {[
              { id: "search", label: "1 Search", icon: Search },
              { id: "save", label: "2 Save", icon: Save },
              { id: "export", label: "3 Export", icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-md border-b-2 border-[#14B8A6]"
                    : "bg-transparent text-gray-600 hover:bg-white/50"
                }`}
              >
                <tab.icon className="w-5 h-5 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              {activeTab === "search" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-[#14B8A6]" />
                      <div>
                        <p className="font-semibold">Kenna Metal Inc.</p>
                        <p className="text-sm text-gray-500">Chicago, USA • 1973</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-[#14B8A6]" />
                      <div>
                        <p className="font-semibold">DuPont SARL</p>
                        <p className="text-sm text-gray-500">Paris, France • 1896</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-[#14B8A6]" />
                      <div>
                        <p className="font-semibold">CRH Automotive</p>
                        <p className="text-sm text-gray-500">Munich, Germany • 2005</p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-full w-full">
                    Save to list
                  </Button>
                </div>
              )}
              {activeTab === "save" && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold mb-2">Local List - Automotive Supplier EMEA</p>
                    <p className="text-sm text-gray-600">Contains all contacts gathered during the Automotive Sector for Europe.</p>
                  </div>
                  <p className="text-sm text-gray-600">Share • Edit • Delete</p>
                </div>
              )}
              {activeTab === "export" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Export your supplier lists in multiple formats for seamless integration with your existing systems.</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">CSV</Button>
                    <Button variant="outline" size="sm">Excel</Button>
                    <Button variant="outline" size="sm">PDF</Button>
                  </div>
                </div>
              )}
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Key suppliers always in sight</h3>
              <p className="text-gray-600 mb-6">
                You can easily create lists of suppliers tailored to your business needs and continuously add new ones as you discover them. Your entire team can access the platform and collaborate effortlessly – keeping everyone on the same page and fully aligned.
              </p>
              <Button className="bg-[#14B8A6] hover:bg-[#0F9B8E] text-white rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">Our technology</span>
              <br />
              <span className="text-black">for global supplier identification.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Conversational Workflow",
                subtitle: "7-Step Intelligence",
                description: "Our AI agent guides you through a structured dialogue, converting vague requirements into precise specifications with technical details, materials, and certifications.",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Triple-Source Search Architecture",
                subtitle: "Complete Market Coverage",
                description: "Simultaneous search across verified supplier database, company research database, and real-time web discovery to find both established suppliers and newest startups.",
                icon: Globe,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Smart AI Preference Engine",
                subtitle: "Learns Your Requirements",
                description: "AI automatically recognizes your profile and preferences, prioritizing suppliers with relevant certifications and experience based on your industry and past searches.",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all h-full border-0 overflow-hidden group">
                  <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                    <item.icon className="w-24 h-24 text-white opacity-20 absolute" />
                    <item.icon className="w-16 h-16 text-white relative z-10" />
                  </div>
                  <CardHeader>
                    <CardDescription className="text-[#14B8A6] text-sm font-semibold uppercase tracking-wide">
                      {item.subtitle}
                    </CardDescription>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-[#14B8A6]">We answer all questions</span>
              <br />
              <span className="text-black">about SearchPro+.</span>
            </h2>
          </div>

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
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-xl px-6 border-0">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-black to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#14B8A6] text-sm uppercase tracking-wide mb-4">Find companies</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Start searching today
            </h2>
            
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 max-w-2xl mx-auto mb-8">
              <Search className="w-6 h-6 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Ask our AI to find the right companies"
                className="flex-1 outline-none text-gray-600"
              />
              <Button className="bg-[#14B8A6] hover:bg-[#0F9B8E] text-white rounded-full px-8">
                Search
              </Button>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <span className="text-gray-400 text-sm">Popular:</span>
              {["Quantum Chips", "Quantum Simulations", "Precision Farming", "3D Bin Picking"].map((tag) => (
                <button key={tag} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchSuppliers;
