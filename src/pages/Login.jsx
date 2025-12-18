import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  const from = loc.state?.from || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card p-6 md:p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-extrabold text-white">Login</h2>

      <form onSubmit={handleEmailLogin} className="mt-6 space-y-3">
        <input className="btn w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="btn w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>

      <button className="btn w-full mt-3" onClick={handleGoogle}>
        Continue with Google
      </button>

      <p className="text-white/70 text-sm mt-4">
        New user? <Link className="underline" to="/register">Register</Link>
      </p>
    </div>
  );
}
