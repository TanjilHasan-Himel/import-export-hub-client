import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { API_BASE } from "../utils/api";

// ✅ normalize: server data যেভাবেই আসুক (title/name, coverPhoto/image, quantity/qty)
const normalizeProduct = (p) => ({
  _id: p?._id || p?.id,
  title: p?.title || p?.name || p?.productName || "Untitled",
  coverPhoto: p?.coverPhoto || p?.image || p?.productImage || "",
  category: p?.category || p?.type || "General",
  rating: p?.rating ?? "N/A",
  quantity: p?.quantity ?? p?.qty ?? 0,
  price: p?.price ?? 0,
});

export default function AllProducts() {
  useTitle("All Products");
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products?sort=latest`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data.map(normalizeProduct) : [];
        setItems(arr.filter((x) => x._id));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => p.title.toLowerCase().includes(s));
  }, [items, q]);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">All Products</h1>
        <p className="text-muted mt-1">Search by title.</p>

        <div className="mt-4 flex gap-3">
          <input
            className="inp flex-1"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>

      {loading ? (
        <div className="card p-6">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p._id} className="card p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-primary/30">
              <img
                src={p.coverPhoto || "https://i.ibb.co/0jZQZ7W/user.png"}
                alt={p.title}
                className="h-44 w-full object-cover rounded-xl border border-black/10 dark:border-white/10 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="mt-4 flex-1">
                <h3 className="font-extrabold text-lg">{p.title}</h3>
                <p className="text-muted text-sm mt-1">
                  {p.category} • Rating {p.rating} • Qty {p.quantity}
                </p>
                <p className="font-extrabold mt-2">৳ {p.price}</p>
              </div>

              <Link className="btn mt-4" to={`/products/${p._id}`}>
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
