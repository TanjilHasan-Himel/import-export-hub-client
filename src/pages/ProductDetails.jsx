import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const pickImage = (p) => p.coverPhoto || p.image || p.productImage || "";
const pickName = (p) => p.title || p.name || p.productName || "Untitled";
const pickOrigin = (p) => p.originCountry || p.origin || p.country || "Unknown";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.title = "ImportExportHub | Details";
    (async () => {
      try {
        const res = await fetch(`${API}/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed");
        setP(data);
      } catch (e) {
        toast.error(e.message);
      }
    })();
  }, [id]);

  const handleImport = async () => {
    if (!p) return;

    const importQty = Number(qty);
    const available = Number(p.quantity || 0);

    if (!importQty || importQty <= 0) return toast.error("Qty invalid");
    if (importQty > available) return toast.error("Qty exceeds stock");

    try {
      const res = await fetch(`${API}/imports`, {
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
      if (!res.ok) throw new Error(data?.message || "Import failed");

      toast.success("Imported successfully");
      // update UI qty
      setP((prev) => ({ ...prev, quantity: available - importQty }));
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (!p) return <div className="card p-6 text-white/80">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="card p-5 md:p-8 grid md:grid-cols-2 gap-6">
        <img
          src={pickImage(p)}
          alt={pickName(p)}
          className="w-full h-72 object-cover rounded-2xl border border-white/10"
        />
        <div>
          <h2 className="text-3xl font-extrabold text-white">{pickName(p)}</h2>
          <p className="text-white/70 mt-2">{p.description || "No description"}</p>

          <div className="mt-4 text-white/80 space-y-1">
            <div>Category: {p.category || "N/A"}</div>
            <div>Origin: {pickOrigin(p)}</div>
            <div>Rating: {p.rating ?? "N/A"}</div>
            <div>Available Qty: {p.quantity ?? 0}</div>
            <div className="text-white font-bold">Price: ৳ {p.price ?? 0}</div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              className="btn"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleImport}>
              Import Now
            </button>
            <Link className="btn" to="/my-imports">
              My Imports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
