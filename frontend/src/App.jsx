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
import Hostels from "./pages/Hostels";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />        
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/hostels" element={<ProtectedRoute><Hostels /></ProtectedRoute>} />
        <Route path="/hostels/:id" element={<ProtectedRoute><HostelDetails /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;