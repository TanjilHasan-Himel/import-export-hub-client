import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";

export default function Register() {
  useTitle("Register");
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Account created");
      nav("/");
    } catch (err) {
      toast.error(err?.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto card p-6 md:p-8">
      <h1 className="text-2xl font-extrabold">Register</h1>

      <form onSubmit={handleRegister} className="mt-5 space-y-3">
        <input className="inp" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        <input className="inp" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL (optional)" />
        <input className="inp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="inp" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn btn-primary w-full" type="submit">Create Account</button>
      </form>

      <p className="text-sm text-muted mt-4">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </p>
    </div>
  );
}
