import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const pickImage = (p) => p.coverPhoto || p.image || p.productImage || "";
const pickName = (p) => p.title || p.name || p.productName || "Untitled";
const pickOrigin = (p) => p.originCountry || p.origin || p.country || "Unknown";

export default function AllProducts() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "ImportExportHub | All Products";
    (async () => {
      const res = await fetch(`${API}/products?sort=latest`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) =>
      (pickName(p) + " " + (p.category || "") + " " + pickOrigin(p))
        .toLowerCase()
        .includes(s)
    );
  }, [items, q]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            All Products
          </h2>
          <p className="text-white/70 mt-1">Browse everything.</p>
        </div>
        <input
          className="btn"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p._id} className="card p-4 flex flex-col">
            <img
              src={pickImage(p)}
              alt={pickName(p)}
              className="h-44 w-full object-cover rounded-xl border border-white/10"
            />
            <div className="mt-4 flex-1">
              <h3 className="text-white font-extrabold text-lg">{pickName(p)}</h3>
              <p className="text-white/70 text-sm mt-1">
                {pickOrigin(p)} • Rating {p.rating ?? "N/A"} • Qty {p.quantity ?? 0}
              </p>
              <p className="text-white font-bold mt-2">৳ {p.price ?? 0}</p>
            </div>
            <Link className="btn mt-4" to={`/products/${p._id}`}>
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
