import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auditTypes, regions, categories, travelCosts, RegionKey, getAuditsByCategory } from "@/data/auditPricingData";

const HeroROICalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Most Common Audits");
  const [selectedAuditId, setSelectedAuditId] = useState<string>("202"); // ISO 9001
  const [clientRegion, setClientRegion] = useState<RegionKey>("dach");
  const [supplierRegion, setSupplierRegion] = useState<RegionKey>("china");
  const [auditsPerYear, setAuditsPerYear] = useState<string>("10");

  // Filter audits by category (handles "Most Common Audits" special case)
  const filteredAudits = useMemo(() => {
    return getAuditsByCategory(selectedCategory);
  }, [selectedCategory]);

  // Get selected audit
  const selectedAudit = useMemo(() => {
    return auditTypes.find(a => a.id === parseInt(selectedAuditId));
  }, [selectedAuditId]);

  // Calculations
  const auditsNum = parseInt(auditsPerYear) || 0;
  
  // Traditional cost = base audit cost + travel cost (client travels to supplier)
  const traditionalBaseCost = selectedAudit?.traditionalEur || 0;
  const travelCost = travelCosts[clientRegion]?.[supplierRegion] || 0;
  const auditorCount = selectedAudit?.auditors || 1;
  const traditionalCostPerAudit = traditionalBaseCost + (travelCost * auditorCount);
  
  // YVOO cost = local auditor, no travel needed
  const yvooCostPerAudit = selectedAudit?.pricing[supplierRegion] || 0;
  
  const traditionalTotalCost = auditsNum * traditionalCostPerAudit;
  const yvooTotalCost = auditsNum * yvooCostPerAudit;
  const annualSavings = traditionalTotalCost - yvooTotalCost;
  const savingsPercent = traditionalTotalCost > 0 
    ? Math.round((annualSavings / traditionalTotalCost) * 100) 
    : 0;

  // Time savings calculation (travel time + scheduling efficiency)
  const getTimeSavingsDays = () => {
    if (!selectedAudit) return 0;
    const avgAuditDays = (selectedAudit.minDays + selectedAudit.maxDays) / 2;
    
    // Travel days based on distance (intercontinental = more travel time)
    const isIntercontinental = 
      (['dach', 'wEu', 'eEu'].includes(clientRegion) && ['china', 'india', 'sea', 'usa', 'latam'].includes(supplierRegion)) ||
      (['china', 'india', 'sea'].includes(clientRegion) && ['dach', 'wEu', 'eEu', 'usa', 'latam'].includes(supplierRegion)) ||
      (['usa', 'latam'].includes(clientRegion) && ['china', 'india', 'sea', 'dach', 'wEu', 'eEu'].includes(supplierRegion));
    
    const travelDays = isIntercontinental ? 3 : (clientRegion === supplierRegion ? 0 : 1);
    const schedulingDays = 2; // YVOO's efficient scheduling saves ~2 days per audit
    
    const timeSavedPerAudit = travelDays + schedulingDays;
    return Math.round(auditsNum * timeSavedPerAudit);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle category change - reset audit selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const auditsInCategory = getAuditsByCategory(category);
    if (auditsInCategory.length > 0) {
      setSelectedAuditId(String(auditsInCategory[0].id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white rounded-3xl p-5 lg:p-6 shadow-2xl max-w-md"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
          <span className="text-primary">ROI</span> Calculator
        </h3>
      </div>

      {/* Selection Fields */}
      <div className="space-y-3 mb-4">
        {/* Category Selection */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-gray-900">Industry</Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 text-sm">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-sm">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audit Type Selection */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-gray-900">Audit Standard</Label>
          <Select value={selectedAuditId} onValueChange={setSelectedAuditId}>
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 text-sm">
              <SelectValue placeholder="Select audit type" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {filteredAudits.map((audit) => (
                <SelectItem key={audit.id} value={String(audit.id)} className="text-sm">
                  {audit.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Client Region Selection */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-gray-900">Your Location</Label>
          <Select value={clientRegion} onValueChange={(v) => setClientRegion(v as RegionKey)}>
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 text-sm">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.key} value={region.key} className="text-sm">
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Supplier Region Selection */}
        <div className="space-y-1.5">
          <Label className="text-xs font-bold text-gray-900">Supplier Region</Label>
          <Select value={supplierRegion} onValueChange={(v) => setSupplierRegion(v as RegionKey)}>
            <SelectTrigger className="h-9 bg-gray-50 border-gray-300 text-sm">
              <SelectValue placeholder="Select supplier region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.key} value={region.key} className="text-sm">
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Audits Per Year */}
        <div className="space-y-1.5">
          <Label htmlFor="hero-audits" className="text-xs font-bold text-gray-900">
            Audits per year
          </Label>
          <Input
            id="hero-audits"
            type="number"
            min="1"
            value={auditsPerYear}
            onChange={(e) => setAuditsPerYear(e.target.value)}
            placeholder="e.g., 10"
            className="h-9 bg-gray-50 border-gray-300 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3 mt-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div>
            <span className="text-xs text-gray-600">Traditional</span>
            <span className="text-[10px] text-gray-400 block">incl. travel</span>
          </div>
          <span className="text-base font-bold text-gray-900">{formatCurrency(traditionalTotalCost)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div>
            <span className="text-xs text-gray-600">YVOO</span>
            <span className="text-[10px] text-gray-400 block">local auditors</span>
          </div>
          <span className="text-base font-bold text-gray-900">{formatCurrency(yvooTotalCost)}</span>
        </div>
        
        <motion.div
          key={annualSavings}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl p-3 bg-primary border-2 border-primary/80"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-white" />
              <span className="text-xs font-semibold text-white">You Save ({savingsPercent}%)</span>
            </div>
            <div className="text-xl lg:text-2xl font-bold text-white">
              {formatCurrency(annualSavings)}
            </div>
          </div>
        </motion.div>
        
        <div className="rounded-xl p-3 bg-secondary border-2 border-secondary/80">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">Time Saved</span>
            </div>
            <span className="text-base font-bold text-white">
              {getTimeSavingsDays()} Days
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroROICalculator;
