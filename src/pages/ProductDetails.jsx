import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import useTitle from "../hooks/useTitle";
import { API_BASE } from "../utils/api";

const normalizeProduct = (p) => ({
  _id: p?._id || p?.id,
  title: p?.title || p?.name || p?.productName || "Untitled",
  coverPhoto: p?.coverPhoto || p?.image || p?.productImage || "",
  category: p?.category || "General",
  description: p?.description || "",
  rating: p?.rating ?? "N/A",
  quantity: p?.quantity ?? 0,
  price: p?.price ?? 0,
  promoVideo: p?.promoVideo || p?.video || "",
});

export default function ProductDetails() {
  useTitle("Product Details");
  const { id } = useParams();
  const nav = useNavigate();

  // ✅ safe context (null crash prevent)
  const ctx = useContext(AuthContext);
  const user = ctx?.user || null;

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

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

    // ✅ login required only for import
    if (!user) {
      toast.error("Login required to import");
      nav("/login", { state: { from: `/products/${id}` } });
      return;
    }

    const importQty = Number(qty);
    if (!importQty || importQty <= 0) return toast.error("Invalid qty");

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

      toast.success("Imported!");
      await reload(); // ✅ update qty UI
    } catch {
      toast.error("Import failed");
    }
  };

  if (loading) return <div className="card p-6">Loading...</div>;
  if (!p?._id) return <div className="card p-6">Not found</div>;

  return (
    <div className="card p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.coverPhoto || "https://i.ibb.co/0jZQZ7W/user.png"}
          alt={p.title}
          className="w-full h-64 md:h-full object-cover rounded-2xl border border-black/10 dark:border-white/10"
        />

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{p.title}</h1>
          <p className="text-muted mt-2">{p.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge badge-outline">Category: {p.category}</span>
            <span className="badge badge-outline">Rating: {p.rating}</span>
            <span className="badge badge-outline">Qty: {p.quantity}</span>
            <span className="badge badge-outline">৳ {p.price}</span>
          </div>

          <div className="mt-6 card p-5">
            <h3 className="font-extrabold">Import this product</h3>

            <div className="mt-3 flex gap-3 items-center">
              <input
                className="inp"
                type="number"
                min="1"
                max={Number(p.quantity || 0)}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{ maxWidth: 120 }}
              />
              <button
                className="btn btn-primary"
                onClick={handleImport}
                disabled={Number(qty) > Number(p.quantity || 0)}
              >
                Import Now
              </button>
            </div>
            {Number(qty) > Number(p.quantity || 0) && (
              <p className="text-xs text-error mt-2">
                Quantity exceeds available stock. Reduce the amount.
              </p>
            )}

            {!user && (
              <p className="text-xs text-muted mt-2">
                Details page public ✅. Import requires login ✅
              </p>
            )}
          </div>

          {!!p.promoVideo && (
            <div className="mt-6">
              <video
                src={p.promoVideo}
                controls
                className="w-full rounded-2xl border border-black/10 dark:border-white/10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
