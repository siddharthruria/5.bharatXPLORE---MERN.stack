// crud operations on state

const fetchUser = require("../middleware/fetchUser");
const express = require("express");
const State = require("../models/State");
const isAdmin = require("../middleware/isAdmin");
const { body, validationResult } = require("express-validator");
const Contribution = require("../models/Contribution");

const router = express.Router();

// ------------------------------- ROUTE 1 -------------------------------

// route (/api/states)

// GET -> get all states

router.get("/", fetchUser, async (req, res) => {
  try {
    const states = await State.find();
    res.json({
      success: true,
      states,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error :/",
    });
  }
});

// ------------------------------- ROUTE 2 -------------------------------

// route (/api/states/:stateId)

// GET -> get details of single state

router.get("/:stateId", fetchUser, async (req, res) => {
  try {
    const state = await State.findById(req.params.stateId);
    if (!state) {
      return res.status(404).json({
        success: false,
        error: "state not found",
      });
    }
    res.json({
      success: true,
      state,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error :/",
    });
  }
});

// ------------------------------- ROUTE 3 -------------------------------

// route (/api/states)

// POST -> create a new state

router.post(
  "/",
  fetchUser,
  // only admins allowed
  isAdmin,
  [
    body("name", "name is required").notEmpty(),
    body("description", "description is required").notEmpty(),
    body("images", "images must be an array").isArray().optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: errors.array(),
        });
      }

      // destructure values from req.body
      const { name, description, images } = req.body;

      const state = new State({
        name,
        description,
        images,
      });

      const savedState = await state.save();
      res.json({
        success: true,
        message: "state created successfully",
        savedState,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "internal server error :/",
      });
    }
  }
);

// ------------------------------- ROUTE 4 -------------------------------

// route (/api/states/:stateId)

// PUT -> update state information

router.put(
  "/:stateId",
  fetchUser,
  isAdmin,
  [
    body("name", "state name should be minimum of 2 characters atleast")
      .optional()
      .isLength({ min: 2 }),
    body("description", "description must be of atleast 7 characters")
      .optional()
      .isLength({ min: 7 }),
    body("images", "images must be an array").isArray().optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }

    try {
      const state = await State.findById(req.params.stateId);
      if (!state) {
        return res.status(404).json({
          success: false,
          error: "state not found",
        });
      }

      const { name, description, images } = req.body;

      if (name) state.name = name;
      if (description) state.description = description;
      if (images) state.images = images;

      const updatedState = await state.save();
      res.json({
        success: true,
        message: "state information updated successfully",
        updatedState,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "internal server error :/",
      });
    }
  }
);

// ------------------------------- ROUTE 5 -------------------------------

// route (/api/states/:stateId)

// DELETE -> delete state

router.delete("/:stateId", fetchUser, isAdmin, async (req, res) => {
  try {
    const state = await State.findById(req.params.stateId);
    if (!state) {
      return res.status(404).json({
        success: false,
        error: "state not found",
      });
    }

    await State.findByIdAndDelete(req.params.stateId);
    res.status(200).json({
      success: true,
      message: "state deleted successfully",
      state: state,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error :/",
    });
  }
});

// ------------------------------- ROUTE 6 -------------------------------

// route (/api/states/:stateId/contributions)

// GET -> get all contributions of a state

router.get("/:stateId/contributions", fetchUser, async (req, res) => {
  try {
    const contributions = await Contribution.find({
      state: req.params.stateId,
    });
    if (!contributions) {
      return res.status(404).json({
        success: false,
        error: "state not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "contributions for the state",
      contributions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error :/",
    });
  }
});
module.exports = router;
