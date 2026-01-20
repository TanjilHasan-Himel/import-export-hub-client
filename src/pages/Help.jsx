export default function Help() {
  return (
    <div className="space-y-12">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Help & Support 🆘</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4">We're here to help you succeed in your trading journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "Getting Started", icon: "🚀", items: ["Create an account", "Complete your profile", "Start browsing products"] },
          { title: "Trading", icon: "📊", items: ["List products", "Manage inventory", "Track transactions"] },
          { title: "Security", icon: "🔒", items: ["Protect your account", "Verify sellers", "Safe payments"] },
          { title: "Account", icon: "👤", items: ["Update profile", "Change password", "Delete account"] },
        ].map((section, idx) => (
          <div key={idx} className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <span>{section.icon}</span> {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-r from-primary to-secondary text-white p-8 text-center">
        <h3 className="text-2xl font-extrabold mb-4">Still need help?</h3>
        <p className="mb-6 text-white/90">Contact our support team at support@importexportbub.com or call +880-1700-000000</p>
        <a href="mailto:support@importexportbub.com" className="btn btn-primary">
          Send Support Request
        </a>
      </div>
    </div>
  );
}
