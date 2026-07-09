import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useHostel from "../hooks/useHostel";
import ImageGallery from "../components/hostel/ImageGallery";
import HostelInfo from "../components/hostel/HostelInfo";
import Amenities from "../components/hostel/Amenities";
import Description from "../components/hostel/Description";
import OwnerCard from "../components/hostel/OwnerCard";
import RelatedHostels from "../components/hostel/RelatedHostels";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DetailsSkeleton } from "../components/SkeletonLoader";

function HostelDetails() {
  const { hostel, loading } = useHostel();
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 py-10">
          
          {loading ? (
            <DetailsSkeleton />
          ) : !hostel ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-md mx-auto mt-20">
              <h2 className="text-2xl font-bold text-gray-800">Hostel Not Found</h2>
              <p className="text-gray-500 mt-2 text-sm">The hostel details could not be found or the link has expired.</p>
              <button
                onClick={() => navigate("/hostels")}
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition cursor-pointer"
              >
                Back to Hostels
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:underline cursor-pointer"
              >
                <ArrowLeft size={20} />
                Back to Hostels
              </button>

              <ImageGallery hostel={hostel} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <HostelInfo hostel={hostel} />
                  <Description hostel={hostel} />
                  <Amenities hostel={hostel} />
                </div>
                <div>
                  <OwnerCard hostel={hostel} />
                </div>
              </div>

              <RelatedHostels currentHostel={hostel} />
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HostelDetails;