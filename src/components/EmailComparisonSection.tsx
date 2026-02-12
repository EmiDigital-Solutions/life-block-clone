import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ArrowRight, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const auditRequestSchema = z.object({
  supplierCompany: z.string().trim().min(1, "Company name is required").max(200),
  supplierCountry: z.string().trim().min(1, "Country is required").max(100),
  industry: z.string().min(1, "Please select an industry"),
  yourName: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  yourCompany: z.string().trim().min(1, "Your company is required").max(200),
});

type AuditRequestForm = z.infer<typeof auditRequestSchema>;

const INDUSTRIES = ["Automotive", "Aerospace", "Pharma", "Chemical", "Electronics", "Medical Devices", "Other"];

const EmailComparisonSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AuditRequestForm>({
    supplierCompany: "", supplierCountry: "", industry: "",
    yourName: "", email: "", yourCompany: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AuditRequestForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAutoSwitching) return;
    const interval = setInterval(() => setIsWithScanPro(prev => !prev), 5000);
    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = auditRequestSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AuditRequestForm, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof AuditRequestForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const updateField = (field: keyof AuditRequestForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // ... keep existing code (withScanProContent, traditionalContent, currentContent)
  const withScanProContent = [
    { title: "€700 flat—budget secured", description: "Finance approves instantly. No surprises." },
    { title: "Auditor on-site in 48h", description: "Your supplier issues don't wait—neither should you." },
    { title: "1-3 day structured audit", description: "Minimal disruption to your team and supplier." },
    { title: "Report in 24h, not weeks", description: "Make decisions while the context is fresh." },
    { title: "Every audit, same standard", description: "AI ensures consistency your QM team can trust." },
    { title: "AI equipment intelligence", description: "Machine conditions documented automatically." },
  ];

  const traditionalContent = [
    { title: "€15K-€25K per audit", description: "Budget fights, travel expenses, hotel costs." },
    { title: "2-3 weeks just to start", description: "Your quality engineer's calendar is full." },
    { title: "3-5 days on-site", description: "Your engineer away from their real work." },
    { title: "Report? Maybe in 10 days", description: "By then, everyone forgot the details." },
    { title: "Quality depends on who's sent", description: "Junior auditor today, expert tomorrow." },
    { title: "Photos? What photos?", description: "Documentation gaps that hurt you later." },
  ];

  const currentContent = isWithScanPro ? withScanProContent : traditionalContent;

  return (
    <section data-nav-theme="light" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isWithScanPro ? 'With' : 'Traditional'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'ScanPro+' : 'Providers'}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsAutoSwitching(false); setIsWithScanPro(!isWithScanPro); }}
              className={`relative w-16 h-8 transition-colors duration-300 ${isWithScanPro ? 'bg-primary' : 'bg-destructive'}`}
              aria-label="Toggle comparison"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-7 h-7 bg-white"
                animate={{ x: isWithScanPro ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <button
              onClick={() => setIsAutoSwitching(!isAutoSwitching)}
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                isAutoSwitching ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={isAutoSwitching ? 'Pause auto-switch' : 'Resume auto-switch'}
            >
              {isAutoSwitching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {isWithScanPro 
            ? "What procurement directors, quality managers, and CFOs see when they switch."
            : "The hidden cost of 'we've always done it this way.'"}
        </p>

        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {currentContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-muted p-8 hover:bg-muted/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-foreground p-12 md:p-16 lg:p-20 text-center"
        >
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6">
                  Experience the €700 Difference
                </h2>
                <div className="mt-8">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-12 py-7 h-auto font-bold"
                    onClick={() => setShowForm(true)}
                  >
                    Claim Your Free Audit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <button
                  onClick={() => {
                    const demoSection = document.getElementById('platform-demo');
                    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-6 block mx-auto text-background/70 hover:text-background text-base underline underline-offset-4 transition-colors"
                >
                  → See how it works first (2min demo)
                </button>
                <p className="mt-4">
                  <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer"
                    className="text-background/40 hover:text-background/60 text-sm transition-colors">
                    Need to discuss first? Book a call
                  </a>
                </p>
                <p className="text-background/50 text-sm mt-8 max-w-lg mx-auto">
                  Limited: First 10 customers get complete supplier audit free + money-back guarantee. 6 spots remaining.
                </p>
              </motion.div>
            ) : !submitted ? (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="max-w-xl mx-auto text-left"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-background">Complete Your Free Audit Request</h3>
                  <button onClick={() => setShowForm(false)} className="text-background/50 hover:text-background transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-background/60 text-sm font-semibold uppercase tracking-wider mb-4">Supplier Details</p>
                    <div className="space-y-4">
                      <div>
                        <input type="text" placeholder="Company name" value={formData.supplierCompany}
                          onChange={e => updateField('supplierCompany', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.supplierCompany && <p className="text-destructive text-sm mt-1">{errors.supplierCompany}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Country" value={formData.supplierCountry}
                          onChange={e => updateField('supplierCountry', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.supplierCountry && <p className="text-destructive text-sm mt-1">{errors.supplierCountry}</p>}
                      </div>
                      <div className="relative">
                        <select value={formData.industry} onChange={e => updateField('industry', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-foreground text-background">Select industry</option>
                          {INDUSTRIES.map(ind => (
                            <option key={ind} value={ind} className="bg-foreground text-background">{ind}</option>
                          ))}
                        </select>
                        {errors.industry && <p className="text-destructive text-sm mt-1">{errors.industry}</p>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-background/60 text-sm font-semibold uppercase tracking-wider mb-4">Your Details</p>
                    <div className="space-y-4">
                      <div>
                        <input type="text" placeholder="Your name" value={formData.yourName}
                          onChange={e => updateField('yourName', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.yourName && <p className="text-destructive text-sm mt-1">{errors.yourName}</p>}
                      </div>
                      <div>
                        <input type="email" placeholder="Email" value={formData.email}
                          onChange={e => updateField('email', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Your company" value={formData.yourCompany}
                          onChange={e => updateField('yourCompany', e.target.value)}
                          className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 text-base focus:outline-none focus:border-primary transition-colors"
                        />
                        {errors.yourCompany && <p className="text-destructive text-sm mt-1">{errors.yourCompany}</p>}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 h-auto font-bold"
                  >
                    Claim My Free Audit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>

                <p className="text-background/40 text-sm mt-6 text-center">
                  We'll assign a certified auditor and email you within 2 hours
                </p>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-background mb-4">You're In!</h3>
                <p className="text-background/70 text-lg max-w-md mx-auto">
                  We're assigning a certified auditor now. Expect an email at <span className="text-primary font-semibold">{formData.email}</span> within 2 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
