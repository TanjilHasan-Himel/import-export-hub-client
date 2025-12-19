import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyExports() {
  useTitle("My Exports");
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetch(`${API}/products?exporterEmail=${user?.email}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (user?.email) load();
  }, [user?.email]);

  const onDelete = async (id) => {
    if (!confirm("Delete this export?")) return;
    const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return toast.error(data?.message || "Delete failed");
    toast.success("Deleted!");
    setItems((p) => p.filter((x) => x._id !== id));
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
              <button className="btn btn-primary" onClick={() => toast("Update modal next")}>Update</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
