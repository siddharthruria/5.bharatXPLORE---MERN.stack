require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const fetchUser = require("./middleware/fetchUser");
const Token = require("./models/Token");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const admin_username = process.env.admin_username;
const admin_email = process.env.admin_email;
const admin_password = process.env.admin_password;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

const corsOptions = {
  origin: "https://five-bharatxplore-mern-stack.onrender.com", // React app's origin
  credentials: true, // Enable sending cookies and credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

connectDB();

// create admin
const createAdminUser = async (req, res) => {
  try {
    // check if admin already exists
    let user = await User.findOne({ role: "admin" });
    if (user) {
      console.log("admin already exists");
      return;
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
      user = await admin.save();
      console.log("admin created successfully");

      const payload = {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };
      // create a jwt auth signing it with the payload and return it
      const token = jwt.sign(payload, JWT_SECRET);
      const newToken = new Token({ token, username: user._id });
      await newToken.save();
      // res.cookie("token", token, { httpOnly: true, secure: true });
    }
  } catch (error) {
    console.error("error creating admin", error);
  }
};
createAdminUser();

// importing routes
const userRoutes = require("./routes/user");
const stateRoutes = require("./routes/state");
const contributionRoute = require("./routes/contribution");

// using the routes
app.use("/api/user", userRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/states", contributionRoute);

// home route
app.get("/", (req, res) => {
  res.send("welcome to the express application");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening to requests on port ${PORT}`);
});
