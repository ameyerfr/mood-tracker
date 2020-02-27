const mongoose = require("mongoose");
var DateOnly = require("mongoose-dateonly")(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: { type: DateOnly, default: Date.now() },
  mood: { type: Number, min: 0, max: 10, default : 5},
  k_good: { type: [String] },
  k_bad: { type: [String] }
});

const dayMoodModel = mongoose.model("DayMood", schema);
module.exports = dayMoodModel;
