import "./../style/auth.css";
import logo from "../assets/images/about_us.png";

// background icons
import star from "../assets/icons/starRed.png";
import plane from "../assets/icons/plane.png";
import headphone from "../assets/icons/Headphones.png";
import mic from "../assets/icons/mic.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-page">
      {/* GDG Tag */}
      {/*<div className="gdg-tag">login / sign up page</div>*/}
      <Link to="/signup" className="gdg-tag">
         SignUp
       </Link>
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
            
            {/* Email Input */}
            <input 
              type="email" 
              placeholder="Email" 
              className="auth-input email" 
            />
            
            {/* Password Input */}
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input password" 
            />
            
            {/* Login Button */}
            <button className="auth-button">Login</button>
            
            {/* Google Login Section */}
            <div className="google-section">
              <div className="google-section-title">
                Continue with google?
              </div>
              <div className="google-section-text">
                Choose google account.
              </div>
              <button className="google-add-button">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}