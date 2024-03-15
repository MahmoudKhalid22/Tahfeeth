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
  const users = await User.find({}).sort({
    role: 1,
  });
  if (!users) return false;
  return users;
};

const getAllTeachers = async () => {
  const teachers = await User.find({
    role: "teacher",
    verified: true,
    status: "verified",
  });
  if (!teachers) return false;

  return teachers;
};

const addStudentToTeacher = async (teacherId, studentId) => {
  const updatedTeacher = await User.findByIdAndUpdate(
    teacherId,
    { $push: { students: studentId } },
    { new: true }
  );

  return {
    newStudents: updatedTeacher.students,
  };
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

const getTeacher = async (id) => {
  const teacher = await User.findById(id);
  if (teacher.role !== "teacher") return false;
  return teacher;
};

const deleteStudent = async (teacherId, studentId) => {
  const students = await findStudents(teacherId);
  students.filter((s) => s._id === studentId);
  if (students.length === 0) return false;
  const newStudents = await User.updateOne(
    { _id: teacherId },
    { $pull: { students: students[0]._id } },
    {
      new: true,
    }
  );
  return true;
};

const getTeachersRolesFromDB = async () => {
  const teachers = await User.find({
    role: "teacher",
  });
  return teachers;
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
  getTeacher,
  deleteStudent,
  getTeachersRolesFromDB,
};
