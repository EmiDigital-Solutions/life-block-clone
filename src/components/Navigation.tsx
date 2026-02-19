import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-[560px]" ref={menuRef}>
      <div 
        className={`relative overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'rounded-[1.125rem] md:rounded-[1.5rem] min-w-[90vw] md:min-w-[600px]' : 'rounded-full'
        }`}
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.45) 8%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.45) 92%, rgba(255,255,255,0.8) 100%), linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.35) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.35) 80%, rgba(255,255,255,0.8) 100%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          border: 'none',
          maxHeight: isMenuOpen ? '85vh' : 'auto',
        }}
      >
        {/* Main Nav Bar */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3 md:py-4">
          {/* Logo Text */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-2xl md:text-3xl font-black tracking-tight text-foreground">RACI</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Demo Button */}
            <Link
              to="/lng-inspection"
              className="px-4 md:px-5 py-1.5 md:py-2 bg-foreground text-background text-xs md:text-sm font-semibold rounded-full hover:bg-foreground/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center p-2 md:p-2.5 hover:bg-foreground/5 transition-colors rounded-full"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
              ) : (
                <div className="flex flex-col justify-center items-center gap-[3px] md:gap-[4px]">
                  <span className="w-[16px] md:w-[18px] h-[2px] bg-foreground rounded-full block" />
                  <span className="w-[16px] md:w-[18px] h-[2px] bg-foreground rounded-full block" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="px-4 md:px-10 pb-6 md:pb-10 pt-3 md:pt-6 animate-fade-in overflow-y-auto" style={{ maxHeight: 'calc(85vh - 50px)' }}>
            <nav className="space-y-2 md:space-y-4">
              <Link to="/features" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">Features</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">Complete feature overview</span>
              </Link>
              <Link to="/search-suppliers" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">Search Suppliers</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">Find verified suppliers worldwide</span>
              </Link>
              <Link to="/scanpro-plus" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">ScanPro+</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">AI-powered audit intelligence</span>
              </Link>
              <Link to="/ground-intelligence" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">Ground Intelligence</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">Verified supplier intelligence</span>
              </Link>
              <Link to="/lng-inspection" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">LNG Inspection</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">EPC quality management</span>
              </Link>
              <Link to="/about-us" className="block group py-1 md:py-2" onClick={() => setIsMenuOpen(false)}>
                <span className="block text-lg md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">About Us</span>
                <span className="block text-[11px] md:text-sm text-foreground/60 mt-0.5">Our mission & team</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
