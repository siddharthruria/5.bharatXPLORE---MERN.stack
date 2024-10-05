// user authentication routes

const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------- ROUTE 1 -------------------------------

// route (/api/user/createUser)

// POST -> create new user

router.post(
  "/createUser",
  // middleware. creates request body validations according to the mentioned checks
  [
    body("username", "username must be 3 characters long atleast").isLength({
      min: 3,
    }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be 5 characters long atleast").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // validates request body against the aforemention checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    // check whether the username already exists
    let user1 = await User.findOne({ username: req.body.username });
    if (user1) {
      return res.status(400).json({
        success: false,
        error: "username already exists",
      });
    }

    // check whether the email already exists
    let user2 = await User.findOne({ email: req.body.email });
    if (user2) {
      return res.status(400).json({
        success: false,
        error: "email already exists",
      });
    }

    // hashing the password before storing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const securePass = await bcrypt.hash(req.body.password, salt);

    // create a new user and store it
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: securePass,
      });

      // proceed to send the payload since username/email and password are correct
      const payload = {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };

      // create a jwt auth signing it with the payload and return it
      // const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      const authToken = jwt.sign(payload, JWT_SECRET);
      res.status(200).json({
        success: true,
        authToken,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("internal server error :/");
    }
  }
);

// ------------------------------- ROUTE 2 -------------------------------

// route (/api/user/authenticate)

// POST -> authenticate user

router.post(
  "/authenticate",
  [
    body("emailOrUsername", "please provide an email or username").exists(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    const { emailOrUsername, password } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
      });

      // check whether the entered username/email is correct
      if (!user) {
        return res.status(400).json({
          success: false,
          error: `invalid username or email`,
        });
      }

      // check whether the entered password is correct
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: false,
          error: "incorrect password",
        });
      }

      const payload = {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };

      // const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      const authToken = jwt.sign(payload, JWT_SECRET);

      res.status(200).json({
        success: true,
        authToken,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("internal server error :/");
    }
  }
);

// ------------------------------- ROUTE 3 -------------------------------

// route (/api/user/getUser)

// GET -> get logged user details

router.get(
  "/getUser",

  // middleware for verifying the token
  fetchUser,
  async (req, res) => {
    try {
      // req.user populated with the payload info. by the middleware
      const userId = req.user.id;

      // excluding password from the response
      const user = await User.findById(userId).select("-password");

      // user not found
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "user not found",
        });
      }

      // if the user is not admin, hide email
      if (user.role !== "admin") {
        user.email = undefined;
      }

      // user authenticated successfully and proceed to send data
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "internal server error :/",
      });
    }
  }
);

module.exports = router;
