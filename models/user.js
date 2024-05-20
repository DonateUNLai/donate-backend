const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    address:{ type: String, required: true, unique: true },
    name: String,
    email: String,
  }
);

module.exports = userSchema;
