const router = require("express").Router();
const {
  newUser,
  verificationEmail,
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  getOneUser,
} = require("../controller/users");

const auth = require("../middleware/auth");

// CREATE A NEW USER
router.post("/signup", newUser);

// VERIFICATION EMAIL
router.get("/verify/:token", verificationEmail);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", auth, logoutUser);

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
