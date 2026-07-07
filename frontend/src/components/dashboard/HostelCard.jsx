import {
	Heart,
	MapPin,
	Wifi,
	Utensils,
	BedDouble,
	BadgeCheck,
  } from "lucide-react";
  import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/slices/favoritesSlice";
  import API from "../../services/axios";
  import toast from "react-hot-toast";

  import { useNavigate } from "react-router-dom";
  
  function HostelCard({ hostel }) {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const favorites = useSelector(
		(state) => state.favorites.favorites
	  );
	  const favorite = favorites.some(
		(item) => item._id === hostel._id
	  );
	
	
	const toggleFavorite = async () => {
		try {
	  
		  await API.put(`/users/favorites/${hostel._id}`);
	  
		  if (favorite) {
	  
			dispatch(removeFavorite(hostel._id));
	  
			toast.success("Removed from Favorites");
	  
		  } else {
	  
			dispatch(addFavorite(hostel));	  
			toast.success("Added to Favorites");
	  
		  }
	  
		} catch (error) {
	  
		  console.log(error);
		  toast.error("Something went wrong");
	  
		}
	  };
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
  
		  <button
  onClick={toggleFavorite}
  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
>

<Heart
  size={18}
  className={
    favorite
      ? "fill-red-500 text-red-500"
      : "text-gray-600"
  }
/>
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
		  <button
  onClick={() =>
    navigate(`/hostels/${hostel._id}`)
  }
  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
>

  View Details

</button>
  
		</div>
  
	  </div>
	);
  }
  
  export default HostelCard;