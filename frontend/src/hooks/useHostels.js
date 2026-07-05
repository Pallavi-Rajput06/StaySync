import { useEffect, useState } from "react";
import API from "../services/axios";

function useHostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await API.get("/hostels");
        setHostels(res.data.hostels);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return {
    hostels,
    loading,
  };
}

export default useHostels;