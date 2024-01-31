const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Table = require("./table");

const userSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    professional: {
      type: Boolean,
      required: function () {
        return this.role === "teacher";
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    // teacherOwnerId: {

    // },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

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

  return userObj;
};

// CREATE TOKEN
userSchema.methods.createAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
// CREATE REFRESH TOKEN
userSchema.methods.createRefreshToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// LOGIN
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("الاسم غير موجود");

  if (!user.verified) throw new Error("يجب تفعيل الحساب أولا");

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
