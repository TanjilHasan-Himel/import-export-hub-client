import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // modal
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const available = useMemo(
    () => Number(product?.quantity ?? 0),
    [product]
  );

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetch(`${API}/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load product");
        return r.json();
      })
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        toast.error(e.message || "Error");
        setLoading(false);
      });

    return () => (ignore = true);
  }, [id]);

  const canSubmit = qty > 0 && qty <= available && !submitting;

  const handleImport = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);

      const res = await fetch(`${API}/imports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          qty,
          importerEmail: user?.email,
          importerName: user?.displayName || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Import failed");

      toast.success("Import successful ✅");

      // update UI qty locally
      setProduct((prev) => ({ ...prev, quantity: available - qty }));
      setOpen(false);
      setQty(1);

      // optional: go to My Imports
      navigate("/my-imports");
    } catch (e) {
      toast.error(e?.message || "Import failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-max py-10">
        <div className="card p-6">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-max py-10">
        <div className="card p-6">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="bg-grid min-h-[calc(100vh-72px)]">
      <div className="container-max py-10">
        <div className="card p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src={product.image || product.productImage || "/images/hero-poster.jpg"}
                alt={product.name || product.productName || "product"}
                className="w-full h-[320px] object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {product.name || product.productName}
              </h1>

              <p className="text-white/70 mt-2">
                {product.description || "No description provided."}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Info label="Price" value={`$${product.price ?? "—"}`} />
                <Info label="Origin" value={product.origin || product.country || "—"} />
                <Info label="Rating" value={product.rating ?? "—"} />
                <Info label="Available Qty" value={available} />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="btn btn-primary" onClick={() => setOpen(true)}>
                  Import Now
                </button>
                <button className="btn" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>

              {available <= 0 && (
                <p className="mt-3 text-red-300 text-sm">
                  Out of stock.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Modal */}
        {open && (
          <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="card w-full max-w-md p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold">Import Now</h3>
                  <p className="text-white/70 text-sm mt-1">
                    Available: <span className="font-bold">{available}</span>
                  </p>
                </div>

                <button className="btn" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>

              <div className="mt-5">
                <label className="text-sm text-white/80 font-semibold">
                  Quantity to import
                </label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white outline-none"
                />

                {qty > available && (
                  <p className="mt-2 text-red-300 text-sm">
                    Quantity cannot exceed available stock.
                  </p>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  className="btn btn-primary flex-1"
                  onClick={handleImport}
                  disabled={!canSubmit}
                >
                  {submitting ? "Submitting..." : "Submit Import"}
                </button>
                <button className="btn flex-1" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-white/60 text-xs font-semibold">{label}</p>
      <p className="mt-1 text-white font-bold">{value}</p>
    </div>
  );
}
