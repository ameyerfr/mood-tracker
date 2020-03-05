const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateFns = require("date-fns");

const schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: { type: Number, default: dateFns.format(Date.now(), "yyyyMMdd") },
  mood: { type: Number, min: 0, max: 10, default: 5 },
  k_good: { type: [String] },
  k_bad: { type: [String] }
});

const dayMoodModel = mongoose.model("DayMood", schema);
module.exports = dayMoodModel;
