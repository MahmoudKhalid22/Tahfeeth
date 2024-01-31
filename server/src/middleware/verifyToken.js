const jwt = require("jsonwebtoken");
const { getUserById } = require("../dbQueries/user");

const verifyToken = async (token, secret) => {
  try {
    const decoded = await jwt.verify(token, secret);
    if (!decoded) return false;
    const user = await getUserById(decoded.id);
    if (!user) return false;
    return user;
  } catch (e) {
    throw new error(e);
  }
};

module.exports = { verifyToken };
