import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

  

    if (token) {
      localStorage.setItem("token", token);

      window.location.replace("/dashboard");
    } else {
      window.location.replace("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white text-3xl">
      Signing you in...
    </div>
  );
}

export default GoogleSuccess;