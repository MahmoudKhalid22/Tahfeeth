const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Msg", messageSchema);

module.exports = Message;
