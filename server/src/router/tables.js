const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTables,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/tables");

router.get("/:id", auth, getTables);
router.post("/tables", auth, createItem);
router.patch("/tables/:id", auth, updateItem);
router.delete("/tables/:id", auth, deleteItem);

module.exports = router;
