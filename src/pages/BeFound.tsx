import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Inspired by MidFunnel's clean design */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 py-32"
        style={{
          background: "linear-gradient(180deg, hsl(160, 25%, 72%) 0%, hsl(192, 20%, 72%) 50%, hsl(210, 30%, 72%) 100%)"
        }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
              Get discovered by<br />
              <span className="text-white/90">7 million+ buyers</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Claim your free supplier profile on the world's fastest-growing B2B marketplace. 
              Control your presence, track performance, and connect with decision-makers globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-full font-semibold group shadow-xl"
              >
                Claim Your Profile
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-white/80 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Free forever · No credit card required</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-medium text-gray-500 mb-12 uppercase tracking-wider"
          >
            Trusted by Industry Leaders
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center h-16"
              >
                <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition - Clean Three Column */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ color: "hsl(160, 25%, 72%)" }}>
              Why Suppliers Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to maximize your visibility and connect with qualified buyers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                stat: "7M+",
                label: "Annual Users",
                description: "Global B2B decision-makers across all industries actively searching for suppliers like you"
              },
              {
                stat: "12M+",
                label: "Monthly Profile Views",
                description: "Your profile gets discovered by procurement professionals conducting supplier research"
              },
              {
                stat: "5x",
                label: "More Visibility",
                description: "Premium members see 5x more profile visits with targeted advertising and top rankings"
              }
            ].map((item, index) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-10 rounded-3xl text-center space-y-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl font-bold mb-4" style={{ color: "hsl(160, 25%, 72%)" }}>
                  {item.stat}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {item.label}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6" style={{ color: "hsl(192, 20%, 72%)" }}>
              Get Started in Minutes
            </h2>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Claim Your Profile",
                description: "Search for your company and claim your free profile. If you're not listed yet, create a new profile in just a few clicks. Full control over your company's presence.",
                features: ["Free forever", "Instant activation", "Full editing rights"]
              },
              {
                step: "02",
                title: "Optimize Your Presence",
                description: "Add rich media, certifications, product catalogs, and detailed company information. Make your profile stand out to procurement professionals.",
                features: ["Rich media support", "Product showcase", "Certification badges"]
              },
              {
                step: "03",
                title: "Track Performance",
                description: "Monitor impressions, clicks, and engagement. Understand who's viewing your profile and adjust your strategy based on real analytics.",
                features: ["Real-time analytics", "Visitor insights", "Performance metrics"]
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-[200px,1fr] gap-8 items-start"
              >
                <div className="text-8xl font-bold text-gray-100">
                  {item.step}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {item.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: "hsl(160, 25%, 72%)" }}
                      >
                        <Check className="w-4 h-4" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Ads Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Supercharge with <span style={{ color: "hsl(210, 30%, 72%)" }}>Connectimus Ads</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get 5x more visibility with targeted advertising. Appear at the top of search results 
                and reach buyers actively looking for your solutions.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  "Priority placement in search results",
                  "Advanced targeting by industry & region",
                  "Detailed buyer intent data",
                  "Performance reporting dashboard"
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "hsl(210, 30%, 72%)" }} />
                    <span className="text-lg text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto rounded-full font-semibold group border-2"
                  style={{ borderColor: "hsl(210, 30%, 72%)", color: "hsl(210, 30%, 72%)" }}
                >
                  Learn About Ads
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-3xl shadow-2xl space-y-8"
            >
              <div className="space-y-3">
                <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(210, 30%, 72%)" }}>
                  Premium Features
                </div>
                <div className="text-4xl font-bold text-gray-900">Everything You Need</div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Top Search Rankings", value: "Guaranteed" },
                  { label: "Monthly Impressions", value: "50,000+" },
                  { label: "Lead Quality Score", value: "95%" },
                  { label: "ROI Tracking", value: "Real-time" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-xl font-bold" style={{ color: "hsl(210, 30%, 72%)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Suppliers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Within 3 months of claiming our profile, we saw a 300% increase in qualified inquiries. The platform pays for itself.",
                author: "Sarah Chen",
                role: "VP Sales, TechManufacturing GmbH"
              },
              {
                quote: "The analytics dashboard gives us incredible insights into buyer behavior. We can now focus our efforts where they matter most.",
                author: "Michael Weber",
                role: "Marketing Director, Industrial Solutions AG"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-10 rounded-2xl space-y-6"
              >
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-32 px-6"
        style={{
          background: "linear-gradient(135deg, hsl(160, 25%, 72%) 0%, hsl(192, 20%, 72%) 100%)"
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to get discovered?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of suppliers connecting with buyers on the world's fastest-growing B2B platform.
            </p>
            <div className="pt-6">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 text-lg px-10 py-7 h-auto rounded-full font-semibold shadow-2xl"
              >
                Claim Your Free Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-white/70 text-sm">
              No credit card required · Set up in under 5 minutes
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
