const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    capitalCity: { type: String, required: true },
    population: { type: String, required: true },
    areaByLand: { type: String, required: true },
    popularTouristAttraction: { type: String, required: true },
    commonlySpokenLanguage: { type: String, required: true },
  },
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
      default: [],
    },
  ],
  images: [
    {
      type: String,
      default: [],
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

module.exports = mongoose.model("State", stateSchema);
