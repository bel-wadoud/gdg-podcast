import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/profile.css";
import logo from "../assets/images/about_us-removebg-preview.png";
import authService from "../services/authServices";
import podcastService, { type Podcast } from "../services/podcastService";
import { useLocation } from "react-router-dom";
export default function UserProfile() {
   
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) => location.pathname === path
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    full_name: "",
    bio: "",
    profile_picture: "",
  });
  const [savedPodcasts, setSavedPodcasts] = useState<Podcast[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          username: currentUser.username,
          email: currentUser.email,
          full_name: currentUser.full_name,
          bio: (currentUser as any).bio || "",
          profile_picture: (currentUser as any).profile_picture || "",
        });
      }

      // Get saved podcasts
      const saved = await podcastService.getSavedPodcasts();
      setSavedPodcasts(saved);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-page" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      

      {/* Header */}
 <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between w-full mb-10">


  {/* Left: Logo */}
  <div className="flex items-center">
    <img
      src={logo}
      alt="Logo"
      className="h-10 sm:h-12 cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate("/")}
    />
  </div>

  {/* Center: Navigation */}
  <nav className="flex flex-1 justify-center items-center gap-20 text-lg font-medium">
     <button
          onClick={() => navigate("/homepage")}
          className={`transition-colors duration-300 ${
            isActive("/homepage") ? "text-[#2e3ff5] font-semibold border-b-2 border-[#2e3ff5]" : "hover:text-[#2e3ff5]"
          }`}
        >
          Home
        </button>

        {/* Podcasts Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            onClick={() => navigate("/podcasts")}
            className={`transition-colors duration-300 ${
              isActive("/podcasts")
                ? "text-[#b91d1d] font-semibold border-b-2 border-[#b91d1d]"
                : "hover:text-[#b91d1d]"
            }`}
          >
            Podcasts ▾
          </button>

          {showDropdown && (
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <ul className="flex flex-col text-sm">
                <li
                  onClick={() => navigate("/podcasts/tech")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Tech
                </li>
                <li
                  onClick={() => navigate("/podcasts/design")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Design
                </li>
                <li
                  onClick={() => navigate("/podcasts/startups")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Startups
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/profile")}
          className={`transition-colors duration-300 ${
            isActive("/profile")
              ? "text-[#1DB954] font-semibold border-b-2 border-[#1DB954]"
              : "hover:text-[#1DB954]"
          }`}
        >
         Profile
        </button>
  </nav>

  {/* Right: Logout */}
  <div className="flex items-center">
    <button
      onClick={() => navigate("/signup")}
      className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-medium"
    >
      Logout
    </button>
  </div>
</header>

    
      {/* Profile Card */}
      <div className="profile-card">
        <button className="edit-profile-btn" onClick={() => navigate("/profile/edit")}>
          Edit profile
        </button>
        
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {user.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" />
            ) : (
              <span className="profile-avatar-placeholder">👤</span>
            )}
          </div>
          <div className="profile-info">
            <div className="profile-username">{user.username || "Username"}</div>
            <div className="profile-email">{user.email || "Email"}</div>
          </div>
        </div>

        <div className="profile-field">
          <strong>Full name:</strong> {user.full_name || "Not provided"}
        </div>
        <div className="profile-field">
          <strong>Bio:</strong> {user.bio || "No bio yet"}
        </div>
      </div>

      {/* Saved Podcasts Section */}
      <div className="podcasts-section">
        <h2 className="podcasts-section-title">Saved podcasts</h2>
        <div className="podcasts-carousel">
          <button
            className="carousel-arrow-profile"
            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
            disabled={carouselIndex === 0}
          >
            &lt;
          </button>
          <div className="podcasts-track">
            {savedPodcasts.slice(carouselIndex, carouselIndex + 3).map((podcast) => (
              <div key={podcast.id} className="podcast-item">
                <div
                  className="podcast-card-profile"
                  onClick={() => navigate(`/podcast/${podcast.id}`)}
                >
                  <div className="podcast-thumbnail-profile">
                    <img src={podcast.thumbnail} alt={podcast.title} />
                  </div>
                  <div className="podcast-progress">
                    <div className="podcast-progress-fill" style={{ width: "0%" }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-arrow-profile"
            onClick={() => setCarouselIndex(Math.min(savedPodcasts.length - 3, carouselIndex + 1))}
            disabled={carouselIndex >= savedPodcasts.length - 3}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}