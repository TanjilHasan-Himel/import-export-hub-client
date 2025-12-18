import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyImports() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.title = "ImportExportHub | My Imports";
    (async () => {
      const res = await fetch(`${API}/imports?email=${user.email}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    })();
  }, [user.email]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/imports/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      toast.success("Deleted");
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-extrabold text-white">My Imports</h2>

      <div className="space-y-3">
        {items.map((x) => (
          <div key={x._id} className="card p-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-white font-bold">{x.productName}</div>
              <div className="text-white/70 text-sm">
                Qty: {x.importedQty} • {new Date(x.importedAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              <Link className="btn" to={`/products/${x.productId}`}>
                See Details
              </Link>
              <button className="btn" onClick={() => handleDelete(x._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="card p-6 text-white/70">No imports yet.</div>}
      </div>
    </div>
  );
}
