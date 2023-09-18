const mongoose = require("mongoose");
const SecondPhoto = mongoose.model("gallery", {
  name: String,
  author: String,
  year: Number,
  software: String,
  password: String,
  token: String,
  salt: String,
  hash: String,
  photo: Object,
});

module.exports = SecondPhoto;
