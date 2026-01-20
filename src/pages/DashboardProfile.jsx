import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

export default function DashboardProfile() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
    company: "",
    address: "",
    country: "Bangladesh",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.title = "Profile | Dashboard";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary to-secondary text-white p-8">
        <h1 className="text-3xl font-extrabold">My Profile 👤</h1>
        <p className="text-white/80 mt-2">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="card bg-white dark:bg-gray-800 p-6 text-center">
            <img
              src={formData.photoURL || "https://i.ibb.co/0jZQZ7W/user.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
            />
            <h2 className="text-2xl font-extrabold">{formData.displayName}</h2>
            <p className="text-base-content/60 mt-1">{formData.email}</p>
            <div className="mt-4 space-y-2">
              <div className="badge badge-primary badge-lg">Verified Trader</div>
              <div className="badge badge-secondary badge-lg">Active</div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold">Account Information</h3>
              <button
                onClick={() => setEditing(!editing)}
                className="btn btn-sm btn-primary"
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  disabled={!editing}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="input input-bordered w-full opacity-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Your phone number"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Company Name</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Your company name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Your address"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Country</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!editing}
                  className="select select-bordered w-full"
                >
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>Pakistan</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>

              {editing && (
                <button onClick={handleSave} className="btn btn-primary w-full mt-6">
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Account Statistics */}
          <div className="card bg-white dark:bg-gray-800 p-6 mt-6">
            <h3 className="text-xl font-extrabold mb-4">Account Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-base-200 dark:bg-gray-700 rounded-lg">
                <p className="text-base-content/60 text-sm">Member Since</p>
                <p className="font-extrabold">Jan 2024</p>
              </div>
              <div className="p-4 bg-base-200 dark:bg-gray-700 rounded-lg">
                <p className="text-base-content/60 text-sm">Reputation Score</p>
                <p className="font-extrabold text-primary">98/100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
