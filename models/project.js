const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
	address: { type: String, required: true, unique: true },
	donors: [{ type: Schema.Types.ObjectId, ref: "Donation" }],
	allocations: [{ type: Schema.Types.ObjectId, ref: "Allocation" }],
	title: String,
	description: String,
	startTime: { type: Number, default: Date.now },
	endTime: Number,
	totalAmount: Number,
	hash: String,
	creator: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = projectSchema;
