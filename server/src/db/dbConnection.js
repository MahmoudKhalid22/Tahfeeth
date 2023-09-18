const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => console.log("Connected to db"));

module.exports = mongoose;
