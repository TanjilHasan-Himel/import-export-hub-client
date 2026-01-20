import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-base-300 dark:border-gray-700 px-4 py-3 flex items-center justify-between gap-4">
      {/* Left: Hamburger + Logo + Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden btn btn-sm btn-ghost"
        >
          ☰
        </button>
        <Link 
          to="/" 
          className="btn btn-sm btn-ghost gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Back to Home"
        >
          <span>←</span>
          <span className="hidden md:inline">Back to Site</span>
        </Link>
      </div>

      {/* Right: Profile Dropdown */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => {
            const root = document.documentElement;
            const cur = root.getAttribute("data-theme") || "light";
            const next = cur === "light" ? "night" : "light";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
          }}
        >
          {typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "night" ? "☀️" : "🌙"}
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="flex items-center gap-2 hover:bg-base-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all"
          >
            <img
              src={user?.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
              alt={user?.displayName || "User"}
              className="w-8 h-8 rounded-full border border-primary/30"
            />
            <span className="hidden sm:inline font-semibold text-sm text-gray-900 dark:text-white">{user?.displayName?.split(" ")[0] || "User"}</span>
            <span className="text-lg text-gray-900 dark:text-white">▼</span>
          </button>

          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 dark:bg-gray-800 rounded-lg w-52 border border-base-300 dark:border-gray-700">
            <li>
              <Link to="/dashboard/profile" className="flex gap-2 text-gray-900 dark:text-white">
                👤 My Profile
              </Link>
            </li>
            <li>
              <Link to="/" className="flex gap-2 text-gray-900 dark:text-white">
                🏠 Home
              </Link>
            </li>
            <li>
              <a href="#" className="flex gap-2 text-gray-900 dark:text-white">
                ⚙️ Settings
              </a>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <a
                onClick={() => logOut()}
                className="text-red-600 flex gap-2"
              >
                🚪 Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
