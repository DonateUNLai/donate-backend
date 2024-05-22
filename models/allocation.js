
const mongoose = require("mongoose");
const { Schema } = mongoose;

const allocationSchema = new Schema({
	receiver: { type: Schema.Types.ObjectId, ref: "User" },
	project: { type: Schema.Types.ObjectId, ref: "Project" },
	currency: String,
	amount: String,
	hash: String,
});

module.exports = allocationSchema;
