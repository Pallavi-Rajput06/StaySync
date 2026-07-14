import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/axios";



function Register() {
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

const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "student",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    return toast.error("Please fill all fields");
  }

  if (formData.password !== formData.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {
    setLoading(true);

    const response = await API.post("/users/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    localStorage.setItem("token", response.data.token);

    toast.success(response.data.message);

    navigate(redirectBackTo);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration Failed"
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
          Create Account
					</h1>

					<p className="text-gray-400 mt-3">
          Create your account to get started
					</p>


					<form className="mt-12" onSubmit={handleSubmit}>

            {/* Role Selection Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "student" })}
                className={`flex-1 py-3.5 rounded-xl font-bold border text-sm transition-all duration-300 cursor-pointer ${
                  formData.role === "student"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Join as Student
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "admin" })}
                className={`flex-1 py-3.5 rounded-xl font-bold border text-sm transition-all duration-300 cursor-pointer ${
                  formData.role === "admin"
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
              >
                Join as Hostel Owner
              </button>
            </div>

{/* Name */}

  <div>


<label
  htmlFor="name"
  className="block text-white mb-3"
>
  Full Name
</label>

<input
  id="name"
  name="name"
  type="text"
  placeholder="Enter your full name"
  value={formData.name}
  onChange={handleChange}
  required
  className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
/>


  </div>

{/* Email */}

  <div className="mt-6">


<label
  htmlFor="email"
  className="block text-white mb-3"
>
  Email Address
</label>

<input
  id="email"
  name="email"
  type="email"
  placeholder="Enter your email"
  autoComplete="email"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
/>


  </div>

{/* Password */}

  <div className="mt-6">


<label
  htmlFor="password"
  className="block text-white mb-3"
>
  Password
</label>

<input
  id="password"
  name="password"
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  required
  className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
/>


  </div>

{/* Confirm Password */}

  <div className="mt-6">


<label
  htmlFor="confirmPassword"
  className="block text-white mb-3"
>
  Confirm Password
</label>

<input
  id="confirmPassword"
  name="confirmPassword"
  type={showConfirmPassword ? "text" : "password"}
  placeholder="Confirm your password"
  value={formData.confirmPassword}
  onChange={handleChange}
  required
  className="w-full h-14 rounded-xl bg-[#1F2937] border border-gray-700 px-5 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
/>


  </div>

<button
type="submit"
disabled={loading}
className="w-full h-14 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold transition-all duration-300"

>

{loading ? "Creating Account..." : "Create Account"}


  </button>

{/* Divider */}

  <div className="flex items-center my-8">


<div className="flex-1 h-px bg-gray-700"></div>

<span className="px-4 text-gray-400 text-sm">
  OR
</span>

<div className="flex-1 h-px bg-gray-700"></div>


  </div>

{/* Google */}
<button
  type="button"
  onClick={() => {
    sessionStorage.setItem("redirectBackTo", redirectBackTo);
    window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/users/auth/google`;
  }}
  className="w-full h-14 border border-gray-700 rounded-xl bg-[#1F2937] hover:bg-[#293548] flex items-center justify-center gap-3 text-white cursor-pointer"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="Google"
    className="w-6 h-6"
  />

  Continue with Google
</button>

  <p className="text-center text-gray-400 mt-8">


Already have an account?

<Link
  to="/"
  className="text-blue-500 hover:text-blue-400 ml-2"
>
  Login
</Link>


  </p>

</form>



				</div>

			</div>

		</div>
	);
  }
  
  export default Register;