import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { API_BASE } from "../utils/api";

export default function MyExports() {
  useTitle("My Exports");
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState({ title: "", price: "", quantity: "", originCountry: "", rating: "" });

  const load = async () => {
    const res = await fetch(`${API_BASE}/exports?email=${user?.email}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (user?.email) load();
  }, [user?.email]);

  const onDelete = async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}?email=${encodeURIComponent(user?.email)}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return toast.error(data?.message || "Delete failed");
    toast.success("Deleted!");
    setItems((p) => p.filter((x) => x._id !== id));
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      title: p.title || "",
      price: String(p.price ?? ""),
      quantity: String(p.quantity ?? ""),
      originCountry: p.originCountry || "",
      rating: String(p.rating ?? ""),
    });
  };

  const onFormChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const toNumber = (v) => {
    const cleaned = String(v ?? "").replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editing?._id) return;
    const payload = {
      title: form.title,
      price: toNumber(form.price),
      quantity: Math.max(0, Math.floor(toNumber(form.quantity))),
      originCountry: form.originCountry,
      rating: toNumber(form.rating),
    };

    const res = await fetch(`${API_BASE}/products/${editing._id}?email=${encodeURIComponent(user?.email)}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return toast.error(data?.message || "Update failed");
    toast.success("Updated!");
    setItems((arr) => arr.map((x) => (x._id === editing._id ? { ...x, ...payload } : x)));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">My Exports</h1>
        <p className="text-muted mt-1">Exports by: {user?.email}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((p) => (
          <div key={p._id} className="card p-4">
            <img src={p.coverPhoto} className="h-44 w-full object-cover rounded-xl" />
            <h3 className="font-extrabold mt-3">{p.title}</h3>
            <p className="text-muted text-sm mt-1">
              {p.originCountry || "Unknown"} • Rating {p.rating ?? "N/A"} • Qty {p.quantity ?? 0}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="btn" onClick={() => onDelete(p._id)}>Delete</button>
              <button className="btn btn-primary" onClick={() => openEdit(p)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="card w-full max-w-xl p-6 bg-base-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold">Update Export/Product</h3>
              <button className="btn" onClick={() => setEditing(null)}>Close</button>
            </div>
            <form onSubmit={onUpdateSubmit} className="mt-5 grid md:grid-cols-2 gap-3">
              <input className="inp" placeholder="Product Name" value={form.title} onChange={(e)=>onFormChange("title", e.target.value)} />
              <input className="inp" placeholder="Price" inputMode="decimal" value={form.price} onChange={(e)=>onFormChange("price", e.target.value)} />
              <input className="inp" placeholder="Available Quantity" inputMode="numeric" value={form.quantity} onChange={(e)=>onFormChange("quantity", e.target.value)} />
              <input className="inp" placeholder="Origin Country" value={form.originCountry} onChange={(e)=>onFormChange("originCountry", e.target.value)} />
              <input className="inp" placeholder="Rating" inputMode="decimal" value={form.rating} onChange={(e)=>onFormChange("rating", e.target.value)} />
              <button className="btn btn-primary md:col-span-2">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
