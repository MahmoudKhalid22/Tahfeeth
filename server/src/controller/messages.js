const { saveUserInDB } = require("../dbQueries/queries");
const Message = require("../model/Message");

const messageForm = async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    const message = new Message({ name, email, msg });
    await message.save();

    res.send({ msg: "your message has been sent" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const user = req.user[0];
    if (user.role !== "admin") {
      return res.status(401).send({ error: "أنت لست مدير " });
    }
    const messages = await Message.find({});
    res.send(messages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  messageForm,
  getMessages,
};
