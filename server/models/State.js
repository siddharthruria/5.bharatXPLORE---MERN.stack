const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: String,
    default: () => {
      const date = new Date();
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      });
    }
  },
});

module.exports = mongoose.model("State", stateSchema);
