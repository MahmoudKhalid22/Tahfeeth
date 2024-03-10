const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

mongoose.connection.once("open", () => {
  console.log("Connected to db");
});

module.exports = { connection };
