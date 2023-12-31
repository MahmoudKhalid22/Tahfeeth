const Table = require("../model/table");

const getTables = async (req, res) => {
  const match = {};
  try {
    const tables = await Table.find({ ownerId: req.params.id });
    res.send(tables);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createItem = async (req, res) => {
  const admins = req.user.filter((admin) => admin.isAdmin === true);

  if (admins.length > 0) {
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
    const admins = req.user.filter((admin) => admin.isAdmin === true);

    if (admins.length > 0) {
      await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).send("Item is not found");
      res.send("Item has been deleted");
    } else {
      res.status(400).send("You're not the admin");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getTables, createItem, updateItem, deleteItem };
