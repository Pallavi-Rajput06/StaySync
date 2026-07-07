import Navbar from "../components/Navbar";
import HostelCard from "../components/dashboard/HostelCard";
import useFavorites from "../hooks/useFavorites";
import { useSelector } from "react-redux";
function Favourites() {
const {loading}= useFavorites();
const favorites = useSelector(
  (state) => state.favorites.favorites
);
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-2">
          My Favorites ❤️
        </h1>

        <p className="text-gray-500 mb-10">
          Your saved hostels
        </p>

        {favorites.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md py-20 text-center">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Favorites Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Save your favourite hostels to view them here.
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
  );
}

export default Favourites;