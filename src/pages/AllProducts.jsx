import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AllProducts() {
  useTitle("All Products");
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/products?sort=latest`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => (p.title || "").toLowerCase().includes(s));
  }, [items, q]);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">All Products</h1>
        <p className="text-muted mt-1">Search by product title.</p>

        <div className="mt-4">
          <input
            className="inp"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p._id} className="card p-4 flex flex-col">
            <img
              src={p.coverPhoto}
              alt={p.title}
              className="h-44 w-full object-cover rounded-xl border border-black/10 dark:border-white/10"
            />
            <div className="mt-4 flex-1">
              <h3 className="font-extrabold text-lg">{p.title}</h3>
              <p className="text-muted text-sm mt-1">
                {p.category || "General"} • Rating {p.rating ?? "N/A"} • Qty {p.quantity ?? 0}
              </p>
              <p className="font-extrabold mt-2">৳ {p.price ?? 0}</p>
            </div>
            <Link className="btn mt-4" to={`/products/${p._id}`}>See Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
