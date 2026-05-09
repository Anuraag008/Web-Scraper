import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../hooks/useAuth";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scraping, setScraping] = useState(false);

  const fetchStories = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.get(
        `/api/stories?page=${pageNum}&limit=10`,
      );
      setStories(data.stories);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load stories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get("/api/stories/bookmarks")
      .then(({ data }) => setUserBookmarks(data.map((s) => s._id)))
      .catch(() => {});
  }, [user]);

  const handleScrape = async () => {
    setScraping(true);
    try {
      await axiosInstance.post("/api/scrape");
      await fetchStories(1);
      setPage(1);
    } catch {
      setError("Scrape failed.");
    } finally {
      setScraping(false);
    }
  };

  const handleBookmarkChange = (storyId, isBookmarked) => {
    setUserBookmarks((prev) =>
      isBookmarked ? [...prev, storyId] : prev.filter((id) => id !== storyId),
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Top Stories</h1>
          <p className="page-subtitle">Hacker News — sorted by points</p>
        </div>
        <button
          className="btn-scrape"
          onClick={handleScrape}
          disabled={scraping}
        >
          {scraping ? "Scraping..." : "↻ Refresh Stories"}
        </button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="story-skeleton" />
          ))}
        </div>
      ) : (
        <>
          <div className="stories-list">
            {stories.length === 0 ? (
              <div className="empty-state">
                No stories yet. Click "Refresh Stories" to scrape.
              </div>
            ) : (
              stories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  initialBookmarked={userBookmarks.includes(story._id)}
                  onBookmarkChange={handleBookmarkChange}
                />
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Prev
              </button>
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              <button
                className="page-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
