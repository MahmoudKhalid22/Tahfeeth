const User = require("../model/user");

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.createAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
};
// JUST FOR ADMIN
const getUsers = async (req, res) => {
  try {
    const admins = req.user.filter((user) => user.isAdmin === true);

    if (admins.length > 0) {
      const users = await User.find({});
      const students = users.filter((user) => user.isAdmin === false);
      res.send(students);
    } else {
      res.status(400).send("you're not the admin");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const addUser = async (req, res) => {
  //   console.log(req.user);
  const admins = req.user.filter((user) => user.isAdmin === true);
  if (admins.length > 0) {
    const user = new User(req.body);
    try {
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(400).send("You're not the admin");
  }
};

const deleteUser = async (req, res) => {
  try {
    const admins = req.user.filter((user) => user.isAdmin === true);
    if (admins.length > 0) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        throw new Error("User is not found");
      } else {
        res.send("User has been deleted");
      }
    } else {
      res.status(400).send("You're not the admin");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { getUsers, addUser, deleteUser, loginUser };
