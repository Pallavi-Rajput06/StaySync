import Navbar from "../components/Navbar";
import useHostel from "../hooks/useHostel";
import ImageGallery from "../components/hostel/ImageGallery";
import HostelInfo from "../components/hostel/HostelInfo";
import Amenities from "../components/hostel/Amenities";
import Description from "../components/hostel/Description";
import OwnerCard from "../components/hostel/OwnerCard";
import RelatedHostels from "../components/hostel/RelatedHostels";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HostelDetails() {
	const { hostel, loading } = useHostel();
	const navigate = useNavigate();

  if (loading) {
    return <h1 className="text-center mt-40">Loading...</h1>;
  }

  return (

    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

	  <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:underline"
>
  <ArrowLeft size={20} />
  Back to Hostels
</button>

        <ImageGallery hostel={hostel} />

        <HostelInfo hostel={hostel} />

		<Description hostel={hostel} />

		<Amenities hostel={hostel} />

		<OwnerCard hostel={hostel} />

		<RelatedHostels currentHostel={hostel} />

      </div>

    </div>
  );
}

export default HostelDetails;