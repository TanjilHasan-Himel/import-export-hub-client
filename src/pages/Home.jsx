import { useEffect } from "react";
import HeroVideo from "../components/HeroVideo";

export default function Home() {
  useEffect(() => {
    document.title = "Import Export Hub | Home";
  }, []);

  return (
    <div className="space-y-10">
      <HeroVideo />

      {/* Latest Products (placeholder এখন, DB connect হলে fetch করবে) */}
      <section className="glass p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Latest Products</h2>
            <p className="text-white/60 mt-1">
              Database থেকে recent 6টা product (createdAt desc) এখানে দেখাবে।
            </p>
          </div>
          <button className="btn-outline">All Products</button>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass p-4">
              <div className="h-40 rounded-xl bg-white/10" />
              <h3 className="mt-3 font-bold">Product Name {i}</h3>
              <p className="text-white/60 text-sm mt-1">
                Price • Origin • Rating • Qty
              </p>
              <button className="btn-primary mt-4 w-full">See Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1 */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="glass p-6">
          <h3 className="font-bold text-lg">Compliance-ready</h3>
          <p className="text-white/60 mt-2">
            Import/export workflow tracking with clean records.
          </p>
        </div>
        <div className="glass p-6">
          <h3 className="font-bold text-lg">Realtime quantity</h3>
          <p className="text-white/60 mt-2">
            Import করলে available quantity DB থেকে কমবে ($inc).
          </p>
        </div>
        <div className="glass p-6">
          <h3 className="font-bold text-lg">Secure access</h3>
          <p className="text-white/60 mt-2">
            Private routes for My Imports / My Exports / Add Export.
          </p>
        </div>
      </section>

      {/* Newsletter (Required ✅) */}
      <section className="glass p-6">
        <h2 className="text-2xl font-black">Newsletter</h2>
        <p className="text-white/60 mt-1">
          Get trade updates, new product alerts, and insights — straight to your inbox.
        </p>

        <form className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-xl bg-[#0b0f17] border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />
          <button className="btn-primary sm:w-48" type="submit">
            Subscribe
          </button>
        </form>

        <p className="text-xs text-white/40 mt-3">
          We don’t use lorem text. We don’t spam. Unsubscribe anytime.
        </p>
      </section>
    </div>
  );
}
