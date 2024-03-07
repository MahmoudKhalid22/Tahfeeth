const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTables,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/tables");

router.get("/:id", auth, getTables);
router.post("/create-table", auth, createItem);
router.patch("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;
