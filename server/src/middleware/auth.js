const User = require("../model/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log(decoded);

    const user = await User.find({
      _id: decoded._id,
      "tokens.token": accessToken,
    });
    // const admin = user.isAdmin ? user.isAdmin : null
    if (!user) throw new Error();

    req.user = user;
    req.token = accessToken;

    next();
  } catch (e) {
    res.status(500).json({ err: "من فضلك سجل الدخول أولا" });
  }
};

module.exports = auth;
