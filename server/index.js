require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());

connectDB();

// importing routes
const userRoutes = require("./routes/user");

// using the routes
app.use("/api/user", userRoutes);

// home route
app.get("/", (req, res) => {
  res.send("welcome to the express application");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening to requests on port ${PORT}`);
});
