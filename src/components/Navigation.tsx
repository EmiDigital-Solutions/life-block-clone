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

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50" ref={menuRef}>
      <div 
        className={`bg-white/70 backdrop-blur-xl shadow-lg border border-white/30 transition-all duration-300 ${
          isMenuOpen ? 'rounded-3xl' : 'rounded-full'
        }`}
      >
        {/* Main Nav Bar */}
        <div className="flex items-center gap-2 px-2 py-2">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center justify-center px-4 py-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src={yvooLogo} 
              alt="YVOO Logo"
              className="h-6 w-auto object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100/50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="https://calendly.com/yvoo/demo-yvoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
          >
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="px-6 pb-6 pt-2 animate-fade-in">
            <nav className="space-y-1">
              <Link 
                to="/search-suppliers" 
                className="block text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Suppliers
              </Link>
              <Link 
                to="/ground-intelligence" 
                className="block text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Ground Intelligence
              </Link>
              <Link 
                to="/auditors" 
                className="block text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                For Auditors
              </Link>
              <a 
                href="#pricing" 
                className="block text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Link 
                to="/about-us" 
                className="block text-2xl md:text-3xl font-light text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
