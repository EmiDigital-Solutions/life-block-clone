import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import yvooLogo from "@/assets/logo-new.svg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto" ref={menuRef}>
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

          <div className="flex-1 flex items-center justify-between gap-4">
            {/* Hamburger Menu Button - centered with spacing */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center p-2 md:p-4 hover:bg-gray-100/30 transition-colors"
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
              Book a Call
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="px-4 md:px-10 pb-6 md:pb-10 pt-3 md:pt-6 animate-fade-in overflow-y-auto" style={{ maxHeight: 'calc(85vh - 50px)' }}>
            <nav className="space-y-2 md:space-y-4">
              <Link 
                to="/features" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Features
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Complete feature overview
                </span>
              </Link>
              <Link 
                to="/search-suppliers" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Search Suppliers
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Find verified suppliers worldwide
                </span>
              </Link>
              <Link 
                to="/scanpro-plus" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  ScanPro+
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  AI-powered audit intelligence
                </span>
              </Link>
              <Link 
                to="/ground-intelligence" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Ground Intelligence
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Real-time factory insights
                </span>
              </Link>
              <Link 
                to="/auditors" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  For Auditors
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Join our global auditor network
                </span>
              </Link>
              <Link 
                to="/be-found" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Be Found
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Get discovered by global buyers
                </span>
              </Link>
              <a 
                href="#pricing" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Pricing
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Transparent & flexible plans
                </span>
              </a>
              <Link 
                to="/about-us" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  About Us
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Our mission & team
                </span>
              </Link>
              <Link 
                to="/customer-stories" 
                className="block group py-1 md:py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-foreground/60 transition-colors">
                  Customer Stories
                </span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">
                  Success stories from our clients
                </span>
              </Link>

              {/* Mobile CTA */}
              <a
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex items-center justify-center gap-2 bg-foreground text-white px-4 py-3 mt-3 rounded-full font-medium text-sm hover:bg-foreground/90 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
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
