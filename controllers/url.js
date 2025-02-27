const shortid = require("shortid");
const URL = require("../models/url");
const { id } = require("mongoose/lib/types/documentArray/methods");
// const { nanoid } = require("nanoid");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "Url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID, // THIS IS THE ID THAT WILL CARRY THE ORIGINAL URL //
    redirectURL: body.url, // THIS IS THE URL WE ARE TRYING TO SHORTEN //
    visitHistory: [],
    createdBy: req.user._id,  // the user is taken from the middleware auth.js// 
  });

  return res.render("home", {
    id: shortID,
  });
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
