import { Link } from "react-router-dom";
import HostelCard from "./HostelCard";
import useHostels from "../../hooks/useHostels";

function FeaturedHostels({ search, selectedCity }) {
	const { hostels, loading } = useHostels();

	if (loading) {
		return (
		  <h1 className="text-center text-2xl py-20">
			Loading...
		  </h1>
		);
	  }

    const filteredHostels = hostels.filter((hostel) => {

      const matchesSearch =
        hostel.hostelName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
    
        hostel.city
          .toLowerCase()
          .includes(search.toLowerCase()) ||
    
        hostel.area
          .toLowerCase()
          .includes(search.toLowerCase());
    
      const matchesCity =
        selectedCity === "" ||
        hostel.city === selectedCity;
    
      return matchesSearch && matchesCity;
    });

  return (
    <section className="max-w-7xl mx-auto px-8 pb-20">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold">

          Featured Hostels

        </h2>

        <Link to="/hostels" className="text-blue-600 font-semibold hover:underline">
          View All →
        </Link>

      </div>

      <div className="grid grid-cols-3 gap-8">

        {filteredHostels.map((hostel, index) => (
          <HostelCard
            key={index}
            hostel={hostel}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedHostels;