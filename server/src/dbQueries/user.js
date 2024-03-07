const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const Message = require("../model/Message");

const saveUserInDB = async (body) => {
  await body.save();
};

const updateVerifiedUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { verified: true },
    { new: true }
  );
  if (user) return true;
  return false;
};

const getUserById = async (_id) => {
  const user = await User.findById(_id).exec();
  if (!user) return false;
  return user;
};

const verificationToken = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded._id;
  const user = await updateVerifiedUser(userId);
  if (!user) {
    return false;
  }

  return true;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return false;
  return user;
};

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

const findUsers = async (id) => {
  const users = await User.find({});
  if (!users) return false;
  return users;
};

const getAllTeachers = async () => {
  const teachers = await User.find({
    role: "teacher",
    verified: true,
    pending: "verified",
  });
  return teachers;
};

const addStudentToTeacher = async (studentId, teacherId) => {
  const updatedTeacher = await User.findByIdAndUpdate(
    teacherId,
    { $push: { students: studentId } },
    { new: true }
  );
  return updatedTeacher;
};

const findStudents = async (teacherId) => {
  const teacher = await getUserById(teacherId);
  const students = await User.find({ _id: { $in: teacher.students } });
  return students;
};

const findAllMessages = async () => {
  const messages = Message.find({});
  return messages;
};

module.exports = {
  getUserById,
  verificationToken,
  saveUserInDB,
  findUserByEmail,
  updatePassword,
  updateUserByName,
  updateUserEmail,
  findUsers,
  getAllTeachers,
  addStudentToTeacher,
  findStudents,
  findAllMessages,
};
