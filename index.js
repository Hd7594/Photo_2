require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const photo2Routes = require("./routes/secondPhoto");
app.use(photo2Routes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});
