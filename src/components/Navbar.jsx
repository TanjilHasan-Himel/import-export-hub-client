import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-white/70 hover:text-white transition";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A10]/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-green-400" />
          <span className="font-black tracking-wide">ImportExportHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>All Products</NavLink>
          <NavLink to="/my-imports" className={navLinkClass}>My Imports</NavLink>
          <NavLink to="/my-exports" className={navLinkClass}>My Exports</NavLink>
          <NavLink to="/add-export" className={navLinkClass}>Add Export</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link className="btn-outline hidden sm:inline-flex" to="/login">
            Login
          </Link>
          <Link className="btn-primary" to="/products">
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
