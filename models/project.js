const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
	address: { type: String, required: true, unique: true },
	donors: [{ type: Schema.Types.ObjectId, ref: "Donor" }],
	title: String,
	description: String,
	startTime: { type: Date, default: Date.now },
	endTime: Date,
	totalAmount: Number,
	hash: String,
	creator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = projectSchema;
