const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petNamesList = ["Cubzero", "Pengliff", "Cowatti"]
const getRandomName = () => {
  return petNamesList[Math.floor(Math.random()*petNamesList.length)]
}

const firstTimeMessages = require("./../config/pet_msg_first_time.js")
const greetingMessages = require("./../config/pet_msg_greeting.js")
const cheerUpMessages = require("./../config/pet_msg_cheer_up.js")

const schema = new Schema({
  owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  name: { type : String, default : getRandomName() },
  hp: { type : Number, default : 100 },
  exp: { type : Number, default : 0 },
  stage: { type : Number, enum : [0,1,2], default : 0 },
  msg_first_time : {type : Array, default : firstTimeMessages },
  msg_greeting : {type : Array, default : greetingMessages },
  msg_cheer_up : {type : Array, default : cheerUpMessages }
});

const petModel = mongoose.model("Pet", schema);
module.exports = petModel;
