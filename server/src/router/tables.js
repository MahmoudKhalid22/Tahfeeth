const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getTables,
  getTable,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/tables");

router.get("/tables", auth, getTables);
router.get("/tables/:id", auth, getTable);
router.post("/tables", auth, createItem);
router.patch("/tables/:id", auth, updateItem);
router.delete("/tables/:id", auth, deleteItem);

module.exports = router;
