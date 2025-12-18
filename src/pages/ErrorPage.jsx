import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err = useRouteError();
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card p-8 text-center max-w-xl">
        <h1 className="text-3xl font-extrabold">404 / Something went wrong</h1>
        <p className="text-muted mt-3">{err?.message || "Not Found"}</p>
        <Link className="btn btn-primary mt-6" to="/">Go Home</Link>
      </div>
    </div>
  );
}
