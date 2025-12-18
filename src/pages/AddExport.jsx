import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AddExport() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    coverPhoto: "",
    category: "",
    originCountry: "",
    description: "",
    rating: 0,
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    document.title = "ImportExportHub | Add Export";
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        rating: Number(form.rating),
        price: Number(form.price),
        quantity: Number(form.quantity),
        exporterEmail: user.email,
        exporterName: user.displayName || "",
        createdAt: new Date(),
      };

      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Add failed");

      toast.success("Product added");
      nav("/my-exports");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card p-6 md:p-10">
      <h2 className="text-2xl font-extrabold text-white">Add Export / Product</h2>

      <form onSubmit={handleSubmit} className="mt-6 grid md:grid-cols-2 gap-4">
        <input className="btn" name="title" placeholder="Product Name" value={form.title} onChange={onChange} required />
        <input className="btn" name="coverPhoto" placeholder="Image URL (or /images/xxx.jpg)" value={form.coverPhoto} onChange={onChange} required />
        <input className="btn" name="category" placeholder="Category" value={form.category} onChange={onChange} required />
        <input className="btn" name="originCountry" placeholder="Origin Country" value={form.originCountry} onChange={onChange} required />
        <input className="btn" name="rating" type="number" step="0.1" placeholder="Rating" value={form.rating} onChange={onChange} />
        <input className="btn" name="price" type="number" placeholder="Price" value={form.price} onChange={onChange} />
        <input className="btn" name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={onChange} />
        <input className="btn md:col-span-2" name="description" placeholder="Description" value={form.description} onChange={onChange} />
        <button className="btn btn-primary md:col-span-2" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
