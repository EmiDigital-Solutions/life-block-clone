import { motion } from "framer-motion";
import { ArrowRight, Check, TrendingUp, Target, BarChart3, Users, Globe, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import supplierPortraitHero from "@/assets/supplier-portrait-hero.png";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - Large, Bold, Centered */}
      <section
        data-nav-theme="primary"
        className="relative min-h-[90vh] flex items-center justify-center px-6 py-32 bg-primary"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
              Get Discovered by Buyers
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              7 million+ B2B decision-makers are searching for suppliers like you. 
              Claim your free profile and start getting found.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/95 text-lg px-10 py-7 h-auto rounded-full font-semibold shadow-2xl group"
              >
                Claim Your Profile
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 text-sm font-light"
            >
              ⚡ Free forever · Set up in 3 minutes
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Compact */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-widest text-gray-400 mb-12 font-medium"
          >
            Trusted by Industry Leaders
          </motion.p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {["REWE", "KNORR-BREMSE", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-bold text-gray-500"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Built for <span className="italic font-light">ambitious</span> suppliers.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you're a growing manufacturer or established enterprise, 
              get the visibility you deserve on the world's B2B marketplace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Hero Section with Image */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Role Toggle - Blue gradient style */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-0 p-1 rounded-full border-2 border-[#5B7FE8]">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7B8FEC] to-[#5B7FE8] text-white font-medium text-sm uppercase tracking-wider shadow-sm">
                  Manufacturer
                </button>
                <button className="px-8 py-3 rounded-full text-gray-900 font-medium text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">
                  Distributor
                </button>
              </div>
            </div>

            {/* Headline with orange underline emphasis */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight">
              Imagine if you{" "}
              <span className="relative inline-block">
                didn't
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#FF8B6B] opacity-50 -z-10"></span>
              </span>
              {" "}have to spend time...
            </h2>

            {/* Image with soft glowing gradient background and overlapping cards */}
            <div className="relative flex flex-col items-center">
              {/* Container for image and gradient */}
              <div className="relative flex justify-center items-center mb-[-80px] z-10">
                {/* Soft glowing gradient background - green/grey rainbow effect */}
                <div 
                  className="absolute w-[700px] h-[700px] md:w-[800px] md:h-[800px] max-[768px]:w-[450px] max-[768px]:h-[450px] rounded-full z-0"
                  style={{ 
                    background: "radial-gradient(circle, rgba(168, 197, 184, 0.4) 0%, rgba(200, 200, 200, 0.3) 30%, rgba(168, 184, 202, 0.2) 60%, rgba(168, 197, 184, 0.1) 80%, rgba(168, 197, 184, 0) 100%)"
                  }}
                ></div>

                {/* Photo overlay - natural rectangular shape, not cropped */}
                <div className="relative z-10">
                  <img 
                    src={supplierPortraitHero} 
                    alt="Thoughtful supplier considering opportunities" 
                    className="max-w-[450px] w-full max-[768px]:max-w-[90vw] h-auto object-contain mx-auto"
                  />
                </div>
              </div>

              {/* Pain Point Cards - overlapping the gradient */}
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
                    className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 flex items-start gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    {/* 8-bit pixel arrow */}
                    <div className="flex-shrink-0 mt-1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="md:w-6 md:h-6">
                        <rect x="8" y="0" width="4" height="4" fill="black"/>
                        <rect x="12" y="4" width="4" height="4" fill="black"/>
                        <rect x="16" y="8" width="4" height="4" fill="black"/>
                        <rect x="12" y="12" width="4" height="4" fill="black"/>
                        <rect x="8" y="16" width="4" height="4" fill="black"/>
                        <rect x="0" y="8" width="16" height="4" fill="black"/>
                      </svg>
                    </div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
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

      {/* Comparison Section - Before/After Style */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visibility that converts
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Without Connectimus */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-600 mb-4">
                Without Connectimus
              </div>
              
              <div className="bg-gray-50 p-10 rounded-3xl space-y-6 border-2 border-gray-200">
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    No online presence for procurement teams searching for suppliers.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Missing out on millions of potential buyer searches
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">✕</span>
                  </div>
                  <span>Invisible to 7M+ annual buyers</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">✕</span>
                  </div>
                  <span>No insights into buyer behavior</span>
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">✕</span>
                  </div>
                  <span>Losing leads to competitors</span>
                </div>
              </div>
            </motion.div>

            {/* With Connectimus */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4" style={{ backgroundColor: "hsl(160, 25%, 72%)" }}>
                With Connectimus
              </div>
              
              <div className="p-10 rounded-3xl space-y-6 border-2" style={{ backgroundColor: "hsl(160, 25%, 95%)", borderColor: "hsl(160, 25%, 72%)" }}>
                <div className="space-y-4 text-gray-900">
                  <p className="leading-relaxed font-medium">
                    Your optimized profile appears when buyers search for your products and services.
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "hsl(160, 25%, 40%)" }}>
                    Built to convert searches into qualified inquiries
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3 text-gray-900">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: "hsl(160, 25%, 72%)" }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>12M+ monthly profile views</span>
                </div>
                <div className="flex items-start gap-3 text-gray-900">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: "hsl(160, 25%, 72%)" }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>Real-time analytics dashboard</span>
                </div>
                <div className="flex items-start gap-3 text-gray-900">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: "hsl(160, 25%, 72%)" }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>5x visibility with premium ads</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points Grid */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stop missing opportunities...
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                text: "Buyers can't find you in search results"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                text: "No visibility into who's viewing your company"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                text: "Missing qualified RFQ opportunities"
              },
              {
                icon: <Users className="w-8 h-8" />,
                text: "Competitors are capturing your leads"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                text: "Limited international market reach"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                text: "No data on buyer intent and behavior"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl text-center space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center" style={{ color: "hsl(160, 25%, 72%)" }}>
                  {item.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Letter Style Section */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Dear Manufacturers,
            </h3>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
              <p>
                We ❤️ suppliers. You're the backbone of global industry, the innovators who make products possible, 
                and the partners who keep supply chains moving.
              </p>
              
              <p>
                At Connectimus, we stand with suppliers who are committed to growth. The ones who understand 
                that visibility isn't just about being found—it's about being found by the right buyers, 
                at the right time, with the right message.
              </p>
              
              <p>
                You're the ones doing the hard work. Building quality products. Maintaining certifications. 
                Meeting deadlines. You deserve to be discovered by the 7 million+ procurement professionals 
                who use our platform every year.
              </p>
              
              <p className="font-semibold text-gray-900">
                That's why we're here. To amplify your voice. To connect you with buyers who need exactly 
                what you offer. To give you the tools and insights you need to compete and win in the global B2B marketplace.
              </p>
              
              <p className="italic text-gray-600">
                Be the supplier buyers can't ignore.
              </p>
            </div>

            <div className="pt-8">
              <p className="text-gray-600 font-medium">The Connectimus Team</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Walkthrough */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From profile creation to qualified leads
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Claim Your Profile",
                description: "Search for your company and take control in under 3 minutes. Already listed? Great. Not listed? We'll create your profile immediately.",
                features: ["Instant activation", "Full editing control", "Free forever"]
              },
              {
                step: "02",
                title: "Optimize for Discovery",
                description: "Add products, certifications, media, and detailed capabilities. The more complete your profile, the better you rank in search results.",
                features: ["SEO-optimized", "Rich media support", "Product catalog"]
              },
              {
                step: "03",
                title: "Track Performance",
                description: "See exactly who's viewing your profile, what they're searching for, and when they're most active. Make data-driven decisions.",
                features: ["Real-time analytics", "Buyer insights", "Search trends"]
              },
              {
                step: "04",
                title: "Convert to Leads",
                description: "Buyers can contact you directly through the platform. With premium ads, get 5x more visibility and priority placement.",
                features: ["Direct inquiries", "Premium placement", "Lead quality scoring"]
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-[300px,1fr] gap-12 items-start"
              >
                <div className="space-y-4">
                  <div className="text-8xl font-bold text-gray-100">{item.step}</div>
                  <h3 className="text-3xl font-bold text-gray-900">{item.title}</h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {item.features.map((feature) => (
                      <div
                        key={feature}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: "hsl(160, 25%, 95%)", color: "hsl(160, 25%, 40%)" }}
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

      {/* Testimonials */}
      <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                quote: "We saw a 300% increase in qualified inquiries within 3 months. The platform literally pays for itself.",
                author: "Sarah Chen",
                role: "VP Sales, TechManufacturing",
                company: "Germany"
              },
              {
                quote: "The analytics give us incredible insights. We now know exactly when buyers are looking and can respond immediately.",
                author: "Michael Weber",
                role: "Marketing Director",
                company: "Austria"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-6"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role} · {testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-40 px-6"
        style={{
          background: "linear-gradient(135deg, hsl(160, 25%, 72%) 0%, hsl(192, 20%, 72%) 100%)"
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Start getting discovered today
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-light">
              Join thousands of suppliers connecting with buyers worldwide
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/95 text-xl px-12 py-8 h-auto rounded-full font-semibold shadow-2xl"
              >
                Claim Your Free Profile
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </div>
            <p className="text-white/60 text-sm font-light">
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
