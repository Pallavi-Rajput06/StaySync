import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/axios";
import toast from "react-hot-toast";
import {
  DollarSign,
  Home,
  CheckCircle,
  Clock,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info
} from "lucide-react";

const CITIES = ["Indore", "Bhopal", "Delhi", "Pune"];
const ROOM_TYPES = ["Single", "Double", "Triple", "Dormitory"];
const GENDER_TYPES = ["boys", "girls", "co-ed"];
const FACILITY_OPTIONS = [
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

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useSelector((state) => state.user);

  // Tab state: "overview" | "my-hostels" | "add-hostel" | "edit-hostel"
  const [activeTab, setActiveTab] = useState("overview");
  
  // Data state
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHostelId, setSelectedHostelId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    hostelName: "",
    city: "Indore",
    area: "",
    address: "",
    description: "",
    rent: "",
    gender: "co-ed",
    roomType: "Single",
    facilities: [],
    images: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    latitude: 22.7196, // default Indore
    longitude: 75.8577, // default Indore
    available: true,
    verified: false,
  });

  const [editingHostelId, setEditingHostelId] = useState(null);

  // Access check: restrict dashboard to admins
  useEffect(() => {
    if (!userLoading && user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, userLoading, navigate]);

  // Fetch owned hostels
  const fetchMyHostels = async () => {
    try {
      setLoading(true);
      const response = await API.get("/hostels/my-hostels");
      setHostels(response.data.hostels || []);
    } catch (error) {
      console.error("Error fetching my hostels:", error);
      toast.error("Failed to fetch hostels list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchMyHostels();
    }
  }, [user]);

  // Handle pre-filling profile info on form load
  useEffect(() => {
    if (user && activeTab === "add-hostel") {
      setFormData((prev) => ({
        ...prev,
        ownerName: user.name || "",
        ownerEmail: user.email || "",
        ownerPhone: "",
        hostelName: "",
        area: "",
        address: "",
        description: "",
        rent: "",
        facilities: [],
        images: "",
        latitude: 22.7196,
        longitude: 75.8577,
        available: true,
        verified: false,
      }));
    }
  }, [user, activeTab]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => {
      const current = prev.facilities;
      const updated = current.includes(facility)
        ? current.filter((f) => f !== facility)
        : [...current, facility];
      return { ...prev, facilities: updated };
    });
  };

  // Submit Add Hostel
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.hostelName.trim()) return toast.error("Hostel name is required");
    if (!formData.area.trim()) return toast.error("Area is required");
    if (!formData.address.trim()) return toast.error("Address is required");
    if (!formData.description.trim()) return toast.error("Description is required");
    if (!formData.rent || Number(formData.rent) <= 0) return toast.error("Enter a valid rent amount");
    if (!formData.ownerPhone.trim()) return toast.error("Owner phone is required");
    if (!formData.latitude || isNaN(Number(formData.latitude))) return toast.error("Enter a valid latitude");
    if (!formData.longitude || isNaN(Number(formData.longitude))) return toast.error("Enter a valid longitude");

    // Parse images array
    const imagesArray = formData.images
      .split(/[,\n]+/)
      .map((url) => url.trim())
      .filter(Boolean);

    if (imagesArray.length === 0) {
      return toast.error("Provide at least one image URL");
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        rent: Number(formData.rent),
        location: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
        images: imagesArray,
      };

      await API.post("/hostels", payload);
      toast.success("Hostel registered successfully!");
      fetchMyHostels();
      setActiveTab("my-hostels");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create hostel");
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill Edit form
  const handleEditClick = (hostel) => {
    setEditingHostelId(hostel._id);
    setFormData({
      hostelName: hostel.hostelName || "",
      city: hostel.city || "Indore",
      area: hostel.area || "",
      address: hostel.address || "",
      description: hostel.description || "",
      rent: hostel.rent || "",
      gender: hostel.gender || "co-ed",
      roomType: hostel.roomType || "Single",
      facilities: hostel.facilities || [],
      images: (hostel.images || []).join(",\n"),
      ownerName: hostel.ownerName || "",
      ownerPhone: hostel.ownerPhone || "",
      ownerEmail: hostel.ownerEmail || "",
      latitude: hostel.location?.latitude || 22.7196,
      longitude: hostel.location?.longitude || 75.8577,
      available: hostel.available !== undefined ? hostel.available : true,
      verified: hostel.verified || false,
    });
    setActiveTab("edit-hostel");
  };

  // Submit Edit Hostel
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hostelName.trim()) return toast.error("Hostel name is required");
    if (!formData.area.trim()) return toast.error("Area is required");
    if (!formData.address.trim()) return toast.error("Address is required");
    if (!formData.description.trim()) return toast.error("Description is required");
    if (!formData.rent || Number(formData.rent) <= 0) return toast.error("Enter a valid rent amount");
    if (!formData.ownerPhone.trim()) return toast.error("Owner phone is required");

    const imagesArray = formData.images
      .split(/[,\n]+/)
      .map((url) => url.trim())
      .filter(Boolean);

    if (imagesArray.length === 0) {
      return toast.error("Provide at least one image URL");
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        rent: Number(formData.rent),
        location: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
        images: imagesArray,
      };

      await API.put(`/hostels/${editingHostelId}`, payload);
      toast.success("Hostel updated successfully!");
      fetchMyHostels();
      setActiveTab("my-hostels");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update hostel");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Delete Modal
  const handleDeleteClick = (id) => {
    setSelectedHostelId(id);
    setShowDeleteModal(true);
  };

  // Submit Delete Hostel
  const confirmDeleteHostel = async () => {
    try {
      setLoading(true);
      await API.delete(`/hostels/${selectedHostelId}`);
      toast.success("Hostel deleted successfully!");
      fetchMyHostels();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete hostel");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setSelectedHostelId(null);
    }
  };

  // Search filter local
  const filteredHostels = hostels.filter((h) => {
    const q = search.toLowerCase();
    return (
      h.hostelName.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      h.area.toLowerCase().includes(q)
    );
  });

  // Calculate Overview Stats
  const totalHostelsCount = hostels.length;
  const availableHostelsCount = hostels.filter((h) => h.available).length;
  const verifiedHostelsCount = hostels.filter((h) => h.verified).length;
  const monthlyRevenue = hostels
    .filter((h) => h.available)
    .reduce((sum, h) => sum + h.rent, 0);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-6"></div>
        <p className="text-xl">Loading dashboard access...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      {/* Sidebar Panel */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto px-10 py-10">
        
        {/* VIEW 1: OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Top Intro */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 mt-2">Welcome back! Here is an overview of your hostels performance.</p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Card 1: Total */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-center gap-5 hover:translate-y-[-2px] transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Home size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">Total Hostels</p>
                  <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{totalHostelsCount}</h3>
                </div>
              </div>

              {/* Card 2: Available */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-center gap-5 hover:translate-y-[-2px] transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">Available Hostels</p>
                  <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{availableHostelsCount}</h3>
                </div>
              </div>

              {/* Card 3: Verified */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-center gap-5 hover:translate-y-[-2px] transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">Verified Hostels</p>
                  <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{verifiedHostelsCount}</h3>
                </div>
              </div>

              {/* Card 4: Monthly Revenue */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex items-center gap-5 hover:translate-y-[-2px] transition duration-300">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <DollarSign size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">Est. Monthly Income</p>
                  <h3 className="text-3xl font-extrabold text-gray-800 mt-1">₹{monthlyRevenue.toLocaleString()}</h3>
                </div>
              </div>

            </div>

            {/* Quick Actions & Overview Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Quick Action */}
              <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 lg:col-span-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Quick Actions</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    Expand your accommodation business by registering a new verified PG or student hostel.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("add-hostel")}
                  className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition cursor-pointer"
                >
                  <PlusCircle size={20} />
                  Add New Hostel
                </button>
              </div>

              {/* Right Column: Hostels Overview */}
              <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Accommodations</h3>
                {hostels.length === 0 ? (
                  <p className="text-gray-400 text-center py-10">No hostels added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {hostels.slice(0, 3).map((hostel) => (
                      <div key={hostel._id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <img
                            src={hostel.images?.[0] || "https://www.svgrepo.com/show/508682/home.svg"}
                            alt={hostel.hostelName}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-gray-800 text-base">{hostel.hostelName}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{hostel.area}, {hostel.city}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-blue-600">₹{hostel.rent}</span>
                          <p className="text-[10px] font-semibold text-gray-400 capitalize mt-0.5">{hostel.gender}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: MY HOSTELS TABLE TAB */}
        {activeTab === "my-hostels" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">My Hostels</h1>
                <p className="text-gray-500 mt-2">Manage and monitor all your registered properties.</p>
              </div>
              <button
                onClick={() => setActiveTab("add-hostel")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 cursor-pointer transition"
              >
                <PlusCircle size={20} />
                Add Hostel
              </button>
            </div>

            {/* Search filter banner */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <Search className="text-gray-400 shrink-0" size={22} />
              <input
                type="text"
                placeholder="Search your hostels by name or area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
              />
            </div>

            {/* Hostels Grid/Table */}
            {loading ? (
              <div className="bg-white rounded-3xl shadow-md p-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500">Retrieving listings...</p>
              </div>
            ) : filteredHostels.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-20 text-center border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4">
                  🏠
                </div>
                <h3 className="text-xl font-bold text-gray-700">No Hostels Found</h3>
                <p className="text-gray-400 text-sm mt-1">Try resetting the search filter or register a new hostel.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-100 text-gray-400 font-semibold text-xs tracking-wider uppercase">
                        <th className="py-4 px-6">Hostel Details</th>
                        <th className="py-4 px-6">Location</th>
                        <th className="py-4 px-6">Rent</th>
                        <th className="py-4 px-6">Config</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-700">
                      {filteredHostels.map((hostel) => (
                        <tr key={hostel._id} className="hover:bg-slate-50/50 transition">
                          
                          {/* Image & Title */}
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-4">
                              <img
                                src={hostel.images?.[0] || "https://www.svgrepo.com/show/508682/home.svg"}
                                alt={hostel.hostelName}
                                className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0"
                              />
                              <div>
                                <h4 className="font-bold text-gray-800 text-base">{hostel.hostelName}</h4>
                                <div className="flex items-center gap-1.5 mt-1">
                                  {hostel.verified && (
                                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                                      <ShieldCheck size={10} /> Verified
                                    </span>
                                  )}
                                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                                    {hostel.gender}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin size={16} className="text-gray-400 shrink-0" />
                              <span>{hostel.area}, {hostel.city}</span>
                            </div>
                          </td>

                          {/* Rent */}
                          <td className="py-5 px-6 font-bold text-blue-600 text-base">
                            ₹{hostel.rent}<span className="text-[11px] text-gray-400 font-normal">/mo</span>
                          </td>

                          {/* Room config */}
                          <td className="py-5 px-6 text-sm text-gray-500 font-semibold">
                            {hostel.roomType}
                          </td>

                          {/* Availability */}
                          <td className="py-5 px-6">
                            <span
                              className={`px-3 py-1 text-xs font-bold rounded-full ${
                                hostel.available
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                  : "bg-red-50 text-red-700 border border-red-100"
                              }`}
                            >
                              {hostel.available ? "Available" : "Occupied"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-5 px-6">
                            <div className="flex items-center justify-center gap-3">
                              {/* View link */}
                              <button
                                onClick={() => navigate(`/hostels/${hostel._id}`)}
                                title="Preview Details"
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                              >
                                <ExternalLink size={18} />
                              </button>

                              {/* Edit button */}
                              <button
                                onClick={() => handleEditClick(hostel)}
                                title="Edit"
                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition cursor-pointer"
                              >
                                <Edit size={18} />
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteClick(hostel._id)}
                                title="Delete"
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3 & 4: ADD/EDIT HOSTEL FORM TAB */}
        {(activeTab === "add-hostel" || activeTab === "edit-hostel") && (
          <div className="max-w-3xl bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white">
              <h2 className="text-3xl font-bold">
                {activeTab === "add-hostel" ? "Register Hostel" : "Modify Hostel Details"}
              </h2>
              <p className="mt-1.5 text-blue-100">
                {activeTab === "add-hostel"
                  ? "Enter all technical and owner parameters to publish your hostel."
                  : "Update fields below to apply edits to the published hostel."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={activeTab === "add-hostel" ? handleAddSubmit : handleEditSubmit} className="p-8 space-y-8">
              
              {/* Section A: Basic Technical Fields */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2.5 mb-5">
                  Hostel Specifications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Hostel Name</label>
                    <input
                      type="text"
                      name="hostelName"
                      value={formData.hostelName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Marvel Girls PG, Elite Boys Hostel"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  {/* Rent */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Monthly Rent (₹)</label>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 6500"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Gender Restriction</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 cursor-pointer transition"
                    >
                      {GENDER_TYPES.map((t) => (
                        <option key={t} value={t} className="capitalize">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room Type Selector */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Default Room Sharing</label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 cursor-pointer transition"
                    >
                      {ROOM_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t} Room
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Availability Toggle */}
                  <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 justify-between self-end h-[50px]">
                    <span className="text-gray-700 font-semibold">Vacancies Available?</span>
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
                    />
                  </div>

                  {/* Verification Checkbox */}
                  <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100 justify-between md:col-span-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-600 animate-pulse" size={20} />
                      <span className="text-emerald-800 font-bold">Verification Status (Owner Verified)</span>
                    </div>
                    <input
                      type="checkbox"
                      name="verified"
                      checked={formData.verified}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                    />
                  </div>

                </div>
              </div>

              {/* Section B: Location details */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2.5 mb-5">
                  Location & Map Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* City Selector */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 cursor-pointer transition"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Specific Area</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Geeta Bhawan, Vijay Nagar"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  {/* Full Address */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Full Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Full physical address location..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  {/* Latitude */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 22.7196"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  {/* Longitude */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 75.8577"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition"
                    />
                  </div>

                  <div className="md:col-span-2 bg-blue-50 border border-blue-150 p-4 rounded-2xl flex gap-2.5 text-blue-800 text-xs">
                    <Info size={16} className="shrink-0 text-blue-600 mt-0.5" />
                    <p>
                      Coordinates are required for interactive mapping. Default coordinates map to the center of Indore. You can search or copy coordinates from Google Maps.
                    </p>
                  </div>

                </div>
              </div>

              {/* Section C: Description & Presets */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2.5 mb-5">
                  Media & Description
                </h3>

                <div className="space-y-5">
                  {/* Description */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Describe amenities, occupancy rules, near universities, mess schedule..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition text-sm"
                    />
                  </div>

                  {/* Image list */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Hostel Image URLs</label>
                    <textarea
                      name="images"
                      value={formData.images}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Paste image links here (either comma-separated, or one link per line)"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-blue-500 text-gray-800 transition text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section D: Facilities check list */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2.5 mb-5">
                  Included Facilities
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FACILITY_OPTIONS.map((facility) => {
                    const isChecked = formData.facilities.includes(facility);
                    return (
                      <label
                        key={facility}
                        className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition select-none ${
                          isChecked
                            ? "bg-blue-50 border-blue-300 text-blue-800"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleFacilityChange(facility)}
                          className="hidden"
                        />
                        <span className="font-semibold text-sm">{facility}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Section E: Owner Contacts */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2.5 mb-5">
                  Owner Contacts
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      placeholder="Owner Name"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-250 outline-none text-gray-800 text-sm focus:bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
                    <input
                      type="text"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. +91 9999988888"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-gray-800 text-sm focus:bg-white focus:border-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Contact Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                      required
                      disabled
                      placeholder="contact@owner.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-250 outline-none text-gray-400 text-sm cursor-not-allowed"
                    />
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("my-hostels")}
                  className="px-6 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-2xl cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 cursor-pointer transition disabled:opacity-50"
                >
                  {loading ? "Saving Records..." : activeTab === "add-hostel" ? "Register Hostel" : "Apply Changes"}
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      {/* VIEW 5: DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6">
            
            <div className="flex items-center gap-4 text-red-600">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Delete</h3>
                <p className="text-sm text-gray-500 mt-1">This operation is irreversible.</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Are you sure you want to delete this hostel? Once deleted, the hostel will be permanently removed from all user search listings and matching directories.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedHostelId(null);
                }}
                className="px-5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-xl cursor-pointer transition text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteHostel}
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/10 cursor-pointer transition disabled:opacity-50 text-sm"
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
