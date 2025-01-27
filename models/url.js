// HERE A MODEL FOR THE URL SHORTENER IS MADE //

const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitHistory: [{ timestamp: { type: Number } }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // this is used to give the id of the user that requested for the url // 
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
