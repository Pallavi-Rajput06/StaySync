import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/users/reset-password",
        {
          email,
          otp,
          password: formData.password,
        }
      );

      toast.success(response.data.message);

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-[450px] bg-[#111827] p-10 rounded-2xl"
      >

        <h1 className="text-4xl font-bold text-white">
          Reset Password
        </h1>

        <p className="text-gray-400 mt-3">
          Create a new password.
        </p>

        <div className="mt-10">

          <label className="block text-white mb-3">
            New Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white outline-none focus:border-blue-500"
          />

        </div>

        <div className="mt-6">

          <label className="block text-white mb-3">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white outline-none focus:border-blue-500"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>

        <p className="text-center text-gray-400 mt-8">

          <Link
            to="/"
            className="text-blue-500"
          >
            Back to Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default ResetPassword;