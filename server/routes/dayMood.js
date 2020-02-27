const express = require("express");
const router = new express.Router();
const dayMoodModel = require("../models/DayMood.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

// Create a new entry
router.post("/daymood/new", checkUserAuth, async (req, res, next) => {

  // TODO new daymood object
  // day : new Date()
  // dayMoodModel.create({})
  res.status(200).json({ msg: "@todo" })

});

// Get all the data for a Date range (for the logged in user)
// range exemple : /daymood/01-20-2020/02-27-2020 (from 01 Jan 2020 to 27 Feb 2020, all inclusive)
// specific day exemple : /daymood/02-27-2020 (for 27 Feb 2020)
router.get("/daymood/:startDate/:endDate?", checkUserAuth, async (req, res, next) => {
  try {
    startDate = new Date(req.params.startDate)
    endDate = !!req.params.endDate ? new Date(req.params.endDate) : startDate

    res.json(await dayMoodModel.find({
      owner : req.user._id,
      day : { $gte : startDate, $lte: endDate }
    }));
  } catch (dbErr) {
    next(dbErr);
  }
});

// Get the MOOD data for a Date range (for the logged in user)
router.get("/daymood/mood/:startDate/:endDate", checkUserAuth, async (req, res, next) => {
  // Todo : only where dayMood.owner = req.user._id
  res.status(200).json({ msg: "@todo" })
});

// Get the KEYWORDS with the number of occurences for a specific mood
// for a Date range (for the logged in user)
router.get("/daymood/keywords/:mood/:startDate/:endDate", checkUserAuth, async (req, res, next) => {
  // Todo : only where dayMood.owner = req.user._id
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
