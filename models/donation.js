const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationSchema = new Schema({
	donor: { type: Schema.Types.ObjectId, ref: "User" },
	project:{ type: Schema.Types.ObjectId, ref: "Project"},
	currency: String,
	amount: String,
	hash: String,
});

module.exports = donationSchema;
