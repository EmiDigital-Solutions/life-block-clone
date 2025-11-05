import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Clock, CheckCircle2, TrendingDown, TrendingUp, Target } from "lucide-react";

const GroundIntelligence = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-16 lg:pt-40 lg:pb-24" id="hero">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              On-site supplier evaluations · Global · Standardized
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif mb-6 leading-tight">
              Less risk, faster decisions:{" "}
              <span className="block mt-2">
                Objective supplier audits –{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  guided by AI
                </span>
                .
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Book, verify, decide: Local experts run audits using a unified framework. 
              You get clear scores, photos & evidence — comparable across countries and plants.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button size="lg" onClick={() => scrollToSection('cta')}>
                Grab a 15-min demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('how')}>
                See how it works
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-primary"></span> 25+ countries
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-primary"></span> 120+ audits
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-primary"></span> 4.8/5 rating
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Psychology: fast comprehension = lower bounce
            </p>
            <h3 className="text-xl font-semibold mb-4">What's instantly clear:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mt-2"></span>
                <span>Crisp, value-focused headline</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mt-2"></span>
                <span>1 primary + 1 secondary CTA</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mt-2"></span>
                <span>Social proof above the fold</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-6 py-12" id="social">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {['Logo A', 'Logo B', 'Logo C', 'Logo D', 'Logo E', 'Logo F'].map((logo, index) => (
            <div
              key={index}
              className="h-20 rounded-xl bg-muted/30 border border-border flex items-center justify-center text-sm text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Pain Section */}
      <section className="container mx-auto px-6 py-24" id="pain">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif mb-4">The reality in procurement</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Subjective audits, scattered evidence, little comparability — and decisions that stall.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "Slow & costly", description: "Audits take weeks; travel and coordination burn budgets." },
            { icon: Target, title: "Subjective", description: "Every auditor rates differently — results don't scale." },
            { icon: Award, title: "Blind spots", description: "Missing evidence, weak traceability during escalations." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-6 py-24 bg-muted/30" id="solution">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              ScanPro+ – AI-guided on-site audits
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">
              Standardized quality — everywhere.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Network of certified experts + AI guidance for objective, verifiable results. 
              One report, clear scores, solid evidence.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Unified checklists and weightings (1–5 score)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Photo/video evidence & documents linked in-line</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Regional risks & compliance hints integrated</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollToSection('cases')}>
                View sample report
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('how')}>
                Process
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Psychology: trigger the A-ha
            </p>
            <h4 className="text-xl font-semibold mb-4">Understand in 3 lines</h4>
            <p className="text-muted-foreground leading-relaxed">
              <strong>What?</strong> Standardized audits.<br />
              <strong>How?</strong> Local experts + AI guidance.<br />
              <strong>Outcome?</strong> Faster, safer decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-6 py-24" id="how">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif mb-4">How it works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A clear flow reduces cognitive load and builds trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Request", description: "Define site & scope. We match the right auditor." },
            { step: "2", title: "On-site audit", description: "Guided checklist, evidence photos, objective scores — same standard worldwide." },
            { step: "3", title: "Report & decision", description: "Comparable results, highlighted risks, clear next steps." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-card border border-border"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                {item.step}
              </div>
              <h4 className="text-xl font-semibold mb-3 mt-2">{item.title}</h4>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-24 bg-muted/30" id="story">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">
              Why we're building this
            </h2>
            <blockquote className="text-xl text-foreground mb-6 leading-relaxed">
              "After 25 years in procurement one thing is clear: decisions rarely fail due to 
              a lack of data — but because of data quality. We deliver solid evidence — fast, 
              comparable, scalable."
            </blockquote>
            <p className="text-muted-foreground">
              Team of procurement leads, quality engineers, and AI specialists.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Psychology: story ≠ PR
            </p>
            <p className="text-muted-foreground">
              Short, credible, no buzzwords. Place a founder photo/portrait here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-6 py-24" id="cases">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif mb-4">Results from the field</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Concrete numbers lower perceived risk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { metric: "-72%", label: "Audit cycle time", description: "From 21 days to 6 days in a global sourcing program.", icon: TrendingDown },
            { metric: "+38%", label: "Supplier hit rate", description: "Better selection driven by objective scores & evidence.", icon: TrendingUp },
            { metric: "99%", label: "Report acceptance", description: "Audits recognized as evidence in escalations.", icon: CheckCircle2 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  {item.metric}
                </div>
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {item.label}
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-24 bg-muted/30" id="pricing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif mb-4">Pricing & plans</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparency builds trust. Enterprise frameworks available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tag: null,
              label: "Single audit",
              title: "Pay-per-audit",
              description: "Ideal for ad-hoc checks",
              features: [
                "Fixed price per site",
                "Standard report within 5 business days",
                "Optional add-ons"
              ],
              cta: "Request"
            },
            {
              tag: "Recommended",
              label: "Program",
              title: "Multi-site package",
              description: "For sourcing waves & qualification",
              features: [
                "Volume discounts",
                "Dedicated program lead",
                "SLA: prioritized slots"
              ],
              cta: "Start program",
              highlight: true
            },
            {
              tag: null,
              label: "Enterprise",
              title: "Framework agreement",
              description: "Integrated into your processes & tools",
              features: [
                "Custom checklists & integrations",
                "Governance & compliance alignment",
                "Account team & report templates"
              ],
              cta: "Talk to us"
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl bg-card border transition-all ${
                plan.highlight ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  {plan.tag}
                </div>
              )}
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {plan.label}
              </div>
              <h4 className="text-2xl font-semibold mb-2">{plan.title}</h4>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mt-2"></span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => scrollToSection('cta')}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-24 text-center" id="cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-serif mb-6">
            Ready for evidence-driven supplier decisions?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Short demo. Clear answers. Zero risk.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg">Book demo</Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('cases')}>
              See sample report
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default GroundIntelligence;