import { useEffect, useState } from "react";
import API from "../services/axios";
import { useDispatch } from "react-redux";
import { setFavorites as setFavoritesRedux } from "../redux/slices/favoritesSlice";

function useFavorites() {
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/users/favorites");
	  setFavorites(res.data.favorites);

	  dispatch(
		setFavoritesRedux(
		  res.data.favorites.map((hostel) => hostel._id)
		)
	  );    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    fetchFavorites,
    setFavorites,
  };
}

export default useFavorites;