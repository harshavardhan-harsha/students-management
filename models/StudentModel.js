const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("student", StudentSchema);
