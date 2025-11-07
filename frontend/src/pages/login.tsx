import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/auth.css";
import logo from "../assets/images/about_us-removebg-preview.png";
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
    setError("");
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
      
      navigate("/");
    } catch (err: unknown) {
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
      alert("Google login not yet implemented. Add Google OAuth SDK first.");
      
      // Example flow (after implementing Google OAuth):
      // const googleToken = await getGoogleToken();
      // await authService.loginWithGoogle(googleToken);
      // navigate("/");
    } catch (err: unknown) {
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
            {/* Welcome Header */}
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your learning journey</p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="error-message">
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
             {/* Forgot Password Link */}
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            
            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

            {/* Google Login Button */}
            <button 
              className="google-button"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Link to Sign Up */}
            <p className="auth-footer">
              Don't have an account?{" "}
              <a href="/signup">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
   