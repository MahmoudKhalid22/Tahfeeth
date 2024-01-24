const jwt = require("jsonwebtoken");
const User = require("../model/user");

const saveUserInDB = async (body) => {
  await body.save();
};

const updateVerifiedUser = async (id) => {
  await User.findByIdAndUpdate(id, { verified: true });
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (user) {
    updateVerifiedUser(user._id);
  }
  return user;
};

const verificationToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await getUserById(decoded._id);
  if (user) {
    console.log(user);
    return true;
  }
  return false;
};

const findStudents = async () => {
  const allUsers = await User.find({});
  return allUsers;
};

module.exports = { verificationToken, saveUserInDB, findStudents };
