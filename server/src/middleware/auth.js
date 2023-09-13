const User = require("../model/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const user = await User.find({ _id: decoded._id, "tokens.token": token });
    // const admin = user.isAdmin ? user.isAdmin : null
    if (!user) throw new Error();

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(500).json({ err: "Please authenticate" });
  }
};

module.exports = auth;
