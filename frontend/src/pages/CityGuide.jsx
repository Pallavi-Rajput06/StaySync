import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/axios";
import toast from "react-hot-toast";
import { Compass, Coins, ShieldAlert, MapPin, Landmark, ArrowRight } from "lucide-react";

function CityGuide() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await API.get("/city-guides");
        if (response.data.success) {
          setGuides(response.data.guides);
          // Set default to Indore if present, or first guide
          const indore = response.data.guides.find(
            (g) => g.city.toLowerCase() === "indore"
          );
          setSelectedGuide(indore || response.data.guides[0] || null);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load relocation guides");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const handleCityChange = (cityName) => {
    const guide = guides.find((g) => g.city === cityName);
    if (guide) {
      setSelectedGuide(guide);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading City Guides...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            City Relocation <span className="text-blue-500">Guides</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">
            Everything you need to know about cost of living, safety guidelines, and student neighborhoods in your new academic destination.
          </p>

          {/* City Selection Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {guides.map((g) => (
              <button
                key={g._id}
                onClick={() => handleCityChange(g.city)}
                className={`px-6 py-3 rounded-2xl font-bold border transition duration-300 text-sm cursor-pointer ${
                  selectedGuide?.city === g.city
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                    : "bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
                }`}
              >
                {g.city}
              </button>
            ))}
          </div>
        </div>

        {selectedGuide ? (
          <div className="space-y-12 animate-fade-in">
            {/* Overview Section */}
            <div className="bg-[#1E293B]/40 border border-gray-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm flex flex-col md:flex-row gap-8 items-center">
              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-400 shrink-0">
                <Landmark size={48} />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Welcome to {selectedGuide.city}!
                </h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  {selectedGuide.overview}
                </p>
              </div>
            </div>

            {/* Split Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cost of Living */}
              <div className="lg:col-span-1 bg-[#1E293B]/40 border border-gray-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400 border-b border-gray-800 pb-3">
                  <Coins size={22} />
                  Cost of Living
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-[#1E293B]/70 rounded-2xl border border-gray-800/80">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">PG / Hostel Rent</p>
                    <p className="text-base font-bold text-white mt-1">{selectedGuide.costOfLiving.pgRent}</p>
                  </div>
                  <div className="p-4 bg-[#1E293B]/70 rounded-2xl border border-gray-800/80">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Food Expenses</p>
                    <p className="text-base font-bold text-white mt-1">{selectedGuide.costOfLiving.food}</p>
                  </div>
                  <div className="p-4 bg-[#1E293B]/70 rounded-2xl border border-gray-800/80">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Local Transport</p>
                    <p className="text-base font-bold text-white mt-1">{selectedGuide.costOfLiving.transport}</p>
                  </div>
                  <div className="p-4 bg-[#1E293B]/70 rounded-2xl border border-gray-800/80">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Utilities & Misc</p>
                    <p className="text-base font-bold text-white mt-1">{selectedGuide.costOfLiving.utilities}</p>
                  </div>
                </div>
              </div>

              {/* Safety Guidelines */}
              <div className="lg:col-span-2 bg-[#1E293B]/40 border border-gray-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-green-400 border-b border-gray-800 pb-3">
                  <ShieldAlert size={22} />
                  Safety Guidelines & Relocation Tips
                </h3>

                <ul className="space-y-4">
                  {selectedGuide.safetyTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-4 p-4 bg-green-500/5 border border-green-500/10 rounded-2xl text-gray-300 text-sm leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Student Areas */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <MapPin size={24} className="text-red-400" />
                Popular Student Hubs in {selectedGuide.city}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedGuide.popularAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1E293B]/30 border border-gray-800/80 hover:border-gray-700/80 rounded-3xl p-6 transition duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition">{area.name}</h4>
                        <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full shrink-0">
                          {area.cost} Cost
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Explore Listings Near Here
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            No relocation guides found.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CityGuide;
