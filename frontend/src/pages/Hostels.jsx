import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useHostels from "../hooks/useHostels";
import HostelCard from "../components/dashboard/HostelCard";
import { Search, FilterX, ShieldCheck, ArrowUpDown, SlidersHorizontal, X } from "lucide-react";

const AMENITY_OPTIONS = [
  "WiFi",
  "AC",
  "Meals",
  "Laundry",
  "Gym",
  "Power Backup",
  "Security",
  "Parking",
  "TV"
];

function Hostels() {
  const { hostels, loading } = useHostels();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load initial filters from URL params if available
  const initialSearch = searchParams.get("search") || "";
  const initialCity = searchParams.get("city") || "";

  // Local Filter States
  const [search, setSearch] = useState(initialSearch);
  const [city, setCity] = useState(initialCity);
  const [gender, setGender] = useState("");
  const [roomType, setRoomType] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("rating-desc");

  // Sync state if URL search query changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCity(searchParams.get("city") || "");
  }, [searchParams]);

  // Update URL parameters when search or city filters change
  const updateURLParams = (newSearch, newCity) => {
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newCity) params.city = newCity;
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    updateURLParams(value, city);
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    updateURLParams(search, value);
  };

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCity("");
    setGender("");
    setRoomType("");
    setMinRent("");
    setMaxRent("");
    setVerifiedOnly(false);
    setSelectedAmenities([]);
    setSortBy("rating-desc");
    setSearchParams({});
  };

  // Perform Client-side Filtering & Sorting using useMemo
  const filteredAndSortedHostels = useMemo(() => {
    if (!hostels) return [];

    let result = [...hostels];

    // Search query match
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.hostelName.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.area.toLowerCase().includes(q)
      );
    }

    // City match
    if (city) {
      result = result.filter((h) => h.city.toLowerCase() === city.toLowerCase());
    }

    // Gender match
    if (gender) {
      result = result.filter((h) => h.gender.toLowerCase() === gender.toLowerCase());
    }

    // Room Type match
    if (roomType) {
      result = result.filter((h) => h.roomType.toLowerCase() === roomType.toLowerCase());
    }

    // Rent match
    if (minRent) {
      result = result.filter((h) => h.rent >= Number(minRent));
    }
    if (maxRent) {
      result = result.filter((h) => h.rent <= Number(maxRent));
    }

    // Verification status match
    if (verifiedOnly) {
      result = result.filter((h) => h.verified === true);
    }

    // Amenities match (must contain all selected amenities)
    if (selectedAmenities.length > 0) {
      result = result.filter((h) => {
        const hostelFacilitiesLower = (h.facilities || []).map((f) => f.toLowerCase());
        return selectedAmenities.every((amenity) =>
          hostelFacilitiesLower.includes(amenity.toLowerCase())
        );
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "rent-asc") {
        return a.rent - b.rent;
      }
      if (sortBy === "rent-desc") {
        return b.rent - a.rent;
      }
      if (sortBy === "rating-desc") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [hostels, search, city, gender, roomType, minRent, maxRent, verifiedOnly, selectedAmenities, sortBy]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-[1450px] mx-auto px-8 py-10">
        
        {/* Search & Top Action Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400">
              <Search size={22} />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by hostel name, city or area..."
              className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-14 pr-5 py-4 rounded-2xl border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-lg transition"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto shrink-0 justify-end">
            {/* Sorting Dropdown */}
            <div className="relative w-1/2 md:w-[220px]">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 pointer-events-none">
                <ArrowUpDown size={18} />
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 pl-11 pr-8 py-4 rounded-2xl border border-gray-200 outline-none appearance-none focus:bg-white focus:border-blue-500 font-medium cursor-pointer transition"
              >
                <option value="rating-desc">⭐ Top Rated</option>
                <option value="rent-asc">💸 Rent: Low to High</option>
                <option value="rent-desc">📈 Rent: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-600 hover:text-red-600 px-6 py-4 rounded-2xl font-semibold transition cursor-pointer"
            >
              <FilterX size={20} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>

        {/* Main Grid: Sidebar Filters & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 h-fit space-y-8">
            
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <SlidersHorizontal className="text-blue-600" size={22} />
              <h2 className="text-xl font-bold text-gray-800">Advanced Filters</h2>
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">City</label>
              <select
                value={city}
                onChange={handleCityChange}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white cursor-pointer text-gray-800 transition"
              >
                <option value="">All Cities</option>
                <option value="Indore">Indore</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Gender Type</label>
              <div className="grid grid-cols-3 gap-2">
                {["boys", "girls", "co-ed"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(gender === g ? "" : g)}
                    className={`py-2 px-3 text-sm rounded-xl font-semibold border capitalize transition cursor-pointer text-center ${
                      gender === g
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Room Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white cursor-pointer text-gray-800 transition"
              >
                <option value="">Any Room Type</option>
                <option value="Single">Single Room</option>
                <option value="Double">Double Sharing</option>
                <option value="Triple">Triple Sharing</option>
                <option value="Dormitory">Dormitory</option>
              </select>
            </div>

            {/* Rent Range */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Monthly Rent (₹)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={minRent}
                  onChange={(e) => setMinRent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl text-center outline-none focus:border-blue-500 focus:bg-white text-gray-800 text-sm transition"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl text-center outline-none focus:border-blue-500 focus:bg-white text-gray-800 text-sm transition"
                />
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={20} />
                <span className="text-sm font-semibold text-emerald-800">Verified Only</span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Facilities / Amenities */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">Facilities</label>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                {AMENITY_OPTIONS.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition text-gray-700 text-sm"
                    >
                      <span>{amenity}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            
            {/* Results Title Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 font-medium">
                Showing <span className="font-bold text-gray-900">{filteredAndSortedHostels.length}</span> hostels
              </p>
              
              {/* Filter Badges Display */}
              <div className="flex flex-wrap gap-2">
                {city && (
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-100">
                    City: {city}
                    <X size={12} className="cursor-pointer hover:text-blue-900" onClick={() => { setCity(""); updateURLParams(search, ""); }} />
                  </span>
                )}
                {gender && (
                  <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-purple-100">
                    Gender: {gender}
                    <X size={12} className="cursor-pointer hover:text-purple-900" onClick={() => setGender("")} />
                  </span>
                )}
                {roomType && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-100">
                    Room: {roomType}
                    <X size={12} className="cursor-pointer hover:text-amber-900" onClick={() => setRoomType("")} />
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-3xl shadow-md p-20 text-center flex flex-col items-center justify-center border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500 font-medium">Searching hostels...</p>
              </div>
            ) : filteredAndSortedHostels.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-20 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-6">
                  🔍
                </div>
                <h3 className="text-2xl font-bold text-gray-700">No Hostels Found</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  We couldn't find any hostels matching your exact search criteria. Try removing some filters or search query terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedHostels.map((hostel) => (
                  <HostelCard key={hostel._id} hostel={hostel} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Hostels;
