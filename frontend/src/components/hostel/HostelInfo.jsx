import {
	MapPin,
	BadgeCheck,
	BedDouble,
  } from "lucide-react";
  
  function HostelInfo({ hostel }) {
	return (
	  <div className="mt-10">
  
		<div className="flex items-center gap-3">
  
		  <h1 className="text-5xl font-bold">
  
			{hostel.hostelName}
  
		  </h1>
  
		  {hostel.verified && (
			<BadgeCheck
			  className="text-green-500"
			  size={32}
			/>
		  )}
  
		</div>
  
		<div className="flex items-center gap-2 mt-5 text-gray-600">
  
		  <MapPin size={20} />
  
		  <span className="text-lg">
  
			{hostel.area}, {hostel.city}
  
		  </span>
  
		</div>
  
		<h2 className="text-blue-600 text-4xl font-bold mt-8">
  
		  ₹{hostel.rent}
  
		  <span className="text-xl text-gray-500 font-normal">
  
			{" "}
			/month
  
		  </span>
  
		</h2>
  
<div className="flex flex-wrap gap-4 mt-8">

<span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
  {hostel.gender}
</span>

<span className="bg-green-100 text-green-700 px-5 py-2 rounded-full flex items-center gap-2 font-medium">
  <BedDouble size={18} />
  {hostel.roomType}
</span>

<span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-medium">
  ⭐ {hostel.rating} ({hostel.totalReviews})
</span>

<span
  className={`px-5 py-2 rounded-full font-medium ${
	hostel.available
	  ? "bg-emerald-100 text-emerald-700"
	  : "bg-red-100 text-red-700"
  }`}
>
  {hostel.available ? "Available" : "Full"}
</span>

</div>
  
	  </div>
	);
  }
  
  export default HostelInfo;