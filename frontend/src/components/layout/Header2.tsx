import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import logo from "../../assets/images/about_us-removebg-preview.png";
 
import { useLocation } from "react-router-dom";
function Header2() {
  const navigate = useNavigate();
   const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) => location.pathname === path
   

  return (
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
            onClick={() => navigate("/PodcastPlayer")}
            className={`transition-colors duration-300 ${
              isActive("/PodcastPlayer")
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
  );
}

export default Header2;