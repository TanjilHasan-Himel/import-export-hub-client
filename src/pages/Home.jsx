import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import toast from "react-hot-toast";
import { API_BASE } from "../utils/api";
import { CardSkeleton } from "../utils/skeleton";

function ProductCard({ p }) {
  const title = p.name || p.title || "Untitled";
  const img = p.image || p.coverPhoto || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop";
  const category = p.originCountry || p.category || "Unknown";
  const rating = p.rating ?? 0;
  const qty = p.quantity ?? 0;
  const price = p.price ?? 0;
  const id = p._id || p.id;

  return (
    <div className="card bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/20 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" src={img} alt={title} />
        <div className="absolute top-3 right-3 badge badge-primary">
          ⭐ {rating.toFixed(1)}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-extrabold text-base md:text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-base-content/60 mt-1 line-clamp-1">
          📍 {category}
        </p>
        <p className="text-xs text-base-content/50 mt-1">Stock: {qty} units</p>
        <p className="font-extrabold text-lg mt-2 text-primary">৳ {price.toLocaleString()}</p>

        <Link className="btn btn-sm btn-primary mt-auto" to={`/products/${id}`}>
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ImportExportHub | Home";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products?limit=8&sort=latest`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data");
        setLatest(data);
      } catch (e) {
        toast.error("Failed to load latest products");
        setLatest([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Section 1: Latest Products */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">🆕 Latest Products</h2>
          <p className="text-base-content/60 mt-2 max-w-2xl mx-auto">
            Discover the newest export and import products from trusted suppliers worldwide
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : latest.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-base-content/60">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {latest.map((p) => (
                <ProductCard key={p._id || p.id} p={p} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link className="btn btn-primary btn-lg" to="/all-products">
                View All Products →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Section 2: Key Features */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold">✨ Why Choose Us?</h2>
          <p className="text-base-content/60 mt-2">Everything you need for seamless global trade</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🔍", title: "Smart Search", desc: "Find products with advanced filters and sorting" },
            { icon: "🌍", title: "Global Network", desc: "Connect with buyers and sellers worldwide" },
            { icon: "✅", title: "Verified Suppliers", desc: "All suppliers are verified for authenticity" },
            { icon: "📊", title: "Real-time Analytics", desc: "Track your imports and exports with live data" },
            { icon: "🔒", title: "Secure Transactions", desc: "Protected payments and secure data handling" },
            { icon: "🚀", title: "Fast Shipping", desc: "Optimized logistics for quick delivery" },
          ].map((feature, idx) => (
            <div key={idx} className="card p-6 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-extrabold text-lg mb-2">{feature.title}</h3>
              <p className="text-base-content/60 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">📦 Product Categories</h2>
          <p className="text-base-content/60 mt-2">Browse products by category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: "🐠", label: "Seafood", color: "primary" },
            { icon: "🌾", label: "Agriculture", color: "success" },
            { icon: "👕", label: "Textiles", color: "info" },
            { icon: "🏭", label: "Industrial", color: "warning" },
            { icon: "🏠", label: "Home Goods", color: "secondary" },
            { icon: "📱", label: "Electronics", color: "error" },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/all-products"
              className={`btn btn-outline btn-lg h-24 flex-col gap-2 hover:btn-${cat.color}`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">⚙️ How It Works</h2>
          <p className="text-base-content/60 mt-2">Simple steps to start trading</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: "1", title: "Register", desc: "Create your free account" },
            { num: "2", title: "Browse", desc: "Explore products worldwide" },
            { num: "3", title: "Negotiate", desc: "Discuss terms with sellers" },
            { num: "4", title: "Trade", desc: "Complete your transaction" },
          ].map((step, idx) => (
            <div key={idx} className="relative">
              <div className="card p-6 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-extrabold text-xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-extrabold mb-2">{step.title}</h3>
                <p className="text-base-content/60 text-sm">{step.desc}</p>
              </div>
              {idx < 3 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-2xl text-primary/30">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Statistics */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 md:p-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "50K+", label: "Products" },
            { value: "10K+", label: "Traders" },
            { value: "150+", label: "Countries" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl md:text-5xl font-extrabold">{stat.value}</div>
              <p className="text-white/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">💬 What Traders Say</h2>
          <p className="text-base-content/60 mt-2">Real feedback from our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Rajesh Kumar", role: "Exporter", text: "Best platform for international trading. Easy to use and highly secure!" },
            { name: "Fatima Ahmed", role: "Importer", text: "Found quality suppliers instantly. The search filters are amazing!" },
            { name: "Li Wei", role: "Business Owner", text: "Professional interface and excellent customer support. Highly recommended!" },
          ].map((review, idx) => (
            <div key={idx} className="card p-6">
              <div className="flex items-center gap-1 mb-3 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-base-content/80 mb-4 italic">"{review.text}"</p>
              <div className="border-t border-base-300 pt-3">
                <p className="font-extrabold">{review.name}</p>
                <p className="text-sm text-base-content/60">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Blog / Insights */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">📚 Latest Insights</h2>
          <p className="text-base-content/60 mt-2">Stay updated with market trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Export Tips for Beginners", date: "Jan 15, 2025", category: "Tutorial" },
            { title: "2025 Trade Market Analysis", date: "Jan 10, 2025", category: "Report" },
            { title: "Logistics Best Practices", date: "Jan 5, 2025", category: "Guide" },
          ].map((blog, idx) => (
            <Link key={idx} to="/blog" className="card hover:shadow-lg transition-all group">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 flex items-center justify-center transition-all">
                <span className="text-5xl">📖</span>
              </div>
              <div className="p-4">
                <div className="badge badge-outline mb-2">{blog.category}</div>
                <h3 className="font-extrabold text-lg mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-sm text-base-content/60">{blog.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">❓ Frequently Asked Questions</h2>
          <p className="text-base-content/60 mt-2">Find answers to common questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: "How do I list my products?", a: "Sign up, go to dashboard, click 'Add Export', and fill in the details." },
            { q: "Is the platform secure?", a: "Yes, we use SSL encryption and verified payment gateways for security." },
            { q: "What are the fees?", a: "We offer competitive pricing with no hidden fees. Check our pricing page." },
            { q: "How long does shipping take?", a: "Shipping time depends on location. Average is 2-4 weeks." },
          ].map((faq, idx) => (
            <details key={idx} className="card p-4 group cursor-pointer">
              <summary className="font-extrabold flex items-center gap-2">
                <span className="text-primary text-xl group-open:rotate-90 transition-transform">▶</span>
                {faq.q}
              </summary>
              <p className="text-base-content/70 text-sm mt-3 ml-8">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Section 9: CTA Section */}
      <section className="bg-gradient-to-r from-secondary to-accent text-white rounded-2xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Trading?</h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of successful traders and expand your business globally today
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/register" className="btn btn-lg btn-primary">
            Get Started Now
          </Link>
          <Link to="/all-products" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-black">
            Browse Products
          </Link>
        </div>
      </section>

      {/* Section 10: Newsletter */}
      <section className="card p-8 md:p-12 bg-base-200 dark:bg-base-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">📧 Stay Connected</h2>
          <p className="text-base-content/60 mt-2">Get exclusive deals and market updates</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thanks for subscribing!");
          }}
          className="flex gap-2 max-w-md mx-auto"
        >
          <input type="email" placeholder="Enter your email" className="input input-bordered flex-1" required />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
