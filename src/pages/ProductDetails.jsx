import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/products/${id}`);
        const data = await res.json();
        setP(data);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleImport = async () => {
    // ✅ login required only for import
    if (!user) {
      toast.error("Login required to import");
      nav("/login", { state: { from: `/products/${id}` } });
      return;
    }

    try {
      const res = await fetch(`${API}/imports`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productId: p._id,
          qty: Number(qty),
          importerEmail: user.email,
          importerName: user.displayName || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Import failed");

      toast.success("Imported!");
      // reload details
      const again = await fetch(`${API}/products/${id}`);
      setP(await again.json());
    } catch {
      toast.error("Import failed");
    }
  };

  if (loading) return <div className="card p-6 text-white">Loading...</div>;
  if (!p?._id) return <div className="card p-6 text-white">Not found</div>;

  return (
    <div className="card p-6 md:p-8 text-white">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={p.coverPhoto}
          alt={p.title}
          className="w-full h-64 md:h-full object-cover rounded-2xl border border-white/10"
        />

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{p.title}</h1>
          <p className="text-white/70 mt-2">{p.description}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="btn">Category: {p.category}</span>
            <span className="btn">Rating: {p.rating}</span>
            <span className="btn">Qty: {p.quantity}</span>
            <span className="btn">Price: ৳ {p.price}</span>
          </div>

          <div className="mt-6 card p-5">
            <h3 className="font-extrabold">Import this product</h3>
            <div className="mt-3 flex gap-3 items-center">
              <input
                className="inp"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{ maxWidth: 120 }}
              />
              <button className="btn btn-primary" onClick={handleImport}>
                Import Now
              </button>
            </div>
            <p className="text-white/60 text-xs mt-2">
              (Details page public ✅, Import requires login ✅)
            </p>
          </div>

          {p.promoVideo && (
            <div className="mt-6">
              <video
                src={p.promoVideo}
                controls
                className="w-full rounded-2xl border border-white/10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
