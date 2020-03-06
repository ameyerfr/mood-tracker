require("dotenv").config();
require("./../config/mongodb");

const userModel = require("./../models/User.model.js");
const contactModel = require("./../models/Contact.model.js");
const petModel = require("./../models/Pet.model.js");
const dayMoodModel = require("./../models/DayMood.model.js");

async function seedTheMFDB() {
  try {

    const user = await userModel.create({
      _id: "5e56a25c4587de245dc968a4",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@domain.com",
      password: "$2a$10$gobeonJwL5k36rwZGaG46e953vf9meaxeYex9ULz3lojOgp3HHyWa" // toto
    });

    await contactModel.create({
      owner: user._id,
      name: "Alex",
      email: "alexandre.meyer78@gmail.com"
    });

    await contactModel.create({
      owner: user._id,
      name: "Kathleen",
      email: "kathleensdomingo@gmail.com"
    });

    await contactModel.create({
      owner: user._id,
      name: "Yannick",
      email: "yannick.bourenane@gmail.com"
    });

    const pet = await petModel.create({
      owner: user._id,
      ownerCredits: 50000
    });

    const mood = await dayMoodModel.create([
      {
        owner: user._id,
        day: 20200106,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200107,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200108,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200109,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200111,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200112,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200113,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      },
      {
        owner: user._id,
        day: 20200115,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200116,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200117,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200121,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200124,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200125,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200127,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      },
      {
        owner: user._id,
        day: 20200128,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200201,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200202,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200203,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200204,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200206,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200207,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      },
      {
        owner: user._id,
        day: 20200208,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200209,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200210,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200211,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200213,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200214,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200216,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      },
      {
        owner: user._id,
        day: 20200217,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200220,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200221,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200224,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200225,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200226,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200227,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      },
      {
        owner: user._id,
        day: 20200228,
        mood: 3,
        k_good: ["beer", "sunny", "nap"],
        k_bad: ["work", "tired", "kids"]
      },
      {
        owner: user._id,
        day: 20200229,
        mood: 8,
        k_good: ["beer", "sunny", "nap", "wine", "food"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200301,
        mood: 1,
        k_bad: ["work", "tired", "kids", "rain", "hangover"]
      },
      {
        owner: user._id,
        day: 20200302,
        mood: 6,
        k_good: ["beer", "wine", "pizza"],
        k_bad: ["rain"]
      },
      {
        owner: user._id,
        day: 20200303,
        mood: 3,
        k_good: ["beer"],
        k_bad: ["boss", "hangover", "rain", "lazy"]
      },
      {
        owner: user._id,
        day: 20200304,
        mood: 5
      },
      {
        owner: user._id,
        day: 20200305,
        mood: 9,
        k_good: ["beer", "holidays", "nap", "pizza"]
      }
    ]);

    console.log("Database was seeded with this data :");
    console.log(user, contact, pet, mood);
  } catch (err) {
    console.error(err);
  }
}

seedTheMFDB();
