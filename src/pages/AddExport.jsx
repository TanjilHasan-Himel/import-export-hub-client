import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AddExport() {
  useTitle("Add Export");
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    coverPhoto: "",
    promoVideo: "",
    category: "Export",
    description: "",
    rating: 4.5,
    price: 0,
    quantity: 1,
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.coverPhoto) return toast.error("Title + CoverPhoto required");

    const payload = {
      ...form,
      rating: Number(form.rating),
      price: Number(form.price),
      quantity: Number(form.quantity),
      exporterEmail: user?.email,
      exporterName: user?.displayName || "",
    };

    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Add failed");
      toast.success("Export added");
      nav("/my-exports");
    } catch {
      toast.error("Add failed");
    }
  };

  return (
    <div className="card p-6 md:p-8">
      <h1 className="text-2xl font-extrabold">Add Export</h1>
      <p className="text-muted mt-1">Create a new product/export listing.</p>

      <form onSubmit={submit} className="mt-5 grid md:grid-cols-2 gap-4">
        <input className="inp" name="title" value={form.title} onChange={onChange} placeholder="Title" />
        <input className="inp" name="category" value={form.category} onChange={onChange} placeholder="Category" />

        <input className="inp md:col-span-2" name="coverPhoto" value={form.coverPhoto} onChange={onChange} placeholder="Cover Photo URL (or /images/hero-1.jpg)" />
        <input className="inp md:col-span-2" name="promoVideo" value={form.promoVideo} onChange={onChange} placeholder="Promo Video URL (optional, or /videos/intro.mp4)" />

        <input className="inp" type="number" step="0.1" name="rating" value={form.rating} onChange={onChange} placeholder="Rating" />
        <input className="inp" type="number" name="price" value={form.price} onChange={onChange} placeholder="Price" />
        <input className="inp" type="number" name="quantity" value={form.quantity} onChange={onChange} placeholder="Quantity" />

        <textarea className="inp md:col-span-2" style={{ height: 110, paddingTop: 12 }} name="description" value={form.description} onChange={onChange} placeholder="Description" />

        <button className="btn btn-primary md:col-span-2" type="submit">Submit Export</button>
      </form>
    </div>
  );
}
