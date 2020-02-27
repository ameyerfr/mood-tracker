require("dotenv").config(); // import all key/value pairs from .env in process.env : really usefull when going online :)
require("./../config/mongodb");

const userModel = require("./../models/User.model.js")
const contactModel = require("./../models/Contact.model.js")
const petModel = require("./../models/Pet.model.js")
const dayMoodModel = require("./../models/DayMood.model.js")

async function seedTheMFDB() {

  try {

    const user = await userModel.create({
      firstname : "John",
      lastname : "Doe",
      email : "john.doe@domain.com",
      password : "totototo"
    })

    const contact = await contactModel.create({
      owner : user._id,
      name : 'LovelyFriend',
      email : 'mylovelyfriend@friend.com'
    })

    const pet = await petModel.create({
      owner : user._id
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
