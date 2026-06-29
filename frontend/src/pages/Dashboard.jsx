import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
  
	navigate("/");
  };
  return (
    <div className="min-h-screen bg-[#0F172A]">

      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-700">

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white cursor-pointer"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;