const express = require("express");
const router = new express.Router();
const petModel = require("../models/Pet.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

router.get("/pet", checkUserAuth, async (req, res, next) => {
  petModel.findOne({owner : req.user._id})
  .then(result => {
      res.status(200).json(result);
  }).catch(next)
});

// Current user is able to update his pet only
router.patch("/pet", checkUserAuth, async (req, res, next) => {
  console.log("PATCH PET : ", req.body)
  petModel.findOneAndUpdate({owner : req.user._id}, req.body, {new:true})
  .then(result => {
    console.log("RESULT : ", result)
      res.status(200).json(result);
  }).catch(next)
});

module.exports = router;
