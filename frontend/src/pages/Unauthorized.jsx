import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-6 text-white text-center">
      
      {/* Warning Icon */}
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-2xl mb-8 text-red-500 animate-pulse">
        <ShieldAlert size={52} />
      </div>

      {/* Access Denied details */}
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-500 tracking-widest">
        403
      </h1>

      <h2 className="text-3xl font-bold mt-4 tracking-wide text-white">
        Access Denied
      </h2>

      <p className="text-gray-400 mt-4 text-base max-w-md leading-relaxed">
        You do not have the required administrative privileges to view this portal. Access is strictly reserved for hostel owners and platform admins.
      </p>

      {/* Actions */}
      <Link
        to="/dashboard"
        className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

    </div>
  );
}

export default Unauthorized;
