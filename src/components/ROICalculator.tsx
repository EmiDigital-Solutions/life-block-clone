import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Clock, MapPin, FileCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { auditTypes, regions, categories, getAuditsByCategory, getMostCommonAudits, type AuditType } from "@/data/auditPricingData";

const ROICalculator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Most Common Audits");
  const [selectedAuditId, setSelectedAuditId] = useState<string>(""); // Will be set by first audit
  const [selectedRegion, setSelectedRegion] = useState<string>("dach");
  const [auditsPerYear, setAuditsPerYear] = useState(10);

  // Get filtered audits by category using the proper function
  const filteredAudits = useMemo(() => 
    getAuditsByCategory(selectedCategory),
    [selectedCategory]
  );
  
  // Set default audit when category changes or on mount
  useMemo(() => {
    if (filteredAudits.length > 0 && !selectedAuditId) {
      setSelectedAuditId(filteredAudits[0].id.toString());
    }
  }, [filteredAudits, selectedAuditId]);

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
  const savingsPercent = traditionalCost > 0 ? Math.round((savingsPerAudit / traditionalCost) * 100) : 0;
  
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
    <div className="bg-[#ebebeb] p-6 sm:p-8 md:p-12">
      {/* Header */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-semibold text-foreground mb-2"
        >
          Calculate Your <span className="text-muted-foreground font-normal">Business Case</span>
        </motion.h3>
        <p className="text-muted-foreground">Select your audit type and region to see your potential savings</p>
      </div>

      {/* Selection Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-[#e3e3e3] rounded-lg p-4 sm:p-6 mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-muted-foreground" />
              Category
            </Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-12 border-0 bg-white rounded-lg">
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
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-muted-foreground" />
              Audit Standard
            </Label>
            <Select value={selectedAuditId} onValueChange={setSelectedAuditId}>
              <SelectTrigger className="h-12 border-0 bg-white rounded-lg">
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
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Supplier Region
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="h-12 border-0 bg-white rounded-lg">
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
            <Label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Audits per Year
            </Label>
            <Input
              type="number"
              min="1"
              max="500"
              value={auditsPerYear}
              onChange={(e) => setAuditsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
              className="h-12 border-0 bg-white rounded-lg text-center text-lg font-semibold"
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
          <span className="px-3 py-1.5 bg-foreground/10 text-foreground rounded-lg text-sm font-medium">
            {selectedAudit.complexity} Complexity
          </span>
          <span className="px-3 py-1.5 bg-foreground/5 text-muted-foreground rounded-lg text-sm font-medium">
            {selectedAudit.minDays}-{selectedAudit.maxDays} Days
          </span>
          <span className="px-3 py-1.5 bg-foreground/5 text-muted-foreground rounded-lg text-sm font-medium">
            {selectedAudit.auditors} Auditor{selectedAudit.auditors > 1 ? 's' : ''}
          </span>
        </motion.div>
      )}

      {/* Cost Comparison */}
      <div className="space-y-3 mb-6">
        {/* Traditional Cost */}
        <motion.div
          key={`trad-${selectedAuditId}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-white rounded-lg"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">Traditional Audit Cost</p>
            <p className="text-foreground font-medium">{auditsPerYear} × {formatCurrency(traditionalCost)}</p>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-foreground mt-2 sm:mt-0">
            {formatCurrency(totalTraditionalCost)}
          </div>
        </motion.div>

        {/* YVOO Cost */}
        <motion.div
          key={`yvoo-${selectedAuditId}-${selectedRegion}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 bg-white rounded-lg"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">YVOO ScanPro+ ({selectedRegionData?.label})</p>
            <p className="text-foreground font-medium">{auditsPerYear} × {formatCurrency(yvooCost)}</p>
          </div>
          <div className="text-2xl sm:text-3xl font-semibold text-primary mt-2 sm:mt-0">
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
        className="rounded-lg p-6 sm:p-8 bg-[#1a1a1a] text-white mb-6"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">You Save Annually</p>
              <p className="text-white/50 text-xs mt-0.5">Based on {auditsPerYear} audits per year</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl sm:text-5xl font-semibold text-accent">
              −{formatCurrency(totalAnnualSavings)}
            </div>
            <div className="flex items-center justify-end gap-2 mt-1">
              <TrendingDown className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">{savingsPercent}% savings</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Time Savings */}
      <div className="rounded-lg p-5 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground font-medium">Estimated Time Savings</span>
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-foreground">
            {timeSavings.days} Work Days <span className="text-base font-normal text-muted-foreground">({timeSavings.weeks} weeks)</span>
          </div>
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="mt-5 p-5 bg-white rounded-lg">
        <p className="text-muted-foreground text-sm">
          <strong className="text-foreground">Additional Benefits:</strong> No travel costs, 
          standardized digital reports within 24h, local certified auditors, 
          faster supplier qualification, and improved audit consistency.
        </p>
      </div>
    </div>
  );
};

export default ROICalculator;
