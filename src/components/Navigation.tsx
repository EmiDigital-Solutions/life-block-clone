import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import yvooLogo from "@/assets/logo-new.svg";
import { useLanguage } from "@/i18n/LanguageContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-[680px] lg:w-[720px]" ref={menuRef}>
      <div 
        className={`relative overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'rounded-[1.125rem] md:rounded-[2rem]' : 'rounded-full'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.7) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 0 60px rgba(255,255,255,0.4)',
          backdropFilter: 'blur(50px) saturate(180%)',
          WebkitBackdropFilter: 'blur(50px) saturate(180%)',
          border: '2px solid rgba(255,255,255,0.9)',
          maxHeight: isMenuOpen ? '85vh' : 'auto',
        }}
      >
        {/* Main Nav Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center justify-center pl-2 md:pl-6 pr-2 md:pr-8 py-1 md:py-4 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src={yvooLogo} 
              alt="YVOO Logo"
              className="h-10 md:h-14 w-auto object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </Link>

          <div className="flex-1 flex items-center justify-between gap-2 md:gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "de" : "en")}
              className="flex items-center justify-center px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-mono font-semibold tracking-wide text-foreground/70 hover:text-foreground transition-colors rounded-full border border-foreground/15 hover:border-foreground/30"
            >
              {language === "en" ? "DE" : "EN"}
            </button>

            {/* Hamburger Menu Button */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center p-2 md:p-4 hover:bg-foreground/5 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 md:w-7 md:h-7 text-foreground" />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-[4px] md:gap-2.5">
                    <span className="w-6 md:w-9 h-[2.5px] md:h-[3px] bg-foreground rounded-full block" />
                    <span className="w-6 md:w-9 h-[2.5px] md:h-[3px] bg-foreground rounded-full block" />
                  </div>
                )}
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 bg-foreground text-white pl-4 pr-3.5 py-2.5 md:pl-8 md:pr-7 md:py-6 my-1 mr-1 md:my-1.5 md:mr-1.5 rounded-full font-bold text-xl md:text-2xl tracking-tight hover:bg-foreground/90 transition-all duration-300"
            >
               {t.nav.demo}
               <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
             </a>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="px-4 md:px-10 pb-6 md:pb-10 pt-3 md:pt-6 animate-fade-in overflow-y-auto" style={{ maxHeight: 'calc(85vh - 50px)' }}>
            <nav className="space-y-2 md:space-y-4">
              {[
                { to: "/features", label: t.nav.features, desc: t.nav.featuresDesc },
                { to: "/search-suppliers", label: t.nav.searchSuppliers, desc: t.nav.searchSuppliersDesc },
                { to: "/scanpro-plus", label: t.nav.scanProPlus, desc: t.nav.scanProPlusDesc },
                { to: "/ground-intelligence", label: t.nav.groundIntelligence, desc: t.nav.groundIntelligenceDesc },
                { to: "/auditors", label: t.nav.forAuditors, desc: t.nav.forAuditorsDesc },
                { to: "/be-found", label: t.nav.beFound, desc: t.nav.beFoundDesc },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block group py-1 md:py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                    {item.desc}
                  </span>
                </Link>
              ))}
              <a
                href="#pricing"
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {t.nav.pricing}
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  {t.nav.pricingDesc}
                </span>
              </a>
              {[
                { to: "/about-us", label: t.nav.aboutUs, desc: t.nav.aboutUsDesc },
                { to: "/customer-stories", label: t.nav.customerStories, desc: t.nav.customerStoriesDesc },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block group py-1 md:py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-foreground/60 transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                    {item.desc}
                  </span>
                </Link>
              ))}

              {/* Mobile CTA */}
              <a
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex items-center justify-center gap-2 bg-foreground text-white px-4 py-3 mt-3 rounded-full font-medium text-sm hover:bg-foreground/90 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.demo}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
