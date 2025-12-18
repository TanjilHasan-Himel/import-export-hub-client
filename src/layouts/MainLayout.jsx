import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";

export default function MainLayout() {
  // just to init theme on load
  useTheme();

  return (
    <div className="min-h-screen bg-grid">
      <Navbar />
      <main className="container-max py-8">
        <Outlet />
      </main>
      
      <Footer />
      <Toaster position="top-center" />
    </div>
    
  );
}
