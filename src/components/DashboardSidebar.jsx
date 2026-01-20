import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function DashboardSidebar({ open, setOpen }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard Home", role: "user" },
    { path: "/dashboard/my-exports", icon: "📤", label: "My Exports", role: "user" },
    { path: "/dashboard/add-export", icon: "➕", label: "Add Export", role: "user" },
    { path: "/dashboard/my-imports", icon: "📥", label: "My Imports", role: "user" },
    { path: "/dashboard/profile", icon: "👤", label: "Profile", role: "user" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-white dark:bg-gray-800 border-r border-base-300 dark:border-gray-700 z-40 transform transition-transform duration-300 lg:transform-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-base-300 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center gap-2 font-extrabold text-primary">
            <span className="text-2xl">⚡</span>
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-base-content hover:bg-base-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 dark:border-gray-700 bg-base-100 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.displayName || "User"}</p>
              <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
