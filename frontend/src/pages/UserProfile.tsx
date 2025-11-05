import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/profile.css";
import logo from "../assets/images/about_us-removebg-preview.png";
import authService from "../services/authServices";
import podcastService, { type Podcast } from "../services/podcastService";

export default function UserProfile() {
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
      <div className="profile-header">
        <img src={logo} alt="GDG Talks Logo" className="profile-logo" />
        <div className="profile-nav">
          <button className="profile-nav-btn podcasts" onClick={() => navigate("/")}>
            Podcasts
          </button>
          <button className="profile-nav-btn contact" onClick={() => navigate("/contact")}>
            Contact
          </button>
          <button className="profile-nav-btn profile" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="profile-nav-btn logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

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