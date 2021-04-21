const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const schema = new Schema({
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  userId: { type: ObjectId, ref: "users" },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  createdDate: { type: Date, default: Date.now, unique: true }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Appointment", schema);
