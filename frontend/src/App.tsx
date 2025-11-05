import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Landing from "./pages/Landing";
import Homepage from './pages/homepage';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import GuestProfile from './pages/GuestProfile';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/guest/:guestId" element={<GuestProfile />} />
    </Routes>
  );
}
