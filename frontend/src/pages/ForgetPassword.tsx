import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/auth.css";
import logo from "../assets/images/about_us-removebg-preview.png";
// import authService from "../services/authServices"; // Commented out since not implemented yet

// background icons
import star from "../assets/icons/starRed.png";
import plane from "../assets/icons/plane.png";
import headphone from "../assets/icons/Headphones.png";
import mic from "../assets/icons/mic.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      //simulate api calls here and  rest-password service 
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Password reset link has been sent to your email!");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Password reset failed.", err);
      } else {
        setError("Failed to send reset link. Please try again.");
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
      <img src={star} alt="" className="decor decor-star3" />
      <img src={plane} alt="" className="decor decor-plane3" />
      <img src={headphone} alt="" className="decor decor-headphone3" />
      <img src={mic} alt="" className="decor decor-mic3" />
      <img src={star} alt="" className="decor decor-star4" />
      <img src={plane} alt="" className="decor decor-plane4" />
      <img src={headphone} alt="" className="decor decor-headphone4" />
      <img src={mic} alt="" className="decor decor-mic4" />

      {/* main content */}
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
            {/* Header */}
            <div className="auth-header">
              <h2>Forgot Password?</h2>
              <p>Enter your email to receive a password reset link</p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Email Input */}
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                className="auth-input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || success !== ""}
              />
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading || success !== ""}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* Back to Login Link */}
            <p className="auth-footer">
              Remember your password?{" "}
              <a href="/login">
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}