const router = require("express").Router();
const passport = require("passport");
const {
  newUser,
  verificationEmail,
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
  joinTeacher,
  getTeachers,
  messageForm,
  getMessages,
} = require("../controller/users");
const { getTables } = require("../controller/tables");

const auth = require("../middleware/auth");
const authByRefreshToken = require("../middleware/authRefreshToken");

// START AUTHENTICATION //

// CREATE A NEW USER
router.post("/signup", newUser);

// VERIFICATION EMAIL
router.get("/verify/:token", verificationEmail);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", auth, logoutUser);

// forget password
router.post("/forget-password", forgetPassword);

// reset password
router.post("/reset-password/:token", resetPassword);

// refresh tooken
router.get("/refresh-token", authByRefreshToken, newToken);

// update username
router.put("/update-username", auth, updateUsername);

// update email
router.put("/update-email", auth, updateEmail);

//update password
router.put("/update-password", auth, updateUserPassword);

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

// FOR ADMIN //
router.get("/admin", auth, getUsers);
router.get("/join/teacher", auth, joinTeacher);
router.delete("/:id", auth, deleteUser);

router.get("/admin/:id", getOneUser);
router.get("/admin/message", auth, getMessages);
router.post("", auth, addUser);

// FOR TEACHER
router.get("/join/student", auth, joinStudent);

router.get("/students", auth, getStudents);

// FOR STUDENT
router.get("/tables", auth, getTables);

module.exports = router;
