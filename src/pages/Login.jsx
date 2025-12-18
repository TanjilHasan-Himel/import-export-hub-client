import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  useTitle("Login");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6 md:p-8">
      <h1 className="text-2xl font-extrabold">Login</h1>
      <p className="text-muted mt-1">Access private pages (Add Export / My Imports / My Exports).</p>

      <form onSubmit={handleLogin} className="mt-5 space-y-3">
        <input className="inp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="inp" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>

      <button className="btn w-full mt-3" onClick={handleGoogle}>Continue with Google</button>

      <p className="text-sm text-muted mt-4">
        New here? <Link className="underline" to="/register">Create an account</Link>
      </p>
    </div>
  );
}
