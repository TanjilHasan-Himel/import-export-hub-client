import { useContext, useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyImports() {
  useTitle("My Imports");
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/imports?email=${user?.email}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    };
    if (user?.email) load();
  }, [user?.email]);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">My Imports</h1>
        <p className="text-muted mt-1">Imports by: {user?.email}</p>
      </div>

      <div className="grid gap-4">
        {items.map((it) => (
          <div key={it._id} className="card p-5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-extrabold truncate">{it.title || it.productName}</p>
              <p className="text-muted text-sm">
                Imported Qty: {it.importQty ?? it.importedQty ?? 0}
              </p>
            </div>
            <div className="text-sm text-muted">
              {it.importedAt ? new Date(it.importedAt).toLocaleString() : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
