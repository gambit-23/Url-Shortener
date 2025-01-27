const express = require("express");
const { connectMongoDb } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const {
  // restrictToLoggedInUserOnly,
  // checkAuth,
  restrictTo,
  checkForAuthentication,
} = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://localhost:27017/shorten-url").then(() => {
  console.log("MongoDb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); // IF  A USER WANTS TO REQUEST /URL IT MUST BE LOGGED IN
app.use("/user", userRoute); // IF ANY REQUEST STARTS WITH /user CALL THE USER ROUTE // 

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
