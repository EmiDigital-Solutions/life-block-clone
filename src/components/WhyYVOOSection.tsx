import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WhyYVOOSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const painPoints = [
    {
      arrow: "→",
      title: "50+ emails before anyone steps on a factory floor.",
      description: "Coordinating schedules, aligning departments, chasing supplier contacts—weeks of chaos before the audit even begins."
    },
    {
      arrow: "→",
      title: "10 weeks from request to report.",
      description: "By the time you get results, the defective parts already shipped. The damage is done."
    },
    {
      arrow: "→",
      title: "€15K–€25K burned on every single audit.",
      description: "Flights, hotels, per diems, overtime—leadership sees auditing as a money pit, not a strategic function."
    }
  ];

  const transformations = [
    {
      arrow: "→",
      title: "They move faster so they qualify more.",
      description: "Speeding up audits from weeks to days frees capacity for more supplier assessments and faster time-to-market."
    },
    {
      arrow: "→",
      title: "They increase transparency so they reduce risk.",
      description: "Real-time tracking and standardized reports reveal supplier quality before problems reach production."
    },
    {
      arrow: "→",
      title: "They cut costs so they invest in growth.",
      description: "60% lower audit costs mean budget for supplier development, not travel expenses."
    }
  ];

  const stats = [
    { category: "Move faster", value: "72%", description: "Faster audit lead times" },
    { category: "Save costs", value: "60%", description: "Lower audit costs with local auditors" },
    { category: "Scale globally", value: "12K+", description: "Certified auditors in 50+ countries" }
  ];

  const pillars = [
    {
      number: "1",
      title: "One platform for every audit.",
      description: "YVOO brings together what used to be separate. Run complex VDA 6.3 process audits and quick supplier assessments all in the same place."
    },
    {
      number: "2",
      title: "AI that ensures consistency.",
      description: "Our AI-powered workflows guide every auditor through standardized assessments. Same questions, same scoring, same report format—regardless of location."
    },
    {
      number: "3",
      title: "Reports your team can trust.",
      description: "Digital reports delivered within 24 hours with findings, photos, risk scores, and corrective actions—ready to import into your QMS."
    }
  ];

  return (
    <>
      {/* Homepage Section - Provocative Hook */}
      <section className="py-24 md:py-32 bg-white">
         <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="section-headline text-foreground mb-6">
              We didn't improve audits. We replaced them.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              While SGS sends one auditor with a clipboard, YVOO deploys AI that analyzes equipment, processes, and compliance simultaneously.
            </p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="lg"
              className="group"
            >
              Tell me more
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Full-Screen Modal - Archlet "Why" Style */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 overflow-y-auto bg-white border-none">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="fixed top-6 right-6 z-50 w-12 h-12 bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Section */}
          <div className="min-h-[60vh] flex items-center bg-secondary/10">
            <div className="container mx-auto px-6 max-w-7xl py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-4xl mb-8">
                  We didn't improve audits.<br />We replaced them.
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  While SGS sends one auditor with a clipboard, YVOO deploys AI that analyzes equipment, processes, and compliance simultaneously.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Problem Section */}
          <div className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-headline text-foreground mb-6">
                  The nightmare everyone accepts
                </h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                  Billions in supplier spend are still audited with clipboards, Excel, and crossed fingers. Everyone feels the pain—nobody questions the process.
                </p>

                <div className="space-y-8 mb-16">
                  {painPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="max-w-2xl"
                    >
                      <p className="text-lg font-semibold text-foreground mb-2">
                        <span className="text-primary mr-2">{point.arrow}</span>
                        {point.title}
                      </p>
                      <p className="text-muted-foreground pl-6">
                        {point.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Authority Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-primary pl-6 py-4 max-w-2xl"
                >
                  <p className="text-lg text-foreground italic mb-3">
                    "Companies with mature supplier quality management have 30% fewer quality incidents and 20% lower warranty costs."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — McKinsey & Company (2024)
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Solution Section */}
          <div className="py-24 bg-secondary/5">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-headline text-foreground mb-6">
                  Leaders who refuse the nightmare
                </h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                  Visionary procurement leaders replaced the chaos with a click. Local auditors, AI-powered workflows, results in days—not months.
                </p>

                <div className="space-y-8">
                  {transformations.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="max-w-2xl"
                    >
                      <p className="text-lg font-semibold text-foreground mb-2">
                        <span className="text-primary mr-2">{item.arrow}</span>
                        {item.title}
                      </p>
                      <p className="text-muted-foreground pl-6">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-headline text-foreground mb-16"
              >
                Trusted by industry leaders
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-x-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="pb-12"
                  >
                    <p className="text-sm text-foreground/50 font-mono tracking-wide mb-2">
                      {stat.category}
                    </p>
                    <div className="border-t border-foreground/20 pt-4">
                      <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-[-0.02em]">
                        {stat.value}
                      </p>
                      <p className="text-foreground/60 leading-relaxed text-sm">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Pillars Section */}
          <div className="py-24 bg-secondary/5">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-headline text-foreground mb-6"
              >
                YVOO transforms your audit experience
              </motion.h2>
              <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
                At YVOO, we help the world's biggest procurement teams accelerate supplier qualification. From complex process audits to quick assessments.
              </p>

              <div className="space-y-12">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="max-w-2xl"
                  >
                    <p className="text-lg text-foreground mb-2">
                      <span className="font-bold text-primary">{pillar.number}</span>
                      <span className="font-bold ml-2">{pillar.title}</span>
                    </p>
                    <p className="text-muted-foreground pl-4">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <h2 className="section-headline text-foreground mb-6">
                  It's time to rewrite the story
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  YVOO helps visionary leaders elevate supplier quality beyond admin. To send a clear message that audits can be rapid, consistent, and strategic. See it in action.
                </p>
                <Button asChild size="lg">
                  <a
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhyYVOOSection;
