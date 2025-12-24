import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroVideo from "../components/HeroVideo";
import toast from "react-hot-toast";
import { API_BASE } from "../utils/api";

function ProductCard({ p }) {
  const title = p.name || p.title || "Untitled";
  const img = p.image || p.coverPhoto || "/images/hero-1.jpg";
  const country = p.originCountry || p.category || "Unknown";
  const rating = p.rating ?? 0;
  const qty = p.quantity ?? 0;
  const price = p.price ?? 0;
  const id = p._id || p.id;

  return (
    <div className="cardx overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-primary/30">
      <img className="h-44 w-full object-cover" src={img} alt={title} />
      <div className="p-5">
        <h3 className="font-extrabold text-lg">{title}</h3>
        <p className="text-sm text-base-content/70 mt-1">
          {country} • Rating {rating} • Qty {qty}
        </p>
        <p className="font-bold mt-2">৳ {price}</p>

        <Link className="btn btn-outline btn-sm mt-4" to={`/products/${id}`}>
          See Details
        </Link>
      </div>
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
        const res = await fetch(`${API_BASE}/products?limit=6&sort=latest`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data");
        setLatest(data);
      } catch (e) {
        toast.error("Failed to load latest products");
        setLatest([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-10">
      <HeroVideo />

      {/* Latest */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Latest Products
            </h2>
            <p className="text-base-content/70 mt-1">
              Most recent products, sorted by newest first.
            </p>
          </div>
          <Link className="btn btn-outline" to="/all-products">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="cardx p-6">Loading...</div>
        ) : latest.length === 0 ? (
          <div className="cardx p-6">
            No products found. (Check MongoDB products collection)
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((p) => (
              <ProductCard key={p._id || p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="cardx p-6">
          <h3 className="font-extrabold text-lg">Fast Search</h3>
          <p className="text-base-content/70 mt-2 text-sm">
            Find products quickly with clean filtering & sorting.
          </p>
        </div>
        <div className="cardx p-6">
          <h3 className="font-extrabold text-lg">Trusted Data</h3>
          <p className="text-base-content/70 mt-2 text-sm">
            Consistent UI, clear product info, and secure user flows.
          </p>
        </div>
        <div className="cardx p-6">
          <h3 className="font-extrabold text-lg">Smooth Workflow</h3>
          <p className="text-base-content/70 mt-2 text-sm">
            Export, import, and manage quantities without confusion.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="cardx p-6 md:p-10">
        <h3 className="font-extrabold text-2xl">How it works</h3>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <div className="cardx p-5">
            <p className="font-bold">1) Browse</p>
            <p className="text-base-content/70 text-sm mt-2">
              Explore all products with essential trade info.
            </p>
          </div>
          <div className="cardx p-5">
            <p className="font-bold">2) Import</p>
            <p className="text-base-content/70 text-sm mt-2">
              Import with quantity limit protection.
            </p>
          </div>
          <div className="cardx p-5">
            <p className="font-bold">3) Manage</p>
            <p className="text-base-content/70 text-sm mt-2">
              Track imports/exports with update & delete controls.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
