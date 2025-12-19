import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  useTitle("Login");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, pass);
      toast.success("Logged in!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const onGoogle = async () => {
    try {
      await googleSignIn();
      toast.success("Logged in with Google!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-extrabold">Login</h1>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <input className="inp" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="inp" placeholder="Password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
        <button className="btn btn-primary w-full">Login</button>
      </form>

      <button className="btn w-full mt-3" onClick={onGoogle}>Continue with Google</button>

      <p className="text-muted mt-4 text-sm">
        New here? <Link className="underline" to="/register">Register</Link>
      </p>
    </div>
  );
}
