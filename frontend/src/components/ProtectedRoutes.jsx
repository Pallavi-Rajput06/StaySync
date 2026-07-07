import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/slices/userSlice";
import { setFavorites } from "../redux/slices/favoritesSlice";
import API from "../services/axios";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (token && !user && !loading) {
      dispatch(fetchUserProfile());
      
      // Fetch favorites and synchronize with Redux
      API.get("/users/favorites")
        .then((res) => {
          dispatch(setFavorites(res.data.favorites));
        })
        .catch((err) => {
          console.error("Failed to load favorites in ProtectedRoute:", err);
        });
    }
  }, [token, user, loading, dispatch]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (loading || (token && !user)) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-6"></div>
        <p className="text-xl font-semibold">Loading your profile...</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;