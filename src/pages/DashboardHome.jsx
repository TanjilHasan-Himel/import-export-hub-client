import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_BASE } from "../utils/api";
import toast from "react-hot-toast";
import { ChartSkeleton, TableSkeleton } from "../utils/skeleton";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [recentExports, setRecentExports] = useState([]);
  const [recentImports, setRecentImports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | ImportExportHub";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [exportsRes, importsRes] = await Promise.all([
          fetch(`${API_BASE}/exports?email=${user?.email}`),
          fetch(`${API_BASE}/imports?email=${user?.email}`),
        ]);

        const exports = await exportsRes.json();
        const imports = await importsRes.json();

        setRecentExports(Array.isArray(exports) ? exports.slice(0, 5) : []);
        setRecentImports(Array.isArray(imports) ? imports.slice(0, 5) : []);

        const totalExportValue = exports.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);
        const totalImportValue = imports.reduce((acc, p) => acc + (Number(p.productPrice) * Number(p.importedQty)), 0);

        setStats({
          totalExports: exports.length,
          totalImports: imports.length,
          totalExportValue,
          totalImportValue,
        });
      } catch (e) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) load();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <ChartSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-white p-8">
        <h1 className="text-3xl font-extrabold mb-2">Welcome back, {user?.displayName?.split(" ")[0]}! 👋</h1>
        <p className="text-white/80">Here's your trading performance overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-white dark:bg-gray-800 p-6">
          <p className="text-base-content/60 text-sm font-semibold">Total Exports</p>
          <p className="text-4xl font-extrabold text-primary mt-2">{stats?.totalExports || 0}</p>
          <p className="text-xs text-base-content/50 mt-2">Products listed</p>
        </div>

        <div className="card bg-white dark:bg-gray-800 p-6">
          <p className="text-base-content/60 text-sm font-semibold">Total Imports</p>
          <p className="text-4xl font-extrabold text-secondary mt-2">{stats?.totalImports || 0}</p>
          <p className="text-xs text-base-content/50 mt-2">Products imported</p>
        </div>

        <div className="card bg-white dark:bg-gray-800 p-6">
          <p className="text-base-content/60 text-sm font-semibold">Export Value</p>
          <p className="text-3xl font-extrabold text-accent mt-2">৳ {(stats?.totalExportValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-base-content/50 mt-2">Total worth</p>
        </div>

        <div className="card bg-white dark:bg-gray-800 p-6">
          <p className="text-base-content/60 text-sm font-semibold">Import Value</p>
          <p className="text-3xl font-extrabold text-info mt-2">৳ {(stats?.totalImportValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-base-content/50 mt-2">Total spent</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simple Chart - Export/Import Comparison */}
        <div className="card bg-white dark:bg-gray-800 p-6">
          <h3 className="font-extrabold text-lg mb-4">Trading Activity</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Exports</span>
                <span className="text-sm">{stats?.totalExports || 0}</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${Math.min((stats?.totalExports / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Imports</span>
                <span className="text-sm">{stats?.totalImports || 0}</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-secondary h-full"
                  style={{ width: `${Math.min((stats?.totalImports / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Chart - Value Comparison */}
        <div className="card bg-white dark:bg-gray-800 p-6">
          <h3 className="font-extrabold text-lg mb-4">Trading Value</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Export Value</span>
                <span className="text-sm">৳ {(stats?.totalExportValue / 100000).toFixed(1)}L</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-accent h-full"
                  style={{ width: `${Math.min((stats?.totalExportValue / 10000000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Import Value</span>
                <span className="text-sm">৳ {(stats?.totalImportValue / 100000).toFixed(1)}L</span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-info h-full"
                  style={{ width: `${Math.min((stats?.totalImportValue / 10000000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Exports */}
        <div className="card bg-white dark:bg-gray-800 p-6">
          <h3 className="font-extrabold text-lg mb-4">Recent Exports</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-base-content/60">
                      No exports yet
                    </td>
                  </tr>
                ) : (
                  recentExports.map((exp) => (
                    <tr key={exp._id}>
                      <td className="font-semibold line-clamp-1">{exp.title || "N/A"}</td>
                      <td>{exp.quantity || 0}</td>
                      <td>৳ {exp.price?.toLocaleString() || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Imports */}
        <div className="card bg-white dark:bg-gray-800 p-6">
          <h3 className="font-extrabold text-lg mb-4">Recent Imports</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {recentImports.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-base-content/60">
                      No imports yet
                    </td>
                  </tr>
                ) : (
                  recentImports.map((imp) => (
                    <tr key={imp._id}>
                      <td className="font-semibold line-clamp-1">{imp.productName || "N/A"}</td>
                      <td>{imp.importedQty || 0}</td>
                      <td>৳ {(imp.productPrice * imp.importedQty)?.toLocaleString() || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
