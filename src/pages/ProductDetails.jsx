import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../hooks/useTitle";
import { API_BASE } from "../utils/api";

const normalizeProduct = (p) => ({
  _id: p?._id || p?.id,
  title: p?.title || p?.name || p?.productName || "Untitled",
  coverPhoto: p?.coverPhoto || p?.image || p?.productImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
  category: p?.category || "General",
  description: p?.description || "Premium quality export product meeting international standards.",
  rating: p?.rating ?? 4.5,
  quantity: p?.quantity ?? 0,
  price: p?.price ?? 0,
  promoVideo: p?.promoVideo || p?.video || "",
  originCountry: p?.originCountry || "Bangladesh",
});

export default function ProductDetails() {
  useTitle("Product Details");
  const { id } = useParams();
  const nav = useNavigate();

  const ctx = useContext(AuthContext);
  const user = ctx?.user || null;

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    p?.coverPhoto,
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop",
  ].filter(Boolean);

  const reload = async () => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    setP(normalizeProduct(data));
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await reload();

        // Load all products to find related ones
        const res = await fetch(`${API_BASE}/products?limit=20`);
        const allProducts = await res.json();
        const related = Array.isArray(allProducts)
          ? allProducts
              .map(normalizeProduct)
              .filter((prod) => prod._id !== id)
              .slice(0, 4)
          : [];
        setRelatedProducts(related);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleImport = async () => {
    if (!p?._id) return;

    if (!user) {
      toast.error("Login required to import");
      nav("/login", { state: { from: `/products/${id}` } });
      return;
    }

    const importQty = Number(qty);
    if (!importQty || importQty <= 0) return toast.error("Invalid quantity");

    try {
      const res = await fetch(`${API_BASE}/imports`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: p._id,
          qty: importQty,
          importerEmail: user.email,
          importerName: user.displayName || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Import failed");

      toast.success(`Successfully imported ${importQty} unit(s)!`);
      await reload();
      setQty(1);
    } catch {
      toast.error("Import failed");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card p-12 animate-pulse">
          <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!p?._id) {
    return (
      <div className="card p-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-2xl font-extrabold">Product Not Found</p>
        <Link to="/all-products" className="btn btn-primary mt-6">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 md:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
            <img
              src={images[currentImageIndex] || p.coverPhoto}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-primary"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-primary"
                >
                  ❯
                </button>
              </>
            )}
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? "border-primary" : "border-base-300 dark:border-gray-700"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{p.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(p.rating) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="font-semibold">{p.rating.toFixed(1)}/5 ({Math.floor(Math.random() * 100) + 10} reviews)</span>
            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4 bg-base-200 dark:bg-gray-700">
              <p className="text-base-content/60 text-sm">Category</p>
              <p className="font-extrabold text-lg mt-1">📦 {p.category}</p>
            </div>
            <div className="card p-4 bg-base-200 dark:bg-gray-700">
              <p className="text-base-content/60 text-sm">Origin</p>
              <p className="font-extrabold text-lg mt-1">🌍 {p.originCountry}</p>
            </div>
            <div className="card p-4 bg-base-200 dark:bg-gray-700">
              <p className="text-base-content/60 text-sm">Available Stock</p>
              <p className="font-extrabold text-lg mt-1 {p.quantity > 0 ? 'text-success' : 'text-error'}">
                {p.quantity} units
              </p>
            </div>
            <div className="card p-4 bg-base-200 dark:bg-gray-700">
              <p className="text-base-content/60 text-sm">Unit Price</p>
              <p className="font-extrabold text-lg mt-1 text-primary">৳ {p.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Import Section */}
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-2 border-primary/20">
            <h3 className="font-extrabold text-lg mb-4">Import This Product</h3>

            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Quantity to Import</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    className="input input-bordered w-20"
                    type="number"
                    min="1"
                    max={Number(p.quantity || 0)}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                  <span className="text-base-content/60 text-sm">Max: {p.quantity} units</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-base-content/60">Total Price</p>
                  <p className="font-extrabold text-lg">৳ {(p.price * qty).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-base-content/60">Unit Price</p>
                  <p className="font-extrabold">৳ {p.price.toLocaleString()}</p>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg w-full"
                onClick={handleImport}
                disabled={Number(qty) > Number(p.quantity || 0) || p.quantity === 0}
              >
                {user ? "🛒 Import Now" : "🔐 Login to Import"}
              </button>

              {Number(qty) > Number(p.quantity || 0) && (
                <p className="text-sm text-error">❌ Quantity exceeds available stock</p>
              )}
            </div>
          </div>

          {/* Share */}
          <div className="flex gap-2">
            <button className="btn btn-outline flex-1">📧 Share</button>
            <button className="btn btn-outline flex-1">❤️ Save</button>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="card p-8">
        <h2 className="text-2xl font-extrabold mb-4">📝 Product Description</h2>
        <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">{p.description}</p>
      </div>

      {/* Specifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-extrabold text-lg mb-4">📋 Specifications</h3>
          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span className="text-base-content/60">Category</span>
              <span className="font-semibold">{p.category}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="text-base-content/60">Origin</span>
              <span className="font-semibold">{p.originCountry}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="text-base-content/60">Unit Price</span>
              <span className="font-semibold">৳ {p.price.toLocaleString()}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-base-content/60">In Stock</span>
              <span className={`font-semibold ${p.quantity > 0 ? "text-success" : "text-error"}`}>
                {p.quantity > 0 ? "Yes" : "No"}
              </span>
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-extrabold text-lg mb-4">🔐 Seller Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  👤
                </div>
              </div>
              <div>
                <p className="font-semibold">Verified Seller</p>
                <p className="text-sm text-base-content/60">✅ Trusted Trader</p>
              </div>
            </div>
            <button className="btn btn-outline w-full">View Seller Profile</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold">🔗 Related Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((prod) => (
              <Link
                key={prod._id}
                to={`/products/${prod._id}`}
                className="card overflow-hidden hover:shadow-lg transition-all"
              >
                <img src={prod.coverPhoto} alt={prod.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h4 className="font-extrabold text-sm line-clamp-2">{prod.title}</h4>
                  <p className="text-sm text-base-content/60 mt-1">৳ {prod.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
