import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyExports() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // product object
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "ImportExportHub | My Exports";
    (async () => {
      const res = await fetch(`${API}/exports?email=${user.email}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    })();
  }, [user.email]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) => (p.title || "").toLowerCase().includes(s));
  }, [items, q]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/products/${id}?email=${encodeURIComponent(user.email)}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      toast.success("Deleted");
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API}/products/${editing._id}?email=${encodeURIComponent(user.email)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: editing.title,
          price: Number(editing.price),
          quantity: Number(editing.quantity),
          originCountry: editing.originCountry,
          rating: Number(editing.rating),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed");
      toast.success("Updated");

      setItems((prev) => prev.map((x) => (x._id === editing._id ? { ...x, ...editing } : x)));
      setEditing(null);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const downloadCSV = () => {
    const rows = [
      ["title", "price", "originCountry", "rating", "quantity"],
      ...items.map((p) => [p.title, p.price, p.originCountry, p.rating, p.quantity]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-exports.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-white">My Exports</h2>
          <p className="text-white/70">Products you added.</p>
        </div>
        <div className="flex gap-2">
          <input className="btn" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." />
          <button className="btn" onClick={downloadCSV}>Download CSV</button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <div key={p._id} className="card p-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-white font-bold">{p.title}</div>
              <div className="text-white/70 text-sm">
                ৳ {p.price ?? 0} • {p.originCountry || "Unknown"} • Rating {p.rating ?? "N/A"} • Qty {p.quantity ?? 0}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={() => setEditing({ ...p })}>Update</button>
              <button className="btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="card p-6 text-white/70">No exports yet.</div>}
      </div>

      {/* modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-lg">
            <h3 className="text-white font-extrabold text-xl">Update Product</h3>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <input className="btn col-span-2" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title" />
              <input className="btn" type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} placeholder="Price" />
              <input className="btn" type="number" value={editing.quantity} onChange={(e) => setEditing({ ...editing, quantity: e.target.value })} placeholder="Quantity" />
              <input className="btn" value={editing.originCountry || ""} onChange={(e) => setEditing({ ...editing, originCountry: e.target.value })} placeholder="Origin" />
              <input className="btn" type="number" step="0.1" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: e.target.value })} placeholder="Rating" />
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              <button className="btn" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
