/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User.model");
const petModel = require("./../models/Pet.model");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const minPasswordLength = 4;

// Date handling
const dateFns = require("date-fns");
const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);

const validateEmail = require("../middlewares/validateEmail");

router.post("/auth/signup", (req, res, next) => {
  const { email, password, lastname, firstname } = req.body;

  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email) {
    return res.status(403).json({ msg: "Email and password are required" });
  }

  if ( !validateEmail(email) ) {
    return res.status(403).json({ msg: "Email is not valid" });
  }

  if (password.length < minPasswordLength) {
    return res.status(403).json({
      msg: `Please make your password at least ${minPasswordLength} characters.`
    });
  }

  userModel
    .find({ email: email })
    .then(async (results) => {
      if (results.length > 0) {
        return res
          .status(403)
          .json({ msg: "This email adress is already taken." });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      let newUser = { lastname, firstname, email, password: hashPass };

      // Create User and Pet
      newUser = await userModel.create(newUser)
      await petModel.create({ owner:newUser._id })

      res.status(200).json({ msg: "signup ok" });

    })
    .catch(next);
});

router.post("/auth/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden

    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, async function(err) {

      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.status(500).json({ error: err });
      }

      let connect_diff = dateFns.differenceInDays( new DateOnly().toDate(), user.last_login.toDate() );

      // USER did NOT connect today
      // UPDATE PET HEALTH
      // Depending on how long the user has been away
      // 30% for the first day
      // +12% for each additional day
      if ( connect_diff >= 1 ) {

        // Retrieve user pet
        const pet = await petModel.findOne({owner : user._id});

        // Remove 30% for the first day
        pet.hp -= 30;

        // If user hasnt connected in more than a day, remove 12% per additional day
        if ( connect_diff > 1) { pet.hp -= (connect_diff - 1) * 12; }

        // 0 should be the minimum value
        if ( pet.hp < 0 ) { pet.hp = 0 }

        const petSave = await pet.save();
        console.log("petSave : ", petSave)

      }

      // Save user last login as TODAY
      user.last_login =  new DateOnly().toDate()
      await user.save();

      // We are now logged in
      const { _id, lastname, firstname, email } = user;
      next(
        res.status(200).json({
          currentUser: {
            _id,
            lastname,
            firstname,
            email
          }
        })
      );

    });
  })(req, res, next); // IIFE (module) pattern here (see passport documentation)
});

router.post("/auth/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  res.json({ message: "Success" });
});

router.use("/auth/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, lastname, firstname, email } = req.user;
    return res.status(200).json({
      currentUser: {
        _id,
        lastname,
        firstname,
        email
      }
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = router;
