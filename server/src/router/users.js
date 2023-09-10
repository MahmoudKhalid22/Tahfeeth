const router = require("express").Router();
const {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
} = require("../controller/users");
const auth = require("../middleware/auth");

router.post("/login", loginUser);

router.get("/", auth, getUsers);

router.post("/", auth, addUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
