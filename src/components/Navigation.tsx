import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'green' | 'light'>('dark');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect scroll position and section colors
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-nav-theme]');
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      let currentTheme: 'dark' | 'green' | 'light' = 'dark';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const theme = section.getAttribute('data-nav-theme') as 'dark' | 'green' | 'light' | null;
          if (theme) {
            currentTheme = theme;
          }
        }
      });

      setNavTheme(currentTheme);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic navigation styles based on theme
  const getNavStyles = () => {
    switch (navTheme) {
      case 'dark':
        return {
          bg: 'bg-navy-deep/95',
          text: 'text-white',
          textHover: 'text-white/80 hover:text-white',
          border: 'border-white/10',
          button: 'bg-white text-navy-deep hover:bg-white/90 border-white',
        };
      case 'green':
        return {
          bg: 'bg-green-600/80',
          text: 'text-white',
          textHover: 'text-white/80 hover:text-white',
          border: 'border-white/20',
          button: 'bg-white text-green-700 hover:bg-white/90 border-white',
        };
      case 'light':
        return {
          bg: 'bg-white/95',
          text: 'text-gray-900',
          textHover: 'text-gray-600 hover:text-gray-900',
          border: 'border-gray-200',
          button: 'bg-navy-deep text-white hover:bg-navy-deep/90 border-navy-deep',
        };
    }
  };

  const styles = getNavStyles();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${styles.bg} backdrop-blur-sm border-b ${styles.border} transition-all duration-300 ease-in-out`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${navTheme === 'light' ? 'bg-gray-200' : 'bg-white/10'} flex items-center justify-center transition-all duration-300`}>
              <div className={`w-6 h-6 border-2 ${navTheme === 'light' ? 'border-navy-deep' : 'border-white'} rounded-full transition-all duration-300`}></div>
            </div>
            <div>
              <div className={`${styles.text} font-sans text-lg font-bold transition-all duration-300`}>YVOO</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${styles.textHover} transition-all duration-300 font-sans text-sm flex items-center gap-1`}
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-72 ${navTheme === 'light' ? 'bg-white' : 'bg-navy-deep'} rounded-lg shadow-xl border ${styles.border} overflow-hidden transition-all duration-300 animate-fade-in`}>
                  <a 
                    href="#search-suppliers" 
                    className={`block px-4 py-3 ${styles.textHover} transition-colors duration-300 ${navTheme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-white/5'} border-b ${styles.border}`}
                  >
                    <div className="font-semibold">Search Suppliers</div>
                    <div className={`text-xs ${navTheme === 'light' ? 'text-gray-500' : 'text-white/60'} mt-0.5`}>Find relevant companies</div>
                  </a>
                  <a 
                    href="#ground-intelligence" 
                    className={`block px-4 py-3 ${styles.textHover} transition-colors duration-300 ${navTheme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-white/5'} border-b ${styles.border}`}
                  >
                    <div className="font-semibold">Ground Intelligence</div>
                    <div className={`text-xs ${navTheme === 'light' ? 'text-gray-500' : 'text-white/60'} mt-0.5`}>Qualify suppliers on-site</div>
                  </a>
                  <a 
                    href="#be-found" 
                    className={`block px-4 py-3 ${styles.textHover} transition-colors duration-300 ${navTheme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-white/5'}`}
                  >
                    <div className="font-semibold">Be found</div>
                    <div className={`text-xs ${navTheme === 'light' ? 'text-gray-500' : 'text-white/60'} mt-0.5`}>Reach your target audience</div>
                  </a>
                </div>
              )}
            </div>

            <a href="#pricing" className={`${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              Pricing
            </a>
            <a href="#auditors" className={`${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              For auditors
            </a>
            <a href="#blog" className={`${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              Blog
            </a>
            <a href="#about" className={`${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              About us
            </a>
            <Button 
              variant="outline" 
              className={`${styles.button} font-sans text-sm px-6 transition-all duration-300`}
            >
              Estimate project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${styles.text} transition-all duration-300`}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {/* Solutions Submenu */}
            <div className="space-y-2">
              <div className={`${styles.text} font-sans text-sm font-semibold transition-all duration-300`}>Solutions</div>
              <a href="#search-suppliers" className={`block pl-4 ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
                Search Suppliers
              </a>
              <a href="#ground-intelligence" className={`block pl-4 ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
                Ground Intelligence
              </a>
              <a href="#be-found" className={`block pl-4 ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
                Be found
              </a>
            </div>
            
            <a href="#pricing" className={`block ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              Pricing
            </a>
            <a href="#auditors" className={`block ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              For auditors
            </a>
            <a href="#blog" className={`block ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              Blog
            </a>
            <a href="#about" className={`block ${styles.textHover} transition-all duration-300 font-sans text-sm`}>
              About us
            </a>
            <Button 
              variant="outline" 
              className={`w-full ${styles.button} font-sans text-sm transition-all duration-300`}
            >
              Estimate project
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
