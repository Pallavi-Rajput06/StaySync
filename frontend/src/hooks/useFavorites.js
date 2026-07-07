import { useEffect, useState } from "react";
import API from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/slices/favoritesSlice";

function useFavorites() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const favorites = useSelector((state) => state.favorites.favorites);

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/users/favorites");
      dispatch(setFavorites(res.data.favorites));
    } catch (error) {
      console.log("Error fetching favorites in hook:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [dispatch]);

  return {
    favorites,
    loading,
    fetchFavorites,
  };
}

export default useFavorites;