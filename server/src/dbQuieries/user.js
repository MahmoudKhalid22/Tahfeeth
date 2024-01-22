const User = require("../model/user");

const createInDB = async (user) => {
  const item = await user.save();
  return item;
};

const findUserById = async (id, accessToken) => {
  const user = await User.find({ id, "token.accessToken": accessToken });
  return user;
};

// const updateInDB = async (id, ...user){
//     const user = await User.findByIdAndUpdate(id, user);
//     return user;
// }

module.exports = { createInDB, findUserById };
