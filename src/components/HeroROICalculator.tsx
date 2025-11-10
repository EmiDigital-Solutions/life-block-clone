import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeroROICalculator = () => {
  const [auditsPerYear, setAuditsPerYear] = useState<string>("20");
  const [traditionalCostPerAudit, setTraditionalCostPerAudit] = useState<string>("20000");
  
  const scanProCostPerAudit = 700;
  const weeksPerAudit = 2;
  const workDaysPerWeek = 5;
  const timeSavingsPercent = 0.7;

  // Calculations
  const auditsNum = parseInt(auditsPerYear) || 0;
  const traditionalCostNum = parseInt(traditionalCostPerAudit) || 0;
  
  const traditionalTotalCost = auditsNum * traditionalCostNum;
  const scanProTotalCost = auditsNum * scanProCostPerAudit;
  const annualSavings = traditionalTotalCost - scanProTotalCost;
  const timeSavingsInDays = Math.round(
    auditsNum * weeksPerAudit * workDaysPerWeek * timeSavingsPercent
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl"
    >
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        <span style={{ color: '#14B8A6' }}>ROI</span> Calculator
      </h3>
      
      <p className="text-sm text-gray-600 mb-6">
        Calculate your savings
      </p>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="hero-audits" className="text-sm font-semibold text-gray-900">
            Audits per year
          </Label>
          <Input
            id="hero-audits"
            type="number"
            min="1"
            value={auditsPerYear}
            onChange={(e) => setAuditsPerYear(e.target.value)}
            placeholder="Enter number of audits (e.g., 20)"
            className="h-11 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-[#14B8A6] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero-traditional-cost" className="text-sm font-semibold text-gray-900">
            Traditional cost (€)
          </Label>
          <Input
            id="hero-traditional-cost"
            type="number"
            min="1"
            value={traditionalCostPerAudit}
            onChange={(e) => setTraditionalCostPerAudit(e.target.value)}
            placeholder="Enter cost in € (e.g., 20000)"
            className="h-11 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-[#14B8A6] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">Traditional</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(traditionalTotalCost)}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="text-sm text-gray-600">ScanPro+</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(scanProTotalCost)}</span>
        </div>
        
        <motion.div
          key={annualSavings}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl p-4"
          style={{ backgroundColor: '#14B8A6', border: '2px solid #10a897' }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-white" />
              <span className="text-sm font-semibold text-white">You Save</span>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white">
              {formatCurrency(annualSavings)}
            </div>
          </div>
        </motion.div>
        
        <div className="rounded-xl p-4" style={{ backgroundColor: '#2563EB', border: '2px solid #1d4ed8' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-white">Time Saved</span>
            <span className="text-lg font-bold text-white">
              {timeSavingsInDays} Days
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroROICalculator;
