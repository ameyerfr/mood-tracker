const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petNamesList = [
  "Archie",
  "Barney",
  "Betty",
  "Bernadette",
  "Bob",
  "Fergus",
  "Gary",
  "Kevin",
  "Larry",
  "Lloyd",
  "Matilda",
  "Olga",
  "Pam",
  "Rufus"
]

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
  exp: { type : Number, default : 0 }
});

const petModel = mongoose.model("Pet", schema);
module.exports = petModel;
