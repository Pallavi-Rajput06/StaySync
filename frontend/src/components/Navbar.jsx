import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Heart,
  MapPin,
  LogOut,
  UserCircle2,
  Compass
} from "lucide-react";
import { clearUser } from "../redux/slices/userSlice";
import { setFavorites } from "../redux/slices/favoritesSlice";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const isDashboard = location.pathname === "/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    dispatch(setFavorites([]));
    navigate("/");
  };

  return (
    <nav className={`${isDashboard ? "absolute top-0 left-0  bg-transparent" : "relative bg-[#0F172A]"} w-full z-50 transition-all duration-300`}>
      <div className="max-w-[1450px] mx-auto px-12 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-[28px] font-bold text-white">
            Stay<span className="text-blue-500">Nest</span>
          </h1>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-8 text-white">
          <Link to="/">
            <button className={`font-semibold hover:text-blue-400 cursor-pointer transition ${location.pathname === "/" || location.pathname === "/dashboard" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              Home
            </button>
          </Link>

          <Link to="/hostels">
            <button className={`flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition ${location.pathname === "/hostels" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              <MapPin size={18} />
              Explore Hostels
            </button>
          </Link>

          <Link to="/city-guide">
            <button className={`flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition ${location.pathname === "/city-guide" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              <Compass size={18} />
              City Guide
            </button>
          </Link>

          <Link to="/favorites">
            <button className={`flex items-center gap-1.5 hover:text-blue-400 cursor-pointer transition ${location.pathname === "/favorites" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              <Heart size={18} />
              Favorites
            </button>
          </Link>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-xl hover:bg-blue-600/30 transition"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center gap-2.5 text-white hover:text-blue-400 transition cursor-pointer"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8.5 h-8.5 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <UserCircle2 size={26} />
                )}
                <span className="font-medium text-sm">
                  {user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 px-3 py-2 rounded-xl flex items-center gap-1.5 text-red-400 cursor-pointer transition text-xs font-semibold"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white font-semibold transition text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold transition text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;