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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, pass);
      toast.success("Logged in successfully!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      toast.success("Logged in with Google!");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const useDemoCredentials = (role = "user") => {
    const demoAccounts = {
      user: { email: "demo@trader.com", password: "demo123456" },
      admin: { email: "admin@trader.com", password: "admin123456" },
    };
    const account = demoAccounts[role];
    setEmail(account.email);
    setPass(account.password);
    toast.success(`Demo ${role} credentials loaded!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Welcome Back 👋</h1>
          <p className="text-base-content/60 mt-2">Login to your ImportExportHub account</p>
        </div>

        <div className="card bg-white dark:bg-gray-800 p-8 shadow-lg">
          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider my-4">OR</div>

          {/* Google Sign In */}
          <button
            onClick={onGoogle}
            disabled={loading}
            className="btn btn-outline w-full mb-4"
          >
            🔵 Continue with Google
          </button>

          {/* Demo Credentials */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
            <p className="font-semibold text-sm mb-3 text-blue-900 dark:text-blue-100">
              🧪 Try Demo Credentials:
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => useDemoCredentials("user")}
                className="btn btn-sm btn-ghost w-full justify-start text-left"
              >
                👤 Demo User
              </button>
              <button
                type="button"
                onClick={() => useDemoCredentials("admin")}
                className="btn btn-sm btn-ghost w-full justify-start text-left"
              >
                👑 Demo Admin
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>

        {/* Info Card */}
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 p-6 mt-6">
          <h3 className="font-extrabold mb-2">✨ Secure Login</h3>
          <p className="text-sm text-base-content/70">
            Your login credentials are encrypted and secured with industry-standard protocols.
          </p>
        </div>
      </div>
    </div>
  );
}

