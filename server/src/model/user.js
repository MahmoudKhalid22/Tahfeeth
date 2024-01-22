const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Table = require("./table");
const { createInDB } = require("../dbQuieries/user");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  professional: {
    type: Boolean,
    required: function () {
      return this.role === "teacher";
    },
  },
  tokens: [
    {
      token: {
        type: String,
        // required: true,
      },
    },
  ],
});

// RELATION BETWEEN USERS AND TASKS
userSchema.virtual("tables", {
  ref: "Table",
  localField: "_id",
  foreignField: "owner",
});

// DELETE PRIVATE DATA
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.__v;
  return userObj;
};

// CREATE TOKEN
userSchema.methods.createAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  user.tokens = user.tokens.concat({ accessToken, refreshToken });
  // const u = await createInDB(user);
  await user.save();
  // console.log(u);
  return { accessToken, refreshToken };
};

// LOGIN
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("الاسم غير موجود");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("كلمة السر غير صحيحة");
  return user;
};

// HASH PASSWORD
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
