import Navbar from "../components/Navbar";
import HeroSection from "../components/dashboard/HeroSection";
import CitySection from "../components/dashboard/CitySection";
import FeaturedHostels from "../components/dashboard/FeaturedHostels";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      <Navbar />

      <HeroSection
        search={search}
        setSearch={setSearch}
      />

<CitySection
  selectedCity={selectedCity}
  setSelectedCity={setSelectedCity}
/>
<FeaturedHostels
  search={search}
  selectedCity={selectedCity}
/>

    </div>
  );
}

export default Dashboard;