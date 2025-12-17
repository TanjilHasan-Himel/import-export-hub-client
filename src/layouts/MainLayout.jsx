import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    // 1. Root wrapper: 'flex-col' ensures elements stack vertically
    <div className="min-h-screen bg-grid flex flex-col">
      
      <Navbar />
      
      {/* 2. Main: 'flex-grow' pushes the Footer down if content is short */}
      <main className="container-max py-6 flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* 3. Toaster added here to be accessible globally */}
      <Toaster position="top-center" />
      
    </div>
  );
}