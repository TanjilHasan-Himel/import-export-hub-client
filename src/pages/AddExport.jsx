import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { API_BASE } from "../utils/api";

export default function AddExport() {
  useTitle("Add Export");
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    coverPhoto: "",
    price: "",
    originCountry: "",
    rating: "",
    quantity: "",
    description: "",
  });

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const toNumber = (v) => {
        const cleaned = String(v ?? "").replace(/[^0-9.]/g, "");
        const n = parseFloat(cleaned);
        return Number.isFinite(n) ? n : 0;
      };

      const payload = {
        ...form,
        price: toNumber(form.price),
        rating: toNumber(form.rating),
        quantity: Math.max(0, Math.floor(toNumber(form.quantity))),
        exporterEmail: user?.email,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Failed to add export");
      toast.success("Export/Product added!");
      setForm({ title:"", coverPhoto:"", price:"", originCountry:"", rating:"", quantity:"", description:"" });
    } catch {
      toast.error("Failed to add export");
    }
  };

  return (
    <div className="max-w-2xl mx-auto card p-6">
      <h1 className="text-2xl font-extrabold">Add Export / Product</h1>
      <p className="text-muted mt-1">Add a new product to the marketplace.</p>

      <form onSubmit={onSubmit} className="mt-5 grid md:grid-cols-2 gap-3">
        <input className="inp" placeholder="Product Name" value={form.title} onChange={(e)=>onChange("title", e.target.value)} />
        <input className="inp" placeholder="Product Image URL" value={form.coverPhoto} onChange={(e)=>onChange("coverPhoto", e.target.value)} />
        <input className="inp" placeholder="Price" inputMode="decimal" value={form.price} onChange={(e)=>onChange("price", e.target.value)} />
        <input className="inp" placeholder="Origin Country" value={form.originCountry} onChange={(e)=>onChange("originCountry", e.target.value)} />
        <input className="inp" placeholder="Rating" inputMode="decimal" value={form.rating} onChange={(e)=>onChange("rating", e.target.value)} />
        <input className="inp" placeholder="Available Quantity" inputMode="numeric" value={form.quantity} onChange={(e)=>onChange("quantity", e.target.value)} />
        <textarea className="inp md:col-span-2" placeholder="Description" value={form.description} onChange={(e)=>onChange("description", e.target.value)} />
        <button className="btn btn-primary md:col-span-2">Add Export/Product</button>
      </form>
    </div>
  );
}
