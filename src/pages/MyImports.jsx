import { useContext, useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        const res = await fetch(`${API}/imports?email=${user?.email}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) load();
  }, [user?.email]);

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
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-muted">
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
