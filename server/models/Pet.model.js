const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petNamesList = ["Cubzero", "Pengliff", "Cowatti"]
const getRandomName = () => {
  petNamesList[Math.floor(Math.random()*petNamesList.length)]
}

const firstTimeMessages = require("./config/pet_msg_first_time.js")

const schema = new Schema({
  owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  name: { type : String, required : true, default : getRandomName() },
  hp: { type : Number, required : true, default : 100 },
  exp: { type : Number, required : true, default : 0 },
  stage: { type : Number, required : true, enum : [0,1,2], default : 0 },
  msg_first_time : {type : Array, required : true, default : firstTimeMessages }

  // todo  : msg_greeting
  // todo  : msg_cheer_up
  
});

const petModel = mongoose.model("Pet", schema);
module.exports = petModel;
