const express = require("express");
const router = new express.Router();
const contactModel = require("../models/Contact.model");
const checkUserAuth = require("../middlewares/checkUserAuth");
const validateEmail = require("../middlewares/validateEmail");

router.get("/contacts", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await contactModel.find({owner : req.user._id}));
  } catch (dbErr) {
    next(dbErr);
  }
});

// Create a new contact for the current logged in user
router.post("/contacts/new", checkUserAuth, async (req, res, next) => {

  const newContact = {
    owner : req.user._id,
    name : req.body.name,
    email : req.body.email
  }

  if ( !newContact.name || !newContact.email ) { return res.status(403).json({ msg: "Name and email are required" }); }
  if ( !validateEmail(newContact.email) ) { return res.status(403).json({ msg: "Email is not valid" }); }

  contactModel
    .create(newContact)
    .then(newContact => { res.status(200).json(newContact) })
    .catch(next)

});

// Delete a contact for the current logged in user
router.delete("/contacts/:id", checkUserAuth, async (req, res, next) => {

  contactModel
    .deleteOne({ owner:req.user._id, _id:req.params.id })
    .then(dbRes => res.status(200).json(dbRes))
    .catch(next);

});

module.exports = router;
