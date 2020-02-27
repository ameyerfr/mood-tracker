const express = require("express");
const router = new express.Router();
const contacModel = require("../models/Contact.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

router.get("/contacts", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await contacModel.find({owner : req.user._id}));
  } catch (dbErr) {
    next(dbErr);
  }
});

// Create a new contact for the current logged in user
router.post("/contacts/new", checkUserAuth, async (req, res, next) => {
  // Todo : use req.user._id as the new contact owner
  res.status(200).json({ msg: "@todo" })
});

// Delete a contact for the current logged in user
router.post("/contacts/new", checkUserAuth, async (req, res, next) => {
  // Todo : Allow only deletion for contact.owner = req.user._id
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
