import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">About ImportExportHub 🌍</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto text-lg">
          Your trusted platform for global trade, connecting buyers and sellers across borders
        </p>
      </div>

      {/* Mission Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-primary mb-4">🎯 Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To simplify international trade by providing a secure, transparent, and user-friendly platform that connects businesses worldwide, enabling seamless export-import transactions.
          </p>
        </div>
        <div className="card bg-gradient-to-br from-accent/10 to-info/10 dark:from-accent/20 dark:to-info/20 p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-accent mb-4">👁️ Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To become the world's leading digital marketplace for import-export businesses, fostering global trade relationships and economic growth.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Core Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: "🤝", title: "Trust", desc: "Transparent transactions" },
            { icon: "🔒", title: "Security", desc: "Data protection" },
            { icon: "🚀", title: "Innovation", desc: "Cutting-edge tech" },
            { icon: "🌟", title: "Excellence", desc: "Best service always" },
          ].map((val, idx) => (
            <div key={idx} className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-all">
              <div className="text-5xl mb-3">{val.icon}</div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">{val.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Md. Rahman", title: "CEO & Founder", image: "👨‍💼" },
            { name: "Sarah Johnson", title: "CTO", image: "👩‍💼" },
            { name: "Ahmed Hassan", title: "Operations Lead", image: "👨‍💼" },
          ].map((member, idx) => (
            <div key={idx} className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
              <div className="text-6xl mb-3">{member.image}</div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-white p-8 md:p-12 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Join Our Community</h2>
        <p className="mb-6 text-white/90">Start trading globally today</p>
        <Link to="/register" className="btn btn-lg btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}
