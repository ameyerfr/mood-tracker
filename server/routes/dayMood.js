const express = require("express");
const router = new express.Router();
const dayMoodModel = require("../models/DayMood.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

// Create a new entry
router.post("/daymood/new", checkUserAuth, async (req, res, next) => {
  dayMoodModel
    .create(req.body)
    .then(newMood => {
      res.status(200).json(newMood);
    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
  // TODO new daymood object
  // day : new Date()
  // dayMoodModel.create({})
  res.status(200).json({ msg: "@todo" });
});

// Get all the data for a Date range (for the logged in user)
// range exemple : /daymood/20200101/20200227 (from 01 Jan 2020 to 27 Feb 2020, all inclusive)
// specific day exemple : /daymood/20200227 (for 27 Feb 2020)
router.get(
  "/daymood/:startDate/:endDate?",
  checkUserAuth,
  async (req, res, next) => {
    try {
      startDate = Number(req.params.startDate);
      endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
      res.json(
        await dayMoodModel.find({
          owner: req.user._id,
          day: { $gte: startDate, $lte: endDate }
        })
      );
    } catch (dbErr) {
      next(dbErr);
    }
  }
);

// Get the MOOD data for a Date range (for the logged in user)
router.get(
  "/daymood/mood/:startDate/:endDate",
  checkUserAuth,
  async (req, res, next) => {
    // Todo : only where dayMood.owner = req.user._id
    startDate = Number(req.params.startDate);
    endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
    dayMoodModel
      .find({
        owner: req.user._id,
        day: { $gte: startDate, $lte: endDate }
      })
      .then(moods => {
        const payload = moods.map(mood => {
          return { mood: mood.mood, day: mood.day };
        });
        console.log();
        res.status(200).json({ payload });
      })
      .catch(dbErr => next(dbErr));
  }
);

// Get the KEYWORDS with the number of occurences for a specific mood
// for a Date range (for the logged in user)
router.get(
  "/daymood/keywords/:mood/:startDate/:endDate",
  checkUserAuth,
  (req, res, next) => {
    startDate = Number(req.params.startDate);
    endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
    dayMoodModel
      .find({
        owner: req.user._id,
        day: { $gte: startDate, $lte: endDate },
        mood: req.params.mood
      })
      .then(moods => {
        const keywordsGood = moods.reduce((acc, cValue) => {
          cValue.k_good.forEach(element => {
            if (acc[element]) acc[element] = acc[element] + 1;
            else {
              acc[element] = 1;
            }
          });
          return acc;
        }, {});

        const keywordsBad = moods.reduce((acc, cValue) => {
          cValue.k_bad.forEach(element => {
            if (acc[element]) acc[element] = acc[element] + 1;
            else {
              acc[element] = 1;
            }
          });
          return acc;
        }, {});

        res.status(200).json({ k_good: keywordsGood, k_bad: keywordsBad });
      })
      .catch(dbErr => next(dbErr));
  }
);

module.exports = router;
