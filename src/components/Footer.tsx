import { Link } from "react-router-dom";
import { useState } from "react";


const Footer = () => {
  const [email, setEmail] = useState("");
  

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing:", email);
    setEmail("");
  };

  const linkClass = "text-sm text-white/60 hover:text-white transition-colors";
  const placeholderClass = "text-sm text-white/30 cursor-default";

  return (
    <footer className="relative bg-[#1a1a1a] text-white pt-16 sm:pt-20 lg:pt-24 pb-8 overflow-hidden font-mono">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Row 1: For Buyers · For Suppliers · For Auditors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* For Buyers */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                For Buyers
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className={linkClass}>
                    Supplier Audits ★
                  </Link>
                </li>
                <li>
                  <Link to="/search-suppliers" className={linkClass}>
                    Supplier Search
                  </Link>
                </li>
                <li>
                  <Link to="/features" className={linkClass}>
                    All Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Suppliers */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                For Suppliers
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/be-found" className={linkClass}>
                    Be Found
                  </Link>
                </li>
                <li>
                  <span className={placeholderClass}>Get Verified</span>
                </li>
                <li>
                  <span className={placeholderClass}>Marketplace</span>
                </li>
              </ul>
            </div>

            {/* For Auditors */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                For Auditors
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/auditors" className={linkClass}>
                    Join Network
                  </Link>
                </li>
                <li>
                  <span className={placeholderClass}>How It Works</span>
                </li>
                <li>
                  <Link to="/features" className={linkClass}>
                    Atlas AI
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: Company · Resources · Legal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Company */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about-us" className={linkClass}>
                    About
                  </Link>
                </li>
                <li>
                  <span className={placeholderClass}>Contact</span>
                </li>
                <li>
                  <span className={placeholderClass}>How It Works</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/customer-stories" className={linkClass}>
                    Case Studies
                  </Link>
                </li>
                <li>
                  <span className={placeholderClass}>Blog</span>
                </li>
                <li>
                  <span className={placeholderClass}>Help</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className={placeholderClass}>Privacy</span>
                </li>
                <li>
                  <span className={placeholderClass}>Terms</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter + Social */}
          <div className="border-t border-white/10 pt-10 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">
                  Newsletter
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
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
                    className="px-6 py-2.5 border border-white text-white text-sm font-mono hover:bg-white hover:text-foreground transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 lg:justify-end">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>

           <div className="relative mb-8">
             <span className="text-[280px] sm:text-[350px] lg:text-[400px] font-black tracking-tighter text-white/20 leading-none select-none">
               HILTI
             </span>
           </div>

          {/* Footer Bottom - Copyright & Legal */}
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 text-sm text-white/40">
            <span>© Hilti</span>
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">SaaS Terms</span>
            <span className="cursor-default">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
