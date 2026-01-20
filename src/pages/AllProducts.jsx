import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { API_BASE } from "../utils/api";
import { CardSkeleton } from "../utils/skeleton";

const normalizeProduct = (p) => ({
  _id: p?._id || p?.id,
  title: p?.title || p?.name || p?.productName || "Untitled",
  coverPhoto: p?.coverPhoto || p?.image || p?.productImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  category: p?.category || p?.type || "General",
  rating: p?.rating ?? 0,
  quantity: p?.quantity ?? p?.qty ?? 0,
  price: p?.price ?? 0,
  createdAt: p?.createdAt || new Date(),
});

export default function AllProducts() {
  useTitle("All Products");
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [priceRange, setPriceRange] = useState("all");

  const categories = ["all", "Seafood", "Agriculture", "Textiles", "Industrial", "Home", "Electronics"];
  const priceRanges = {
    all: [0, Infinity],
    "0-500": [0, 500],
    "500-2000": [500, 2000],
    "2000-5000": [2000, 5000],
    "5000+": [5000, Infinity],
  };

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
    let result = items;

    // Search filter
    const s = q.trim().toLowerCase();
    if (s) {
      result = result.filter((p) => p.title.toLowerCase().includes(s));
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price filter
    const [minPrice, maxPrice] = priceRanges[priceRange] || [0, Infinity];
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sorting
    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "quantity") {
      result.sort((a, b) => b.quantity - a.quantity);
    }

    return result;
  }, [items, q, category, sortBy, priceRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">Browse All Products 🌍</h1>
        <p className="text-base-content/60 mt-2">Find the perfect products for your import/export business</p>
      </div>

      {/* Filters Section */}
      <div className="card bg-white dark:bg-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">🔍 Search</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">📦 Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">💰 Price Range</span>
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Prices</option>
              <option value="0-500">৳0 - ৳500</option>
              <option value="500-2000">৳500 - ৳2000</option>
              <option value="2000-5000">৳2000 - ৳5000</option>
              <option value="5000+">৳5000+</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">⬇️ Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="quantity">Most Stock</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 text-sm text-base-content/60">
          Found <strong>{filtered.length}</strong> products
          {q && ` matching "${q}"`}
          {category !== "all" && ` in ${category}`}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-2xl font-extrabold mb-2">No Products Found</p>
          <p className="text-base-content/60">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="card bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/20 h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  src={p.coverPhoto}
                  alt={p.title}
                />
                <div className="absolute top-3 right-3 badge badge-primary">
                  ⭐ {p.rating.toFixed(1)}
                </div>
                <div className="absolute bottom-3 left-3 badge badge-secondary">
                  {p.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-extrabold text-base md:text-lg line-clamp-2">{p.title}</h3>
                <p className="text-xs text-base-content/50 mt-1">Stock: {p.quantity} units</p>
                <p className="font-extrabold text-lg mt-2 text-primary">৳ {p.price.toLocaleString()}</p>

                <Link className="btn btn-sm btn-primary mt-auto" to={`/products/${p._id}`}>
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

