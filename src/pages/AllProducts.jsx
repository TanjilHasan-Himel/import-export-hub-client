import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "ImportExportHub | All Products";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const url =
          search.trim().length > 0
            ? `${API}/products?search=${encodeURIComponent(search)}`
            : `${API}/products`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            All Products
          </h1>
          <p className="text-white/70 mt-1">
            Search and explore all listed products.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[360px] px-4 py-3 rounded-xl bg-[#0b0f17] border border-white/10 outline-none focus:border-green-400 text-white"
          placeholder="Search by product name..."
        />
      </div>

      {loading ? (
        <div className="card p-6 text-white/80">Loading...</div>
      ) : products.length === 0 ? (
        <div className="card p-6 text-white/80">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
