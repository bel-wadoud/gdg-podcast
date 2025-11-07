import {  useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex flex-row items-center justify-between bg-[#ffffff] text-black px-8 py-4 ">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="Logo"
          className="h-10 sm:h-12 object-contain"
        />
        <span className="font-semibold text-lg hidden sm:block">GDG Podcasts </span>
      </div>

      {/* Navigation links */}
      <nav className="flex gap-8">
        <button
          onClick={() => navigate("/")}
          className="hover:text-[#2e3ff5] transition-colors duration-300 font-medium"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/podcasts")}
          className="hover:text-[#b91d1d] transition-colors duration-300 font-medium"
        >
          Podcasts
        </button>
        <button
          onClick={() => navigate("/trending")}
          className="hover:text-[#1DB954] transition-colors duration-300 font-medium"
        >
          Trending
        </button>
      </nav>

      {/* Profile / Auth buttons */}
        <button className="profile-nav-btn profile" onClick={() => navigate("/singup")}>
            Sign-up
          </button>
    </header>
  );
}

export default Header;
