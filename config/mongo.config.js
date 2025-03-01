const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("Failed connecting to Mongodb");
  }
};
module.exports = connectToDb;
