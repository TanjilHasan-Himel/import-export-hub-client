import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyExports() {
  useTitle("My Exports");
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetch(`${API}/exports?email=${user?.email}`);
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (user?.email) load();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Delete failed");
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">My Exports</h1>
          <p className="text-muted mt-1">Exports by: {user?.email}</p>
        </div>
        <Link className="btn btn-primary" to="/add-export">Add Export</Link>
      </div>

      <div className="grid gap-4">
        {items.map((p) => (
          <div key={p._id} className="card p-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-extrabold truncate">{p.title}</p>
              <p className="text-muted text-sm">
                {p.category} • Qty {p.quantity ?? 0} • ৳ {p.price ?? 0}
              </p>
            </div>

            <div className="flex gap-2">
              <Link className="btn" to={`/update-export/${p._id}`}>Update</Link>
              <button className="btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
