/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User.model");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const minPasswordLength = 4;

router.post("/auth/signup", (req, res, next) => {

  const { email, password, lastname, firstname } = req.body;

  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email)  {
    return res.status(403).json({msg : "Email and password are required" })
  }

  if (password.length < minPasswordLength) {
    return res.status(403).json({msg : `Please make your password at least ${minPasswordLength} characters.` })
  }

  userModel.find({ email : email})
  .then(results => {

    if (results.length > 0) {
      return res.status(403).json({msg : "This email adress is already taken." })
    }

    const salt = bcrypt.genSaltSync(10);
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

  }).catch(next)

});

router.post("/auth/signin", (req, res, next) => {
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
