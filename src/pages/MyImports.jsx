import { useContext, useEffect, useMemo, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { API_BASE } from "../utils/api";
import toast from "react-hot-toast";

export default function MyImports() {
  useTitle("My Imports");
  const ctx = useContext(AuthContext);
  const user = ctx?.user || null;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/imports?email=${user?.email}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) load();
  }, [user?.email]);

  const onRemove = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/imports/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Remove failed");
      setItems((p) => p.filter((x) => x._id !== id));
      toast.success("Removed!");
    } catch {
      toast.error("Remove failed");
    }
  };

  const getPid = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj.$oid || "";
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">My Imports</h1>
        <p className="text-muted mt-1">Imports by: {user?.email}</p>
      </div>

      {loading ? (
        <div className="card p-6">Loading...</div>
      ) : (
        <div className="card p-0 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id}>
                  <td className="min-w-[260px]">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.productImage || "https://i.ibb.co/0jZQZ7W/user.png"}
                        className="h-12 w-16 object-cover rounded-lg border border-black/10 dark:border-white/10"
                        alt=""
                      />
                      <div className="font-bold">
                        {it.productName || "Untitled"}
                        <div className="text-xs text-muted">
                          {it.productOrigin || ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold">{it.importedQty ?? 0}</td>
                  <td className="text-sm text-muted">
                    {it.importedAt ? new Date(it.importedAt).toLocaleString() : ""}
                  </td>
                  <td className="min-w-[180px]">
                    <div className="flex gap-2">
                      <a className="btn btn-sm" href={`/products/${getPid(it.productId)}`}>See Details</a>
                      <button className="btn btn-sm" onClick={() => onRemove(it._id)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-muted">
                    No imports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
