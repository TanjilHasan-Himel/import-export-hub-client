import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Handle Theme Switch
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggle = (e) => {
        setTheme(e.target.checked ? "night" : "light");
    }

    const navLinks = <>
        <li><NavLink to="/" className={({isActive}) => isActive ? "text-secondary font-bold" : "hover:text-secondary"}>Marketplace</NavLink></li>
        <li><NavLink to="/all-products" className={({isActive}) => isActive ? "text-secondary font-bold" : "hover:text-secondary"}>Browse Cargo</NavLink></li>
        {user && <>
            <li><NavLink to="/add-export" className={({isActive}) => isActive ? "text-secondary font-bold" : "hover:text-secondary"}>List Shipment</NavLink></li>
            <li><NavLink to="/my-exports" className={({isActive}) => isActive ? "text-secondary font-bold" : "hover:text-secondary"}>My Listings</NavLink></li>
            <li><NavLink to="/my-imports" className={({isActive}) => isActive ? "text-secondary font-bold" : "hover:text-secondary"}>My Warehouse</NavLink></li>
        </>}
    </>

    return (
        <div className="navbar bg-white text-slate-800 shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-2xl font-extrabold tracking-tight text-corporate-900">
                    <span className="text-secondary">Trade</span>Xport
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium text-sm uppercase tracking-wide">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {/* Theme Toggle */}
                <label className="cursor-pointer grid place-items-center">
                    <input type="checkbox" onChange={handleToggle} checked={theme === "night"} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>

                {user ? (
                    <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-bold text-gray-900">{user.displayName}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Verified Trader</p>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img alt="User" src={user.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><a onClick={() => logOut()}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm px-6 rounded-sm font-bold uppercase">Log In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;