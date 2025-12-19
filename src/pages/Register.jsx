import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

export default function Register() {
  useTitle("Register");
  const { signUp, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const validPass = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && p.length >= 6;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validPass(pass)) {
      return toast.error("Password: 1 Uppercase + 1 Lowercase + min 6 chars");
    }
    try {
      await signUp(email, pass);
      await updateUserProfile(name, photo);
      toast.success("Registered!");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Register failed");
    }
  };

  const onGoogle = async () => {
    try {
      await googleSignIn();
      toast.success("Registered with Google!");
      nav("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-extrabold">Register</h1>

      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <input className="inp" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="inp" placeholder="Photo URL" value={photo} onChange={(e)=>setPhoto(e.target.value)} />
        <input className="inp" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="inp" placeholder="Password" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
        <button className="btn btn-primary w-full">Register</button>
      </form>

      <button className="btn w-full mt-3" onClick={onGoogle}>Continue with Google</button>

      <p className="text-muted mt-4 text-sm">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </p>
    </div>
  );
}
