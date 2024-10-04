const mongoose = require("mongoose");

const contributionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  category: {
    type: String,
    enum: [
      "culture and heritage",
      "hidden gems and offbeat places",
      "food recommendations",
      "gossips and trending topics",
    ],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  // url of uploaded contributions images
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: String,
    default: () => {
      const date = new Date();
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
    },
  },
});

module.exports = mongoose.model("Contribution", contributionSchema);
