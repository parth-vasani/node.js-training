const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce", {
      authSource: "admin",
      user: "adminUser",
      pass: "adminPass",
    });

    console.log("DB connected.");
  } catch (err) {
    // throw err;
    console.log(err);
  }
}

module.exports = { connectDB };
