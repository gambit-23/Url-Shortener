const express = require("express");
const URL = require("../models/url"); // Corrected import statement
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    // if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id }); // Fetching all URL documents from the database the created by only gets the url that are created by the user itself //
    return res.render("home", {
      urls: allurls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
}); // THIS CAN BE ACCESSED BY ADMIN ONLY

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    // if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id }); // Fetching all URL documents from the database
    return res.render("home", {
      urls: allurls,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
}); // THIS CAN BE ACCESSED BY ADMIN AND MEMBER NORMAL

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
