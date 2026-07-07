import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GoogleSuccess from "./pages/GoogleSuccess";
import ProtectedRoute from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import HostelDetails from "./pages/HostelDetails";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>   <Dashboard />   </ProtectedRoute>  } />        
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

<Route
  path="/hostels/:id"
  element={<HostelDetails />}
/>
<Route
  path="/favorites"
  element={<Favourites />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;