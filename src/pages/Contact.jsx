import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Contact Us 📞</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4">We'd love to hear from you. Let's talk about your trading needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-5xl mb-3">📧</div>
          <h3 className="font-extrabold text-lg mb-2 text-gray-900 dark:text-white">Email</h3>
          <a href="mailto:support@importexportbub.com" className="text-primary hover:underline">
            support@importexportbub.com
          </a>
        </div>
        <div className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-5xl mb-3">📍</div>
          <h3 className="font-extrabold text-lg mb-2 text-gray-900 dark:text-white">Location</h3>
          <p className="text-gray-600 dark:text-gray-300">Dhaka, Bangladesh</p>
        </div>
        <div className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-5xl mb-3">☎️</div>
          <h3 className="font-extrabold text-lg mb-2 text-gray-900 dark:text-white">Phone</h3>
          <a href="tel:+8801700000000" className="text-primary hover:underline">
            +880-1700-000000
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <div className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Message subject"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="textarea textarea-bordered w-full h-32"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Hours */}
      <div className="card bg-base-200 p-8 text-center">
        <h3 className="text-2xl font-extrabold mb-4">Business Hours</h3>
        <p className="text-base-content/80">
          Monday - Friday: 9:00 AM - 6:00 PM<br />
          Saturday - Sunday: Closed<br />
          <span className="text-sm text-base-content/60 mt-2 block">Response time: Within 24 hours</span>
        </p>
      </div>
    </div>
  );
}
