require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const admin_username = process.env.admin_username;
const admin_email = process.env.admin_email;
const admin_password = process.env.admin_password;

const app = express();

app.use(express.json());

connectDB();

// create admin
const createAdminUser = async () => {
  try {
    // check if admin already exists
    let user = await User.findOne({ role: "admin" });
    if (user) {
      console.log("admin already exists");
    } else {
      // create admin
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const securePass = await bcrypt.hash(admin_password, salt);
      const admin = new User({
        username: admin_username,
        email: admin_email,
        password: securePass,
        role: "admin",
      });
      await admin.save();
      console.log("admin created successfully");
    }
  } catch (error) {
    console.error("error creating admin", error);
  }
};

createAdminUser();

// importing routes
const userRoutes = require("./routes/user");
const stateRoutes = require("./routes/state");

// using the routes
app.use("/api/user", userRoutes);
app.use("/api/states", stateRoutes);

// home route
app.get("/", (req, res) => {
  res.send("welcome to the express application");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening to requests on port ${PORT}`);
});
