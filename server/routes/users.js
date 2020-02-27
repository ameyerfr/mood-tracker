const express = require("express");
const router = new express.Router();
const userModel = require("../models/User.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

router.get("/user", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await userModel.findById(req.user._id));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.patch("/user", checkUserAuth, async (req, res, next) => {
  try {
    // todo patch on req.user._id
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
