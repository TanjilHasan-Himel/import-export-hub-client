import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const navClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg font-semibold transition-all ${isActive ? "bg-primary/10 text-primary" : "hover:bg-black/5 dark:hover:bg-white/10"}`;

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-primary">
          <span className="text-2xl">⚡</span>
          <span className="hidden sm:inline">ImportExportHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/all-products" className={navClass}>Browse Products</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
              <NavLink to="/dashboard/my-exports" className={navClass}>My Exports</NavLink>
              <NavLink to="/dashboard/my-imports" className={navClass}>My Imports</NavLink>
            </>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!user ? (
            <div className="flex gap-2">
              <Link className="btn btn-sm btn-ghost" to="/login">Login</Link>
              <Link className="btn btn-sm btn-primary" to="/register">Register</Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-primary/30"
                />
                <span className="hidden sm:inline font-semibold text-sm">{user.displayName?.split(" ")[0] || "User"}</span>
                <span className="hidden sm:inline text-lg">▼</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-2">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-primary/10 transition-all text-sm"
                    onClick={() => setProfileDropdown(false)}
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-primary/10 transition-all text-sm"
                    onClick={() => setProfileDropdown(false)}
                  >
                    📊 Dashboard
                  </Link>
                  <hr className="my-1 border-black/10 dark:border-white/10" />
                  <button
                    onClick={() => {
                      logOut();
                      setProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all text-sm font-semibold"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn btn-sm btn-ghost"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95">
          <div className="px-4 py-3 space-y-2">
            <NavLink to="/" className={`block ${navClass}`} onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/all-products" className={`block ${navClass}`} onClick={() => setMobileMenuOpen(false)}>
              Browse Products
            </NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" className={`block ${navClass}`} onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/dashboard/my-exports" className={`block ${navClass}`} onClick={() => setMobileMenuOpen(false)}>
                  My Exports
                </NavLink>
                <NavLink to="/dashboard/my-imports" className={`block ${navClass}`} onClick={() => setMobileMenuOpen(false)}>
                  My Imports
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme") || "light";
    const next = cur === "light" ? "night" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button className="btn btn-sm btn-ghost" onClick={toggle} title="Toggle dark mode">
      {typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "night" ? "☀️" : "🌙"}
    </button>
  );
}
