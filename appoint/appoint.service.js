const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../helpers/db");
const Appoint = db.Appoint;

module.exports = {
  getAll,
  create,
  cancelById
};

async function getAll(id) {
  console.log(id);
  return await Appoint.find({ userId: id }).select("-hash");
}

async function create(appointParams) {
  const appoint = new Appoint(appointParams);

  something = await appoint.save();
  return something;
}

async function cancelById(id) {
  return await Appoint.findByIdAndRemove(id);
}
