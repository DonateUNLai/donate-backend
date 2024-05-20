const redis = require("redis");

const client = redis.createClient({
	password: process.env.REDIS_PASS,
	socket: {
		host: process.env.REDIS_ENDPOINT,
		port: 10179,
	},
});


module.exports = client;
