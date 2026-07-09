import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostelCard from "../components/dashboard/HostelCard";
import useFavorites from "../hooks/useFavorites";
import { useSelector } from "react-redux";
import { HostelCardSkeleton } from "../components/SkeletonLoader";

function Favourites() {
  const { loading } = useFavorites();
  const favorites = useSelector(
    (state) => state.favorites.favorites
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 py-12">
          
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              My Favorites ❤️
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Manage your saved student accommodations
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <HostelCardSkeleton key={n} />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm py-20 px-6 text-center border border-gray-100 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-6 border border-red-100">
                ❤️
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Favorites List is Empty
              </h2>
              <p className="text-gray-500 mt-3 font-medium max-w-md mx-auto leading-relaxed">
                Save your favourite hostels, PGs or student accommodations while browsing, and they will appear here for easy comparison.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((hostel) => (
                <HostelCard
                  key={hostel._id}
                  hostel={hostel}
                />
              ))}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Favourites;