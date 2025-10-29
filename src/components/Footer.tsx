import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content - 4 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1 - Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 tracking-wide">Connectimus</h3>
              <address className="not-italic text-sm text-gray-400 leading-relaxed font-medium">
                CONNECTIMUS PROJECT d.o.o.<br />
                Novotnijeva 12<br />
                10000 Zagreb, Croatia
              </address>
            </div>

            {/* Column 2 - Solutions */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/search-companies" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Search Companies
                  </Link>
                </li>
                <li>
                  <Link to="/audit-suppliers" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Audit Suppliers
                  </Link>
                </li>
                <li>
                  <Link to="/become-visible" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Become Visible
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/technology" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors font-medium">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/team" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Jobs & Career
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors font-medium">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom - Legal & Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-medium">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 tracking-wide">
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
              <div className="text-center md:text-right tracking-wide">
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
