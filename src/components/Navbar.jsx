import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-xl text-sm font-semibold transition ${
    isActive ? "bg-white/10 border border-white/15" : "hover:bg-white/10"
  }`;

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out");
    } catch (e) {
      toast.error(e?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A10]/70 backdrop-blur">
      <div className="container-max flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/vite.svg" className="h-7 w-7" alt="logo" />
          <span className="text-white font-extrabold tracking-wide">
            ImportExportHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 text-white/90">
          <NavLink to="/all-products" className={linkClass}>All Products</NavLink>
          <NavLink to="/my-exports" className={linkClass}>My Exports</NavLink>
          <NavLink to="/my-imports" className={linkClass}>My Imports</NavLink>
          <NavLink to="/add-export" className={linkClass}>Add Export</NavLink>
        </nav>

        <div className="flex items-center gap-3">
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
                className="h-10 w-10 rounded-full border border-white/20 object-cover"
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
