import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import useTheme from "../hooks/useTheme";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-bold transition ${
    isActive ? "bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/15" : "hover:bg-black/10 dark:hover:bg-white/10"
  }`;

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggle } = useTheme();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch (e) {
      toast.error(e?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#070A10]/70 backdrop-blur">
      <div className="container-max flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/vite.svg" className="h-7 w-7" alt="logo" />
          <span className="font-extrabold tracking-wide">
            ImportExportHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/all-products" className={linkClass}>All Products</NavLink>
          <NavLink to="/add-export" className={linkClass}>Add Export</NavLink>
          <NavLink to="/my-exports" className={linkClass}>My Exports</NavLink>
          <NavLink to="/my-imports" className={linkClass}>My Imports</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn" onClick={toggle} title="Toggle theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {!user ? (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          ) : (
            <>
              <button className="btn" onClick={handleLogout}>Logout</button>
              <img
                src={user.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
                className="h-10 w-10 rounded-full border border-black/10 dark:border-white/20 object-cover"
                alt="user"
                title={user.displayName || user.email}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
