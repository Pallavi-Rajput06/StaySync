import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";

function useHostel() {
  const { id } = useParams();

  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await API.get(`/hostels/${id}`);
        setHostel(res.data.hostel);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, [id]);

  return { hostel, loading };
}

export default useHostel;