import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../style/homepage.css";
import logo from "../assets/images/about_us.png";
import podcastService, { type Podcast,type Category } from "../services/podcastService";
import authService from "../services/authServices";

export default function Homepage() {
  const navigate = useNavigate();
  const [forYouIndex, setForYouIndex] = useState(0);
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [watchingIndex, setWatchingIndex] = useState(0);

  // State for API data
  const [forYouItems, setForYouItems] = useState<Podcast[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [continueWatching, setContinueWatching] = useState<Array<Podcast & { progress: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const isAuth = authService.isAuthenticated();
      
      if (isAuth) {
        // Load personalized feed for authenticated users
        const feed = await podcastService.getUserFeed();
        setForYouItems(feed.recommended || []);
        setCategories(feed.categories || []);
        setContinueWatching(feed.continue_watching || []);
      } else {
        // Load public data for non-authenticated users
        const [podcasts, cats] = await Promise.all([
          podcastService.getAllPodcasts(),
          podcastService.getCategories(),
        ]);
        setForYouItems(podcasts.slice(0, 10)); // Show first 10
        setCategories(cats);
      }
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
    console.error("Error loading data:", err);
  } else {
    setError("Failed to load content");
    console.error("Unknown error:", err);
  }
} finally {
  setLoading(false);
}

  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  const handleCategoryClick = async (categoryId: number) => {
    try {
      const podcasts = await podcastService.getPodcastsByCategory(categoryId);
      // Navigate to category page or update state
      console.log("Category podcasts:", podcasts);
      // You can navigate to a category page: navigate(`/category/${categoryId}`);
    } catch (err) {
      console.error("Error loading category:", err);
    }
  };

  if (loading) {
    return (
      <div className="homepage" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-left">
          <img src={logo} alt="GDG Talks Logo" className="header-logo" />
        </div>
        <div className="header-right">
          <button className="header-btn podcasts" onClick={() => navigate("/podcasts")}>
            Podcasts
          </button>
          <button className="header-btn contact" onClick={() => navigate("/contact")}>
            Contact
          </button>
          <button className="header-btn profile" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          {authService.isAuthenticated() && (
            <button 
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {error && (
        <div style={{
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          padding: "12px 20px",
          margin: "1rem 2rem",
          borderRadius: "8px",
        }}>
          {error}
        </div>
      )}

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
              {forYouItems.slice(forYouIndex, forYouIndex + 3).map((item) => (
                <div key={item.id} className="carousel-item">
                  <div 
                    className="video-card"
                    onClick={() => navigate(`/podcast/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
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
              onClick={() => setForYouIndex(Math.min(forYouItems.length - 3, forYouIndex + 1))}
              disabled={forYouIndex >= forYouItems.length - 3}
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
              {categories.slice(categoriesIndex, categoriesIndex + 3).map((item) => (
                <div key={item.id} className="carousel-item">
                  <div 
                    className="category-card"
                    onClick={() => handleCategoryClick(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="category-thumbnail">
                      <img src={item.thumbnail || "/placeholder-category.jpg"} alt={item.name} />
                      <div className="video-overlay">{item.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="carousel-arrow right"
              onClick={() => setCategoriesIndex(Math.min(categories.length - 3, categoriesIndex + 1))}
              disabled={categoriesIndex >= categories.length - 3}
            >
              &gt;
            </button>
          </div>
        </section>

        {/* Continue Watching Section - Only for authenticated users */}
        {authService.isAuthenticated() && continueWatching.length > 0 && (
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
                {continueWatching.slice(watchingIndex, watchingIndex + 3).map((item) => (
                  <div key={item.id} className="carousel-item">
                    <div 
                      className="watching-card"
                      onClick={() => navigate(`/podcast/${item.id}`)}
                      style={{ cursor: "pointer" }}
                    >
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
                onClick={() => setWatchingIndex(Math.min(continueWatching.length - 3, watchingIndex + 1))}
                disabled={watchingIndex >= continueWatching.length - 3}
              >
                &gt;
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}