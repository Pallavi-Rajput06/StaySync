import Navbar from "../components/Navbar";
import HeroSection from "../components/dashboard/HeroSection";
import CitySection from "../components/dashboard/CitySection";
import FeaturedHostels from "../components/dashboard/FeaturedHostels";
import { useState } from "react";

function Dashboard() {

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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