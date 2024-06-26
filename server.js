require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redisClient = require("./config/redisClient");
require("./models/index");



const app = express();

app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: true,
	})
);

const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const donationRouter = require("./routes/donation");
const allocationRouter = require("./routes/allocation");

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/donation", donationRouter);
app.use("/allocation", allocationRouter);

// Database Connection
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/donate?retryWrites=true&w=majority&appName=DonateUN`, { useNewUrlParser: true }).catch((err) => {
	if (err) {
		console.log("error in connecting " + err);
	} else {
		console.log("connecting successfully to the database");
	}
});

redisClient.connect().catch(console.error);

app.listen(8000, () => {
	console.log("Server is running on ", 8000);
});
