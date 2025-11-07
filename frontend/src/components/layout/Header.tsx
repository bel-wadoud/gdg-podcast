import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex flex-row items-center justify-between pt-4 text-black">
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 xl:h-28 inline-block mr-2 object-contain"
        />
      </div>

      {/* Sections */}
      <div className="header-center">
          <button 
            className="nav-btn top-podcast"
            onClick={() => navigate("/podcasts")}
          >
            Top Podcast
          </button>
          <button 
            className="nav-btn voices"
            onClick={() => navigate("/voices")}
          >
            Voices
          </button>
          <button 
            className="nav-btn about"
            onClick={() => navigate("/about")}
          >
            About
          </button>
        </div>

      {/* Login & Sign Up */}
      <div>
        <Link
          to="/login"
          className="bg-sky-300 px-4 py-2 rounded-lg mr-4 hover:bg-sky-400 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-sky-300 px-4 py-2 rounded-lg mr-4 hover:bg-sky-400 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
