// crud operations on contributions

const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Contribution = require("../models/Contribution");

const router = express.Router();

// ------------------------------- ROUTE 1 -------------------------------

// route (/api/states/:stateId/contributions)

// POST -> create new contribution for a state

router.post("/:stateId/contributions", fetchUser, async (req, res) => {
  try {
    const stateId = req.params.stateId;
    if (!stateId) {
      return res.status(404).json({
        success: false,
        error: "state not found",
      });
    }

    const { category, content, images } = req.body;
    if (!category) {
      return res.status(400).json({
        success: false,
        error: "category is required",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "content is required",
      });
    }
    const newStateContribution = new Contribution({
      user: req.user.id,
      state: stateId,
      category,
      content,
      images,
    });

    const savedStateContribution = await newStateContribution.save();

    res.status(200).json({
      success: true,
      message: "added your contribution",
      savedStateContribution,
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

// route (/api/states/contributions/:contributionId)

// GET -> get a specific contribution

router.get("/contributions/:contributionId", fetchUser, async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.contributionId)
      .populate("user", "username")
      .populate("state", "name");

    if (!contribution) {
      return res.status(404).json({
        success: false,
        error: "contribution not found",
      });
    }
    res.status(200).json({
      success: true,
      contribution,
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

// route (/api/states/contributions/:contributionId)

// PUT -> update a specific contribution

router.put("/contributions/:contributionId", fetchUser, async (req, res) => {
  try {
    const contributionId = req.params.contributionId;
    const contribution = await Contribution.findById(contributionId);
    if (!contribution) {
      return res.status(404).json({
        success: false,
        error: "contribution not found",
      });
    }
    if (contribution.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "you are not authorized to do this operation",
      });
    }

    const { category, content, images } = req.body;

    if (category) contribution.category = category;
    if (content) contribution.content = content;
    if (images) contribution.images = images;

    const updatedContribution = await contribution.save();
    res.status(200).json({
      success: true,
      message: "state contribution updated",
      updatedContribution,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error :/",
    });
  }
});

// ------------------------------- ROUTE 4 -------------------------------

// route (/api/states/contributions/:contributionId)

// DELETE -> delete a specific contribution

router.delete("/contributions/:contributionId", fetchUser, async (req, res) => {
  try {
    const contributionId = req.params.contributionId;
    const contribution = await Contribution.findById(contributionId);
    if (!contribution) {
      return res.status(404).json({
        success: false,
        error: "contribution not found",
      });
    }

    if (contribution.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "you are not authorized to do this operation",
      });
    }

    await Contribution.findByIdAndDelete(contributionId);
    return res.status(200).json({
      success: true,
      message: "contribution deleted successfully",
      contribution: contribution,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "internal server error",
    });
  }
});

module.exports = router;
