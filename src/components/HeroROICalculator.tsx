import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeroROICalculator = () => {
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
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-white/20 shadow-2xl"
    >
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
        <span style={{ color: '#14B8A6' }}>ROI</span> Calculator
      </h3>
      
      <p className="text-sm text-white/70 mb-6">
        Calculate your savings
      </p>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="hero-audits" className="text-sm font-semibold text-white">
            Audits per year
          </Label>
          <Input
            id="hero-audits"
            type="number"
            min="1"
            value={auditsPerYear}
            onChange={(e) => setAuditsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 focus:border-[#14B8A6]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero-traditional-cost" className="text-sm font-semibold text-white">
            Traditional cost (€)
          </Label>
          <Input
            id="hero-traditional-cost"
            type="number"
            min="1"
            value={traditionalCostPerAudit}
            onChange={(e) => setTraditionalCostPerAudit(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-11 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 focus:border-[#14B8A6]"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-white/20">
          <span className="text-sm text-white/80">Traditional</span>
          <span className="text-lg font-bold text-white">{formatCurrency(traditionalTotalCost)}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-white/20">
          <span className="text-sm text-white/80">ScanPro+</span>
          <span className="text-lg font-bold text-white">{formatCurrency(scanProTotalCost)}</span>
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
