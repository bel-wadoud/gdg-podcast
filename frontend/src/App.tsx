import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Landing from "./pages/Landing";
import PodcastPlayer from "./pages/PodcastPlayer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
  <Route path="/podcast/:id" element={<PodcastPlayer />} />
    </Routes>
  );
}
