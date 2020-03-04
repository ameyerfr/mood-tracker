const express = require("express");
const router = new express.Router();

if ( process.env.GMAIL_ADDRESS ) {
  const mailer = require("../config/nodemailer");
}

const contactModel = require("../models/Contact.model");
const userModel = require("../models/User.model");
const dayMoodModel = require("../models/DayMood.model");
const petModel = require("../models/Pet.model");

const checkUserAuth = require("../middlewares/checkUserAuth");
const dateFns = require("date-fns");

// Create a new entry
router.post("/daymood/new", checkUserAuth, async (req, res, next) => {

  const newMood = {
    owner: req.user._id,
    k_good: req.body.tags.positive,
    k_bad: req.body.tags.negative,
    mood: req.body.intensity
  };

  // We need the user later
  const user = await userModel.findById(req.user._id)

  // Check for previous entry
  // We make it impossible to make an entry twice.
  const moodOfDay = await dayMoodModel.findOne({
    owner: req.user._id,
    day: dateFns.format(Date.now(), "yyyyMMdd")
  });

  if (moodOfDay) {
    return res
      .status(409)
      .json({ msg: "Mood of the day already exists for this owner/day" });
  }

  dayMoodModel
    .create(newMood)
    .then(async newMood => {

      // When we input the mood of the day
      // We increase the pet stats
      const pet = await petModel.findOne({ owner: req.user._id });
      pet.hp += 20;
      if (pet.hp > 100) { pet.hp = 100; }
      pet.exp += 10;
      pet.ownerCredits += 100;
      await pet.save();

      // Get the rules for mood support
      const badMoodDuration = user.preferences.contact_friend_rule[0];
      const moodThreshold = user.preferences.contact_friend_rule[1];

      // Search the moods from previous days
      dayMoodModel.find({
        owner: req.user._id,
        day : {
          $gte : dateFns.format( dateFns.subDays(Date.now(), badMoodDuration), "yyyyMMdd"),
          $lte : dateFns.format(Date.now(), "yyyyMMdd")
        }
      }).then(async (results) => {

        const total = results.reduce((acc, dm) => {
          return acc + dm.mood;
        }, 0)

        const moodAverage = total / results.length;

        // The user is having an average mood
        // Less than moodThreshold for badMoodDuration days
        if ( moodAverage < moodThreshold ) {
          console.log("USER NEEDS EMOTIONAL SUPPORT");
          if ( process.env.GMAIL_ADDRESS ) {
            await sendMailsToContacts(user, moodAverage);
          }
        }

        res.status(200).json(newMood);

      })

    })
    .catch(err => {
      res.status(500).json({ msg: err });
    });
});

// Get all the data for a Date range (for the logged in user)
// range exemple : /daymood/20200101/20200227 (from 01 Jan 2020 to 27 Feb 2020, all inclusive)
// specific day exemple : /daymood/20200227 (for 27 Feb 2020)
// If no start / end is passed, it gives back the mood of the day
router.get(
  "/daymood/:startDate?/:endDate?",
  checkUserAuth,
  async (req, res, next) => {
    try {
      startDate = !!req.params.startDate ? Number(req.params.startDate) : Number(dateFns.format(Date.now(), "yyyyMMdd"))
      endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
      res.json(
        await dayMoodModel.find({
          owner: req.user._id,
          day: { $gte: startDate, $lte: endDate }
        })
      );
    } catch (dbErr) {
      next(dbErr);
    }
  }
);

// Get the MOOD data for a Date range (for the logged in user)
router.get(
  "/daymood/mood/:startDate/:endDate",
  checkUserAuth,
  async (req, res, next) => {
    // Todo : only where dayMood.owner = req.user._id
    startDate = Number(req.params.startDate);
    endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
    dayMoodModel
      .find({
        owner: req.user._id,
        day: { $gte: startDate, $lte: endDate }
      })
      .then(moods => {
        const payload = moods.map(mood => {
          return { mood: mood.mood, day: mood.day };
        });
        console.log();
        res.status(200).json({ payload });
      })
      .catch(dbErr => next(dbErr));
  }
);

