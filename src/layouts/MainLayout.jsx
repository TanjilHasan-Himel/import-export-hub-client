import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const Main = () => {
    return (
        <div>
            <Navbar />
            {/* This div pushes content down so it's not hidden behind the fixed navbar */}
            <div className="pt-20 min-h-screen">
                <Outlet />
            </div>
            <Footer />
            <Toaster />
        </div>
    );
};
export default Main;