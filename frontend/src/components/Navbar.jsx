import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  MapPin,
  LogOut,
  UserCircle2,
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
    <nav className={`${isDashboard ? "absolute top-0 left-0 bg-transparent" : "relative bg-[#0F172A]"} w-full z-50 transition-all duration-300`}>
      <div className="max-w-[1450px] mx-auto px-12 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard">
          <h1 className="text-[35px] font-bold text-white">
            Stay<span className="text-blue-500">Nest</span>
          </h1>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-12 text-white">
          <Link to="/dashboard">
            <button className={`font-semibold hover:text-blue-400 cursor-pointer transition ${isDashboard ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              Home
            </button>
          </Link>

          <Link to="/favorites">
            <button className={`flex items-center gap-2 hover:text-blue-400 cursor-pointer transition ${location.pathname === "/favorites" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              <Heart size={20} />
              Favorites
            </button>
          </Link>

          <Link to="/hostels">
            <button className={`flex items-center gap-2 hover:text-blue-400 cursor-pointer transition ${location.pathname === "/hostels" ? "text-blue-500 border-b-2 border-blue-500 pb-1" : ""}`}>
              <MapPin size={20} />
              Explore Hostels
            </button>
          </Link>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-10">
          <Link
            to="/profile"
            className="flex items-center gap-3 text-white hover:text-blue-400 transition cursor-pointer"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <UserCircle2 size={28} />
            )}
            <span className="font-medium">
              {user?.name || "Profile"}
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2 text-white cursor-pointer transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;