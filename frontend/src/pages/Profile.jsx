import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import API from "../services/axios";
import { setUser } from "../redux/slices/userSlice";
import { Camera, Lock, Mail, User, ShieldAlert, CheckCircle } from "lucide-react";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      }));
    }
  }, [user]);

  const isGoogleUser = user?.authProvider === "google";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name cannot be empty");
    }

    if (!isGoogleUser && !formData.email.trim()) {
      return toast.error("Email cannot be empty");
    }

    // Password validation
    if (formData.newPassword || formData.oldPassword || formData.confirmPassword) {
      if (!formData.oldPassword) {
        return toast.error("Current password is required to set a new password");
      }
      if (!formData.newPassword) {
        return toast.error("New password is required");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        return toast.error("New passwords do not match");
      }
      if (formData.newPassword.length < 6) {
        return toast.error("New password must be at least 6 characters");
      }
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        avatar: formData.avatar,
      };

      if (!isGoogleUser) {
        payload.email = formData.email;
        if (formData.newPassword) {
          payload.oldPassword = formData.oldPassword;
          payload.newPassword = formData.newPassword;
        }
      }

      const response = await API.put("/users/profile", payload);

      dispatch(setUser(response.data.user));
      toast.success(response.data.message || "Profile updated successfully!");

      // Clear password fields on success
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-10 py-12 text-white relative">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold">Account Settings</h1>
              <p className="mt-2 text-blue-100">Manage your profile information and preferences</p>
            </div>
            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none">
              <User size={180} />
            </div>
          </div>

          <div className="p-10">
            {isGoogleUser && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3 text-blue-800">
                <CheckCircle className="shrink-0 text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold">Linked with Google</h3>
                  <p className="text-sm text-blue-700 mt-0.5">
                    Your account is registered via Google OAuth. Profile picture, email address, and security credentials are managed by Google.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Section 1: Basic Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                        <User size={20} />
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Full Name"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                        <Mail size={20} />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isGoogleUser}
                        required
                        placeholder="yourname@example.com"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition text-gray-800 ${
                          isGoogleUser
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Avatar URL */}
                  <div className="md:col-span-2">
                    <label htmlFor="avatar" className="block text-gray-700 font-medium mb-2">
                      Avatar URL
                    </label>
                    <div className="flex gap-6 items-center">
                      <div className="relative shrink-0">
                        {formData.avatar ? (
                          <img
                            src={formData.avatar}
                            alt="Avatar Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
                            onError={(e) => {
                              e.target.src = "https://www.svgrepo.com/show/507442/user-circle.svg";
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                            <Camera size={28} />
                          </div>
                        )}
                      </div>
                      
                      <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                          <Camera size={20} />
                        </span>
                        <input
                          id="avatar"
                          name="avatar"
                          type="text"
                          value={formData.avatar}
                          onChange={handleChange}
                          placeholder="Paste a direct link to an image"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Security */}
              {!isGoogleUser && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">
                    Change Password
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Old Password */}
                    <div>
                      <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                          <Lock size={18} />
                        </span>
                        <input
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          value={formData.oldPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800"
                        />
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                          <Lock size={18} />
                        </span>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                          <Lock size={18} />
                        </span>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 outline-none transition text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 border-t border-gray-100 pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
