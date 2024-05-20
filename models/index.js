const mongoose = require("mongoose");
const userSchema = require("./user");
const donationSchema = require("./donation");
const projectSchema = require("./project");

const User = mongoose.model("User", userSchema);
const Donation = mongoose.model("Donation", donationSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { User, Donation, Project };
