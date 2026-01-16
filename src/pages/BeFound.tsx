import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import supplierPortraitHero from "@/assets/supplier-portrait-hero.png";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Clean white background like Archlet */}
      <section
        data-nav-theme="light"
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-12 xl:px-24 bg-background"
        id="hero"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-sm font-mono tracking-wider mb-6"
          >
            Be Found
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground mb-8"
          >
            Get discovered<br />
            by global buyers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            7 million+ B2B decision-makers are searching for suppliers like you. Claim your free profile and start getting found.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button size="lg">
              Claim Your Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Cards - 3 Column Grid like Archlet */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Increase visibility",
                description: "Get discovered by 7M+ procurement professionals searching for suppliers like you."
              },
              {
                title: "Generate qualified leads",
                description: "Turn profile views into RFQs with optimized supplier profiles and premium placement."
              },
              {
                title: "Track buyer interest",
                description: "Real-time analytics show who's viewing your profile and what they're searching for."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden"
              >
                <div className="h-2 bg-primary w-full mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted overflow-hidden flex-shrink-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" 
                alt="Testimonial"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                "We saw a 300% increase in qualified inquiries within 3 months. YVOO's platform literally pays for itself with the quality of leads we receive."
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-foreground">Michael Weber</p>
                  <p className="text-sm text-muted-foreground">VP Sales, TechManufacturing · Germany</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Left aligned */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Claim and optimize your profile in minutes
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Search for your company and take control instantly. Add products, certifications, media, and detailed capabilities. The more complete your profile, the better you rank in buyer searches.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#f5f5f5] aspect-[4/3] flex items-center justify-center"
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded" />
                  </div>
                  <p className="text-muted-foreground text-sm">Profile Builder Interface</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Right aligned */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#f5f5f5] aspect-[4/3] flex items-center justify-center order-2 lg:order-1"
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded" />
                  </div>
                  <p className="text-muted-foreground text-sm">Analytics Dashboard</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Track who's viewing your profile
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See exactly which procurement teams are viewing your products, what they're searching for, and when they're most active. Make data-driven decisions to optimize your visibility.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Left aligned */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Convert views into qualified leads
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Buyers can contact you directly through the platform. With premium ads, get 5x more visibility and priority placement in search results.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#f5f5f5] aspect-[4/3] flex items-center justify-center"
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded" />
                  </div>
                  <p className="text-muted-foreground text-sm">Lead Management</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Keep as requested */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Role Toggle - Using primary color */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-0 p-1 rounded-lg border-2 border-primary">
                <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider">
                  Manufacturer
                </button>
                <button className="px-8 py-3 rounded-lg text-foreground font-medium text-sm uppercase tracking-wider hover:bg-muted transition-colors">
                  Distributor
                </button>
              </div>
            </div>

            {/* Headline */}
            <h2 className="section-headline text-foreground text-center">
              Imagine if you didn't have to spend time...
            </h2>

            {/* Image with soft glowing gradient background and overlapping cards */}
            <div className="relative flex flex-col items-center">
              {/* Container for image and gradient */}
              <div className="relative flex justify-center items-center mb-[-80px] z-10">
                {/* Soft glowing gradient background */}
                <div 
                  className="absolute w-[700px] h-[700px] md:w-[800px] md:h-[800px] max-[768px]:w-[450px] max-[768px]:h-[450px] rounded-full z-0"
                  style={{ 
                    background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, hsl(var(--muted) / 0.3) 30%, hsl(var(--secondary) / 0.2) 60%, hsl(var(--primary) / 0.1) 80%, transparent 100%)"
                  }}
                ></div>

                {/* Photo overlay */}
                <div className="relative z-10">
                  <img 
                    src={supplierPortraitHero} 
                    alt="Thoughtful supplier considering opportunities" 
                    className="max-w-[450px] w-full max-[768px]:max-w-[90vw] h-auto object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Pain Point Cards */}
              <div className="relative z-20 space-y-3 md:space-y-4 max-w-2xl w-full px-4">
                {[
                  {
                    text: "Know when buyers search for your products",
                    textFull: "Knowing when qualified buyers are actively searching for your exact product capabilities."
                  },
                  {
                    text: "Buyers discover you automatically",
                    textFull: "Having buyers automatically discover your company profile without cold outreach."
                  },
                  {
                    text: "See which teams viewed your profile",
                    textFull: "Getting visibility into which procurement teams viewed your products and services."
                  },
                  {
                    text: "Receive pre-qualified RFQs",
                    textFull: "Receiving pre-qualified RFQs from buyers who already match your ideal customer profile."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 md:p-6 flex items-start gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-border"
                  >
                    {/* Arrow icon */}
                    <div className="flex-shrink-0 mt-1">
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <p className="text-base md:text-lg text-foreground leading-relaxed">
                      <span className="md:hidden">{item.text}</span>
                      <span className="hidden md:inline">{item.textFull}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Known for driving supplier visibility and qualified leads.
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { value: "7M+", label: "Annual buyer searches", description: "Procurement professionals actively searching for suppliers" },
              { value: "12M+", label: "Monthly profile views", description: "Supplier profiles viewed by qualified buyers" },
              { value: "5x", label: "Visibility boost", description: "With premium placement and optimized profiles" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="text-5xl md:text-6xl font-bold text-primary mb-4">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Trusted by industry leaders
            </h2>
            <p className="text-muted-foreground">
              Suppliers from leading manufacturing companies use YVOO to get discovered.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-bold text-foreground"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight">
              Start getting discovered today
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              Join thousands of suppliers connecting with buyers worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Claim Your Free Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground"
              >
                Request a Demo
              </Button>
            </div>
            <p className="text-background/60 text-sm">
              Free forever · No credit card · 3 minute setup
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
