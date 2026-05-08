const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/Story");

const scrape = async () => {
  const { data } = await axios.get("https://news.ycombinator.com", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; HN-Scraper/1.0)" },
    timeout: 10000,
  });

  const $ = cheerio.load(data);
  const stories = [];

  $(".athing").each((i, el) => {
    if (i >= 10) return false;

    const id = $(el).attr("id");
    const titleEl = $(el).find(".titleline > a").first();
    const subtext = $(el).next();

    const title = titleEl.text().trim();
    const url = titleEl.attr("href") || "";
    const points = parseInt(subtext.find(`#score_${id}`).text()) || 0;
    const author = subtext.find(".hnuser").text().trim() || "unknown";
    const postedAt = subtext.find(".age").attr("title") || "";

    if (title) stories.push({ title, url, points, author, postedAt });
  });

  const results = await Promise.all(
    stories.map((story) =>
      Story.findOneAndUpdate(
        { title: story.title, author: story.author },
        story,
        { upsert: true, new: true, setDefaultsOnInsert: true },
      ),
    ),
  );

  console.log(`Scraped and saved ${results.length} stories`);
  return results;
};

module.exports = scrape;
