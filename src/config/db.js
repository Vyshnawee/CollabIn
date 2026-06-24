const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devtinder_user:devtinder123@devtinder.birdfpv.mongodb.net/?appName=devTinder",
  );
};

module.exports = connectDB;
