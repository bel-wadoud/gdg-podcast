import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../style/profile.css";
import logo from "../assets/images/about_us-removebg-preview.png";
import authService from "../services/authServices";
import podcastService, { type Guest ,type  Podcast } from "../services/podcastService";

export default function GuestProfile() {
 
  const navigate = useNavigate();
  const { guestId } = useParams<{ guestId: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [guestPodcasts, setGuestPodcasts] = useState<Podcast[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guestId) {
      loadGuestData(parseInt(guestId));
    }
  }, [guestId]);

  const loadGuestData = async (id: number) => {
    try {
      setLoading(true);
      
      // Get guest profile
      const guestData = await podcastService.getProfile(id);
      setGuest(guestData);

      // Get all podcasts and filter by this guest
      // Note: You might need a dedicated endpoint for guest's podcasts
      const allPodcasts = await podcastService.getAllPodcasts();
      const filteredPodcasts = allPodcasts.filter(podcast => 
        podcast.guests?.some(g => g.id === id)
      );
      setGuestPodcasts(filteredPodcasts);
    } catch (error) {
      console.error("Error loading guest data:", error);
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

  if (!guest) {
    return (
      <div className="profile-page">
        <div>Guest not found</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page-title">Guest's profile</div>

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

      {/* Guest Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {guest.profile_picture ? (
              <img src={guest.profile_picture} alt={guest.name} />
            ) : (
              <span className="profile-avatar-placeholder">👤</span>
            )}
          </div>
          <div className="profile-info">
            <div className="profile-username">{guest.name}</div>
            <div className="profile-email">Guest Speaker</div>
          </div>
        </div>

        <div className="profile-field">
          <strong>Full name:</strong> {guest.name}
        </div>
       {guest?.job_title && (
  <div className="profile-field">
    <strong>Job title:</strong> {guest.job_title}
  </div>
)}
        <div className="profile-field">
          <strong>Bio:</strong> {guest.bio || "No bio available"}
        </div>
      </div>

      {/* Guest's Podcasts Section */}
      <div className="podcasts-section">
        <h2 className="podcasts-section-title">Guest's podcasts</h2>
        <div className="podcasts-carousel">
          <button
            className="carousel-arrow-profile"
            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
            disabled={carouselIndex === 0}
          >
            &lt;
          </button>
          <div className="podcasts-track">
            {guestPodcasts.slice(carouselIndex, carouselIndex + 3).map((podcast) => (
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
            onClick={() => setCarouselIndex(Math.min(guestPodcasts.length - 3, carouselIndex + 1))}
            disabled={carouselIndex >= guestPodcasts.length - 3}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}