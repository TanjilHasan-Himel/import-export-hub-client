export default function Blog() {
  return (
    <div className="space-y-12">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Blog 📚</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4">Latest insights and tips for successful trading</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Export Tips for Beginners", author: "John Smith", date: "Jan 15, 2025", image: "📖" },
          { title: "2025 Trade Market Analysis", author: "Sarah Johnson", date: "Jan 10, 2025", image: "📊" },
          { title: "Logistics Best Practices", author: "Ahmed Hassan", date: "Jan 5, 2025", image: "🚚" },
          { title: "Payment Security Guide", author: "Lisa Chen", date: "Dec 28, 2024", image: "🔒" },
          { title: "Top Trading Countries", author: "David Lee", date: "Dec 20, 2024", image: "🌍" },
          { title: "Digital Customs Guide", author: "Maria Garcia", date: "Dec 15, 2024", image: "📋" },
        ].map((post, idx) => (
          <div key={idx} className="card bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl">
              {post.image}
            </div>
            <div className="p-6">
              <h3 className="font-extrabold text-lg mb-2 text-gray-900 dark:text-white">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{post.author} • {post.date}</p>
              <button className="btn btn-sm btn-primary">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
