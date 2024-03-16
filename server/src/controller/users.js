const {
  verificationToken,
  findUserByEmail,
  saveUserInDB,
  updateUserByName,
  updatePassword,
  updateUserEmail,
  findUsers,
  getUserById,
  getAllTeachers,
  addStudentToTeacher,
  findStudents,
  findAllMessages,
  getTeacher,
  deleteStudent,
  getTeachersRolesFromDB,
} = require("../dbQueries/user");
const { resetPasswordEmail } = require("../middleware/resetPasswordEmail");
const { sendVerificationEmail } = require("../middleware/verificationEmail");
const { verifyToken } = require("../middleware/verifyToken");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Message = require("../model/Message");

const newUser = async (req, res) => {
  const { name, email, password, role, professional } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).send("يجب إدخال البيانات أولا");
  }
  const user = new User({ ...req.body });
  try {
    await saveUserInDB(user);

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    await sendVerificationEmail(req.body.email, token);
    res.send({
      msg: "تم إنشاء الحساب بنجاح ، من قضلك راجع بريدك الإلكتروني لتفعيل الحساب",
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const verificationEmail = async (req, res) => {
  try {
    const token = req.params.token;
    // console.log(token);
    const tokenVerified = await verificationToken(token);

    if (!tokenVerified) {
      return res.send({ error: "Your token has been expired" });
    }
    res.redirect("https://tahfeeth.vercel.app/verified");
  } catch (e) {
    res.status(500).send(e);
  }
};

const internalSignup = async (req, res) => {
  try {
    const { name, email, password, role, verified, status } = req.body;
    if (!name || !email || !password || !role || !verified || !status) {
      return res.status(400).send("يجب إدخال البيانات أولا");
    }
    if (req.body.role === "student") {
      const student = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        verified: req.body.verified,
        status: req.body.status,
      });
      const isTeacher = req.user[0].role === "teacher";
      let teacherId;
      if (isTeacher) {
        teacherId = req.user[0]._id;
      } else {
        teacherId = req.body.id;
      }
      await addStudentToTeacher(teacherId, student._id);
      await student.save();
      return res.status(201).send({ message: "تمت إضافة الطالب" });
    }
    const teacher = new User(req.body);
    await teacher.save();
    return res.status(201).send({ message: "تمت إضافة المعلم" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user) {
      return res.status(404).send({ message: "invalid credentials" });
    }

    const accessToken = await user.createAuthToken();
    const refreshToken = await user.createRefreshToken();
    res.send({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    if (req.user.length > 0) {
      req.user[0].tokens = req.user[0]?.tokens.filter(
        (token) => token.token !== req.token
      );

      await req.user[0].save();
      return res.send({ message: "You logged out" });
    }

    res.send("the user is not found");
  } catch (err) {
    res.status(500).json({ err });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ message: "هذا البريد الإلكتروني غير مسجل" });
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "1h" }
    );
    resetPasswordEmail(email, token);
    res.send({
      message:
        "تم إرسال ايميل إلى عنوان بريدك الإلكتروني من فضلك اذهب إلى بريدك الإلكتروني لإعادة تعيين كلمة السر",
    });
  } catch (err) {
    res.status(500).send({ err });
  }
};
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await verifyToken(token, process.env.RESET_PASSWORD_SECRET);
    if (!user) return res.status(400).send({ message: "token expired" });
    await updatePassword(user._id, req.body.password);
    res.send({ message: "password has been updated" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

const newToken = async (req, res) => {
  try {
    const user = req.user[0];
    const accessToken = await user.createAuthToken();
    res.send({ accessToken });
  } catch (e) {
    res.status.send({ error: e });
  }
};

const updateUsername = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedUser = await updateUserByName(req.user[0]._id, name);
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const updateEmail = async (req, res) => {
  const { email } = req.body;
  const user = req.user[0];
  try {
    if (!user) return res.send({ message: "Email is not found" });
    if (email === user.email) {
      const updatedEmail = await updateUserEmail(user._id, email);
      const token = await user.createAuthToken();
      sendVerificationEmail(user.email, token);
      res.send({
        message:
          "email has been sent to your new email, please go to your mail and verify your account",
      });
    } else {
      return res.status(404).send({ error: "email is not found" });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user[0];
  try {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).send({ error: "كلمة السر غير صحيحة" });

    await updatePassword(user._id, newPassword);
    res.send({ message: "تم تحديث كلمة السر" });
  } catch (err) {
    res.status(500).send({ err });
  }
};

// END OF AUTHENTICATION

// FOR ADMIN

const getUsers = async (req, res) => {
  try {
    if (req.user[0].role === "admin") {
      const users = await findUsers();

      res.send(users);
    } else {
      res.status(400).send({ message: "you're not the admin" });
    }
  } catch (e) {
    // console.log(e);
    res.status(500).send({ e: e.message });
  }
};

const joinToTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const studentId = req.user[0]._id;
    console.log(teacherId, studentId);

    const newStudents = await addStudentToTeacher(teacherId, studentId);
    console.log(newStudents);

    res.send({ newStudents });
  } catch (err) {
    // console.log(err);
    res.status(500).send({ err: err.message });
  }
};

// FOR TEACHER

// for teachers
const getStudents = async (req, res) => {
  try {
    const isTeacher =
      req.user[0].role === "teacher" || req.user[0].role === "admin";
    if (!isTeacher) {
      res.status(400).send({ error: "You are not a teacher" });
    }
    const teacherId = req.params.id;
    const students = await findStudents(teacherId);
    res.send({ students });
  } catch (err) {
    res.status(500).send({ err });
  }
};

const addUser = async (req, res) => {
  const admins = req.user.filter((user) => user.isAdmin === true);

  if (admins.length > 0) {
    const user = new User(req.body);
    try {
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(400).send("You're not the admin");
  }
};

const deleteUser = async (req, res) => {
  try {
    const isAdmin = req.user[0].role === "admin";
    if (isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        throw new Error("User is not found");
      } else {
        res.send({ message: "User has been deleted" });
      }
    } else {
      res.status(400).send({ error: "You're not the admin" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const joinStudent = async (req, res) => {
  try {
    const { studentId, teacherId } = req.body;
    await addStudentToTeacher(studentId, teacherId);
    res.send({ message: "you have been added to this teacher" });
  } catch (err) {
    // console.log(err);
    res.status(500).send({ err: err.messaga });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user);
    res.send(user);
  } catch (err) {
    // console.log(err);
    res.status(500).send(err);
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await getAllTeachers();

    res.send(teachers);
  } catch (err) {
    res.status(500).send({ err });
  }
};

const messageForm = async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    const message = new Message({ name, email, msg });
    await saveUserInDB(message);

    res.send({ msg: "your message has been sent" });
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await findAllMessages();
    res.send(messages);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getOneTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await getTeacher(id);
    if (!teacher) {
      res.status(500).send({ error: "this is not a teacher" });
    }
    res.send({ teacher: teacher, studentsNumber: teacher.students.length });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const base64Data = req.file.buffer.toString("base64");
    imgsrc = `data:${req.file.mimetype};base64,${base64Data}`;

    req.user[0].avatar = imgsrc;
    await req.user[0].save();

    res.send({
      message: "image has been uploaded",
      user: req.user[0],
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const deleteStd = async (req, res) => {
  try {
    const teacher = req.user[0];
    const stdId = req.params.id;
    const isTeacher = teacher.role === "teacher" || teacher.role === "admin";
    if (!isTeacher) {
      res.status(400).send({ error: "you're not a teacher" });
    }
    const users = await deleteStudent(teacher._id, stdId);
    if (!users) return res.status(400).send({ error: "Student is not found" });
    console.log(users);
    res.send({ message: "user has been deleted" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getAllStatusTeachers = async (req, res) => {
  try {
    const teachers = await getTeachersRolesFromDB();

    res.send(teachers);
  } catch (err) {
    res.status(500).send({ error: "internal server error" });
  }
};

const getStudentsByTeacherId = async () => {};

module.exports = {
  newUser,
  verificationEmail,
  internalSignup,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  newToken,
  updateUsername,
  updateEmail,
  updateUserPassword,
  getUsers,
  addUser,
  deleteUser,
  // updateUser,
  getUser,
  getOneUser,
  getStudents,
  joinStudent,
  joinToTeacher,
  getTeachers,
  messageForm,
  getMessages,
  getOneTeacher,
  uploadAvatar,
  deleteStd,
  getAllStatusTeachers,
};
