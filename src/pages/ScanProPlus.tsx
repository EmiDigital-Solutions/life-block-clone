import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, ArrowRight, CheckCircle, Zap, Shield, BarChart3, Award, TrendingUp } from "lucide-react";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";

const ScanProPlus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* HERO SECTION */}
      <section
        data-nav-theme="dark"
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-12"
        style={{ background: "linear-gradient(135deg, rgb(15, 135, 117), rgb(20, 184, 166), rgb(59, 130, 246))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white space-y-6"
          >
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
              YVOO ScanPro+
            </h1>
            <p className="text-2xl md:text-3xl font-medium opacity-95 max-w-4xl mx-auto">
              AI-Powered Supplier Audit Platform for Professional Quality Management
            </p>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              Imagine: <strong>On-site supplier audits in 3 days instead of 3 weeks</strong>, 
              starting at <strong>€700 fixed price</strong> instead of €15,000-25,000, with <strong>actionable business intelligence</strong> 
              instead of just checklists – YVOO ScanPro+ makes this possible with AI and our global auditor network.
            </p>
          </motion.div>
        </div>

        {/* Value Proposition Band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 bg-[#10B981] text-white py-6 px-8 rounded-lg max-w-5xl mx-auto text-center"
        >
          <p className="text-2xl font-semibold">
            🎯 <strong>Always ground truth</strong> – Reliable, precise data for informed business decisions
          </p>
        </motion.div>
      </section>

      {/* CHALLENGE SECTION */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          >
            The Challenge You Know as Quality Manager
          </motion.h2>

          {/* Pain Point */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50 border-l-4 border-amber-400 p-8 rounded-lg mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ❌ Traditional Supplier Audits are Inefficient and Expensive
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              You know the problem: A standard supplier audit through TÜV or other traditional providers costs between <strong>€15,000 and €25,000</strong> per audit. Coordination takes weeks. Between request and audit appointment, 2-3 weeks often pass, the audit itself takes several days, and then you wait additional days for the report.
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-3">The real problems for you as decision-maker:</p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• Inconsistent assessments – each auditor has their own style</li>
              <li>• Delayed insights – when the report arrives, the production situation has already changed</li>
              <li>• Incomplete documentation – missing photos, gaps in evidence</li>
              <li>• High internal coordination costs – your employees constantly need to follow up</li>
              <li>• No comparability – how does your Supplier A compare to Supplier B?</li>
              <li>• Difficult remote assessment – a real challenge in times of global supply chains</li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ✅ The YVOO ScanPro+ Solution: Modern AI Platform Meets Global Expert Network
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              We've reimagined supplier auditing – <strong>specifically for demanding quality managers</strong> in the automotive, aerospace, pharma, and manufacturing industries. Our platform combines:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li>• <strong>Standardization through AI</strong> – every audit follows your specifications exactly</li>
              <li>• <strong>Speed</strong> – 70% time savings compared to traditional methods</li>
              <li>• <strong>Cost transparency</strong> – Fixed prices from €700, no hidden costs</li>
              <li>• <strong>Real-time Intelligence</strong> – Live updates during the audit</li>
              <li>• <strong>Full Compliance</strong> – GDPR-compliant, SOC2-certified</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            Direct Comparison: YVOO ScanPro+ vs. Traditional Providers
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Criteria</th>
                  <th className="px-6 py-4 text-left">Traditional Providers (TÜV, etc.)</th>
                  <th className="px-6 py-4 text-left">YVOO ScanPro+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Cost per Audit</td>
                  <td className="px-6 py-4 text-red-600">€15,000 - €25,000</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">From €700 (Fixed Price)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Time until Audit Execution</td>
                  <td className="px-6 py-4 text-red-600">2-3 weeks lead time</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Same-Day / Next-Day possible</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Audit Duration</td>
                  <td className="px-6 py-4 text-red-600">3-5 days on-site</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">1-3 days (structured)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Time to Report</td>
                  <td className="px-6 py-4 text-red-600">5-10 days after audit</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Real-time + Final Report in 24h</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Consistency</td>
                  <td className="px-6 py-4 text-red-600">Depends on auditor</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">AI-supported, 100% standardized</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Equipment Recognition</td>
                  <td className="px-6 py-4 text-red-600">Manual recording, often incomplete</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">AI Computer Vision – automatic identification</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Traceability</td>
                  <td className="px-6 py-4 text-red-600">Static PDF reports</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Digital platform with audit trail</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Benchmarking</td>
                  <td className="px-6 py-4 text-red-600">Manual, labor-intensive</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Automatic against industry standards</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Price Transparency</td>
                  <td className="px-6 py-4 text-red-600">Quote on request, often renegotiations</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Fixed prices, no hidden costs</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Global Availability</td>
                  <td className="px-6 py-4 text-red-600">Network available, but slow coordination</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">On-Demand in 90+ countries, Uber principle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gray-100 rounded-2xl p-8 md:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              ROI Calculation: Your Savings with YVOO ScanPro+
            </motion.h2>
            <p className="text-xl text-gray-700 mb-8">
              Assuming your company conducts <strong>20 supplier audits per year</strong>:
            </p>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-6 border-b-2 border-gray-300">
                <div className="text-xl font-semibold">Traditional Audit Costs (20 × €20,000)</div>
                <div className="text-3xl font-bold text-gray-900">€400,000</div>
              </div>
              
              <div className="flex justify-between items-center py-6 border-b-2 border-gray-300">
                <div className="text-xl font-semibold">YVOO ScanPro+ Costs (20 × €700)</div>
                <div className="text-3xl font-bold text-gray-900">€14,000</div>
              </div>
              
              <div className="bg-emerald-100 rounded-xl p-8 -mx-4 md:-mx-8">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-900">💰 Your Annual Cost Savings</div>
                  <div className="text-5xl font-bold text-green-600">€386,000</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-6">
                <div className="text-xl font-semibold">Time Savings (70% of 2 weeks per audit)</div>
                <div className="text-3xl font-bold text-green-600">280 Work Days</div>
              </div>
            </div>

            <p className="text-gray-600 mt-8">
              <strong>Additional Savings:</strong> No travel costs for internal auditors, 
              reduced rework through standardized reports, faster supplier releases 
              enable shorter time-to-market.
            </p>
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            9 Innovative AI Features for Strategic Supplier Assessment
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Flexible Template Creation",
                desc: "Create custom audit structures for specific industries, standards, or customer requirements.",
                example: "Example for Automotive: ISO 9001 template for automotive suppliers with TS16949-specific additions and industry-specific KPIs."
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "AI-Powered Equipment Recognition",
                desc: "Point the camera at machines and get instant identification and analysis.",
                example: "Example: 'CNC Milling Machine DMG Mori' → AI automatically identifies all technical details."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                title: "Dynamic Rating Systems",
                desc: "Configurable evaluation criteria with industry-specific weighting.",
                example: "Pharma Example: CleanRoom standards weighted at 40%. Automotive Example: Quality systems rated at 35%."
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Intelligent Evidence Management",
                desc: "Automatic categorization and analysis of audit evidence.",
                example: "Automatic photo categorization for quality control, workplace safety, environmental standards."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
                title: "Real-Time Progress Tracking",
                desc: "Live updates with milestone notifications during the audit.",
                example: "Example: 'Production area completed (75% of total points achieved), next step: Quality lab'"
              },
              {
                icon: <Award className="w-8 h-8 text-blue-600" />,
                title: "Compliance & Certifications",
                desc: "GDPR-compliant, SOC2-certified with complete audit trail.",
                example: "Supported standards: ISO 9001, IATF 16949, AS9100, ISO 14001, GMP, API Q1, SQF"
              },
              {
                icon: <Shield className="w-8 h-8 text-red-600" />,
                title: "Real-Time Risk Management",
                desc: "Early detection of critical compliance violations during the audit.",
                example: "CRITICAL Example: 'Missing calibration on 3 measuring devices detected – production release stopped'"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
                title: "Predictive Risk Scoring",
                desc: "Risk prediction based on historical audit data.",
                example: "Example: 'Supplier shows 15% higher quality risk due to outdated testing equipment and missing maintenance protocol'"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-green-600" />,
                title: "Comparative Benchmarking",
                desc: "Comparative analysis against industry peers.",
                example: "Example: 'Your supplier achieves 87% of industry benchmarks in quality systems, but is 12% below average in environmental standards'"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 mb-3">{feature.desc}</p>
                <p className="text-sm text-gray-600 italic">{feature.example}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE & STANDARDS */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🏆 Compliance & Supported Standards
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              YVOO ScanPro+ meets the highest international quality and safety standards. 
              Your audits are legally secure and comply with all industry-specific requirements.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['ISO 9001', 'IATF 16949', 'AS9100', 'ISO 14001', 'GMP', 'API Q1', 'SQF', 'VDA 6.3', 'TS16949', 'GDPR-compliant', 'SOC2-certified', 'FDA-compliant'].map((standard, idx) => (
                <div key={idx} className="bg-white px-4 py-3 rounded-lg text-center font-semibold text-gray-800 shadow">
                  {standard}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRY USE CASES */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          >
            Industry-Specific Use Cases
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                icon: "🚗",
                title: "Automotive: PPAP Validation & Tool Audits",
                useCase: "Your use case: You need to qualify a new Tier-2 supplier for precision parts.",
                solution: [
                  "Complete First Article Inspection with automatic document creation",
                  "Supplier development according to IATF 16949",
                  "Automatic release process with ERP integration",
                  "VDA 6.3 compliant process assessment"
                ],
                result: "Result: Qualification in 3 days instead of 3 weeks, complete PPAP documentation digitally available."
              },
              {
                icon: "✈️",
                title: "Aerospace: AS9100 Compliance & Critical Process Validation",
                useCase: "Your use case: Validation of a welding process at a supplier of critical aircraft components.",
                solution: [
                  "Welding process qualification with complete documentation",
                  "Material tracking and certificate tracking",
                  "AS9100-compliant reporting",
                  "Critical process parameter monitoring"
                ]
              },
              {
                icon: "💊",
                title: "Pharma: GMP Audits & Clean Room Assessments",
                useCase: "Your use case: GMP audit of an API manufacturer in India before contract signing.",
                solution: [
                  "Sterilization process validation with FDA-compliant documentation",
                  "Clean Room assessment with automatic classification",
                  "Change Control and deviation management",
                  "Validation processes fully documented"
                ]
              },
              {
                icon: "🏭",
                title: "Chemical & Process Industry: REACH Compliance & Process Safety",
                useCase: "Your use case: Safety assessment of a chemical plant in China.",
                solution: [
                  "Plant safety inspection with automatic risk assessment",
                  "Environmental audits and REACH compliance check",
                  "Action tracking with deadline monitoring",
                  "Process safety according to COMAH/Seveso"
                ]
              }
            ].map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  {industry.icon} {industry.title}
                </h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">{industry.useCase}</p>
                <p className="text-lg font-semibold text-gray-900 mb-3">ScanPro+ Solution:</p>
                <ul className="space-y-2 mb-4">
                  {industry.solution.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {industry.result && (
                  <p className="text-gray-700 font-semibold">{industry.result}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS IMPACT */}
      <section data-nav-theme="light" className="py-24 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
          >
            Business Impact: Measurable Results for Your Quality Management
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { value: "60%", label: "Cost Reduction", desc: "through standardization and automation", color: "text-green-600" },
              { value: "70%", label: "Time Savings", desc: "from 2 weeks to 3 days turnaround", color: "text-blue-600" },
              { value: "100%", label: "Consistency", desc: "uniform assessment through AI guidance", color: "text-red-600" },
              { value: "24h", label: "Availability", desc: "Same-Day audits in 90+ countries", color: "text-amber-600" }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-200"
              >
                <div className={`text-5xl font-bold mb-3 ${metric.color}`}>{metric.value}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</div>
                <p className="text-gray-600">{metric.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Quality Improvement</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Uniform methodology for all supplier assessments</li>
                <li>• AI-supported detection of critical risks</li>
                <li>• Continuous improvement tracking over time</li>
                <li>• Data-based supplier decisions</li>
                <li>• Elimination of inconsistent assessments between auditors</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">⚡ Efficiency Gains</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 50% faster audit execution through template-based workflows</li>
                <li>• Automatic report generation in real-time</li>
                <li>• Integrated tracking of corrective actions</li>
                <li>• Reduced travel costs through efficient audit planning</li>
                <li>• Shorter time-to-market through faster supplier releases</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        data-nav-theme="dark"
        className="py-20 px-4 sm:px-6 lg:px-12 text-center text-white"
        style={{ background: "linear-gradient(135deg, rgb(102, 126, 234), rgb(118, 75, 162))" }}
      >
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready for the Future of Supplier Auditing?
          </motion.h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95">
            Join leading companies from Automotive, Aerospace, and Pharma 
            who already trust YVOO ScanPro+.
          </p>

          <div className="space-y-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
              <h4 className="text-xl font-bold mb-2">✅ Schedule a Demo (30 minutes)</h4>
              <p className="opacity-95">Experience in a personal demo how YVOO ScanPro+ revolutionizes your supplier audits.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
              <h4 className="text-xl font-bold mb-2">✅ Start Pilot Audit (2 weeks)</h4>
              <p className="opacity-95">Test the platform with a real supplier audit – without risk, with measurable results.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left">
              <h4 className="text-xl font-bold mb-2">✅ Plan Integration</h4>
              <p className="opacity-95">Seamless integration into your existing Quality Management Systems and ERP landscape.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:ibrandic@yvoo.io"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all"
            >
              🗓️ Schedule Demo
            </a>
            <a
              href="mailto:ibrandic@yvoo.io"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all"
            >
              🚀 Start Pilot Audit
            </a>
          </div>

          <div className="pt-8 border-t border-white/30">
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <p className="text-lg">
              <strong>Ivo Brandic</strong>, CEO YVOO Technologies Ltd.<br />
              📧 <a href="mailto:ibrandic@yvoo.io" className="hover:underline">ibrandic@yvoo.io</a><br />
              📱 +49 (0)152 03095799<br />
              💬 WhatsApp | Google Meet
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScanProPlus;
