import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  return (
    <div className="min-h-screen bg-[#070A10] text-white grid place-items-center px-6">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-black">404 / Something went wrong</h1>
        <p className="text-white/70 text-sm">
          {err?.statusText || err?.message || "Route not found."}
        </p>
        <Link to="/" className="inline-block px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
