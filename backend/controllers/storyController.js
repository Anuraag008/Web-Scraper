const Story = require("../models/Story");
const User = require("../models/User");

const getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Story.countDocuments();
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      stories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const user = await User.findById(req.user._id);
    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
    } else {
      const story = await Story.findById(storyId);
      if (!story) return res.status(404).json({ message: "Story not found" });
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({ bookmarked: !isBookmarked, bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarkedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookmarks");
    res.json(user.bookmarks.sort((a, b) => b.points - a.points));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories,
};
