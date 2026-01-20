import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mt-20">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold mb-4 text-white drop-shadow-lg">Stay Updated</h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto drop-shadow-md">
              Get the latest export/import opportunities and market insights delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button type="submit" className="btn btn-primary px-6">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="text-xl font-extrabold mb-4 text-primary">
              <span className="text-2xl">⚡</span> ImportExportHub
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Connecting global traders and facilitating seamless import-export transactions.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-xl">
                f
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-xl">
                𝕏
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-xl">
                in
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-xl">
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-extrabold mb-4 text-gray-900 dark:text-white">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-products" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-extrabold mb-4 text-gray-900 dark:text-white">Resources</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="tel:+8801700000000" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm">
                  Phone: +880-1700-000000
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-extrabold mb-4 text-gray-900 dark:text-white">Contact</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@importexportbub.com" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors break-words">
                  support@importexportbub.com
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                📍 Dhaka, Bangladesh
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                🕐 Mon - Fri: 9 AM - 6 PM
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                🕐 Sat - Sun: Closed
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
          <p>&copy; {currentYear} ImportExportHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

