import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-6 text-white text-center">
      
      {/* Decorative Icon */}
      <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 shadow-2xl mb-8 animate-bounce">
        <HelpCircle size={48} className="text-blue-500" />
      </div>

      {/* Main Error Details */}
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 tracking-widest">
        404
      </h1>
      
      <h2 className="text-3xl font-bold mt-4 tracking-wide text-white">
        Lost in Translation?
      </h2>
      
      <p className="text-gray-400 mt-4 text-base max-w-md leading-relaxed">
        The page you are looking for does not exist, has been removed, or is temporarily unavailable. Let's get you back on track!
      </p>

      {/* Action Button */}
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

export default NotFound;
