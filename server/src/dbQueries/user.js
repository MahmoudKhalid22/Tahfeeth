const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");

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

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return false;
  return user;
};

// const findStudents = async () => {
//   const allUsers = await User.find({});
//   return allUsers;
// };

const updatePassword = async (id, password) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  await User.updateOne(
    { _id: id },
    { password: hashedPassword },
    { new: true }
  );
};
const updateUserByName = async (id, name) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { name: name } },
    { new: true }
  );
  return user;
};
const updateUserEmail = async (id, email) => {
  const user = await User.updateOne({ _id: id }, { email }, { new: true });
  if (!user) return false;
  return user;
};

const findStudents = async (id) => {
  const students = await User.findById({ _id: id });
  if (!students) return false;
  return students;
};

module.exports = {
  getUserById,
  verificationToken,
  saveUserInDB,
  findUserByEmail,
  updatePassword,
  updateUserByName,
  updateUserEmail,
  findStudents,
};
