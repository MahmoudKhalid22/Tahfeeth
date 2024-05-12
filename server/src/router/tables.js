const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTables,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/tables");

// TEACHER GET TABLE OF ONE STUDENT
router.get("/:id", auth, getTables);

router.get("");

// TEACHER CREATE TABLE FOR ONE STUDENT
router.post("/create-table", auth, createItem);

// TEACHER UPDATE TABLE FOR ONE STUDENT
router.patch("/:id", auth, updateItem);

// TEACHER DELETE TABLE FOR ONE STUDENT
router.delete("/:id", auth, deleteItem);

module.exports = router;
