const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const SecondPhoto = require("../model/SecondPhoto");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");

const encBase64 = require("crypto-js/enc-base64");

router.post("/photos/add", fileUpload(), async (req, res) => {
  try {
    console.log(req.files);
    const { name, author, year, software, password } = req.body;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const photo = req.files.photo;

    const realPhoto = await cloudinary.uploader.upload(convertToBase64(photo));

    const newAddPhoto = new SecondPhoto({
      name: name,
      author: author,
      year: year,
      software: software,
      password: password,
      token: token,
      salt: salt,
      hash: hash,
      photo: realPhoto,
    });

    console.log(newAddPhoto);
    await newAddPhoto.save();
    return res.json(newAddPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
