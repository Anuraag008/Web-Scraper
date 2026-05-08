const scrape = require("../scraper/scraper");

const triggerScrape = async (req, res) => {
  try {
    const stories = await scrape();
    res.json({
      message: `Successfully scraped ${stories.length} stories`,
      stories,
    });
  } catch (error) {
    res.status(500).json({ message: `Scraping failed: ${error.message}` });
  }
};

module.exports = { triggerScrape };
