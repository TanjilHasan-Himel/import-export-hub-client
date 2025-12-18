export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-8 mt-10">
      <div className="container-max text-sm text-muted">
        © {new Date().getFullYear()} ImportExportHub — Built for Assignment.
      </div>
    </footer>
  );
}
