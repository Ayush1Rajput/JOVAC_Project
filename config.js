const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/LoginSignUp");

connect
  .then(() => {
    console.log("DB Successfull");
  })
  .catch(() => {
    console.log("DB Unsuccessfull");
  });

// Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