// Get all the MOOD (for the logged in user)
router.get("/daymood/mood/", checkUserAuth, async (req, res, next) => {
  dayMoodModel
    .find({
      owner: req.user._id
    })
    .then(moods => {
      const payload = moods.map(mood => {
        return { mood: mood.mood, day: mood.day };
      });
      console.log();
      res.status(200).json({ payload });
    })
    .catch(dbErr => next(dbErr));
});

// Get the KEYWORDS with the number of occurences for a specific mood
// for a Date range (for the logged in user)
router.get(
  "/daymood/keywords/:mood/:startDate/:endDate",
  checkUserAuth,
  (req, res, next) => {
    startDate = Number(req.params.startDate);
    endDate = !!req.params.endDate ? Number(req.params.endDate) : startDate;
    // adding an option to fetch all keywords of all moods
    if (req.params.mood === "all") {
      dayMoodModel
        .find({
          owner: req.user._id,
          day: { $gte: startDate, $lte: endDate }
        })
        .then(moods => {
          const keywordsGood = moods.reduce((acc, cValue) => {
            cValue.k_good.forEach(element => {
              if (acc[element]) acc[element] = acc[element] + 1;
              else {
                acc[element] = 1;
              }
            });
            return acc;
          }, {});

          const keywordsBad = moods.reduce((acc, cValue) => {
            cValue.k_bad.forEach(element => {
              if (acc[element]) acc[element] = acc[element] + 1;
              else {
                acc[element] = 1;
              }
            });
            return acc;
          }, {});

          res.status(200).json({ k_good: keywordsGood, k_bad: keywordsBad });
        })
        .catch(dbErr => next(dbErr));
    } else {
      dayMoodModel
        .find({
          owner: req.user._id,
          day: { $gte: startDate, $lte: endDate },
          mood: req.params.mood
        })
        .then(moods => {
          const keywordsGood = moods.reduce((acc, cValue) => {
            cValue.k_good.forEach(keyword => {
              if (acc[keyword]) acc[keyword] = acc[keyword] + 1;
              else {
                acc[keyword] = 1;
              }
            });
            return acc;
          }, {});

          const keywordsBad = moods.reduce((acc, cValue) => {
            cValue.k_bad.forEach(keyword => {
              if (acc[keyword]) acc[keyword] = acc[keyword] + 1;
              else {
                acc[keyword] = 1;
              }
            });
            return acc;
          }, {});

          res.status(200).json({ k_good: keywordsGood, k_bad: keywordsBad });
        })
        .catch(dbErr => next(dbErr));
    }
  }
);

const sendMailsToContacts = (user, moodAverage) => {
  try {

    contactModel.find({ owner : user._id })
    .then(contacts => {
      contacts.forEach((contact, i ) => {

        mailer.sendEmail({
          to : contact.email,
          subject : `Check how ${user.firstname} is doing !`,
          html : `
          Hey, ${contact.name} ! <br>

          I am an automatic email from <a href="#">TAMAMOODCHI</a>, a mood-tracking application that encourages friends to take care of each other.<br><br>

          You are receiving this email because you are listed as one of ${user.firstname} ${user.lastname}'s friends. 
          He/she has been feeling low lately and it would be nice if you check in with him/her ASAP.<br><br>

          Let you friend know that you are there for him/her:<br>
          Call. Send a message. Send memes or funny videos. Have lunch together. Just hang out and laugh. <br><br>

          Also, check out TAMAMOODCHI! Track your mood and take care of a virtual pet today! <br><br>
          
          ***<br><br>

          Info for demo purposes:<br><br>

          Your friend has a combined mood score of ${moodAverage} / 10 these past days...<br><br>

          ***<br><br>

          http://tamamoodchi.com
          `
        }, (success) => {
          console.log("MAILING SUCCESS : ", contact.email)
        });

      })
    })

  } catch (error) { console.log("MAILING ERROR : ", error) }
}

module.exports = router;
