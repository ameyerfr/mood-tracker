/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User.model");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const minPasswordLength = 4;

router.post("/signup", (req, res, next) => {

  let errorMsg = "";

  const { email, password, lastname, firstname } = req.body;

  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email) errorMsg += "Provide email and password.\n";

  if (password.length < minPasswordLength)
    errorMsg += `Please make your password at least ${minPasswordLength} characters.`;

  if (errorMsg) return res.status(403).json(errorMsg); // 403	Forbidden

  const salt = bcrypt.genSaltSync(10);
  // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = {lastname, firstname, email, password: hashPass};

  userModel
    .create(newUser)
    .then(newUserFromDB => {
      res.status(200).json({msg: "signup ok"});
    })
    .catch(err => {
      console.log("signup error", err);
      next(err);
    });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden

    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, function(err) {
      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.json({ message: "Something went wrong logging in" });
      }

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

router.post("/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  res.json({ message: "Success" });
});

router.use("/is-loggedin", (req, res, next) => {
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
