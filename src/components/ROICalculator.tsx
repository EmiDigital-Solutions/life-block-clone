import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
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
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
      >
        <span style={{ color: '#2563EB' }}>ROI</span> Calculation
      </motion.h2>
      
      <p className="text-lg text-gray-600 mb-8">
        Calculate your potential savings with YVOO ScanPro+
      </p>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="audits" className="text-base font-semibold text-gray-900">
            Number of supplier audits per year
          </Label>
          <Input
            id="audits"
            type="number"
            min="1"
            value={auditsPerYear}
            onChange={(e) => setAuditsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
            className="text-lg h-12 border-2 border-gray-300 focus:border-[#2563EB]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="traditional-cost" className="text-base font-semibold text-gray-900">
            Traditional audit cost per audit (€)
          </Label>
          <Input
            id="traditional-cost"
            type="number"
            min="1"
            value={traditionalCostPerAudit}
            onChange={(e) => setTraditionalCostPerAudit(Math.max(1, parseInt(e.target.value) || 1))}
            className="text-lg h-12 border-2 border-gray-300 focus:border-[#2563EB]"
          />
        </div>
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
          className="border-2 rounded-xl p-6 sm:p-8"
          style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', borderColor: 'rgba(20, 184, 166, 0.3)' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
              <DollarSign className="w-8 h-8" style={{ color: '#14B8A6' }} />
              Your Annual Cost Savings
            </div>
            <div className="text-4xl sm:text-5xl font-bold" style={{ color: '#14B8A6' }}>
              {formatCurrency(annualSavings)}
            </div>
          </div>
        </motion.div>
        
        <div className="flex justify-between items-center py-6">
          <div className="text-base sm:text-lg font-semibold text-gray-900">
            Time Savings ({timeSavingsPercent * 100}% of {weeksPerAudit} weeks per audit)
          </div>
          <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#2563EB' }}>
            {timeSavingsInDays} Work Days
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-8">
        <strong>Additional Savings:</strong> No travel costs for internal auditors, 
        reduced rework through standardized reports, faster supplier releases 
        enable shorter time-to-market.
      </p>
    </div>
  );
};

export default ROICalculator;
