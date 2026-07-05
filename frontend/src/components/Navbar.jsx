import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  LogOut,
  UserCircle2,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="max-w-[1450px] mx-auto px-12 py-6 flex justify-between items-center">

        {/* Logo */}

        <Link to="/dashboard">

          <h1 className="text-[35px] font-bold text-white">

            Stay<span className="text-blue-500">Nest</span>

          </h1>

        </Link>

        {/* Center */}

        <div className="flex items-center gap-12 text-white">

          <button className="font-semibold text-blue-500 border-b-2 border-blue-500 pb-1 cursor-pointer">

            Home

          </button>

          <button className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">

            <Heart size={20} />

            Favorites

          </button>

          <button className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">

            <MapPin size={20} />

            Explore Cities

          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-10">

          <div className="flex items-center gap-3 text-white">

            <UserCircle2 size={28} />

            <span className="font-medium">

              Pallavi

            </span>

          </div>

          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2 text-white cursor-pointer"
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