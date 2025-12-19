import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const navClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg font-semibold ${isActive ? "bg-black/5 dark:bg-white/10" : ""}`;

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="w-full border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <span className="text-lg">⚡</span>
          <span>ImportExportHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/all-products" className={navClass}>All Products</NavLink>
          <NavLink to="/add-export" className={navClass}>Add Export</NavLink>
          <NavLink to="/my-exports" className={navClass}>My Exports</NavLink>
          <NavLink to="/my-imports" className={navClass}>My Imports</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!user ? (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
                  alt="user"
                  className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10"
                />
              </div>
              <button className="btn" onClick={logOut}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
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
    <button className="btn" onClick={toggle}>
      Dark
    </button>
  );
}
