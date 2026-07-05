import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center p-3">

      <div className="flex items-center flex-1 gap-4 px-4">

        <Search
          size={24}
          className="text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by city, area or hostel..."
          className="w-full bg-transparent outline-none text-lg"
        />

      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;