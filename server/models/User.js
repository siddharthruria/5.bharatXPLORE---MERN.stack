const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (e) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(e);
      },
      message: "invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
      default: [], // set default as no contributions
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

module.exports = mongoose.model("User", userSchema);
