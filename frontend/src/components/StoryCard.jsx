import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import "./StoryCard.css";

const formatTime = (postedAt) => {
  if (!postedAt) return "some time ago";
  try {
    // HN format: "2025-05-08T14:23:11 1746714191" or "2025-05-08T14:23:11Z"
    // Take only the ISO part before any space, ensure UTC with Z
    const isoPart = postedAt.split(" ")[0];
    const normalized = isoPart.includes("Z") ? isoPart : isoPart + "Z";
    const date = new Date(normalized);

    if (isNaN(date.getTime())) return "some time ago";

    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } catch {
    return "some time ago";
  }
};

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
};

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
          <span className="story-domain">({getDomain(story.url)})</span>
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
