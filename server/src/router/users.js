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
  newUser,
  newAccessToken,
} = require("../controller/users");

const auth = require("../middleware/auth");

// CREATE A NEW USER

router.post("/", newUser);

// router.post("/users/signup", newUser);

// LOGIN
router.post("/login", loginUser);

// REFRESH TOKEN

router.get("/refresh-token", newAccessToken);

// LOGOUT
router.post("/users/logout", auth, logoutUser);

router.get("/users", auth, getUsers);

// GET ONE USER

// FOR ADMIN
router.get("/users/:id", getOneUser);

router.post("/users", auth, addUser);
router.delete("/users/:id", auth, deleteUser);

// FOR ADMIN AND USERS
router.patch("/", auth, updateUser);

// READ SPECIFIC USER
router.get("/users/me", auth, getUser);

module.exports = router;
