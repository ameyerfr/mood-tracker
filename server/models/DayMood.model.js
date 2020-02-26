const mongoose = require("mongoose");
var DateOnly = require("mongoose-dateonly")(mongoose);
const Schema = mongoose.Schema;

const schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: { type: DateOnly, required: true, default: Date.now() },
  mood: { type: Number, required: true, min: 0, max: 10 },
  k_good: { type: [String] },
  k_bad: { type: [String] }
});

const dayMoodModel = mongoose.model("DayMood", schema);
module.exports = dayMoodModel;
