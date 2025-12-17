export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="container-max py-8 text-white/70 text-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ImportExportHub. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="#" aria-label="X">
            X
          </a>
          <a className="hover:text-white" href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a className="hover:text-white" href="#" aria-label="Contact">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
