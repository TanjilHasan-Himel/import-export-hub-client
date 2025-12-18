import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      toast.success("Registered");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card p-6 md:p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-extrabold text-white">Register</h2>

      <form onSubmit={handleRegister} className="mt-6 space-y-3">
        <input className="btn w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="btn w-full" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo URL" />
        <input className="btn w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="btn w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary w-full" type="submit">Create Account</button>
      </form>

      <p className="text-white/70 text-sm mt-4">
        Already have account? <Link className="underline" to="/login">Login</Link>
      </p>
    </div>
  );
}
