// middleware to verify whether to give the right logged in user the details.

const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  // if no token available, send 401
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "please authenticate using a valid token",
    });
  }
  try {
    // verify the token and extract the user details
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload.user;

    next(); // proceeding to the next middlware (i.e. /getUser)
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "please authenticate using a valid token",
    });
  }
};

module.exports = fetchUser;
