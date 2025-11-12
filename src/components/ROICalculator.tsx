import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, ChevronRight, Zap, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ROICalculator = () => {
  const [auditsPerYear, setAuditsPerYear] = useState(20);
  const [traditionalCostPerAudit, setTraditionalCostPerAudit] = useState(20000);
  
  const scanProCostPerAudit = 700;
  const weeksPerAudit = 2;
  const workDaysPerWeek = 5;
  const timeSavingsPercent = 0.7;

  // Calculations
  const traditionalTotalCost = auditsPerYear * traditionalCostPerAudit;
  const scanProTotalCost = auditsPerYear * scanProCostPerAudit;
  const annualSavings = traditionalTotalCost - scanProTotalCost;
  const timeSavingsInDays = Math.round(
    auditsPerYear * weeksPerAudit * workDaysPerWeek * timeSavingsPercent
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Calculate Your <span style={{ color: '#14B8A6' }}>Business Case</span>
          </motion.h2>
        </div>
      </div>

      {/* Input Fields with Visual Cues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#14B8A6]/5 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-[#14B8A6]/30 relative"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="audits" className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ChevronRight className="w-5 h-5" style={{ color: '#14B8A6' }} />
              Step 1: Your audits per year
            </Label>
            <Input
              id="audits"
              type="number"
              min="1"
              value={auditsPerYear}
              onChange={(e) => setAuditsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
              placeholder="e.g., 20"
              className="text-lg h-14 border-2 border-gray-300 bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="traditional-cost" className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ChevronRight className="w-5 h-5" style={{ color: '#14B8A6' }} />
              Step 2: Your current cost per audit (€)
            </Label>
            <Input
              id="traditional-cost"
              type="number"
              min="1"
              value={traditionalCostPerAudit}
              onChange={(e) => setTraditionalCostPerAudit(Math.max(1, parseInt(e.target.value) || 1))}
              placeholder="e.g., 20000"
              className="text-lg h-14 border-2 border-gray-300 bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Results Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#14B8A6] to-blue-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-xl"
        >
          <Zap className="w-5 h-5" />
          Your Results Update Instantly
          <Zap className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-between items-center py-6 border-b-2 border-gray-200">
          <div className="text-base sm:text-lg font-semibold text-gray-900">
            Traditional Audit Costs ({auditsPerYear} × {formatCurrency(traditionalCostPerAudit)})
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(traditionalTotalCost)}
          </div>
        </div>
        
        <div className="flex justify-between items-center py-6 border-b-2 border-gray-200">
          <div className="text-base sm:text-lg font-semibold text-gray-900">
            YVOO ScanPro+ Costs ({auditsPerYear} × {formatCurrency(scanProCostPerAudit)})
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatCurrency(scanProTotalCost)}
          </div>
        </div>
        
        <motion.div
          key={annualSavings}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="border-2 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5"
          style={{ borderColor: '#14B8A6' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              Your Annual Cost Savings
            </div>
            <div className="text-4xl sm:text-5xl font-bold" style={{ color: '#14B8A6' }}>
              {formatCurrency(annualSavings)}
            </div>
          </div>
        </motion.div>
        
        <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <div className="flex justify-between items-center">
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              Time Savings ({timeSavingsPercent * 100}% of {weeksPerAudit} weeks per audit)
            </div>
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#2563EB' }}>
              {timeSavingsInDays} Work Days
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-700 text-sm flex items-start gap-2">
          <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#14B8A6' }} />
          <span>
            <strong className="text-gray-900">Additional Benefits:</strong> No travel costs for internal auditors, 
            reduced rework through standardized reports, faster supplier releases 
            enable shorter time-to-market, and improved supplier relationship management.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
