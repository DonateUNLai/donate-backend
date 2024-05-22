require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redisClient = require("./config/redisClient");

// const User = require("./models/user");
// const Tag = require("./models/tags");
// const Comment = require("./models/comments");
// const Question = require("./models/questions");
// const Answer = require("./models/answers");

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

app.use("/user", userRouter);

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
