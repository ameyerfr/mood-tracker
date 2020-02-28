const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petNamesList = ["Cubzero", "Pengliff", "Cowatti"]
const getRandomName = () => {
  return petNamesList[Math.floor(Math.random()*petNamesList.length)]
}

const schema = new Schema({
  owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  ownerCredits: { type : Number, min : 0, default : 0 },
  name: { type : String, default : getRandomName() },
  hp: { type : Number, min : 0, max: 100, default : 100 },
  exp: { type : Number, default : 0 },
  stage: { type : Number, default : 0 },
});

const petModel = mongoose.model("Pet", schema);
module.exports = petModel;
