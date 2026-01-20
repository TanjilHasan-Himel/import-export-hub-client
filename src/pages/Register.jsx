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
  const [photo, setPhoto] = useState("https://i.ibb.co/0jZQZ7W/user.png");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validPass = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && p.length >= 6;

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !pass || !confirmPass) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!validPass(pass)) {
      toast.error("Password: 1 Uppercase + 1 Lowercase + min 6 chars");
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await signUp(email, pass);
      await updateUserProfile(name, photo);
      toast.success("Account created successfully!");
      nav("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast.success("Registered with Google!");
      nav("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Join Us 🚀</h1>
          <p className="text-base-content/60 mt-2">Create your ImportExportHub account</p>
        </div>

        <div className="card bg-white dark:bg-gray-800 p-8 shadow-lg">
          {/* Registration Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Photo URL (optional)</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Password</span>
                <span className="label-text-alt text-xs text-base-content/60">
                  1 Upper + 1 Lower + min 6 chars
                </span>
              </label>
              <div className="relative">
                <input
                  className="input input-bordered w-full pr-10"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-lg"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  className="input input-bordered w-full pr-10"
                  placeholder="Confirm your password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-lg"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          {/* Google Sign In */}
          <button
            onClick={onGoogle}
            disabled={loading}
            className="btn btn-outline w-full"
          >
            🔵 Sign Up with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Info Card */}
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 p-6 mt-6">
          <h3 className="font-extrabold mb-2">🔒 Your Data is Safe</h3>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>✓ Secure encryption</li>
            <li>✓ Privacy protected</li>
            <li>✓ No spam emails</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

