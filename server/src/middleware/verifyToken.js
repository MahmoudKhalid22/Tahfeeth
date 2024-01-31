const jwt = require("jsonwebtoken");

const verifyToken = async (token, secret) => {
  try {
    const decoded = await jwt.verify(token, secret);
    if (!decoded) return false;
    const user = await getUserById(decoded._id);
    if (!user) return false;
    return user;
  } catch (e) {
    throw new error(e);
  }
};

module.exports = { verifyToken };
