import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import "./StoryCard.css";

const StoryCard = ({ story, initialBookmarked = false, onBookmarkChange }) => {
  const { isAuthenticated } = useAuth();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      alert("Please login to bookmark stories");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `/api/stories/${story._id}/bookmark`,
      );
      setBookmarked(data.bookmarked);
      if (onBookmarkChange) onBookmarkChange(story._id, data.bookmarked);
    } catch (err) {
      console.error("Bookmark error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (postedAt) => {
    if (!postedAt) return "some time ago";
    try {
      const diff = Math.floor(
        (Date.now() - new Date(postedAt).getTime()) / 60000,
      );
      if (diff < 60) return `${diff} minutes ago`;
      if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
      return `${Math.floor(diff / 1440)} days ago`;
    } catch {
      return postedAt;
    }
  };

  const domain = (url) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  return (
    <div className="story-card">
      <div className="story-points">
        <span className="points-num">{story.points}</span>
        <span className="points-label">pts</span>
      </div>
      <div className="story-content">
        <a
          href={story.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="story-title"
        >
          {story.title}
        </a>
        {story.url && (
          <span className="story-domain">({domain(story.url)})</span>
        )}
        <div className="story-meta">
          <span>
            by <strong>{story.author}</strong>
          </span>
          <span className="meta-sep">·</span>
          <span>{formatTime(story.postedAt)}</span>
        </div>
      </div>
      <button
        className={`bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
        onClick={handleBookmark}
        disabled={loading}
      >
        {loading ? "..." : bookmarked ? "★" : "☆"}
      </button>
    </div>
  );
};

export default StoryCard;
