import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface GalleryCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  timelineStep: number;
}

const galleryCards: GalleryCard[] = [
  {
    id: 1,
    title: "Search Suppliers",
    subtitle: "AI-Powered Discovery",
    description: "Use free AI-powered search to find qualified manufacturers across 3 global databases in minutes",
    imageUrl: "/placeholder.svg",
    timelineStep: 1,
  },
  {
    id: 2,
    title: "Select Auditor",
    subtitle: "Expert Network",
    description: "Browse 2,000+ certified auditors with transparent pricing from €700",
    imageUrl: "/placeholder.svg",
    timelineStep: 2,
  },
  {
    id: 3,
    title: "On-Site Audit",
    subtitle: "Real-Time Tracking",
    description: "Local expert conducts standardized audit using AI guidance",
    imageUrl: "/placeholder.svg",
    timelineStep: 3,
  },
  {
    id: 4,
    title: "Get Report",
    subtitle: "Actionable Intelligence",
    description: "Receive comprehensive scored report within 24-48 hours",
    imageUrl: "/placeholder.svg",
    timelineStep: 4,
  },
];

export const HeroGallery = () => {
  const [activeCard, setActiveCard] = useState<GalleryCard>(galleryCards[0]);
  const [expandedCard, setExpandedCard] = useState<GalleryCard | null>(null);

  const handleCardClick = (card: GalleryCard) => {
    setActiveCard(card);
    setExpandedCard(card);
  };

  const handleCloseExpanded = () => {
    setExpandedCard(null);
  };

  const handlePrevious = () => {
    const currentIndex = galleryCards.findIndex(c => c.id === activeCard.id);
    const prevIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
    setActiveCard(galleryCards[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = galleryCards.findIndex(c => c.id === activeCard.id);
    const nextIndex = (currentIndex + 1) % galleryCards.length;
    setActiveCard(galleryCards[nextIndex]);
  };

  return (
    <section className="relative h-screen flex" style={{ background: "hsl(var(--content-bg))" }}>
      {/* LEFT SIDE - Featured Card (30%) */}
      <div className="w-[30%] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${activeCard.imageUrl})`,
              }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
              {/* Top Section */}
              <div>
                <motion.p
                  key={`subtitle-${activeCard.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "hsl(var(--content-accent))" }}
                >
                  {activeCard.subtitle}
                </motion.p>

                <motion.div
                  key={`title-${activeCard.id}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <h2 className="text-4xl font-bold">{activeCard.title}</h2>
                  <div 
                    className="h-1 w-16 rounded-full"
                    style={{ background: "hsl(var(--content-accent))" }}
                  />
                </motion.div>

                <motion.p
                  key={`desc-${activeCard.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/90 text-sm max-w-md"
                >
                  {activeCard.description}
                </motion.p>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4].map((step) => (
                  <motion.div
                    key={step}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + step * 0.05 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
                      style={{
                        background: activeCard.timelineStep === step 
                          ? "hsl(var(--content-accent))" 
                          : "rgba(255, 255, 255, 0.2)",
                        boxShadow: activeCard.timelineStep === step 
                          ? "0 0 20px hsla(142, 76%, 45%, 0.5)" 
                          : "none",
                      }}
                    >
                      {step}
                    </div>
                    <div 
                      className={`h-0.5 flex-1 transition-all duration-200 ${
                        activeCard.timelineStep >= step ? "opacity-100" : "opacity-30"
                      }`}
                      style={{ background: "rgba(255, 255, 255, 0.5)" }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE - Gallery Grid (70%) */}
      <div className="w-[70%] flex flex-col p-12" style={{ background: "hsl(var(--process-bg))" }}>
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-8"
        >
          {activeCard.title}
        </motion.h3>

        {/* Grid of Cards or Expanded View */}
        <div className="relative mb-8 flex-1">
          <AnimatePresence mode="wait">
            {expandedCard ? (
              // Expanded Card View
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="relative h-full rounded-3xl overflow-hidden">
                  {/* Expanded Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${expandedCard.imageUrl})`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    {/* Close Button */}
                    <button
                      onClick={handleCloseExpanded}
                      className="self-end w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all"
                    >
                      <span className="text-white text-2xl">×</span>
                    </button>

                    {/* Bottom Content */}
                    <div>
                      <p 
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "hsl(var(--content-accent))" }}
                      >
                        {expandedCard.subtitle}
                      </p>
                      <h3 className="text-5xl font-bold text-white mb-4">
                        {expandedCard.title}
                      </h3>
                      <p className="text-white/90 text-lg max-w-2xl mb-6">
                        {expandedCard.description}
                      </p>

                      {/* Timeline in expanded view */}
                      <div className="flex gap-3">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-200"
                            style={{
                              background: expandedCard.timelineStep === step 
                                ? "hsl(var(--content-accent))" 
                                : "rgba(255, 255, 255, 0.2)",
                              boxShadow: expandedCard.timelineStep === step 
                                ? "0 0 20px hsla(142, 76%, 45%, 0.5)" 
                                : "none",
                            }}
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Grid View
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-6 h-full"
              >
                {galleryCards.map((card, index) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: activeCard.id === card.id ? 1.02 : 1 
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="relative h-full rounded-2xl overflow-hidden cursor-pointer group"
                    style={{
                      boxShadow: activeCard.id === card.id
                        ? "0 0 30px hsla(142, 76%, 45%, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {/* Card Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${card.imageUrl})`,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Active Indicator */}
                    {activeCard.id === card.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          border: "3px solid hsl(var(--content-accent))",
                        }}
                      />
                    )}

                    {/* Card Content */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
                        {card.subtitle}
                      </p>
                      <h4 className="text-white text-lg font-bold">
                        {card.title}
                      </h4>
                    </div>

                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation & CTA */}
        <div className="flex items-center justify-between">
          {/* Navigation Arrows - nur im Grid-Mode */}
          {!expandedCard && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30 backdrop-blur-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30 backdrop-blur-sm"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}

          {/* Spacer wenn expanded */}
          {expandedCard && <div />}

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button 
              className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-lg flex items-center gap-2 backdrop-blur-sm"
              style={{ 
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Learn More
            </button>
            <button 
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg flex items-center gap-2"
              style={{ 
                background: "hsl(var(--content-accent))",
                color: "white"
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
