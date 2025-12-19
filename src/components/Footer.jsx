export default function Footer() {
  return (
    <footer className="mt-14 border-t border-black/10 dark:border-white/10">
      {/* Media Banner */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold">Trade Smarter with ImportExportHub</h3>
            <p className="text-muted mt-2">
              Browse products, export your items, and manage imports with real-time updates.
            </p>
          </div>
          <div className="flex gap-2">
            <a className="btn btn-primary" href="/all-products">Explore Products</a>
            <a className="btn" href="/add-export">Add Export</a>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-extrabold">ImportExportHub</p>
            <p className="text-muted mt-2">Trusted import/export product library.</p>
          </div>

          <div>
            <p className="font-extrabold">Contact</p>
            <p className="text-muted mt-2">Email: support@importexporthub.com</p>
            <p className="text-muted">Phone: +880-1XXXXXXXXX</p>
          </div>

          <div>
            <p className="font-extrabold">Social</p>
            <div className="mt-2 flex gap-3">
              <a className="btn" href="https://facebook.com" target="_blank">Facebook</a>
              <a className="btn" href="https://x.com" target="_blank">X</a>
              <a className="btn" href="https://linkedin.com" target="_blank">LinkedIn</a>
            </div>
          </div>
        </div>

        <p className="text-muted text-sm mt-8">
          © {new Date().getFullYear()} ImportExportHub — Built for Assignment.
        </p>
      </div>
    </footer>
  );
}
