const { messageForm } = require("../controller/messages");
const { getMessages } = require("../controller/messages");
const auth = require("../middleware/auth");
const Message = require("../model/Message");

const router = require("express").Router();

router.post("/new", messageForm);

router.get("/", auth, getMessages);

module.exports = router;
