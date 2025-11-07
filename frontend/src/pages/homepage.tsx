import { useState } from "react";
import "./../style/homepage.css";
 
import { useNavigate } from "react-router-dom";
import "./../style/profile.css";
import logo from "../assets/images/about_us-removebg-preview.png";

import { useLocation } from "react-router-dom";
 


export default function Homepage() {

  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path: string) => location.pathname === path
  const [forYouIndex, setForYouIndex] = useState(0);
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [watchingIndex, setWatchingIndex] = useState(0);

  // Sample data - replace with your actual content
  const forYouItems = [
    { id: 1, title: "THE RISE OF SPACEX", thumbnail: "/placeholder1.jpg" },
    { id: 2, title: "land your dream job", thumbnail: "/placeholder2.jpg" },
    { id: 3, title: "IMAGINE THE FUTURE", thumbnail: "/placeholder3.jpg" },
  ];

  const categories = [
    { id: 1, title: "Technology", thumbnail: "/category1.jpg" },
    { id: 2, title: "Business", thumbnail: "/category2.jpg" },
    { id: 3, title: "Science", thumbnail: "/category3.jpg" },
  ];

  const continueWatching = [
    { id: 1, title: "Video 1", progress: 45, thumbnail: "/watching1.jpg" },
    { id: 2, title: "Video 2", progress: 70, thumbnail: "/watching2.jpg" },
    { id: 3, title: "Video 3", progress: 20, thumbnail: "/watching3.jpg" },
  ];

  return (
    <div className="homepage">
      {/* Header */}
          <header className="homepage-header flex flex-wrap items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Left: Logo */}
      <div className="header-left flex items-center">
        <img
          src={logo}
          alt="GDG Talks Logo"
          className="h-10 sm:h-12 cursor-pointer"
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
          onClick={() => navigate("/trending")}
          className={`transition-colors duration-300 ${
            isActive("/trending")
              ? "text-[#1DB954] font-semibold border-b-2 border-[#1DB954]"
              : "hover:text-[#1DB954]"
          }`}
        >
         Trending
        </button>
      </nav>

      {/* Right: Search + Profile */}
      <div className="header-right flex items-center gap-4 mt-4 sm:mt-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="search-input border rounded-full px-4 py-1 focus:outline-none focus:ring focus:ring-[#2e3ff5]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>

        <button
          className="profile-nav-btn px-4 py-1 rounded-full bg-[#2e3ff5] text-white hover:bg-[#1b2edc] transition"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>
    </header>

      <div className="homepage-content">
        {/* For You Section */}
        <section className="content-section">
          <h2 className="section-title">For You</h2>
          <div className="carousel-container">
            <button 
              className="carousel-arrow left"
              onClick={() => setForYouIndex(Math.max(0, forYouIndex - 1))}
              disabled={forYouIndex === 0}
            >
              &lt;
            </button>
            <div className="carousel-track">
              {forYouItems.map((item,  ) => (
                <div 
                  key={item.id} 
                  className="carousel-item"
                  style={{ transform: `translateX(-${forYouIndex * 100}%)` }}
                >
                  <div className="video-card">
                    <div className="video-thumbnail">
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="video-overlay">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="carousel-arrow right"
              onClick={() => setForYouIndex(Math.min(forYouItems.length - 1, forYouIndex + 1))}
              disabled={forYouIndex === forYouItems.length - 1}
            >
              &gt;
            </button>
          </div>
        </section>

        {/* Our Categories Section */}
        <section className="content-section">
          <h2 className="section-title">Our Categories</h2>
          <div className="carousel-container">
            <button 
              className="carousel-arrow left"
              onClick={() => setCategoriesIndex(Math.max(0, categoriesIndex - 1))}
              disabled={categoriesIndex === 0}
            >
              &lt;
            </button>
            <div className="carousel-track">
              {categories.map((item, ) => (
                <div 
                  key={item.id} 
                  className="carousel-item"
                  style={{ transform: `translateX(-${categoriesIndex * 100}%)` }}
                >
                  <div className="category-card">
                    <div className="category-thumbnail">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="carousel-arrow right"
              onClick={() => setCategoriesIndex(Math.min(categories.length - 1, categoriesIndex + 1))}
              disabled={categoriesIndex === categories.length - 1}
            >
              &gt;
            </button>
          </div>
        </section>

        {/* Continue Watching Section */}
        <section className="content-section">
          <h2 className="section-title">Continue Watching</h2>
          <div className="carousel-container">
            <button 
              className="carousel-arrow left"
              onClick={() => setWatchingIndex(Math.max(0, watchingIndex - 1))}
              disabled={watchingIndex === 0}
            >
              &lt;
            </button>
            <div className="carousel-track">
              {continueWatching.map((item, ) => (
                <div 
                  key={item.id} 
                  className="carousel-item"
                  style={{ transform: `translateX(-${watchingIndex * 100}%)` }}
                >
                  <div className="watching-card">
                    <div className="watching-thumbnail">
                      <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="carousel-arrow right"
              onClick={() => setWatchingIndex(Math.min(continueWatching.length - 1, watchingIndex + 1))}
              disabled={watchingIndex === continueWatching.length - 1}
            >
              &gt;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}