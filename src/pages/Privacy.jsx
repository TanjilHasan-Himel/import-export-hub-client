export default function Privacy() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Privacy Policy 🔒</h1>
      </div>

      <div className="prose dark:prose-invert prose-lg max-w-none text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-extrabold mt-8 text-gray-900 dark:text-white">Introduction</h2>
        <p className="text-gray-700 dark:text-gray-300">
          ImportExportHub ("we" or "us" or "our") operates the importexportbub.com website and ImportExportHub mobile application (hereinafter referred to as the "Service").
        </p>

        <h2 className="text-2xl font-extrabold mt-8 text-gray-900 dark:text-white">Information Collection and Use</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We collect different types of information for various purposes to provide and improve our Service to you.
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
          <li>Personal Data: Name, email address, phone number, address, company information</li>
          <li>Usage Data: Browser type, IP address, pages visited, time and date of visits</li>
          <li>Cookies and Tracking Data: To enhance your experience and analyze site traffic</li>
        </ul>

        <h2 className="text-2xl font-extrabold mt-8 text-gray-900 dark:text-white">Security of Data</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We implement and maintain appropriate technical, physical and administrative security measures. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-extrabold mt-8 text-gray-900 dark:text-white">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300">
          If you have any questions about this Privacy Policy, please contact us at support@importexportbub.com
        </p>
      </div>
    </div>
  );
}
