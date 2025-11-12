import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeroROICalculator = () => {
  const [auditsPerYear, setAuditsPerYear] = useState<string>("20");
  const [traditionalCostPerAudit, setTraditionalCostPerAudit] = useState<string>("20000");
  const [displayAudits, setDisplayAudits] = useState<string>("20");
  const [displayCost, setDisplayCost] = useState<string>("20000");
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);
  
  useEffect(() => {
    const startTypingAnimation = () => {
      setIsTypingAnimation(true);
      
      // Clear values first
      setDisplayAudits("");
      setDisplayCost("");
      
      // Type "20" for audits (character by character)
      setTimeout(() => setDisplayAudits("2"), 3200);
      setTimeout(() => setDisplayAudits("20"), 3400);
      
      // Type "20000" for cost (character by character)
      setTimeout(() => setDisplayCost("2"), 4000);
      setTimeout(() => setDisplayCost("20"), 4200);
      setTimeout(() => setDisplayCost("200"), 4400);
      setTimeout(() => setDisplayCost("2000"), 4600);
      setTimeout(() => setDisplayCost("20000"), 4800);
      
      // End animation
      setTimeout(() => {
        setIsTypingAnimation(false);
        setAuditsPerYear("20");
        setTraditionalCostPerAudit("20000");
      }, 5500);
    };
    
    const timer = setTimeout(startTypingAnimation, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scanProCostPerAudit = 700;
  const weeksPerAudit = 2;
  const workDaysPerWeek = 5;
  const timeSavingsPercent = 0.7;

  // Calculations
  const auditsNum = parseInt(isTypingAnimation ? displayAudits : auditsPerYear) || 0;
  const traditionalCostNum = parseInt(isTypingAnimation ? displayCost : traditionalCostPerAudit) || 0;
  
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
      className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xl"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
          <span style={{ color: '#14B8A6' }}>ROI</span> Calculator
        </h3>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2 relative">
          <Label htmlFor="hero-audits" className="text-sm font-bold text-gray-900">
            Step 1: Enter your audits per year
          </Label>
          <div className="relative">
            <Input
              id="hero-audits"
              type="number"
              min="1"
              value={isTypingAnimation ? displayAudits : auditsPerYear}
              onChange={(e) => {
                setAuditsPerYear(e.target.value);
                setDisplayAudits(e.target.value);
              }}
              placeholder="e.g., 20"
              disabled={isTypingAnimation}
              className={`h-11 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isTypingAnimation ? 'cursor-wait' : 'cursor-text'
              }`}
            />
            {isTypingAnimation && displayAudits && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#14B8A6]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="hero-traditional-cost" className="text-sm font-bold text-gray-900">
            Step 2: Enter your current audit cost (€)
          </Label>
          <div className="relative">
            <Input
              id="hero-traditional-cost"
              type="number"
              min="1"
              value={isTypingAnimation ? displayCost : traditionalCostPerAudit}
              onChange={(e) => {
                setTraditionalCostPerAudit(e.target.value);
                setDisplayCost(e.target.value);
              }}
              placeholder="e.g., 20000"
              disabled={isTypingAnimation}
              className={`h-11 bg-gray-50 border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isTypingAnimation ? 'cursor-wait' : 'cursor-text'
              }`}
            />
            {isTypingAnimation && displayCost && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#14B8A6]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 mt-6">
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
