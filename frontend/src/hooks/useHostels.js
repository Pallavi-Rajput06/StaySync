import { useEffect, useState } from "react";
import API from "../services/axios";

function useHostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHostels = async () => {
    try {
      const response = await API.get("/hostels");

      setHostels(response.data.hostels);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return {
    hostels,
    loading,
  };
}

export default useHostels;