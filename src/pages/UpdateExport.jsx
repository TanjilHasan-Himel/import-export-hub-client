import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function UpdateExport() {
  useTitle("Update Export");
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/products/${id}`);
      const data = await res.json();
      setForm(data);
    };
    load();
  }, [id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        coverPhoto: form.coverPhoto,
        promoVideo: form.promoVideo || "",
        category: form.category,
        description: form.description || "",
        rating: Number(form.rating),
        price: Number(form.price),
        quantity: Number(form.quantity),
        exporterEmail: user?.email,
      };

      const res = await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Update failed");

      toast.success("Updated");
      nav("/my-exports");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!form) return <div className="card p-6">Loading...</div>;

  return (
    <div className="card p-6 md:p-8">
      <h1 className="text-2xl font-extrabold">Update Export</h1>

      <form onSubmit={submit} className="mt-5 grid md:grid-cols-2 gap-4">
        <input className="inp" name="title" value={form.title || ""} onChange={onChange} />
        <input className="inp" name="category" value={form.category || ""} onChange={onChange} />

        <input className="inp md:col-span-2" name="coverPhoto" value={form.coverPhoto || ""} onChange={onChange} />
        <input className="inp md:col-span-2" name="promoVideo" value={form.promoVideo || ""} onChange={onChange} />

        <input className="inp" type="number" step="0.1" name="rating" value={form.rating ?? 0} onChange={onChange} />
        <input className="inp" type="number" name="price" value={form.price ?? 0} onChange={onChange} />
        <input className="inp" type="number" name="quantity" value={form.quantity ?? 0} onChange={onChange} />

        <textarea className="inp md:col-span-2" style={{ height: 110, paddingTop: 12 }} name="description" value={form.description || ""} onChange={onChange} />

        <button className="btn btn-primary md:col-span-2" type="submit">Save Changes</button>
      </form>
    </div>
  );
}
