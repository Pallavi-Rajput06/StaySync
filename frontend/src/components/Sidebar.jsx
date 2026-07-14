import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  LogOut,
  UserCircle2,
  Settings,
  Users,
  Building,
  Star,
} from "lucide-react";
import { clearUser } from "../redux/slices/userSlice";
import { setFavorites } from "../redux/slices/favoritesSlice";

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    dispatch(setFavorites([]));
    navigate("/");
  };

  const menuItems = [
    {
      id: "overview",
      name: "Dashboard Overview",
      icon: LayoutDashboard,
    },
    {
      id: "my-hostels",
      name: "My Hostels",
      icon: Home,
    },
    {
      id: "add-hostel",
      name: "Add Hostel",
      icon: PlusCircle,
    },
    {
      id: "users-management",
      name: "User Management",
      icon: Users,
    },
    {
      id: "listings-management",
      name: "Listings Verification",
      icon: Building,
    },
    {
      id: "reviews-moderation",
      name: "Review Moderation",
      icon: Star,
    },
  ];

  return (
    <aside className="w-80 bg-[#0B1120] min-h-screen text-gray-300 flex flex-col justify-between shrink-0 border-r border-gray-800">
      
      {/* Top Section */}
      <div>
        
        {/* Logo Banner */}
        <div className="px-8 py-8 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Stay<span className="text-blue-500">Nest</span>
            <span className="text-xs ml-2 bg-blue-600/35 text-blue-400 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
              Admin
            </span>
          </h1>
        </div>

        {/* User Card */}
        <div className="px-6 py-6 border-b border-gray-800 flex items-center gap-4 bg-slate-900/30">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <UserCircle2 className="text-blue-500" size={44} />
          )}
          <div>
            <h3 className="font-bold text-white text-base truncate w-44">
              {user?.name || "Hostel Owner"}
            </h3>
            <p className="text-xs text-blue-400 font-medium capitalize mt-0.5">
              {user?.role || "Administrator"}
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === "my-hostels" && activeTab === "edit-hostel");
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition text-left cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "text-gray-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon size={22} className={isActive ? "text-white" : "text-gray-500"} />
                {item.name}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-2">
        <button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-gray-400 hover:bg-slate-900 hover:text-white transition text-left cursor-pointer"
        >
          <Settings size={22} className="text-gray-500" />
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition text-left cursor-pointer border border-transparent hover:border-red-900/30"
        >
          <LogOut size={22} className="text-red-500" />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;
