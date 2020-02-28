require("dotenv").config();
require("./../config/mongodb");

const userModel = require("./../models/User.model.js")
const contactModel = require("./../models/Contact.model.js")
const petModel = require("./../models/Pet.model.js")
const dayMoodModel = require("./../models/DayMood.model.js")

async function seedTheMFDB() {

  try {

    const user = await userModel.create({
      _id : "5e56a25c4587de245dc968a4",
      firstname : "John",
      lastname : "Doe",
      email : "john.doe@domain.com",
      password : "$2a$10$gobeonJwL5k36rwZGaG46e953vf9meaxeYex9ULz3lojOgp3HHyWa" // toto
    })

    const contact = await contactModel.create({
      owner : user._id,
      name : 'LovelyFriend',
      email : 'mylovelyfriend@friend.com'
    })

    const pet = await petModel.create({
      owner : user._id,
      ownerCredits : 100
    })

    const mood = await dayMoodModel.create({
      owner : user._id
    })

    console.log("Database was seeded with this data :");
    console.log(user,
                contact,
                pet,
                mood);

  }
  catch (err) {
    console.error(err)
  }
}

seedTheMFDB()
