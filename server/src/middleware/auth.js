const { findUserById } = require("../dbQuieries/user");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await findUserById(decoded?._id, accessToken);
    // const admin = user.isAdmin ? user.isAdmin : null
    if (!user) throw new Error();

    req.user = user;
    req.accessToken = accessToken;

    next();
  } catch (e) {
    // console.log(e);
    res.status(500).json({ err: "Please authenticate" });
  }
};

module.exports = auth;
