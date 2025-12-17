import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#070A10]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 bg-grid">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
