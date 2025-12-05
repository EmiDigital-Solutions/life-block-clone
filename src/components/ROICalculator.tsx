import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Clock, MapPin, FileCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { auditTypes, regions, categories, type AuditType } from "@/data/auditPricingData";

const ROICalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Universal");
  const [selectedAuditId, setSelectedAuditId] = useState<string>("214"); // ISO 9001 default
  const [selectedRegion, setSelectedRegion] = useState<string>("dach");
  const [auditsPerYear, setAuditsPerYear] = useState(10);

  // Get filtered audits by category
  const filteredAudits = useMemo(() => 
    auditTypes.filter(a => a.category === selectedCategory),
    [selectedCategory]
  );

  // Get selected audit details
  const selectedAudit = useMemo(() => 
    auditTypes.find(a => a.id.toString() === selectedAuditId),
    [selectedAuditId]
  );

  // Get selected region details
  const selectedRegionData = useMemo(() => 
    regions.find(r => r.id === selectedRegion),
    [selectedRegion]
  );

  // Calculations
  const traditionalCost = selectedAudit?.traditionalEur || 0;
  const yvooCost = selectedAudit?.pricing[selectedRegion as keyof typeof selectedAudit.pricing] || 0;
  const savingsPerAudit = traditionalCost - yvooCost;
  const savingsPercent = selectedAudit?.savingsPercent || 0;
  
  const totalTraditionalCost = traditionalCost * auditsPerYear;
  const totalYvooCost = yvooCost * auditsPerYear;
  const totalAnnualSavings = savingsPerAudit * auditsPerYear;

  // Time savings calculation (based on complexity)
  const getTimeSavings = () => {
    if (!selectedAudit) return { weeks: 0, days: 0 };
    const avgDays = (selectedAudit.minDays + selectedAudit.maxDays) / 2;
    const timeSavingsPercent = 0.6; // 60% time savings
    const savedDays = Math.round(avgDays * timeSavingsPercent * auditsPerYear);
    return { weeks: Math.floor(savedDays / 5), days: savedDays };
  };

  const timeSavings = getTimeSavings();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const firstAudit = auditTypes.find(a => a.category === category);
    if (firstAudit) {
      setSelectedAuditId(firstAudit.id.toString());
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
      >
        Calculate Your <span className="text-primary">Business Case</span>
      </motion.h2>
      <p className="text-gray-600">Select your audit type and region to see your potential savings</p>
    </div>

    {/* Selection Controls */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-4 sm:p-6 mb-8 border border-primary/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary" />
              Category
            </Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-12 border-gray-300 bg-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Audit Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary" />
              Audit Standard
            </Label>
            <Select value={selectedAuditId} onValueChange={setSelectedAuditId}>
              <SelectTrigger className="h-12 border-gray-300 bg-white">
                <SelectValue placeholder="Select audit type" />
              </SelectTrigger>
              <SelectContent>
                {filteredAudits.map((audit) => (
                  <SelectItem key={audit.id} value={audit.id.toString()}>
                    {audit.code} - {audit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Supplier Region
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="h-12 border-gray-300 bg-white">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Audits Per Year */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Audits per Year
            </Label>
            <Input
              type="number"
              min="1"
              max="500"
              value={auditsPerYear}
              onChange={(e) => setAuditsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
              className="h-12 border-gray-300 bg-white text-center text-lg font-semibold"
            />
          </div>
        </div>
      </motion.div>

      {/* Audit Info Badge */}
      {selectedAudit && (
        <motion.div
          key={selectedAuditId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {selectedAudit.complexity} Complexity
          </span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {selectedAudit.minDays}-{selectedAudit.maxDays} Days
          </span>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {selectedAudit.auditors} Auditor{selectedAudit.auditors > 1 ? 's' : ''}
          </span>
        </motion.div>
      )}

      {/* Cost Comparison */}
      <div className="space-y-4 mb-6">
        {/* Traditional Cost */}
        <motion.div
          key={`trad-${selectedAuditId}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-xl border border-gray-200"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">Traditional Audit Cost</p>
            <p className="text-gray-700 font-medium">{auditsPerYear} × {formatCurrency(traditionalCost)}</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 sm:mt-0">
            {formatCurrency(totalTraditionalCost)}
          </div>
        </motion.div>

        {/* YVOO Cost */}
        <motion.div
          key={`yvoo-${selectedAuditId}-${selectedRegion}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-secondary/10 rounded-xl border border-secondary/30"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">YVOO ScanPro+ ({selectedRegionData?.label})</p>
            <p className="text-gray-700 font-medium">{auditsPerYear} × {formatCurrency(yvooCost)}</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-secondary mt-2 sm:mt-0">
            {formatCurrency(totalYvooCost)}
          </div>
        </motion.div>
      </div>

      {/* Annual Savings Highlight */}
      <motion.div
        key={`savings-${totalAnnualSavings}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-primary to-primary/80 text-white mb-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Your Annual Cost Savings</p>
              <p className="text-white/60 text-xs mt-0.5">Based on {auditsPerYear} audits per year</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl sm:text-5xl font-bold">
              {formatCurrency(totalAnnualSavings)}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <TrendingDown className="w-4 h-4 text-green-300" />
              <span className="text-green-300 font-semibold">{savingsPercent}% savings</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Time Savings */}
      <div className="rounded-xl p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-gray-700 font-medium">Estimated Time Savings</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-primary">
            {timeSavings.days} Work Days <span className="text-base font-normal text-gray-500">({timeSavings.weeks} weeks)</span>
          </div>
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-600 text-sm">
          <strong className="text-gray-800">Additional Benefits:</strong> No travel costs, 
          standardized digital reports within 24h, local certified auditors, 
          faster supplier qualification, and improved audit consistency.
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
