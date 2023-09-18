const router = require("express").Router();
const {
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

// LOGIN
router.post("/users/login", loginUser);

// LOGOUT
router.post("/users/logout", auth, logoutUser);

// FOR ADMIN
router.get("/users", auth, getUsers);

// GET ONE USER
router.get("/users/:id", getOneUser);

router.post("/users", addUser);
router.delete("/users/:id", auth, deleteUser);

// FOR ADMIN AND USERS
router.patch("/users/:id", auth, updateUser);

// READ SPECIFIC USER
router.get("/users/me", auth, getUser);

module.exports = router;
