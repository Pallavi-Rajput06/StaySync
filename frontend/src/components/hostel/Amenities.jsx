import {
	Wifi,
	Car,
	Utensils,
	ShieldCheck,
  } from "lucide-react";
  
  function Amenities({ hostel }) {
	return (
	  <div className="mt-14">
  
		<h2 className="text-3xl font-bold mb-8">
		  Amenities
		</h2>
  
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  
		  {hostel.facilities.map((item, index) => (
			<div
			  key={index}
			  className="bg-white rounded-2xl shadow p-5 flex items-center gap-3"
			>
  
			  <ShieldCheck className="text-blue-600" />
  
			  <span>{item}</span>
  
			</div>
		  ))}
  
		</div>
  
	  </div>
	);
  }
  
  export default Amenities;