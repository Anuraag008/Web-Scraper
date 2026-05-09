import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import StoryCard from "../components/StoryCard";
//import "./Home.css";
//import "./Bookmarks.css";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/api/stories/bookmarks")
      .then(({ data }) => setBookmarks(data))
      .catch(() => setError("Failed to load bookmarks."))
      .finally(() => setLoading(false));
  }, []);

  const handleBookmarkChange = (storyId, isBookmarked) => {
    if (!isBookmarked)
      setBookmarks((prev) => prev.filter((s) => s._id !== storyId));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Your Bookmarks</h1>
          <p className="page-subtitle">
            {bookmarks.length} saved{" "}
            {bookmarks.length === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="story-skeleton" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="bookmarks-empty">
          <div className="empty-icon">☆</div>
          <h2>No bookmarks yet</h2>
          <p>Go to stories and star the ones you want to save.</p>
        </div>
      ) : (
        <div className="stories-list">
          {bookmarks.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              initialBookmarked={true}
              onBookmarkChange={handleBookmarkChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
