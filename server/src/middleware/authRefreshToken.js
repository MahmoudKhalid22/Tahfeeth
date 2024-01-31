const User = require("../model/user");
const jwt = require("jsonwebtoken");

const authByRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // console.log(decoded);

    const user = await User.find({
      _id: decoded._id,
      "tokens.token": refreshToken,
    });
    // const admin = user.isAdmin ? user.isAdmin : null
    if (!user) throw new Error();

    req.user = user;
    req.token = refreshToken;

    next();
  } catch (e) {
    res.status(500).json({ err: "Please authenticate" });
  }
};

module.exports = authByRefreshToken;
