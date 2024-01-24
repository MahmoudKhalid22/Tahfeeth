const {
  verificationToken,
  saveUserInDB,
  findStudents,
} = require("../dbQueries/user");
const { sendVerificationEmail } = require("../middleware/email");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const newUser = async (req, res) => {
  try {
    const { name, email, password, role, professional } = req.body;

    // // Check if required fields are present in the request body
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .send("Missing required fields in the request body");
    }
    const user = new User(req.body);

    saveUserInDB(user);

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    sendVerificationEmail(req.body.email, token);
    res.send("تم إنشاء الحساب بنجاح ، من فضلك تحقق من الايميل لتفعيل الحساب");
  } catch (err) {
    // Check if the error is a Mongoose validation error
    if (err.name === "ValidationError") {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(errorMessage);
    }

    console.log(err);
    res.status(500).send(err);
  }
};

const verificationEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenVerified = verificationToken(token);

    if (tokenVerified) {
      return res.send("your email has been verified successfully, login now");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.createAuthToken();
    res.send({ user, token });
  } catch (error) {
    if (error.message === "الاسم غير موجود") {
      return res.status(404).json({ error: "الاسم غير موجود" });
    } else if (error.message === "كلمة السر غير صحيحة") {
      return res.status(401).json({ error: "كلمة السر غير صحيحة" });
    } else {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
};

const logoutUser = async (req, res) => {
  try {
    if (req.user.length > 0) {
      req.user[0].tokens = req.user[0]?.tokens.filter(
        (token) => token.token !== req.token
      );

      await req.user[0].save();
      res.send({ message: "You logged out" });
    }

    res.send("the user is not found");
  } catch (err) {
    res.status(500).json({ err });
  }
};
// JUST FOR ADMIN
const getUsers = async (req, res) => {
  try {
    // const teacher = ;

    if (req.user[0].role === "teacher") {
      const users = await findStudents();
      const students = users.filter((user) => user.role === "student");
      res.send(students);
    } else {
      res.status(400).send({ message: "you're not the admin" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const addUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send("No valid Update");
  }

  try {
    updates.forEach((update) => (req.user[0][update] = req.body[update]));

    await req.user[0].save();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  newUser,
  verificationEmail,
  getUsers,
  addUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  getOneUser,
};
