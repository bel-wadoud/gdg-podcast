import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/auth.css";
import logo from "../assets/images/about_us.png";
import authService from "../services/authServices";

// background icons
import star from "../assets/icons/starRed.png";
import plane from "../assets/icons/plane.png";
import headphone from "../assets/icons/Headphones.png";
import mic from "../assets/icons/mic.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login({
        email: formData.email,
        password: formData.password,
      });
      
      // Redirect to homepage on success
      navigate("/");
    }  
    catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
    console.error("Login failed. Please try again.", err);
  } else {
    setError("Login failed. Please try again.");
    console.error("Unknown error:", err);
  }
} finally {
  setLoading(false);
}

  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // Initialize Google OAuth
      // You'll need to add Google OAuth SDK to your project
      // For now, this is a placeholder
      alert("Google login not yet implemented. Add Google OAuth SDK first.");
      
      // Example flow (after implementing Google OAuth):
      // const googleToken = await getGoogleToken();
      // await authService.loginWithGoogle(googleToken);
      // navigate("/");
    } 

   catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
    console.error("Google login failed.", err);
  } else {
    setError("Google login failed.");
    console.error("Unknown error:", err);
  }
} finally {
  setLoading(false);
}
  };

  return (
    <div className="auth-page">
      {/* GDG Tag */}
      <div className="gdg-tag">login/sign up page</div>

      {/* floating icons */}
      <img src={star} alt="" className="decor decor-star" />
      <img src={plane} alt="" className="decor decor-plane" />
      <img src={headphone} alt="" className="decor decor-headphone" />
      <img src={mic} alt="" className="decor decor-mic" />
      <img src={star} alt="" className="decor decor-star2" />
      <img src={plane} alt="" className="decor decor-plane2" />
      <img src={headphone} alt="" className="decor decor-headphone2" />
      <img src={mic} alt="" className="decor decor-mic2" />

      {/* main login content */}
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-left">
            <img
              src={logo}
              alt="GDG Talks Logo"
              style={{ width: "90%", maxWidth: "380px" }}
            />
          </div>
          <div className="auth-right">
            <h2>Login</h2>
            
            {/* Error Message */}
            {error && (
              <div style={{
                backgroundColor: "#fee2e2",
                color: "#991b1b",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                width: "100%",
                maxWidth: "300px",
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Email Input */}
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="auth-input email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              
              {/* Password Input */}
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="auth-input password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              
              {/* Login Button */}
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            
            {/* Google Login Section */}
            <div className="google-section">
              <div className="google-section-title">
                Continue with google?
              </div>
              <div className="google-section-text">
                Choose google account.
              </div>
              <button 
                className="google-add-button"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                +
              </button>
            </div>

            {/* Link to Sign Up */}
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              Don't have an account?{" "}
              <a 
                href="/signup" 
                style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}