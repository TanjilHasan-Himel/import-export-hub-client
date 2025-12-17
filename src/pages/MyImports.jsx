import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyImports() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`${API}/imports?email=${encodeURIComponent(user.email)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load imports");
        return r.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message || "Error");
        setLoading(false);
      });
  }, [user?.email]);

  return (
    <div className="bg-grid min-h-[calc(100vh-72px)]">
      <div className="container-max py-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-extrabold">My Imports</h1>
            <p className="text-white/70 text-sm mt-1">
              Only your imported products are shown here.
            </p>
          </div>
          <div className="text-white/60 text-sm">
            Total: <span className="font-bold text-white">{items.length}</span>
          </div>
        </div>

        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-6">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-6">No imports yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr className="text-white/80 text-sm">
                    <th className="p-4">Product</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Imported At</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it._id} className="border-b border-white/10">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.productImage || "/images/hero-poster.jpg"}
                            className="h-10 w-14 rounded-lg object-cover border border-white/10"
                            alt="img"
                          />
                          <div>
                            <p className="font-bold">{it.productName || "—"}</p>
                            <p className="text-white/60 text-xs">{it.productOrigin || ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-bold">{it.importedQty}</td>
                      <td className="p-4">${it.productPrice ?? "—"}</td>
                      <td className="p-4 text-white/70 text-sm">
                        {it.importedAt ? new Date(it.importedAt).toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
