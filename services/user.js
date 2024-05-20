const { User } = require("../models/index");
const redisClient = require("../config/redisClient");
const jsonwebtoken = require("jsonwebtoken");
const { verifyMessage } = require("viem");

const ttl = 60 * 5;

async function generateNonce(req, res) {
	try {
		const { address } = req.body;
		const nonce = Math.floor(1000 + Math.random() * 9000);
		await redisClient.set(address, nonce, "EX", ttl);
		return res.status(200).send({ nonce });
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function verifySign(req, res) {
	try {
		const { address, signature } = req.body;
		const nonce = await redisClient.get(address);
		const valid = await verifyMessage({
			address: address,
			message: nonce.toString(),
			signature: signature.toString(),
		});
		if (valid) {
			const token = jsonwebtoken.sign({ address }, process.env.SECRET_KEY, { expiresIn: "12h" });
			await redisClient.del(address);

			const user = await User.findOne({ address });
			if (!user) {
				const newUser = new User({
					address,
				});
				await newUser.save();
			}
			res.status(200).send({ token });
		} else {
			res.status(500).send({ error: "Wrong signature" });
		}
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function getProfile(req, res) {
	try {
		const address = req.user.address;
		const user = await User.findById(address);
		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

async function updateProfile(req, res) {
	try {
		const address = req.user.address;
		const { name, email } = req.body;
		await User.findOneAndUpdate({ address }, { name, email });
		return res.status(200).send({ message: "success" });
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

module.exports = { generateNonce, verifySign, getProfile, updateProfile };
