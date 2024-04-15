const router = require("express").Router();
const passport = require("passport");
const {
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
  verifyResetPasswordToken,
  getTeacherSearch,
} = require("../controller/users");
const { getTables, getTablesStd } = require("../controller/tables");

const auth = require("../middleware/auth");
const authByRefreshToken = require("../middleware/authRefreshToken");
const multer = require("multer");
const { getAllTeachers } = require("../dbQueries/user");

// START AUTHENTICATION //

// CREATE A NEW USER
router.post("/signup", newUser);

// VERIFICATION EMAIL
router.get("/verify/:token", verificationEmail);

// INTERNAL SIGNUP
router.post("/teacher/signup", auth, internalSignup);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", auth, logoutUser);

// forget password
router.post("/forget-password", forgetPassword);

// get token from email
router.get("/get-forget-password/:token", verifyResetPasswordToken);

// reset password
router.post("/reset-password", resetPassword);

// refresh tooken
router.get("/refresh-token", authByRefreshToken, newToken);

// update username
router.put("/update-username", auth, updateUsername);

// update email
router.put("/update-email", auth, updateEmail);

//update password
router.put("/update-password", auth, updateUserPassword);

// upload avatar

const upload = multer();
router.post(
  "/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadAvatar,
  (error, req, res, next) => res.status(500).json({ error: error.message })
);

// READ SPECIFIC USER
router.get("/me", auth, getUser);

// GOOGLE OAUTH
// redirect to register page
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// redirect to failure page
router.get("/failure", (req, res) => {
  res.send({ message: "failure" });
});

// callback redirect
router.get(
  "/details",
  passport.authenticate("google", {
    successRedirect: "https://tahfeeth.vercel.app/details",
    failureRedirect: "/user/failure",
  })
);

// oauth with facebook
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/user/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://tahfeeth.vercel.app");
  }
);

// END OF AUTHENTICATION //
// FOR ALL
router.get("/teachers", getTeachers);
router.post("/message", messageForm);
router.get("/teacher/:id", getOneTeacher);
router.get("/search", getTeacherSearch);

// FOR ADMIN //
router.get("/admin", auth, getUsers);
router.get("/admin/teachers", auth, getAllStatusTeachers);
router.delete("/:id", auth, deleteUser);

router.get("/admin/:id", getOneUser);
router.get("/admin/message", auth, getMessages);
router.post("", auth, addUser);

// FOR TEACHER
router.get("/join/student", auth, joinStudent);

// FOR TEACHER AND ADMIN
router.get("/students/:id", auth, getStudents);
router.delete("/student/:id", auth, deleteStd);

// FOR STUDENT
router.get("/tables", auth, getTablesStd);
router.post("/join/:id", auth, joinToTeacher);

// SEARCHING FOR A TEACHER

// TEST REQUEST
// router.get("/test", (req, res) => {
//   res.send({ msg: "test" });
// });

module.exports = router;
