import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/axios";
import toast from "react-hot-toast";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const response = await API.post("/users/verify-otp", {
        email,
        otp,
      });

      toast.success(response.data.message);

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP"
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
          Verify OTP
        </h1>

        <p className="text-gray-400 mt-3">
          Enter the OTP sent to your email.
        </p>

        <div className="mt-10">

          <label className="block text-white mb-3">
            OTP
          </label>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white outline-none focus:border-blue-500"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center text-gray-400 mt-8">
          <Link to="/" className="text-blue-500">
            Back to Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default VerifyOTP;