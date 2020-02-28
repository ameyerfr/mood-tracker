const express = require("express");
const router = new express.Router();
const userModel = require("../models/User.model");
const checkUserAuth = require("../middlewares/checkUserAuth");
const bcrypt = require("bcryptjs");
const minPasswordLength = 4;

router.get("/user", checkUserAuth, async (req, res, next) => {
  try {
    res.json(await userModel.findById(req.user._id));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.patch("/user", checkUserAuth, async (req, res, next) => {
  try {
    const editedUser = ({ email, lastname, firstname } = req.body);
    if (req.body.password) {
      if (req.body.password.length < minPasswordLength) {
        return res.status(403).json({
          msg: `Please make your password at least ${minPasswordLength} characters.`
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(req.body.password, salt);
      editedUser.password = hashPass;
    }

    res.json({
      updatedUser: await userModel.findByIdAndUpdate(req.user._id, editedUser, {
        new: true
      }),
      msg: "Profile updated !"
    });
  } catch (dbErr) {
    next(dbErr);
  }
});

module.exports = router;
