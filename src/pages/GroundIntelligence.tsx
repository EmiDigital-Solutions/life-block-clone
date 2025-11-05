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
      
      {/* Split Screen Hero Section */}
      <section data-nav-theme="dark" className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600">
        <div className="absolute inset-0 flex">
          {/* Left Panel - Navigation & Title */}
          <div className="w-full lg:w-1/2 relative flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-gray-900/95 to-black/95">
            {/* Progress Indicators */}
            <div className="flex flex-col gap-4">
              {auditors.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`h-0.5 transition-all duration-500 ${
                    index === currentSlide ? 'w-16 bg-white' : 'w-8 bg-white/30'
                  }`} />
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    index === currentSlide ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-100'
                  }`}>
                    {index + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Main Title */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-7xl font-serif text-white leading-tight">
                  Meet
                  <br />
                  Your
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                    Auditor
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/70 text-lg max-w-md"
              >
                2,000+ certified professionals across 90+ countries ready to assess your suppliers
              </motion.p>
            </div>

            {/* Bottom Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Panel - Auditor Display */}
          <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-16">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex items-center justify-center p-16"
              >
                <div className="w-full max-w-2xl">
                  {/* Main Auditor Card */}
                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={currentAuditor.image}
                        alt={currentAuditor.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Auditor Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h2 className="text-4xl font-serif mb-2">{currentAuditor.name}</h2>
                        <p className="text-xl text-cyan-300 mb-4">{currentAuditor.title}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <span>{currentAuditor.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-cyan-400" />
                            <span>{currentAuditor.certifications}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>{currentAuditor.experience} experience</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {currentAuditor.specialties.map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs border border-white/20"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Thumbnail Preview */}
                  <div className="flex gap-4 mt-6 justify-center">
                    {auditors.map((auditor, index) => (
                      <motion.button
                        key={auditor.id}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all ${
                          index === currentSlide ? 'ring-4 ring-cyan-400' : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={auditor.image}
                          alt={auditor.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="absolute bottom-8 right-8 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
              >
                View Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/50"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">
                Ground Intelligence Excellence
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Physical factory assessments with AI-powered intelligence and certified expertise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Global Network",
                  description: "2,000+ certified auditors across 90+ countries for complete coverage",
                  icon: MapPin
                },
                {
                  title: "Certified Expertise",
                  description: "ISO 9001, VDA 6.3, IATF 16949 certified professionals",
                  icon: Award
                },
                {
                  title: "Fast Deployment",
                  description: "On-site assessments in days, not weeks. 80% time savings",
                  icon: Clock
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6">
                How It Works
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Request Audit", desc: "Submit supplier details" },
                { step: "2", title: "Match Auditor", desc: "AI-powered selection" },
                { step: "3", title: "On-Site Visit", desc: "Physical assessment" },
                { step: "4", title: "Detailed Report", desc: "Within 48 hours" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-cyan-500 to-purple-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Physical factory assessments starting from €700
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl transition-all"
            >
              Schedule Your Audit
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GroundIntelligence;
