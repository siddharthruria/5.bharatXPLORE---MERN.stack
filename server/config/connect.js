const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("successfully connected to database");
  } catch (error) {
    console.log("failed to connect to database");
  }
};

module.exports = connectDB;
