const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  console.log("password", password);
  console.log("username", username);
  const user = await User.findOne({ username });
  console.log("user", user);

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.secret,
      {
        expiresIn: "3h"
      }
    );
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}

async function create(userParams) {
  console.log("test");

  if (await User.findOne({ username: userParams.username })) {
    throw `Username ${userParams.username} is already taken`;
  }

  const user = new User(userParams);
  console.log(user);
  // hash password
  if (userParams.password) {
    user.hash = bcrypt.hashSync(userParams.password, 10);
  }

  something = await user.save();
  console.log(something);
}

async function update(id, userParams) {
  const user = await User.findById(id);

  if (!user) throw "User not found";
  if (
    user.username !== userParams.username &&
    (await User.findOne({ username: userParams.username }))
  ) {
    throw 'Username "' + userParams.username + '"is already taken';
  }

  if (userParams.password) {
    userParams.hash = bcrypt.hashSync(userParams.password, 10);
  }

  Object.assign(user, userParams);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
