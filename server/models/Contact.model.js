const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  name: { type : String, required : true },
  email: { type : String, required : true }
});

const contactModel = mongoose.model("Contact", schema);
module.exports = contactModel;
