import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 sm:py-14 lg:py-16 xl:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-12">
            
            {/* Column 1 - Company Info */}
            <div>
              <h3 className="text-xl sm:text-xl lg:text-2xl xl:text-2xl font-bold mb-3 sm:mb-4 tracking-wide">Connectimus</h3>
              <address className="not-italic text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                CONNECTIMUS PROJECT d.o.o.<br />
                Novotnijeva 12<br />
                10000 Zagreb, Croatia
              </address>
            </div>

            {/* Column 2 - Solutions */}
            <div>
              <h4 className="text-base sm:text-base lg:text-lg xl:text-lg font-semibold mb-3 sm:mb-4 tracking-wide">Solutions</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/search-companies" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Search Companies
                  </Link>
                </li>
                <li>
                  <Link to="/audit-suppliers" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Audit Suppliers
                  </Link>
                </li>
                <li>
                  <Link to="/become-visible" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Become Visible
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div>
              <h4 className="text-base sm:text-base lg:text-lg xl:text-lg font-semibold mb-3 sm:mb-4 tracking-wide">Resources</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/technology" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h4 className="text-base sm:text-base lg:text-lg xl:text-lg font-semibold mb-3 sm:mb-4 tracking-wide">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/team" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Jobs & Career
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium text-xs sm:text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom - Legal & Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 font-medium">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 tracking-wide">
                <Link to="/imprint" className="hover:text-white transition-colors">
                  Imprint
                </Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <span>•</span>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of use
                </Link>
              </div>
              <div className="text-center sm:text-right tracking-wide">
                © 2025 CONNECTIMUS PROJECT d.o.o. • Croatia
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
