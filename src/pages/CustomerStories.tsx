import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Plus, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import person images for featured/video sections
import testimonialChristoph from "@/assets/testimonial-christoph-seeholzer.jpg";
import procurementFemaleMiddleEast from "@/assets/procurement-female-middle-east.jpg";

// KPI Stats data
const kpiStats = [
  {
    stat: "50% reduction",
    description: "in sourcing cycle time",
    logo: "Linde"
  },
  {
    stat: "Over 1,000 audits",
    description: "completed per year with YVOO",
    logo: "Siemens"
  },
  {
    stat: "100% usage",
    description: "by all sourcing teams",
    logo: "BMW"
  }
];

// Customer stories data with industry images (Unsplash style like BeFound page) - 6 stories
const customerStories = [
  {
    id: "linde",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop", // Cryogenic/industrial gas
    personImage: testimonialChristoph,
    companyLogo: "LINDE",
    title: "Linde cuts supplier qualification time by 60% with YVOO",
    quote: "YVOO helps us simplify supplier audits in international commerce. We now make faster decisions in complex events and use data much more.",
    name: "Christoph Seeholzer",
    role: "Director Supplier Quality, Linde",
    featured: true,
    darkOverlay: true
  },
  {
    id: "pepsico",
    image: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=600&h=450&fit=crop", // Cola/beverage
    companyLogo: "PEPSICO",
    title: "PepsiCo runs sourcing with YVOO across 50 categories",
    description: "Read success story →",
    darkOverlay: true
  },
  {
    id: "swisslog",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=450&fit=crop", // Robotics/automation
    companyLogo: "SWISSLOG",
    title: "Swisslog drives efficient, transparent sourcing with YVOO",
    description: "Read success story →",
    darkOverlay: true
  },
  {
    id: "omv",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=450&fit=crop", // Chemicals/oil bubbles
    companyLogo: "OMV",
    title: "OMV enhances sourcing decisions by combining YVOO with SAP",
    description: "Read success story →",
    darkOverlay: false
  },
  {
    id: "gordon",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=450&fit=crop", // Fresh vegetables/food
    companyLogo: "GORDON",
    title: "Gordon Food Service accelerates sourcing with YVOO",
    description: "Read success story →",
    darkOverlay: false
  },
  {
    id: "stada",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=450&fit=crop", // Pharma pills
    companyLogo: "STADA",
    title: "Stada turns days into seconds with YVOO's AI-driven audit analysis",
    description: "Read success story →",
    darkOverlay: false
  },
  {
    id: "coop",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=450&fit=crop", // Fruits/berries
    companyLogo: "COOP",
    title: "Coop transforms sourcing with YVOO to boost savings",
    description: "Read success story →",
    darkOverlay: false
  }
];

// Video testimonial data
const videoTestimonial = {
  image: procurementFemaleMiddleEast,
  stat: "50% cycle time reduction",
  quote: "With YVOO, running supplier audits has become simple. What used to take 3-4 weeks we now get done in just a week.",
  name: "Sarah Al-Rashid",
  role: "Head of Procurement, Emirates Industrial",
  company: "Emirates Industrial"
};

// FAQ data
const faqs = [
  {
    question: "What types of companies and industries use YVOO?",
    answer: "YVOO is trusted by companies in automotive, aerospace, chemicals, consumer goods, retail, packaging, pharma, logistics, and manufacturing. Customers include global enterprises like Siemens and BMW as well as specialized manufacturers like Linde and Henkel."
  },
  {
    question: "What are the key benefits of using YVOO?",
    answer: "YVOO helps cut sourcing cycle times by up to 50%, delivers 15–35% faster supplier qualification, and brings more spend under management. Its intuitive design makes adoption easy for buyers and suppliers, while advanced analytics and AI ensure faster, smarter decisions across both simple and complex audits."
  },
  {
    question: "Where is YVOO from?",
    answer: "YVOO was founded in Munich, Germany by a team of procurement and technology experts who realized sourcing tools hadn't kept up with the times. The gap was clear: technology and AI offered a huge opportunity to make procurement smarter, easier, and fit for the modern age."
  },
  {
    question: "Why do customers love YVOO?",
    answer: "YVOO takes the pain out of supplier management. Instead of wrestling with spreadsheets and clunky systems, teams get an intuitive, AI-powered platform that's easy to use, fast to roll out, and powerful enough for the most complex audits. It makes procurement smarter, more collaborative, and more efficient."
  }
];

const CustomerStories = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const featuredStory = customerStories.find(story => story.featured);
  const regularStories = customerStories.filter(story => !story.featured);

  return (
    <div className="min-h-screen bg-white" data-nav-theme="light">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.03em] leading-[0.95] mb-8"
          >
            Customer Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/70 max-w-2xl"
          >
            See what's possible when companies like yours elevate sourcing with YVOO
          </motion.p>
        </div>
      </section>

      {/* Hero Video/Image Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video bg-foreground/5 overflow-hidden"
          >
            <img
              src={featuredStory?.image}
              alt="Customer story video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="w-20 h-20 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              >
                <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPI Stats Strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-foreground/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-foreground/10">
            {kpiStats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center md:px-8 first:md:pl-0 last:md:pr-0"
              >
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {item.stat}
                </p>
                <p className="text-foreground/60 text-sm mb-4">
                  {item.description}
                </p>
                <p className="font-mono text-sm text-foreground/40 uppercase tracking-wider">
                  {item.logo}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredStory && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <Link to={`/customer-stories/${featuredStory.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <div className="aspect-square overflow-hidden bg-foreground/5">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-6">
                  <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed">
                    "{featuredStory.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{featuredStory.name}</p>
                    <p className="text-foreground/60">{featuredStory.role}</p>
                  </div>
                  <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                    Read success story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/customer-stories/${story.id}`} className="block group">
                  {/* Image with logo overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 mb-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Dark overlay for better logo visibility */}
                    <div className={`absolute inset-0 ${story.darkOverlay ? 'bg-black/40' : 'bg-black/20'}`} />
                    {/* Company logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl md:text-3xl tracking-wider drop-shadow-lg">
                        {story.companyLogo}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-foreground/60 text-sm font-mono flex items-center gap-1">
                    {story.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Stats and Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 overflow-hidden bg-foreground/5">
                  <img
                    src={videoTestimonial.image}
                    alt={videoTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-sm text-foreground/40 uppercase tracking-wider mb-1">
                    {videoTestimonial.company}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {videoTestimonial.stat}
                </h3>
              </div>

              <blockquote className="text-xl text-foreground/80 leading-relaxed">
                "{videoTestimonial.quote}"
              </blockquote>

              <div>
                <p className="font-semibold text-foreground">{videoTestimonial.name}</p>
                <p className="text-foreground/60">{videoTestimonial.role}</p>
              </div>
            </motion.div>

            {/* Right - Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video bg-foreground/5 overflow-hidden"
            >
              <img
                src={videoTestimonial.image}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
                  <Play className="w-6 h-6 text-foreground ml-0.5" fill="currentColor" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="divide-y divide-foreground/10">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="py-6"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 mt-1">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-foreground/60" />
                    ) : (
                      <Plus className="w-5 h-5 text-foreground/60" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-foreground/70 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-foreground/10">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] mb-6"
          >
            Ready to change the way you source?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8"
          >
            Join hundreds of enterprises achieving breakthrough results with YVOO
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 font-mono text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Request a demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerStories;
