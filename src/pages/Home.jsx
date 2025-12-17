import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroVideo from "../components/HeroVideo";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductCard({ p }) {
  return (
    <div className="card p-4 flex flex-col">
      <img
        src={p.image}
        alt={p.name}
        className="h-44 w-full object-cover rounded-xl border border-white/10"
      />
      <div className="mt-4 flex-1">
        <h3 className="text-white font-extrabold text-lg">{p.name}</h3>
        <p className="text-white/70 text-sm mt-1">
          {p.originCountry} • Rating {p.rating} • Qty {p.quantity}
        </p>
        <p className="text-white font-bold mt-2">৳ {p.price}</p>
      </div>
      <Link className="btn mt-4" to={`/products/${p._id}`}>
        See Details
      </Link>
    </div>
  );
}

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ImportExportHub | Home";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/products/latest`);
        const data = await res.json();
        setLatest(data);
      } catch (e) {
        toast.error("Failed to load latest products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-10">
      <HeroVideo />

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Latest Products
            </h2>
            <p className="text-white/70 mt-1">
              Most recent products, sorted by newest first.
            </p>
          </div>
          <Link className="btn" to="/all-products">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="mt-6 card p-6 text-white/80">Loading...</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* Extra Section 1 */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="card p-6">
          <h3 className="text-white font-extrabold text-lg">Fast Search</h3>
          <p className="text-white/70 mt-2 text-sm">
            Find products quickly with clean filtering & sorting.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-white font-extrabold text-lg">Trusted Data</h3>
          <p className="text-white/70 mt-2 text-sm">
            Consistent UI, clear product info, and secure user flows.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-white font-extrabold text-lg">Smooth Workflow</h3>
          <p className="text-white/70 mt-2 text-sm">
            Export, import, and manage quantities without confusion.
          </p>
        </div>
      </section>

      {/* Extra Section 2 */}
      <section className="card p-6 md:p-10">
        <h3 className="text-white font-extrabold text-2xl">
          How it works
        </h3>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <div className="card p-5">
            <p className="text-white font-bold">1) Browse</p>
            <p className="text-white/70 text-sm mt-2">
              Explore all products with essential trade info.
            </p>
          </div>
          <div className="card p-5">
            <p className="text-white font-bold">2) Import</p>
            <p className="text-white/70 text-sm mt-2">
              Import with quantity limit protection.
            </p>
          </div>
          <div className="card p-5">
            <p className="text-white font-bold">3) Manage</p>
            <p className="text-white/70 text-sm mt-2">
              Track imports/exports with update & delete controls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
