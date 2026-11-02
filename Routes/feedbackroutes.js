const express = require("express");
const Feedback = require("../models/StudentSchema");

const router = express.Router();

router.post("/feedback", async (req, res) => {
  try {
    const { studentName, courseName, message, rating } = req.body;

    if (!studentName || !courseName || !message || rating == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const feedback = await Feedback.create({
      studentName,
      courseName,
      message,
      rating
    });

    res.status(201).json(feedback);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/feedback", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const feedbacks = await Feedback.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Feedback.countDocuments();

    res.json({
      page,
      total,
      feedbacks
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(feedback);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;