import "./../style/auth.css";
import logo from "../assets/images/about_us.png";

// background icons
import star from "../assets/icons/starRed.png";
import plane from "../assets/icons/plane.png";
import headphone from "../assets/icons/Headphones.png";
import mic from "../assets/icons/mic.png";
import { Link } from "react-router-dom";

export default function SignUp() {
    
  return (
    <div className="auth-page">
      {/* GDG Tag */}
      <Link to="/login" className="gdg-tag">
         LogIn
       </Link>
      
      {/* Talks+ Tag */}
      <div className="talks-plus">Talks+</div>

      {/* floating icons */}
      <img src={star} alt="" className="decor decor-star" />
      <img src={plane} alt="" className="decor decor-plane" />
      <img src={headphone} alt="" className="decor decor-headphone" />
      <img src={mic} alt="" className="decor decor-mic" />
      <img src={star} alt="" className="decor decor-star2" />
      <img src={plane} alt="" className="decor decor-plane2" />
      <img src={headphone} alt="" className="decor decor-headphone2" />
      <img src={mic} alt="" className="decor decor-mic2" />

      {/* main signup content */}
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
            <h2>Sign up</h2>
            
            {/* Email Input */}
            <input 
              type="email" 
              placeholder="Email" 
              className="auth-input email" 
            />
            
            {/* Full Name Input */}
            <input 
              type="text" 
              placeholder="Full name" 
              className="auth-input fullname" 
            />
            
            {/* Username Input */}
            <input 
              type="text" 
              placeholder="User name" 
              className="auth-input username" 
            />
            
            {/* Password Input */}
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input password" 
            />
            
            {/* Send Verification Code Button */}
            <div className="verification-section">
              <button className="verification-button">
                Send verification code
              </button>
            </div>
            
            {/* Sign Up Button */}
            <button className="auth-button">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}