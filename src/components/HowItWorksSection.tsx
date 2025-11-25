import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Keep existing feature card data structure
const featureSteps = [
  {
    number: "01",
    title: "AI-Generated Audit Framework",
    description: "Smart checklist auto-generated for your product and standards",
  },
  {
    number: "02", 
    title: "Audit Request",
    description: "Place order with supplier details and timeline",
  },
  {
    number: "03",
    title: "Auditor Assignment",
    description: "Certified local auditor matched to your requirements",
  },
];

const auditorLocations = [
  { city: "Berlin", country: "Germany", left: "51%", top: "32%" },
  { city: "Shanghai", country: "China", left: "78%", top: "42%" },
  { city: "Mumbai", country: "India", left: "68%", top: "50%" },
  { city: "São Paulo", country: "Brazil", left: "32%", top: "68%" },
  { city: "Lagos", country: "Nigeria", left: "48%", top: "56%" },
  { city: "Mexico City", country: "Mexico", left: "22%", top: "48%" },
];

export const HowItWorksSection = () => {
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      data-nav-theme="light"
      className="relative bg-white py-24 md:py-32 lg:py-40 px-4 md:px-8 lg:px-12"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6"
        >
          How It Works
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8"
        >
          <Button
            variant="default"
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/95 rounded-full px-8 py-6 text-base font-semibold shadow-sm border border-gray-200"
          >
            Find your auditor now
          </Button>
        </motion.div>
      </div>

      {/* Feature Cards Row */}
      <div className="max-w-7xl mx-auto mb-32 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featureSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 transition-all duration-300 hover:border-[#A8C5B8] hover:shadow-lg">
                {/* Number Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 border border-gray-200">
                    <span className="text-2xl font-light text-gray-900">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connector Icon */}
      <div className="max-w-7xl mx-auto mb-32 md:mb-40 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-gray-300">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1" />
            <path d="M40 20 L40 60 M20 40 L60 40" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#A8C5B8]" />
          </div>
        </motion.div>
      </div>

      {/* On-Site Evaluation Section */}
      <div className="max-w-7xl mx-auto mb-32 md:mb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Illustration */}
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-center">
              <div className="text-center space-y-8 p-12">
                {/* Auditor Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border border-gray-200">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-gray-400">
                    <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 40 C10 32 16 28 24 28 C32 28 38 32 38 40" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                
                {/* Checklist Lines */}
                <div className="space-y-3 max-w-xs mx-auto">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-[#A8C5B8] flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6 L5 9 L10 3" stroke="#A8C5B8" strokeWidth="1.5" />
                        </svg>
                      </div>
                      <div className="flex-1 h-1 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-black">
              Supplier On-Site Evaluation
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Local certified auditor conducts standardized inspection using AI-guided mobile app. Real-time progress tracking with photo evidence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* World Map with Auditors */}
      <div className="max-w-7xl mx-auto mb-32 md:mb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Map Container */}
          <div className="relative aspect-[2/1] bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
            {/* Dotted World Map Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#A8C5B8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>

            {/* Auditor Location Cards */}
            {auditorLocations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="absolute"
                style={{ left: location.left, top: location.top }}
              >
                {/* Pin */}
                <div className="relative -translate-x-1/2 -translate-y-full">
                  <div className="w-3 h-3 rounded-full bg-[#A8C5B8] border-2 border-white shadow-lg mb-2" />
                  
                  {/* Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-100">
                      <p className="text-xs font-semibold text-gray-900">{location.city}</p>
                      <p className="text-[10px] text-gray-500">{location.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Title */}
          <div className="text-center mt-12">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Global Auditor Network
            </h3>
            <p className="text-gray-600 text-lg">
              2,000+ certified auditors in 120+ countries
            </p>
          </div>
        </motion.div>
      </div>

      {/* Audit Report Mockup */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Comprehensive Audit Report
            </h3>
            <p className="text-gray-600 text-lg">
              Delivered within 24-48 hours with actionable insights
            </p>
          </div>

          {/* Report Mockup */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-5xl mx-auto">
            {/* Report Header */}
            <div className="bg-gray-50 border-b border-gray-100 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Audit Report #A-2847</h4>
                  <p className="text-sm text-gray-500 mt-1">Supplier XYZ Manufacturing Co.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-[#A8C5B8]/10 border-4 border-[#A8C5B8] flex items-center justify-center">
                    <span className="text-xl font-bold text-[#A8C5B8]">85</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Body */}
            <div className="p-8 space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Quality", value: "88%" },
                  { label: "Safety", value: "82%" },
                  { label: "Environment", value: "85%" },
                  { label: "Compliance", value: "84%" },
                ].map((metric, index) => (
                  <div key={metric.label} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Findings List */}
              <div className="space-y-3">
                {[
                  { status: "pass", text: "ISO 9001 certification verified" },
                  { status: "pass", text: "Production capacity meets requirements" },
                  { status: "warning", text: "Minor safety equipment update needed" },
                  { status: "pass", text: "Quality control processes excellent" },
                ].map((finding, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 ${
                      finding.status === 'pass' ? 'bg-[#A8C5B8]' : 'bg-[#A8B8CA]'
                    }`} />
                    <p className="text-sm text-gray-700">{finding.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Footer */}
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Generated: Nov 25, 2025</span>
                <span>Auditor: John Smith (TÜV Certified)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            variant="default"
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/95 rounded-full px-8 py-6 text-base font-semibold shadow-sm border border-gray-200"
          >
            Book Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
