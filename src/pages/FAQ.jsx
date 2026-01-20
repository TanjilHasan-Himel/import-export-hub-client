export default function FAQ() {
  return (
    <div className="space-y-12">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">FAQ ❓</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4">Frequently asked questions about our platform</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          { q: "What is ImportExportHub?", a: "ImportExportHub is a digital platform connecting global traders for seamless export-import transactions." },
          { q: "How do I register?", a: "Click 'Register' on the navbar, fill in your details, and verify your email. You're ready to trade!" },
          { q: "Is there a registration fee?", a: "No! Registration is completely free. No hidden charges." },
          { q: "How do I list my products?", a: "Go to Dashboard → Add Export, fill in product details, and publish." },
          { q: "Can I import from any seller?", a: "Yes, as long as they have verified products on the platform." },
          { q: "What payment methods are accepted?", a: "We accept bank transfers, cards, and secure payment gateways." },
          { q: "How long does shipping take?", a: "Shipping time varies by location. Average is 2-4 weeks." },
          { q: "Is my data secure?", a: "Yes! We use SSL encryption and secure data handling practices." },
        ].map((faq, idx) => (
          <details key={idx} className="card bg-white dark:bg-gray-800 p-6 group cursor-pointer border border-gray-200 dark:border-gray-700">
            <summary className="font-extrabold text-lg flex items-center gap-3 text-gray-900 dark:text-white cursor-pointer">
              <span className="text-primary text-xl group-open:rotate-90 transition-transform">▶</span>
              {faq.q}
            </summary>
            <p className="text-gray-700 dark:text-gray-300 mt-4 ml-8">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
