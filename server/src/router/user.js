const router = require("express").Router();
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
  updateUser,
  getUser,
  getOneUser,
} = require("../controller/users");

const auth = require("../middleware/auth");
const authByRefreshToken = require("../middleware/authRefreshToken");

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

router.get("", auth, getUsers);

// GET ONE USER

// FOR ADMIN
router.get("/:id", getOneUser);

router.post("", auth, addUser);
router.delete("/:id", auth, deleteUser);

// FOR ADMIN AND USERS
router.patch("/:id", auth, updateUser);

// READ SPECIFIC USER
router.get("/me", auth, getUser);

module.exports = router;
