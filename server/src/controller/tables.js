const { getUserById } = require("../dbQueries/queries");
const Table = require("../model/table");

const getTables = async (req, res) => {
  const match = {};
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user.role.toString() !== "student") {
      return res.send({ error: "you're not a student" });
    }
    const tables = await Table.find({ ownerId: req.params.id }).sort({
      createdAt: -1,
    });
    res.send(tables);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTablesStd = async (req, res) => {
  try {
    const userId = req.user;
    const tables = await Table.find({ ownerId: userId }).sort({
      createdAt: -1,
    });
    res.send(tables);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const createItem = async (req, res) => {
  const isTeacher = req.user[0].role === "teacher";
  if (isTeacher) {
    const item = new Table({ ...req.body, ownerId: req.body.ownerId });
    try {
      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("You're not the admin");
  }
};

const updateItem = async (req, res) => {
  const admins = req.user.filter((admin) => admin.isAdmin === true);

  if (admins.length > 0) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "quantity",
      "level",
      "tasks",
      "completed",
      "questions",
      "answers",
      "notes",
      "rate",
    ];

    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdates) return res.status(400).send("no valid update");

    try {
      const item = await Table.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      if (!task) return res.status(404).send("Task is not found");

      updates.forEach((update) => (task[update] = req.body[update]));

      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("You're not the admin");
  }
};

const deleteItem = async (req, res) => {
  try {
    const isTeacher = req.user[0].role === "teacher";

    if (isTeacher) {
      const task = await Table.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).send({ error: "Item is not found" });
      res.send({ message: "Item has been deleted" });
    } else {
      res.status(400).send({ err: "You're not a teacher" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getTables,
  getTablesStd,
  createItem,
  updateItem,
  deleteItem,
};
