const express = require("express");
const router = new express.Router();
const petModel = require("../models/Pet.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

router.get("/pet", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await petModel.find({owner : req.user._id}));
  } catch (dbErr) {
    next(dbErr);
  }
});

// Current user is able to update his pet only
router.patch("/pet", checkUserAuth, async (req, res, next) => {
  // Todo : Update the pet with pet.owner = req.user._id
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
