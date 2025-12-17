export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-black">ImportExportHub</p>
            <p className="text-white/60 mt-2">
              A modern hub for managing exports and imports with clean UI and secure user data.
            </p>
          </div>

          <div>
            <p className="font-semibold">Contact</p>
            <p className="text-white/60 mt-2">Email: support@importexporthub.com</p>
            <p className="text-white/60">Phone: +880 1XXXXXXXXX</p>
          </div>

          <div>
            <p className="font-semibold">Social</p>
            <div className="mt-2 flex gap-3 text-white/70">
              <a className="hover:text-white" href="#">Facebook</a>
              <a className="hover:text-white" href="#">LinkedIn</a>
              <a className="hover:text-white" href="#">X</a>
            </div>
          </div>
        </div>

        <p className="text-white/50 text-sm mt-10">
          © {new Date().getFullYear()} ImportExportHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
