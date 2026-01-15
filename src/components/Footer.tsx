import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-16 sm:pt-20 lg:pt-24 pb-8 overflow-hidden font-mono">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content - Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-16 lg:mb-24">
            
            {/* Column 1 - Solutions */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                SOLUTIONS
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/search-companies" className="text-sm text-white/60 hover:text-white transition-colors">
                    Search Companies
                  </Link>
                </li>
                <li>
                  <Link to="/audit-suppliers" className="text-sm text-white/60 hover:text-white transition-colors">
                    Audit Suppliers
                  </Link>
                </li>
                <li>
                  <Link to="/become-visible" className="text-sm text-white/60 hover:text-white transition-colors">
                    Become Visible
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                PRODUCT
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/search-suppliers" className="text-sm text-white/60 hover:text-white transition-colors">
                    YVOO Search
                  </Link>
                </li>
                <li>
                  <Link to="/ground-intelligence" className="text-sm text-white/60 hover:text-white transition-colors">
                    Ground Intelligence
                  </Link>
                </li>
                <li>
                  <Link to="/scanpro-plus" className="text-sm text-white/60 hover:text-white transition-colors">
                    ScanPro+
                  </Link>
                </li>
                <li>
                  <Link to="/be-found" className="text-sm text-white/60 hover:text-white transition-colors">
                    Be Found
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                RESOURCES
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/technology" className="text-sm text-white/60 hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-sm text-white/60 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-white/60 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Company */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                COMPANY
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about-us" className="text-sm text-white/60 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-sm text-white/60 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="text-sm text-white/60 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 & 6 - Newsletter Signup */}
            <div className="col-span-2">
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                NEWSLETTER
              </h4>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Get the latest news and updates delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Work Email"
                  className="flex-1 bg-transparent border border-white/30 text-white placeholder:text-white/40 px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-white/60 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 border border-white text-white text-sm font-mono hover:bg-white hover:text-black transition-colors"
                >
                  Subscribe
                </button>
              </form>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-6">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Large YVOO Logo - Bottom Left */}
          <div className="relative mb-8">
            <svg 
              width="400" 
              height="130" 
              viewBox="0 0 130 42" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[280px] sm:w-[350px] lg:w-[400px] h-auto text-white/20"
            >
              <path d="M19.9866 30.464L17.1507 21.145C15.4234 15.4838 10.2157 11.6128 4.31185 11.6128H0V17.0542H3.59643C6.90928 17.0542 9.8483 19.174 10.9053 22.3212L14.3213 32.4738H20.4958V30.4705H19.9866V30.464Z" fill="currentColor"/>
              <path d="M22.9187 42L33.0119 11.6455H25.9415L20.1988 30.4903L19.7992 31.6277L17.002 40.029L22.9187 42Z" fill="currentColor"/>
              <path d="M125.901 21.2681L130 8.94405L129.968 8.93113L124.051 6.96005L119.295 21.2681H125.901Z" fill="currentColor"/>
              <path d="M41.8483 11.6455L47.591 30.4967H47.8037L53.54 11.6455H60.4815L51.8191 37.3793H43.5628L34.9004 11.6455H41.8419H41.8483Z" fill="currentColor"/>
              <path d="M117.315 24.4803C117.315 27.4853 116.742 30.0251 115.588 32.1125C114.434 34.1999 112.881 35.7832 110.915 36.8689C108.956 37.9546 106.752 38.4975 104.315 38.4975C101.879 38.4975 99.6682 37.9482 97.7089 36.856C95.7495 35.7638 94.1962 34.1741 93.049 32.0931C91.9017 30.0122 91.3281 27.4724 91.3281 24.4803C91.3281 21.4881 91.9017 18.9354 93.049 16.848C94.1962 14.7606 95.7495 13.1773 97.7089 12.0916C99.6682 11.0059 101.866 10.463 104.315 10.463C106.764 10.463 108.949 11.0059 110.915 12.0916C112.874 13.1773 114.434 14.7606 115.588 16.848C116.742 18.9354 117.315 21.4817 117.315 24.4803ZM110.593 24.4803C110.593 22.7031 110.342 21.2038 109.839 19.9759C109.336 18.748 108.621 17.8239 107.686 17.1905C106.752 16.5572 105.63 16.247 104.315 16.247C103 16.247 101.892 16.5637 100.951 17.1905C100.01 17.8239 99.2944 18.748 98.7917 19.9759C98.289 21.2038 98.044 22.7031 98.044 24.4803C98.044 26.2575 98.2954 27.7568 98.7917 28.9847C99.2944 30.2125 100.01 31.1367 100.951 31.77C101.892 32.4033 103.013 32.7135 104.315 32.7135C105.617 32.7135 106.752 32.3969 107.686 31.77C108.621 31.1367 109.336 30.2125 109.839 28.9847C110.342 27.7568 110.593 26.2575 110.593 24.4803Z" fill="currentColor"/>
              <path d="M71.3814 37.3792C71.8132 36.6167 72.361 36.0092 73.0249 35.5633C73.9079 34.9687 74.9649 34.6714 76.1959 34.6714C77.427 34.6714 78.4904 34.9687 79.3734 35.5633C80.0373 36.0092 80.5787 36.6167 81.0105 37.3792H87.7264C87.4815 36.6167 87.185 35.8993 86.8177 35.2401C85.7284 33.2691 84.2653 31.7762 82.4156 30.7552C80.5658 29.7341 78.4904 29.2235 76.1959 29.2235C73.9014 29.2235 71.8132 29.7341 69.9698 30.7552C68.1265 31.7762 66.657 33.2755 65.5742 35.2401C65.2068 35.9058 64.9103 36.6231 64.6719 37.3792H71.3814Z" fill="currentColor"/>
              <path d="M89.1961 14.0172C89.1961 17.0223 88.6225 19.5621 87.4688 21.6495C86.3151 23.7369 84.7618 25.3202 82.796 26.4059C80.8367 27.4916 78.6324 28.0345 76.1961 28.0345C73.7598 28.0345 71.5491 27.4851 69.5898 26.393C67.6304 25.3008 66.0771 23.711 64.9299 21.6301C63.7826 19.5492 63.209 17.0094 63.209 14.0172C63.209 11.0251 63.7826 8.47237 64.9299 6.38498C66.0771 4.29758 67.6304 2.71426 69.5898 1.62856C71.5491 0.542852 73.7469 0 76.1961 0C78.6453 0 80.8302 0.542852 82.796 1.62856C84.7554 2.71426 86.3151 4.29758 87.4688 6.38498C88.6225 8.47237 89.1961 11.0186 89.1961 14.0172ZM82.4673 14.0172C82.4673 12.24 82.2159 10.7407 81.7132 9.51284C81.2105 8.28496 80.4951 7.36082 79.5605 6.72749C78.626 6.09416 77.5045 5.78396 76.1897 5.78396C74.8748 5.78396 73.7662 6.10063 72.8252 6.72749C71.8842 7.36082 71.1688 8.28496 70.6661 9.51284C70.1634 10.7407 69.9185 12.24 69.9185 14.0172C69.9185 15.7944 70.1698 17.2937 70.6661 18.5216C71.1688 19.7495 71.8842 20.6736 72.8252 21.307C73.7662 21.9403 74.8877 22.2505 76.1897 22.2505C77.4916 22.2505 78.626 21.9338 79.5605 21.307C80.4951 20.6801 81.2105 19.7495 81.7132 18.5216C82.2159 17.2937 82.4673 15.7944 82.4673 14.0172Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Footer Bottom - Copyright & Legal */}
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 text-sm text-white/40">
            <span>© YVOO</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              SaaS Terms
            </Link>
            <Link to="/imprint" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
