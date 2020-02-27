const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    contact_friend_rule: {
      type: Array,
      default: [3, 5] // [Number of days, Less than this average mood]
    }
  }
});

const userModel = mongoose.model("User", schema);
module.exports = userModel;
