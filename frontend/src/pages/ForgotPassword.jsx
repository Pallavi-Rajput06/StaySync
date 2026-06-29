import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const response = await API.post(
        "/users/forgot-password",
        {
          email,
        }
      );

      toast.success(response.data.message);

      navigate("/verify-otp", {
        state: { email },
      });

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
          Forgot Password
        </h1>

        <p className="text-gray-400 mt-3">
          Enter your registered email.
        </p>

        <div className="mt-10">

          <label className="block text-white mb-3">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white outline-none focus:border-blue-500"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        <p className="text-center text-gray-400 mt-8">

          Remember Password?

          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default ForgotPassword;