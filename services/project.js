const { Project, User } = require("../models/index");
const { trackTransaction } = require("../helper/chainHelper");
const publicClient = require("../config/publicClient");
const donateContarct = require("../contract/donate.json");
import { getContract } from "viem";

async function addProject(req, res) {
	try {
		const { hash } = req.body;

		res.status(200).send({ message: "success" });

		trackTransaction(hash, async (transaction) => {
			const contract = getContract({ address: to, abi: donateContarct.abi, client: publicClient });
			const [title, description, endTime, totalAmount] = await Promise.all([contract.read.title(), contract.read.description(), contract.read.end_time(), contract.read.totalAmount()]);
			const creator = await User.findOne({ address: transaction.from });
			await Project.create({
				address: transaction.to,
				title,
				description,
				endTime,
				totalAmount,
				hash,
				creator: creator._id,
			});
		});
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
}

module.exports = { addProject };
