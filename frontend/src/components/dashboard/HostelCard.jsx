import {
	Heart,
	MapPin,
	Wifi,
	Utensils,
	BedDouble,
	BadgeCheck,
  } from "lucide-react";
  
  function HostelCard({ hostel }) {
	return (
	  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
  
		{/* Image */}
  
		<div className="relative h-56">
  
		  <img
			src={hostel.images[0]}
			alt={hostel.hostelName}
			className="w-full h-full object-cover"
		  />
  
		  {/* Verified */}
  
		  {hostel.verified && (
			<span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
  
			  <BadgeCheck size={14} />
  
			  Verified
  
			</span>
		  )}
  
		  {/* Wishlist */}
  
		  <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white cursor-pointer">
  
			<Heart size={18} />
  
		  </button>
  
		</div>
  
		{/* Details */}
  
		<div className="p-5">
  
		  <h3 className="text-xl font-bold">
  
			{hostel.hostelName}
  
		  </h3>
  
		  <div className="flex items-center gap-2 mt-2 text-gray-500">
  
			<MapPin size={16} />
  
			<span>
  
			  {hostel.area}, {hostel.city}
  
			</span>
  
		  </div>
  
		  <h4 className="text-blue-600 font-bold text-2xl mt-4">
  
			₹{hostel.rent}
  
			<span className="text-base text-gray-500 font-normal">
  
			  {" "}
			  /month
  
			</span>
  
		  </h4>
  
		  {/* Amenities */}
  
		  <div className="flex justify-between mt-6 text-gray-600 text-sm">
  
			<div className="flex items-center gap-2">
  
			  <BedDouble size={18} />
  
			  {hostel.roomType}
  
			</div>
  
			<div className="flex items-center gap-2">
  
			  <Wifi size={18} />
  
			  WiFi
  
			</div>
  
			<div className="flex items-center gap-2">
  
			  <Utensils size={18} />
  
			  Meals
  
			</div>
  
		  </div>
  
		</div>
  
	  </div>
	);
  }
  
  export default HostelCard;