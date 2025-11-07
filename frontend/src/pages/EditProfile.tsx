import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/profile.css";
import logo from "../assets/images/about_us.png";
import authService from "../services/authServices";

const API_BASE_URL = import.meta.env.VITE_API_URL  ||'http://localhost:8000/api';

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    profile_picture: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setFormData({
          full_name: currentUser.full_name,
          username: currentUser.username,
          bio: (currentUser as any).bio || "",
          profile_picture: (currentUser as any).profile_picture || "",
        });
        setPreviewUrl((currentUser as any).profile_picture || "");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = authService.getToken();
      if (!token) {
        throw new Error("Not authenticated");
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("bio", formData.bio);
      
      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }

      const response = await fetch(`${API_BASE_URL}/user/profile/`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Navigate back to profile
      navigate("/profile");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-page-title">Profile edit</div>

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
        </div>
      </div>

      {/* Edit Profile Container */}
      <div className="edit-profile-container">
        <h2 className="edit-profile-title">Edit profile</h2>

        {error && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          {/* Profile Picture Section */}
          <div className="edit-avatar-section">
            <div className="edit-avatar">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile preview" />
              ) : (
                <span className="profile-avatar-placeholder">👤</span>
              )}
              <label htmlFor="profile-picture-input" className="avatar-add-icon">
                +
              </label>
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="change-picture-text">Change profile picture</div>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            name="full_name"
            placeholder="Change name"
            className="edit-input"
            value={formData.full_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Change username"
            className="edit-input"
            value={formData.username}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Edit bio"
            className="edit-textarea"
            value={formData.bio}
            onChange={handleChange}
          />

          <button type="submit" className="save-edits-btn" disabled={loading}>
            {loading ? "Saving..." : "Save edits"}
          </button>
        </form>
      </div>
    </div>
  );
}