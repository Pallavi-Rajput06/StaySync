import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/axios";
import toast from "react-hot-toast";



function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState("student"); // "student" or "admin"
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectBackTo = location.state?.from || "/";
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      toast.error(message, { id: "auth-message" });
    }
  }, [message]);

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }
    try {
      setLoading(true);
      const response = await API.post("/users/login", formData);

      // Role check validation
      if (response.data.user.role !== role) {
        if (role === "admin") {
          return toast.error("This account is not registered as a Hostel Owner / Admin.");
        } else {
          return toast.error("This account is an Administrator. Please log in using the Owner tab.");
        }
      }

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);

      navigate(redirectBackTo);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };
	return (
		<div className="min-h-screen bg-[#0F172A] flex">

			{/* Left Section */}
			<div className="w-1/2 bg-[#0B1120] p-14 flex flex-col justify-between">

				{/* Logo */}

				<div>

					<h1 className="text-4xl font-bold text-white">

						Stay<span className="text-blue-500">Nest</span>

					</h1>

				</div>


				{/* Center Content */}

				<div>

					<h2 className="text-6xl font-bold text-white leading-tight">

						Find Your

						<br />

						Perfect Stay,

						<br />

						<span className="text-blue-500">

							Live Your Journey.

						</span>

					</h2>


					<p className="text-gray-400 mt-8 text-xl leading-9 w-[80%]">

						Discover verified hostels, PGs and

						student-friendly accommodations

						near your university.

					</p>

				</div>


				{/* Bottom */}

				<div>

					<p className="text-gray-500">

						© 2026 StayNest

					</p>

				</div>

			</div>
			{/* Right Section */}
			<div className="w-1/2 bg-[#111827] flex items-center justify-center">

				<div className="w-[450px]">

					<h1 className="text-5xl font-bold text-white">
						Welcome Back
					</h1>

					<p className="text-gray-400 mt-3">
						Login to continue your journey
					</p>


					<form
  className="mt-12"
  onSubmit={handleSubmit}
> 

            {/* Role Selection Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-3.5 rounded-xl font-bold border text-sm transition-all duration-300 cursor-pointer ${
                  role === "student"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Login as Student
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-3.5 rounded-xl font-bold border text-sm transition-all duration-300 cursor-pointer ${
                  role === "admin"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Login as Owner
              </button>
            </div> 
						<div> 
							<label htmlFor="email" className="block text-white mb-3" > Email Address </label>
							<input
  id="email"
  name="email"
  type="email"
  placeholder="Enter your email"
  autoComplete="email"
  required
  value={formData.email}
  onChange={handleChange}
  className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
/>	</div> 
							  
						{/* Password */} 
						<div className="mt-6">

  <label
    htmlFor="password"
    className="block text-white mb-3"
  >
    Password
  </label>

  <div className="relative">

    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      autoComplete="current-password"
      required
      value={formData.password}
      onChange={handleChange}
      className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 pr-14 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
    >
      {showPassword ? "🙈" : "👁"}
    </button>

  </div>

</div>
						
						{/* Forgot Password */} 
						<div className="flex justify-end mt-3"> 
						<Link
  to="/forgot-password"
  className="text-blue-500 hover:text-blue-400"
>
  Forgot Password?
</Link>
						</div> 
						
						{/* Login Button */} 
						<button
  type="submit"
  disabled={loading}
  className="w-full h-14 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
>
  {loading ? "Logging in..." : "Login"}
</button>



						{/* OR Divider */}

<div className="flex items-center my-8">

<div className="flex-1 h-px bg-gray-700"></div>

<span className="px-4 text-gray-400 text-sm">
  OR
</span>

<div className="flex-1 h-px bg-gray-700"></div>

</div>

{/* Google Login */}

<button
  type="button"
  onClick={() => {
    sessionStorage.setItem("redirectBackTo", redirectBackTo);
    window.location.href =
      `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/users/auth/google`;
  }}
  
className="w-full h-14 border border-gray-700 rounded-xl bg-[#1F2937] hover:bg-[#293548] transition-all duration-300 flex items-center justify-center gap-3 text-white font-medium cursor-pointer"

>

<img
src="https://www.svgrepo.com/show/475656/google-color.svg"
alt="Google"
className="w-6 h-6"
/>

Continue with Google

</button>

{/* Register */}
<p className="text-center text-gray-400 mt-8">
  Don't have an account?

  <Link
    to="/register"
    className="text-blue-500 hover:text-blue-400 ml-2"
  >
    Register
  </Link>
</p>
					</form>


				</div>

			</div>

		</div>
	);
}

export default Login;