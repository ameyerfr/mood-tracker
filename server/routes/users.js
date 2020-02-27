const express = require("express");
const router = new express.Router();
const userModel = require("../models/User.model");
const checkUserAuth = require("../middlewares/checkUserAuth");

router.get("/users/:id", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await userModel.findById(req.params.id));
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
